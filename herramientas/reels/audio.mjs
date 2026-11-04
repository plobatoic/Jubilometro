// Locución: recorta silencios, acelera un poco y calcula cuándo suena cada palabra del guion.
// No usa reconocimiento de voz: detecta las pausas reales de la locución (ffmpeg silencedetect)
// y las casa con la puntuación del guion mediante programación dinámica.
import { execFileSync } from "node:child_process";

// ---------- Números en palabras (solo para estimar cuánto se tarda en decirlos) ----------
const UNIDADES = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
  "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte",
  "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
const DECENAS = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const CENTENAS = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

export function numeroEnPalabras(n) {
  if (n < 30) return UNIDADES[n];
  if (n < 100) return DECENAS[Math.floor(n / 10)] + (n % 10 ? " y " + UNIDADES[n % 10] : "");
  if (n === 100) return "cien";
  if (n < 1000) return CENTENAS[Math.floor(n / 100)] + (n % 100 ? " " + numeroEnPalabras(n % 100) : "");
  if (n < 1e6) {
    const miles = Math.floor(n / 1000);
    return (miles === 1 ? "mil" : numeroEnPalabras(miles) + " mil") + (n % 1000 ? " " + numeroEnPalabras(n % 1000) : "");
  }
  return String(n);
}

/** Texto tal y como se pronuncia (aprox.), para medir su duración relativa. */
export function hablado(palabra) {
  return palabra
    .replace(/(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?/g, (_, ent, dec) => {
      const s = numeroEnPalabras(Number(ent.replace(/\./g, "")));
      return dec ? `${s} coma ${numeroEnPalabras(Number(dec))}` : s;
    })
    .replace(/%/g, " por ciento")
    .replace(/[^\p{L}\s]/gu, "");
}

// ---------- Tokenizar el guion ----------
// En el guion, [[cifra|como se dice]] muestra la cifra en los subtítulos y manda a la voz el texto en letra:
// «[[1960|mil novecientos sesenta]]» → subtítulo «1960», locución «mil novecientos sesenta».
const MARCA = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;

/** Texto que se manda al generador de voz. */
export function locucion(guion) {
  return guion.replace(MARCA, (_, cifra, dicho) => dicho).trim();
}

/** Devuelve las palabras del guion (como se ven en los subtítulos) con la «fuerza» de la pausa que las sigue. */
export function tokenizar(guion) {
  const palabras = [];
  // Las indicaciones de entonación de ElevenLabs v4 ([warmly], [curious]…) no se dicen: fuera de los subtítulos.
  guion = guion.replace(/(^|[^\[])\[[^\[\]|]+\](?!\])\s*/g, "$1");
  const protegido = guion.replace(MARCA, (_, cifra, dicho) => `[[${cifra}|${dicho.replace(/\s+/g, "_")}]]`);
  const parrafos = protegido.trim().split(/\n\s*\n/);
  parrafos.forEach((par) => {
    const trozos = par.trim().split(/\s+/);
    trozos.forEach((t, i) => {
      const texto = t.replace(MARCA, (_, cifra) => cifra);
      const dicho = t.replace(MARCA, (_, cifra, d) => d.replace(/_/g, " "));
      let pausa = 0;
      if (/(\.\.\.|…)$/.test(texto)) pausa = 2;
      else if (/[.?!]["»]?$/.test(texto)) pausa = 2;
      else if (/[:;]$/.test(texto)) pausa = 1.5;
      else if (/,$/.test(texto)) pausa = 1;
      if (i === trozos.length - 1) pausa = 3;
      palabras.push({ texto, largo: hablado(dicho).replace(/\s/g, "").length + 1, pausa });
    });
  });
  return palabras;
}

// ---------- Silencios ----------
import { spawnSync } from "node:child_process";

export function duracion(archivo) {
  return Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", archivo]).toString().trim());
}

export function silencios(archivo, { ruido = -38, minimo = 0.2 } = {}) {
  const r = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", archivo, "-af", `silencedetect=noise=${ruido}dB:d=${minimo}`, "-f", "null", "-"], { encoding: "utf8" });
  const log = r.stderr;
  const lista = [];
  let ini = null;
  for (const linea of log.split("\n")) {
    const a = linea.match(/silence_start: (-?[\d.]+)/);
    const b = linea.match(/silence_end: ([\d.]+)/);
    if (a) ini = Math.max(0, Number(a[1]));
    if (b) { lista.push([ini ?? 0, Number(b[1])]); ini = null; }
  }
  if (ini !== null) lista.push([ini, duracion(archivo)]);
  return lista;
}

/** Tramos con voz: [inicio, fin] en segundos. */
export function habla(archivo, opciones) {
  const total = duracion(archivo);
  const sil = silencios(archivo, opciones);
  const tramos = [];
  let cursor = 0;
  for (const [a, b] of sil) {
    if (a - cursor > 0.05) tramos.push([cursor, a]);
    cursor = b;
  }
  if (total - cursor > 0.05) tramos.push([cursor, total]);
  return tramos;
}

// ---------- Procesar la locución ----------
/**
 * Quita el silencio del principio y del final y acorta solo las pausas muy largas, conservando
 * el audio original de cada pausa (respiraciones incluidas) para que la voz suene natural.
 * Devuelve los tramos de habla ya en la línea de tiempo del audio procesado.
 */
export function procesarVoz(entrada, salida, { tempo = 1, pausaMax = 0.6, inicio = 0.1, cola = 0.2 } = {}) {
  const tramos = habla(entrada);
  const total = duracion(entrada);
  const conservar = [];
  let desde = Math.max(0, tramos[0][0] - 0.08);
  for (let i = 0; i < tramos.length - 1; i++) {
    const fin = tramos[i][1], sig = tramos[i + 1][0];
    if (sig - fin > pausaMax) { conservar.push([desde, fin + pausaMax / 2]); desde = sig - pausaMax / 2; }
  }
  conservar.push([desde, Math.min(total, tramos.at(-1)[1] + cola)]);

  const mapa = (t) => {
    let off = 0;
    for (const [x, y] of conservar) { if (t <= y) return off + Math.max(0, t - x); off += y - x; }
    return off;
  };
  const reales = tramos.map(([a, b]) => [inicio + mapa(a) / tempo, inicio + mapa(b) / tempo]);

  const piezas = conservar.map(([x, y], i) =>
    `[0:a]atrim=${x.toFixed(3)}:${y.toFixed(3)},asetpts=PTS-STARTPTS,afade=t=in:d=0.012,afade=t=out:st=${(y - x - 0.012).toFixed(3)}:d=0.012[p${i}]`);
  const filtro = [
    ...piezas,
    `${conservar.map((_, i) => `[p${i}]`).join("")}concat=n=${conservar.length}:v=0:a=1[c]`,
    `[c]${tempo !== 1 ? `atempo=${tempo},` : ""}adelay=delays=${Math.round(inicio * 1000)}:all=1,apad=pad_dur=0.6[out]`,
  ];
  execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-i", entrada, "-filter_complex", filtro.join(";"),
    "-map", "[out]", "-ar", "48000", "-ac", "1", salida]);
  return { tramos: reales, duracion: duracion(salida) };
}

// ---------- Alinear guion y tramos ----------
/**
 * Reparte las palabras entre los tramos de habla. Cada frontera entre tramos debe caer
 * después de una palabra; se premia que coincida con puntuación y que la duración de cada
 * tramo sea proporcional a lo que se dice en él.
 */
export function alinear(palabras, tramos) {
  const N = palabras.length, M = tramos.length;
  const acum = [0];
  for (const p of palabras) acum.push(acum.at(-1) + p.largo);
  const durHabla = tramos.reduce((s, [a, b]) => s + (b - a), 0);
  const ritmo = acum[N] / durHabla; // caracteres por segundo
  const costeFrontera = (i) => { // frontera tras la palabra i-1
    const p = palabras[i - 1].pausa;
    return p >= 2 ? 0 : p >= 1.5 ? 0.4 : p >= 1 ? 0.8 : 4;
  };
  const INF = 1e18;
  // dp[m][i]: coste mínimo asignando las i primeras palabras a los m primeros tramos
  const dp = Array.from({ length: M + 1 }, () => new Float64Array(N + 1).fill(INF));
  const de = Array.from({ length: M + 1 }, () => new Int32Array(N + 1).fill(-1));
  dp[0][0] = 0;
  for (let m = 1; m <= M; m++) {
    const d = tramos[m - 1][1] - tramos[m - 1][0];
    for (let i = m; i <= N - (M - m); i++) {
      for (let j = m - 1; j < i; j++) {
        if (dp[m - 1][j] >= INF) continue;
        const esperado = (acum[i] - acum[j]) / ritmo;
        const err = (d - esperado) / Math.max(0.6, Math.sqrt(d));
        // penaliza dejar dentro de un tramo un punto y seguido (pausa casi segura)
        let dentro = 0;
        for (let k = j + 1; k < i; k++) if (palabras[k - 1].pausa >= 2) dentro += 1.5;
        const c = dp[m - 1][j] + err * err + (i < N ? costeFrontera(i) : 0) + dentro;
        if (c < dp[m][i]) { dp[m][i] = c; de[m][i] = j; }
      }
    }
  }
  // reconstruir
  const cortes = [];
  let i = N;
  for (let m = M; m >= 1; m--) { const j = de[m][i]; cortes.unshift([j, i]); i = j; }
  const tiempos = [];
  cortes.forEach(([j, k], m) => {
    const [a, b] = tramos[m];
    const total = acum[k] - acum[j];
    for (let w = j; w < k; w++) {
      const ini = a + ((acum[w] - acum[j]) / total) * (b - a);
      const fin = a + ((acum[w + 1] - acum[j]) / total) * (b - a);
      tiempos.push({ texto: palabras[w].texto, ini: +ini.toFixed(3), fin: +fin.toFixed(3), tramo: m });
    }
  });
  return { tiempos, coste: dp[M][N], ritmo };
}

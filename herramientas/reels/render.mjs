// Renderiza un reel vertical (1080×1920, 30 fps) a partir de la carpeta del reel:
//   reel.mjs            guion de la locución, escenas (HTML con anclas al guion) y portada
//   voz-original.mp3    locución tal cual sale del generador de voz (o grabada con el móvil)
//   (opcional) reel.musica  ruta a una música de fondo, relativa a la carpeta del reel; baja sola cuando habla la voz
// Genera: reel.mp4, portada.jpg, subtitulos.srt y tiempos.json.
//
// Uso: NODE_PATH=$(npm root -g) node herramientas/reels/render.mjs <carpeta> [--previa]
//   --previa   solo genera fotogramas sueltos de cada escena en <carpeta>/.previa/ (rápido)
import { createRequire } from "node:module";
import { spawn, execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { procesarVoz, tokenizar, alinear } from "./audio.mjs";
import { construirFondo, descargar, revisarRepetidos } from "./fondo.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const AQUI = dirname(fileURLToPath(import.meta.url));
const FPS = 30;
const COLA = 0.9; // segundos de imagen fija tras la última palabra

const carpeta = resolve(process.argv[2] || ".");
const soloPrevia = process.argv.includes("--previa");
const reel = (await import(pathToFileURL(join(carpeta, "reel.mjs")).href)).default;
const tmp = join(carpeta, ".build");
mkdirSync(tmp, { recursive: true });

// ---------- 1. Voz y tiempos ----------
const vozWav = join(tmp, "voz.wav");
const { tramos, duracion: durVoz } = procesarVoz(join(carpeta, "voz-original.mp3"), vozWav, { tempo: reel.tempo ?? 1, ...(reel.voz || {}) });
const palabras = tokenizar(reel.guion);
const { tiempos } = alinear(palabras, tramos);
const duracion = +(tiempos.at(-1).fin + COLA).toFixed(3);

const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ%]/g, "");
const tokNorm = tiempos.map((w) => norm(w.texto));
function buscar(frase, desde = 0) {
  const objetivo = frase.split(/\s+/).map(norm).filter(Boolean);
  for (let i = desde; i <= tokNorm.length - objetivo.length; i++) {
    if (objetivo.every((p, k) => tokNorm[i + k] === p)) return i;
  }
  throw new Error(`No encuentro «${frase}» en el guion (desde la palabra ${desde})`);
}

// ---------- 2. Escenas: anclas → segundos ----------
let cursor = 0;
const escenas = reel.escenas.map((e, n) => {
  let ini = 0, idx = cursor;
  if (n > 0) { idx = buscar(e.en, cursor); ini = Math.max(0, tiempos[idx].ini - 0.12); cursor = idx; }
  let html = e.html.replace(/data-en="([^"]+)"/g, (_, frase) => {
    const i = buscar(frase, idx);
    return `data-t="${Math.max(n === 0 ? -1 : ini, tiempos[i].ini - 0.08).toFixed(3)}"`;
  });
  return { ini: n === 0 ? -1 : +ini.toFixed(3), html, clase: e.clase, fondo: e.fondo };
});
// La primera escena empieza en -1 s: lo que no tiene ancla ya está visible en el primer fotograma (el gancho no espera).
escenas.forEach((e, i) => { e.fin = i < escenas.length - 1 ? escenas[i + 1].ini : duracion + 1; });

// ---------- 3. Subtítulos ----------
const limpiar = (t) => t.replace(/[.,;:]+$/g, "").replace(/\.\.\.$/, "…");
const bloques = [];
let actual = [];
const cerrar = () => { if (actual.length) bloques.push(actual); actual = []; };
tiempos.forEach((w, i) => {
  if (actual.length && (w.tramo !== actual.at(-1).tramo)) cerrar();
  actual.push(w);
  const chars = actual.map((x) => x.texto).join(" ").length;
  const sig = tiempos[i + 1];
  if (palabras[i].pausa >= 1 || actual.length >= 4 || chars >= 20 || (sig && chars + sig.texto.length > 26)) cerrar();
});
cerrar();
const subtitulos = bloques.map((b, i) => ({
  ini: b[0].ini - 0.05,
  fin: i < bloques.length - 1 ? Math.min(bloques[i + 1][0].ini - 0.05, b.at(-1).fin + 0.6) : duracion,
  palabras: b.map((w) => ({ texto: limpiar(w.texto), ini: w.ini, fin: w.fin })),
}));

const srtT = (s) => { const ms = Math.round(Math.max(0, s) * 1000); const h = Math.floor(ms / 3.6e6), m = Math.floor(ms / 6e4) % 60, se = Math.floor(ms / 1000) % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(se).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`; };
writeFileSync(join(carpeta, "subtitulos.srt"), subtitulos.map((s, i) => `${i + 1}\n${srtT(s.ini)} --> ${srtT(s.fin)}\n${s.palabras.map((w) => w.texto).join(" ")}\n`).join("\n"));
writeFileSync(join(carpeta, "tiempos.json"), JSON.stringify({ duracion, escenas: escenas.map((e) => ({ ini: e.ini, fin: +e.fin.toFixed(3) })), palabras: tiempos }, null, 1));

// ---------- 4. Fotogramas ----------
const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
const plantilla = pathToFileURL(join(AQUI, "plantilla.html")).href;
const realista = reel.escenas.some((e) => e.fondo);
const datos = { tema: reel.tema, marcaAgua: reel.marcaAgua, duracion, escenas: escenas.map(({ fondo, ...e }) => e), subtitulos, realista };
const shot = (opts = {}) => pagina.screenshot(realista ? { type: "png", omitBackground: true, ...opts } : { type: "jpeg", quality: 95, ...opts });

// Fondo de vídeo real (modo realista)
const fondoMp4 = join(tmp, "fondo.mp4");
if (realista) revisarRepetidos(carpeta);
if (realista && !soloPrevia) {
  console.log("Montando el fondo de vídeo…");
  const { clips } = construirFondo(escenas, duracion, carpeta, fondoMp4, FPS);
  writeFileSync(join(carpeta, "creditos.txt"), "Vídeo de fondo: Pixabay (licencia de contenido de Pixabay, uso comercial sin atribución obligatoria)\n" +
    clips.map((c) => `- ${c.replace(/^pixabay:/, "https://pixabay.com/videos/id-")}`).join("\n") + "\n" + (reel.musica ? `Música: ${reel.musica}\n` : ""));
}

async function cargar(d) {
  await pagina.goto(plantilla);
  await pagina.evaluate((x) => window.__init(x), d);
  await pagina.evaluate(() => document.fonts.ready);
}

// Portada (1080×1920, con lo importante dentro del recorte 3:4 de la cuadrícula del perfil)
await cargar({ tema: reel.tema, marcaAgua: reel.marcaAgua, duracion: 10, portada: true, realista, escenas: [{ ini: -1, fin: 99, html: reel.portada.replace(/data-a="/g, 'data-t="-5" data-a="') }] });
await pagina.evaluate(() => window.__frame(5));
if (realista && !soloPrevia) {
  const capa = join(tmp, "portada.png");
  await shot({ path: capa });
  const t = Math.min(1.6, duracion / 2);
  execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-ss", String(t), "-i", fondoMp4, "-i", capa,
    "-filter_complex", "[0:v][1:v]overlay=0:0", "-frames:v", "1", "-q:v", "2", join(carpeta, "portada.jpg")]);
} else {
  await pagina.screenshot({ path: join(carpeta, "portada.jpg"), type: "jpeg", quality: 92 });
}

await cargar(datos);
if (soloPrevia) {
  const dir = join(carpeta, ".previa");
  mkdirSync(dir, { recursive: true });
  for (const [i, e] of escenas.entries()) {
    const t = Math.min(e.fin - 0.25, duracion - 0.05);
    await pagina.evaluate((x) => window.__frame(x), t);
    await pagina.screenshot({ path: join(dir, `escena-${String(i + 1).padStart(2, "0")}.jpg`), type: "jpeg", quality: 80 });
  }
  await pagina.evaluate(() => window.__frame(0));
  await pagina.screenshot({ path: join(dir, "fotograma-0.jpg"), type: "jpeg", quality: 80 });
  await navegador.close();
  console.log(`Previa en ${dir} · duración ${duracion.toFixed(1)} s · ${escenas.length} escenas`);
  process.exit(0);
}

const salidaMp4 = join(carpeta, "reel.mp4");
const musicaRuta = reel.musica ? (/^https?:/.test(reel.musica) ? descargar(reel.musica, carpeta) : resolve(carpeta, reel.musica)) : null;
const musica = musicaRuta && existsSync(musicaRuta) ? musicaRuta : null;
const bucle = reel.musicaBucle; // { ini, fin } en segundos: el tramo que se repite sin cortes
const volMusica = reel.volumenMusica ?? 0.14;
if (reel.musica && !musica) console.warn(`Aviso: no encuentro la música ${reel.musica}; el reel sale solo con voz.`);
const vIn = realista ? ["-i", fondoMp4, "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-"] : ["-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-"];
const a0 = realista ? 2 : 1; // índice de la entrada de voz
const musEntrada = musica ? (bucle ? ["-i", musica] : ["-stream_loop", "-1", "-i", musica]) : [];
const musFiltro = bucle
  ? `[${a0 + 1}:a]aformat=sample_rates=48000:channel_layouts=stereo,aloop=loop=-1:size=${Math.round((bucle.fin - bucle.ini) * 48000)}:start=${Math.round(bucle.ini * 48000)},asetpts=N/SR/TB,`
  : `[${a0 + 1}:a]aformat=sample_rates=48000:channel_layouts=stereo,`;
const vozFiltro = `[${a0}:a]highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120,apad=whole_dur=${duracion}`;
const audio = musica
  ? `${vozFiltro},aformat=sample_rates=48000:channel_layouts=stereo,asplit=2[voz][guia];` +
    `${musFiltro}atrim=0:${duracion},volume=${volMusica},afade=t=in:d=0.4,afade=t=out:st=${(duracion - 1.4).toFixed(2)}:d=1.4[m];` +
    `[m][guia]sidechaincompress=threshold=0.02:ratio=5:attack=30:release=450[mb];[voz][mb]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[a]`
  : `${vozFiltro},loudnorm=I=-14:TP=-1.5:LRA=9[a]`;
const video = realista ? "[0:v][1:v]overlay=0:0:format=auto,format=yuv420p[v];" : "";
const ff = spawn("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error",
  ...vIn, "-i", vozWav, ...musEntrada,
  "-filter_complex", video + audio,
  "-map", realista ? "[v]" : "0:v", "-map", "[a]",
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.1", "-r", String(FPS),
  "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-t", String(duracion), "-movflags", "+faststart", salidaMp4], { stdio: ["pipe", "inherit", "inherit"] });
const terminado = new Promise((ok, mal) => ff.on("close", (c) => (c === 0 ? ok() : mal(new Error(`ffmpeg salió con ${c}`)))));

const total = Math.ceil(duracion * FPS);
for (let f = 0; f < total; f++) {
  await pagina.evaluate((x) => window.__frame(x), f / FPS);
  const buf = await shot();
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  if (f % 150 === 0) process.stdout.write(`  fotograma ${f}/${total}\r`);
}
ff.stdin.end();
await terminado;
await navegador.close();
console.log(`\n${salidaMp4} · ${duracion.toFixed(1)} s · ${escenas.length} escenas · ${subtitulos.length} subtítulos`);

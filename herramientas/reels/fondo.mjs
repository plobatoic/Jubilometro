// Fondos de vídeo real para el modo «realista» de los reels.
//
// Cada escena de reel.mjs puede llevar `fondo`: un clip de stock o una lista de clips (se reparten la escena a partes iguales).
//   fondo: { clip: "pixabay:125430", desde: 1.5, x: 0.5 }
//     clip   "pixabay:<id>" (vídeo de Pixabay ya resuelto en Orshot, uso comercial libre y sin atribución obligatoria),
//            una URL https o una ruta local relativa a la carpeta del reel
//     desde  segundo del clip en el que empieza (por defecto 0)
//     x      encuadre horizontal al recortar a 9:16: 0 = izquierda, 0.5 = centro, 1 = derecha (por defecto 0.5)
// Los clips se descargan una vez a herramientas/reels/.cache/ (ignorada por git).
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join, resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = dirname(fileURLToPath(import.meta.url));
const CACHE = join(AQUI, ".cache");
const FUNDIDO = 0.45; // segundos de fundido entre clips

export function urlDe(clip) {
  const m = /^pixabay:(\d+)$/.exec(clip);
  if (m) return `https://storage.orshot.com/stock/pixabay/video/${m[1]}.mp4`;
  return clip;
}

export function descargar(clip, carpeta) {
  const url = urlDe(clip);
  if (!/^https?:\/\//.test(url)) return resolve(carpeta, url);
  mkdirSync(CACHE, { recursive: true });
  const m = /^pixabay:(\d+)$/.exec(clip);
  const destino = join(CACHE, m ? `pixabay-${m[1]}.mp4` : basename(new URL(url).pathname));
  if (!existsSync(destino)) {
    console.log(`  descargando ${clip}`);
    execFileSync("curl", ["-sSfL", "--retry", "3", "-o", destino, url], { stdio: "inherit" });
  }
  return destino;
}

const duracionDe = (f) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString().trim());

// escenas: [{ini, fin, fondo}] con tiempos ya resueltos. Devuelve la ruta del vídeo de fondo (1080×1920, 30 fps, sin audio).
export function construirFondo(escenas, duracion, carpeta, salida, fps = 30) {
  // 1. Tramos: cada escena se reparte entre sus clips
  const tramos = [];
  escenas.forEach((e, i) => {
    const ini = Math.max(0, e.ini), fin = Math.min(duracion, e.fin);
    const lista = [].concat(e.fondo || (tramos.length ? tramos.at(-1).spec : null)).filter(Boolean);
    if (!lista.length) throw new Error(`La escena ${i + 1} no tiene fondo y no hay uno anterior que repetir`);
    const trozo = (fin - ini) / lista.length;
    lista.forEach((spec, k) => tramos.push({ spec, ini: ini + k * trozo, dur: trozo }));
  });
  // Tramos contiguos con el mismo clip se funden en uno (sin corte)
  const unidos = [];
  for (const t of tramos) {
    const prev = unidos.at(-1);
    if (prev && prev.spec === t.spec) prev.dur += t.dur; else unidos.push({ ...t });
  }

  // 2. Filtro de ffmpeg
  const entradas = [], filtros = [];
  unidos.forEach((t, k) => {
    const archivo = descargar(t.spec.clip, carpeta);
    const disponible = duracionDe(archivo) - (t.spec.desde || 0);
    const largo = t.dur + (k < unidos.length - 1 ? FUNDIDO : 0);
    // Si el clip se queda corto, se ralentiza (cámara lenta suave, hasta 0,6×); si aún falta, se repite.
    const factor = Math.min(1, Math.max(0.6, disponible / largo));
    entradas.push("-stream_loop", "-1", "-ss", String(t.spec.desde || 0), "-i", archivo);
    const x = t.spec.x ?? 0.5;
    filtros.push(`[${k}:v]setpts=(PTS-STARTPTS)/${factor.toFixed(4)},fps=${fps},trim=duration=${largo.toFixed(3)},setpts=PTS-STARTPTS,` +
      `scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920:(iw-1080)*${x}:(ih-1920)/2,` +
      `eq=contrast=1.05:saturation=0.9:brightness=-0.02,setsar=1,format=yuv420p[c${k}]`);
  });
  let previo = "c0", acumulado = unidos[0].dur + (unidos.length > 1 ? FUNDIDO : 0);
  for (let k = 1; k < unidos.length; k++) {
    const offset = acumulado - FUNDIDO;
    filtros.push(`[${previo}][c${k}]xfade=transition=fade:duration=${FUNDIDO}:offset=${offset.toFixed(3)}[x${k}]`);
    previo = `x${k}`;
    acumulado = offset + unidos[k].dur + (k < unidos.length - 1 ? FUNDIDO : 0);
  }
  execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...entradas,
    "-filter_complex", filtros.join(";"), "-map", `[${previo}]`, "-t", duracion.toFixed(3), "-an",
    "-c:v", "libx264", "-preset", "medium", "-crf", "16", "-pix_fmt", "yuv420p", "-r", String(fps), salida], { stdio: "inherit" });
  return { salida, clips: unidos.map((t) => t.spec.clip) };
}

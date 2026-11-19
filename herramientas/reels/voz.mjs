// Voz de los reels, generada aquí mismo, gratis y sin créditos (elegida por Pau el 19/11/2026: muestra «1c»).
// Piper con la voz «davefx» (español de España, licencia CC0) y un repaso de sonido para que no suene metálica:
// sin recortes, menos agudos, más cuerpo, un poco de sala y volumen de redes (−16 LUFS).
//
// Uso: node herramientas/reels/voz.mjs <carpeta-del-reel> [<carpeta> …]
//   Lee voz.txt de cada carpeta y escribe voz-original.mp3. Si ya existe, la rehace.
// Requisitos: pip install piper-tts (una vez). El modelo se descarga solo a herramientas/reels/.cache/.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = dirname(fileURLToPath(import.meta.url));
const CACHE = join(AQUI, ".cache", "piper");
const BASE = "https://huggingface.co/rhasspy/piper-voices/resolve/main/es/es_ES/davefx/medium/es_ES-davefx-medium";
const MODELO = join(CACHE, "es_ES-davefx-medium.onnx");

// Ajustes de la muestra 1c
const PIPER = ["--volume", "0.5", "--noise-scale", "0.5", "--noise-w-scale", "0.333", "--length-scale", "1.05", "--sentence-silence", "0.3"];
const FILTRO = [
  "highpass=f=75", "lowpass=f=7200",
  "equalizer=f=180:t=q:w=1:g=2.5", "equalizer=f=4500:t=q:w=1.5:g=-4", "equalizer=f=8000:t=q:w=1:g=-6",
  "deesser=i=0.4", "aecho=0.85:0.6:28|47:0.08|0.05",
  "acompressor=threshold=-20dB:ratio=2.5:attack=8:release=100:makeup=2",
  "loudnorm=I=-16:TP=-2:LRA=7", "aresample=44100",
].join(",");

function modelo() {
  mkdirSync(CACHE, { recursive: true });
  for (const ext of [".onnx", ".onnx.json"]) {
    const destino = MODELO.replace(/\.onnx$/, ext);
    if (!existsSync(destino)) execFileSync("curl", ["-sSfL", "--retry", "3", "-o", destino, BASE + ext], { stdio: "inherit" });
  }
}

export function generarVoz(carpeta) {
  const txt = join(carpeta, "voz.txt");
  if (!existsSync(txt)) throw new Error(`Falta ${txt}`);
  modelo();
  const texto = readFileSync(txt, "utf8").replace(/\s*\n\s*/g, " ").trim();
  const crudo = join(carpeta, ".voz-cruda.wav");
  execFileSync("python3", ["-m", "piper", "-m", MODELO, ...PIPER, "-f", crudo], { input: texto, stdio: ["pipe", "ignore", "inherit"] });
  const salida = join(carpeta, "voz-original.mp3");
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", crudo, "-af", FILTRO, "-b:a", "160k", salida], { stdio: "inherit" });
  rmSync(crudo);
  writeFileSync(join(carpeta, "voz.info"), "Piper · es_ES-davefx-medium (CC0) · ajustes «1c» de herramientas/reels/voz.mjs\n");
  return salida;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const carpetas = process.argv.slice(2);
  if (!carpetas.length) { console.error("Uso: node herramientas/reels/voz.mjs <carpeta> [<carpeta> …]"); process.exit(1); }
  for (const c of carpetas) console.log("Voz:", generarVoz(resolve(c)));
}

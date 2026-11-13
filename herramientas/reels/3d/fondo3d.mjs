// Renderiza las escenas 3D (`animacion`) de un reel a un vídeo de fondo 1080×1920 que luego recibe la capa de textos.
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { spawn } from "node:child_process";
import { join, resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const TIPOS = { ".js": "text/javascript", ".mjs": "text/javascript", ".html": "text/html", ".json": "application/json" };

function servidor() {
  const srv = createServer((q, s) => {
    const f = join(RAIZ, decodeURIComponent(q.url.split("?")[0]));
    if (!f.startsWith(RAIZ) || !existsSync(f) || statSync(f).isDirectory()) { s.statusCode = 404; return s.end(); }
    s.setHeader("Content-Type", TIPOS[extname(f)] || "application/octet-stream");
    createReadStream(f).pipe(s);
  });
  return new Promise((ok) => srv.listen(0, "127.0.0.1", () => ok(srv)));
}

export async function abrirMotor3d(datos) {
  const { chromium } = require("playwright");
  const srv = await servidor();
  const nav = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const pag = await nav.newPage({ viewport: { width: 1080, height: 1920 } });
  pag.on("pageerror", (e) => console.error("Error en el motor 3D:", e.message));
  await pag.goto(`http://127.0.0.1:${srv.address().port}/herramientas/reels/3d/motor.html`);
  await pag.waitForFunction(() => typeof window.__init3d === "function", null, { timeout: 30000 });
  await pag.evaluate((d) => window.__init3d(d), datos);
  await pag.evaluate(() => document.fonts.ready);
  const cerrar = async () => { await nav.close(); srv.close(); };
  return { pag, cerrar };
}

export async function construirFondo3d(datos, salida, fps = 30) {
  const { pag, cerrar } = await abrirMotor3d(datos);
  const ff = spawn("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-preset", "medium", "-crf", "15", "-pix_fmt", "yuv420p", "-r", String(fps), salida], { stdio: ["pipe", "inherit", "inherit"] });
  const fin = new Promise((ok, mal) => ff.on("close", (c) => (c === 0 ? ok() : mal(new Error(`ffmpeg salió con ${c}`)))));
  const total = Math.ceil(datos.duracion * fps);
  for (let f = 0; f < total; f++) {
    await pag.evaluate((x) => window.__frame3d(x), f / fps);
    const buf = await pag.screenshot({ type: "jpeg", quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (f % 150 === 0) process.stdout.write(`  3D ${f}/${total}\r`);
  }
  ff.stdin.end();
  await fin;
  await cerrar();
  return salida;
}

// Fotogramas sueltos para revisar encuadres sin hacer el vídeo entero
export async function fotogramas3d(datos, tiempos, carpeta) {
  const { pag, cerrar } = await abrirMotor3d(datos);
  const rutas = [];
  for (const [i, t] of tiempos.entries()) {
    await pag.evaluate((x) => window.__frame3d(x), t);
    const ruta = join(carpeta, `3d-${String(i + 1).padStart(2, "0")}.jpg`);
    await pag.screenshot({ path: ruta, type: "jpeg", quality: 85 });
    rutas.push(ruta);
  }
  await cerrar();
  return rutas;
}

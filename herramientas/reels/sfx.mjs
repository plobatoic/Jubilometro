// Efectos de sonido del estilo dinámico, sintetizados aquí mismo (sin archivos ni licencias de terceros).
// pistaSfx(eventos, duracion, salida) escribe un WAV mono a 48 kHz con cada efecto en su momento.
//   eventos: [{ t: segundos, tipo: "whoosh" | "swish" | "pop" | "golpe" | "tic" | "brillo" }]
import { writeFileSync } from "node:fs";

const SR = 48000;

function ruido(semilla = 1) {
  let a = semilla >>> 0;
  return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 2147483648 - 1; };
}

// Filtro paso banda sencillo (biquad) con frecuencia variable
function pasoBanda(x, f0, f1, q = 0.9) {
  const y = new Float32Array(x.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let n = 0; n < x.length; n++) {
    const f = f0 * Math.pow(f1 / f0, n / x.length);
    const w = (2 * Math.PI * f) / SR, al = Math.sin(w) / (2 * q), c = Math.cos(w);
    const b0 = al, b2 = -al, a0 = 1 + al, a1 = -2 * c, a2 = 1 - al;
    const v = (b0 * x[n] + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x[n]; y2 = y1; y1 = v; y[n] = v;
  }
  return y;
}

function sintetizar(tipo, semilla) {
  const r = ruido(semilla);
  const hacer = (dur, fn) => { const n = Math.round(dur * SR), o = new Float32Array(n); for (let i = 0; i < n; i++) o[i] = fn(i / SR, i); return o; };
  switch (tipo) {
    case "whoosh": {
      const d = 0.5, base = hacer(d, () => r());
      const f = pasoBanda(base, 300, 3200, 0.8);
      return f.map((v, i) => { const t = i / SR; return v * 1.6 * Math.sin(Math.PI * Math.min(1, t / d)) ** 1.5; });
    }
    case "swish": {
      const d = 0.3, base = hacer(d, () => r());
      const f = pasoBanda(base, 1800, 5200, 0.9);
      return f.map((v, i) => { const t = i / SR; return v * 1.2 * Math.sin(Math.PI * Math.min(1, t / d)) ** 2; });
    }
    case "pop":
      return hacer(0.14, (t) => 0.55 * Math.sin(2 * Math.PI * (420 * t + 5200 * t * t)) * Math.exp(-t * 32));
    case "golpe":
      return hacer(0.6, (t) => 0.9 * Math.sin(2 * Math.PI * (95 * t - 40 * t * t)) * Math.exp(-t * 7) + 0.35 * r() * Math.exp(-t * 45));
    case "tic":
      return hacer(0.06, (t) => 0.32 * Math.sin(2 * Math.PI * 2300 * t) * Math.exp(-t * 90));
    case "brillo":
      return hacer(1.1, (t) => 0.22 * (Math.sin(2 * Math.PI * 1318.5 * t) * Math.exp(-t * 4) + 0.6 * Math.sin(2 * Math.PI * 1975.5 * t) * Math.exp(-t * 5) + 0.4 * Math.sin(2 * Math.PI * 2637 * t) * Math.exp(-t * 7)));
    default:
      return new Float32Array(0);
  }
}

export function pistaSfx(eventos, duracion, salida) {
  const pista = new Float32Array(Math.ceil((duracion + 1) * SR));
  eventos.forEach((e, k) => {
    const s = sintetizar(e.tipo, 17 + k * 31);
    const ini = Math.max(0, Math.round((e.t - (e.tipo === "whoosh" ? 0.18 : 0)) * SR));
    for (let i = 0; i < s.length && ini + i < pista.length; i++) pista[ini + i] += s[i];
  });
  // Limitador suave para que nada sature
  const pcm = Buffer.alloc(pista.length * 2);
  for (let i = 0; i < pista.length; i++) pcm.writeInt16LE(Math.round(Math.tanh(pista[i]) * 32000), i * 2);
  const cab = Buffer.alloc(44);
  cab.write("RIFF", 0); cab.writeUInt32LE(36 + pcm.length, 4); cab.write("WAVE", 8); cab.write("fmt ", 12);
  cab.writeUInt32LE(16, 16); cab.writeUInt16LE(1, 20); cab.writeUInt16LE(1, 22); cab.writeUInt32LE(SR, 24);
  cab.writeUInt32LE(SR * 2, 28); cab.writeUInt16LE(2, 32); cab.writeUInt16LE(16, 34); cab.write("data", 36); cab.writeUInt32LE(pcm.length, 40);
  writeFileSync(salida, Buffer.concat([cab, pcm]));
  return salida;
}

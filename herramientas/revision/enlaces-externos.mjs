// Revisión diaria · enlaces a webs externas (BOE, Seguridad Social, comunidades…) de guías y páginas.
// Muchas webs públicas bloquean a los robots o a conexiones de fuera de España (403, 503, conexión cortada):
// esos fallos se comprueban luego con otra red (WebFetch) antes de tocar nada. Solo un 404 o 410 claro es un enlace roto.
// Uso: node herramientas/revision/enlaces-externos.mjs salida.json
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const RAIZ = new URL('../../', import.meta.url).pathname;
const UA = 'JubilometroBot/1.0 (https://jubilometro.com)';
const archivos = [];
const recorrer = (d, filtro) => { for (const n of readdirSync(d)) { const r = join(d, n); if (statSync(r).isDirectory()) recorrer(r, filtro); else if (filtro(n)) archivos.push(r); } };
recorrer(join(RAIZ, 'contenido'), (n) => n === 'articulo.md');
recorrer(join(RAIZ, 'paginas'), (n) => n.endsWith('.md'));
recorrer(join(RAIZ, 'publicacion/paginas-vivas'), (n) => n.endsWith('.html'));
recorrer(join(RAIZ, 'publicacion/paginas-web'), (n) => n.endsWith('.html'));
const urls = new Map();
for (const f of archivos) {
  const t = readFileSync(f, 'utf8').replace(/&amp;/g, '&');
  for (let u of t.match(/https?:\/\/[^\s"'<>\]]+/g) || []) {
    // un ")" final solo es del enlace si abre otro "(" dentro
    while (/[.,;:)]$/.test(u) && !(u.endsWith(')') && (u.match(/\(/g) || []).length >= (u.match(/\)/g) || []).length)) u = u.slice(0, -1);
    if (/jubilometro\.com|images\.unsplash\.com|schema\.org|w3\.org/.test(u)) continue;
    if (!urls.has(u)) urls.set(u, new Set());
    urls.get(u).add(f.replace(RAIZ, ''));
  }
}
const lista = [...urls.keys()];
const res = {};
async function probar(u) {
  for (const metodo of ['HEAD', 'GET']) {
    try {
      const r = await fetch(u, { method: metodo, redirect: 'follow', headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
      if (r.ok) return '200';
      if (metodo === 'GET') return String(r.status);
    } catch (e) { if (metodo === 'GET') return 'error ' + (e.cause?.code || e.name); }
  }
}
let i = 0;
await Promise.all(Array.from({ length: 6 }, async () => { while (i < lista.length) { const u = lista[i++]; res[u] = await probar(u); } }));
// Webs que desde este entorno dan 404 a páginas que sí existen (comprobado con WebFetch el 2 y el 3/11/2026)
const FALSO_404 = /(^|\.)comunidad\.madrid$/;
const malos = lista.filter((u) => res[u] !== '200').map((u) => ({ url: u, estado: res[u], roto: /^(404|410)$/.test(res[u]) && !FALSO_404.test(new URL(u).hostname), en: [...urls.get(u)].slice(0, 4) }));
writeFileSync(process.argv[2], JSON.stringify(malos, null, 1));
console.log('enlaces', lista.length, '· no responden 200:', malos.length, '· 404/410:', malos.filter((m) => m.roto).length);

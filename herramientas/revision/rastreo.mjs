// Revisión diaria · rastreo prudente de jubilometro.com: todas las URL de los mapas del sitio, sus enlaces internos e
// imágenes propias (estado, redirecciones, título, descripción, canonical, robots, H1, imágenes sin alt, peso, tiempo).
// Uso: node herramientas/revision/rastreo.mjs salida.json   (espera entre peticiones para no activar la protección de Hostinger)
// Rastreo prudente de jubilometro.com: todas las URL de los sitemaps, sus enlaces internos e imágenes propias.
import { writeFileSync } from 'node:fs';
const UA = 'JubilometroBot/1.0 (https://jubilometro.com)';
const W = 'https://jubilometro.com';
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
async function pedir(url, metodo = 'GET') {
  for (let i = 1; i <= 4; i++) {
    const t0 = Date.now();
    try {
      const r = await fetch(url, { method: metodo, redirect: 'manual', headers: { 'User-Agent': UA } });
      const body = metodo === 'GET' ? await r.text() : '';
      if (r.status === 403 && /Bot Verification/.test(body)) { await dormir(20000 * i); continue; }
      return { status: r.status, loc: r.headers.get('location'), body, ms: Date.now() - t0, tipo: r.headers.get('content-type') };
    } catch (e) { await dormir(3000 * i); }
  }
  return { status: 0, body: '' };
}
const urls = [];
for (const sm of ['page-sitemap.xml', 'post-sitemap.xml']) {
  const r = await pedir(`${W}/${sm}`);
  urls.push(...[...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}
const paginas = [], destinos = new Map();
for (const u of urls) {
  const r = await pedir(u);
  const b = r.body;
  const g = (re) => (b.match(re) || [])[1];
  const main = b.slice(b.indexOf('<main'), b.lastIndexOf('</main>'));
  const links = [...main.matchAll(/<a\b[^>]*href="([^"#]*)(#[^"]*)?"/g)].map((m) => m[1]).filter((h) => h.startsWith('/') || h.startsWith(W)).map((h) => (h.startsWith('/') ? W + h : h).split('?')[0]);
  const imgs = [...b.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map((m) => m[1]).filter((h) => h.startsWith('/') || h.startsWith(W)).map((h) => (h.startsWith('/') ? W + h : h));
  const sinAlt = [...b.matchAll(/<img\b[^>]*>/g)].filter((m) => !/\balt="[^"]+"/.test(m[0]) && !/aria-hidden|alt=""/.test(m[0])).length;
  paginas.push({ url: u, status: r.status, ms: r.ms, kb: Math.round(b.length / 1024), title: g(/<title>([^<]*)<\/title>/), desc: g(/<meta name="description" content="([^"]*)"/), canon: g(/<link rel="canonical" href="([^"]*)"/), robots: g(/<meta name="robots" content="([^"]*)"/), h1: (b.match(/<h1\b/g) || []).length, sinAlt, links: links.length });
  for (const l of [...links, ...imgs]) { if (!destinos.has(l)) destinos.set(l, new Set()); destinos.get(l).add(u); }
  await dormir(350);
}
const estado = {};
const sitemap = new Set(urls);
for (const d of destinos.keys()) {
  if (sitemap.has(d)) { estado[d] = 200; continue; }
  const r = await pedir(d, /\.(png|jpe?g|webp|svg|gif|pdf|csv)$/i.test(d) ? 'HEAD' : 'GET');
  estado[d] = r.status + (r.loc ? ' -> ' + r.loc : '');
  await dormir(300);
}
const malos = Object.entries(estado).filter(([, s]) => !String(s).startsWith('200')).map(([d, s]) => ({ destino: d, estado: s, desde: [...destinos.get(d)].slice(0, 5) }));
writeFileSync(process.argv[2], JSON.stringify({ paginas, malos }, null, 1));
console.log('páginas', paginas.length, 'destinos', destinos.size, 'malos', malos.length);

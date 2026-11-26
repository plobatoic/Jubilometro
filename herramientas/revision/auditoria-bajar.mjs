// Auditoría de SEO y rastreo (cada tres días): descarga todas las páginas del mapa del sitio y prueba URL de WordPress que no deben indexarse.
// Uso: mkdir -p <carpeta>/html && node herramientas/revision/auditoria-bajar.mjs <carpeta>   (luego: python3 herramientas/revision/auditoria-analiza.py <carpeta>)
import { writeFileSync, mkdirSync } from 'node:fs';
const D = process.argv[2];
const UA = 'JubilometroBot/1.0 (https://jubilometro.com)';
const W = 'https://jubilometro.com';
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
async function pedir(url) {
  for (let i = 1; i <= 4; i++) {
    const t0 = Date.now();
    try {
      const r = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': UA, 'Accept-Encoding': 'gzip' } });
      const body = await r.text();
      if (r.status === 403 && /Bot Verification/.test(body)) { await dormir(20000 * i); continue; }
      const h = {}; r.headers.forEach((v, k) => (h[k] = v));
      return { status: r.status, h, body, ms: Date.now() - t0 };
    } catch (e) { await dormir(3000 * i); }
  }
  return { status: 0, h: {}, body: '' };
}
const idx = await pedir(`${W}/sitemap_index.xml`);
const sms = [...idx.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sitemap = {};
for (const sm of sms) {
  const r = await pedir(sm);
  const ents = [...r.body.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({ loc: (m[1].match(/<loc>([^<]+)/) || [])[1], lastmod: (m[1].match(/<lastmod>([^<]+)/) || [])[1], imgs: (m[1].match(/<image:loc>/g) || []).length }));
  sitemap[sm] = ents;
}
writeFileSync(`${D}/sitemaps.json`, JSON.stringify({ sms, sitemap }, null, 1));
const urls = [...new Set(Object.values(sitemap).flat().map((e) => e.loc))];
const meta = [];
let n = 0;
for (const u of urls) {
  const r = await pedir(u);
  const f = `p${String(n++).padStart(3, '0')}.html`;
  writeFileSync(`${D}/html/${f}`, r.body);
  meta.push({ url: u, f, status: r.status, ms: r.ms, h: r.h });
  await dormir(400);
}
// URL de WordPress que no deberían indexarse o deberían redirigir
const pruebas = ['/?p=1', '/author/', '/author/admin/', '/category/sin-categoria/', '/tag/', '/feed/', '/comments/feed/', '/page/2/', '/2026/', '/2026/11/', '/?s=pension', '/search/pension/', '/xmlrpc.php', '/wp-json/wp/v2/users', '/esto-no-existe-auditoria/', '/jubilacion/edad-de-jubilacion', '/JUBILACION/edad-de-jubilacion/', '/index.php', '/wp-login.php', '/readme.html', '/license.txt', '/llms.txt', '/ads.txt', '/robots.txt', '/sitemap.xml', '/jubilacion/feed/', '/jubilacion/edad-de-jubilacion/feed/', '/jubilacion/edad-de-jubilacion/amp/', '/attachment/', '/wp-content/uploads/'];
const extra = [];
for (const p of pruebas) { const r = await pedir(W + p); extra.push({ p, status: r.status, loc: r.h.location, robots: r.h['x-robots-tag'], tipo: r.h['content-type'], len: r.body.length, noindex: /<meta[^>]+noindex/i.test(r.body) }); await dormir(400); }
for (const v of ['http://jubilometro.com/', 'https://www.jubilometro.com/', 'http://www.jubilometro.com/']) { const r = await pedir(v); extra.push({ p: v, status: r.status, loc: r.h.location }); }
writeFileSync(`${D}/meta.json`, JSON.stringify({ meta, extra }, null, 1));
console.log('hecho', urls.length);

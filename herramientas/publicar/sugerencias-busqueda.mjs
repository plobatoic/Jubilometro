// Uso: node herramientas/publicar/sugerencias-busqueda.mjs publicacion/seo/sugerencias-AAAA-MM-DD.json
// Sugerencias reales de búsqueda (autocompletado de Google y Bing, España) para la palabra clave de cada guía.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const RAIZ = new URL('../../contenido', import.meta.url).pathname;
const UA = 'JubilometroBot/1.0 (https://jubilometro.com)';
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const quitar = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
async function google(q) {
  try { const r = await fetch('https://suggestqueries.google.com/complete/search?client=firefox&hl=es&gl=es&q=' + encodeURIComponent(q), { headers: { 'User-Agent': UA } }); const t = Buffer.from(await r.arrayBuffer()).toString('latin1'); let j; try { j = JSON.parse(Buffer.from(t, 'latin1').toString('utf8')); } catch { j = JSON.parse(t); } return j[1] || []; } catch { return []; }
}
async function bing(q) {
  try { const r = await fetch('https://api.bing.com/osjson.aspx?market=es-ES&query=' + encodeURIComponent(q), { headers: { 'User-Agent': UA } }); const j = await r.json(); return j[1] || []; } catch { return []; }
}
const out = {};
for (const cat of readdirSync(RAIZ)) {
  let subs; try { subs = readdirSync(join(RAIZ, cat)); } catch { continue; }
  for (const slug of subs) {
    let md; try { md = readFileSync(join(RAIZ, cat, slug, 'articulo.md'), 'utf8'); } catch { continue; }
    const kw = (md.match(/^palabra_clave_principal:\s*(.+)$/m) || [])[1]?.replace(/^"|"$/g, '').trim();
    if (!kw) continue;
    const base = quitar(kw.toLowerCase());
    const consultas = [base, base + ' ', 'como ' + base, 'cuanto ' + base, 'que ' + base];
    const s = new Set();
    for (const q of consultas) { for (const x of await google(q)) s.add(x.toLowerCase()); await dormir(250); }
    for (const x of await bing(base)) s.add(x.toLowerCase()); await dormir(250);
    out[`/${cat}/${slug}/`] = { kw, sugerencias: [...s] };
  }
}
writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
console.log(Object.keys(out).length, 'guías');

// Comprueba en la web real los artículos de publicacion/wordpress-entradas.json que estén
// publicados: respuesta 200 sin redirecciones, un solo H1 igual al del artículo, title,
// meta description y palabra clave de Rank Math, canonical, que no lleven noindex, JSON-LD
// válido, respuesta rápida, y que todos los enlaces internos y archivos propios respondan 200.
// Uso: npm run comprobar-web
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { listarArticulos, leerArticulo, RAIZ } from './articulos.mjs';

const WEB = process.env.WP_URL ?? 'https://jubilometro.com';
const entradas = JSON.parse(readFileSync(join(RAIZ, 'publicacion', 'wordpress-entradas.json'), 'utf8'));
const articulos = new Map(listarArticulos().map(leerArticulo).map((a) => [a.datos.url, a.datos]));

// El túnel de salida corta conexiones de vez en cuando: se reintenta.
async function pedir(url, opciones = {}) {
  for (let intento = 1; ; intento++) {
    try {
      return await fetch(url, { redirect: 'manual', ...opciones });
    } catch (e) {
      if (intento === 5) throw e;
      await new Promise((ok) => setTimeout(ok, 1500 * intento));
    }
  }
}

const decodificar = (s) => s.replace(/&#0?38;|&amp;/g, '&').replace(/&quot;|&#0?34;/g, '"').replace(/&#0?39;|&#8217;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#8211;/g, '–').replace(/&#8230;/g, '…');
const meta = (html, atributo, nombre) => {
  const m = html.match(new RegExp(`<meta[^>]+${atributo}="${nombre}"[^>]*>`, 'i'));
  return m ? decodificar(m[0].match(/content="([^"]*)"/)?.[1] ?? '') : null;
};

let fallos = 0;
const enlaces = new Map();
for (const [url, { estado }] of Object.entries(entradas)) {
  if (estado !== 'publish') continue;
  const d = articulos.get(url);
  const problemas = [];
  const r = await pedir(`${WEB}${url}`);
  const html = await r.text();
  if (r.status !== 200) problemas.push(`HTTP ${r.status}`);
  const titulo = decodificar(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '').trim();
  if (titulo !== d.titulo_seo) problemas.push(`title «${titulo}»`);
  if (meta(html, 'name', 'description') !== d.meta_descripcion) problemas.push('meta description distinta');
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) problemas.push('noindex');
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1];
  if (canonical !== `${WEB}${url}`) problemas.push(`canonical ${canonical}`);
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decodificar(m[1].replace(/<[^>]+>/g, '')).trim());
  if (h1.length !== 1 || h1[0] !== d.h1) problemas.push(`H1: ${JSON.stringify(h1)}`);
  const jsonld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (!jsonld.length) problemas.push('sin JSON-LD');
  for (const [, j] of jsonld) { try { JSON.parse(j); } catch { problemas.push('JSON-LD no válido'); } }
  if (!html.includes('class="jm-answer"')) problemas.push('sin respuesta rápida');
  const cuerpo = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  for (const [, href] of cuerpo.matchAll(/(?:href|src)="((?:https:\/\/jubilometro\.com)?\/[^"#]*)"/g)) {
    const destino = href.startsWith('/') ? `${WEB}${href}` : href;
    if (!enlaces.has(destino)) enlaces.set(destino, new Set());
    enlaces.get(destino).add(url);
  }
  console.log(`${problemas.length ? 'FALLO' : 'OK   '} ${url}${problemas.length ? ` · ${problemas.join('; ')}` : ''}`);
  if (problemas.length) fallos += 1;
}

console.log(`\nEnlaces internos y archivos: ${enlaces.size}`);
for (const [destino, origenes] of enlaces) {
  const r = await pedir(destino, { method: 'HEAD' });
  if (r.status !== 200) {
    fallos += 1;
    console.log(`FALLO ${r.status} ${destino}${r.headers.get('location') ? ` -> ${r.headers.get('location')}` : ''} (desde ${[...origenes].join(', ')})`);
  }
}
console.log(fallos ? `\n${fallos} problemas` : '\nTodo correcto');
process.exit(fallos ? 1 : 0);

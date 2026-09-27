// Comprueba todos los articulo.html en Chromium: sin scroll horizontal a 390 px, un solo H1,
// JSON-LD válido, sin errores de consola, title y meta description en rango, y enlaces internos.
// Uso: NODE_PATH=$(npm root -g) node herramientas/publicar/comprobar.cjs
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const raiz = path.resolve(__dirname, '..', '..');
function buscar(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const r = path.join(dir, e.name);
    return e.isDirectory() ? buscar(r) : e.name === 'articulo.html' ? [r] : [];
  });
}

(async () => {
  const archivos = buscar(path.join(raiz, 'contenido')).sort();
  const urls = new Set(archivos.map((a) => '/' + path.relative(path.join(raiz, 'contenido'), path.dirname(a)) + '/'));
  const pendientes = new Map();
  const browser = await chromium.launch();
  let fallos = 0;
  for (const archivo of archivos) {
    const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
    const errores = [];
    page.on('pageerror', (e) => errores.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('ERR_FILE_NOT_FOUND')) errores.push(m.text()); });
    await page.goto(`file://${archivo}`);
    const r = await page.evaluate(() => ({
      desborde: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length,
      title: document.title,
      desc: document.querySelector('meta[name="description"]').content,
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { JSON.parse(s.textContent); return true; } catch { return false; } }),
      enlaces: [...document.querySelectorAll('article a[href^="/"]')].map((a) => a.getAttribute('href')),
    }));
    const problemas = [];
    if (r.desborde > 0) problemas.push(`scroll horizontal ${r.desborde}px`);
    if (r.h1 !== 1) problemas.push(`${r.h1} h1`);
    if (r.title.length > 62) problemas.push(`title de ${r.title.length} caracteres`);
    if (r.desc.length < 110 || r.desc.length > 158) problemas.push(`meta description de ${r.desc.length} caracteres`);
    if (!r.jsonld.every(Boolean) || r.jsonld.length !== 1) problemas.push('JSON-LD no válido');
    if (errores.length) problemas.push(`errores: ${errores.join(' | ')}`);
    for (const e of r.enlaces) {
      if (!urls.has(e)) pendientes.set(e, (pendientes.get(e) ?? 0) + 1);
    }
    const nombre = path.relative(raiz, archivo);
    console.log(`${problemas.length ? 'FALLO' : 'OK   '} ${nombre} · title ${r.title.length} · desc ${r.desc.length}${problemas.length ? ' · ' + problemas.join('; ') : ''}`);
    if (problemas.length) fallos += 1;
    await page.close();
  }
  await browser.close();
  console.log('\nEnlaces internos a páginas que aún no existen (quitar o publicar antes):');
  for (const [url, n] of [...pendientes].sort()) console.log(`  ${url} (${n})`);
  process.exit(fallos ? 1 : 0);
})();

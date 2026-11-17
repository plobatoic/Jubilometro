// Uso: NODE_PATH=$(npm root -g) node herramientas/revision/barrido-navegador.cjs <salida.json>   (lanzar con run_in_background: tarda unos 10 minutos)
// Recorre todas las URL del sitemap con un móvil (390 px): errores de JS, recursos propios rotos,
// imágenes que no cargan, desplazamiento lateral y anuncios de AdSense pintados.
const { chromium } = require('playwright');
const fs = require('fs');
const UA = 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Mobile Safari/537.36 JubilometroBot/1.0 (https://jubilometro.com)';
(async () => {
  const idx = await (await fetch('https://jubilometro.com/sitemap_index.xml', { headers: { 'User-Agent': UA } })).text();
  const maps = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  let urls = [];
  for (const m of maps) { const x = await (await fetch(m, { headers: { 'User-Agent': UA } })).text(); urls.push(...[...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((k) => k[1]).filter((u) => !/\.(jpg|png|webp|gif)$/.test(u))); }
  urls = [...new Set(urls)];
  console.log('URL en el sitemap:', urls.length);
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, userAgent: UA });
  const res = [];
  for (const [i, u] of urls.entries()) {
    const p = await ctx.newPage();
    const errores = [], rotos = [];
    p.on('pageerror', (e) => errores.push(e.message.slice(0, 160)));
    p.on('console', (m) => { if (m.type() === 'error' && !/googlesyndication|doubleclick|fundingchoices|adtrafficquality|google\.com|gstatic|ERR_|net::/i.test(m.text())) errores.push('consola: ' + m.text().slice(0, 160)); });
    p.on('response', (r) => { if (r.url().includes('jubilometro.com') && r.status() >= 400) rotos.push(r.status() + ' ' + r.url()); });
    let estado = 0;
    try {
      const r = await p.goto(u, { waitUntil: 'load', timeout: 45000 }); estado = r ? r.status() : 0;
      await p.waitForTimeout(i < 6 ? 6000 : 1200);
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((z) => setTimeout(z, 60)); } });
      await p.waitForTimeout(500);
    } catch (e) { errores.push('carga: ' + e.message.slice(0, 120)); }
    const d = await p.evaluate(() => ({
      desborde: document.documentElement.scrollWidth - window.innerWidth,
      imgRotas: [...document.images].filter((im) => im.complete && im.naturalWidth === 0 && im.src && !/googlesyndication|doubleclick/.test(im.src)).map((im) => im.src).slice(0, 3),
      anuncios: document.querySelectorAll('ins.adsbygoogle[data-ad-status="filled"], iframe[id^="aswift"], iframe[src*="googleads"]').length,
      insVacios: document.querySelectorAll('ins.adsbygoogle[data-ad-status="unfilled"]').length,
      h1: document.querySelectorAll('h1').length,
    })).catch(() => ({}));
    res.push({ u, estado, errores: [...new Set(errores)], rotos: [...new Set(rotos)], ...d });
    await p.close();
    if (i % 25 === 0) console.log(i, u);
  }
  await b.close();
  fs.writeFileSync(process.argv[2] || 'barrido.json', JSON.stringify(res, null, 1));
  const malos = res.filter((r) => r.estado !== 200 || r.errores.length || r.rotos.length || (r.desborde > 1) || (r.imgRotas || []).length || r.h1 !== 1);
  console.log('Páginas:', res.length, '· con algún problema:', malos.length, '· con anuncios pintados:', res.filter((r) => r.anuncios > 0).length, '· huecos sin anuncio:', res.reduce((a, r) => a + (r.insVacios || 0), 0));
  for (const m of malos) console.log(JSON.stringify(m));
})();

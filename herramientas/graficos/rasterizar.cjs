// Convierte un SVG en PNG y WebP con Chromium (Playwright).
// Uso: NODE_PATH=$(npm root -g) node herramientas/graficos/rasterizar.cjs entrada.svg [calidadWebp=0.9]
// Genera entrada.png y entrada.webp junto al SVG, al tamaño definido en el SVG.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const entrada = path.resolve(process.argv[2]);
  const calidad = Number(process.argv[3] ?? 0.9);
  const svg = fs.readFileSync(entrada, 'utf8');
  const [, ancho, alto] = svg.match(/width="(\d+)" height="(\d+)"/).map(Number);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><body style="margin:0">${svg}</body></html>`);
  const base = entrada.replace(/\.svg$/, '');
  await page.locator('svg').screenshot({ path: `${base}.png` });

  const png = fs.readFileSync(`${base}.png`).toString('base64');
  const webp = await page.evaluate(async ({ png, calidad }) => {
    const img = new Image();
    img.src = `data:image/png;base64,${png}`;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
    return canvas.toDataURL('image/webp', calidad).split(',')[1];
  }, { png, calidad });
  fs.writeFileSync(`${base}.webp`, Buffer.from(webp, 'base64'));
  await browser.close();
  console.log(`${base}.png`);
  console.log(`${base}.webp`);
})();

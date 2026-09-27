// Prueba de la calculadora de punto de equilibrio dentro de su artículo.
// Uso: NODE_PATH=$(npm root -g) node herramientas/compensa/widget.e2e.cjs
const path = require('path');
const assert = require('assert/strict');
const { chromium } = require('playwright');
const html = path.resolve(__dirname, '../../contenido/jubilacion/compensa-jubilarse-antes/articulo.html');
const CASOS = [
  { edad: '67', meses: 24, recorte: '21', pension: '', espera: 'a los 74 años y 6 meses' },
  { edad: '65', meses: 24, recorte: '19', pension: '2000', espera: 'a los 73 años y 6 meses', extra: 'dejas de cobrar 5.320 € al año' },
  { edad: '65', meses: 24, recorte: '13', pension: '', espera: 'a los 78 años y 5 meses' },
  { edad: '67', meses: 60, recorte: '21', pension: '', espera: 'Revisa los meses' },
];
(async () => {
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 390, height: 800 } });
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  await page.goto(`file://${html}`);
  for (const c of CASOS) {
    await page.selectOption('.calc-compensa select[name="edad"]', c.edad);
    await page.fill('.calc-compensa input[name="meses"]', String(c.meses));
    await page.fill('.calc-compensa input[name="recorte"]', c.recorte);
    await page.fill('.calc-compensa input[name="pension"]', c.pension);
    await page.click('.calc-compensa button');
    const t = await page.textContent('.calc-compensa .cj-resultado');
    assert.ok(t.includes(c.espera), `${JSON.stringify(c)} -> ${t}`);
    if (c.extra) assert.ok(t.replace(/ /g, ' ').includes(c.extra), t);
    console.log('OK', t.slice(0, 90));
  }
  await b.close();
  assert.deepEqual(errores, []);
})().catch((e) => { console.error(e.message); process.exit(1); });

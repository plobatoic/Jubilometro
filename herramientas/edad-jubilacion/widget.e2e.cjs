// Prueba de extremo a extremo de la calculadora dentro del artículo (Chromium vía Playwright).
// Uso: NODE_PATH=$(npm root -g) node herramientas/edad-jubilacion/widget.e2e.cjs [ruta.html] [capturas/]
const path = require('path');
const assert = require('assert/strict');
const { chromium } = require('playwright');

const html = path.resolve(process.argv[2] ?? 'contenido/jubilacion/edad-de-jubilacion/articulo.html');
const capturas = process.argv[3] ? path.resolve(process.argv[3]) : null;

const CASOS = [
  { nombre: 'abril de 1960, 34 años, deja de cotizar', dia: 20, mes: 4, ano: 1960, anos: 34, meses: 0, sigue: 'no',
    espera: ['20 de abril de 2027, con 67 años', 'En 2027 se exigen 67 años'] },
  { nombre: 'febrero de 1960, carrera corta', dia: 15, mes: 2, ano: 1960, anos: 30, meses: 0, sigue: 'si',
    espera: ['15 de diciembre de 2026, con 66 años y 10 meses'] },
  { nombre: 'junio de 1962, 38 años y 4 meses hoy', dia: 12, mes: 6, ano: 1962, anos: 38, meses: 4, sigue: 'si',
    espera: ['12 de junio de 2027, con 65 años', 'bastan 38 años y 6 meses'] },
  { nombre: 'diciembre de 1961, salto 2026-2027', dia: 15, mes: 12, ano: 1961, anos: 38, meses: 2, sigue: 'si',
    espera: ['15 de diciembre de 2026, con 65 años', 'si retrasas la jubilación a 2027, necesitarás 38 años y 6 meses'] },
  { nombre: 'periodo mínimo no alcanzado', dia: 1, mes: 1, ano: 1963, anos: 10, meses: 0, sigue: 'no',
    espera: ['1 de enero de 2030, con 67 años', 'menos de 15 años cotizados'] },
  { nombre: 'fecha imposible', dia: 31, mes: 2, ano: 1962, anos: 30, meses: 0, sigue: 'si',
    espera: ['Revisa la fecha de nacimiento'] },
  { nombre: 'meses fuera de rango', dia: 1, mes: 1, ano: 1962, anos: 30, meses: 12, sigue: 'si',
    espera: ['Revisa el tiempo cotizado'] },
];

(async () => {
  const browser = await chromium.launch();
  const errores = [];

  for (const ancho of [390, 1280]) {
    const page = await browser.newPage({ viewport: { width: ancho, height: 900 } });
    page.on('console', (m) => { if (m.type() === 'error') errores.push(`${ancho}px: ${m.text()}`); });
    page.on('pageerror', (e) => errores.push(`${ancho}px: ${e.message}`));
    await page.clock.setFixedTime(new Date('2026-09-27T10:00:00+02:00'));
    await page.goto(`file://${html}`);

    const desborde = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(desborde <= 0, `scroll horizontal de ${desborde}px a ${ancho}px`);

    const jsonld = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => JSON.parse(x.textContent)));
    assert.equal(jsonld.length, 1);
    assert.equal(jsonld[0]['@graph'].length, 5);

    const h1 = await page.$$eval('h1', (h) => h.length);
    assert.equal(h1, 1, 'debe haber un único h1');

    if (ancho === 390) {
      for (const c of CASOS) {
        await page.fill('.calc-jubi input[name="dia"]', String(c.dia));
        await page.selectOption('.calc-jubi select[name="mes"]', String(c.mes));
        await page.fill('.calc-jubi input[name="ano"]', String(c.ano));
        await page.fill('.calc-jubi input[name="anosCot"]', String(c.anos));
        await page.fill('.calc-jubi input[name="mesesCot"]', String(c.meses));
        await page.check(`.calc-jubi input[name="sigue"][value="${c.sigue}"]`);
        await page.click('.calc-jubi button[type="submit"]');
        const texto = await page.textContent('.calc-jubi .cj-resultado');
        for (const e of c.espera) assert.ok(texto.includes(e), `${c.nombre}: falta «${e}» en «${texto}»`);
        console.log(`OK  ${c.nombre}: ${texto.trim().split('\n')[0]}`);
      }
      if (capturas) {
        await page.fill('.calc-jubi input[name="dia"]', '20');
        await page.selectOption('.calc-jubi select[name="mes"]', '4');
        await page.fill('.calc-jubi input[name="ano"]', '1960');
        await page.fill('.calc-jubi input[name="anosCot"]', '34');
        await page.fill('.calc-jubi input[name="mesesCot"]', '0');
        await page.check('.calc-jubi input[name="sigue"][value="no"]');
        await page.click('.calc-jubi button[type="submit"]');
        await page.locator('.calc-jubi').screenshot({ path: path.join(capturas, 'calculadora-movil.png') });
        await page.screenshot({ path: path.join(capturas, 'articulo-movil.png') });
      }
    } else if (capturas) {
      await page.screenshot({ path: path.join(capturas, 'articulo-escritorio.png') });
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.screenshot({ path: path.join(capturas, 'articulo-escritorio-oscuro.png') });
    }
    await page.close();
  }
  await browser.close();
  assert.deepEqual(errores, [], `errores en consola:\n${errores.join('\n')}`);
  console.log('Todas las comprobaciones del navegador han pasado.');
})().catch((e) => { console.error(e.message); process.exit(1); });

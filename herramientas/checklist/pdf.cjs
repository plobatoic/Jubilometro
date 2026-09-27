// Genera el PDF de la checklist. Uso: NODE_PATH=$(npm root -g) node herramientas/checklist/pdf.cjs
const path = require('path');
const { chromium } = require('playwright');
(async () => {
  const origen = path.resolve(__dirname, 'checklist-documentos.html');
  const destino = path.resolve(__dirname, '../../contenido/jubilacion/documentos-jubilacion/descargas/checklist-documentos-jubilacion.pdf');
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto(`file://${origen}`);
  await p.pdf({ path: destino, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await b.close();
  console.log(destino);
})();

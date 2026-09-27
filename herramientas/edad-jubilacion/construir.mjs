// Construye el widget de la calculadora a partir de la lógica testeada y lo inserta
// en los HTML que tengan los marcadores <!-- CALCULADORA:INICIO --> y <!-- CALCULADORA:FIN -->.
// Uso: node herramientas/edad-jubilacion/construir.mjs [ruta.html ...]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const logica = readFileSync(join(aqui, 'edad-jubilacion.mjs'), 'utf8')
  .replace(/^export /gm, '')
  .trim();
const plantilla = readFileSync(join(aqui, 'widget.plantilla.html'), 'utf8');
if (!plantilla.includes('/*LOGICA*/')) throw new Error('La plantilla no tiene el marcador /*LOGICA*/');
const widget = plantilla.replace('/*LOGICA*/', () => logica.split('\n').join('\n    '));

const salida = join(aqui, 'widget-calculadora.html');
writeFileSync(salida, `<!-- Generado por construir.mjs a partir de edad-jubilacion.mjs: no editar a mano -->\n${widget}`);
console.log(salida);

const INICIO = '<!-- CALCULADORA:INICIO -->';
const FIN = '<!-- CALCULADORA:FIN -->';
for (const ruta of process.argv.slice(2)) {
  const html = readFileSync(ruta, 'utf8');
  const i = html.indexOf(INICIO);
  const f = html.indexOf(FIN);
  if (i === -1 || f === -1 || f < i) throw new Error(`Faltan los marcadores en ${ruta}`);
  writeFileSync(ruta, `${html.slice(0, i + INICIO.length)}\n${widget}\n${html.slice(f)}`);
  console.log(ruta);
}

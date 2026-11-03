// Comprueba que las cifras de las publicaciones programadas siguen en la guía de la que sale cada una.
// Busca los importes, porcentajes, días y plazas del texto (y de las diapositivas y los hilos) en el archivo de la guía.
// Una cifra que no aparece no siempre está mal (puede venir de otra guía), pero hay que mirarla antes de publicarla.
//
// Uso: node herramientas/redes/comprobar-cifras.mjs [publicacion/redes/programado/programa.mjs] [--desde=AAAA-MM-DD] [--hasta=AAAA-MM-DD]
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { RAIZ } from '../publicar/articulos.mjs';

const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
const archivo = resolve(process.argv.slice(2).find((a) => !a.startsWith('--')) ?? join(RAIZ, 'publicacion', 'redes', 'programado', 'programa.mjs'));
const desde = arg('desde') ?? '0000-00-00';
const hasta = arg('hasta') ?? '9999-12-31';
const { PUBLICACIONES } = await import(pathToFileURL(archivo).href);

function guia(fuente) {
  if (!fuente) return null;
  const ruta = fuente.replace(/^\/|\/$/g, '');
  const ultimo = ruta.split('/').pop();
  const opciones = [
    join('contenido', ruta, 'articulo.md'),
    join('paginas', `${ruta}.md`),
    join('paginas', 'calculadoras', `${ultimo}.md`),
    join('paginas', 'portadas', `${ultimo}.md`),
  ];
  const f = opciones.map((o) => join(RAIZ, o)).find((o) => existsSync(o));
  return f ? readFileSync(f, 'utf8') : null;
}

let avisos = 0;
const sinGuia = [];
for (const p of PUBLICACIONES.filter((x) => x.fecha >= desde && x.fecha <= hasta)) {
  const texto = [p.texto, ...(p.partes ?? []), ...(p.diapositivas ?? []), p.cifra?.grande, p.cifra?.despues].filter(Boolean).join(' ');
  const g = guia(p.fuente);
  if (!g) { sinGuia.push(`${p.fecha} ${p.red} ${p.id ?? ''} ${p.fuente ?? '(sin fuente)'}`); continue; }
  const cifras = [...new Set([...texto.matchAll(/\d{1,3}(?:\.\d{3})*(?:,\d+)?(?=\s?(?:€|euros|%| días| plazas))/g)].map((m) => m[0]))];
  const faltan = cifras.filter((c) => !g.includes(c));
  if (faltan.length) { avisos++; console.log(`MIRAR  ${p.fecha} ${p.red} ${p.id ?? ''} (${p.fuente}): ${faltan.join(', ')}`); }
}
if (sinGuia.length) console.log(`\nSin guía en el repositorio (páginas de datos o portadas; se miran en la web):\n  ${sinGuia.join('\n  ')}`);
console.log(`\n${avisos ? `${avisos} publicaciones con cifras que no están en su guía` : 'Todas las cifras están en su guía'}.`);

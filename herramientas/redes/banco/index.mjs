// Banco de publicaciones sin fecha, para lanzar las redes cuando se apruebe la web.
// Cada publicación lleva: id (único), red, pilar, fuente (la guía o calculadora de la que sale) y texto, y según el caso:
//   tipo          'Carrusel', 'Hilo', 'Pregunta de la semana', 'Normas del grupo', 'Vídeo (listo)'
//   diapositivas  carrusel de Instagram (las imágenes salen con kit.mjs --fuente=banco)
//   partes        hilo de X
//   comentario    primer comentario de LinkedIn, con el enlace
//   cifra         imagen con la cifra para acompañar la publicación (Facebook, también vale para X)
//   desde, hasta  fechas entre las que vale (AAAA-MM-DD); sin ellas, vale siempre
//   lanzamiento   día en que sale, contando desde la aprobación (1 = ese mismo día); fijar: fijarla arriba
//   archivo       vídeo terminado en publicacion/redes/videos
// Todas las cifras son las de las guías a 12 de octubre de 2026. Las que llevan importes de 2026 se marcan
// para revisar si se publican desde enero de 2027.
//
// Comprobar el banco: node herramientas/redes/banco/index.mjs
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANZAMIENTO, GRUPO } from './lanzamiento.mjs';
import { JUBILACION } from './jubilacion.mjs';
import { CUANTO_COBRARE } from './cuanto-cobrare.mjs';
import { VIUDEDAD } from './viudedad.mjs';
import { INCAPACIDAD } from './incapacidad.mjs';
import { AYUDAS_DINERO } from './ayudas-dinero.mjs';
import { DEPENDENCIA } from './dependencia.mjs';
import { IMSERSO } from './imserso.mjs';
import { CALCULADORAS } from './calculadoras.mjs';
import { VIDEOS_BANCO } from './videos.mjs';

export const BANCO = [
  ...LANZAMIENTO, ...JUBILACION, ...CUANTO_COBRARE, ...VIUDEDAD, ...INCAPACIDAD,
  ...AYUDAS_DINERO, ...DEPENDENCIA, ...IMSERSO, ...CALCULADORAS, ...GRUPO, ...VIDEOS_BANCO,
];

const RAIZ = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..', '..');
export const SUFIJO = { x: 'x', facebook: 'fb', grupo: 'fb', instagram: 'ig', linkedin: 'in', whatsapp: 'wa', video: 'yt' };
// X cuenta cada enlace como 23 caracteres, se escriba como se escriba
export const largoX = (t) => [...t.replace(/(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?/gi, 'x'.repeat(23))].length;
export const textos = (p) => [p.texto, ...(p.partes ?? []), ...(p.diapositivas ?? []), p.comentario, ...(p.guion ?? []).flat()].filter(Boolean);
// Tema para no repetir dos seguidas del mismo: la sección de la guía de la que sale
export const tema = (p) => (p.fuente || '/web/').split('/').filter(Boolean)[0] || 'web';

// Devuelve la lista de errores (vacía si todo está bien)
export function comprobar(lista = BANCO) {
  const datos = JSON.parse(readFileSync(join(RAIZ, 'tema', 'jubilometro', 'inc', 'data.json'), 'utf8'));
  const errores = [], vistos = new Set();
  for (const p of lista) {
    const id = p.id || '(sin id)';
    if (!p.id) errores.push(`${id}: falta el id`);
    if (vistos.has(p.id)) errores.push(`${id}: id repetido`);
    vistos.add(p.id);
    if (!SUFIJO[p.red]) errores.push(`${id}: red desconocida «${p.red}»`);
    for (const k of ['desde', 'hasta']) if (p[k] && !/^\d{4}-\d{2}-\d{2}$/.test(p[k])) errores.push(`${id}: ${k} no es AAAA-MM-DD`);
    if (p.desde && p.hasta && p.desde > p.hasta) errores.push(`${id}: desde es posterior a hasta`);
    for (const t of textos(p)) {
      if (/—/.test(t)) errores.push(`${id}: raya larga («—»)`);
      if (/\bNo es [^.]{1,60}, es\b/.test(t)) errores.push(`${id}: «No es X, es Y»`);
      for (const [, codigo, red] of t.matchAll(/jubilometro\.com\/([a-z0-9-]+)(?:\/([a-z]+))?/g)) {
        if (!datos.cortos[codigo]) errores.push(`${id}: el enlace corto /${codigo} no existe en data.json`);
        if (red && red !== SUFIJO[p.red]) errores.push(`${id}: el enlace /${codigo}/${red} no lleva el sufijo de ${p.red} (/${SUFIJO[p.red]})`);
      }
    }
    if (p.red === 'x') for (const t of p.partes ?? [p.texto]) if (largoX(t) > 280) errores.push(`${id}: ${largoX(t)} caracteres en X`);
    if (['facebook', 'grupo', 'instagram'].includes(p.red) && /jubilometro\.com\//.test(p.texto)) errores.push(`${id}: enlace en ${p.red}`);
    if (p.red === 'linkedin' && /jubilometro\.com\//.test(p.texto)) errores.push(`${id}: en LinkedIn el enlace va en el primer comentario`);
    if (p.diapositivas) {
      if (p.diapositivas.length < 5 || p.diapositivas.length > 10) errores.push(`${id}: ${p.diapositivas.length} diapositivas`);
      if (!/\(enlace en la biograf[ií]a\)\.?$/.test(p.diapositivas.at(-1))) errores.push(`${id}: la última diapositiva no dice dónde está el enlace`);
    }
    if (p.red === 'video' && p.archivo && !existsSync(join(RAIZ, 'publicacion', 'redes', 'videos', p.archivo))) errores.push(`${id}: no existe el vídeo ${p.archivo}`);
    if (!p.fuente && !['grupo'].includes(p.red) && p.pilar !== 'Comunidad') errores.push(`${id}: falta la fuente`);
  }
  return errores;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const errores = comprobar();
  const porRed = {};
  for (const p of BANCO) porRed[p.red] = (porRed[p.red] || 0) + 1;
  console.log(`${BANCO.length} publicaciones · ${Object.entries(porRed).map(([r, n]) => `${r}: ${n}`).join(' · ')}`);
  if (errores.length) { console.error(errores.join('\n')); process.exit(1); }
  console.log('Banco correcto.');
}

// Prepara las publicaciones del calendario para programarlas en Metricool con su conector.
// Deja un JSON con un elemento por publicación: { id, red, fecha, hora, date, info }, donde info es lo que pide
// createScheduledPost. Las imágenes van por su dirección pública en GitHub, fijada a un commit (--commit=SHA),
// para que no cambien aunque se regeneren después.
//
// Uso: node herramientas/redes/metricool.mjs --commit=SHA --desde=AAAA-MM-DD --hasta=AAAA-MM-DD [--redes=instagram,facebook] [--programa=programado-video] [--quitar=id,id] [salida.json]
//
// - Instagram: el carrusel entero (sus imágenes en orden) con el texto de su diapositiva como texto alternativo.
// - Facebook: el texto, la imagen si la tiene y el enlace a la guía en el primer comentario.
// - X: una publicación suelta; los hilos van con sus partes en «descendants».
// - Vídeos (--programa=programado-video --redes=video): Shorts de YouTube, con su título, el texto como descripción y
//   el archivo de publicacion/redes/videos. --quitar deja fuera los que caducan pronto (p. ej., la subida con el IPC provisional).
// - Reels (--redes=reel): los vídeos de publicacion/redes/programado-video/reels.mjs, en Instagram y en Facebook a la vez.
//   El enlace sale del texto: en Instagram se manda a la biografía (jubilometro.com/web/ig → /enlaces/) y en Facebook va
//   en el primer comentario.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { RAIZ } from '../publicar/articulos.mjs';
import { BANCO } from './banco/index.mjs';

const arg = (k, def) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? def;
const COMMIT = arg('commit');
const DESDE = arg('desde');
const HASTA = arg('hasta');
const REDES = arg('redes', 'instagram,facebook,x').split(',');
const SALIDA = process.argv.slice(2).find((a) => !a.startsWith('--'));
const QUITAR = arg('quitar', '').split(',').filter(Boolean);
const { PUBLICACIONES } = await import(`../../publicacion/redes/${arg('programa', 'programado')}/programa.mjs`);
if (!/^[0-9a-f]{40}$/.test(COMMIT ?? '') || !/^\d{4}-\d{2}-\d{2}$/.test(DESDE ?? '') || !/^\d{4}-\d{2}-\d{2}$/.test(HASTA ?? '')) {
  console.error('Uso: node herramientas/redes/metricool.mjs --commit=SHA --desde=AAAA-MM-DD --hasta=AAAA-MM-DD [--redes=…] [salida.json]');
  process.exit(1);
}
const ZONA = 'Europe/Madrid';
const RED_METRICOOL = { instagram: 'instagram', facebook: 'facebook', x: 'twitter', video: 'youtube' };
const publica = (ruta) => `https://raw.githubusercontent.com/plobatoic/Jubilometro/${COMMIT}/${ruta.split('/').map(encodeURIComponent).join('/')}`;

// Enlace corto de la guía (jubilometro.com/<código>/fb) o, si no tiene, la dirección con las etiquetas de la red
const cortos = JSON.parse(readFileSync(join(RAIZ, 'tema', 'jubilometro', 'inc', 'data.json'), 'utf8')).cortos ?? {};
const porRuta = {};
for (const [codigo, ruta] of Object.entries(cortos)) if (!ruta.includes('#')) porRuta[ruta] ??= codigo;
const enlace = (fuente, sufijo, fuenteRed) => (porRuta[fuente]
  ? `https://jubilometro.com/${porRuta[fuente]}/${sufijo}`
  : `https://jubilometro.com${fuente}?utm_source=${fuenteRed}&utm_medium=social`);

// Diferencia horaria de Madrid ese día (+01:00 en invierno, +02:00 en verano)
function desfase(fecha, hora) {
  const d = new Date(`${fecha}T${hora}:00Z`);
  const local = new Date(d.toLocaleString('en-US', { timeZone: ZONA }));
  const utc = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }));
  const h = Math.round((local - utc) / 36e5);
  return `${h >= 0 ? '+' : '-'}${String(Math.abs(h)).padStart(2, '0')}:00`;
}

// Texto del vídeo sin el enlace de YouTube («Requisitos: jubilometro.com/sovi/yt» → fuera; si delante va una frase
// con contenido, se queda y el «:» pasa a «.»)
function sinEnlace(texto) {
  return texto.replace(/(\s*)([^.:\n]*):?\s*jubilometro\.com\/[\w-]+\/yt\.?/, (_, esp, antes) => {
    const a = antes.trim();
    return a.length > 40 ? `${esp}${a}.` : '';
  }).trim();
}
function conEtiquetas(texto) {
  return /#\w/.test(texto) ? texto : `${texto}\n\n#pensiones #jubilacion #seguridadsocial`;
}

const salida = [];
if (REDES.includes('reel')) {
  const { PUBLICACIONES: VIDEOS } = await import('../../publicacion/redes/programado-video/programa.mjs');
  const { REELS } = await import('../../publicacion/redes/programado-video/reels.mjs');
  for (const r of REELS) {
    if (r.fecha < DESDE || r.fecha > HASTA) continue;
    const v = VIDEOS.find((x) => x.red === 'video' && x.archivo === r.archivo);
    if (!v || !existsSync(join(RAIZ, 'publicacion', 'redes', 'videos', r.archivo))) throw new Error(`Reel: no encuentro el vídeo ${r.archivo}`);
    if (QUITAR.includes(v.id)) continue;
    const [cuerpo, etiquetas = ''] = sinEnlace(v.texto).split(/\n\n(?=#)/);
    const base = { autoPublish: true, draft: false, descendants: [], hasNotReadNotes: false, media: [publica(`publicacion/redes/videos/${r.archivo}`)], mediaAltText: [], publicationDate: { dateTime: `${r.fecha}T${r.hora}:00`, timezone: ZONA }, shortener: false, smartLinkData: { ids: [] } };
    const id = `reel-${r.archivo.replace(/\.mp4$/, '')}`;
    const date = `${r.fecha}T${r.hora}:00${desfase(r.fecha, r.hora)}`;
    salida.push({ id, red: 'instagram', fecha: r.fecha, hora: r.hora, date, info: { ...base,
      text: conEtiquetas(`${cuerpo}\n\nLa guía completa, en el enlace de nuestra biografía.${etiquetas ? `\n\n${etiquetas}` : ''}`),
      firstCommentText: '', providers: [{ network: 'instagram' }], instagramData: { type: 'REEL', showReelOnFeed: true, isAiGenerated: false } } });
    salida.push({ id, red: 'facebook', fecha: r.fecha, hora: r.hora, date, info: { ...base,
      text: `${cuerpo}\n\nEl enlace a la guía, en el primer comentario.`,
      firstCommentText: `La guía completa: ${enlace(v.fuente, 'fb', 'facebook')}`,
      providers: [{ network: 'facebook' }], facebookData: { type: 'REEL', title: v.titulo } } });
  }
}
for (const p of PUBLICACIONES) {
  if (p.fecha < DESDE || p.fecha > HASTA || !REDES.includes(p.red) || !RED_METRICOOL[p.red] || QUITAR.includes(p.id)) continue;
  const red = RED_METRICOOL[p.red];
  let media = [];
  let alt = [];
  if (p.carrusel) {
    const carpeta = join(RAIZ, p.carrusel);
    const imgs = readdirSync(carpeta).filter((f) => /\.png$/.test(f)).sort();
    media = imgs.map((f) => publica(`${p.carrusel.replace(/\/$/, '')}/${f}`));
    alt = imgs.map((_, i) => p.diapositivas?.[i] ?? '');
  } else if (p.imagenLista) {
    if (!existsSync(join(RAIZ, p.imagenLista))) throw new Error(`${p.id}: no existe ${p.imagenLista}`);
    media = [publica(p.imagenLista)];
    const c = p.cifra ?? BANCO.find((b) => b.id === p.id)?.cifra;
    alt = [p.imagen ?? [[c?.antes, c?.grande].filter(Boolean).join(': '), c?.despues].filter(Boolean).join(' ')];
  }
  if (p.red === 'video') {
    if (!p.archivo || !existsSync(join(RAIZ, 'publicacion', 'redes', 'videos', p.archivo))) throw new Error(`${p.id}: no existe el vídeo ${p.archivo}`);
    media = [publica(`publicacion/redes/videos/${p.archivo}`)];
    alt = [];
  }
  if (p.red === 'instagram' && !media.length) throw new Error(`${p.id}: Instagram sin imágenes`);
  const partes = p.partes ?? [p.texto];
  const info = {
    autoPublish: true,
    draft: false,
    text: partes[0],
    descendants: partes.slice(1).map((t) => ({ text: t })),
    firstCommentText: p.red !== 'facebook' ? ''
      : p.fuente ? `${p.fuente === '/calculadoras/' ? 'Todas las calculadoras' : 'La guía completa'}: ${enlace(p.fuente, 'fb', 'facebook')}`
        : 'Guías y calculadoras gratuitas: https://jubilometro.com/web/fb',
    hasNotReadNotes: false,
    media,
    mediaAltText: alt,
    providers: [{ network: red }],
    publicationDate: { dateTime: `${p.fecha}T${p.hora}:00`, timezone: ZONA },
    shortener: false,
    smartLinkData: { ids: [] },
  };
  if (red === 'instagram') info.instagramData = { type: 'POST', showReelOnFeed: true, isAiGenerated: false };
  if (red === 'facebook') info.facebookData = { type: 'POST' };
  if (red === 'twitter') info.twitterData = { tags: [] };
  if (red === 'youtube') {
    if (!p.titulo || p.titulo.length > 100) throw new Error(`${p.id}: el título de YouTube falta o pasa de 100 caracteres`);
    info.youtubeData = { title: p.titulo, type: 'short', privacy: 'public', madeForKids: false, category: 'EDUCATION', isAiGeneratedContent: false, tags: ['pensiones', 'jubilación', 'Seguridad Social', 'España'] };
  }
  salida.push({ id: p.id, red: p.red, fecha: p.fecha, hora: p.hora, date: `${p.fecha}T${p.hora}:00${desfase(p.fecha, p.hora)}`, info });
}
const json = JSON.stringify(salida, null, 1);
if (SALIDA) writeFileSync(SALIDA, json); else console.log(json);
console.error(`${salida.length} publicaciones del ${DESDE} al ${HASTA}`);

// Reparte el banco de publicaciones (herramientas/redes/banco) y las del primer mes que sirven cualquier día
// en un calendario que empieza el día que le digas: el de la aprobación de la web.
//
// Uso: node herramientas/redes/programar.mjs --inicio=AAAA-MM-DD [--semanas=12] [--carpeta=programado]
//
// Deja en publicacion/redes/<carpeta>/: programa.mjs (cada publicación con su día y su hora), calendario.html
// (para trabajar día a día, con botones de copiar) y metricool.csv (X, Facebook y LinkedIn, como borrador).
//
// Cómo reparte:
// - Lanzamiento: las presentaciones, las normas del grupo y la bienvenida del canal salen el primer día; el resto
//   de lanzamiento, el segundo y el tercero.
// - Las del primer mes con fecha fija (los datos del INE, los últimos días de un plazo) se quedan en su día.
// - Cada red, a su ritmo: X de lunes a viernes a las 9:00 y a las 13:30, y a las 10:00 el fin de semana; Facebook,
//   cada día a las 11:00; el grupo, los lunes a las 10:00; Instagram, lunes, miércoles y viernes a las 19:00;
//   LinkedIn, martes y jueves a las 8:30; WhatsApp, martes y viernes a las 10:00, y los vídeos, lunes, miércoles
//   y viernes a las 13:00.
// - Primero lo que caduca pronto; después, rotando de tema y sin repetir guía en tres días. Hasta fin de año van
//   antes las que llevan importes de 2026, y desde enero, las que no.
// - Las que llevan importes de 2026 y caen desde el 1 de enero de 2027 salen con un aviso para revisarlas.
// - Los vídeos solo entran si el archivo ya está hecho; los carruseles y las imágenes con la cifra, con su carpeta.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { execFileSync } from 'node:child_process';
import { RAIZ } from '../publicar/articulos.mjs';
import { BANCO, comprobar, tema, textos } from './banco/index.mjs';
import { PUBLICACIONES as MES1 } from './mes-1.mjs';
import { CIFRAS } from './kit/cifras.mjs';

const arg = (k, def) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? def;
const INICIO = arg('inicio');
const SEMANAS = Number(arg('semanas', 12));
const CARPETA = arg('carpeta', 'programado');
if (!/^\d{4}-\d{2}-\d{2}$/.test(INICIO ?? '') || !(SEMANAS >= 1 && SEMANAS <= 52) || !/^[a-z0-9-]+$/.test(CARPETA)) {
  console.error('Uso: node herramientas/redes/programar.mjs --inicio=AAAA-MM-DD [--semanas=12] [--carpeta=programado]');
  process.exit(1);
}

/* ---------- Fechas ---------- */
const dia = (f) => new Date(`${f}T12:00:00Z`);
const mas = (f, n) => { const d = dia(f); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const entre = (a, b) => Math.round((dia(b) - dia(a)) / 864e5);
const FIN = mas(INICIO, SEMANAS * 7 - 1);
const ENERO = '2027-01-01';

/* ---------- Ritmo de cada red (0 = domingo) ---------- */
const RITMO = {
  x: (d) => (d === 0 || d === 6 ? ['10:00'] : ['09:00', '13:30']),
  facebook: () => ['11:00'],
  grupo: (d) => (d === 1 ? ['10:00'] : []),
  instagram: (d) => ([1, 3, 5].includes(d) ? ['19:00'] : []),
  linkedin: (d) => ([2, 4].includes(d) ? ['08:30'] : []),
  whatsapp: (d) => ([2, 5].includes(d) ? ['10:00'] : []),
  video: (d) => ([1, 3, 5].includes(d) ? ['13:00'] : []),
};
const HORA = { x: '09:00', facebook: '11:00', grupo: '10:00', instagram: '19:00', linkedin: '08:30', whatsapp: '10:00', video: '13:00' };
const huecos = [];
for (let f = INICIO; f <= FIN; f = mas(f, 1)) {
  for (const red of Object.keys(RITMO)) for (const hora of RITMO[red](dia(f).getUTCDay())) huecos.push({ fecha: f, hora, red });
}

/* ---------- Imágenes y carpetas ya hechas ---------- */
const BANCO_IMG = join(RAIZ, 'publicacion', 'redes', 'banco');
const KIT = join(RAIZ, 'publicacion', 'redes', 'kit');
const rel = (ruta) => relative(RAIZ, ruta).split('\\').join('/');
const slugMes1 = (p) => `${p.fecha}-${(p.fuente || '').split('/').filter(Boolean).pop() || 'carrusel'}`;
function conImagenes(p, fechaOriginal) {
  const extra = {};
  if (fechaOriginal) {
    // Del primer mes: el carrusel y la imagen con la cifra se hicieron con su fecha original
    const carpeta = join(KIT, 'carruseles', slugMes1({ ...p, fecha: fechaOriginal }));
    if (p.diapositivas && existsSync(carpeta)) extra.carrusel = `${rel(carpeta)}/`;
    const cifra = CIFRAS.find((c) => c.archivo.startsWith(fechaOriginal));
    if (p.imagen && cifra && existsSync(join(KIT, 'cifras', `${cifra.archivo}.png`))) extra.imagenLista = rel(join(KIT, 'cifras', `${cifra.archivo}.png`));
  } else {
    const carpeta = join(BANCO_IMG, 'carruseles', p.id);
    if (p.diapositivas && existsSync(carpeta)) extra.carrusel = `${rel(carpeta)}/`;
    const cifra = join(BANCO_IMG, 'cifras', `${p.id}.png`);
    if (p.cifra && existsSync(cifra)) extra.imagenLista = rel(cifra);
  }
  return { ...p, ...extra };
}

/* ---------- Qué entra ---------- */
const errores = comprobar().filter((e) => !/no existe el vídeo/.test(e));
if (errores.length) { console.error(errores.join('\n')); process.exit(1); }
const hayVideo = (p) => p.red !== 'video' || (p.archivo && existsSync(join(RAIZ, 'publicacion', 'redes', 'videos', p.archivo)));
const mes1 = MES1.map((p, i) => ({ ...p, id: `mes1-${String(i + 1).padStart(2, '0')}` }));
const lanzamiento = [
  ...BANCO.filter((p) => p.lanzamiento).map((p) => conImagenes(p)),
  ...mes1.filter((p) => p.lanzamiento).map(({ fecha, hora, banco, ...p }) => conImagenes(p, fecha)),
];
const traeBienvenida = lanzamiento.some((p) => p.red === 'whatsapp');
const fijas = mes1.filter((p) => p.banco === 'fijo' && p.fecha >= INICIO && p.fecha <= FIN && !(p.bienvenida && traeBienvenida))
  .map(({ banco, ...p }) => conImagenes(p, p.fecha));
const bolsa = [
  ...BANCO.filter((p) => !p.lanzamiento).map((p) => conImagenes(p)),
  ...mes1.filter((p) => p.banco === 'perenne' && !p.lanzamiento).map(({ fecha, hora, banco, ...p }) => conImagenes(p, fecha)),
].filter(hayVideo);

/* ---------- Reparto ---------- */
const programa = [];
const usadas = new Set();
const minutos = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
// Una publicación con día propio ocupa el hueco de su red ese día (el de hora más cercana, si trae hora)
function poner(p, fecha, hora) {
  const delDia = huecos.filter((x) => !x.usado && x.red === p.red && x.fecha === fecha);
  if (hora) delDia.sort((a, b) => Math.abs(minutos(a.hora) - minutos(hora)) - Math.abs(minutos(b.hora) - minutos(hora)));
  const h = delDia[0];
  if (h) h.usado = true;
  programa.push({ ...p, fecha, hora: hora ?? h?.hora ?? HORA[p.red] });
  usadas.add(p.id);
}
for (const p of [...lanzamiento].sort((a, b) => a.lanzamiento - b.lanzamiento)) poner(p, mas(INICIO, p.lanzamiento - 1));
for (const p of fijas) poner(p, p.fecha, p.hora);

// Importes en euros: son los que cambian en enero con la subida y los decretos de 2027
const conImportes2026 = (p) => textos(p).some((t) => /€|euros\b/.test(t));
const usoTema = {};      // red → tema → orden del último uso
const usoFuente = {};    // fuente → última fecha (en cualquier red)
let turno = 0;
for (const p of programa) { usoFuente[p.fuente] = p.fecha; (usoTema[p.red] ??= {})[tema(p)] = turno++; }
const libres = huecos.filter((h) => !h.usado).sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`));
const orden = new Map(bolsa.map((p, i) => [p.id, i]));
for (const h of libres) {
  const candidatas = bolsa.filter((p) => !usadas.has(p.id) && p.red === h.red && (!p.desde || p.desde <= h.fecha) && (!p.hasta || p.hasta >= h.fecha));
  if (!candidatas.length) continue;
  const nota = (p) => {
    const urgente = p.hasta && entre(h.fecha, p.hasta) <= 21;
    const reciente = usoFuente[p.fuente] && entre(usoFuente[p.fuente], h.fecha) < 3;
    const anio = (h.fecha < ENERO) === conImportes2026(p) ? 0 : 1;
    const ultimo = usoTema[h.red]?.[tema(p)] ?? -1;
    return [urgente ? 0 : 1, urgente ? p.hasta : '', reciente ? 1 : 0, ultimo, anio, orden.get(p.id)];
  };
  const comparar = (a, b) => { for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1; return 0; };
  const [elegida] = candidatas.map((p) => [p, nota(p)]).sort((a, b) => comparar(a[1], b[1]));
  const p = elegida[0];
  h.lleno = true;
  programa.push({ ...p, fecha: h.fecha, hora: h.hora });
  usadas.add(p.id);
  usoFuente[p.fuente] = h.fecha;
  (usoTema[h.red] ??= {})[tema(p)] = turno++;
}

/* ---------- Avisos ---------- */
for (const p of programa) {
  const avisos = [p.nota];
  if (p.fijar) avisos.push(p.red === 'grupo' ? 'Fíjala arriba del grupo.' : 'Fíjala arriba del perfil.');
  if (p.fecha >= ENERO && conImportes2026(p)) avisos.push('Lleva importes de 2026: compruébalos en la guía antes de publicar, porque en enero cambian con la subida.');
  p.nota = avisos.filter(Boolean).join(' ') || undefined;
  delete p.cifra; delete p.lanzamiento; delete p.fijar; delete p.bienvenida; delete p.comunidad;
}
programa.sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`));

/* ---------- Programa y calendario ---------- */
const ultimo = programa.at(-1)?.fecha ?? INICIO;
const MES = {
  titulo: 'Redes de Jubilómetro: calendario desde la aprobación',
  desde: INICIO,
  hasta: ultimo,
  horas: HORA,
  notas: [
    ['Cifras', 'las de las guías a 12 de octubre de 2026 (las del primer mes, a 9 de octubre). Las que salen desde enero de 2027 con importes de 2026 llevan un aviso amarillo: compruébalas en la guía antes de publicar. Lo que va entre <mark>[corchetes]</mark> se rellena el día del dato.'],
    ['Primer día', 'presentación en todas las redes. Fija arriba la de X y las normas del grupo.'],
    ['Enlaces', 'cada red lleva su final: <code>jubilometro.com/edad/x</code> en X, <code>/wa</code> en WhatsApp, <code>/in</code> en LinkedIn y <code>/yt</code> en los vídeos. En <i>Escritorio › Estadísticas</i> de WordPress verás qué publicación trae visitas.'],
    ['Facebook', 'sin enlaces en las publicaciones, porque Meta limita a dos al mes las de las páginas sin verificar. El enlace a la web va en la información de la página.'],
    ['Imágenes y vídeos', 'cada carrusel de Instagram dice en qué carpeta están sus diapositivas, y las publicaciones con imagen, dónde está. Los vídeos están en <code>publicacion/redes/videos</code>.'],
    ['Metricool', `las publicaciones de X, Facebook y LinkedIn están en <code>publicacion/redes/${CARPETA}/metricool.csv</code> como borrador. Prueba antes con dos filas.`],
  ],
};
const salida = join(RAIZ, 'publicacion', 'redes', CARPETA);
mkdirSync(salida, { recursive: true });
writeFileSync(join(salida, 'programa.mjs'), `// Generado con: node herramientas/redes/programar.mjs --inicio=${INICIO} --semanas=${SEMANAS}${CARPETA !== 'programado' ? ` --carpeta=${CARPETA}` : ''}
// No lo edites a mano: cambia el banco (herramientas/redes/banco) y vuelve a generarlo.
export const MES = ${JSON.stringify(MES, null, 1)};

export const PUBLICACIONES = ${JSON.stringify(programa, null, 1)};
`);
execFileSync(process.execPath, [join(RAIZ, 'herramientas', 'redes', 'calendario.mjs'), join(salida, 'programa.mjs'), CARPETA], { stdio: 'inherit' });

/* ---------- Resumen ---------- */
const sobran = {};
for (const p of bolsa) if (!usadas.has(p.id)) sobran[p.red] = (sobran[p.red] || 0) + 1;
const vacios = {};
for (const h of libres) if (!h.lleno) vacios[h.red] = (vacios[h.red] || 0) + 1;
const avisos = programa.filter((p) => /importes de 2026/.test(p.nota || '')).length;
console.log(`Del ${INICIO} al ${ultimo} (${SEMANAS} semanas).`);
if (Object.keys(vacios).length) console.log(`Huecos sin publicación (el banco de esa red se acaba antes): ${Object.entries(vacios).map(([r, n]) => `${r} ${n}`).join(' · ')}`);
if (Object.keys(sobran).length) console.log(`Quedan en el banco para después: ${Object.entries(sobran).map(([r, n]) => `${r} ${n}`).join(' · ')}`);
if (avisos) console.log(`${avisos} publicaciones con importes de 2026 a revisar (salen desde enero de 2027).`);

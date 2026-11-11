// Página jubilometro.com/enlaces/: a la que lleva el enlace de la biografía de Instagram (jubilometro.com/web/ig).
// Instagram no deja enlaces en las publicaciones, así que aquí están las guías de los carruseles ya publicados,
// del más reciente al más antiguo, y debajo las calculadoras y las guías que más se consultan.
//
// La lista sale del calendario (publicacion/redes/programado/programa.mjs): entran los carruseles de Instagram con
// fecha de hoy o anterior. La revisión diaria la vuelve a subir cada mañana. Es noindex: es una página de paso,
// sin contenido propio, y las guías ya están en el mapa del sitio.
//
// Uso: node herramientas/redes/enlaces.mjs [--hoy=AAAA-MM-DD] [--prueba]
//      Con WP_USER y WP_APP_PASSWORD la sube; con --prueba solo deja el HTML en la salida estándar.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RAIZ } from '../publicar/articulos.mjs';
import { PUBLICACIONES } from '../../publicacion/redes/programado/programa.mjs';
import { PUBLICACIONES as VIDEOS } from '../../publicacion/redes/programado-video/programa.mjs';
import { REELS } from '../../publicacion/redes/programado-video/reels.mjs';

const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
const PRUEBA = process.argv.includes('--prueba');
const HOY = arg('hoy') ?? new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
const MAX = 12;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const icon = (id) => `<svg class="jm-i" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const ICONO = { jubilacion: 'hourglass', 'cuanto-cobrare': 'calculator', viudedad: 'heart', incapacidad: 'shield', ayudas: 'hand', dependencia: 'users', imserso: 'plane', dinero: 'piggy', datos: 'chart', calculadoras: 'calculator' };
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fechaLarga = (f) => { const [a, m, d] = f.split('-').map(Number); return `${d} de ${MESES[m - 1]}${a !== Number(HOY.slice(0, 4)) ? ` de ${a}` : ''}`; };

// Título corto de una guía (su «miga»), o null si la ruta no es una guía del repositorio
function campo(ruta, nombre) {
  const f = join(RAIZ, 'contenido', ruta.replace(/^\/|\/$/g, ''), 'articulo.md');
  if (!existsSync(f)) return null;
  return readFileSync(f, 'utf8').match(new RegExp(`^${nombre}:\\s*"?(.+?)"?\\s*$`, 'm'))?.[1] ?? null;
}
const miga = (ruta) => campo(ruta, 'miga');
// «Viudedad · Requisitos»: la sección delante cuando la miga sola no se entiende
const conSeccion = (ruta) => { const m = miga(ruta), c = campo(ruta, 'categoria'); return m && c && !m.toLowerCase().includes(c.toLowerCase()) ? `${c} · ${m}` : (m ?? titulo(ruta)); };
const PAGINAS = { '/': 'Portada de Jubilómetro', '/datos/pension-media-provincia/': 'Pensión media por provincia', '/calculadoras/': 'Todas las calculadoras' };
const titulo = (ruta) => miga(ruta) ?? PAGINAS[ruta] ?? null;

function fila(ruta, fuerte, pequeno, ic = ICONO[ruta.split('/')[1]] ?? 'book') {
  return `<a href="${esc(ruta)}"><span class="jm-tile__icon">${icon(ic)}</span><span><strong>${esc(fuerte)}</strong><small>${esc(pequeno)}</small></span>${icon('arrow')}</a>`;
}

// Carruseles y reels ya publicados (hoy incluido), del más reciente al más antiguo, sin repetir guía
const reels = REELS.map((r) => {
  const v = VIDEOS.find((x) => x.red === 'video' && x.archivo === r.archivo);
  if (!v) throw new Error(`Reel sin vídeo en el calendario: ${r.archivo}`);
  return { id: `reel-${r.archivo}`, red: 'instagram', fecha: r.fecha, hora: r.hora, fuente: v.fuente, diapositivas: [v.titulo] };
});
// Fechas reales de Instagram cuando se movieron en Metricool (publicacion/redes/programado/fechas-instagram.json)
const FECHAS_IG = JSON.parse(readFileSync(join(RAIZ, 'publicacion', 'redes', 'programado', 'fechas-instagram.json'), 'utf8'));
const vistos = new Set();
const recientes = [...PUBLICACIONES.map((p) => (p.red === 'instagram' && FECHAS_IG[p.id] ? { ...p, fecha: FECHAS_IG[p.id] } : p)), ...reels]
  .filter((p) => p.red === 'instagram' && p.fecha <= HOY && p.fuente && p.fuente !== '/')
  .sort((a, b) => `${b.fecha} ${b.hora}`.localeCompare(`${a.fecha} ${a.hora}`))
  .filter((p) => !vistos.has(p.fuente) && vistos.add(p.fuente))
  .slice(0, MAX);
for (const p of recientes) if (!titulo(p.fuente)) throw new Error(`${p.id}: no encuentro la guía ${p.fuente}`);

const CALCULADORAS = [
  ['/calculadoras/edad-jubilacion/', 'Edad de jubilación', 'El mes exacto en que te puedes jubilar', 'hourglass'],
  ['/calculadoras/pension-jubilacion/', 'Pensión de jubilación', 'Cuánto cobrarás, con tus años cotizados', 'calculator'],
  ['/calculadoras/subida-pensiones/', 'Subida de las pensiones en 2027', 'Tu pensión con la revalorización de enero', 'trending'],
  ['/calculadoras/jubilacion-anticipada/', 'Jubilación anticipada', 'El recorte, mes a mes', 'rewind'],
  ['/calculadoras/pension-neta-irpf/', 'Pensión neta', 'Lo que te llega al banco tras el IRPF', 'receipt'],
  ['/calculadoras/pension-viudedad/', 'Pensión de viudedad', 'Cuánto te corresponde', 'heart'],
];
const GUIAS = [
  ['/jubilacion/edad-de-jubilacion/', 'Edad de jubilación en 2026 y 2027'],
  ['/cuanto-cobrare/revalorizacion-pensiones/', 'Subida de las pensiones en 2027'],
  ['/cuanto-cobrare/pension-minima/', 'Pensiones mínimas de 2026'],
  ['/cuanto-cobrare/pagas-extra/', 'Paga extra de Navidad: cuándo llega'],
  ['/viudedad/cuantia/', 'Cuánto se cobra de viudedad'],
  ['/imserso/viajes-imserso/', 'Viajes del Imserso 2026-2027'],
];
for (const [r] of GUIAS) if (!miga(r)) throw new Error(`No encuentro la guía ${r}`);

const bloqueRecientes = recientes.length
  ? `<h2 style="font-size:1.5rem;margin-bottom:1rem">De nuestras publicaciones en Instagram</h2>
    <div class="jm-toolist">${recientes.map((p) => fila(p.fuente, p.diapositivas?.[0] ?? titulo(p.fuente), `${conSeccion(p.fuente)} · ${fechaLarga(p.fecha)}`)).join('')}</div>`
  : '';

const html = `<!-- wp:html -->
<section class="jm-pagehead" style="padding-bottom:1rem"><div class="jm-wrap"><nav class="jm-crumbs" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li><span aria-current="page">Enlaces</span></li></ol></nav>
  <h1>Enlaces de Jubilómetro</h1>
  <p class="jm-lead">Aquí tienes la guía de cada publicación de Instagram, de la más reciente a la más antigua, y las calculadoras y guías que más se consultan. Todo gratis y sin registro.</p>
</div></section>
<section class="jm-section jm-section--tight" style="padding-top:0"><div class="jm-wrap" style="max-width:46rem;display:grid;gap:2.5rem">
  ${bloqueRecientes ? `<div>${bloqueRecientes}</div>` : ''}
  <div>
    <h2 style="font-size:1.5rem;margin-bottom:1rem">Calcula tu caso</h2>
    <div class="jm-toolist">${CALCULADORAS.map(([r, t, s, i]) => fila(r, t, s, i)).join('')}</div>
  </div>
  <div>
    <h2 style="font-size:1.5rem;margin-bottom:1rem">Lo que más se consulta</h2>
    <div class="jm-toolist">${GUIAS.map(([r, t]) => fila(r, t, `${campo(r, 'categoria')} · guía con la norma de cada cifra`)).join('')}</div>
  </div>
  <p style="color:var(--jm-muted);font-size:.9375rem">Jubilómetro es una web independiente: no somos la Seguridad Social ni damos asesoramiento personal. <a href="/">Ir a la portada</a></p>
</div></section>
<!-- /wp:html -->`;

if (PRUEBA) { console.log(html); process.exit(0); }

const WEB = process.env.WP_URL ?? 'https://jubilometro.com';
const WP_USER = (process.env.WP_USER ?? '').replace(/\.$/, '');
const { WP_APP_PASSWORD } = process.env;
if (!WP_USER || !WP_APP_PASSWORD) { console.error('Faltan WP_USER y WP_APP_PASSWORD.'); process.exit(1); }
const AUT = `Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64')}`;
async function api(ruta, { method = 'GET', json } = {}) {
  for (let intento = 1; ; intento++) {
    const r = await fetch(`${WEB}/wp-json${ruta}`, {
      method,
      headers: { Authorization: AUT, 'User-Agent': 'JubilometroBot/1.0 (https://jubilometro.com)', ...(json ? { 'Content-Type': 'application/json' } : {}) },
      body: json ? JSON.stringify(json) : undefined,
    });
    if (r.ok) return r.json();
    const texto = await r.text();
    // 403 «Bot Verification» de Hostinger: es pasajero, se espera y se repite
    if (r.status === 403 && intento < 6) { await new Promise((ok) => setTimeout(ok, 20000 * intento)); continue; }
    throw new Error(`${method} ${ruta}: ${r.status} ${texto.slice(0, 300)}`);
  }
}

const [existente] = await api('/wp/v2/pages?slug=enlaces&status=publish,draft,private&context=edit&_fields=id,content');
const campos = { title: 'Enlaces de Jubilómetro', slug: 'enlaces', status: 'publish', content: html };
let id = existente?.id;
if (existente && existente.content.raw === html) {
  console.log(`Sin cambios (página ${id}): ${recientes.length} carruseles`);
} else {
  const pagina = existente ? await api(`/wp/v2/pages/${id}`, { method: 'POST', json: campos }) : await api('/wp/v2/pages', { method: 'POST', json: campos });
  id = pagina.id;
  console.log(`${existente ? 'Actualizada' : 'Creada'} la página ${id} (${pagina.link}): ${recientes.length} carruseles`);
}
await api('/rankmath/v1/updateMeta', {
  method: 'POST',
  json: {
    objectType: 'post', objectID: id,
    meta: {
      rank_math_title: 'Enlaces %sep% %sitename%',
      rank_math_description: 'Las guías de cada publicación de Jubilómetro en Instagram y las calculadoras de pensiones que más se usan, gratis y sin registro.',
      rank_math_robots: ['noindex', 'follow'],
    },
  },
});

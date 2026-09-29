// Cuerpo de los artículos para la web real, jubilometro.com: tema «Jubilómetro» (hijo de
// Kadence) con el plugin «Jubilómetro · Núcleo». La plantilla de entrada ya pone el H1, la
// firma, la imagen destacada y el índice, así que el contenido va en bloques de Gutenberg con
// los componentes jm-* del tema (respuesta rápida, tablas, avisos, preguntas frecuentes,
// siguiente paso) para que se vea igual que el resto de la web.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { marked } from 'marked';
import { RAIZ, slug } from './articulos.mjs';

// Páginas publicadas en jubilometro.com que no salen de este repositorio (27/09/2026).
export const PAGINAS_WEB = [
  '/', '/jubilacion/', '/cuanto-cobrare/', '/viudedad/', '/incapacidad/', '/ayudas/', '/dependencia/', '/dinero/',
  '/imserso/', '/datos/', '/guias/', '/calculadoras/', '/calculadoras/edad-jubilacion/',
  '/calculadoras/pension-jubilacion/', '/calculadoras/jubilacion-anticipada/', '/calculadoras/pension-neta-irpf/',
  '/calculadoras/jubilacion-demorada-flexible/', '/calculadoras/pension-viudedad/',
  '/calculadoras/incapacidad-permanente/', '/calculadoras/cuanto-ahorrar-jubilacion/',
  '/calculadoras/comparador-ingresos-jubilacion/', '/datos/pension-media-provincia/', '/sobre-nosotros/',
  '/metodologia/', '/contacto/', '/aviso-legal/', '/politica-privacidad/', '/politica-cookies/',
  '/descargo-responsabilidad/', '/accesibilidad/',
];

// Direcciones del proyecto que en la web ya existen con otra URL.
export const EQUIVALENCIAS = {
  // La calculadora publicada da los mismos resultados que la del proyecto (comparadas en
  // 201.996 casos) y ya está enlazada desde la portada y el menú.
  '/calculadoras/edad-de-jubilacion/': '/calculadoras/edad-jubilacion/',
  '/politica-editorial/': '/metodologia/',
  '/politica-de-privacidad/': '/politica-privacidad/',
  '/politica-de-cookies/': '/politica-cookies/',
};

// Artículos del proyecto que no se suben como entrada porque la web ya tiene esa página.
export const NO_SE_SUBEN = ['/calculadoras/edad-de-jubilacion/'];

// Borradores de plantilla que la web ya tenía para el mismo tema: se reutilizan (conservan
// su imagen destacada y su sitio en la portada) y pasan a la URL del proyecto.
export const PLANTILLAS = {
  '/jubilacion/anticipada-voluntaria/': 'anticipada-voluntaria',
  '/jubilacion/anticipada-involuntaria/': 'anticipada-involuntaria',
  '/jubilacion/demorada/': 'jubilacion-demorada',
  '/jubilacion/activa/': 'jubilacion-activa',
  '/jubilacion/flexible/': 'jubilacion-flexible',
  '/jubilacion/parcial/': 'jubilacion-parcial',
  '/jubilacion/solicitar-jubilacion-internet/': 'solicitar-jubilacion',
  '/cuanto-cobrare/como-se-calcula-la-pension/': 'sistema-dual',
  '/cuanto-cobrare/pension-maxima/': 'pension-maxima-minima',
};

// Imagen destacada de los artículos que no heredan la de una plantilla. Si no está en la
// biblioteca de medios, se sube desde publicacion/imagenes-destacadas/ (fotos CC0, créditos
// en CREDITOS.md). El gráfico del artículo 1 no sirve: la plantilla recorta la imagen.
export const IMAGENES_DESTACADAS = {
  '/jubilacion/edad-de-jubilacion/': { archivo: 'requisitos-jubilacion.webp', alt: 'Pareja de jubilados revisando papeles en casa' },
  '/jubilacion/15-anos-cotizados/': { archivo: '15-anos-cotizados.webp', alt: 'Pareja de jubilados sonriendo con un café al aire libre', pie: 'Foto: StockSnap' },
  '/jubilacion/anticipada-discapacidad/': { archivo: 'anticipada-discapacidad.webp', alt: 'Persona en silla de ruedas paseando junto a un acompañante', pie: 'Foto: rawpixel' },
  '/jubilacion/anticipada-por-profesion/': { archivo: 'anticipada-por-profesion.webp', alt: 'Equipo de bomberas delante de un camión de bomberos', pie: 'Foto: rawpixel' },
  '/jubilacion/autonomos/': { archivo: 'autonomos.webp', alt: 'Artesano con delantal en su taller', pie: 'Foto: StockSnap' },
  '/jubilacion/compensa-jubilarse-antes/': { archivo: 'compensa-jubilarse-antes.webp', alt: 'Persona haciendo cuentas con una calculadora y una libreta', pie: 'Foto: StockSnap' },
  '/jubilacion/convenio-especial/': { archivo: 'convenio-especial.webp', alt: 'Persona firmando un documento', pie: 'Foto: rawpixel' },
  '/jubilacion/cuanto-tarda-jubilacion/': { archivo: 'cuanto-tarda-jubilacion.webp', alt: 'Hombre esperando con las manos junto al reloj', pie: 'Foto: StockSnap' },
  '/jubilacion/despido-a-los-60/': { archivo: 'despido-a-los-60.webp', alt: 'Persona recogiendo sus cosas en una caja de cartón en la oficina', pie: 'Foto: StockSnap' },
  '/jubilacion/documentos-jubilacion/': { archivo: 'documentos-jubilacion.webp', alt: 'Carpetas colgantes con documentos en un archivador', pie: 'Foto: rawpixel' },
  '/jubilacion/faltan-anos-cotizados/': { archivo: 'faltan-anos-cotizados.webp', alt: 'Mujer mayor sonriente con una tableta en su trabajo', pie: 'Foto: StockSnap' },
  '/jubilacion/flexible-activa-o-parcial/': { archivo: 'flexible-activa-o-parcial.webp', alt: 'Hombre mayor trabajando en su despacho', pie: 'Foto: StockSnap' },
  '/jubilacion/subsidio-mayores-52/': { archivo: 'subsidio-mayores-52.webp', alt: 'Hombre pensativo sentado junto a una ventana', pie: 'Foto: StockSnap' },
  '/jubilacion/trabajado-en-otro-pais/': { archivo: 'trabajado-en-otro-pais.webp', alt: 'Mapa del mundo con una brújula y objetos de viaje', pie: 'Foto: StockSnap' },
  '/cuanto-cobrare/pension-minima/': { archivo: 'pension-minima.webp', alt: 'Billetes y monedas de euro', pie: 'Foto: StockSnap' },
  '/incapacidad/grados-incapacidad/': { archivo: 'grados-incapacidad.webp', alt: 'Médico atendiendo en su consulta a un hombre en silla de ruedas', pie: 'Foto: StockSnap' },
  '/dependencia/ley-dependencia/': { archivo: 'ley-dependencia.webp', alt: 'Cuidador dando la mano a una mujer mayor en silla de ruedas', pie: 'Foto: StockSnap' },
  '/dependencia/precio-residencias/': { archivo: 'precio-residencias.webp', alt: 'Enfermera acompañando a un hombre mayor en silla de ruedas en una residencia', pie: 'Foto: StockSnap' },
  '/cuanto-cobrare/pagas-extra/': { archivo: 'pagas-extra.webp', alt: 'Billetes de 50 euros sobre una mesa de madera', pie: 'Foto: rawpixel' },
  '/viudedad/viudedad-y-jubilacion/': { archivo: 'viudedad-y-jubilacion.webp', alt: 'Dos mujeres mayores sonriendo juntas', pie: 'Foto: StockSnap' },
  '/cuanto-cobrare/pension-bruta-y-neta/': { archivo: 'pension-bruta-y-neta.webp', alt: 'Persona repasando cuentas con una calculadora y una libreta', pie: 'Foto: rawpixel' },
  '/ayudas/pnc-invalidez/': { archivo: 'pnc-invalidez.webp', alt: 'Mujer en silla de ruedas con su perro en un parque', pie: 'Foto: StockSnap' },
  '/cuanto-cobrare/lagunas-de-cotizacion/': { archivo: 'lagunas-de-cotizacion.webp', alt: 'Agenda abierta por las páginas del calendario', pie: 'Foto: rawpixel' },
  '/cuanto-cobrare/pension-segun-sueldo/': { archivo: 'pension-segun-sueldo.webp', alt: 'Hombre trabajando con un portátil en su mesa', pie: 'Foto: StockSnap' },
  '/cuanto-cobrare/informe-vida-laboral/': { archivo: 'informe-vida-laboral.webp', alt: 'Documento sobre una carpeta en una mesa de trabajo', pie: 'Foto: StockSnap' },
  '/viudedad/fallecimiento-pensionista/': { archivo: 'fallecimiento-pensionista.webp', alt: 'Ramo de flores blancas', pie: 'Foto: StockSnap' },
  '/incapacidad/enfermedades/': { archivo: 'incapacidad-enfermedades.webp', alt: 'Médico escribiendo en su consulta', pie: 'Foto: StockSnap' },
  '/incapacidad/solicitar/': { archivo: 'incapacidad-solicitar.webp', alt: 'Persona firmando un formulario', pie: 'Foto: rawpixel' },
  '/incapacidad/denegada/': { archivo: 'incapacidad-denegada.webp', alt: 'Balanza antigua colgada en una pared', pie: 'Foto: rawpixel' },
  '/dinero/rescate-aportaciones-10-anos/': { archivo: 'rescate-aportaciones-10-anos.webp', alt: 'Hucha verde junto a una calculadora y unas gafas', pie: 'Foto: StockSnap' },
  '/dependencia/grado-discapacidad/': { archivo: 'grado-discapacidad.webp', alt: 'Cartel de acceso adaptado en la entrada de un edificio', pie: 'Foto: rawpixel' },
  '/dependencia/tiempos-dependencia/': { archivo: 'tiempos-dependencia.webp', alt: 'Reloj de pared antiguo', pie: 'Foto: StockSnap' },
  '/dependencia/cuidadora-interna-externa/': { archivo: 'cuidadora-interna-externa.webp', alt: 'Cuidador conversando con una mujer mayor en su casa', pie: 'Foto: StockSnap' },
  '/dinero/seguro-decesos/': { archivo: 'seguro-decesos.webp', alt: 'Rosa blanca', pie: 'Foto: StockSnap' },
  '/dinero/seguro-salud-mayores/': { archivo: 'seguro-salud-mayores.webp', alt: 'Pastillas sobre una hoja verde', pie: 'Foto: StockSnap' },
  '/dependencia/andalucia/': { archivo: 'dependencia-andalucia.webp', alt: 'Persona contemplando la orilla del Guadalquivir en Sevilla', pie: 'Foto: StockSnap' },
  '/dependencia/madrid/': { archivo: 'dependencia-madrid.webp', alt: 'Edificios del centro de Madrid', pie: 'Foto: rawpixel' },
  '/dependencia/cataluna/': { archivo: 'dependencia-cataluna.webp', alt: 'La Sagrada Familia de Barcelona', pie: 'Foto: rawpixel' },
  '/dependencia/comunitat-valenciana/': { archivo: 'dependencia-comunitat-valenciana.webp', alt: 'Ciudad de las Artes y las Ciencias de Valencia', pie: 'Foto: StockSnap' },
};

// Archivos propios que los artículos enlazan y hay que subir a la biblioteca de medios.
export const ARCHIVOS = [
  'contenido/jubilacion/edad-de-jubilacion/imagenes/edad-jubilacion-2013-2027.webp',
  'contenido/jubilacion/documentos-jubilacion/descargas/checklist-documentos-jubilacion.pdf',
];

// Calculadoras de la web a las que se invita desde los artículos.
const CALCULADORAS = {
  edad: {
    url: '/calculadoras/edad-jubilacion/', icono: 'calendar', titulo: 'Calculadora de edad de jubilación',
    texto: 'Indica cuándo naciste y cuánto has cotizado: te dice a qué edad y en qué mes puedes jubilarte.',
  },
  anticipada: {
    url: '/calculadoras/jubilacion-anticipada/', icono: 'rewind', titulo: 'Calculadora de jubilación anticipada',
    texto: 'Cuánto se reduce tu pensión si te jubilas antes, con los coeficientes reductores mes a mes.',
  },
  demorada: {
    url: '/calculadoras/jubilacion-demorada-flexible/', icono: 'clockplus', titulo: 'Calculadora de jubilación demorada y activa',
    texto: 'Cuánto aumenta tu pensión si retrasas la jubilación y cuánto cobras si sigues trabajando.',
  },
  pension: {
    url: '/calculadoras/pension-jubilacion/', icono: 'calculator', titulo: 'Calculadora de pensión de jubilación',
    texto: 'Estima tu pensión con los dos métodos de cálculo que conviven desde 2026 y mira cuál te favorece.',
  },
  neta: {
    url: '/calculadoras/pension-neta-irpf/', icono: 'receipt', titulo: 'Calculadora de pensión neta',
    texto: 'Cuánto te retienen de IRPF y cuánto cobrarás limpio según tu pensión y tu comunidad autónoma.',
  },
  viudedad: {
    url: '/calculadoras/pension-viudedad/', icono: 'heart', titulo: 'Calculadora de pensión de viudedad',
    texto: 'Qué porcentaje te corresponde (52, 60 o 70 %) y si puedes cobrar el complemento a mínimos.',
  },
  incapacidad: {
    url: '/calculadoras/incapacidad-permanente/', icono: 'shield', titulo: 'Calculadora de incapacidad permanente',
    texto: 'Cuánto cobrarías según el grado de incapacidad y tu base reguladora.',
  },
  ahorro: {
    url: '/calculadoras/cuanto-ahorrar-jubilacion/', icono: 'piggy', titulo: '¿Cuánto necesito ahorrar?',
    texto: 'Cuánto dinero te hace falta para completar tu pensión y mantener tu nivel de vida.',
  },
  comparador: {
    url: '/calculadoras/comparador-ingresos-jubilacion/', icono: 'chart', titulo: 'Anticipada, ordinaria o demorada',
    texto: 'Compara cuánto cobrarás en total según la edad a la que te jubiles.',
  },
};

// Calculadora que se ofrece en cada artículo, justo antes de las preguntas frecuentes. La de
// edad sustituye, además, al widget del proyecto donde el Markdown lo inserta.
export const CALCULADORA_DEL_ARTICULO = {
  '/jubilacion/anticipada-voluntaria/': 'anticipada',
  '/jubilacion/anticipada-involuntaria/': 'anticipada',
  '/jubilacion/demorada/': 'demorada',
  '/jubilacion/activa/': 'demorada',
  '/jubilacion/15-anos-cotizados/': 'pension',
  '/jubilacion/faltan-anos-cotizados/': 'pension',
};

// URL que existen en la web en una fecha (AAAA-MM-DD): las páginas de la web y los artículos
// ya publicados ese día. Sin fecha, todos los artículos. Así un artículo programado no enlaza a
// otro que todavía no ha salido; al volver a subirlo después, el enlace aparece.
export function urlsDeLaWeb(articulos, fecha = null) {
  return new Set([
    ...PAGINAS_WEB,
    ...articulos.filter((a) => !fecha || !a.datos.publicacion || a.datos.publicacion <= fecha)
      .map((a) => a.datos.url).filter((u) => !NO_SE_SUBEN.includes(u)),
  ]);
}

const icono = (id) => `<svg class="jm-i" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const bloqueHtml = (html) => `<!-- wp:html -->\n${html.trim()}\n<!-- /wp:html -->`;
const sinP = (html) => html.trim().replace(/^<p>([\s\S]*)<\/p>$/, '$1');
const sinEtiquetas = (s) => s.replace(/<[^>]+>/g, '');
const mayuscula = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const render = (tokens) => marked.parser(tokens);

function llamadaCalculadora(nombre) {
  const c = CALCULADORAS[nombre];
  return bloqueHtml(`<aside class="jm-calc-cta"><span class="jm-tile__icon">${icono(c.icono)}</span><div><h3>${c.titulo}</h3>` +
    `<p>${c.texto}</p></div><a class="jm-btn jm-btn--ink" href="${c.url}">Calcular${icono('arrow')}</a></aside>`);
}

// Widgets del proyecto con los colores de la web. La web solo tiene modo claro, así que esta
// regla también anula el modo oscuro del widget (misma especificidad, va después).
const COLORES_WIDGET = '<style>.jm-prose .calc-jubi.calc-jubi{--cj-fondo:var(--jm-sky);--cj-borde:var(--jm-line-2);' +
  '--cj-tinta:var(--jm-ink);--cj-tinta-2:var(--jm-text);--cj-acento:var(--jm-ink);--cj-acento-tinta:#fff;' +
  '--cj-ok:var(--jm-accent-strong);--cj-aviso:var(--jm-warn-ink);--cj-aviso-fondo:var(--jm-warn-bg)}</style>';

function widget(nombre) {
  const ruta = join(RAIZ, 'herramientas', nombre, 'widget-calculadora.html');
  return readFileSync(ruta, 'utf8').replace(/^<!--[^\n]*-->\n/, '') + COLORES_WIDGET;
}

// Enlaces: archivos propios a la biblioteca de medios, direcciones equivalentes, enlaces a
// páginas que aún no existen como texto y enlaces externos sin referer de sesión.
function ajustarEnlaces(html, existe, medios) {
  return html
    .replace(/(src|href)="(?:imagenes|descargas)\/([^"/]+)"/g,
      (_, atributo, archivo) => `${atributo}="${medios[archivo] ?? `/wp-content/uploads/${archivo}`}"`)
    .replace(/<a href="(\/[^"]*)">([\s\S]*?)<\/a>/g, (enlace, url, texto) => {
      if (url.startsWith('/wp-content/')) return enlace;
      const [ruta, ancla] = url.split('#');
      const destino = EQUIVALENCIAS[ruta] ?? ruta;
      if (!existe.has(destino)) return texto;
      return `<a href="${destino}${ancla ? `#${ancla}` : ''}">${texto}</a>`;
    })
    .replace(/<a href="(https?:\/\/[^"]+)">/g, '<a href="$1" rel="noopener">');
}

function tabla(html, titulo, n) {
  const id = `tabla-${n}`;
  const cuerpo = html.trim()
    .replace(/^<table>/, '').replace(/<\/table>$/, '')
    .replace(/<th(?: align="[a-z]+")?>/g, '<th scope="col">')
    .replace(/<tr>\n<td(?: align="[a-z]+")?>([\s\S]*?)<\/td>/g, (_, c) => `<tr>\n<th scope="row">${c}</th>`);
  const caption = titulo
    ? `<caption id="${id}" style="caption-side:top;text-align:left;font-weight:700;color:var(--jm-ink);padding:.9rem 1rem">${titulo}</caption>`
    : '';
  const etiqueta = titulo ? `aria-labelledby="${id}"` : 'aria-label="Tabla"';
  return bloqueHtml(`<div class="jm-table-card"><div class="jm-table-wrap" role="region" ${etiqueta} tabindex="0">` +
    `<table class="jm-table">${caption}${cuerpo}</table></div></div>`);
}

// Cita que empieza por **Respuesta rápida** -> caja de respuesta rápida; el resto, avisos.
function cita(token, existe, medios) {
  const interior = ajustarEnlaces(render(token.tokens), existe, medios).trim();
  if (/^<p><strong>Respuesta rápida<\/strong><\/p>/.test(interior)) {
    const texto = interior.replace(/^<p><strong>Respuesta rápida<\/strong><\/p>\n?/, '');
    return bloqueHtml(`<section class="jm-answer" aria-labelledby="respuesta-rapida"><h2 class="jm-answer__title" id="respuesta-rapida">` +
      `${icono('check')}Respuesta rápida</h2>${texto}</section>`);
  }
  return bloqueHtml(`<div class="jm-alert" role="note">${icono('alert')}<div>${interior}</div></div>`);
}

function titulo(nivel, html, ids) {
  let id = slug(sinEtiquetas(html));
  while (ids.has(id)) id += '-2';
  ids.add(id);
  const atributos = nivel === 2 ? '' : ` {"level":${nivel}}`;
  return `<!-- wp:heading${atributos} -->\n<h${nivel} class="wp-block-heading" id="${id}">${html}</h${nivel}>\n<!-- /wp:heading -->`;
}

// Lista de casillas («- [ ]»): casillas que el lector puede marcar, con el componente
// jm-check del tema; las sublistas quedan debajo, con viñetas.
function listaDeCasillas(token, existe, medios) {
  const items = token.items.map((i) => {
    const texto = i.tokens.filter((t) => t.type !== 'list' && t.type !== 'space');
    const sublistas = i.tokens.filter((t) => t.type === 'list');
    const etiqueta = ajustarEnlaces(sinP(render(texto)), existe, medios);
    const debajo = sublistas.map((t) => ajustarEnlaces(render([t]), existe, medios).trim()
      .replace(/^<ul>/, '<ul style="margin-top:.5rem;margin-left:2.25rem">')).join('');
    return `<li><label class="jm-check"><input type="checkbox"${i.checked ? ' checked' : ''}><span>${etiqueta}</span></label>${debajo}</li>`;
  });
  return bloqueHtml(`<ul class="jm-checklist" style="list-style:none;padding-left:0;display:grid;gap:.9rem">${items.join('')}</ul>`);
}

function lista(token, existe, medios) {
  if (token.items.some((i) => i.task)) return listaDeCasillas(token, existe, medios);
  // Listas anidadas: tal cual, en un bloque HTML.
  if (token.items.some((i) => i.tokens.some((t) => t.type === 'list'))) {
    return bloqueHtml(ajustarEnlaces(render([token]), existe, medios));
  }
  const etiqueta = token.ordered ? 'ol' : 'ul';
  const inicio = token.ordered && token.start !== 1 && token.start !== '' ? `,"start":${token.start}` : '';
  const atributos = token.ordered ? ` {"ordered":true${inicio}}` : '';
  const items = token.items.map((i) => {
    const html = ajustarEnlaces(sinP(marked.parser(i.tokens).trim()), existe, medios);
    return `<!-- wp:list-item -->\n<li>${html}</li>\n<!-- /wp:list-item -->`;
  }).join('\n');
  const start = inicio ? ` start="${token.start}"` : '';
  return `<!-- wp:list${atributos} -->\n<${etiqueta}${start} class="wp-block-list">${items}</${etiqueta}>\n<!-- /wp:list -->`;
}

// Preguntas frecuentes: cada H3 y su respuesta pasan a un desplegable.
function preguntas(tokens, existe, medios) {
  const grupos = [];
  for (const t of tokens) {
    if (t.type === 'space') continue;
    if (t.type === 'heading' && t.depth === 3) grupos.push({ pregunta: marked.parseInline(t.text), respuesta: [] });
    else if (grupos.length) grupos.at(-1).respuesta.push(t);
    else throw new Error('Preguntas frecuentes: contenido antes de la primera pregunta');
  }
  const detalles = grupos.map((g) => `<details><summary>${g.pregunta}${icono('plus')}</summary>` +
    `<div>${ajustarEnlaces(render(g.respuesta), existe, medios).trim()}</div></details>`);
  return bloqueHtml(`<div class="jm-faq">${detalles.join('')}</div>`);
}

// Siguiente paso: cada punto de la lista pasa a una tarjeta enlazada. Se omiten las que
// apuntan a páginas que aún no existen.
function siguientePaso(token, existe) {
  if (!token || token.type !== 'list') throw new Error('«Siguiente paso» debe ser una lista');
  const tarjetas = token.items.map((i) => {
    const m = i.text.match(/^(?:(¿[^?]*\?)\s+)?[\s\S]*?\[([^\]]+)\]\((\/[^)]*)\)/);
    if (!m) return null;
    const [, pregunta, texto, url] = m;
    const destino = EQUIVALENCIAS[url] ?? url;
    if (!existe.has(destino.split('#')[0])) return null;
    return `<a class="jm-next" href="${destino}"><span><span class="jm-next__label">${icono('arrow')}${pregunta ?? 'Siguiente paso'}</span>` +
      `<span class="jm-next__title">${mayuscula(sinEtiquetas(marked.parseInline(texto)))}</span></span><span class="jm-next__arrow">${icono('arrow')}</span></a>`;
  }).filter(Boolean);
  if (!tarjetas.length) return '';
  return bloqueHtml(`<nav aria-label="Siguiente paso" style="display:grid;gap:.75rem">${tarjetas.join('')}</nav>`);
}

function notas(tokens, existe, medios) {
  const lineas = tokens.filter((t) => t.type === 'paragraph').map((t) => {
    const html = ajustarEnlaces(sinP(render([t])).replace(/<\/?em>/g, ''), existe, medios);
    const id = /^Historial de cambios/.test(html) ? 'refresh' : 'info';
    return `<p class="jm-note">${icono(id)}<span>${html}</span></p>`;
  });
  return bloqueHtml(`<aside class="jm-notes" aria-label="Aviso">${lineas.join('')}</aside>`);
}

// Firma al principio del artículo, con el componente «revisado» del tema. No atribuye una
// revisión profesional: dice quién escribe y que las fuentes se han comprobado en el BOE.
function firma(articulo) {
  const d = articulo.datos;
  const [a, m, dia] = d.fecha_actualizacion.split('-');
  return bloqueHtml(`<div class="jm-reviewed"><div class="jm-reviewed__avatar">${icono('user')}</div><p class="jm-reviewed__text">` +
    `Por <strong>Pau Lobato</strong>, equipo editorial de Jubilómetro. Fuentes verificadas en el BOE. ` +
    `Actualizado el <time datetime="${d.fecha_actualizacion}">${dia}/${m}/${a}</time>. <a href="/metodologia/">Cómo trabajamos</a></p></div>`);
}

export function cuerpoWeb(articulo, existe, medios = {}) {
  const tokens = marked.lexer(articulo.cuerpo, { gfm: true });
  const url = articulo.datos.url;
  const bloques = [firma(articulo)];
  const ids = new Set(['respuesta-rapida']);
  let captionPendiente = null;
  let nTabla = 0;
  let calculadoraPuesta = false;
  const ponerCalculadora = () => {
    if (CALCULADORA_DEL_ARTICULO[url] && !calculadoraPuesta) {
      bloques.push(llamadaCalculadora(CALCULADORA_DEL_ARTICULO[url]));
      calculadoraPuesta = true;
    }
  };

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === 'space') continue;
    if (t.type === 'heading' && t.depth === 1) {
      // El H1 lo pone la plantilla; la línea en cursiva de fecha y autor pasa a la firma.
      if (tokens[i + 1]?.type === 'paragraph' && /^\*[^*][\s\S]*\*$/.test(tokens[i + 1].raw.trim())) i += 1;
      continue;
    }
    if (t.type === 'heading' && t.depth === 2 && t.text === 'Preguntas frecuentes') {
      ponerCalculadora();
      const fin = tokens.findIndex((x, j) => j > i && ((x.type === 'heading' && x.depth <= 2) || x.type === 'hr'));
      const hasta = fin === -1 ? tokens.length : fin;
      bloques.push(titulo(2, marked.parseInline(t.text), ids));
      bloques.push(preguntas(tokens.slice(i + 1, hasta), existe, medios));
      i = hasta - 1;
      continue;
    }
    if (t.type === 'heading' && t.depth === 2 && t.text === 'Siguiente paso') {
      const siguiente = tokens.slice(i + 1).find((x) => x.type !== 'space');
      const html = siguientePaso(siguiente, existe);
      if (html) bloques.push(html);
      i = tokens.indexOf(siguiente);
      continue;
    }
    if (t.type === 'heading') {
      bloques.push(titulo(t.depth, marked.parseInline(t.text), ids));
      continue;
    }
    if (t.type === 'hr') {
      bloques.push(notas(tokens.slice(i + 1), existe, medios));
      break;
    }
    if (t.type === 'blockquote') {
      bloques.push(cita(t, existe, medios));
      continue;
    }
    if (t.type === 'html') {
      const caption = t.raw.match(/^<!-- tabla: ([\s\S]*?) -->/);
      const calculadora = t.raw.match(/^<!-- calculadora:([a-z-]+) -->/);
      const calculadoraWeb = t.raw.match(/^<!-- calculadora-web:([a-z-]+) -->/);
      if (calculadoraWeb) {
        if (!CALCULADORAS[calculadoraWeb[1]]) throw new Error(`${url}: calculadora de la web desconocida ${calculadoraWeb[1]}`);
        bloques.push(llamadaCalculadora(calculadoraWeb[1]));
        calculadoraPuesta = true;
      } else if (caption) captionPendiente = caption[1];
      else if (calculadora?.[1] === 'edad-jubilacion') bloques.push(llamadaCalculadora('edad'));
      else if (calculadora) bloques.push(bloqueHtml(widget(calculadora[1])));
      else throw new Error(`${url}: HTML sin convertir: ${t.raw.slice(0, 60)}`);
      continue;
    }
    if (t.type === 'table') {
      nTabla += 1;
      bloques.push(tabla(ajustarEnlaces(render([t]), existe, medios), captionPendiente, nTabla));
      captionPendiente = null;
      continue;
    }
    if (t.type === 'list') {
      bloques.push(lista(t, existe, medios));
      continue;
    }
    if (t.type === 'paragraph') {
      const imagen = t.tokens.length === 1 && t.tokens[0].type === 'image' ? t.tokens[0] : null;
      if (imagen) {
        const src = ajustarEnlaces(`src="${imagen.href}"`, existe, medios);
        bloques.push(bloqueHtml(`<figure class="wp-block-image"><img ${src} width="1200" height="675" loading="lazy" decoding="async" ` +
          `alt="${imagen.text.replace(/"/g, '&quot;')}">${imagen.title ? `<figcaption>${imagen.title}</figcaption>` : ''}</figure>`));
        continue;
      }
      bloques.push(`<!-- wp:paragraph -->\n${ajustarEnlaces(render([t]), existe, medios).trim()}\n<!-- /wp:paragraph -->`);
      continue;
    }
    throw new Error(`${url}: bloque sin convertir (${t.type})`);
  }
  if (CALCULADORA_DEL_ARTICULO[url] && !calculadoraPuesta) throw new Error(`${url}: falta la sección de preguntas frecuentes`);
  return `${bloques.join('\n\n')}\n`;
}

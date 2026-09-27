// Convierte cada contenido/**/articulo.md en su articulo.html (página completa) y ofrece
// el cuerpo listo para WordPress. El Markdown es la versión maestra.
//
// Convenciones del Markdown:
//   - Front matter YAML con los campos de publicación (ver CAMPOS_OBLIGATORIOS).
//   - Primera línea del cuerpo: "# H1". Segunda: línea en cursiva con fecha/autor/revisor.
//   - Cita que empieza por **Respuesta rápida** -> caja de respuesta rápida.
//   - Cualquier otra cita -> caja de aviso.
//   - <!-- tabla: Título --> justo antes de una tabla -> <caption>.
//   - <!-- calculadora:edad-jubilacion --> -> widget de la calculadora.
//   - Sección "## Siguiente paso" -> bloque de navegación; tras la línea "---", aviso legal.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import yaml from 'js-yaml';

const aqui = dirname(fileURLToPath(import.meta.url));
export const RAIZ = join(aqui, '..', '..');
export const DOMINIO = 'https://jubilometro.com';
const CSS = readFileSync(join(aqui, 'estilos.css'), 'utf8');

const CAMPOS_OBLIGATORIOS = ['titulo_seo', 'h1', 'meta_descripcion', 'url', 'categoria', 'palabra_clave_principal',
  'fecha_actualizacion', 'estado'];

const CATEGORIAS = {
  'Jubilación': '/jubilacion/',
  'Cuánto cobraré': '/cuanto-cobrare/',
  'Calculadoras': '/calculadoras/',
};

export function listarArticulos(dir = join(RAIZ, 'contenido')) {
  const salida = [];
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) salida.push(...listarArticulos(ruta));
    else if (nombre === 'articulo.md') salida.push(ruta);
  }
  return salida.sort();
}

export function leerArticulo(ruta) {
  const texto = readFileSync(ruta, 'utf8');
  const m = texto.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${ruta}: falta el front matter`);
  const datos = yaml.load(m[1]);
  for (const campo of CAMPOS_OBLIGATORIOS) {
    if (!datos[campo]) throw new Error(`${ruta}: falta el campo «${campo}»`);
  }
  if (!/^\/[a-z0-9-]+(\/[a-z0-9-]+)*\/$/.test(datos.url)) throw new Error(`${ruta}: URL no válida ${datos.url}`);
  const fecha = datos.fecha_actualizacion instanceof Date
    ? datos.fecha_actualizacion.toISOString().slice(0, 10) : String(datos.fecha_actualizacion);
  return { ruta, dir: dirname(ruta), datos: { ...datos, fecha_actualizacion: fecha }, cuerpo: m[2] };
}

export function slug(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60).replace(/-$/, '');
}

const escapar = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sinEtiquetas = (s) => s.replace(/<[^>]+>/g, '');

function widget(nombre) {
  const ruta = join(RAIZ, 'herramientas', nombre, 'widget-calculadora.html');
  return readFileSync(ruta, 'utf8').replace(/^<!--[^\n]*-->\n/, '');
}

// Convierte el cuerpo Markdown en el HTML del <article>.
export function cuerpoHtml(articulo, urlsExistentes = null) {
  let html = marked.parse(articulo.cuerpo, { gfm: true });

  // Enlaces internos a páginas que todavía no existen: se publican como texto para no
  // dejar enlaces rotos. En cuanto exista el artículo de destino, vuelven a ser enlaces.
  if (urlsExistentes) {
    html = html.replace(/<a href="(\/[^"]*)">([\s\S]*?)<\/a>/g, (enlace, url, texto) =>
      urlsExistentes.has(url.split('#')[0]) ? enlace : texto);
  }
  const ids = new Set();

  // H1 + línea de metadatos -> cabecera del artículo.
  html = html.replace(/^<h1>([\s\S]*?)<\/h1>\n<p><em>([\s\S]*?)<\/em><\/p>/, (_, h1, meta) => {
    const f = articulo.datos.fecha_actualizacion;
    const metaHtml = meta.replace(/(\d{1,2} de [a-z]+ de \d{4})/, `<time datetime="${f}">$1</time>`);
    return `<header>\n<h1>${h1}</h1>\n<p class="meta">${metaHtml}</p>\n</header>`;
  });

  // Encabezados con id estable.
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, n, t) => {
    let id = slug(sinEtiquetas(t));
    while (ids.has(id)) id += '-2';
    ids.add(id);
    return `<h${n} id="${id}">${t}</h${n}>`;
  });

  // Cajas.
  html = html.replace(/<blockquote>\n<p><strong>Respuesta rápida<\/strong><\/p>\n([\s\S]*?)<\/blockquote>/g,
    (_, c) => `<aside class="respuesta-rapida" aria-label="Respuesta rápida">\n<p class="etiqueta">Respuesta rápida</p>\n${c}</aside>`);
  html = html.replace(/<blockquote>\n([\s\S]*?)<\/blockquote>/g, (_, c) => `<div class="aviso-caja">\n${c}</div>`);

  // Tablas: título, desplazamiento accesible y cabeceras de fila.
  let n = 0;
  html = html.replace(/(?:<!-- tabla: ([^>]*?) -->\n)?<table>([\s\S]*?)<\/table>/g, (_, titulo, dentro) => {
    n += 1;
    const id = `tabla-${n}`;
    const cuerpo = dentro
      .replace(/<th>/g, '<th scope="col">')
      .replace(/<th align="([a-z]+)">/g, '<th scope="col">')
      .replace(/<tr>\n<td>([\s\S]*?)<\/td>/g, (_, c) => `<tr>\n<th scope="row">${c}</th>`);
    const caption = titulo ? `<caption id="${id}">${escapar(titulo)}</caption>` : '';
    const etiqueta = titulo ? `aria-labelledby="${id}"` : 'aria-label="Tabla"';
    return `<div class="tabla-scroll" role="region" ${etiqueta} tabindex="0">\n<table>${caption}${cuerpo}</table>\n</div>`;
  });

  // Imágenes propias -> <figure> con dimensiones (evitan saltos de maquetación).
  html = html.replace(/<p><img src="([^"]+)" alt="([^"]*)"(?: title="([^"]*)")?><\/p>/g, (_, src, alt, pie) =>
    `<figure>\n<img src="${src}" width="1200" height="675" loading="lazy" decoding="async" alt="${alt}">\n` +
    (pie ? `<figcaption>${pie}</figcaption>\n` : '') + '</figure>');

  // Calculadoras.
  html = html.replace(/<!-- calculadora:([a-z-]+) -->/g, (_, nombre) =>
    `<!-- CALCULADORA:INICIO -->\n${widget(nombre)}\n<!-- CALCULADORA:FIN -->`);

  // Siguiente paso.
  html = html.replace(/<h2 id="([^"]+)">Siguiente paso<\/h2>\n(<ul>[\s\S]*?<\/ul>)/,
    (_, id, lista) => `<nav class="siguiente-paso" aria-labelledby="${id}">\n<h2 id="${id}">Siguiente paso</h2>\n${lista}\n</nav>`);

  // Aviso legal final.
  html = html.replace(/<hr>\n([\s\S]*)$/, (_, resto) => `<footer class="descargo">\n${resto.replace(/<\/?em>/g, '')}</footer>\n`);

  // Enlaces externos: abren en la misma pestaña (mejor para mayores) pero sin pasar referer de sesión.
  html = html.replace(/<a href="(https?:\/\/[^"]+)">/g, '<a href="$1" rel="noopener">');
  return html;
}

export function jsonLd(articulo) {
  const d = articulo.datos;
  const url = `${DOMINIO}${d.url}`;
  const categoriaUrl = `${DOMINIO}${CATEGORIAS[d.categoria] ?? '/'}`;
  const imagen = d.imagen_destacada
    ? { '@type': 'ImageObject', url: `${url}${d.imagen_destacada.replace(/\.webp$/, '.png')}`, width: 1200, height: 675 }
    : undefined;
  const fecha = `${d.fecha_actualizacion}T09:00:00+02:00`;
  const grafo = [
    {
      '@type': 'Article', '@id': `${url}#articulo`, headline: d.h1, description: d.meta_descripcion,
      inLanguage: 'es-ES', datePublished: d.fecha_publicacion_iso ?? fecha, dateModified: fecha,
      ...(imagen ? { image: imagen } : {}),
      author: { '@type': 'Person', name: 'Pau Lobato', url: `${DOMINIO}/sobre-nosotros/` },
      publisher: { '@id': `${DOMINIO}/#organizacion` },
      mainEntityOfPage: { '@id': url },
      articleSection: d.categoria,
      about: [{ '@type': 'Thing', name: d.palabra_clave_principal }],
      ...(d.fuentes_legales?.length ? { citation: d.fuentes_legales } : {}),
    },
    {
      '@type': 'WebPage', '@id': url, url, name: d.titulo_seo, inLanguage: 'es-ES',
      isPartOf: { '@id': `${DOMINIO}/#web` }, breadcrumb: { '@id': `${url}#migas` },
    },
    {
      '@type': 'BreadcrumbList', '@id': `${url}#migas`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${DOMINIO}/` },
        { '@type': 'ListItem', position: 2, name: d.categoria, item: categoriaUrl },
        { '@type': 'ListItem', position: 3, name: d.miga ?? d.titulo_seo },
      ],
    },
    { '@type': 'WebSite', '@id': `${DOMINIO}/#web`, url: `${DOMINIO}/`, name: 'Jubilómetro', inLanguage: 'es-ES',
      publisher: { '@id': `${DOMINIO}/#organizacion` } },
    { '@type': 'Organization', '@id': `${DOMINIO}/#organizacion`, name: 'Jubilómetro', url: `${DOMINIO}/` },
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': grafo }, null, 2);
}

export function paginaHtml(articulo, urlsExistentes = null) {
  const d = articulo.datos;
  const url = `${DOMINIO}${d.url}`;
  const fecha = `${d.fecha_actualizacion}T09:00:00+02:00`;
  const og = d.imagen_destacada ? `
<meta property="og:image" content="${url}${d.imagen_destacada.replace(/\.webp$/, '.png')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="675">
<meta property="og:image:alt" content="${escapar(d.imagen_alt ?? d.h1)}">` : '';
  const categoriaUrl = CATEGORIAS[d.categoria] ?? '/';
  return `<!doctype html>
<html lang="es-ES">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapar(d.titulo_seo)}</title>
<meta name="description" content="${escapar(d.meta_descripcion)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Jubilómetro">
<meta property="og:title" content="${escapar(d.h1)}">
<meta property="og:description" content="${escapar(d.meta_descripcion)}">
<meta property="og:url" content="${url}">${og}
<meta property="article:modified_time" content="${fecha}">
<meta property="article:section" content="${escapar(d.categoria)}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">
${jsonLd(articulo)}
</script>
<style>
${CSS}</style>
</head>
<body>
<header class="cabecera-sitio"><div>Jubilómetro</div></header>
<main>
<nav class="migas" aria-label="Migas de pan">
  <ol>
    <li><a href="/">Inicio</a></li>
    <li><a href="${categoriaUrl}">${escapar(d.categoria)}</a></li>
    <li aria-current="page">${escapar(d.miga ?? d.titulo_seo)}</li>
  </ol>
</nav>

<!-- ===== INICIO DEL CONTENIDO DEL ARTÍCULO ===== -->
<article>
${cuerpoHtml(articulo, urlsExistentes)}</article>
<!-- ===== FIN DEL CONTENIDO DEL ARTÍCULO ===== -->
</main>
</body>
</html>
`;
}

// Cuerpo para el editor de WordPress: sin H1 (el título del post ya lo es).
// Cuerpo para WordPress: sin H1 (lo pone el tema con el título), calculadoras en un
// bloque «HTML personalizado» y archivos propios (imágenes, PDF) en /wp-content/uploads/,
// donde quedan si se suben con la opción de carpetas por mes y año desactivada.
export function cuerpoWordPress(articulo, urlsExistentes = null) {
  return cuerpoHtml(articulo, urlsExistentes)
    .replace(/<header>\n<h1>[\s\S]*?<\/h1>\n/, '<header>\n')
    .replace(/<!-- CALCULADORA:INICIO -->\n([\s\S]*?)\n<!-- CALCULADORA:FIN -->/g, '<!-- wp:html -->\n$1\n<!-- /wp:html -->')
    .replace(/(src|href)="(?:imagenes|descargas)\/([^"/]+)"/g, '$1="/wp-content/uploads/$2"');
}

export function rutaRelativa(ruta) {
  return relative(RAIZ, ruta);
}

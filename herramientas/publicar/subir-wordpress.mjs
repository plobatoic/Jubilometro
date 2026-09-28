// Sube los artículos a jubilometro.com por la API REST de WordPress, con el cuerpo adaptado al
// tema de la web (web.mjs), título, extracto, categoría y título, descripción y palabra clave
// de Rank Math. Las entradas nuevas se crean como BORRADOR. Si la entrada ya existe (mismo
// slug, o la plantilla del mismo tema que ya tenía la web), se actualiza sin cambiar su
// estado, así que sirve también para subir correcciones de artículos ya publicados.
//
// Los artículos con «publicacion: AAAA-MM-DD» en el front matter se programan en WordPress para
// ese día a las 8:00 (hora de Madrid) si la fecha es futura, y se publican si ya ha pasado. Cada
// artículo solo enlaza a lo ya publicado en su fecha: volver a ejecutar el script más adelante
// activa los enlaces a los que han ido saliendo.
//
// Uso:
//   WP_USER=usuario WP_APP_PASSWORD='xxxx xxxx xxxx xxxx xxxx xxxx' npm run subir
//   npm run subir -- --prueba     solo dice qué haría, sin cambiar nada en la web
//   npm run subir -- --publicar   además, publica las entradas (solo tras revisarlas)
// La contraseña es una «contraseña de aplicación» (WordPress > Usuarios > Perfil).
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { listarArticulos, leerArticulo, RAIZ, CATEGORIAS } from './articulos.mjs';
import { cuerpoWeb, urlsDeLaWeb, NO_SE_SUBEN, PLANTILLAS, IMAGENES_DESTACADAS, ARCHIVOS } from './web.mjs';

const WEB = process.env.WP_URL ?? 'https://jubilometro.com';
const { WP_USER, WP_APP_PASSWORD } = process.env;
if (!WP_USER || !WP_APP_PASSWORD) {
  console.error('Faltan las variables WP_USER y WP_APP_PASSWORD.');
  process.exit(1);
}
const AUTORIZACION = `Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64')}`;
const PUBLICAR = process.argv.includes('--publicar');
const PRUEBA = process.argv.includes('--prueba');
const TIPOS = { webp: 'image/webp', png: 'image/png', pdf: 'application/pdf' };

// Las lecturas y las actualizaciones se reintentan si se corta la conexión; las altas no,
// para no duplicar nada (volver a ejecutar el script encuentra lo que ya se creó).
async function api(ruta, { method = 'GET', json, datos, cabeceras = {}, reintentar = true } = {}) {
  for (let intento = 1; ; intento++) {
    let respuesta;
    try {
      respuesta = await fetch(`${WEB}/wp-json${ruta}`, {
        method,
        headers: { Authorization: AUTORIZACION, ...(json ? { 'Content-Type': 'application/json' } : {}), ...cabeceras },
        body: json ? JSON.stringify(json) : datos,
      });
    } catch (e) {
      if (!reintentar || intento === 5) throw e;
      await new Promise((ok) => setTimeout(ok, 2000 * intento));
      continue;
    }
    const texto = await respuesta.text();
    if (!respuesta.ok) throw new Error(`${method} ${ruta}: ${respuesta.status} ${texto.slice(0, 300)}`);
    return texto ? JSON.parse(texto) : null;
  }
}

const ruta = (url) => new URL(url).pathname;

async function buscarMedio(nombre) {
  const base = nombre.replace(/\.[a-z0-9]+$/, '');
  const lista = await api(`/wp/v2/media?search=${encodeURIComponent(base)}&per_page=50&context=edit&_fields=id,source_url,alt_text`);
  return lista.find((m) => ruta(m.source_url).endsWith(`/${nombre}`));
}

async function subirArchivo(relativa) {
  const nombre = basename(relativa);
  const existente = await buscarMedio(nombre);
  if (existente) return ruta(existente.source_url);
  if (PRUEBA) {
    console.log(`Subiría ${nombre}`);
    return `/wp-content/uploads/${nombre}`;
  }
  const medio = await api('/wp/v2/media', {
    method: 'POST', reintentar: false, datos: readFileSync(join(RAIZ, relativa)),
    cabeceras: { 'Content-Type': TIPOS[nombre.split('.').pop()], 'Content-Disposition': `attachment; filename="${nombre}"` },
  });
  console.log(`Subido ${nombre}`);
  return ruta(medio.source_url);
}

async function buscarEntrada(slug) {
  const lista = await api(`/wp/v2/posts?slug=${encodeURIComponent(slug)}&status=any&context=edit` +
    '&_fields=id,slug,status,date,featured_media,categories,title,excerpt,content');
  return lista[0];
}

const todos = listarArticulos().map(leerArticulo);
const articulos = todos.filter((a) => !NO_SE_SUBEN.includes(a.datos.url));
const hoy = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Madrid' }).format(new Date());

// Los mismos límites que comprueba `npm run comprobar`: nada se sube con un título o una
// descripción que Google recortaría.
const fueraDeLimite = articulos.filter(({ datos: d }) =>
  d.titulo_seo.length > 62 || d.meta_descripcion.length < 110 || d.meta_descripcion.length > 158);
if (fueraDeLimite.length) {
  throw new Error(`Título o descripción fuera de límites: ${fueraDeLimite.map((a) => a.datos.url).join(', ')}`);
}

const medios = {};
for (const archivo of ARCHIVOS) medios[basename(archivo)] = await subirArchivo(archivo);

const idsCategoria = {};
for (const slug of new Set(articulos.map((a) => CATEGORIAS[a.datos.categoria].slug))) {
  const [categoria] = await api(`/wp/v2/categories?slug=${slug}&_fields=id`);
  if (!categoria) throw new Error(`No existe la categoría ${slug}`);
  idsCategoria[slug] = categoria.id;
}

const resumen = {};
const cambiosDeUrl = new Map();
for (const a of articulos) {
  const d = a.datos;
  const slug = d.url.split('/').filter(Boolean).pop();
  const entrada = (await buscarEntrada(slug)) ?? (PLANTILLAS[d.url] ? await buscarEntrada(PLANTILLAS[d.url]) : undefined);
  // En WordPress el slug es único para todas las entradas: si ya lo usa una entrada de otra
  // categoría (por ejemplo, la plantilla «grados» de Dependencia), no se sobrescribe.
  const idCategoria = idsCategoria[CATEGORIAS[d.categoria].slug];
  if (entrada && !entrada.categories.includes(idCategoria)) {
    throw new Error(`${d.url}: el slug «${entrada.slug}» ya es de la entrada ${entrada.id}, de otra categoría`);
  }
  const fechaEnlaces = d.publicacion && d.publicacion > hoy ? d.publicacion : hoy;
  const campos = {
    title: d.h1, slug, content: cuerpoWeb(a, urlsDeLaWeb(todos, fechaEnlaces), medios), excerpt: d.meta_descripcion,
    categories: [idCategoria], comment_status: 'closed', ping_status: 'closed',
  };
  // Programación: fecha futura -> «future» a las 8:00; fecha pasada -> publicado. Una entrada ya
  // publicada no se toca.
  if (d.publicacion && entrada?.status !== 'publish') {
    campos.date = `${d.publicacion}T08:00:00`;
    campos.status = d.publicacion > hoy ? 'future' : 'publish';
  }
  const destacada = IMAGENES_DESTACADAS[d.url];
  if (destacada && !entrada?.featured_media) {
    let medio = await buscarMedio(destacada.archivo);
    const local = join(RAIZ, 'publicacion', 'imagenes-destacadas', destacada.archivo);
    if (!medio && !existsSync(local)) throw new Error(`No está en la biblioteca ni en el repositorio: ${destacada.archivo}`);
    if (!medio && PRUEBA) {
      console.log(`Subiría ${destacada.archivo}`);
    } else if (!medio) {
      medio = await api('/wp/v2/media', {
        method: 'POST', reintentar: false, datos: readFileSync(local),
        cabeceras: { 'Content-Type': TIPOS[destacada.archivo.split('.').pop()], 'Content-Disposition': `attachment; filename="${destacada.archivo}"` },
      });
      await api(`/wp/v2/media/${medio.id}`, { method: 'POST', json: { alt_text: destacada.alt, caption: destacada.pie ?? '' } });
      console.log(`Subido ${destacada.archivo}`);
    } else if (!medio.alt_text && !PRUEBA) {
      await api(`/wp/v2/media/${medio.id}`, { method: 'POST', json: { alt_text: destacada.alt } });
    }
    if (medio) campos.featured_media = medio.id;
  }
  if (PUBLICAR && !d.publicacion) campos.status = 'publish';
  // Una entrada que ya está igual no se reescribe: WordPress cambiaría su fecha de modificación
  // (la que ven Google y el sitemap) sin que haya cambiado nada.
  const sinCambios = entrada && entrada.slug === slug && entrada.content.raw === campos.content &&
    entrada.title.raw === campos.title && entrada.excerpt.raw === campos.excerpt &&
    String(entrada.categories) === String(campos.categories) && !campos.featured_media &&
    (!campos.status || campos.status === entrada.status) && (!campos.date || campos.date === entrada.date);
  if (sinCambios) {
    console.log(`Sin cambios ${entrada.id} ${entrada.status} ${d.url}`);
    if (!PRUEBA) await api('/rankmath/v1/updateMeta', {
      method: 'POST',
      json: {
        objectType: 'post', objectID: entrada.id,
        meta: { rank_math_title: d.titulo_seo, rank_math_description: d.meta_descripcion, rank_math_focus_keyword: d.palabra_clave_principal },
      },
    });
    resumen[d.url] = { id: entrada.id, estado: entrada.status };
    continue;
  }
  if (PRUEBA) {
    const plantilla = entrada && entrada.slug !== slug ? ` (plantilla «${entrada.slug}»)` : '';
    const estado = campos.status ? ` -> ${campos.status}${campos.date ? ` ${campos.date}` : ''}` : '';
    console.log(`${entrada ? `Actualizaría ${entrada.id} ${entrada.status}${plantilla}` : 'Crearía borrador'}${estado} ${d.url}` +
      `${campos.featured_media ? ` · imagen ${campos.featured_media}` : ''} · ${campos.content.length} caracteres`);
    continue;
  }
  if (entrada && entrada.slug !== slug) cambiosDeUrl.set(`${CATEGORIAS[d.categoria].url}${entrada.slug}/`, d.url);
  const post = entrada
    ? await api(`/wp/v2/posts/${entrada.id}`, { method: 'POST', json: campos })
    : await api('/wp/v2/posts', { method: 'POST', reintentar: false, json: { status: 'draft', ...campos } });
  await api('/rankmath/v1/updateMeta', {
    method: 'POST',
    json: {
      objectType: 'post', objectID: post.id,
      meta: { rank_math_title: d.titulo_seo, rank_math_description: d.meta_descripcion, rank_math_focus_keyword: d.palabra_clave_principal },
    },
  });
  resumen[d.url] = { id: post.id, estado: post.status };
  console.log(`${entrada ? 'Actualizada' : 'Creada    '} ${String(post.id).padStart(4)} ${post.status.padEnd(7)} ${d.url}`);
}

// Plantillas que han cambiado de URL: las páginas de la web (la portada, sobre todo) que
// enlazaban a la URL antigua pasan a enlazar a la nueva.
if (cambiosDeUrl.size && !PRUEBA) {
  const paginas = await api('/wp/v2/pages?per_page=100&status=publish&context=edit&_fields=id,slug,content');
  for (const pagina of paginas) {
    let contenido = pagina.content.raw;
    for (const [antes, despues] of cambiosDeUrl) contenido = contenido.split(`href="${antes}"`).join(`href="${despues}"`);
    if (contenido !== pagina.content.raw) {
      await api(`/wp/v2/pages/${pagina.id}`, { method: 'POST', json: { content: contenido } });
      console.log(`Enlaces actualizados en la página «${pagina.slug}»`);
    }
  }
}

if (PRUEBA) process.exit(0);
writeFileSync(join(RAIZ, 'publicacion', 'wordpress-entradas.json'), `${JSON.stringify(resumen, null, 2)}\n`);
console.log(`\n${Object.keys(resumen).length} entradas. Lista en publicacion/wordpress-entradas.json`);

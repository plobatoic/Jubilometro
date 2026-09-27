// Pruebas del generador de páginas y del archivo de importación de WordPress.
// Uso: node --test herramientas/publicar/publicar.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { listarArticulos, leerArticulo, leerPaginas, cuerpoHtml, cuerpoWordPress, RAIZ } from './articulos.mjs';
import { exportarWordPress, exportarPaginas } from './wordpress.mjs';
import { cuerpoWeb, urlsDeLaWeb, NO_SE_SUBEN, PLANTILLAS, IMAGENES_DESTACADAS } from './web.mjs';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const articulos = listarArticulos().map(leerArticulo);
const urls = new Set(articulos.map((a) => a.datos.url));
const porUrl = (u) => articulos.find((a) => a.datos.url === u);

test('las URL son únicas y no llevan año', () => {
  assert.equal(urls.size, articulos.length);
  for (const u of urls) assert.doesNotMatch(u, /20\d\d/, u);
});

test('los enlaces a páginas que no existen salen como texto', () => {
  const a = porUrl('/jubilacion/faltan-anos-cotizados/');
  const html = cuerpoHtml(a, urls);
  assert.doesNotMatch(html, /href="\/ayudas\/pension-no-contributiva\/"/);
  assert.match(html, /pensión no contributiva/);
  assert.match(html, /href="\/jubilacion\/convenio-especial\/"/);
});

test('ningún artículo publicado enlaza a una página inexistente', () => {
  for (const a of articulos) {
    for (const [, u] of cuerpoHtml(a, urls).matchAll(/href="(\/[^"#]*)/g)) {
      assert.ok(urls.has(u), `${a.datos.url} -> ${u}`);
    }
  }
});

test('el cuerpo de WordPress no lleva H1 y usa bloques y rutas de WordPress', () => {
  const pilar = cuerpoWordPress(porUrl('/jubilacion/edad-de-jubilacion/'), urls);
  assert.doesNotMatch(pilar, /<h1/);
  assert.match(pilar, /<!-- wp:html -->\n<div class="calc-jubi"[\s\S]*<!-- \/wp:html -->/);
  assert.match(pilar, /src="\/wp-content\/uploads\/edad-jubilacion-2013-2027\.webp"/);
  const docs = cuerpoWordPress(porUrl('/jubilacion/documentos-jubilacion/'), urls);
  assert.match(docs, /href="\/wp-content\/uploads\/checklist-documentos-jubilacion\.pdf"/);
});

test('el WXR tiene todas las entradas como borrador con sus metadatos SEO', () => {
  const wxr = exportarWordPress(articulos, urls);
  assert.equal((wxr.match(/<item>/g) ?? []).length, articulos.length);
  assert.equal((wxr.match(/<wp:status><!\[CDATA\[draft\]\]><\/wp:status>/g) ?? []).length, articulos.length);
  assert.equal((wxr.match(/_yoast_wpseo_metadesc/g) ?? []).length, articulos.length);
  assert.equal((wxr.match(/rank_math_title/g) ?? []).length, articulos.length);
});

test('las páginas del sitio se exportan como páginas en borrador, sin H1 ni marcadores', () => {
  const paginas = leerPaginas();
  const wxr = exportarPaginas(paginas);
  assert.equal((wxr.match(/<wp:post_type><!\[CDATA\[page\]\]><\/wp:post_type>/g) ?? []).length, paginas.length);
  assert.equal((wxr.match(/<wp:status><!\[CDATA\[draft\]\]><\/wp:status>/g) ?? []).length, paginas.length);
  for (const p of paginas) {
    assert.doesNotMatch(p.html, /<h1/, p.datos.url);
    assert.doesNotMatch(p.html, /\[[A-ZÁÉÍÓÚ ]{4,}\]|PENDIENTE/, p.datos.url);
    assert.ok(p.datos.titulo_seo.length <= 62, p.datos.url);
    assert.ok(p.datos.meta_descripcion.length >= 110 && p.datos.meta_descripcion.length <= 158, p.datos.url);
    for (const [, u] of p.html.matchAll(/href="(\/[^"#]*)/g)) {
      assert.ok(paginas.some((q) => q.datos.url === u), `${p.datos.url} -> ${u}`);
    }
  }
});

// Cuerpo para la web real (tema Jubilómetro): bloques de Gutenberg y componentes jm-*.
const existeEnLaWeb = urlsDeLaWeb(articulos);
const enLaWeb = articulos.filter((a) => !NO_SE_SUBEN.includes(a.datos.url));
const medios = { 'checklist-documentos-jubilacion.pdf': '/wp-content/uploads/2026/09/checklist-documentos-jubilacion.pdf' };
const texto = (h) => h.replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>|<!--[\s\S]*?-->|<[^>]+>/g, ' ')
  .replace(/&quot;/g, '"').replace(/&amp;/g, '&').split(/\s+/).filter(Boolean);

test('el cuerpo para la web no lleva H1, usa los componentes del tema y no enlaza a páginas inexistentes', () => {
  for (const a of enLaWeb) {
    const html = cuerpoWeb(a, existeEnLaWeb, medios);
    assert.doesNotMatch(html, /<h1/, a.datos.url);
    assert.match(html, /<section class="jm-answer"/, a.datos.url);
    assert.match(html, /<div class="jm-reviewed">/, a.datos.url);
    assert.match(html, /<div class="jm-faq"><details>/, a.datos.url);
    assert.doesNotMatch(html, /class="(respuesta-rapida|aviso-caja|tabla-scroll|descargo)"/, a.datos.url);
    assert.equal((html.match(/<!-- wp:[a-z-]+/g) ?? []).length, (html.match(/<!-- \/wp:[a-z-]+/g) ?? []).length, a.datos.url);
    for (const [, u] of html.matchAll(/href="(\/[^"#]*)/g)) {
      assert.ok(existeEnLaWeb.has(u) || u.startsWith('/wp-content/'), `${a.datos.url} -> ${u}`);
    }
  }
});

test('el cuerpo para la web conserva todo el texto del artículo', () => {
  for (const a of enLaWeb) {
    const original = cuerpoHtml(a, urls).replace(/<header>[\s\S]*?<\/header>/, '')
      .replace(/<!-- CALCULADORA:INICIO -->[\s\S]*?<!-- CALCULADORA:FIN -->/g, '')
      .replace(/<nav class="siguiente-paso"[\s\S]*?<\/nav>/, '');
    const web = new Map();
    for (const p of texto(cuerpoWeb(a, existeEnLaWeb, medios))) web.set(p, (web.get(p) ?? 0) + 1);
    for (const p of texto(original)) {
      assert.ok((web.get(p) ?? 0) > 0, `${a.datos.url}: falta «${p}»`);
      web.set(p, web.get(p) - 1);
    }
  }
});

test('la calculadora de edad enlaza a la página de la web y el PDF a la biblioteca de medios', () => {
  const pilar = cuerpoWeb(porUrl('/jubilacion/edad-de-jubilacion/'), existeEnLaWeb, medios);
  assert.doesNotMatch(pilar, /calc-jubi|\/calculadoras\/edad-de-jubilacion\//);
  assert.match(pilar, /<aside class="jm-calc-cta">[\s\S]*?href="\/calculadoras\/edad-jubilacion\/"/);
  const docs = cuerpoWeb(porUrl('/jubilacion/documentos-jubilacion/'), existeEnLaWeb, medios);
  assert.match(docs, /href="\/wp-content\/uploads\/2026\/09\/checklist-documentos-jubilacion\.pdf"/);
  assert.match(docs, /<label class="jm-check"><input type="checkbox">/);
  const compensa = cuerpoWeb(porUrl('/jubilacion/compensa-jubilarse-antes/'), existeEnLaWeb, medios);
  assert.match(compensa, /<!-- wp:html -->\n<div class="calc-jubi calc-compensa">/);
});

test('las plantillas de la web se reutilizan solo para artículos que existen', () => {
  for (const url of Object.keys(PLANTILLAS)) assert.ok(porUrl(url), url);
});

test('las imágenes destacadas propias están en el repositorio, con texto alternativo y créditos', () => {
  const creditos = readFileSync(join(RAIZ, 'publicacion', 'imagenes-destacadas', 'CREDITOS.md'), 'utf8');
  for (const [url, imagen] of Object.entries(IMAGENES_DESTACADAS)) {
    assert.ok(porUrl(url), url);
    assert.ok(imagen.alt.length > 10, url);
    if (!imagen.pie) continue;
    assert.ok(existsSync(join(RAIZ, 'publicacion', 'imagenes-destacadas', imagen.archivo)), imagen.archivo);
    assert.match(creditos, new RegExp(`\\| \`${imagen.archivo.replace('.', '\\.')}\` \\| ${url.replace(/\//g, '\\/')} \\|`), imagen.archivo);
  }
});

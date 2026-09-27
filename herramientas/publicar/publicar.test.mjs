// Pruebas del generador de páginas y del archivo de importación de WordPress.
// Uso: node --test herramientas/publicar/publicar.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { listarArticulos, leerArticulo, leerPaginas, cuerpoHtml, cuerpoWordPress } from './articulos.mjs';
import { exportarWordPress, exportarPaginas } from './wordpress.mjs';

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

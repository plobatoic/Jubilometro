// Genera articulo.html para todos los artículos y los archivos de importación de WordPress
// (artículos como entradas y páginas del sitio como páginas).
// Uso: node herramientas/publicar/construir-articulos.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { listarArticulos, leerArticulo, leerPaginas, paginaHtml, rutaRelativa, RAIZ } from './articulos.mjs';
import { exportarWordPress, exportarPaginas } from './wordpress.mjs';

const articulos = listarArticulos().map(leerArticulo);
const paginas = leerPaginas();
const urls = new Set();
for (const a of [...articulos, ...paginas]) {
  if (urls.has(a.datos.url)) throw new Error(`URL duplicada: ${a.datos.url}`);
  urls.add(a.datos.url);
}
for (const a of articulos) {
  writeFileSync(join(a.dir, 'articulo.html'), paginaHtml(a, urls));
  console.log(rutaRelativa(join(a.dir, 'articulo.html')));
}

mkdirSync(join(RAIZ, 'publicacion'), { recursive: true });
const wxr = join(RAIZ, 'publicacion', 'wordpress-borradores.xml');
writeFileSync(wxr, exportarWordPress(articulos, urls));
console.log(rutaRelativa(wxr), `(${articulos.length} artículos)`);

const wxrPaginas = join(RAIZ, 'publicacion', 'wordpress-paginas.xml');
writeFileSync(wxrPaginas, exportarPaginas(paginas));
console.log(rutaRelativa(wxrPaginas), `(${paginas.length} páginas)`);

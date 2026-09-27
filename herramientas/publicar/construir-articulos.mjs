// Genera articulo.html para todos los artículos y el archivo de importación de WordPress.
// Uso: node herramientas/publicar/construir-articulos.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { listarArticulos, leerArticulo, paginaHtml, rutaRelativa, RAIZ } from './articulos.mjs';
import { exportarWordPress } from './wordpress.mjs';

const articulos = listarArticulos().map(leerArticulo);
const urls = new Set();
for (const a of articulos) {
  if (urls.has(a.datos.url)) throw new Error(`URL duplicada: ${a.datos.url}`);
  urls.add(a.datos.url);
  writeFileSync(join(a.dir, 'articulo.html'), paginaHtml(a));
  console.log(rutaRelativa(join(a.dir, 'articulo.html')));
}

mkdirSync(join(RAIZ, 'publicacion'), { recursive: true });
const wxr = join(RAIZ, 'publicacion', 'wordpress-borradores.xml');
writeFileSync(wxr, exportarWordPress(articulos));
console.log(rutaRelativa(wxr), `(${articulos.length} artículos)`);

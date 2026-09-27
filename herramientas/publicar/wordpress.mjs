// Archivo WXR (formato de exportación de WordPress) con todos los artículos como BORRADORES.
// Se importa en WordPress desde Herramientas > Importar > WordPress.
// Incluye título SEO, meta description y palabra clave para Yoast y Rank Math.
import { cuerpoWordPress, DOMINIO } from './articulos.mjs';

const cdata = (s) => `<![CDATA[${String(s).replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function meta(clave, valor) {
  return `    <wp:postmeta><wp:meta_key>${clave}</wp:meta_key><wp:meta_value>${cdata(valor)}</wp:meta_value></wp:postmeta>`;
}

export function exportarWordPress(articulos, urlsExistentes = null) {
  const categorias = [...new Set(articulos.map((a) => a.datos.categoria))];
  const slugCategoria = (c) => ({ 'Jubilación': 'jubilacion', 'Cuánto cobraré': 'cuanto-cobrare', 'Calculadoras': 'calculadoras' }[c] ?? c);
  const items = articulos.map((a, i) => {
    const d = a.datos;
    const slug = d.url.split('/').filter(Boolean).pop();
    const fecha = `${d.fecha_actualizacion} 09:00:00`;
    return `  <item>
    <title>${cdata(d.h1)}</title>
    <link>${DOMINIO}${d.url}</link>
    <dc:creator>${cdata('admin')}</dc:creator>
    <description></description>
    <content:encoded>${cdata(cuerpoWordPress(a, urlsExistentes))}</content:encoded>
    <excerpt:encoded>${cdata(d.meta_descripcion)}</excerpt:encoded>
    <wp:post_id>${9000 + i}</wp:post_id>
    <wp:post_date>${cdata(fecha)}</wp:post_date>
    <wp:post_date_gmt>${cdata(fecha)}</wp:post_date_gmt>
    <wp:comment_status>${cdata('closed')}</wp:comment_status>
    <wp:ping_status>${cdata('closed')}</wp:ping_status>
    <wp:post_name>${cdata(slug)}</wp:post_name>
    <wp:status>${cdata('draft')}</wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:post_type>${cdata('post')}</wp:post_type>
    <wp:post_password>${cdata('')}</wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>
    <category domain="category" nicename="${slugCategoria(d.categoria)}">${cdata(d.categoria)}</category>
${meta('_yoast_wpseo_title', d.titulo_seo)}
${meta('_yoast_wpseo_metadesc', d.meta_descripcion)}
${meta('_yoast_wpseo_focuskw', d.palabra_clave_principal)}
${meta('rank_math_title', d.titulo_seo)}
${meta('rank_math_description', d.meta_descripcion)}
${meta('rank_math_focus_keyword', d.palabra_clave_principal)}
${meta('jubilometro_estado', d.estado)}
  </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Jubilómetro: artículos como borradores. Importar en Herramientas > Importar > WordPress. -->
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>Jubilómetro</title>
  <link>${DOMINIO}</link>
  <description>Jubilación y pensiones en España</description>
  <language>es-ES</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>${DOMINIO}</wp:base_site_url>
  <wp:base_blog_url>${DOMINIO}</wp:base_blog_url>
${categorias.map((c, i) => `  <wp:category><wp:term_id>${100 + i}</wp:term_id><wp:category_nicename>${cdata(slugCategoria(c))}</wp:category_nicename><wp:category_parent>${cdata('')}</wp:category_parent><wp:cat_name>${cdata(c)}</wp:cat_name></wp:category>`).join('\n')}
${items}
</channel>
</rss>
`;
}

export { esc };

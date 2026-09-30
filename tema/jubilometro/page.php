<?php
/**
 * Páginas: el contenido ya trae sus secciones a ancho completo (cabecera, bloques, fuentes).
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
while ( have_posts() ) :
	the_post();
	the_content();
endwhile;
get_footer();

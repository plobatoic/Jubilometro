<?php
/**
 * Páginas: el contenido ya trae sus secciones a ancho completo (cabecera, bloques, fuentes).
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
while ( have_posts() ) :
	the_post();
	the_content();
	// Calculadoras (hijas de /calculadoras/): compartir al terminar, que es cuando alguien piensa en otra persona
	$jm_par = wp_get_post_parent_id( get_the_ID() );
	if ( $jm_par && 'calculadoras' === get_post_field( 'post_name', $jm_par ) ) {
		echo '<div class="jm-wrap jm-calc-share">' . jm_sharebox( get_permalink(), get_the_title(), 'calculadora' ) . '</div>'; // phpcs:ignore
	}
endwhile;
get_footer();

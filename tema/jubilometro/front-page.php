<?php
/**
 * Portada. Arriba, el titular con el buscador y «Explora las guías» (los temas y sus guías, en un panel);
 * debajo, seis guías más y las últimas publicadas; después, las cifras del año, la calculadora de edad,
 * las guías por tema y el resto de herramientas. Se actualiza sola al publicar.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();

$used   = array();
// Las cinco últimas guías publicadas
$latest = array_slice( jm_ledger_sort( jm_stories( '', 24, $used, false ) ), 0, 5 );
$used   = array_merge( $used, jm_ids( $latest ) );
// Seis guías más, junto a la lista de las últimas publicadas
$boxes  = jm_stories( '', 6, $used, false );
$used   = array_merge( $used, jm_ids( $boxes ) );

// Los temas y sus guías van en la cabecera, junto al titular y el buscador
echo str_replace( '<!--jm-browse-->', jm_browse(), jm_part( 'home-mast' ) ); // phpcs:ignore
?>
<section class="jm-front" aria-label="Más guías">
	<div class="jm-wrap jm-front__grid">
		<div class="jm-front__lead"><?php
		if ( $boxes ) {
			echo '<h2 class="jm-sr">Más guías</h2><div class="jm-cajonera">';
			foreach ( $boxes as $b ) { echo jm_cajon( $b ); } // phpcs:ignore
			echo '</div>';
		}
		?></div>
		<div class="jm-front__latest">
			<?php echo jm_ledger( $latest, array( 'id' => 'latest-title', 'title' => 'Últimas guías', 'page' => '', 'more' => array( 'Ver todas las guías', '/guias/' ) ) ); // phpcs:ignore ?>
			<p class="jm-resume" data-jm-resume><span>Seguir leyendo</span></p><?php // el enlace lo añade jubilometro.js con la última guía leída: sin ella, la página no lleva ningún enlace vacío ?>
		</div>
	</div>
</section>
<?php
echo jm_part( 'home-topics' ); // phpcs:ignore
echo jm_part( 'home-figures' ); // phpcs:ignore
echo jm_part( 'home-toolband' ); // phpcs:ignore
echo jm_temas_grid( $used ); // phpcs:ignore
echo jm_part( 'home-life' ); // phpcs:ignore
echo jm_part( 'home-bento' ); // phpcs:ignore
echo jm_part( 'home-updates' ); // phpcs:ignore
echo jm_part( 'home-method' ); // phpcs:ignore
echo jm_part( 'home-newsletter' ); // phpcs:ignore

get_footer();

<?php
/**
 * Portada: la libreta. Arriba, la guía fijada (o la más reciente), tres guías más y los últimos apuntes;
 * después, las cifras del año, la calculadora de edad, las guías por tema y el resto de herramientas.
 * Se actualiza sola al publicar.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();

$used   = array();
$lead   = jm_stories( '', 1, $used, false, true );
$used   = jm_ids( $lead );
// La libreta: los cinco últimos apuntes
$latest = array_slice( jm_ledger_sort( jm_stories( '', 24, $used, false ) ), 0, 5 );
$used   = array_merge( $used, jm_ids( $latest ) );
// Bajo la guía principal, una fila de tres guías más
$boxes  = jm_stories( '', 3, $used, false );
$used   = array_merge( $used, jm_ids( $boxes ) );

echo jm_part( 'home-mast' ); // phpcs:ignore
?>
<section class="jm-front" aria-label="Guías destacadas">
	<div class="jm-wrap jm-front__grid">
		<div class="jm-front__lead"><?php
		if ( $lead ) {
			// La foto va en horizontal (≈400 px) en escritorio: se pide solo el tamaño que se ve
			echo jm_story( $lead[0], 'lead', array( 'h' => 'h2', 'dek' => true, 'date' => true, 'eager' => true, 'sizes' => '(min-width: 1240px) 400px, (min-width: 1000px) 56vw, 100vw' ) ); // phpcs:ignore
		}
		if ( $boxes ) {
			echo '<h2 class="jm-sr">Más guías</h2><div class="jm-cajonera">';
			foreach ( $boxes as $b ) { echo jm_cajon( $b ); } // phpcs:ignore
			echo '</div>';
		}
		?></div>
		<div class="jm-front__latest">
			<?php echo jm_ledger( $latest, array( 'id' => 'latest-title', 'title' => 'La libreta de guías', 'page' => 'Últimos apuntes', 'more' => array( 'Ver la libreta completa', '/guias/' ) ) ); // phpcs:ignore ?>
			<p class="jm-resume" data-jm-resume><span>Seguir leyendo</span><a></a></p><?php // el enlace lo rellena jubilometro.js con la última guía leída; sin él no hay enlace vacío para Google ?>
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

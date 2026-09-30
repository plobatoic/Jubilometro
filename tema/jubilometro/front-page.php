<?php
/**
 * Portada: la libreta. Primero las guías publicadas; después, cifras y herramientas.
 * Se actualiza sola al publicar: el artículo fijado ("Fijar en la portada") o el más reciente va arriba.
 * Un tema entra en la portada cuando tiene al menos tres guías publicadas; los demás, en "Próximas hojas".
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();

$used   = array();
$lead   = jm_stories( '', 1, $used, false, true );
$used   = jm_ids( $lead );
$latest = array_slice( jm_ledger_sort( jm_stories( '', 24, $used, false ) ), 0, 6 );
$used   = array_merge( $used, jm_ids( $latest ) );
// Cajonera: seis guías más bajo la principal (siempre en filas completas de tres)
$boxes  = jm_stories( '', 6, $used, false );
$boxes  = array_slice( $boxes, 0, count( $boxes ) - count( $boxes ) % 3 );
$used   = array_merge( $used, jm_ids( $boxes ) );

// Las secciones por tema se preparan antes para saber cuáles quedan "en preparación"
$rails = array(
	'jubilacion'  => jm_rail_feature( 'jubilacion', $used ),
	'cobrare'     => jm_rail_four( 'cuanto-cobrare', $used ),
	'viu-inc'     => jm_rail_duo( 'viudedad', 'incapacidad', $used ),
	'dependencia' => jm_rail_feature( 'dependencia', $used, true ),
	'ayu-din'     => jm_rail_duo( 'ayudas', 'dinero', $used ),
	'imserso'     => jm_rail_four( 'imserso', $used ),
);

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
			<p class="jm-resume" data-jm-resume><span>Seguir leyendo</span><a href="<?php echo esc_url( home_url( '/guias/' ) ); ?>"></a></p>
		</div>
	</div>
</section>
<?php
echo jm_part( 'home-topics' ); // phpcs:ignore
echo jm_part( 'home-figures' ); // phpcs:ignore
echo $rails['jubilacion']; // phpcs:ignore
echo jm_mostread(); // phpcs:ignore
echo $rails['cobrare']; // phpcs:ignore
echo jm_upcoming(); // phpcs:ignore
echo jm_part( 'home-toolband' ); // phpcs:ignore
echo $rails['viu-inc'] . $rails['dependencia']; // phpcs:ignore
echo jm_part( 'home-life' ); // phpcs:ignore
echo $rails['ayu-din'] . $rails['imserso']; // phpcs:ignore
echo jm_part( 'home-bento' ); // phpcs:ignore
echo jm_part( 'home-updates' ); // phpcs:ignore
echo jm_part( 'home-method' ); // phpcs:ignore
echo jm_part( 'home-newsletter' ); // phpcs:ignore

get_footer();

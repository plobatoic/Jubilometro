<?php
/**
 * Listado general (archivos, etiquetas y resultados): artículos en filas con imagen.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();

$is_search = is_search();
$title     = $is_search ? 'Resultados de la búsqueda' : wp_strip_all_tags( get_the_archive_title() );
if ( ! $is_search && ( is_home() || '' === $title ) ) { $title = 'Guías de jubilación y pensiones'; }
?>
<section class="jm-pagehead">
	<div class="jm-wrap"><div class="jm-pagehead__copy" style="max-width:54rem">
		<nav class="jm-crumbs" aria-label="Migas de pan"><ol><li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Inicio</a></li><li><span aria-current="page"><?php echo esc_html( $is_search ? 'Buscar' : $title ); ?></span></li></ol></nav>
		<h1><?php echo esc_html( $title ); ?></h1>
		<?php if ( $is_search ) : ?>
			<p class="jm-lead"><?php
			global $wp_query;
			$n = (int) $wp_query->found_posts;
			echo esc_html( $n ? sprintf( '%d %s para «%s».', $n, 1 === $n ? 'guía encontrada' : 'guías encontradas', get_search_query() ) : sprintf( 'No hemos encontrado guías para «%s».', get_search_query() ) );
			?></p>
			<form class="jm-mast__search" role="search" action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get" style="max-width:40rem">
				<?php echo jm_icon( 'search' ); // phpcs:ignore ?><label class="jm-sr" for="s-again">Buscar de nuevo</label>
				<input id="s-again" name="s" type="search" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="Prueba con otras palabras">
				<button class="jm-btn" type="submit"><span>Buscar</span><?php echo jm_icon( 'arrow' ); // phpcs:ignore ?></button>
			</form>
		<?php elseif ( get_the_archive_description() ) : ?>
			<div class="jm-lead"><?php echo wp_kses_post( get_the_archive_description() ); ?></div>
		<?php endif; ?>
	</div></div>
</section>
<section class="jm-section jm-section--tight" style="padding-top:0">
	<div class="jm-wrap">
		<?php if ( have_posts() ) : ?>
			<div class="jm-results">
				<?php
				while ( have_posts() ) :
					the_post();
					if ( 'post' === get_post_type() ) {
						echo jm_story( get_post(), 'row', array( 'dek' => true, 'date' => true ) ); // phpcs:ignore
					} else {
						$desc = get_post_meta( get_the_ID(), 'rank_math_description', true );
						$desc = $desc ? $desc : wp_trim_words( get_the_excerpt(), 28 );
						$kind = 0 === strpos( (string) wp_parse_url( get_permalink(), PHP_URL_PATH ), '/calculadoras/' ) ? 'Calculadora' : 'Tema';
						echo '<article class="jm-story jm-story--text"><div class="jm-story__body"><p class="jm-story__kicker">' . esc_html( $kind ) . '</p><h2 class="jm-story__title"><a href="' . esc_url( get_permalink() ) . '">' . esc_html( get_the_title() ) . '</a></h2><p class="jm-story__dek">' . esc_html( $desc ) . '</p></div></article>'; // phpcs:ignore
					}
				endwhile;
				?>
			</div>
			<nav class="jm-pagination" aria-label="Páginas de resultados"><?php echo paginate_links( array( 'prev_text' => 'Anterior', 'next_text' => 'Siguiente' ) ); // phpcs:ignore ?></nav>
		<?php else : ?>
			<div class="jm-empty">
				<h2 style="font-size:1.6rem">Prueba por tema</h2>
				<p>Estas son las secciones de Jubilómetro. Seguro que lo que buscas está en una de ellas.</p>
				<?php echo jm_part( 'topics' ); // phpcs:ignore ?>
			</div>
		<?php endif; ?>
	</div>
</section>
<?php
get_footer();

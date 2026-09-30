<?php
/**
 * Página no encontrada: buscador, temas y guías imprescindibles.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
?>
<section class="jm-pagehead">
	<div class="jm-wrap"><div class="jm-pagehead__copy" style="max-width:54rem">
		<p class="jm-meta"><span>Error 404</span></p>
		<h1>Esta página no existe (o ha cambiado de sitio)</h1>
		<p class="jm-lead">Puede que el enlace esté mal escrito o que hayamos reorganizado la guía. Busca lo que necesitas o elige un tema.</p>
		<form class="jm-mast__search" role="search" action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get" style="max-width:40rem">
			<?php echo jm_icon( 'search' ); // phpcs:ignore ?><label class="jm-sr" for="s-404">Qué quieres saber</label>
			<input id="s-404" name="s" type="search" placeholder="¿Qué quieres saber? Ej.: pensión de viudedad">
			<button class="jm-btn" type="submit" aria-label="Buscar"><span>Buscar</span><?php echo jm_icon( 'arrow' ); // phpcs:ignore ?></button>
		</form>
	</div></div>
</section>
<section class="jm-section jm-section--tight" style="padding-top:0">
	<div class="jm-wrap"><?php echo jm_part( 'topics' ); // phpcs:ignore ?></div>
</section>
<?php
echo jm_mostread(); // phpcs:ignore
get_footer();

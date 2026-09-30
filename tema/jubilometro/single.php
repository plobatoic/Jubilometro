<?php
/**
 * Plantilla de artículo: cabecera editorial, autor y revisión, imagen, índice, cuerpo y relacionados.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();

while ( have_posts() ) :
	the_post();
	$p       = get_post();
	$cat     = jm_primary_cat( $p->ID );
	$url     = get_permalink( $p );
	$title   = get_the_title( $p );
	$content = jm_strip_reviewed( apply_filters( 'the_content', get_the_content() ) ); // phpcs:ignore
	list( $content, $toc ) = jm_toc( $content );
	$calc    = $cat ? ( jm_data( 'catCalc' )[ $cat->slug ] ?? null ) : null;
	$calc    = $calc ? ( jm_data( 'calcs' )[ $calc ] ?? null ) : null;
	$author  = jm_data( 'author' );
	$crumb   = preg_replace( '/:.*$/u', '', $title );
	$enc     = rawurlencode( $url );
	?>
<div class="jm-progress" aria-hidden="true"></div>
<article class="jm-post" data-jm-view="<?php echo (int) $p->ID; ?>" data-jm-ajax="<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>">
	<header class="jm-post__head">
		<div class="jm-wrap">
			<div class="jm-post__headin">
				<nav class="jm-crumbs" aria-label="Migas de pan"><ol>
					<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Inicio</a></li>
					<?php if ( $cat ) : ?><li><a href="<?php echo esc_url( home_url( '/' . $cat->slug . '/' ) ); ?>"><?php echo esc_html( $cat->name ); ?></a></li><?php endif; ?>
					<li><span aria-current="page"><?php echo esc_html( $crumb ); ?></span></li>
				</ol></nav>
				<div class="jm-post__title"><h1><?php echo esc_html( $title ); ?></h1></div>
				<?php if ( has_excerpt() ) : ?><p class="jm-post__dek"><?php echo esc_html( get_the_excerpt() ); ?></p><?php endif; ?>
				<div class="jm-byline">
					<div class="jm-byline__who">
						<span class="jm-avatar" aria-hidden="true"><?php echo esc_html( $author['initials'] ); ?></span>
						<div class="jm-byline__text">
							<span class="jm-byline__name">Por <a href="<?php echo esc_url( home_url( $author['url'] ) ); ?>"><?php echo esc_html( $author['name'] ); ?></a><span class="jm-byline__role"> · Revisado con la normativa vigente · <a href="<?php echo esc_url( home_url( '/metodologia/' ) ); ?>">Cómo revisamos</a></span></span>
							<p class="jm-byline__meta">
								<span><?php echo jm_icon( 'refresh' ); // phpcs:ignore ?>Actualizado el <time datetime="<?php echo esc_attr( get_the_modified_date( 'c' ) ); ?>"><?php echo esc_html( jm_date( $p ) ); ?></time></span>
								<span><?php echo jm_icon( 'clock' ); // phpcs:ignore ?><?php echo (int) jm_minutes( $p ); ?> min de lectura</span>
							</p>
						</div>
					</div>
				</div>
				<div class="jm-post__actions">
				<div class="jm-tools" role="group" aria-label="Herramientas de lectura">
					<div class="jm-tools__size" role="group" aria-label="Tamaño de letra">
						<span class="jm-tools__label" aria-hidden="true">Letra</span>
						<button type="button" data-jm-fs-set="" aria-pressed="true" aria-label="Letra normal"><span aria-hidden="true">A</span></button>
						<button type="button" data-jm-fs-set="1" aria-pressed="false" aria-label="Letra grande"><span aria-hidden="true">A</span></button>
						<button type="button" data-jm-fs-set="2" aria-pressed="false" aria-label="Letra muy grande"><span aria-hidden="true">A</span></button>
					</div>
					<button class="jm-tools__btn" type="button" data-jm-listen aria-pressed="false"><?php echo jm_icon( 'volume' ); // phpcs:ignore ?><span>Escuchar la guía</span></button>
					<button class="jm-tools__btn" type="button" data-jm-listen-stop hidden><?php echo jm_icon( 'x' ); // phpcs:ignore ?><span>Parar</span></button>
					<button class="jm-tools__btn jm-tools__btn--icon" type="button" data-jm-print aria-label="Imprimir la guía"><?php echo jm_icon( 'print' ); // phpcs:ignore ?><span class="jm-sr">Imprimir</span></button>
				</div>
				<div class="jm-share" aria-label="Compartir">
					<span class="jm-share__label">Compartir</span>
					<a class="is-wa" href="https://wa.me/?text=<?php echo rawurlencode( $title . ' ' . $url ); ?>" target="_blank" rel="noopener" aria-label="Compartir por WhatsApp"><?php echo jm_icon( 'whatsapp' ); // phpcs:ignore ?></a>
					<a class="is-fb" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $enc; // phpcs:ignore ?>" target="_blank" rel="noopener" aria-label="Compartir en Facebook"><?php echo jm_icon( 'facebook' ); // phpcs:ignore ?></a>
					<a class="is-mail" href="mailto:?subject=<?php echo rawurlencode( $title ); ?>&amp;body=<?php echo $enc; // phpcs:ignore ?>" aria-label="Enviar por correo"><?php echo jm_icon( 'mail' ); // phpcs:ignore ?></a>
					<button class="is-copy" type="button" data-jm-copy="<?php echo esc_url( $url ); ?>" aria-label="Copiar el enlace"><?php echo jm_icon( 'link' ); // phpcs:ignore ?></button>
				</div>
				</div>
			</div>
		</div>
	</header>


	<div class="jm-wrap jm-post__layout">
		<div class="jm-post__main">
			<?php if ( has_post_thumbnail() ) :
				$tid = get_post_thumbnail_id();
				$cap = wp_get_attachment_caption( $tid );
				$foc = get_post_meta( $p->ID, '_jm_focus', true );
				?>
			<figure class="jm-post__hero">
				<?php echo wp_get_attachment_image( $tid, 'large', false, array( 'sizes' => '(min-width: 820px) 768px, calc(100vw - 2rem)', 'loading' => false, 'fetchpriority' => 'high', 'data-no-lazy' => '1', 'style' => $foc ? 'object-position:' . esc_attr( $foc ) : '' ) ); ?>
				<?php if ( $cap ) : ?><figcaption><?php echo esc_html( $cap ); ?></figcaption><?php endif; ?>
			</figure>
			<?php endif; ?>
			<?php if ( count( $toc ) > 1 ) : ?>
			<details class="jm-toc jm-toc--inline"><summary><?php echo jm_icon( 'list' ); // phpcs:ignore ?>En esta guía<?php echo jm_icon( 'chevron' ); // phpcs:ignore ?></summary><?php echo jm_toc_list( $toc ); // phpcs:ignore ?></details>
			<?php endif; ?>
			<div class="jm-prose">
				<?php echo $content; // phpcs:ignore ?>
			</div>
		</div>
		<aside class="jm-post__aside" aria-label="Índice y herramientas">
			<div class="jm-aside__sticky">
				<?php if ( count( $toc ) > 1 ) : ?>
				<nav class="jm-toc" aria-label="Índice"><p class="jm-toc__title"><?php echo jm_icon( 'list' ); // phpcs:ignore ?>En esta guía</p><?php echo jm_toc_list( $toc ); // phpcs:ignore ?></nav>
				<?php endif; ?>
				<?php if ( $calc ) : ?>
				<div class="jm-promo"><span class="jm-tile__icon"><?php echo jm_icon( $calc['icon'] ); // phpcs:ignore ?></span><h3><?php echo esc_html( $calc['short'] ); ?></h3><p><?php echo esc_html( $calc['desc'] ); ?></p><a class="jm-btn jm-btn--sm" href="<?php echo esc_url( home_url( '/calculadoras/' . $calc['slug'] . '/' ) ); ?>">Calcular<?php echo jm_icon( 'arrow' ); // phpcs:ignore ?></a></div>
				<?php endif; ?>
				<div class="jm-promo jm-promo--sage"><h3>Los cambios, una vez al mes</h3><p>Subidas, plazos y novedades del BOE en cinco minutos de lectura.</p><a class="jm-link-arrow" href="<?php echo esc_url( home_url( '/#newsletter' ) ); ?>">Apuntarme a la newsletter<?php echo jm_icon( 'arrow' ); // phpcs:ignore ?></a></div>
			</div>
		</aside>
	</div>

	<footer class="jm-wrap jm-post__foot">
		<section class="jm-authorbox" aria-labelledby="autor-title">
			<span class="jm-avatar" aria-hidden="true"><?php echo esc_html( $author['initials'] ); ?></span>
			<div>
				<p class="jm-authorbox__k">Escrito y revisado por</p>
				<h2 id="autor-title"><?php echo esc_html( $author['name'] ); ?></h2>
				<p><?php echo esc_html( $author['bio'] ); ?></p>
				<p class="jm-authorbox__links"><a class="jm-link-arrow" href="<?php echo esc_url( home_url( '/sobre-nosotros/' ) ); ?>">Quiénes somos<?php echo jm_icon( 'arrow' ); // phpcs:ignore ?></a><a class="jm-link-arrow" href="<?php echo esc_url( home_url( '/metodologia/' ) ); ?>">Metodología y fuentes<?php echo jm_icon( 'arrow' ); // phpcs:ignore ?></a></p>
			</div>
		</section>
		<?php
		$rel = jm_related( $p, 3 );
		if ( $rel ) :
			?>
		<section aria-labelledby="rel-title">
			<header class="jm-rail__head"><h2 id="rel-title">Sigue leyendo</h2><?php if ( $cat ) : ?><a class="jm-rail__more" href="<?php echo esc_url( home_url( '/' . $cat->slug . '/' ) ); ?>">Todo sobre <?php echo esc_html( 'IMSERSO' === $cat->name ? 'el IMSERSO' : mb_strtolower( $cat->name ) ); ?><?php echo jm_icon( 'arrow' ); // phpcs:ignore ?></a><?php endif; ?></header>
			<div class="jm-rail__grid jm-rail__grid--four jm-rail__grid--three"><?php
			foreach ( $rel as $r ) {
				echo jm_story( $r, 'md', array( 'sizes' => '(min-width: 1100px) 440px, (min-width: 640px) 45vw, 100vw' ) ); // phpcs:ignore
			}
			?></div>
		</section>
		<?php endif; ?>
	</footer>
</article>
	<?php
endwhile;

echo jm_part( 'home-newsletter' ); // phpcs:ignore
get_footer();

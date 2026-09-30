<?php
/**
 * Jubilómetro · artículos ("historias") para portada, temas y relacionados.
 * Primero los publicados; si faltan, los previstos (borradores) marcados como "Próximamente".
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

// Datos fijos del diseño (temas, calculadoras, orden previsto), generados junto al prototipo
function jm_data( $key = null ) {
	static $d = null;
	if ( null === $d ) {
		$d = json_decode( (string) file_get_contents( JM_THEME_DIR . '/inc/data.json' ), true ); // phpcs:ignore
		if ( ! is_array( $d ) ) { $d = array(); }
	}
	return null === $key ? $d : ( $d[ $key ] ?? array() );
}

function jm_icon( $id, $cls = '' ) {
	return '<svg class="jm-i' . ( $cls ? ' ' . esc_attr( $cls ) : '' ) . '" aria-hidden="true"><use href="#i-' . esc_attr( $id ) . '"/></svg>';
}

function jm_primary_cat( $post_id ) {
	$cats = get_the_category( $post_id );
	if ( ! $cats ) { return null; }
	$temas = jm_data( 'temas' );
	foreach ( $cats as $c ) {
		if ( in_array( $c->slug, $temas, true ) ) { return $c; }
	}
	return $cats[0];
}

function jm_minutes( $p ) {
	$text  = trim( wp_strip_all_tags( strip_shortcodes( $p->post_content ) ) );
	$words = '' === $text ? 0 : count( preg_split( '/\s+/u', $text ) );
	return max( 2, (int) round( $words / 200 ) );
}

function jm_date( $p, $format = 'j \d\e F \d\e Y' ) {
	return date_i18n( $format, strtotime( $p->post_modified ) );
}

/**
 * Artículos de un tema (o de todos si $cat vacío).
 * $fill: completa con los previstos. $only_pub_first: los previstos se ordenan por el plan editorial.
 */
function jm_stories( $cat = '', $n = 4, $exclude = array(), $fill = true, $sticky_first = false ) {
	$base = array(
		'post_type'           => 'post',
		'posts_per_page'      => $n,
		'post__not_in'        => array_map( 'intval', $exclude ),
		'ignore_sticky_posts' => true,
		'no_found_rows'       => true,
	);
	if ( $cat ) { $base['category_name'] = $cat; }
	$out = array();
	if ( $sticky_first ) {
		$st = array_diff( array_map( 'intval', (array) get_option( 'sticky_posts', array() ) ), array_map( 'intval', $exclude ) );
		if ( $st ) {
			$out = get_posts( array_merge( $base, array( 'post__in' => array_values( $st ), 'post_status' => 'publish', 'orderby' => 'date', 'order' => 'DESC' ) ) );
		}
	}
	if ( count( $out ) < $n ) {
		$more = get_posts( array_merge( $base, array(
			'post_status'    => 'publish',
			'orderby'        => 'date',
			'order'          => 'DESC',
			'posts_per_page' => $n - count( $out ),
			'post__not_in'   => array_merge( array_map( 'intval', $exclude ), wp_list_pluck( $out, 'ID' ) ),
		) ) );
		$out = array_merge( $out, $more );
	}
	if ( $fill && count( $out ) < $n ) {
		$have  = array_merge( array_map( 'intval', $exclude ), wp_list_pluck( $out, 'ID' ) );
		$plan  = get_posts( array_merge( $base, array(
			'post_status'    => 'draft',
			'orderby'        => 'ID',
			'order'          => 'ASC',
			'posts_per_page' => 80,
			'post__not_in'   => $have,
		) ) );
		// Orden editorial previsto (primero los que la portada destaca)
		$prio = array_flip( jm_data( 'plan' ) );
		usort( $plan, function ( $a, $b ) use ( $prio, $cat ) {
			if ( $cat ) { return $a->ID - $b->ID; }
			$pa = $prio[ $a->post_name ] ?? 999;
			$pb = $prio[ $b->post_name ] ?? 999;
			return $pa === $pb ? $a->ID - $b->ID : $pa - $pb;
		} );
		$out = array_merge( $out, array_slice( $plan, 0, $n - count( $out ) ) );
	}
	return $out;
}

// Imagen destacada con srcset; si no hay, un fondo de marca con el icono del tema
function jm_story_img( $p, $sizes, $eager = false ) {
	$thumb = get_post_thumbnail_id( $p );
	if ( ! $thumb ) {
		$c    = jm_primary_cat( $p->ID );
		$icon = $c && isset( jm_data( 'cats' )[ $c->slug ] ) ? jm_data( 'cats' )[ $c->slug ]['icon'] : 'book';
		return '<figure class="jm-story__media jm-story__media--empty">' . jm_icon( $icon ) . '</figure>';
	}
	$attr = array( 'sizes' => $sizes, 'class' => '' );
	if ( $eager ) {
		$attr['loading']       = false;
		$attr['fetchpriority'] = 'high';
		$attr['data-no-lazy']  = '1';
	} else {
		$attr['loading'] = 'lazy';
	}
	$focus = get_post_meta( $p->ID, '_jm_focus', true );
	if ( $focus ) { $attr['style'] = 'object-position:' . esc_attr( $focus ); }
	return '<figure class="jm-story__media">' . wp_get_attachment_image( $thumb, 'large', false, $attr ) . '</figure>';
}

/**
 * Tarjeta de artículo. Variantes: lead · md · feature · row · text
 * Opciones: h (etiqueta del título), kicker (bool), dek (bool), date (bool), sizes, eager
 */
function jm_story( $p, $v = 'md', $o = array() ) {
	$o     = array_merge( array( 'h' => 'h3', 'kicker' => true, 'dek' => false, 'date' => false, 'sizes' => '', 'eager' => false ), $o );
	$soon  = 'publish' !== $p->post_status;
	$defs  = array(
		'lead'    => '(min-width: 1200px) 760px, (min-width: 760px) 92vw, 100vw',
		'md'      => '(min-width: 1200px) 400px, (min-width: 760px) 45vw, 100vw',
		'feature' => '(min-width: 900px) 700px, 100vw',
		'row'     => '160px',
	);
	$sizes = $o['sizes'] ? $o['sizes'] : ( $defs[ $v ] ?? '100vw' );
	$media = 'text' === $v ? '' : jm_story_img( $p, $sizes, $o['eager'] );
	$c     = jm_primary_cat( $p->ID );
	$title = esc_html( get_the_title( $p ) );
	$title = $soon ? '<span>' . $title . '</span>' : '<a href="' . esc_url( get_permalink( $p ) ) . '">' . $title . '</a>';
	$h     = in_array( $o['h'], array( 'h2', 'h3', 'h4' ), true ) ? $o['h'] : 'h3';
	$dek   = ( $o['dek'] && has_excerpt( $p ) ) ? '<p class="jm-story__dek">' . esc_html( get_the_excerpt( $p ) ) . '</p>' : '';
	// El tema va en la línea de datos, bajo el título (nunca como etiqueta encima)
	$meta = ( $o['kicker'] && $c ) ? '<span class="jm-story__cat"><a href="' . esc_url( home_url( '/' . $c->slug . '/' ) ) . '">' . esc_html( $c->name ) . '</a></span>' : '';
	$num  = jm_num( $p );
	if ( $num ) { $meta .= '<span>Nº ' . esc_html( $num ) . '</span>'; }
	if ( $soon ) {
		$meta .= '<span class="jm-soon">Próximamente</span>';
	} else {
		$meta .= '<span>' . jm_minutes( $p ) . ' min</span>';
		if ( $o['date'] ) {
			$meta .= '<span><time datetime="' . esc_attr( get_the_modified_date( 'c', $p ) ) . '">' . esc_html( jm_date( $p, 'd·m·y' ) ) . '</time></span>';
		}
	}
	return '<article class="jm-story jm-story--' . esc_attr( $v ) . ( $soon ? ' is-soon' : '' ) . '">' . $media
		. '<div class="jm-story__body"><' . $h . ' class="jm-story__title">' . $title . '</' . $h . '>' . $dek
		. '<p class="jm-story__meta">' . $meta . '</p></div></article>';
}

// Cajón de la portada: guía en caja con la etiqueta de su número, como los cajones de un fichero
function jm_cajon( $p ) {
	$c   = jm_primary_cat( $p->ID );
	$num = jm_num( $p );
	return '<article class="jm-cajon">' . jm_story_img( $p, '(min-width: 1240px) 250px, (min-width: 700px) 30vw, 128px' )
		. ( $num ? '<span class="jm-cajon__tag" aria-hidden="true">Nº ' . esc_html( $num ) . '</span>' : '' )
		. '<div class="jm-cajon__body"><h3 class="jm-cajon__title"><a href="' . esc_url( get_permalink( $p ) ) . '">' . esc_html( get_the_title( $p ) ) . '</a></h3>'
		. '<p class="jm-cajon__meta">' . ( $c ? '<span class="jm-cajon__cat">' . esc_html( $c->name ) . '</span>' : '' )
		. '<span>' . (int) jm_minutes( $p ) . ' min</span></p></div></article>';
}

// Número de apunte de la guía (Nº 007) y su cifra clave
function jm_num( $p ) {
	$n = (int) get_post_meta( $p->ID, '_jm_num', true );
	return $n ? str_pad( (string) $n, 3, '0', STR_PAD_LEFT ) : '';
}

// Apunte de la libreta: fecha · nº · concepto (y tema) · dato (la cifra clave o, si no la hay, los minutos de lectura)
function jm_entry( $p, $rank = 0 ) {
	$soon = 'publish' !== $p->post_status;
	$c    = jm_primary_cat( $p->ID );
	$fig  = (string) get_post_meta( $p->ID, '_jm_cifra', true );
	$date = $soon ? '<span class="jm-entry__date">—</span>' : '<time class="jm-entry__date" datetime="' . esc_attr( get_the_date( 'c', $p ) ) . '">' . esc_html( get_the_date( 'd·m·y', $p ) ) . '</time>';
	$n    = $rank ? (string) $rank : jm_num( $p );
	$t    = esc_html( get_the_title( $p ) );
	$t    = $soon ? '<span>' . $t . '</span>' : '<a href="' . esc_url( get_permalink( $p ) ) . '">' . $t . '</a>';
	$cat  = $c ? esc_html( $c->name ) : '';
	if ( $soon ) { $cat .= ( $cat ? ' · ' : '' ) . 'Próximamente'; }
	if ( $fig ) {
		$fig = '<span class="jm-entry__fig">' . esc_html( $fig ) . '</span>';
	} elseif ( $soon ) {
		$fig = '<span class="jm-entry__fig is-time">—</span>';
	} else {
		$m   = jm_minutes( $p );
		$fig = '<span class="jm-entry__fig is-time" aria-label="' . (int) $m . ' minutos de lectura">' . (int) $m . ' min</span>';
	}
	$k    = $c ? ' data-k="' . esc_attr( $c->slug ) . '"' : '';
	$n    = ( $rank || '' === $n ) ? $n : 'Nº ' . $n;
	return '<li class="jm-entry' . ( $soon ? ' is-soon' : '' ) . '"' . $k . '>' . $date . '<span class="jm-entry__n">' . esc_html( $n ) . '</span>'
		. '<div class="jm-entry__concept">' . $t . '<span class="jm-entry__cat">' . $cat . '</span></div>' . $fig . '</li>';
}

// Orden de la libreta: por día de publicación y, dentro del mismo día, por número de guía
function jm_ledger_sort( $list ) {
	usort( $list, function ( $a, $b ) {
		$da = get_the_date( 'Ymd', $a );
		$db = get_the_date( 'Ymd', $b );
		if ( $da !== $db ) { return strcmp( $db, $da ); }
		return (int) get_post_meta( $b->ID, '_jm_num', true ) - (int) get_post_meta( $a->ID, '_jm_num', true );
	} );
	return $list;
}

function jm_ledger( $list, $o ) {
	$o    = array_merge( array( 'id' => 'libreta', 'title' => 'La libreta de guías', 'page' => 'Hoja 1', 'rank' => false, 'more' => null, 'h' => 'h2' ), $o );
	$rows = '';
	foreach ( $list as $i => $p ) { $rows .= jm_entry( $p, $o['rank'] ? $i + 1 : 0 ); }
	$more = $o['more'] ? '<a class="jm-ledger__more" href="' . esc_url( home_url( $o['more'][1] ) ) . '">' . esc_html( $o['more'][0] ) . jm_icon( 'arrow' ) . '</a>' : '';
	return '<section class="jm-ledger' . ( $o['rank'] ? ' jm-ledger--rank' : '' ) . '" aria-labelledby="' . esc_attr( $o['id'] ) . '">'
		. '<header class="jm-ledger__top"><' . $o['h'] . ' id="' . esc_attr( $o['id'] ) . '">' . esc_html( $o['title'] ) . '</' . $o['h'] . '><span class="jm-ledger__page">' . esc_html( $o['page'] ) . '</span></header>'
		. '<div class="jm-ledger__cols" aria-hidden="true"><span>Fecha</span><span>' . ( $o['rank'] ? 'Puesto' : 'Nº' ) . '</span><span>Guía</span><span>Dato</span></div>'
		. '<ol class="jm-ledger__rows">' . $rows . '</ol>' . $more . '</section>';
}

function jm_ids( $list ) { return array_map( 'intval', wp_list_pluck( $list, 'ID' ) ); }

// Guías relacionadas: las del mismo tema más cercanas en número de guía (así los enlaces se reparten entre todas)
function jm_related( $p, $n = 3 ) {
	$cat  = jm_primary_cat( $p->ID );
	$me   = (int) get_post_meta( $p->ID, '_jm_num', true );
	$pool = get_posts( array( 'post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => 80, 'post__not_in' => array( $p->ID ), 'category_name' => $cat ? $cat->slug : '', 'no_found_rows' => true ) );
	usort( $pool, function ( $a, $b ) use ( $me ) {
		return abs( (int) get_post_meta( $a->ID, '_jm_num', true ) - $me ) - abs( (int) get_post_meta( $b->ID, '_jm_num', true ) - $me );
	} );
	$out = array_slice( $pool, 0, $n );
	if ( count( $out ) < $n ) {
		$out = array_merge( $out, jm_stories( '', $n - count( $out ), array_merge( array( $p->ID ), jm_ids( $out ) ), false ) );
	}
	return $out;
}

function jm_post_by_slug( $slug, $status = array( 'publish', 'draft' ) ) {
	$r = get_posts( array( 'name' => $slug, 'post_type' => 'post', 'post_status' => $status, 'numberposts' => 1, 'no_found_rows' => true ) );
	return $r ? $r[0] : null;
}

/* ---------- Bloques de la portada ----------
 * Solo guías publicadas: un tema aparece en la portada cuando tiene al menos tres.
 * Los demás se listan en "En preparación" (jm_upcoming).
 */
function jm_shown_cats( $slug = null ) {
	static $shown = array();
	if ( $slug ) { $shown[ $slug ] = true; }
	return $shown;
}

function jm_rail_feature( $slug, &$used, $flip = false ) {
	$list = jm_stories( $slug, 4, $used, false );
	if ( count( $list ) < 3 ) { return ''; }
	jm_shown_cats( $slug );
	$used = array_merge( $used, jm_ids( $list ) );
	$rows = '';
	foreach ( array_slice( $list, 1 ) as $p ) { $rows .= jm_story( $p, 'row', array( 'kicker' => false ) ); }
	return '<section class="jm-rail" aria-labelledby="rail-' . esc_attr( $slug ) . '"><div class="jm-wrap">' . jm_rail_head( $slug )
		. '<div class="jm-rail__grid jm-rail__grid--feature' . ( $flip ? ' is-flip' : '' ) . '">'
		. jm_story( $list[0], 'feature', array( 'kicker' => false, 'dek' => true ) )
		. '<div class="jm-rail__list">' . $rows . '</div></div></div></section>';
}

function jm_rail_four( $slug, &$used, $tint = false ) {
	$list = jm_stories( $slug, 4, $used, false );
	if ( count( $list ) < 3 ) { return ''; }
	jm_shown_cats( $slug );
	$used  = array_merge( $used, jm_ids( $list ) );
	$cards = '';
	foreach ( $list as $p ) { $cards .= jm_story( $p, 'md', array( 'kicker' => false, 'sizes' => '(min-width: 1150px) 330px, (min-width: 640px) 45vw, 100vw' ) ); }
	return '<section class="jm-rail' . ( $tint ? ' jm-rail--tint' : '' ) . '" aria-labelledby="rail-' . esc_attr( $slug ) . '"><div class="jm-wrap">' . jm_rail_head( $slug )
		. '<div class="jm-rail__grid jm-rail__grid--four' . ( 3 === count( $list ) ? ' jm-rail__grid--three' : '' ) . '">' . $cards . '</div></div></section>';
}

function jm_rail_duo( $a, $b, &$used ) {
	$ok = array();
	foreach ( array( $a, $b ) as $slug ) {
		if ( count( jm_stories( $slug, 3, $used, false ) ) >= 3 ) { $ok[] = $slug; }
	}
	if ( 1 === count( $ok ) ) { return jm_rail_feature( $ok[0], $used ); }
	$cols = '';
	foreach ( $ok as $slug ) {
		$list = jm_stories( $slug, 3, $used, false );
		jm_shown_cats( $slug );
		$used = array_merge( $used, jm_ids( $list ) );
		$rows = '';
		foreach ( array_slice( $list, 1 ) as $p ) { $rows .= jm_story( $p, 'row', array( 'kicker' => false ) ); }
		$cols .= '<div class="jm-duo" aria-labelledby="rail-' . esc_attr( $slug ) . '">' . jm_rail_head( $slug, 'header', 'jm-duo__head' )
			. jm_story( $list[0], 'md', array( 'kicker' => false, 'dek' => true, 'sizes' => '(min-width: 900px) 640px, 100vw' ) )
			. ( $rows ? '<div class="jm-rail__list">' . $rows . '</div>' : '' ) . '</div>';
	}
	return $cols ? '<section class="jm-rail"><div class="jm-wrap jm-rail__grid jm-rail__grid--duo">' . $cols . '</div></section>' : '';
}

// Lo más leído: lecturas reales del mes; si aún no hay datos, las guías imprescindibles
function jm_mostread() {
	$k    = jm_views_key();
	$list = get_posts( array(
		'post_type'      => 'post',
		'post_status'    => 'publish',
		'posts_per_page' => 5,
		'meta_key'       => $k, // phpcs:ignore
		'orderby'        => 'meta_value_num',
		'order'          => 'DESC',
		'no_found_rows'  => true,
	) );
	$real = count( $list ) >= 3;
	$ids  = jm_ids( $list );
	foreach ( jm_data( 'mostread' ) as $slug ) {
		if ( count( $list ) >= 5 ) { break; }
		$p = jm_post_by_slug( $slug, 'publish' );
		if ( $p && ! in_array( (int) $p->ID, $ids, true ) ) { $list[] = $p; $ids[] = (int) $p->ID; }
	}
	if ( count( $list ) < 5 ) {
		foreach ( jm_stories( '', 5 - count( $list ), $ids, false ) as $p ) { $list[] = $p; $ids[] = (int) $p->ID; }
	}
	if ( count( $list ) < 3 ) { return ''; }
	$title = $real ? 'Lo más leído este mes' : 'Guías imprescindibles';
	$page  = $real ? 'Ranking de ' . date_i18n( 'F' ) : 'Por dónde empezar';
	return '<section class="jm-mostread"><div class="jm-wrap">' . jm_ledger( $list, array( 'id' => 'leido-title', 'title' => $title, 'page' => $page, 'rank' => true ) ) . '</div></section>';
}

// Cabecera de una sección por tema
function jm_rail_head( $slug, $tag = 'header', $cls = 'jm-rail__head' ) {
	$term = get_category_by_slug( $slug );
	if ( ! $term ) { return ''; }
	$c     = jm_data( 'cats' )[ $slug ] ?? array( 'desc' => '' );
	$total = (int) $term->count; // solo las publicadas
	$url   = esc_url( home_url( '/' . $slug . '/' ) );
	$desc  = 'jm-rail__head' === $cls ? '<p>' . esc_html( $c['desc'] ) . '</p>' : '';
	return '<' . $tag . ' class="' . $cls . '"><h2 id="rail-' . esc_attr( $slug ) . '"><a href="' . $url . '">' . esc_html( $term->name ) . '</a></h2>' . $desc
		. '<a class="jm-rail__more" href="' . $url . '">' . ( $total > 1 ? 'Las ' . $total . ' guías' : 'Ver el tema' ) . jm_icon( 'arrow' ) . '</a></' . $tag . '>';
}

// En preparación: los temas que aún no tienen guías suficientes en la portada (sin fotos; enlazan a su página del tema)
function jm_upcoming() {
	$shown = jm_shown_cats();
	$cats  = jm_data( 'cats' );
	$rows  = '';
	foreach ( jm_data( 'temas' ) as $slug ) {
		if ( isset( $shown[ $slug ] ) ) { continue; }
		$term = get_category_by_slug( $slug );
		if ( ! $term ) { continue; }
		$pub  = (int) $term->count;
		$prep = (int) ( new WP_Query( array( 'post_type' => 'post', 'post_status' => 'draft', 'category_name' => $slug, 'fields' => 'ids', 'posts_per_page' => -1, 'no_found_rows' => true ) ) )->post_count;
		if ( ! $prep && ! $pub ) { continue; }
		$state = $pub ? sprintf( _n( '%d guía publicada', '%d guías publicadas', $pub, 'jubilometro' ), $pub ) : sprintf( _n( '%d guía prevista', '%d guías previstas', $prep, 'jubilometro' ), $prep );
		$icon  = isset( $cats[ $slug ]['icon'] ) ? jm_icon( $cats[ $slug ]['icon'] ) : '';
		$rows .= '<li><a href="' . esc_url( home_url( '/' . $slug . '/' ) ) . '">' . $icon . '<span class="jm-upcoming__t">' . esc_html( $term->name ) . '<small>' . esc_html( $cats[ $slug ]['desc'] ?? '' ) . '</small></span><span class="jm-upcoming__s">' . esc_html( $state ) . '</span></a></li>';
	}
	if ( ! $rows ) { return ''; }
	return '<section class="jm-upcoming" aria-labelledby="prep-title"><div class="jm-wrap"><div class="jm-upcoming__box">'
		. '<header class="jm-upcoming__head"><h2 id="prep-title">Próximas hojas de la libreta</h2><p>Estamos escribiendo las guías de estos temas. Mientras tanto, cada tema tiene su página con lo esencial y sus calculadoras.</p></header>'
		. '<ul class="jm-upcoming__list">' . $rows . '</ul></div></div></section>';
}

/*
 * Guías por tema (portada): una tarjeta por tema con tres guías pilar y el enlace a todas.
 * Sustituye a las bandas con fotos de cada tema: misma navegación y enlaces, en mucha menos altura.
 * Si una guía pilar ya sale arriba en la portada o no está publicada, se usa la más reciente del tema.
 */
function jm_temas_grid( &$used ) {
	$pilares = array(
		'jubilacion'     => array( 'edad-de-jubilacion', 'anticipada-voluntaria', 'flexible', 'anticipada-involuntaria' ),
		'cuanto-cobrare' => array( 'como-se-calcula-la-pension', 'pension-minima', 'revalorizacion-pensiones', 'pension-maxima' ),
		'viudedad'       => array( 'requisitos', 'cuantia', 'solicitar-viudedad', 'pareja-de-hecho' ),
		'incapacidad'    => array( 'grados-incapacidad', 'incapacidad-total', 'incapacidad-absoluta', 'solicitar' ),
		'ayudas'         => array( 'pension-no-contributiva', 'bono-social-electrico', 'ingreso-minimo-vital-mayores', 'complemento-alquiler' ),
		'dependencia'    => array( 'ley-dependencia', 'grados', 'prestacion-cuidados-familiares', 'solicitar-dependencia' ),
		'dinero'         => array( 'declaracion-renta-jubilados', 'rescate-plan-pensiones', 'hipoteca-inversa', 'irpf-pensiones' ),
		'imserso'        => array( 'viajes-imserso', 'termalismo', 'requisitos-viajes', 'tarjeta-mayores' ),
	);
	$cats  = jm_data( 'cats' );
	$cards = '';
	foreach ( jm_data( 'temas' ) as $slug ) {
		$term = get_category_by_slug( $slug );
		if ( ! $term || ! $term->count ) { continue; }
		$list = array();
		foreach ( $pilares[ $slug ] ?? array() as $ps ) {
			if ( count( $list ) >= 3 ) { break; }
			$p = jm_post_by_slug( $ps, 'publish' );
			if ( $p && ! in_array( (int) $p->ID, $used, true ) && in_array( $slug, wp_list_pluck( get_the_category( $p->ID ), 'slug' ), true ) ) { $list[] = $p; }
		}
		if ( count( $list ) < 3 ) {
			$list = array_merge( $list, jm_stories( $slug, 3 - count( $list ), array_merge( $used, jm_ids( $list ) ), false ) );
		}
		if ( ! $list ) { continue; }
		$used  = array_merge( $used, jm_ids( $list ) );
		$items = '';
		foreach ( $list as $p ) {
			$items .= '<li><a href="' . esc_url( get_permalink( $p ) ) . '">' . esc_html( preg_replace( '/:.*$/u', '', get_the_title( $p ) ) ) . '</a></li>';
		}
		$url    = esc_url( home_url( '/' . $slug . '/' ) );
		$icon   = isset( $cats[ $slug ]['icon'] ) ? jm_icon( $cats[ $slug ]['icon'] ) : '';
		$total  = (int) $term->count;
		$cards .= '<article class="jm-tema" data-k="' . esc_attr( $slug ) . '">'
			. '<header class="jm-tema__head"><span class="jm-tema__icon">' . $icon . '</span><h3><a href="' . $url . '">' . esc_html( $term->name ) . '</a></h3>'
			. '<span class="jm-tema__n">' . esc_html( sprintf( _n( '%d guía', '%d guías', $total, 'jubilometro' ), $total ) ) . '</span></header>'
			. '<ul class="jm-tema__list">' . $items . '</ul>'
			. '<a class="jm-tema__more" href="' . $url . '" aria-label="' . esc_attr( 'Ver todas las guías de ' . $term->name ) . '">Ver todas las guías' . jm_icon( 'arrow' ) . '</a></article>';
	}
	if ( ! $cards ) { return ''; }
	return '<section class="jm-temas" aria-labelledby="temas-title"><div class="jm-wrap">'
		. '<header class="jm-temas__top"><h2 id="temas-title">Guías por tema</h2><p>Lo esencial de cada tema, para empezar por lo que más se consulta.</p></header>'
		. '<div class="jm-temas__grid">' . $cards . '</div></div></section>';
}

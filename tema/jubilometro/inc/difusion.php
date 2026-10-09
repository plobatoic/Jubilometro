<?php
/**
 * Difusión: enlaces cortos para las redes, botones de compartir y perfiles sociales.
 *
 * Enlaces cortos (inc/data.json → "cortos"): jubilometro.com/subida lleva a la calculadora de la subida;
 * con la red al final (jubilometro.com/subida/x, /fb, /ig, /tt, /yt, /in, /wa, /tg, /nl) llega etiquetado con
 * utm_source, así las estadísticas saben qué publicación y qué red trae cada visita.
 *
 * Perfiles sociales (opción jm_redes, por la API: POST /wp/v2/settings {"jm_redes": {"x": "https://x.com/…"}}):
 * mientras no hay ninguno no se pinta nada; con alguno, salen en el pie, en «Síguenos» y en el sameAs de la organización.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

// Sufijo del enlace corto → utm_source y utm_medium
function jm_cortos_redes() {
	return array(
		'x'  => array( 'x', 'social' ),
		'fb' => array( 'facebook', 'social' ),
		'ig' => array( 'instagram', 'social' ),
		'tt' => array( 'tiktok', 'social' ),
		'yt' => array( 'youtube', 'social' ),
		'in' => array( 'linkedin', 'social' ),
		'wa' => array( 'whatsapp', 'social' ),
		'tg' => array( 'telegram', 'social' ),
		'nl' => array( 'newsletter', 'email' ),
	);
}

// Dirección final de un enlace corto (con sus etiquetas), o '' si no existe
function jm_corto_destino( $codigo, $red = '' ) {
	$cortos = jm_data( 'cortos' );
	$redes  = jm_cortos_redes();
	if ( ! isset( $cortos[ $codigo ] ) || ( '' !== $red && ! isset( $redes[ $red ] ) ) ) { return ''; }
	list( $ruta, $ancla ) = array_pad( explode( '#', $cortos[ $codigo ], 2 ), 2, '' );
	$utm = $red ? array( 'utm_source' => $redes[ $red ][0], 'utm_medium' => $redes[ $red ][1] ) : array( 'utm_medium' => 'enlace-corto' );
	$utm['utm_campaign'] = $codigo;
	return add_query_arg( $utm, home_url( $ruta ) ) . ( '' !== $ancla ? '#' . $ancla : '' );
}

add_action( 'init', function () {
	$uri = isset( $_SERVER['REQUEST_URI'] ) ? strtok( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), '?' ) : '';
	if ( ! preg_match( '#^/([a-z0-9-]{2,40})(?:/([a-z]{1,3}))?/?$#', strtolower( (string) $uri ), $m ) ) { return; }
	$red     = $m[2] ?? '';
	$destino = jm_corto_destino( $m[1], $red );
	if ( ! $destino ) { return; }
	if ( ! jm_stats_es_robot() && ! current_user_can( 'edit_posts' ) ) { jm_stats_add( 'corto', $m[1] . '|' . ( $red ? jm_cortos_redes()[ $red ][0] : 'sin-red' ) ); }
	nocache_headers();
	do_action( 'litespeed_control_set_nocache', 'enlace corto' );
	header( 'X-Robots-Tag: noindex' );
	wp_redirect( $destino, 302, 'Jubilometro' ); // phpcs:ignore WordPress.Security.SafeRedirect -- destino propio (home_url)
	exit;
}, 2 );

/* ---------- Perfiles sociales ---------- */
function jm_redes_def() {
	return array( // red => [nombre, dominio permitido, icono]
		'whatsapp'  => array( 'Canal de WhatsApp', 'whatsapp.com', 'whatsapp' ),
		'facebook'  => array( 'Facebook', 'facebook.com', 'facebook' ),
		'x'         => array( 'X (Twitter)', 'x.com', 'xlogo' ),
		'instagram' => array( 'Instagram', 'instagram.com', 'instagram' ),
		'tiktok'    => array( 'TikTok', 'tiktok.com', 'tiktok' ),
		'youtube'   => array( 'YouTube', 'youtube.com', 'youtube' ),
		'linkedin'  => array( 'LinkedIn', 'linkedin.com', 'linkedin' ),
	);
}
add_action( 'init', function () {
	$props = array();
	foreach ( array_keys( jm_redes_def() ) as $red ) { $props[ $red ] = array( 'type' => 'string' ); }
	register_setting( 'general', 'jm_redes', array(
		'type'              => 'object',
		'default'           => array(),
		'show_in_rest'      => array( 'schema' => array( 'type' => 'object', 'properties' => $props, 'additionalProperties' => false ) ),
		'description'       => 'Perfiles de Jubilómetro en redes (dirección completa de cada uno)',
		'sanitize_callback' => 'jm_redes_limpiar',
	) );
} );
function jm_redes_limpiar( $v ) {
	$out = array();
	foreach ( jm_redes_def() as $red => $d ) {
		$u = isset( $v[ $red ] ) ? esc_url_raw( trim( (string) $v[ $red ] ), array( 'https' ) ) : '';
		$h = (string) wp_parse_url( $u, PHP_URL_HOST );
		if ( $u && preg_match( '/(^|\.)' . preg_quote( $d[1], '/' ) . '$/', $h ) ) { $out[ $red ] = $u; }
	}
	return $out;
}
add_action( 'add_option_jm_redes', 'jm_adsense_purge' );
add_action( 'update_option_jm_redes', 'jm_adsense_purge' );
function jm_redes() {
	$r = get_option( 'jm_redes', array() );
	return is_array( $r ) ? jm_redes_limpiar( $r ) : array();
}

// Fila de iconos «Síguenos» (pie y bloque de compartir); vacía mientras no haya perfiles
function jm_redes_html( $clase = 'jm-follow' ) {
	$r = jm_redes();
	if ( ! $r ) { return ''; }
	$def = jm_redes_def();
	$li  = '';
	foreach ( $r as $red => $url ) {
		$li .= sprintf( '<li><a href="%s" target="_blank" rel="noopener me" data-jm-ev="seguir:%s" aria-label="%s">%s</a></li>', esc_url( $url ), esc_attr( $red ), esc_attr( 'Jubilómetro en ' . $def[ $red ][0] ), jm_icon( $def[ $red ][2] ) );
	}
	return '<div class="' . esc_attr( $clase ) . '"><p>Síguenos</p><ul>' . $li . '</ul></div>';
}

// Organización en los datos estructurados: sus perfiles (sameAs)
add_filter( 'rank_math/json_ld', function ( $data ) {
	$r = array_values( jm_redes() );
	if ( ! $r ) { return $data; }
	foreach ( $data as $k => $node ) {
		if ( is_array( $node ) && isset( $node['@type'] ) && in_array( 'Organization', (array) $node['@type'], true ) ) { $data[ $k ]['sameAs'] = $r; }
	}
	return $data;
}, 121 );

/* ---------- Compartir ---------- */
// Enlace de una página con las etiquetas de quien lo comparte (las quita la propia web al llegar)
function jm_share_url( $url, $source, $medium = 'social' ) {
	return add_query_arg( array( 'utm_source' => $source, 'utm_medium' => $medium, 'utm_campaign' => 'compartir' ), $url );
}

// Bloque «¿Le puede servir a alguien?» al final de las guías y las calculadoras
function jm_sharebox( $url, $title, $que = 'guía' ) {
	$wa    = 'https://wa.me/?text=' . rawurlencode( $title . "\n" . jm_share_url( $url, 'whatsapp' ) );
	$fb    = 'https://www.facebook.com/sharer/sharer.php?u=' . rawurlencode( $url );
	$x     = 'https://x.com/intent/post?text=' . rawurlencode( $title ) . '&url=' . rawurlencode( $url );
	$mail  = 'mailto:?subject=' . rawurlencode( $title ) . '&body=' . rawurlencode( "Te paso esta {$que} de Jubilómetro:\n" . jm_share_url( $url, 'email', 'email' ) );
	$canal = jm_redes()['whatsapp'] ?? '';
	$btn   = function ( $cls, $href, $ev, $icon, $txt ) {
		return sprintf( '<a class="jm-sharebtn %s" href="%s"%s data-jm-ev="compartir:%s">%s<span>%s</span></a>', $cls, esc_url( $href ), 0 === strpos( $href, 'mailto:' ) ? '' : ' target="_blank" rel="noopener"', $ev, jm_icon( $icon ), esc_html( $txt ) );
	};
	return '<section class="jm-sharebox" aria-label="Compartir esta ' . esc_attr( $que ) . '">'
		. '<div class="jm-sharebox__text"><p class="jm-sharebox__title">¿Le puede servir a alguien?</p>'
		. '<p>Mándasela a un familiar o a un amigo que esté pensando en su jubilación o en su pensión.</p></div>'
		. '<div class="jm-sharebox__btns">'
		. $btn( 'is-wa', $wa, 'whatsapp', 'whatsapp', 'WhatsApp' )
		. $btn( 'is-fb', $fb, 'facebook', 'facebook', 'Facebook' )
		. $btn( 'is-x', $x, 'x', 'xlogo', 'X' )
		. $btn( 'is-mail', $mail, 'email', 'mail', 'Correo' )
		. '<button class="jm-sharebtn is-copy" type="button" data-jm-copy="' . esc_url( $url ) . '" data-jm-ev="compartir:copiar" aria-label="Copiar enlace">' . jm_icon( 'link' ) . '<span>Copiar enlace</span></button>'
		. '<button class="jm-sharebtn is-native" type="button" data-jm-native="' . esc_url( jm_share_url( $url, 'movil' ) ) . '" data-jm-title="' . esc_attr( $title ) . '" data-jm-ev="compartir:movil" hidden>' . jm_icon( 'share' ) . '<span>Más opciones</span></button>'
		. '</div>'
		. ( $canal ? '<p class="jm-sharebox__canal">' . jm_icon( 'bell' ) . '<span>¿Quieres los avisos de pensiones en el móvil? <a href="' . esc_url( $canal ) . '" target="_blank" rel="noopener" data-jm-ev="seguir:whatsapp">Únete al canal de WhatsApp de Jubilómetro</a> (gratis, sin que nadie vea tu número).</span></p>' : '' )
		. '</section>';
}

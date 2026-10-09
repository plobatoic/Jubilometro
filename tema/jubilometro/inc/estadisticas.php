<?php
/**
 * Estadísticas propias, sin cookies: visitas por página, de dónde llega cada visita (buscadores,
 * asistentes de IA, redes, WhatsApp, enlaces cortos…) y qué botones se pulsan.
 * - El navegador manda una señal por página vista y otra por botón pulsado (jubilometro.js).
 * - No se guarda la IP, el navegador ni nada que identifique a la persona: solo sumas por día.
 *   Sin cookies ni almacenamiento en el dispositivo, así que no necesita consentimiento (art. 22.2 LSSI).
 * - Panel: Escritorio > Estadísticas. Para herramientas: GET /wp-json/jm/v1/estadisticas?dias=30 (con usuario).
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

const JM_STATS_DB = '1';
// Claves distintas que se admiten por tipo y día en lo que llega de fuera (webs de origen, campañas, 404):
// así nadie puede llenar la tabla mandando señales inventadas
const JM_STATS_TOPE = 300;

function jm_stats_table() {
	global $wpdb;
	return $wpdb->prefix . 'jm_stats';
}

add_action( 'init', function () {
	if ( get_option( 'jm_stats_db' ) === JM_STATS_DB ) { return; }
	global $wpdb;
	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	dbDelta( 'CREATE TABLE ' . jm_stats_table() . " (
  dia date NOT NULL,
  tipo varchar(12) NOT NULL,
  clave varchar(120) NOT NULL,
  n int unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY  (dia,tipo,clave)
) " . $wpdb->get_charset_collate() . ';' );
	update_option( 'jm_stats_db', JM_STATS_DB, false );
} );

// Suma n a (hoy, tipo, clave) en una sola consulta: dos visitas a la vez no se pisan
function jm_stats_add( $tipo, $clave, $n = 1 ) {
	global $wpdb;
	$clave = mb_substr( (string) $clave, 0, 120 );
	if ( '' === $clave ) { return; }
	$wpdb->query( $wpdb->prepare( 'INSERT INTO ' . jm_stats_table() . ' (dia, tipo, clave, n) VALUES (%s, %s, %s, %d) ON DUPLICATE KEY UPDATE n = n + VALUES(n)', current_time( 'Y-m-d' ), $tipo, $clave, $n ) ); // phpcs:ignore
}

// Clave libre (web de origen, campaña, 404): pasado el tope del día, las nuevas se suman en «(otras)»
function jm_stats_add_libre( $tipo, $clave ) {
	global $wpdb;
	$t   = jm_stats_table();
	$dia = current_time( 'Y-m-d' );
	$hay = (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM $t WHERE dia = %s AND tipo = %s", $dia, $tipo ) ); // phpcs:ignore
	if ( $hay >= JM_STATS_TOPE && ! $wpdb->get_var( $wpdb->prepare( "SELECT 1 FROM $t WHERE dia = %s AND tipo = %s AND clave = %s", $dia, $tipo, $clave ) ) ) { // phpcs:ignore
		$clave = '(otras)';
	}
	jm_stats_add( $tipo, $clave );
}

// Robots, vistas previas de enlaces y herramientas de medición no cuentan como visitas
function jm_stats_es_robot() {
	$ua = isset( $_SERVER['HTTP_USER_AGENT'] ) ? (string) $_SERVER['HTTP_USER_AGENT'] : ''; // phpcs:ignore
	return '' === $ua || (bool) preg_match( '/bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|externalhit|whatsapp\/|python|curl|wget|fetch|axios|monitor|uptime|scrap/i', $ua );
}

// Nombre corto de la red o del buscador (utm_source de nuestros enlaces o web de la que llega la visita)
function jm_stats_red( $s ) {
	$alias = array(
		'fb' => 'facebook', 'ig' => 'instagram', 'tw' => 'x', 'twitter' => 'x', 'wa' => 'whatsapp', 'yt' => 'youtube',
		'in' => 'linkedin', 'li' => 'linkedin', 'tt' => 'tiktok', 'tg' => 'telegram', 'mail' => 'email', 'correo' => 'email',
	);
	$s = strtolower( preg_replace( '/[^a-z0-9.-]/i', '', (string) $s ) );
	return $alias[ $s ] ?? $s;
}
function jm_stats_origen_web( $host ) {
	$host  = strtolower( preg_replace( '/^www\./', '', $host ) );
	$tabla = array(
		// Asistentes de IA antes que Google (gemini.google.com)
		'chatgpt'    => '/(^|\.)(chatgpt\.com|chat\.openai\.com|openai\.com)$/',
		'perplexity' => '/(^|\.)perplexity\.ai$/',
		'gemini'     => '/^gemini\.google\.com$|^bard\.google\.com$/',
		'copilot'    => '/^copilot\.microsoft\.com$/',
		'claude'     => '/(^|\.)claude\.ai$/',
		'email'      => '/^(mail\.google\.com|outlook\.(live|office|office365)\.com|mail\.yahoo\.com|webmail\..*)$|^com\.google\.android\.gm$|^com\.microsoft\.office\.outlook$/',
		'youtube'    => '/(^|\.)(youtube\.com|youtu\.be)$|^com\.google\.android\.youtube$/',
		'google'     => '/(^|\.)google\.[a-z.]+$|^com\.google\.android\.googlequicksearchbox$/',
		'bing'       => '/(^|\.)bing\.com$/',
		'duckduckgo' => '/(^|\.)duckduckgo\.com$/',
		'yahoo'      => '/(^|\.)yahoo\.(com|es)$/',
		'ecosia'     => '/(^|\.)ecosia\.org$/',
		'buscadores' => '/(^|\.)(qwant\.com|startpage\.com|search\.brave\.com|yandex\.[a-z]+|baidu\.com)$/',
		'facebook'   => '/(^|\.)(facebook\.com|fb\.com|fb\.me)$|^com\.facebook\.(katana|lite|orca)$/',
		'instagram'  => '/(^|\.)instagram\.com$|^com\.instagram\.android$/',
		'x'          => '/^(t\.co|x\.com|twitter\.com|mobile\.twitter\.com)$/',
		'linkedin'   => '/(^|\.)(linkedin\.com|lnkd\.in)$|^com\.linkedin\.android$/',
		'tiktok'     => '/(^|\.)tiktok\.com$|^com\.zhiliaoapp\.musically$/',
		'whatsapp'   => '/(^|\.)(whatsapp\.com|wa\.me)$|^com\.whatsapp$/',
		'telegram'   => '/^(t\.me|web\.telegram\.org)$|^org\.telegram\.messenger$/',
		'pinterest'  => '/(^|\.)pinterest\.[a-z.]+$/',
		'reddit'     => '/(^|\.)reddit\.com$/',
		'forocoches' => '/(^|\.)forocoches\.com$/',
	);
	foreach ( $tabla as $red => $re ) {
		if ( preg_match( $re, $host ) ) { return $red; }
	}
	return '';
}

// Señal de página vista
add_action( 'wp_ajax_jm_hit', 'jm_stats_hit' );
add_action( 'wp_ajax_nopriv_jm_hit', 'jm_stats_hit' );
function jm_stats_hit() {
	// phpcs:disable WordPress.Security.NonceVerification.Missing -- señal anónima sin efectos más allá de sumar
	$p = wp_unslash( $_POST );
	if ( jm_stats_es_robot() || current_user_can( 'edit_posts' ) ) { wp_die( '', '', array( 'response' => 204 ) ); }
	$id = isset( $p['id'] ) ? absint( $p['id'] ) : 0;
	if ( $id && ( 'publish' !== get_post_status( $id ) || ! in_array( get_post_type( $id ), array( 'post', 'page' ), true ) ) ) { $id = 0; }

	jm_stats_add( 'total', 'vistas' );
	jm_stats_add( 'pagina', (string) $id );
	if ( $id && ! empty( $p['l'] ) ) {
		jm_stats_add( 'total', 'lecturas' );
		if ( 'post' === get_post_type( $id ) ) { // «Lo más leído»: solo quien se queda al menos unos segundos
			$k = jm_views_key();
			update_post_meta( $id, $k, (int) get_post_meta( $id, $k, true ) + 1 );
		}
	}
	if ( ! $id && ! empty( $p['p'] ) ) {
		$ruta = '/' . trim( preg_replace( '#[^a-z0-9/_.-]#i', '', strtok( (string) $p['p'], '?' ) ), '/' );
		jm_stats_add_libre( '404', mb_substr( $ruta, 0, 120 ) );
	}

	// Entrada a la web (no un clic dentro de ella): de dónde llega
	$ref  = isset( $p['r'] ) ? strtolower( (string) $p['r'] ) : '';
	$utm  = isset( $p['s'] ) ? jm_stats_red( $p['s'] ) : '';
	$camp = isset( $p['c'] ) ? strtolower( preg_replace( '/[^a-z0-9_-]/i', '', (string) $p['c'] ) ) : '';
	if ( '=' === $ref && '' === $utm && '' === $camp ) { wp_die( '', '', array( 'response' => 204 ) ); }
	$host = preg_match( '/^[a-z0-9][a-z0-9.-]{0,100}$/', $ref ) ? $ref : '';
	$red  = $utm ? $utm : ( $host ? jm_stats_origen_web( $host ) : '' );
	$orig = $red ? $red : ( $host && '=' !== $ref ? 'otras-webs' : 'directo' );
	jm_stats_add( 'total', 'entradas' );
	jm_stats_add_libre( 'origen', mb_substr( $orig, 0, 40 ) );
	jm_stats_add( 'entrada', (string) $id );
	if ( 'otras-webs' === $orig ) { jm_stats_add_libre( 'web', preg_replace( '/^www\./', '', $host ) ); }
	if ( $camp ) { jm_stats_add_libre( 'campana', mb_substr( $camp, 0, 60 ) . '|' . $orig ); }
	$disp = array( 'm' => 'movil', 't' => 'tableta', 'd' => 'ordenador' );
	if ( isset( $p['w'], $disp[ $p['w'] ] ) ) { jm_stats_add( 'dispositivo', $disp[ $p['w'] ] ); }
	// phpcs:enable
	wp_die( '', '', array( 'response' => 204 ) );
}

// Señal de botón pulsado (compartir, calculadoras, newsletter…): solo eventos conocidos
add_action( 'wp_ajax_jm_ev', 'jm_stats_ev' );
add_action( 'wp_ajax_nopriv_jm_ev', 'jm_stats_ev' );
function jm_stats_ev() {
	$p = wp_unslash( $_POST ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
	if ( jm_stats_es_robot() || current_user_can( 'edit_posts' ) ) { wp_die( '', '', array( 'response' => 204 ) ); }
	$e = isset( $p['e'] ) ? (string) $p['e'] : '';
	$k = isset( $p['k'] ) ? strtolower( preg_replace( '/[^a-z0-9-]/i', '', (string) $p['k'] ) ) : '';
	$validos = array(
		'compartir'   => array( 'whatsapp', 'facebook', 'x', 'telegram', 'email', 'copiar', 'movil' ),
		'seguir'      => array( 'whatsapp', 'facebook', 'x', 'instagram', 'tiktok', 'youtube', 'linkedin' ),
		'herramienta' => array( 'escuchar', 'imprimir', 'letra' ),
		'newsletter'  => array( 'alta' ),
		'calculadora' => array_merge( array( 'simulador', 'guia' ), array_keys( jm_data( 'calcs' ) ) ),
	);
	if ( isset( $validos[ $e ] ) && in_array( $k, $validos[ $e ], true ) ) { jm_stats_add( 'evento', $e . ':' . $k ); }
	wp_die( '', '', array( 'response' => 204 ) );
}

/* ---------- Lectura: resumen por tipo para el panel y la API ---------- */
function jm_stats_resumen( $dias ) {
	global $wpdb;
	$t     = jm_stats_table();
	$dias  = max( 1, min( 400, (int) $dias ) );
	$desde = wp_date( 'Y-m-d', time() - ( $dias - 1 ) * DAY_IN_SECONDS );
	$out   = array( 'desde' => $desde, 'hasta' => current_time( 'Y-m-d' ), 'dias' => $dias, 'por_dia' => array(), 'tipos' => array() );
	foreach ( (array) $wpdb->get_results( $wpdb->prepare( "SELECT dia, clave, n FROM $t WHERE tipo = 'total' AND dia >= %s ORDER BY dia", $desde ), ARRAY_A ) as $r ) { // phpcs:ignore
		$out['por_dia'][ $r['dia'] ][ $r['clave'] ] = (int) $r['n'];
	}
	foreach ( (array) $wpdb->get_results( $wpdb->prepare( "SELECT tipo, clave, SUM(n) AS n FROM $t WHERE dia >= %s GROUP BY tipo, clave ORDER BY n DESC", $desde ), ARRAY_A ) as $r ) { // phpcs:ignore
		$out['tipos'][ $r['tipo'] ][ $r['clave'] ] = (int) $r['n'];
	}
	return $out;
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'jm/v1', '/estadisticas', array(
		'methods'             => 'GET',
		'permission_callback' => function () { return current_user_can( 'edit_posts' ); },
		'args'                => array( 'dias' => array( 'default' => 30, 'sanitize_callback' => 'absint' ) ),
		'callback'            => function ( WP_REST_Request $req ) {
			$r = jm_stats_resumen( $req['dias'] );
			foreach ( array( 'pagina', 'entrada' ) as $tipo ) { // el ID de cada página, con su dirección al lado
				foreach ( $r['tipos'][ $tipo ] ?? array() as $id => $n ) {
					$r['urls'][ $id ] = $id ? wp_make_link_relative( get_permalink( (int) $id ) ) : '(sin página: buscador o 404)';
				}
			}
			return $r;
		},
	) );
} );

/* ---------- Panel: Escritorio > Estadísticas ---------- */
add_action( 'admin_menu', function () {
	add_dashboard_page( 'Estadísticas de Jubilómetro', 'Estadísticas', 'edit_posts', 'jm-estadisticas', 'jm_stats_panel' );
} );

function jm_stats_nombre( $tipo, $clave ) {
	static $nombres = array(
		'directo' => 'Directo (sin web de origen: WhatsApp, apps, favoritos)', 'otras-webs' => 'Otras webs', 'google' => 'Google', 'bing' => 'Bing',
		'duckduckgo' => 'DuckDuckGo', 'yahoo' => 'Yahoo', 'ecosia' => 'Ecosia', 'buscadores' => 'Otros buscadores', 'chatgpt' => 'ChatGPT',
		'perplexity' => 'Perplexity', 'gemini' => 'Gemini', 'copilot' => 'Copilot', 'claude' => 'Claude', 'facebook' => 'Facebook',
		'instagram' => 'Instagram', 'x' => 'X (Twitter)', 'linkedin' => 'LinkedIn', 'youtube' => 'YouTube', 'tiktok' => 'TikTok',
		'whatsapp' => 'WhatsApp', 'telegram' => 'Telegram', 'email' => 'Correo', 'newsletter' => 'Newsletter', 'pinterest' => 'Pinterest',
		'reddit' => 'Reddit', 'sin-red' => 'sin red (escrito a mano o sin sufijo)', 'movil' => 'Móvil', 'tableta' => 'Tableta', 'ordenador' => 'Ordenador',
	);
	if ( in_array( $tipo, array( 'pagina', 'entrada' ), true ) ) {
		return $clave ? get_the_title( (int) $clave ) : '(sin página: buscador o 404)';
	}
	if ( in_array( $tipo, array( 'campana', 'corto' ), true ) ) {
		list( $c, $o ) = array_pad( explode( '|', $clave, 2 ), 2, '' );
		return $c . ' · ' . ( $nombres[ $o ] ?? $o );
	}
	if ( 'evento' === $tipo ) {
		list( $e, $k ) = array_pad( explode( ':', $clave, 2 ), 2, '' );
		$cal = jm_data( 'calcs' )[ $k ]['short'] ?? ( 'simulador' === $k ? 'Simulador' : ( 'guia' === $k ? 'dentro de una guía' : '' ) );
		$ev  = array( 'compartir' => 'Compartir por', 'seguir' => 'Seguir en', 'herramienta' => 'Herramienta:', 'newsletter' => 'Newsletter:', 'calculadora' => 'Calculadora:' );
		return ( $ev[ $e ] ?? $e ) . ' ' . ( $cal ? $cal : ( $nombres[ $k ] ?? $k ) );
	}
	return $nombres[ $clave ] ?? $clave;
}

function jm_stats_panel() {
	$dias = isset( $_GET['dias'] ) ? absint( $_GET['dias'] ) : 30; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$dias = in_array( $dias, array( 1, 7, 30, 90, 365 ), true ) ? $dias : 30;
	$r    = jm_stats_resumen( $dias );
	$tot  = $r['tipos']['total'] ?? array();
	$bloques = array(
		'origen'      => array( 'De dónde llegan las visitas', 'Entradas' ),
		'entrada'     => array( 'Páginas por las que entran', 'Entradas' ),
		'pagina'      => array( 'Páginas más vistas', 'Vistas' ),
		'campana'     => array( 'Enlaces cortos y campañas (enlace · red)', 'Entradas' ),
		'evento'      => array( 'Botones pulsados', 'Clics' ),
		'web'         => array( 'Otras webs que te enlazan', 'Entradas' ),
		'dispositivo' => array( 'Dispositivo', 'Entradas' ),
		'corto'       => array( 'Clics en enlaces cortos (antes de llegar a la guía)', 'Clics' ),
		'404'         => array( 'Direcciones que no existen (enlaces rotos)', 'Vistas' ),
	);
	echo '<div class="wrap"><h1>Estadísticas de Jubilómetro</h1>';
	echo '<p>Medición propia y sin cookies: no se guarda nada que identifique a nadie, solo sumas por día. Tus propias visitas con la sesión iniciada no cuentan.</p>';
	echo '<p>';
	foreach ( array( 1 => 'Hoy', 7 => '7 días', 30 => '30 días', 90 => '90 días', 365 => '1 año' ) as $d => $txt ) {
		printf( '<a class="button%s" href="%s">%s</a> ', $d === $dias ? ' button-primary' : '', esc_url( admin_url( 'index.php?page=jm-estadisticas&dias=' . $d ) ), esc_html( $txt ) );
	}
	echo '</p><div style="display:flex;gap:1rem;flex-wrap:wrap;margin:1rem 0">';
	foreach ( array( 'vistas' => 'Páginas vistas', 'entradas' => 'Visitas (entradas a la web)', 'lecturas' => 'Lecturas (más de 4 segundos)' ) as $k => $txt ) {
		printf( '<div class="card" style="margin:0;min-width:220px"><p style="margin:0;color:#50575e">%s</p><p style="font-size:2rem;margin:.3rem 0 0;font-weight:600">%s</p></div>', esc_html( $txt ), esc_html( number_format_i18n( $tot[ $k ] ?? 0 ) ) );
	}
	echo '</div>';
	if ( count( $r['por_dia'] ) > 1 ) { // barras por día (visitas)
		$max = max( 1, max( array_map( function ( $d ) { return $d['entradas'] ?? 0; }, $r['por_dia'] ) ) );
		echo '<h2>Visitas por día</h2><div style="display:flex;align-items:flex-end;gap:2px;height:120px;max-width:900px;border-bottom:1px solid #c3c4c7">';
		foreach ( $r['por_dia'] as $dia => $d ) {
			$n = $d['entradas'] ?? 0;
			printf( '<div title="%s: %s visitas" style="flex:1;background:#2271b1;height:%s%%;min-height:1px"></div>', esc_attr( $dia ), esc_attr( $n ), esc_attr( round( 100 * $n / $max, 1 ) ) );
		}
		echo '</div>';
	}
	echo '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:1.5rem;margin-top:1.5rem">';
	foreach ( $bloques as $tipo => list( $titulo, $col ) ) {
		$filas = array_slice( $r['tipos'][ $tipo ] ?? array(), 0, 25, true );
		if ( ! $filas ) { continue; }
		$suma = max( 1, array_sum( $r['tipos'][ $tipo ] ) );
		printf( '<div><h2>%s</h2><table class="widefat striped"><thead><tr><th>%s</th><th style="width:7rem;text-align:right">%s</th></tr></thead><tbody>', esc_html( $titulo ), 'evento' === $tipo ? 'Botón' : 'Nombre', esc_html( $col ) );
		foreach ( $filas as $clave => $n ) {
			$nom = jm_stats_nombre( $tipo, (string) $clave );
			if ( in_array( $tipo, array( 'pagina', 'entrada' ), true ) && $clave ) {
				$nom = sprintf( '<a href="%s" target="_blank" rel="noopener">%s</a>', esc_url( get_permalink( (int) $clave ) ), esc_html( $nom ) );
			} else {
				$nom = esc_html( $nom );
			}
			printf( '<tr><td>%s</td><td style="text-align:right">%s <span style="color:#8c8f94">(%s %%)</span></td></tr>', $nom, esc_html( number_format_i18n( $n ) ), esc_html( number_format_i18n( 100 * $n / $suma, 0 ) ) ); // phpcs:ignore
		}
		echo '</tbody></table></div>';
	}
	echo '</div></div>';
}

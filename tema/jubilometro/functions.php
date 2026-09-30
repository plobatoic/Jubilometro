<?php
/**
 * Jubilómetro · tema hijo de Kadence.
 * Portada tipo revista, plantilla de artículo, listados por tema y rendimiento.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

define( 'JM_THEME', true );
define( 'JM_THEME_VER', '2.2.4' );
define( 'JM_THEME_DIR', get_stylesheet_directory() );
define( 'JM_THEME_URI', get_stylesheet_directory_uri() );

require_once JM_THEME_DIR . '/inc/historias.php';

// Montaje pendiente (páginas e imágenes): se ejecuta aunque su plugin esté desactivado, hasta completarse
const JM_SETUP_TARGET = '1.3.6';
add_action( 'after_setup_theme', function () {
	$f = WP_PLUGIN_DIR . '/jubilometro-setup/jubilometro-setup.php';
	if ( ! function_exists( 'jm_setup_run' ) && get_option( 'jm_setup_version' ) !== JM_SETUP_TARGET && file_exists( $f ) ) {
		require_once $f;
	}
} );

/* ------------------------------------------------------------------
 * 1. SOPORTE DEL TEMA
 * ------------------------------------------------------------------ */
add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'automatic-feed-links' ); // RSS de las guías: lectores de noticias y descubrimiento de novedades
	set_post_thumbnail_size( 1600, 1067 );
}, 20 );

/* ------------------------------------------------------------------
 * 2. ESTILOS Y SCRIPTS: solo los del diseño (sin CSS de Kadence ni Google Fonts)
 * ------------------------------------------------------------------ */
add_action( 'wp_enqueue_scripts', function () {
	foreach ( array( wp_styles(), wp_scripts() ) as $reg ) {
		foreach ( (array) $reg->queue as $h ) {
			$src = isset( $reg->registered[ $h ] ) ? (string) $reg->registered[ $h ]->src : '';
			// Fuera: CSS de Kadence, Google Fonts y el script de Hostinger Reach (la web no lo usa y carga un tercero en cada visita)
			if ( false !== strpos( $src, '/themes/kadence/' ) || false !== strpos( $src, 'fonts.googleapis.com' ) || false !== strpos( $h, 'hostinger-reach' ) || false !== strpos( $src, 'reach.hostinger.com' ) ) {
				$reg instanceof WP_Styles ? wp_dequeue_style( $h ) : wp_dequeue_script( $h );
			}
		}
	}
	wp_enqueue_style( 'jubilometro', JM_THEME_URI . '/assets/css/jubilometro.css', array(), JM_THEME_VER );
	wp_enqueue_script( 'jm-site', JM_THEME_URI . '/assets/js/jubilometro.js', array(), JM_THEME_VER, array( 'strategy' => 'defer', 'in_footer' => true ) );
	$post    = get_post();
	$content = ( $post && is_singular() ) ? $post->post_content : '';
	if ( is_front_page() || false !== strpos( $content, 'data-jm-calc' ) ) {
		wp_enqueue_script( 'jm-calculadoras', JM_THEME_URI . '/assets/js/calculadoras.js', array(), JM_THEME_VER, array( 'strategy' => 'defer', 'in_footer' => true ) );
	}
}, 100 );

add_action( 'wp_head', function () {
	// Tamaño de letra elegido por el lector: se aplica antes de pintar (sin salto de página)
	echo "<script>try{var f=localStorage.getItem('jm_fs');if(f)document.documentElement.setAttribute('data-jm-fs',f)}catch(e){}</script>\n";
	// Solo la fuente del texto; la mono (fechas y cifras) llega sin bloquear
	// Las dos letras del diseño (titulares y texto): se piden en paralelo con la hoja de estilos
	foreach ( array( 'newsreader-normal-latin', 'public-sans-normal-latin' ) as $f ) {
		printf( '<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n", esc_url( JM_THEME_URI . '/assets/fonts/' . $f . '.woff2' ) );
	}
	echo '<meta name="theme-color" content="#FFFFFF">' . "\n";
	printf( '<link rel="manifest" href="%s">' . "\n", esc_url( JM_THEME_URI . '/manifest.json' ) );
}, 2 );

// Icono vectorial (nítido en cualquier tamaño) además del icono del sitio que genera WordPress
add_action( 'wp_head', function () {
	echo '<link rel="icon" href="' . esc_url( JM_THEME_URI . '/assets/img/favicon.svg' ) . '" type="image/svg+xml" sizes="any">' . "\n";
}, 100 );

// Diseño nuevo publicado: se vacía la caché de LiteSpeed para que nadie reciba páginas con el diseño anterior
add_action( 'init', function () {
	if ( get_option( 'jm_theme_ver' ) === JM_THEME_VER ) { return; }
	update_option( 'jm_theme_ver', JM_THEME_VER, false );
	do_action( 'litespeed_purge_all' );
} );

// Tamaños de foto: se usan los que marca el diseño para cada hueco (sin el "sizes=auto" de WordPress,
// que en móvil hacía descargar versiones de 768 px para miniaturas de 100 px)
add_filter( 'wp_img_tag_add_auto_sizes', '__return_false' );
// Los comentarios están cerrados: sin enlace al feed de comentarios
add_filter( 'feed_links_show_comments_feed', '__return_false' );

// Navegación instantánea: el navegador precarga la guía al dejar el ratón encima (reglas de especulación de WordPress)
add_filter( 'wp_speculation_rules_configuration', function ( $config ) {
	if ( is_array( $config ) ) { $config['eagerness'] = 'moderate'; }
	return $config;
} );

// Cabeceras de seguridad (no afectan al diseño; suman confianza para navegadores y buscadores)
add_action( 'send_headers', function () {
	if ( is_admin() ) { return; }
	header( 'X-Content-Type-Options: nosniff' );
	header( 'Referrer-Policy: strict-origin-when-cross-origin' );
	header( 'X-Frame-Options: SAMEORIGIN' );
	header( 'Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()' );
	if ( is_ssl() ) { header( 'Strict-Transport-Security: max-age=31536000' ); }
} );

// El tema padre (Kadence) pinta al final un script que mide la ventana y obliga al navegador a maquetar
// toda la página otra vez (≈0,6 s en móvil). Este diseño no lo usa: se retira del pie.
add_action( 'wp_footer', function () { ob_start(); }, -1000 );
add_action( 'wp_footer', function () {
	$html = (string) ob_get_clean();
	echo preg_replace( '#<script>\s*document\.documentElement\.style\.setProperty\(\s*[\'"]--scrollbar-offset[\'"].*?</script>\s*#s', '', $html ); // phpcs:ignore
}, PHP_INT_MAX );

remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
// Sin avisos de conexión a servicios que la web no usa
add_filter( 'wp_resource_hints', function ( $urls ) {
	return array_values( array_filter( (array) $urls, function ( $u ) {
		$h = is_array( $u ) ? ( $u['href'] ?? '' ) : (string) $u;
		return false === strpos( $h, 'reach.hostinger.com' );
	} ) );
}, 99 );
// La API no publica la lista de usuarios a quien no ha iniciado sesión: así no se puede
// averiguar el nombre de acceso de la cuenta (la firma de autor sigue en cada artículo).
add_filter( 'rest_endpoints', function ( $endpoints ) {
	if ( is_user_logged_in() ) { return $endpoints; }
	unset( $endpoints['/wp/v2/users'], $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
	return $endpoints;
} );

/*
 * Actualizar este tema por la API: POST /wp-json/jm-tema/v1/instalar con el zip en el campo «tema»
 * (multipart). Es lo mismo que Apariencia > Temas > Subir tema > «Reemplazar el instalado con el
 * subido», con los mismos permisos (solo un administrador autenticado, p. ej. con contraseña de
 * aplicación), y solo acepta un zip del propio tema Jubilómetro.
 */
add_action( 'rest_api_init', function () {
	register_rest_route( 'jm-tema/v1', '/instalar', array(
		'methods'             => 'POST',
		'permission_callback' => function () { return current_user_can( 'install_themes' ) && current_user_can( 'update_themes' ); },
		'callback'            => 'jm_tema_instalar',
	) );
} );
function jm_tema_instalar( WP_REST_Request $req ) {
	$f = $req->get_file_params();
	if ( empty( $f['tema']['tmp_name'] ) || ! is_uploaded_file( $f['tema']['tmp_name'] ) ) {
		return new WP_Error( 'jm_sin_zip', 'Falta el zip del tema en el campo «tema».', array( 'status' => 400 ) );
	}
	if ( ! class_exists( 'ZipArchive' ) ) {
		return new WP_Error( 'jm_sin_zip', 'El servidor no puede abrir archivos zip.', array( 'status' => 500 ) );
	}
	$zip = new ZipArchive();
	if ( true !== $zip->open( $f['tema']['tmp_name'] ) ) {
		return new WP_Error( 'jm_zip_malo', 'El archivo no es un zip válido.', array( 'status' => 400 ) );
	}
	$css = $zip->getFromName( 'jubilometro/style.css' );
	$raiz = true;
	for ( $i = 0; $i < $zip->numFiles; $i++ ) {
		if ( 0 !== strpos( (string) $zip->getNameIndex( $i ), 'jubilometro/' ) ) { $raiz = false; break; }
	}
	$zip->close();
	if ( ! $raiz || ! $css || ! preg_match( '/^\s*Theme Name:\s*Jubilómetro\s*$/mu', $css ) || ! preg_match( '/^\s*Version:\s*([\w.-]+)/m', $css, $v ) ) {
		return new WP_Error( 'jm_otro_tema', 'El zip no es el tema Jubilómetro (carpeta jubilometro/ con su style.css).', array( 'status' => 400 ) );
	}
	$paquete = wp_tempnam( 'jubilometro-tema.zip' );
	if ( ! $paquete || ! move_uploaded_file( $f['tema']['tmp_name'], $paquete ) ) {
		return new WP_Error( 'jm_copia', 'No se pudo guardar el zip en el servidor.', array( 'status' => 500 ) );
	}
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/misc.php';
	require_once ABSPATH . 'wp-admin/includes/theme.php';
	require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
	$skin = new WP_Ajax_Upgrader_Skin();
	$res  = ( new Theme_Upgrader( $skin ) )->install( $paquete, array( 'overwrite_package' => true, 'clear_update_cache' => true ) );
	wp_delete_file( $paquete );
	if ( is_wp_error( $res ) ) { return $res; }
	if ( ! $res ) {
		return new WP_Error( 'jm_fallo', implode( ' ', (array) $skin->get_error_messages() ) ?: 'La instalación no se completó.', array( 'status' => 500 ) );
	}
	do_action( 'litespeed_purge_all' );
	return array( 'instalado' => true, 'version' => $v[1] );
}

/* ------------------------------------------------------------------
 * 3. CLASES DEL BODY
 *    jm-live: oculta al público las zonas de redacción (solo las ve el editor conectado)
 *    jm-ads-on: muestra los huecos de anuncio cuando AdSense está configurado
 * ------------------------------------------------------------------ */
add_filter( 'body_class', function ( $c ) {
	$c[] = 'jm-live';
	if ( defined( 'JM_ADSENSE' ) && JM_ADSENSE ) { $c[] = 'jm-ads-on'; }
	return $c;
} );

/* ------------------------------------------------------------------
 * 4. PIEZAS DEL DISEÑO (HTML generado junto al prototipo)
 * ------------------------------------------------------------------ */
function jm_part( $name ) {
	$f = JM_THEME_DIR . '/parts/' . $name . '.html';
	if ( ! file_exists( $f ) ) { return ''; }
	$html = (string) file_get_contents( $f ); // phpcs:ignore
	return jm_local_imgs( jm_fix_links( do_shortcode( jm_rev_dates( $html ) ) ) );
}

/*
 * Fotos de Unsplash de las páginas y de la portada: en cuanto el montaje las ha traído a la biblioteca
 * de medios, se sirven desde la propia web (más rápido, sin enviar la IP del lector a un tercero
 * y con valor para Google Imágenes). Si aún no están, se deja la original.
 */
function jm_local_imgs( $html ) {
	if ( false === strpos( $html, 'images.unsplash.com/photo-' ) ) { return $html; }
	$map = get_option( 'jm_unsplash_map', array() );
	if ( ! $map || ! is_array( $map ) ) { return $html; }
	return preg_replace_callback( '#<img\b[^>]*>#', function ( $m ) use ( $map ) {
		$tag = $m[0];
		if ( ! preg_match( '#images\.unsplash\.com/photo-([A-Za-z0-9-]+)\?#', $tag, $x ) || empty( $map[ $x[1] ] ) ) { return $tag; }
		$aid = (int) $map[ $x[1] ];
		$src = wp_get_attachment_image_url( $aid, 'large' );
		if ( ! $src ) { return $tag; }
		$set = wp_get_attachment_image_srcset( $aid, 'large' );
		$tag = preg_replace( '#\ssrcset="[^"]*"#', '', $tag );
		$tag = preg_replace( '#\ssrc="[^"]*"#', ' src="' . esc_url( $src ) . '"' . ( $set ? ' srcset="' . esc_attr( $set ) . '"' : '' ), $tag );
		return str_replace( '<img', '<img data-jm-local', $tag );
	}, $html );
}
add_filter( 'the_content', 'jm_local_imgs', 27 );

// Fechas de revisión (<span data-jm-rev>): la de la última guía publicada o actualizada;
// dentro de una guía, la de esa guía.
function jm_rev_dates( $html ) {
	if ( false === strpos( $html, 'data-jm-rev' ) ) { return $html; }
	$last = is_singular( 'post' ) ? get_post_field( 'post_modified', get_queried_object_id() ) : get_lastpostmodified( 'blog', 'post' );
	if ( ! $last ) { return $html; }
	$t    = strtotime( $last );
	$html = preg_replace( '/(<span data-jm-rev="short">)[^<]*/', '${1}' . date_i18n( 'd·m·y', $t ), $html );
	return preg_replace( '/(<span data-jm-rev="long">)[^<]*/', '${1}' . date_i18n( 'j \d\e F \d\e Y', $t ), $html );
}
// En las guías, la fecha es la de la propia guía. En las páginas (temas, calculadoras) se deja la fecha
// en que se verificaron sus cifras, que es la que coincide con su recuadro «Revisado por».
add_filter( 'the_content', function ( $html ) { return is_singular( 'post' ) ? jm_rev_dates( $html ) : $html; }, 26 );

// Índice para el buscador instantáneo: guías publicadas, calculadoras y temas (≈10 KB, en caché 12 h)
function jm_indice() {
	$data = get_transient( 'jm_indice_v1' );
	if ( is_array( $data ) ) { return $data; }
	$data = array();
	foreach ( get_posts( array( 'post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => 500, 'no_found_rows' => true ) ) as $p ) {
		$c      = jm_primary_cat( $p->ID );
		$data[] = array(
			't' => html_entity_decode( get_the_title( $p ), ENT_QUOTES, 'UTF-8' ),
			'u' => wp_make_link_relative( get_permalink( $p ) ),
			'c' => $c ? $c->name : 'Guía',
			'n' => jm_num( $p ),
			'k' => 'guia',
			'e' => html_entity_decode( wp_trim_words( get_the_excerpt( $p ), 24, '…' ), ENT_QUOTES, 'UTF-8' ),
		);
	}
	foreach ( (array) jm_data( 'calcs' ) as $cc ) {
		if ( empty( $cc['slug'] ) ) { continue; }
		$data[] = array( 't' => $cc['name'] ?? $cc['short'], 'u' => '/calculadoras/' . $cc['slug'] . '/', 'c' => 'Calculadora', 'n' => '', 'k' => 'calc', 'e' => $cc['desc'] ?? '' );
	}
	$cats = jm_data( 'cats' );
	foreach ( (array) jm_data( 'temas' ) as $slug ) {
		$term = get_category_by_slug( $slug );
		if ( $term ) { $data[] = array( 't' => $term->name, 'u' => '/' . $slug . '/', 'c' => 'Tema', 'n' => '', 'k' => 'tema', 'e' => $cats[ $slug ]['desc'] ?? '' ); }
	}
	set_transient( 'jm_indice_v1', $data, 12 * HOUR_IN_SECONDS );
	return $data;
}
add_action( 'rest_api_init', function () {
	register_rest_route( 'jm/v1', '/indice', array(
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => function () {
			$r = rest_ensure_response( jm_indice() );
			$r->header( 'Cache-Control', 'public, max-age=3600' );
			$r->header( 'X-Robots-Tag', 'noindex' );
			return $r;
		},
	) );
} );
add_action( 'save_post', function () { delete_transient( 'jm_indice_v1' ); } );
add_action( 'deleted_post', function () { delete_transient( 'jm_indice_v1' ); } );

// [jm_cuenta cat="viudedad"]: guías publicadas de un tema, en palabras
add_shortcode( 'jm_cuenta', function ( $a ) {
	$a    = shortcode_atts( array( 'cat' => '' ), $a );
	$term = $a['cat'] ? get_category_by_slug( $a['cat'] ) : null;
	$n    = $term ? (int) $term->count : 0;
	return $n ? esc_html( sprintf( _n( '%d guía publicada', '%d guías publicadas', $n, 'jubilometro' ), $n ) ) : 'Guías en preparación';
} );

/*
 * Enlaces internos a guías que aún no están publicadas: en lugar de dejar que Google encuentre
 * una redirección, el enlace apunta directamente a la guía (si se publicó con otro nombre) o a la página del tema.
 */
function jm_fix_links( $html ) {
	static $pub = null, $old = array();
	if ( false === strpos( $html, 'href=' ) ) { return $html; }
	if ( null === $pub ) {
		$pub = array();
		$ids = get_posts( array( 'post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => -1, 'fields' => 'ids', 'no_found_rows' => true ) );
		foreach ( $ids as $id ) { $pub[ untrailingslashit( wp_make_link_relative( get_permalink( $id ) ) ) ] = true; }
	}
	$temas = jm_data( 'temas' );
	$host  = preg_quote( (string) wp_parse_url( home_url(), PHP_URL_HOST ), '#' );
	return preg_replace_callback( '#href="(?:https?://(?:www\.)?' . $host . ')?/([a-z0-9-]+)/([a-z0-9-]+)/"#', function ( $m ) use ( $pub, $temas, &$old ) {
		if ( ! in_array( $m[1], $temas, true ) || isset( $pub[ '/' . $m[1] . '/' . $m[2] ] ) ) { return $m[0]; }
		if ( ! array_key_exists( $m[2], $old ) ) {
			$r = get_posts( array( 'post_type' => 'post', 'post_status' => 'publish', 'meta_key' => '_wp_old_slug', 'meta_value' => $m[2], 'posts_per_page' => 1, 'fields' => 'ids', 'no_found_rows' => true ) ); // phpcs:ignore
			$old[ $m[2] ] = $r ? get_permalink( $r[0] ) : '';
		}
		return 'href="' . esc_url( $old[ $m[2] ] ? $old[ $m[2] ] : home_url( '/' . $m[1] . '/' ) ) . '"';
	}, $html );
}
add_filter( 'the_content', 'jm_fix_links', 30 );

// Cifra clave de cada guía (aparece en la libreta de la portada). Editable en la guía y por la API.
add_action( 'init', function () {
	register_post_meta( 'post', '_jm_cifra', array(
		'type'          => 'string',
		'single'        => true,
		'show_in_rest'  => true,
		'auth_callback' => function ( $allowed, $key, $post_id ) { return current_user_can( 'edit_post', $post_id ); },
		'sanitize_callback' => function ( $v ) { return mb_substr( sanitize_text_field( $v ), 0, 14 ); },
	) );
} );
add_action( 'add_meta_boxes_post', function () {
	add_meta_box( 'jm-cifra', 'Cifra clave (libreta de la portada)', function ( $post ) {
		wp_nonce_field( 'jm_cifra', 'jm_cifra_nonce' );
		printf(
			'<p><input type="text" name="jm_cifra" value="%s" maxlength="14" style="width:100%%" placeholder="Ej.: 35 años"></p><p class="description">El dato principal de la guía, en pocas letras (35 años, 3.359,60 €, +2,7 %%). Déjalo vacío si no hay una cifra clara: se mostrarán los minutos de lectura.</p>',
			esc_attr( (string) get_post_meta( $post->ID, '_jm_cifra', true ) )
		);
	}, 'post', 'side', 'default' );
} );
add_action( 'save_post_post', function ( $post_id ) {
	if ( ! isset( $_POST['jm_cifra_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['jm_cifra_nonce'] ), 'jm_cifra' ) ) { return; }
	if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ! current_user_can( 'edit_post', $post_id ) ) { return; }
	$v = isset( $_POST['jm_cifra'] ) ? mb_substr( sanitize_text_field( wp_unslash( $_POST['jm_cifra'] ) ), 0, 14 ) : '';
	'' === $v ? delete_post_meta( $post_id, '_jm_cifra' ) : update_post_meta( $post_id, '_jm_cifra', $v );
} );

// Sección actual (para marcar el menú)
function jm_section() {
	if ( is_front_page() ) { return 'home'; }
	if ( is_singular( 'post' ) ) {
		$c = jm_primary_cat( get_queried_object_id() );
		return $c ? $c->slug : '';
	}
	if ( is_page() ) {
		$id  = get_queried_object_id();
		$anc = get_post_ancestors( $id );
		$top = $anc ? end( $anc ) : $id;
		return get_post_field( 'post_name', $top );
	}
	return '';
}

function jm_header_html() {
	$html = jm_part( 'header' );
	$sec  = jm_section();
	if ( $sec ) {
		$html = str_replace( 'data-k="' . $sec . '"', 'data-k="' . $sec . '" aria-current="page"', $html );
		if ( in_array( $sec, array( 'guias', 'incapacidad', 'ayudas', 'dinero' ), true ) ) {
			$html = preg_replace( '/<button type="button" aria-haspopup="true">/', '<button type="button" aria-haspopup="true" aria-current="true">', $html, 1 );
		}
	}
	return $html;
}

/* ------------------------------------------------------------------
 * 5. ARTÍCULOS: índice automático, "Revisado por" en la cabecera y lecturas
 * ------------------------------------------------------------------ */
// Devuelve [contenido con anclas, lista de H2]
function jm_toc( $html ) {
	$toc  = array();
	$seen = array();
	$html = preg_replace_callback( '#<h2(\s[^>]*)?>(.*?)</h2>#is', function ( $m ) use ( &$toc, &$seen ) {
		$attrs = isset( $m[1] ) ? $m[1] : '';
		if ( preg_match( '/class="[^"]*jm-/', $attrs ) ) { return $m[0]; }
		$text = trim( wp_strip_all_tags( $m[2] ) );
		if ( '' === $text || 0 === strpos( $text, 'Datos clave' ) ) { return $m[0]; }
		if ( preg_match( '/\sid="([^"]+)"/', $attrs, $idm ) ) {
			$id = $idm[1];
		} else {
			$id = sanitize_title( $text );
			$base = $id; $i = 2;
			while ( isset( $seen[ $id ] ) ) { $id = $base . '-' . $i++; }
			$attrs .= ' id="' . esc_attr( $id ) . '"';
		}
		$seen[ $id ] = true;
		$toc[]       = array( $id, $text );
		return '<h2' . $attrs . '>' . $m[2] . '</h2>';
	}, $html );
	return array( $html, $toc );
}

function jm_toc_list( $toc ) {
	$o = '<ol>';
	foreach ( $toc as $t ) { $o .= '<li><a href="#' . esc_attr( $t[0] ) . '">' . esc_html( $t[1] ) . '</a></li>'; }
	return $o . '</ol>';
}

// En la entrada, el "Revisado por" va en la cabecera: se quita el bloque repetido del contenido
function jm_strip_reviewed( $html ) {
	return preg_replace( '#<div class="jm-reviewed">.*?</p>\s*</div>#s', '', $html, 1 );
}

// Lecturas del mes (para "Lo más leído"): señal ligera desde el navegador, sin cookies
function jm_views_key() { return 'jm_views_' . gmdate( 'Ym' ); }
add_action( 'wp_ajax_jm_view', 'jm_count_view' );
add_action( 'wp_ajax_nopriv_jm_view', 'jm_count_view' );
function jm_count_view() {
	$id = isset( $_POST['id'] ) ? absint( $_POST['id'] ) : 0; // phpcs:ignore
	if ( $id && 'post' === get_post_type( $id ) && 'publish' === get_post_status( $id ) && ! current_user_can( 'edit_posts' ) ) {
		$k = jm_views_key();
		update_post_meta( $id, $k, (int) get_post_meta( $id, $k, true ) + 1 );
	}
	wp_die( '', '', array( 'response' => 204 ) );
}

// Número de apunte (Guía nº 063…): cada guía nueva recibe el siguiente al publicarse
function jm_assign_num( $post_id ) {
	if ( 'post' !== get_post_type( $post_id ) || get_post_meta( $post_id, '_jm_num', true ) ) { return; }
	global $wpdb;
	$max = (int) $wpdb->get_var( "SELECT MAX(CAST(meta_value AS UNSIGNED)) FROM {$wpdb->postmeta} WHERE meta_key = '_jm_num'" );
	update_post_meta( $post_id, '_jm_num', $max + 1 );
}
add_action( 'transition_post_status', function ( $new, $old, $post ) {
	if ( 'publish' === $new && 'post' === $post->post_type ) { jm_assign_num( $post->ID ); }
}, 10, 3 );
add_action( 'init', function () {
	if ( get_option( 'jm_nums_v1' ) ) { return; }
	update_option( 'jm_nums_v1', 1, false );
	$ids = get_posts( array( 'post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => -1, 'orderby' => 'date', 'order' => 'ASC', 'fields' => 'ids', 'meta_query' => array( array( 'key' => '_jm_num', 'compare' => 'NOT EXISTS' ) ) ) ); // phpcs:ignore
	foreach ( $ids as $id ) { jm_assign_num( $id ); }
}, 30 );

// Buscador: sin la portada ni las páginas legales entre los resultados
add_action( 'pre_get_posts', function ( $q ) {
	if ( is_admin() || ! $q->is_main_query() || ! $q->is_search() ) { return; }
	$ex = array( (int) get_option( 'page_on_front' ) );
	foreach ( array( 'aviso-legal', 'politica-privacidad', 'politica-cookies', 'descargo-responsabilidad', 'accesibilidad', 'contacto' ) as $s ) {
		$p = get_page_by_path( $s );
		if ( $p ) { $ex[] = (int) $p->ID; }
	}
	$q->set( 'post__not_in', $ex );
} );

/* ------------------------------------------------------------------
 * 6. URLS QUE NO EXISTEN: error 404 limpio (sin redirecciones que Google trate como "soft 404").
 *    Los enlaces internos a guías sin publicar ya se corrigen en jm_fix_links().
 *    Las páginas no tienen paginación: /jubilacion/page/2/ también es 404.
 * ------------------------------------------------------------------ */
add_action( 'template_redirect', function () {
	if ( is_page() && (int) get_query_var( 'paged' ) > 1 ) {
		global $wp_query;
		$wp_query->set_404();
		status_header( 404 );
		nocache_headers();
	}
}, 1 );

/* ------------------------------------------------------------------
 * 7. VISTA PREVIA DE BORRADORES PARA REVISIÓN (clave temporal, sin sesión)
 *    Solo funciona mientras exista la opción jm_qa_key; se borra al terminar la revisión.
 * ------------------------------------------------------------------ */
function jm_qa_ok() {
	static $ok = null;
	if ( null === $ok ) {
		$key = get_option( 'jm_qa_key' );
		$ok  = $key && ! empty( $_GET['jm_qa'] ) && hash_equals( (string) $key, (string) wp_unslash( $_GET['jm_qa'] ) ); // phpcs:ignore
	}
	return $ok;
}
add_filter( 'posts_results', function ( $posts, $q ) {
	if ( is_admin() || ! $q->is_main_query() || ! jm_qa_ok() ) { return $posts; }
	foreach ( $posts as $p ) {
		if ( 'draft' === $p->post_status ) { $p->post_status = 'publish'; }
	}
	return $posts;
}, 10, 2 );
add_action( 'template_redirect', function () {
	if ( jm_qa_ok() ) {
		if ( ! defined( 'DONOTCACHEPAGE' ) ) { define( 'DONOTCACHEPAGE', true ); }
		do_action( 'litespeed_control_set_nocache', 'revision jm' );
		header( 'X-Robots-Tag: noindex, nofollow' );
	}
}, 1 );
add_filter( 'redirect_canonical', function ( $r ) { return jm_qa_ok() ? false : $r; } );

/* ------------------------------------------------------------------
 * 8. LISTADOS EN PÁGINAS: [jm_articulos cat="viudedad"] y [jm_guias]
 * ------------------------------------------------------------------ */
// Guías previstas (borradores) de un tema: solo se cuentan, nunca se enseñan como fichas
function jm_prep_count( $cat ) {
	return (int) ( new WP_Query( array( 'post_type' => 'post', 'post_status' => 'draft', 'category_name' => $cat, 'fields' => 'ids', 'posts_per_page' => -1, 'no_found_rows' => true ) ) )->post_count;
}
function jm_prep_note( $n, $cat = '' ) {
	// Desde la 2.1 no se anuncian guías en preparación: para los lectores y para AdSense, el sitio
	// no debe parecer en obras. Los borradores siguen ahí y salen solos al publicarse.
	if ( $n < 1 || ! apply_filters( 'jm_show_prep_note', false ) ) { return ''; }
	$txt = sprintf( _n( 'Estamos preparando %d guía más sobre este tema.', 'Estamos preparando %d guías más sobre este tema.', $n, 'jubilometro' ), $n );
	return '<p class="jm-prep">' . jm_icon( 'refresh' ) . '<span>' . esc_html( $txt ) . ' <a href="' . esc_url( home_url( '/#newsletter' ) ) . '">Te avisamos por correo cuando salgan</a>.</span></p>';
}

add_shortcode( 'jm_articulos', function ( $a ) {
	$a    = shortcode_atts( array( 'cat' => '', 'n' => 24 ), $a );
	$list = jm_stories( $a['cat'], (int) $a['n'], array(), false, false );
	$note = $a['cat'] ? jm_prep_note( jm_prep_count( $a['cat'] ) ) : '';
	if ( ! $list ) { return $note; }
	$cols = 0 === count( $list ) % 4 ? ' jm-silo--4' : '';
	$o    = '<div class="jm-silo' . $cols . '">';
	foreach ( $list as $p ) { $o .= jm_story( $p, 'md', array( 'kicker' => false, 'dek' => true, 'sizes' => '(min-width: 1100px) 330px, (min-width: 640px) 45vw, 100vw' ) ); }
	return $o . '</div>' . $note;
} );

add_shortcode( 'jm_guias', function () {
	$o = '';
	foreach ( jm_data( 'temas' ) as $slug ) {
		$term = get_category_by_slug( $slug );
		if ( ! $term ) { continue; }
		$c     = jm_data( 'cats' )[ $slug ];
		$list  = jm_stories( $slug, 60, array(), false, false );
		$items = '';
		foreach ( $list as $p ) {
			$thumb = get_the_post_thumbnail( $p, 'thumbnail', array( 'loading' => 'lazy', 'alt' => '' ) );
			$inner = ( $thumb ? '<span class="jm-topic__thumb">' . $thumb . '</span>' : '' )
				. '<span class="jm-topic__t">' . esc_html( get_the_title( $p ) ) . '</span><small>' . esc_html( get_the_excerpt( $p ) ) . '</small>';
			$items .= '<li><a href="' . esc_url( get_permalink( $p ) ) . '">' . $inner . jm_icon( 'arrow' ) . '</a></li>';
		}
		$o .= '<section class="jm-topic" id="' . esc_attr( $slug ) . '" aria-labelledby="t-' . esc_attr( $slug ) . '">'
			. '<div class="jm-topic__head"><span class="jm-tile__icon">' . jm_icon( $c['icon'] ) . '</span><h2 id="t-' . esc_attr( $slug ) . '"><a href="' . esc_url( home_url( '/' . $slug . '/' ) ) . '">' . esc_html( $term->name ) . '</a></h2>'
			. '<p>' . esc_html( $c['lead'] ) . '</p><a class="jm-link-arrow" href="' . esc_url( home_url( '/' . $slug . '/' ) ) . '">Ir al tema' . jm_icon( 'arrow' ) . '</a></div>'
			. ( $items ? '<ul class="jm-topic__list">' . $items . '</ul>' : '' ) . jm_prep_note( jm_prep_count( $slug ) ) . '</section>';
	}
	return $o;
} );

/* ------------------------------------------------------------------
 * 8b. CALIDAD PARA GOOGLE Y ADSENSE
 * ------------------------------------------------------------------ */
// Las zonas de redacción y los huecos de anuncio vacíos solo existen para el editor conectado:
// a los lectores y a Google no se les envían (antes solo se ocultaban con CSS).
add_filter( 'the_content', function ( $html ) {
	if ( is_user_logged_in() ) { return $html; }
	$html = preg_replace( '#<section class="jm-zone"[^>]*>.*?</section>#s', '', $html );
	return preg_replace_callback( '#<aside class="jm-ad"[^>]*>.*?</aside>#s', function ( $m ) {
		return false !== strpos( $m[0], 'adsbygoogle' ) ? $m[0] : '';
	}, $html );
}, 25 );

/*
 * Imagen para compartir (WhatsApp, Facebook, X) con el diseño «Pino y latón». Rank Math tiene guardada la
 * imagen anterior como imagen por defecto; al pintar las etiquetas se cambia por la nueva (misma medida, 1200 × 630).
 */
function jm_og_nueva( $url ) {
	$vieja = content_url( '/uploads/2026/09/og-jubilometro.jpg' );
	return ( is_string( $url ) && $url === $vieja ) ? content_url( '/uploads/2026/09/og-jubilometro-pino.jpg' ) : $url;
}
foreach ( array( 'rank_math/opengraph/facebook/og_image', 'rank_math/opengraph/facebook/og_image_secure_url', 'rank_math/opengraph/twitter/twitter_image' ) as $jm_f ) {
	add_filter( $jm_f, 'jm_og_nueva' );
}

/*
 * Tablas en el móvil. Cada celda lleva el nombre de su columna (data-label) y las tablas de tres o más
 * columnas que no caben en la pantalla se leen como fichas, una por fila: antes la última columna quedaba
 * cortada en el borde y había que adivinar que se podía deslizar. Para saber si cabe se estima su ancho
 * mínimo con la palabra más larga de cada columna (7,3 px por carácter y 29 px de márgenes por columna,
 * ajustado midiendo en el navegador las 131 tablas de la web): más de 325 px no cabe en un móvil de 390
 * (fichas por debajo de 600 px); más de 260 px, en uno de 360 o menos (fichas por debajo de 380 px).
 * Las tablas de cifras breves se compactan primero (6,9 px por carácter y 16 px por columna).
 * La tabla ordenable de datos (data-sort) no se toca.
 */
add_filter( 'the_content', 'jm_tablas_moviles', 30 );
function jm_tablas_moviles( $html ) {
	if ( false === strpos( $html, '<table class="jm-table"' ) ) { return $html; }
	return preg_replace_callback( '#<table class="jm-table"([^>]*)>(.*?)</table>#s', function ( $m ) {
		if ( false !== strpos( $m[2], 'data-sort' ) || ! preg_match( '#<thead>(.*?)</thead>#s', $m[2], $h ) ) { return $m[0]; }
		$texto  = function ( $t ) { return trim( preg_replace( '/[\s\x{00A0}]+/u', ' ', html_entity_decode( wp_strip_all_tags( $t ), ENT_QUOTES, 'UTF-8' ) ) ); };
		$larga  = function ( $t ) { $n = 0; foreach ( explode( ' ', $t ) as $w ) { $n = max( $n, mb_strlen( $w ) ); } return $n; };
		preg_match_all( '#<th\b[^>]*>(.*?)</th>#s', $h[1], $ths );
		$labels = array_map( $texto, $ths[1] );
		if ( count( $labels ) < 3 ) { return $m[0]; }
		$maxw  = array_map( $larga, $labels );
		$maxc  = array(); // largo de la celda entera: en las tablas de cifras no se parte («1.922,96 €»)
		$corta = true; // todas las celdas (salvo la primera columna) son cifras o textos breves
		$body  = preg_replace_callback( '#<tbody>(.*?)</tbody>#s', function ( $b ) use ( $labels, $texto, $larga, &$maxw, &$maxc, &$corta ) {
			return '<tbody>' . preg_replace_callback( '#<tr\b[^>]*>.*?</tr>#s', function ( $tr ) use ( $labels, $texto, $larga, &$maxw, &$maxc, &$corta ) {
				$i = 0;
				return preg_replace_callback( '#<(td|th)\b([^>]*)>(.*?)</\1>#s', function ( $c ) use ( $labels, $texto, $larga, &$maxw, &$maxc, &$corta, &$i ) {
					$k          = $i++;
					$t          = $texto( $c[3] );
					$maxw[ $k ] = max( $maxw[ $k ] ?? 0, $larga( $t ) );
					$maxc[ $k ] = max( $maxc[ $k ] ?? 0, mb_strlen( $t ) );
					if ( $k > 0 && mb_strlen( $t ) > 12 ) { $corta = false; }
					if ( ! isset( $labels[ $k ] ) || '' === $labels[ $k ] || false !== strpos( $c[2], 'data-label' ) ) { return $c[0]; }
					return '<' . $c[1] . $c[2] . ' data-label="' . esc_attr( $labels[ $k ] ) . '">' . $c[3] . '</' . $c[1] . '>';
				}, $tr[0] );
			}, $b[1] ) . '</tbody>';
		}, $m[2] );
		// Las de cifras breves se compactan (letra y márgenes menores) y solo pasan a fichas si ni así caben
		if ( $corta ) {
			foreach ( $maxw as $k => $n ) { if ( $k > 0 ) { $maxw[ $k ] = max( $n, $maxc[ $k ] ?? 0 ); } }
		}
		$ancho = $corta ? 6.9 * array_sum( $maxw ) + 16 * count( $maxw ) : 7.3 * array_sum( $maxw ) + 29 * count( $maxw );
		// Una tabla larga de cifras se compara mejor como tabla: se queda compacta y, si no cabe, se desliza
		$muchas = $corta && substr_count( $body, '<tr' ) > 8;
		$clase = $muchas ? '' : ( $ancho > 325 ? ' jm-table--fichas' : ( $ancho > 260 ? ' jm-table--fichas-sm' : '' ) );
		$clase .= $corta ? ' jm-table--compacta' : '';
		return '<table class="jm-table' . $clase . '"' . $m[1] . '>' . $body . '</table>';
	}, $html );
}

/*
 * AdSense (anuncios automáticos). Se activa guardando el ID de editor (ca-pub-…) en la opción
 * jm_adsense_client (Ajustes > Generales, o por la API: POST /wp/v2/settings {"jm_adsense_client": "ca-pub-…"}).
 * - La etiqueta google-adsense-account va en todas las páginas (verificación del sitio).
 * - El código de anuncios no se carga en las calculadoras, las páginas legales, el buscador ni la 404:
 *   así no hay anuncios junto a los botones de calcular (clics accidentales) ni en páginas sin contenido propio.
 * - /ads.txt se genera solo con el ID (no hace falta subir el archivo al hosting).
 */
add_action( 'init', function () {
	register_setting( 'general', 'jm_adsense_client', array(
		'type'              => 'string',
		'default'           => '',
		'show_in_rest'      => true,
		'description'       => 'ID de editor de AdSense (ca-pub-…)',
		'sanitize_callback' => function ( $v ) {
			$v = trim( (string) $v );
			return preg_match( '/^ca-pub-\d{10,20}$/', $v ) ? $v : '';
		},
	) );
} );
// Al guardar o cambiar el ID se vacía la caché de LiteSpeed: si no, las páginas y /ads.txt
// (que antes daba 404) seguirían saliendo de la caché sin la etiqueta ni el código.
add_action( 'add_option_jm_adsense_client', 'jm_adsense_purge' );
add_action( 'update_option_jm_adsense_client', 'jm_adsense_purge' );
function jm_adsense_purge() { do_action( 'litespeed_purge_all' ); }
function jm_adsense_client() {
	$c = get_option( 'jm_adsense_client', '' );
	return is_string( $c ) && preg_match( '/^ca-pub-\d{10,20}$/', $c ) ? $c : '';
}
function jm_ads_allowed() {
	if ( is_404() || is_search() ) { return false; }
	if ( is_page() ) {
		$id  = get_queried_object_id();
		$anc = get_post_ancestors( $id );
		$top = get_post_field( 'post_name', $anc ? end( $anc ) : $id );
		if ( 'calculadoras' === $top ) { return false; }
		if ( in_array( get_post_field( 'post_name', $id ), array( 'aviso-legal', 'politica-privacidad', 'politica-cookies', 'contacto', 'descargo-responsabilidad', 'accesibilidad' ), true ) ) { return false; }
	}
	return true;
}
add_action( 'wp_head', function () {
	$c = jm_adsense_client();
	if ( ! $c ) { return; }
	printf( '<meta name="google-adsense-account" content="%s">' . "\n", esc_attr( $c ) );
	if ( jm_ads_allowed() ) {
		printf( '<script async src="%s" crossorigin="anonymous" data-no-optimize="1" data-no-defer="1"></script>' . "\n", esc_url( 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' . $c ) );
	}
}, 2 );
add_action( 'init', function () {
	$uri = isset( $_SERVER['REQUEST_URI'] ) ? strtok( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), '?' ) : '';
	if ( '/ads.txt' !== $uri ) { return; }
	$c = jm_adsense_client();
	if ( ! $c ) { return; }
	nocache_headers();
	header( 'Content-Type: text/plain; charset=utf-8' );
	echo 'google.com, ' . esc_html( substr( $c, 3 ) ) . ', DIRECT, f08c47fec0942fa0' . "\n"; // phpcs:ignore
	exit;
}, 1 );

// Un tema (página pilar) se indexa cuando tiene al menos 3 guías publicadas; mientras, noindex y fuera del sitemap
function jm_thin_page( $id ) {
	$slug = get_post_field( 'post_name', $id );
	if ( wp_get_post_parent_id( $id ) ) { return false; }
	if ( ! in_array( $slug, jm_data( 'temas' ), true ) ) { return false; }
	$term = get_category_by_slug( $slug );
	return ! $term || (int) $term->count < 3;
}
add_filter( 'rank_math/frontend/robots', function ( $robots ) {
	if ( is_page() && jm_thin_page( get_queried_object_id() ) ) {
		$robots['index']  = 'noindex';
		$robots['follow'] = 'follow';
	}
	return $robots;
} );
add_filter( 'rank_math/sitemap/entry', function ( $url, $type, $object ) {
	if ( 'post' === $type && isset( $object->ID, $object->post_type ) && 'page' === $object->post_type && jm_thin_page( $object->ID ) ) { return false; }
	return $url;
}, 10, 3 );

// La descripción de /guias/ dice siempre el número real de guías publicadas
add_filter( 'rank_math/frontend/description', function ( $desc ) {
	if ( is_page( 'guias' ) ) {
		$n    = (int) wp_count_posts( 'post' )->publish;
		$desc = preg_replace( '/\b\d+ guías\b/u', $n . ' guías', (string) $desc );
	}
	return $desc;
} );

// Textos de Rank Math para WhatsApp y Slack, en castellano
add_filter( 'rank_math/opengraph/slack_enhanced_data', function ( $data ) {
	$out = array();
	foreach ( (array) $data as $k => $v ) {
		$k = strtr( $k, array( 'Written by' => 'Escrito por', 'Time to read' => 'Tiempo de lectura', 'Price' => 'Precio' ) );
		$out[ $k ] = is_string( $v ) ? preg_replace( array( '/\bminutes?\b/', '/\bLess than a minute\b/' ), array( 'min', 'Menos de un minuto' ), $v ) : $v;
	}
	return $out;
} );

// Datos estructurados: una sola persona (Pau Lobato) como autor y revisor, y la organización con web y logo
add_filter( 'rank_math/json_ld', function ( $data ) {
	$pid    = home_url( '/sobre-nosotros/#pau-lobato' );
	$person = array( '@type' => 'Person', '@id' => $pid, 'name' => 'Pau Lobato', 'jobTitle' => 'Fundador y editor de Jubilómetro', 'url' => home_url( '/sobre-nosotros/' ), 'worksFor' => array( '@id' => home_url( '/#organization' ) ) );
	$org    = array(
		'@type' => 'Organization',
		'@id'   => home_url( '/#organization' ),
		'name'  => 'Jubilómetro',
		'url'   => home_url( '/' ),
		'logo'  => array( '@type' => 'ImageObject', '@id' => home_url( '/#logo' ), 'url' => JM_THEME_URI . '/assets/img/logo-jubilometro.png', 'width' => 512, 'height' => 512, 'caption' => 'Jubilómetro' ),
		'image' => array( '@id' => home_url( '/#logo' ) ),
	);
	$has_person = false;
	foreach ( $data as $k => $node ) {
		if ( ! is_array( $node ) || empty( $node['@type'] ) ) { continue; }
		$type = (array) $node['@type'];
		if ( in_array( 'Person', $type, true ) ) { $data[ $k ] = $person; $has_person = true; }
		if ( in_array( 'Organization', $type, true ) ) { $data[ $k ] = array_merge( $node, $org ); }
		if ( isset( $node['author'] ) ) { $data[ $k ]['author'] = array( '@id' => $pid, 'name' => 'Pau Lobato' ); }
		if ( isset( $node['reviewedBy'] ) ) { $data[ $k ]['reviewedBy'] = array( '@id' => $pid ); }
		if ( isset( $node['isAccessibleForFree'] ) ) { $data[ $k ]['isAccessibleForFree'] = 'True'; }
	}
	// Páginas (temas, calculadoras, sobre nosotros…): Rank Math solo pone la miga de pan; se completa el grafo
	if ( is_page() && ! is_front_page() && ! isset( $data['WebPage'] ) ) {
		$id    = get_queried_object_id();
		$about = 'sobre-nosotros' === get_post_field( 'post_name', $id );
		$data['publisher'] = $org;
		$data['WebSite']   = array( '@type' => 'WebSite', '@id' => home_url( '/#website' ), 'url' => home_url( '/' ), 'name' => 'Jubilómetro', 'publisher' => array( '@id' => home_url( '/#organization' ) ), 'inLanguage' => 'es' );
		$data['WebPage']   = array(
			'@type'        => $about ? 'AboutPage' : 'WebPage',
			'@id'          => get_permalink( $id ) . '#webpage',
			'url'          => get_permalink( $id ),
			'name'         => wp_strip_all_tags( get_the_title( $id ) ),
			'isPartOf'     => array( '@id' => home_url( '/#website' ) ),
			'inLanguage'   => 'es',
			'dateModified' => get_the_modified_date( 'c', $id ),
			'breadcrumb'   => array( '@id' => get_permalink( $id ) . '#breadcrumb' ),
		);
		$legal = array( 'aviso-legal', 'politica-privacidad', 'politica-cookies', 'descargo-responsabilidad', 'accesibilidad', 'contacto' );
		if ( $about ) { $data['WebPage']['mainEntity'] = array( '@id' => $pid ); }
		if ( ! jm_thin_page( $id ) && ! in_array( get_post_field( 'post_name', $id ), $legal, true ) ) { $data['WebPage']['reviewedBy'] = array( '@id' => $pid ); }
		$data['Person'] = $person;
		$has_person     = true;
	}
	// Si algo cita a Pau pero su ficha no está en la página, se añade
	if ( ! $has_person && false !== strpos( (string) wp_json_encode( $data, JSON_UNESCAPED_SLASHES ), $pid ) ) { $data['Person'] = $person; }
	// Portada: imagen de marca en lugar de la primera foto que encuentre
	if ( is_front_page() ) {
		$img = home_url( '/#primaryimage' );
		foreach ( $data as $k => $node ) {
			if ( ! is_array( $node ) || empty( $node['@type'] ) ) { continue; }
			if ( 'ImageObject' === $node['@type'] ) {
				$data[ $k ] = array( '@type' => 'ImageObject', '@id' => $img, 'url' => JM_THEME_URI . '/assets/img/og-jubilometro.jpg', 'width' => 1200, 'height' => 630, 'caption' => 'Jubilómetro: jubilación y pensiones, con las cuentas claras', 'inLanguage' => 'es' );
			}
			if ( isset( $node['primaryImageOfPage'] ) ) { $data[ $k ]['primaryImageOfPage'] = array( '@id' => $img ); }
			if ( isset( $node['image'] ) && is_array( $node['image'] ) && isset( $node['image']['@id'] ) && false !== strpos( $node['image']['@id'], 'unsplash' ) ) { $data[ $k ]['image'] = array( '@id' => $img ); }
		}
	}
	return $data;
}, 120 );

<?php
/**
 * Pie del diseño de Jubilómetro (pie, menú móvil y buscador).
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
?>
</main>
<?php echo str_replace( '<!--jm-redes-->', jm_redes_html(), jm_part( 'footer' ) ); // phpcs:ignore ?>
<?php wp_footer(); ?>
</body>
</html>

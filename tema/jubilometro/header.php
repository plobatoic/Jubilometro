<?php
/**
 * Cabecera del diseño de Jubilómetro.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?> data-jm-id="<?php echo (int) ( is_singular() ? get_queried_object_id() : 0 ); ?>">
<?php wp_body_open(); ?>
<div data-jm-sentinel style="position:absolute;top:0;left:0;width:1px;height:1px"></div>
<a class="jm-skip" href="#contenido">Saltar al contenido</a>
<?php
echo jm_part( 'sprite' ); // phpcs:ignore
echo jm_header_html(); // phpcs:ignore
?>
<main id="contenido">

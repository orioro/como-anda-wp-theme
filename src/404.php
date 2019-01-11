<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package como-anda-wp-theme
 */

global $wp;

$ca__redirects = carbon_get_theme_option('ca__redirects');

foreach ($ca__redirects as $redirect) {
	if ($redirect['source'] === $wp->request ||
			$redirect['source'] === home_url($wp->request)) {
		wp_redirect($redirect['destination'], 301);
	}
}

get_header(); ?>

<?php
get_footer();

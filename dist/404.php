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
		$destination = $redirect['destination'] || home_url();
		wp_redirect($destination, 301);
	}
}

get_header(); ?>

<section
	class="ca-page-header ca-bg-yellow"
	data-bg-color-section="yellow">
	<div class="container max-width-container side-padding-container ca-padding-top-6 ca-section-header">
		<div class="row ca-padding-bottom-6">
      <div class="col-md-9 offset-md-3">
				<h1
          data-component="ca-animated-text"
          class="ca-heading-1 ca-section-header__heading ca-padding-bottom-3 ca-animated-text not-visible">
					Página não encontrada ;(
				</h1>
      </div>
		</div>
	</div>
</section>


<?php
get_footer();

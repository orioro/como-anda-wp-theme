<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package como-anda-wp-theme
 */

$queried_object = get_queried_object();

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	
	<?php wp_head(); ?>

	<?php echo carbon_get_theme_option('ca__google_analytics_script'); ?>
	<?php require('partials/social-meta-tags.php'); ?>
</head>

<body <?php body_class(); ?>>

<?php if ($queried_object->post_type === 'page' && get_page_template_slug($queried_object->ID) === 'page-templates/infografico-roda.php') : ?>
	<!-- Infografico has a different header -->
<?php else : ?>
<header id="main-header">
	<div class="container max-width-container side-padding-container">
		<?php
		$ca_home__illustration_uris = array_map(function ($item) {
			return get_template_directory_uri() . '/resources/ilustracoes/' . $item;
		}, array(
			'ilustracao-1.png',
			'ilustracao-2.png',
			'ilustracao-3.png',
			'ilustracao-4.png',
			'ilustracao-5.png',
			'ilustracao-6.png',
			'ilustracao-7.png',
			'ilustracao-8.png',
			'ilustracao-9.png',
			'ilustracao-10.png',
		));
		?>
		<a
			id="logo-anchor"
			href="<?php echo get_home_url(); ?>">
			<img
				id="logo-main"
				src="<?php echo get_template_directory_uri(); ?>/resources/logo.svg">
			<img
				id="logo-illustration"
				src="<?php echo $ca_home__illustration_uris[array_rand($ca_home__illustration_uris)]; ?>">
		</a>

    <button id="mobile-menu-trigger">
      <span></span>
      <span></span>
      <span></span>
    </button>

		<nav id="main-menu-container">
			<?php
				wp_nav_menu(array(
					'theme_location' => 'main-menu',
					'menu_id'        => 'main-menu',
				));
			?>
		</nav>
	</div>
</header>
<div id="mobile-menu-overlay"></div>
<?php endif; ?>

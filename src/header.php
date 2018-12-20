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

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<header id="main-header">
	<div class="container max-width-container side-padding-container">
		<a
			id="logo-anchor"
			href="<?php echo get_home_url(); ?>">
			<img
				id="logo-main"
				src="<?php echo get_template_directory_uri(); ?>/resources/logo.svg">
			<img
				id="logo-illustration"
				src="<?php echo get_template_directory_uri(); ?>/resources/ilustracoes/ilustracao-5.png">
		</a>
		<nav id="main-nav">
			<?php
				wp_nav_menu(array(
					'theme_location' => 'main-menu',
					'menu_id'        => 'main-menu',
				));
			?>
		</nav>
	</div>
</header>

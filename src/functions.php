<?php
/**
 * como-anda-wp-theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package como-anda-wp-theme
 */

/**
 * Verify function dependencies and set stub functions
 * in case they are not present.
 */
function ca__function_dependencies() {
	
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function ca__setup() {

	/**
	 * Development functions START
	 * 
	 * ATTENTION!
	 * Do not modify without updating gulp/distribute task definition
	 */
	require_once('inc/development/load.php');
	/**
	 * Development functions END
	 */

	/**
	 * Scripts and styles
	 */
	require_once('inc/enqueue-scripts-and-styles.php');

	/**
	 * Image sizes
	 */
	require_once('inc/image-sizes.php');

	/**
	 * Ensure functions depended upon exist
	 */
	ca__function_dependencies();

	/**
	 * Setup carbon fields
	 */
	// see https://github.com/htmlburger/carbon-fields/issues/457
	define(
		'Carbon_Fields\URL',
		get_template_directory_uri() . '/vendor/htmlburger/carbon-fields'
	);

  require_once('vendor/autoload.php');
  \Carbon_Fields\Carbon_Fields::boot();


	add_action('carbon_fields_register_fields', 'ca__register_carbon_fields');
	function ca__register_carbon_fields() {
		require_once('inc/carbon-fields/theme-options.php');
		require_once('inc/carbon-fields/page-template-home.php');
		require_once('inc/carbon-fields/page-template-blocks.php');
	}

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support('post-thumbnails');

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(array(
		'main-menu' => 'Main menu',
	));
}
add_action('after_setup_theme', 'ca__setup');

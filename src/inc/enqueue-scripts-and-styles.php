<?php

function ca__enqueue_scripts_and_styles() {
	/**
	 * Register styles
	 */
	wp_register_style(
		'ca--main-style',
		get_stylesheet_uri(),
		array(),
		'1.0.0'
	);

	wp_register_style(
		'ca--font-face-news-cycle',
		'https://fonts.googleapis.com/css?family=News+Cycle:400,700',
		array(),
		'1.0.0'
	);

	/**
	 * Register scripts
	 */
	wp_deregister_script('jquery');
	wp_register_script(
		'jquery',
		'https://code.jquery.com/jquery-3.3.1.min.js',
		array(),
		'3.3.1'
	);

	wp_register_script(
		'ca--header',
		get_template_directory_uri() . '/js/header/index.bundle.js',
		array('jquery'),
		'1.0.0'
	);

	/**
	 * Page specific scripts
	 */
	wp_register_script(
		'ca--page-template-home',
		get_template_directory_uri() . '/js/page-template-home/index.bundle.js',
		array('jquery'),
		'1.0.0'
	);
	wp_register_script(
		'ca--page-template-marco-regulatorio',
		get_template_directory_uri() . '/js/page-template-marco-regulatorio/index.bundle.js',
		array('jquery'),
		'1.0.0'
	);

	/**
	 * Enqueue styles and scripts
	 */
	wp_enqueue_style('ca--main-style');
	wp_enqueue_style('ca--font-face-news-cycle');

	wp_enqueue_script('ca--header');

	if (is_page_template('page-templates/home.php')) {
		wp_enqueue_script('ca--page-template-home');
	}

	if (is_page_template('page-templates/marco-regulatorio.php')) {
		wp_enqueue_script('ca--page-template-marco-regulatorio');
	}
}
add_action('wp_enqueue_scripts', 'ca__enqueue_scripts_and_styles');

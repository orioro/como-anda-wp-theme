<?php

function ca__enqueue_scripts_and_styles() {
	/**
	 * Register styles
	 */
	wp_register_style(
		'ca--main-style',
		get_stylesheet_uri(),
		array(),
		'1.0.3'
	);

	wp_register_style(
		'ca--font-face-news-cycle',
		'https://fonts.googleapis.com/css?family=News+Cycle:400,700',
		array(),
		'1.0.1'
	);

	wp_register_style(
		'ca--page-template-infografico-roda',
		get_template_directory_uri() . '/js/page-template-infografico-roda/styles.css',
		array(),
		'1.0.1'
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
		'1.0.1'
	);

	wp_register_script(
		'ca--global-components',
		get_template_directory_uri() . '/js/global-components/index.bundle.js',
		array('jquery'),
		'1.0.1'
	);

	/**
	 * Page specific scripts
	 */
	wp_register_script(
		'ca--page-template-home',
		get_template_directory_uri() . '/js/page-template-home/index.bundle.js',
		array('jquery'),
		'1.0.1'
	);
	wp_register_script(
		'ca--page-template-csv-filter',
		get_template_directory_uri() . '/js/page-template-csv-filter/index.bundle.js',
		array('jquery'),
		'1.0.3'
	);
	wp_register_script(
		'ca--page-template-infografico-roda',
		get_template_directory_uri() . '/js/page-template-infografico-roda/index.bundle.js',
		array(),
		'1.0.1'
	);

	/**
	 * Enqueue styles and scripts
	 */
	wp_enqueue_style('ca--main-style');
	wp_enqueue_style('ca--font-face-news-cycle');

	wp_enqueue_script('ca--header');
	wp_enqueue_script('ca--global-components');

	if (is_page_template('page-templates/home.php')) {
		wp_enqueue_script('ca--page-template-home');
	}

	if (is_page_template('page-templates/csv-filter.php')) {
		wp_enqueue_script('ca--page-template-csv-filter');
	}

	if (is_page_template('page-templates/infografico-roda.php')) {
		wp_enqueue_script('ca--page-template-infografico-roda');
		wp_enqueue_style('ca--page-template-infografico-roda');
	}
}
add_action('wp_enqueue_scripts', 'ca__enqueue_scripts_and_styles');

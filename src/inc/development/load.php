<?php

// gulp-livereload
if (!is_admin()) {
	wp_enqueue_script('development-livereload', 'http://localhost:9000/livereload.js?snipver=1');
}

require_once('migrate-news-items.php');

<?php

function ca_import_mural_items_menu() {
  add_menu_page( 
    'Import mural',
    'Import mural',
    'manage_options',
    'ca_import_mural_items',
    'ca_import_mural_items',
    'dashicons-admin-tools',
    0
  ); 
}
add_action('admin_menu', 'ca_import_mural_items_menu');

function ca_import_mural_items() {
	$comoanda_user = get_user_by('slug', 'comoanda');

	$news = json_decode(file_get_contents('news-from-xml.json', true), true);
	echo '<table>';
	foreach ($news as $index => $item) {
		$featured_image_attachment_id = attachment_url_to_postid($item['imgUrl']);
		$featured_image_attachment_id = $featured_image_attachment_id === 0 ? false : $featured_image_attachment_id;

		echo '<tr>';
		echo '<td>' . ($index + 1) . '</td>';
		echo '<td>' . $item['title'] . '</td>';
		echo '<td>' . $featured_image_attachment_id . '</td>';

		if ($featured_image_attachment_id && $item['link'] && $item['title'] && $item['excerpt']) {
			echo '<td>OK</td>';
		} else {
			echo '<td style="background-color: red; color: white;">!!!</td>';
		}

		echo '</tr>';

		// Imports:

		// $new_post_id = wp_insert_post(array(
		// 	'post_title' => $item['title'],
		// 	'post_name' => $item['post_name'],
		// 	'post_excerpt' => $item['excerpt'],
		// 	'post_content' => $item['excerpt'],
		// 	'post_status' => $item['status'],
		// 	'post_date' => $item['post_date'],
		// 	'post_author' => $comoanda_user->ID,
		// ));

		// if ($new_post_id !== 0) {
		// 	set_post_thumbnail($new_post_id, $featured_image_attachment_id);
		// 	carbon_set_post_meta($new_post_id, 'ca_post__external_url', $item['link']);
		// }
	}

	echo '</table>';
}

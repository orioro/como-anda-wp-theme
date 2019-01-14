<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

function ca_aux__make_link_buttons_field($field_name, $label) {
	return Field::make('complex', $field_name, $label)
		->set_layout('tabbed-vertical')
		->add_fields(array(
			Field::make('text', 'text', 'Texto'),
			Field::make('text', 'url', 'URL'),
			Field::make('file', 'file', 'Arquivo'),
			Field::make('checkbox', 'target_blank', 'Abrir em nova aba'),
			Field::make('checkbox', 'is_typeform', 'É link do typeform'),
		))
		->set_header_template('<%- $_index + 1 %> <% if (text) { %>- <%- text %><% } %>');
}

/**
 * Row management
 */
function ca_rows_is_last_column($row_length, $item_index) {
	return ($item_index + 1) % $row_length === 0;
}

function ca_rows_get_item_class($row_length, $item_index) {
	$classes = '';

	if (ca_rows_is_last_column($row_length, $item_index)) {
		$classes .= ' ca-last-column';
	}

	return $classes;
}
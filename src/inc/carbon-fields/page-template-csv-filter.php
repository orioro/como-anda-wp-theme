<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

require_once(dirname(__DIR__) . '/auxiliary.php');

function ca_csv_filter__prettify_complex_cf($field, $title_attribute) {
	$field->set_layout('tabbed-vertical');
	$field->set_header_template('<%- $_index + 1 %> <% if (' . $title_attribute . ') { %>- <%- ' . $title_attribute . ' %><% } %>');

	return $field;
}

Container::make('post_meta', 'Configurações do Cabeçalho')
	->where('post_template', '=', 'page-templates/csv-filter.php')
	->add_fields(array(
		ca_aux__make_link_buttons_field('ca_csv_filter__heading_link_buttons', 'Links')
	));

Container::make('post_meta', 'Configurações do filtro')
	->where('post_template', '=', 'page-templates/csv-filter.php')
	->add_fields(array(
		Field::make('file', 'ca_csv_filter__csv_file', 'Arquivo CSV'),
		Field::make('text', 'ca_csv_filter__pagination_page_length', 'Tamanho da página'),
		Field::make('complex', 'ca_csv_filter__parameters', 'Parâmetros')
			->set_layout('tabbed-vertical')
			->add_fields(array(
				Field::make('text', 'label', 'Nome do parâmetro'),
				Field::make('text', 'id', 'Nome da coluna'),
				Field::make('complex', 'option_lists', 'Listas de opções')
					->set_layout('tabbed-vertical')
					->add_fields(array(
						Field::make('text', 'label', 'Cabeçalho'),
						Field::make('complex', 'options', 'Opções')
							->set_layout('tabbed-vertical')
							->add_fields(array(
								Field::make('text', 'label', 'Valor')
							))
							->set_header_template('<%- $_index + 1 %> <% if (label) { %>- <%- label %><% } %>')
					))
					->set_header_template('<%- $_index + 1 %> <% if (label) { %>- <%- label %><% } %>')
			))
			->set_header_template('<%- $_index + 1 %> <% if (label) { %>- <%- label %><% } %>')
	));

Container::make('post_meta', 'Configurações do output')
	->where('post_template', '=', 'page-templates/csv-filter.php')
	->add_tab('Textos', array(
		Field::make('text', 'ca_csv_filter__output_heading_column', 'Nome da coluna de título'),
		Field::make('complex', 'ca_csv_filter__output_sub_heading_columns', 'Colunas de subtítulo')
			->set_layout('tabbed-vertical')
			->add_fields(array(
				Field::make('text', 'column_name', 'Nome da coluna')
			))
			->set_header_template('<%- $_index + 1 %> <% if (column_name) { %>- <%- column_name %><% } %>'),
		Field::make('text', 'ca_csv_filter__output_description_column', 'Nome da coluna de descrição'),
	))
	->add_tab('Metadados', array(
		Field::make('complex', 'ca_csv_filter__output_metadata_columns', 'Colunas de metadados')
			->set_layout('tabbed-vertical')
			->add_fields(array(
				Field::make('text', 'column_name', 'Nome da coluna')
			))
			->set_header_template('<%- $_index + 1 %> <% if (column_name) { %>- <%- column_name %><% } %>'),
		Field::make('complex', 'ca_csv_filter__output_bold_metadata_columns', 'Colunas de metadados (bold)')
			->set_layout('tabbed-vertical')
			->add_fields(array(
				Field::make('text', 'column_name', 'Nome da coluna')
			))
			->set_header_template('<%- $_index + 1 %> <% if (column_name) { %>- <%- column_name %><% } %>'),
		Field::make('text', 'ca_csv_filter__output_tags_column', 'Nome da coluna de tags'),
	))
	->add_tab('Links', array(
		Field::make('complex', 'ca_csv_filter__output_link_buttons', 'Links')
			->set_layout('tabbed-vertical')
			->add_fields(array(
				Field::make('text', 'button_text', 'Texto de chamada do link'),
				Field::make('text', 'column_name', 'Nome da coluna de link')
			))
			->set_header_template('<%- $_index + 1 %> <% if (column_name) { %>- <%- column_name %><% } %>'),
	));

/**
 * Retrieves configuration to be exposed to the front-end React app
 */
function ca_csv_filter__get_config($post_id) {
	$config_carbon_fields = array(
		'parameters' => 'ca_csv_filter__parameters',
		'csv_file' => 'ca_csv_filter__csv_file',
		'output_heading_column' => 'ca_csv_filter__output_heading_column',
		'output_sub_heading_columns' => 'ca_csv_filter__output_sub_heading_columns',
		'output_description_column' => 'ca_csv_filter__output_description_column',
		'output_metadata_columns' => 'ca_csv_filter__output_metadata_columns',
		'output_bold_metadata_columns' => 'ca_csv_filter__output_bold_metadata_columns',
		'output_bold_metadata_columns' => 'ca_csv_filter__output_bold_metadata_columns',
		'output_tags_column' => 'ca_csv_filter__output_tags_column',
		'output_link_buttons' => 'ca_csv_filter__output_link_buttons',
	);

	$config = array();

	foreach ($config_carbon_fields as $config_name => $field_name) {
		$config[$config_name] = carbon_get_post_meta($post_id, $field_name);
	}

	// CSV File
	$config['csv_file'] = wp_get_attachment_url($config['csv_file']);

	// Page length
	$config['pagination_page_length'] = carbon_get_post_meta(
		$post_id,
		'ca_csv_filter__pagination_page_length'
	);

	// Color schmes
	$config['background_color_scheme'] = carbon_get_post_meta(
		$post_id,
		'ca_page__color_scheme'
	);
	$config['hover_color_scheme'] = ca_page__get_hover_color_scheme(
		$config['background_color_scheme']
	);

	// Link buttons
	$config['link_buttons'] = array_map(function ($button) {
		if ($button['file']) {
			$button['url'] = wp_get_attachment_url($button['file']);
		}

		return $button;

	}, carbon_get_post_meta(
		$post_id,
		'ca_csv_filter__heading_link_buttons'
	));
	
	return $config;
}

/**
 * https://core.trac.wordpress.org/ticket/45615
 * https://gist.github.com/rmpel/e1e2452ca06ab621fe061e0fde7ae150
 * Restore CSV upload functionality for WordPress 4.9.9 and up
 */
add_filter('wp_check_filetype_and_ext', function($values, $file, $filename, $mimes) {
	if ( extension_loaded( 'fileinfo' ) ) {
		// with the php-extension, a CSV file is issues type text/plain so we fix that back to 
		// text/csv by trusting the file extension.
		$finfo     = finfo_open( FILEINFO_MIME_TYPE );
		$real_mime = finfo_file( $finfo, $file );
		finfo_close( $finfo );
		if ( $real_mime === 'text/plain' && preg_match( '/\.(csv)$/i', $filename ) ) {
			$values['ext']  = 'csv';
			$values['type'] = 'text/csv';
		}
	} else {
		// without the php-extension, we probably don't have the issue at all, but just to be sure...
		if ( preg_match( '/\.(csv)$/i', $filename ) ) {
			$values['ext']  = 'csv';
			$values['type'] = 'text/csv';
		}
	}
	return $values;
}, PHP_INT_MAX, 4);

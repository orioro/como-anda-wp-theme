<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make('post_meta', 'Configurações do filtro')
	->where('post_template', '=', 'page-templates/csv-filter.php')
	->add_fields(array(
		Field::make('file', 'ca_csv_filter__csv_file', 'Arquivo CSV'),
		Field::make('complex', 'ca_csv_filter__parameters', 'Parâmetros')
			->set_layout('tabbed-vertical')
			->add_fields(array(
				Field::make('text', 'label', 'Nome da coluna'),
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

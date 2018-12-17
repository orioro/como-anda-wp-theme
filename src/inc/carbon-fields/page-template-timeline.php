<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make('post_meta', 'Configurações da linha do tempo')
	->where('post_template', '=', 'page-templates/timeline.php')
	->add_fields(array(
		Field::make('complex', 'ca_timeline__events', 'Eventos')
			->set_layout('tabbed-vertical')
			->add_fields(array(
				Field::make('text', 'year', 'Ano'),
				Field::make('text', 'title', 'Título'),
				Field::make('rich_text', 'content', 'Conteúdo'),
				Field::make('image', 'image', 'Imagem'),
			))
			->set_header_template('<%- $_index + 1 %> <% if (title) { %>- <%- title %><% } %>')
	));

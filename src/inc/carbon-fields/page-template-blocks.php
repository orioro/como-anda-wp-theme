<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make('post_meta', 'Blocos da página')
	->where('post_template', '=', 'page-templates/blocks.php')
	->add_fields(array(
		Field::make('complex', 'ca_blocks__blocks', 'Blocos')
			->set_layout('tabbed-vertical')
			->add_fields(array(
				Field::make('text', 'title', 'Título'),
				Field::make('rich_text', 'content', 'Conteúdo'),
				Field::make('image', 'image', 'Imagem'),
				Field::make('complex', 'link_buttons', 'Links (botões)')
					->add_fields(array(
						Field::make('text', 'text', 'Texto'),
						Field::make('text', 'url', 'URL'),
						Field::make('file', 'file', 'Arquivo'),
						Field::make('checkbox', 'target_blank', 'Abrir em nova aba'),
					)),
				Field::make('complex', 'link_images', 'Links (imagens)')
					->add_fields(array(
						Field::make('image', 'image', 'Imagem'),
						Field::make('text', 'text', 'Texto'),
						Field::make('text', 'url', 'URL'),
						Field::make('file', 'file', 'Arquivo'),
						Field::make('checkbox', 'target_blank', 'Abrir em nova aba'),
					))
			))
			->set_header_template('<%- $_index + 1 %> <% if (title) { %>- <%- title %><% } %>')
	));

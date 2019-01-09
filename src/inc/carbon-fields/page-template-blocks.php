<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

require_once(dirname(__DIR__) . '/auxiliary.php');

Container::make('post_meta', 'Blocos da página')
	->where('post_template', '=', 'page-templates/blocks.php')
	->add_fields(array(
		Field::make('complex', 'ca_blocks__blocks', 'Blocos da página')
			->set_layout('tabbed-vertical')
			->add_fields(array(
				Field::make('text', 'title', 'Título'),
				Field::make('text', 'id', 'ID do bloco'),
				Field::make('html', 'id_explanation')
					->set_html('<p>O ID do bloco será utilizado para o link direto para o bloco, dentro da página (e.g. https://comoanda.org.br/pagina-exemplo/#id-do-bloco). Ele deve ser composto apenas por <strong>letras minúsculas, números e traços (-), sem acentuação, espaçamento ou outros caracteres especiais.</strong><p>'),
				Field::make('rich_text', 'content', 'Conteúdo'),
				Field::make('image', 'image', 'Imagem'),
				ca_aux__make_link_buttons_field('link_buttons', 'Links (botões)'),
				Field::make('complex', 'link_images', 'Links (imagens)')
					->set_layout('tabbed-vertical')
					->add_fields(array(
						Field::make('image', 'image', 'Imagem'),
						Field::make('text', 'text', 'Texto'),
						Field::make('text', 'url', 'URL'),
						Field::make('file', 'file', 'Arquivo'),
						Field::make('checkbox', 'target_blank', 'Abrir em nova aba'),
					))
					->set_header_template('<%- $_index + 1 %> <% if (text) { %>- <%- text %><% } %>'),
			))
			->set_header_template('<%- $_index + 1 %> <% if (title) { %>- <%- title %><% } %>'),
	));

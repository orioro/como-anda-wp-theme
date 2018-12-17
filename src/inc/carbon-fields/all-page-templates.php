<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make('post_meta', 'Configurações da página')
	->add_fields(array(
		Field::make('select', 'ca_page__color_scheme', 'Esquema de cor da página')
			->set_options(array(
				'blue' => 'Azul',
				'blue-light' => 'Azul claro',
				'yellow' => 'Amarelo',
				'orange' => 'Laranja',
				'orange-light' => 'Laranja claro',
				'red' => 'Vermelho',
				'red-light' => 'Vermelho claro',
				'green' => 'Verde',
				'green-light' => 'Verde claro',

				'gray-light' => 'Cinza claro',
				'gray' => 'Cinza',
				'gray-dark' => 'Cinza escuro'
			)),
		Field::make('text', 'ca_page__call_to_action', 'Chamada'),
		Field::make('text', 'ca_page__related_pages_title', 'Título da seção de páginas relacionadas'),
	));

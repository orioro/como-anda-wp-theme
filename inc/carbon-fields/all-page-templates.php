<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make('post_meta', 'Configurações da página')
	->where('post_type', '=', 'page')
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
		Field::make('text', 'ca_page__header_title', 'Título da abertura da página')
	));

function ca_page__get_hover_color_scheme($page_color_scheme) {
  $ca_page__hover_color_scheme = array(
    'blue' => 'blue-light',
    'blue-light' => 'blue',
    'yellow' => 'gray-dark',
    'orange' => 'orange-light',
    'orange-light' => 'orange',
    'red' => 'red-light',
    'red-light' => 'red',
    'green' => 'green-light',
    'green-light' => 'green',

    'gray-light' => 'gray',
    'gray' => 'gray-dark',
    'gray-dark' => 'gray-light'
  );

  return $ca_page__hover_color_scheme[$page_color_scheme];
}

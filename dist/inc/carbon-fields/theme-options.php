<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make('theme_options', 'Informações de contato e redes sociais')
  ->add_fields(array(
    // Contact info
    Field::make('text','ca__email', 'E-mail'),
    Field::make('text','ca__instagram_url', 'Instagram'),
    Field::make('text','ca__facebook_url', 'Facebook'),
    Field::make('text','ca__medium_url', 'Medium'),

    // Social
    Field::make('image', 'ca__social_share_image', 'Imagem de compartilhamento')
      ->set_value_type('url'),
    Field::make('textarea', 'ca__social_description', 'Descrição de compartilhamento'),
    Field::make('textarea', 'ca__social_keywords', 'Palavras chave'),
  ));

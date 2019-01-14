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

    // Google Analytics
    Field::make('textarea', 'ca__google_analytics_script', 'Google Analytics Tracking Code'),
  ));

Container::make('theme_options', 'Redirecionamentos')
  ->add_fields(array(
    Field::make('complex', 'ca__redirects', 'Redirecionamentos')
      ->add_fields(array(
        Field::make('text', 'source', 'Endereço original'),
        Field::make('text', 'destination', 'Endereço destino'),
      ))
  ));

/**
 * Allow all kinds of users to access theme option containers
 */
add_filter('carbon_fields_theme_options_container_admin_only_access', '__return_false');

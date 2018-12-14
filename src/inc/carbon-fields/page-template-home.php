<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make('post_meta', 'Eixos de atuação')
  ->where('post_template', '=', 'page-templates/home.php')
  ->add_fields(array(
    Field::make('complex', 'ca_home__eixos', 'Eixos do Como Anda')
      ->set_layout('tabbed-horizontal')
      ->set_min(3)
      ->set_max(3)
      ->add_fields(array(
        Field::make('text', 'title', 'Título'),
        Field::make('rich_text', 'description', 'Descrição')
      ))
      ->set_header_template('<%- $_index + 1 %> <% if (title) { %>- <%- title %><% } %>'),
  ));

// Container::make('post_meta', 'Projetos')
//   ->where('post_template', '=', 'page-templates/home.php')

Container::make('post_meta', 'Contato')
  ->where('post_template', '=', 'page-templates/home.php')
  ->add_fields(array(
    Field::make('text', 'ca_home__contact_form_shortcode', 'Shortcode do formulário de contato')
  ));

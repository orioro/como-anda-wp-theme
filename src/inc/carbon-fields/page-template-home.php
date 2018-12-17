<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make('post_meta', 'Abertura')
  ->where('post_template', '=', 'page-templates/home.php')
  ->add_fields(array(
    Field::make('text', 'ca_home__abertura_title', 'Título'),
    Field::make('rich_text', 'ca_home__abertura_description', 'Descrição'),
  ));

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
        ->set_default_value(array(
          array(
            'title' => '',
            'description' => ''                    
          )
        )),
      ))
      ->set_header_template('<%- $_index + 1 %> <% if (title) { %>- <%- title %><% } %>'),
  ));

Container::make('post_meta', 'Lista de Projetos')
  ->where('post_template', '=', 'page-templates/home.php')
  ->add_fields(array(
    Field::make('text', 'ca_home__project_list_title', 'Título'),
    Field::make('complex', 'ca_home__project_list_projects', 'Projetos')
      ->set_layout('tabbed-horizontal')
      ->add_fields(array(
        Field::make('text', 'title', 'Título'),
        Field::make('textarea', 'description', 'Descrição'),
        Field::make('text', 'button', 'Botão'),
        Field::make('text', 'url', 'Botão link'),
        Field::make('image', 'image', 'Imagem'),
      ))
    ->set_header_template('<%- $_index + 1 %> <% if (title) { %>- <%- title %><% } %>'),
  ));

Container::make('post_meta', 'Sobre')
  ->where('post_template', '=', 'page-templates/home.php')
  ->add_fields(array(
    Field::make('text', 'ca_home__sobre_title', 'Título'),
    Field::make('rich_text', 'ca_home__sobre_description', 'Descrição'),
    Field::make('text', 'ca_home__sobre_title_quem_faz', 'Título de quem faz'),
    Field::make('complex', 'ca_home__sobre_quem_faz', 'Quem faz')
      ->add_fields(array(
        Field::make('image', 'image', 'Imagem'),
      )),
    Field::make('text', 'ca_home__sobre_title_quem_apoia', 'Título de quem apoia'),
    Field::make('complex', 'ca_home__sobre_quem_apoia', 'Quem apoia')
      ->add_fields(array(
        Field::make('image', 'image', 'Imagem'),
      ))
  ));

Container::make('post_meta', 'Contato')
  ->where('post_template', '=', 'page-templates/home.php')
  ->add_fields(array(
    Field::make('text', 'ca_home__contact_title', 'Título'),
    Field::make('text', 'ca_home__contact_form_shortcode', 'Shortcode do formulário de contato')
  ));

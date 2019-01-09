<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make('theme_options', 'Integração com Typeform')
  ->add_fields(array(
    // Typeform integration
    Field::make('text', 'ca__typeform_api_token', 'Token API Typeform'),
    Field::make('text', 'ca__typeform_infografico_form_id', 'ID do formulário para o infográfico'),
    Field::make('html', 'ca__typeform_integration_update_data_command')
      ->set_html('<a target="_blank" href="' . admin_url('admin-post.php?action=update_typeform_data') . '">Atualizar dados do typeform</a>'),
    Field::make('hidden', 'ca__typeform_infografico_api_data', 'Dados da API'),
  ));

/**
 * Action exclusive for admins to update the typeform data.
 * 
 * https://codex.wordpress.org/Plugin_API/Action_Reference/admin_post_(action)
 */
add_action('admin_post_update_typeform_data', function () {
	$ca__typeform_api_token = carbon_get_theme_option('ca__typeform_api_token');
	$ca__typeform_infografico_form_id = carbon_get_theme_option('ca__typeform_infografico_form_id');

  $request_query_string = http_build_query(array(
    'page_size' => 1000,
    'completed' => true,
    'sort' => 'submitted_at,desc',
  ));
  $request_url = 'https://api.typeform.com/forms/' . $ca__typeform_infografico_form_id . '/responses?' . $request_query_string;

  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $request_url,
    CURLOPT_HTTPHEADER => array(
      'Authorization: Bearer ' . $ca__typeform_api_token
    )
  ));

  $result = curl_exec($curl);

  if ($result) {
    @header('Content-Type: application/json; charset=' . get_option('blog_charset'));
    carbon_set_theme_option('ca__typeform_infografico_api_data', $result);
    echo 'Dados atualizados com sucesso.';
  } else {
    echo curl_error($curl);
  }
  curl_close($curl);

  die();
});

/**
 * Typeform data retrieval
 */
add_action('admin_post_get_typeform_data', 'ca__typeform_infografico__get_api_data');
add_action('admin_post_nopriv_get_typeform_data', 'ca__typeform_infografico__get_api_data');

function ca__typeform_infografico__get_api_data() {
  echo carbon_get_theme_option('ca__typeform_infografico_api_data');
  die();
}

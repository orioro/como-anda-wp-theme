<?php
/**
 * Template name: Infográfico roda
 */

get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
<main id="page-template-infografico-roda">

<?php

/**
 * Function that updates the typeform-file
 */
function update_typeform_results() {

  $TEMPORARY_TOKEN = '6dXcb5qeCVKU76hcBdwzzkQmd6LSjD8iAT6qj5FZ34mQ';

  $context = stream_context_create(array(
    'http' => array(
      'method' => 'GET',
      'header' => 'Authorization: Bearer ' . $TEMPORARY_TOKEN
    )
  ));

  // https://api.typeform.com/forms/{form_id}/responses

  // $typeformAPIKey = '1863a4d5bcae1d13d3d7ec231e18e5e12c5e30f0';
  $typeformFormId = 'RoOGoD';
  $request_query_string = http_build_query(array(
    'page_size' => 1000,
    'completed' => true,
    'sort' => 'submitted_at,desc',
  ));
  $request_url = 'https://api.typeform.com/forms/' . $typeformFormId . '/responses?' . $request_query_string;

  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $request_url,
    CURLOPT_HTTPHEADER => array(
      'Authorization: Bearer ' . $TEMPORARY_TOKEN,
    )
  ));

  $result = curl_exec($curl);

  if ($result) {
    @header('Content-Type: application/json; charset=' . get_option('blog_charset'));
    echo $result;
  } else {
    echo curl_error($curl);
  }
  curl_close($curl);

  die();

  // if ($typeform_latest_data) {
  //   $typeform_data_file = fopen(get_template_directory().'/assets/data/typeform-results.json', 'w');
  //   fwrite($typeform_data_file, $typeform_latest_data);
  //   fclose($typeform_data_file);
  //   echo 'Dados atualizados com sucesso.';
  //   die;
  // } else {
  //   echo 'Houve um erro ao atualizar os dados.';
  //   die;
  // }
}

update_typeform_results();

?>

</main>
<?php endwhile; ?>

<?php
get_footer();

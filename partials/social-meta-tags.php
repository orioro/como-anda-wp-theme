<?php
$ca__social_data_defaults = array(
  'ca__social_title' => get_bloginfo('name') . ' - ' . get_bloginfo('description'),
  'ca__social_share_image' => carbon_get_theme_option('ca__social_share_image'),
  'ca__social_description' => carbon_get_theme_option('ca__social_description'),
  'ca__social_keywords' => carbon_get_theme_option('ca__social_keywords'),
);
$ca__social_data = array(
  'ca__social_title' => null,
  'ca__social_share_image' => null,
  'ca__social_description' => null,
  'ca__social_keywords' => null
);

if (is_singular()) {
  $ca__queried_object = get_queried_object();

  $ca__social_data['ca__social_title'] = get_bloginfo('name') . ' - ' . $ca__queried_object->post_title;
  $ca__social_data['ca__social_share_image'] = get_the_post_thumbnail_url(
    $ca__queried_object->ID,
    'full'
  );
  $ca__social_data['ca__social_description'] = $ca__queried_object->post_excerpt;
}

foreach ($ca__social_data as $key => $value) {
  if (!$value) {
    $ca__social_data[$key] = $ca__social_data_defaults[$key];
  }
}
?>

<?php if ($ca__social_data['ca__social_title']) : ?>
<meta property="og:title" content="<?php echo $ca__social_data['ca__social_title']; ?>" />
<?php endif; ?>

<?php if ($ca__social_data['ca__social_description']) : ?>
<meta property="og:description" content="<?php echo $ca__social_data['ca__social_description']; ?>" />
<?php endif; ?>

<?php if ($ca__social_data['ca__social_share_image']) : ?>
<meta property="og:image" content="<?php echo $ca__social_data['ca__social_share_image']; ?>" />
<?php endif; ?>

<?php if ($ca__social_data['ca__social_keywords']) : ?>
<meta name="keywords" content="<?php echo $ca__social_data['ca__social_keywords']; ?>"/>
<?php endif; ?>

<?php if ($ca__social_data['ca__social_description']) : ?>
<meta name="description" content="<?php echo $ca__social_data['ca__social_description']; ?>"/>
<?php endif; ?>

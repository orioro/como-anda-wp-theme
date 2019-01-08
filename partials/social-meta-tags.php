<?php
  $ca__social_title = get_bloginfo('name') . ' - ' . get_bloginfo('description');
  $ca__social_share_image = carbon_get_theme_option('ca__social_share_image');
  $ca__social_description = carbon_get_theme_option('ca__social_description');
  $ca__social_keywords = carbon_get_theme_option('ca__social_keywords');
?>

<?php if (is_page_template('page-templates/home.php')) : ?>
  <!-- Home -->
  <!-- Home - Facebook -->
  <?php if ($ca__social_title) : ?>
  <meta property="og:title" content="<?php echo $ca__social_title; ?>" />
  <?php endif; ?>

  <?php if ($ca__social_description) : ?>
  <meta property="og:description" content="<?php echo $ca__social_description; ?>" />
  <?php endif; ?>

  <?php if ($ca__social_share_image) : ?>
  <meta property="og:image" content="<?php echo $ca__social_share_image; ?>" />
  <?php endif; ?>

  <!-- Home - Google -->
  <?php if ($ca__social_keywords) : ?>
  <meta name="keywords" content="<?php echo $ca__social_keywords; ?>"/>
  <?php endif; ?>
  
  <?php if ($ca__social_description) : ?>
  <meta name="description" content="<?php echo $ca__social_description; ?>"/>
  <?php endif; ?>

<?php endif; ?>

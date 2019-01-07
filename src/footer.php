<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package como-anda-wp-theme
 */

$queried_object = get_queried_object();

?>

<?php if ($queried_object->post_type === 'page' && get_page_template_slug($queried_object->ID) === 'page-templates/infografico-roda.php') : ?>
  <!-- Infográfico has a different footer -->
<?php else : ?>
<footer 
  id="main-footer"
  class="ca-bg-gray-light"
  data-bg-color-section="gray-light">
  <div class="max-width-container side-padding-container vertical-padding-container">
    <?php
      $ca__email = carbon_get_theme_option('ca__email');
      $ca__instagram_url = carbon_get_theme_option('ca__instagram_url');
      $ca__facebook_url = carbon_get_theme_option('ca__facebook_url');
      $ca__medium_url = carbon_get_theme_option('ca__medium_url');
    ?>
    <div>
      <div>
        <ul class="ca-contact-icon-link-list">
          <?php if ($ca__instagram_url) : ?>
          <li>
            <a class="ca-red" target="_blank" href="<?php echo $ca__instagram_url; ?>">
              <?php require('resources/icones/instagram.svg'); ?>
            </a>
          </li>
          <?php endif; ?>
          <?php if ($ca__facebook_url) : ?>
          <li>
            <a class="ca-red" target="_blank" href="<?php echo $ca__facebook_url; ?>">
              <?php require('resources/icones/facebook.svg'); ?>
            </a>
          </li>
          <?php endif; ?>
          <?php if ($ca__medium_url) : ?>
          <li>
            <a class="ca-red" target="_blank" href="<?php echo $ca__medium_url; ?>">
              <?php require('resources/icones/medium.svg'); ?>
            </a>
          </li>
          <?php endif; ?>
          <?php if ($ca__email) : ?>
          <li>
            <a class="ca-red" href="mailto:<?php echo $ca__email; ?>">
              <?php require('resources/icones/mail.svg'); ?>
            </a>
          </li>
          <?php endif; ?>
        </ul>
        <img alt="" src="<?php echo get_template_directory_uri(); ?>/resources/licenca.png">
      </div>
      <div>
        <img id="footer-decoration" src="<?php echo get_template_directory_uri(); ?>/resources/ilustracoes/ilustracao-5.png">
      </div>
    </div>


    <div class="row">
      <div class="col-md-8 offset-md-4">
        <div class="section-body">

          
        </div>
        <div >
        </div>
      </div>
    </div>
  </div>

</footer>
<?php endif; ?>

<?php wp_footer(); ?>

</body>
</html>

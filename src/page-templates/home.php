<?php
/**
 * Template Name: Home
 */

get_header(); ?>
<?php while (have_posts()) : the_post(); ?>

<main id="page-template-home">
	<section
		id="#abertura"
		class="ca-bg-red">
		<div class="max-width-container side-padding-container container">

			<div class="row">
				<div class="ca-page-header col-md-9 offset-md-3">
					<h1 class="ca-heading-1">
					<?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__abertura_title');  ?>
					</h1>
					<div class="wysiwyg-content">
						<?php echo apply_filters('the_content',carbon_get_post_meta(get_the_ID(), 'ca_home__abertura_description')); ?>
					</div>
				</div>
			</div>
      <?php $ca_home__eixos = carbon_get_post_meta(get_the_ID(), 'ca_home__eixos'); ?>
			<ul>
        <?php foreach($ca_home__eixos as $eixo) : ?>
        <li>
          <?php echo $eixo['title']; ?>
          <?php echo $eixo['description']; ?>
        </li>
        <?php endforeach; ?>          
      </ul>
		</div>
	</section>
  <section
    id="#projetos">
    <div class="max-width-container side-padding-container ">
      <h1 class="ca-heading-1">
      <?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__project_list_title'); ?>
      </h1>
      <?php $ca_home__project_list_projects = carbon_get_post_meta(get_the_ID(), 'ca_home__project_list_projects'); ?>
      <ul>
        <?php foreach($ca_home__project_list_projects as $item) : ?>
        <li>
          <h2 class="ca-heading-2"><?php echo $item['title']; ?></h2>
          <p><?php echo $item['description']; ?></p>
          <a class="ca-link-button" href=""><?php echo $item['button']?></a>
          <img src="<?php echo wp_get_attachment_image_src($item['image'], 'thumbnail')[0]; ?>">
        </li>
        <?php endforeach; ?>          
      </ul>
    </div>
  </section>
  <section
    id="#sobre">
    <div class="max-width-container side-padding-container">
      <h1 class="ca-heading-1">
      <?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__sobre_title');  ?>
      </h1>
      <p><?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__sobre_description'); ?></p>
      <h3><?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__sobre_quem_faz_title');?></h3>
      <?php $ca_home__sobre_quem_faz = carbon_get_post_meta(get_the_ID(), 'ca_home__sobre_quem_faz'); ?>
      <?php foreach($ca_home__sobre_quem_faz as $item) : ?>
        <img src="<?php echo wp_get_attachment_image_src($item['image'], 'thumbnail')[0]; ?>">
      <?php endforeach; ?>  
    </div>
  </section>
	<section
		id="contato"
		class="ca-bg-blue">
		<div class="max-width-container side-padding-container">
      <h1 class="ca-heading-1">
      <?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__contact_title');  ?>
      </h1>
      <div>
        
        <div class="ca-form">
          <?php echo do_shortcode(carbon_get_post_meta(get_the_ID(), 'ca_home__contact_form_shortcode')); ?>
        </div>
        <div>
          <?php
            $ca__email = carbon_get_theme_option('ca__email');
            $ca__instagram_url = carbon_get_theme_option('ca__instagram_url');
            $ca__facebook_url = carbon_get_theme_option('ca__facebook_url');
            $ca__medium_url = carbon_get_theme_option('ca__medium_url');
          ?>
          <a href="email">email</a>

          <ul class="contact-icon-link-list">
            <?php if ($ca__instagram_url) : ?>
            <li>
              <a target="_blank" href="<?php echo $ca__instagram_url; ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/resources/img/icon-instagram.svg">
              </a>
            </li>
            <?php endif; ?>
            <?php if ($ca__facebook_url) : ?>
            <li>
              <a target="_blank" href="<?php echo $ca__facebook_url; ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/resources/img/icon-facebook.svg">
              </a>
            </li>
            <?php endif; ?>
            <?php if ($ca__medium_url) : ?>
            <li>
              <a target="_blank" href="<?php echo $ca__medium_url; ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/resources/img/icon-medium.svg">
              </a>
            </li>
            <?php endif; ?>
          </ul>
        </div>
      </div>
		</div>
	</section>
</main>

<?php endwhile; ?>

<?php
get_footer();

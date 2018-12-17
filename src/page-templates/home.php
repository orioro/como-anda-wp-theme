<?php
/**
 * Template Name: Home
 */

get_header(); ?>
<?php while (have_posts()) : the_post(); ?>

<main id="page-template-home">
	<section
		id="abertura"
		class="ca-bg-red">
		<div class="container max-width-container side-padding-container">

			<div class="row">
				<div class="col-md-9 offset-md-3 ca-page-header">
					<h1 class="ca-heading-1 ca-fg-black">
					<?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__abertura_title');  ?>
					</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-4 ca-page-header">
					<div class="wysiwyg-content">
						<?php echo apply_filters('the_content',carbon_get_post_meta(get_the_ID(), 'ca_home__abertura_description')); ?>
					</div>
        </div>
			</div>
      <div class="vertical-padding-container">
      <?php $ca_home__eixos = carbon_get_post_meta(get_the_ID(), 'ca_home__eixos'); ?>
        <ul class="ca-topic-list">
        <?php foreach($ca_home__eixos as $eixo) : ?>
          <li>
            <h2 class="ca-heading-2"><?php echo $eixo['title']; ?></h2>
            <div class="wysiwyg-content"><?php echo $eixo['description']; ?></div>
          </li>
        <?php endforeach; ?>          
        </ul>
		  </div>
    </div>
	</section>
  <section
    id="projetos"
    class="ca-bg-yellow ca-fg-black">
    <div class="container max-width-container side-padding-container vertical-padding-container">
      <div class="row">
        <div class="col-md-9 offset-md-3 ca-page-header">
          <h1 class="ca-heading-1">
          <?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__project_list_title'); ?>
          </h1>
        </div>
      </div>
        <?php $ca_home__project_list_projects = carbon_get_post_meta(get_the_ID(), 'ca_home__project_list_projects'); ?>
      <div class="row">
        <div class="col-md-9 offset-md-3">
          <ul class="ca-topic-list-vertrical-images ">
            <?php foreach($ca_home__project_list_projects as $item) : ?>
            <li>
              <img src="<?php echo wp_get_attachment_image_src($item['image'], 'thumbnail')[0]; ?>">
              <div>
                <h2 class="ca-heading-2"><?php echo $item['title']; ?></h2>
                <p><?php echo $item['description']; ?></p>
                <a class="ca-link-button" href=""><?php echo $item['button']?></a>
              </div>
            </li>
            <?php endforeach; ?>
          </ul>
        <!-- </div> -->
      </div>  
    </div>
  </section>
  <section
    id="sobre"
    class="ca-bg-green">
    <div class=" container max-width-container side-padding-container vertical-padding-container">
      <div class="row">
        <div class="col-md-9 offset-md-3 ca-page-header">
          <h1 class="ca-heading-1">
          <?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__sobre_title');  ?>
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-4">
          <div class="ca-page-header wysiwyg-content section-body">
          <?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__sobre_description'); ?>
          </div>
          <div class="section-image">
            <div class= ca-page-header">
              <h3 class="ca-heading-3"><?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__sobre_title_quem_faz');?></h3>
              <?php $ca_home__sobre_quem_faz = carbon_get_post_meta(get_the_ID(), 'ca_home__sobre_quem_faz'); ?>
              <?php foreach($ca_home__sobre_quem_faz as $item) : ?>
                <img src="<?php echo wp_get_attachment_image_src($item['image'], 'thumbnail')[0]; ?>">
              <?php endforeach; ?>
            </div>
            <div class="ca-page-header">
              <h3 class="ca-heading-3"><?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__sobre_title_quem_apoia');?></h3>
              <?php $ca_home__sobre_quem_apoia = carbon_get_post_meta(get_the_ID(), 'ca_home__sobre_quem_apoia'); ?>
              <?php foreach($ca_home__sobre_quem_apoia as $item) : ?>
                <img src="<?php echo wp_get_attachment_image_src($item['image'], 'thumbnail')[0]; ?>">
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
	<section
		id="contato"
		class="ca-bg-blue">
		<div class="container max-width-container side-padding-container vertical-padding-container">
      <div class="row ca-page-header">
        <h1 class="col-md-9 offset-md-3 ca-heading-1">
        <?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__contact_title');  ?>
        </h1>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-4 ca-form">
          <?php echo do_shortcode(carbon_get_post_meta(get_the_ID(), 'ca_home__contact_form_shortcode')); ?>
          <div>
            <?php
              $ca__email = carbon_get_theme_option('ca__email');
              $ca__instagram_url = carbon_get_theme_option('ca__instagram_url');
              $ca__facebook_url = carbon_get_theme_option('ca__facebook_url');
              $ca__medium_url = carbon_get_theme_option('ca__medium_url');
            ?>
            <a href="mailto:contato@comoanda.org.br">contato@comoanda.org.br</a>

            <ul class="ca-contact-icon-link-list">
              <?php if ($ca__instagram_url) : ?>
              <li>
                <a target="_blank" href="<?php echo $ca__instagram_url; ?>">
                  <img src="<?php echo get_template_directory_uri(); ?>/resources/icones/instagram.svg">
                </a>
              </li>
              <?php endif; ?>
              <?php if ($ca__facebook_url) : ?>
              <li>
                <a target="_blank" href="<?php echo $ca__facebook_url; ?>">
                  <img src="<?php echo get_template_directory_uri(); ?>/resources/icones/facebook.svg">
                </a>
              </li>
              <?php endif; ?>
              <?php if ($ca__medium_url) : ?>
              <li>
                <a target="_blank" href="<?php echo $ca__medium_url; ?>">
                  <img src="<?php echo get_template_directory_uri(); ?>/resources/icones/medium.svg">
                </a>
              </li>
              <?php endif; ?>
            </ul>
          </div>
          
        </div>
      </div>
    
		</div>
	</section>
</main>

<?php endwhile; ?>

<?php
get_footer();

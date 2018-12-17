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
      <?php echo carbon_get_post_meta(get_the_ID(), 'ca_home__project_title'); ?>
      </h1>
      <?php $ca_home__project = carbon_get_post_meta(get_the_ID(), 'ca_home__project'); ?>
      <ul>
        <?php foreach($ca_home__project as $item) : ?>
        <li>
          <h2 class="ca-heading-2"><?php echo $item['title']; ?></h2>
          <p><?php echo $item['description']; ?></p>
          <button><?php echo $item['button']?></button>
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
			<div class="ca-form">
				<?php echo do_shortcode(carbon_get_post_meta(get_the_ID(), 'ca_home__contact_form_shortcode')); ?>
			</div>
		</div>
	</section>
</main>

<?php endwhile; ?>

<?php
get_footer();

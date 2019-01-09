<?php
/**
 * Template Name: Blocos
 */

get_header(); ?>
<?php while (have_posts()) : the_post(); ?>

<main id="page-template-blocks">
	<?php
	$ca_page__color_scheme = carbon_get_post_meta(
		get_the_ID(),
		'ca_page__color_scheme'
	);
  ?>

  <?php require(dirname(__DIR__) . '/partials/page-header.php'); ?>
  
	<!-- Blocks -->
	<?php
  $ca_blocks__blocks = carbon_get_post_meta(get_the_ID(), 'ca_blocks__blocks');
  $ca_blocks__blocks_count = count($ca_blocks__blocks);
  ?>
	<?php foreach ($ca_blocks__blocks as $block_index => $block) : ?>
	<section
		id="<?php echo sanitize_title($block['id'] ? $block['id'] : $block['title']); ?>"
		class="ca-page-section ca-bg-<?php echo $ca_page__color_scheme; ?> <?php if ($block_index === $ca_blocks__blocks_count - 1) : ?>ca-page-section--last<?php endif; ?>"
    data-bg-color-section="<?php echo $ca_page__color_scheme; ?>">
    <div class="container max-width-container side-padding-container">

      <?php
      $block_has_textual_items = $block['title'] ? true : false;
      $block_has_link_images = count($block['link_images']) > 0;
      ?>

      <?php if ($block_has_textual_items) : ?>
  		<div class="row">
  			<div class="col-md-4 ca-page-section__image-container">
  				<img src="<?php echo wp_get_attachment_image_src($block['image'], 'ca-square-image')[0]; ?>">
  			</div>
    
  			<div class="col-md-8 ca-page-section__contents ca-margin-top-6">
          <?php if ($block['title']) : ?>
  				<h3 class="ca-heading-3">
  					<?php echo $block['title']; ?>
  				</h3>
          <?php endif; ?>

          <?php if ($block['content']) : ?>
  				<div class="wysiwyg-content ca-page-section__contents_description">
  					<?php echo apply_filters('the_content', $block['content']); ?>
  				</div>
          <?php endif; ?>

          <?php if (count($block['link_buttons']) > 0) : ?>
  				<ul class="ca-link-button-list ca-padding-bottom-6">
  					<?php foreach ($block['link_buttons'] as $button) : ?>
  					<li>
  						<a
  							class="ca-link-button ca-hover-<?php echo ca_page__get_hover_color_scheme($ca_page__color_scheme); ?>"
  							target="<?php echo $button['target_blank'] ? '_blank' : ''; ?>"
  							href="<?php echo $button['file'] ? wp_get_attachment_url($button['file']) : $button['url']; ?>"
                <?php if ($button['is_typeform']) : ?>data-component="ca-typeform-trigger"<?php endif; ?>>
  							<?php echo $button['text']; ?>
  						</a>
  					</li>
  					<?php endforeach; ?>
  				</ul>
          <?php endif; ?>
  			</div>
  		</div>
      <?php endif; ?>

      <?php if ($block_has_link_images) : ?>
  		<div class="row <?php if (!$block_has_textual_items) : ?>ca-padding-top-6<?php else : ?>ca-padding-top-4<?php endif; ?> ca-padding-bottom-6">
  			<div class="col-md-12">
  				<ul class="ca-link-image-list ca-link-image-list--vertical-images">
  					<?php foreach ($block['link_images'] as $image) : ?>
  					<li>
  						<a
  							target="<?php echo $button['target_blank'] ? '_blank' : ''; ?>"
  							href="<?php echo $image['file'] ? wp_get_attachment_url($image['file']) : $image['url']; ?>">
  							<img src="<?php echo wp_get_attachment_image_src($image['image'], 'ca-link-image')[0]; ?>">
  							<h4>
  								<?php echo $image['text']; ?>
  							</h4>
  						</a>
  					</li>
  					<?php endforeach; ?>
  				</ul>
  			</div>
  		</div>
      <?php endif; ?>
    </div>	
	</section>
	<?php endforeach; ?>

	<!-- Related pages -->
	<?php require(dirname(__DIR__) . '/partials/related-pages.php'); ?>
</main>

<?php endwhile; ?>

<?php
get_footer();

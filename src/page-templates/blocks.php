<?php
/**
 * Template Name: Blocks
 */

get_header(); ?>
<?php while (have_posts()) : the_post(); ?>

<main id="page-template-blocks">
	<section
		id="abertura"
		class="ca-bg-red">
		<div class="container max-width-container side-padding-container ca-page-header">
			<div class="row">
				<h1 class="col-md-10 offset-md-2 ca-heading-1">
					<?php the_title(); ?>
				</h1>
			</div>
			<div class="row">
				<div class="col-md-9 offset-md-3 wysiwyg-content">
					<?php the_content(); ?>
				</div>
				
			</div>

<!-- 			<div class="row">
				<div class=" col-md-9 offset-md-3">
					<h1 class="ca-heading-1">
						<?php the_title(); ?>
					</h1>
					<div class="wysiwyg-content">
						<?php the_content(); ?>
					</div>
				</div>
			</div> -->
		</div>
	</section>

	<?php $ca_blocks__blocks = carbon_get_post_meta(get_the_ID(), 'ca_blocks__blocks'); ?>
	<?php foreach ($ca_blocks__blocks as $block) : ?>
	<section
		id="<?php echo sanitize_title($block['title']); ?>"
		class="ca-page-section max-width-container side-padding-container container">
		<div class="row">
			<div class="col-md-3 ca-page-section__image-container">
				<?php if ($block['image']) : ?>
				<img src="<?php echo wp_get_attachment_image_src($block['image'])[0]; ?>">
				<?php endif; ?>
			</div>
			<div class="col-md-9">
				<h3 class="ca-heading-3">
					<?php echo $block['title']; ?>
				</h3>
				<div class="wysiwyg-content">
					<?php echo apply_filters('the_content', $block['content']); ?>
				</div>
				<ul class="ca-link-button-list">
					<?php foreach ($block['link_buttons'] as $button) : ?>
					<li>
						<a
							class="ca-link-button"
							target="<?php echo $button['target_blank'] ? '_blank' : ''; ?>"
							href="<?php echo $button['file'] ? wp_get_attachment_url($button['file']) : $button['url']; ?>">
							<?php echo $button['text']; ?>
						</a>
					</li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
		<div class="row">
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
		
	</section>
	<?php endforeach; ?>

</main>

<?php endwhile; ?>

<?php
get_footer();

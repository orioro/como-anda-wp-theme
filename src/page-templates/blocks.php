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
	); ?>
	<section
		id="abertura"
		class="ca-bg-<?php echo $ca_page__color_scheme; ?>">
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
		</div>
	</section>

	<!-- Blocks -->
	<?php $ca_blocks__blocks = carbon_get_post_meta(get_the_ID(), 'ca_blocks__blocks'); ?>
	<?php foreach ($ca_blocks__blocks as $block) : ?>
	<section
		id="<?php echo sanitize_title($block['title']); ?>"
		class="container ca-page-section max-width-container side-padding-container ca-bg-<?php echo $ca_page__color_scheme; ?>">
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

	<!-- Other pages -->
	<?php
		$ca_blocks__page_parent_id = wp_get_post_parent_id(get_the_ID());

		$ca_blocks__sister_page_query = new WP_Query(array(
			'post_type' => 'page',
			'post_parent' => $ca_blocks__page_parent_id,
			'post__not_in' => array(get_the_ID()),
			'orderby' => 'menu_order',
			'order' => 'ASC',
		));
	?>

	<section class="ca-related-content ca-bg-yellow">
		<div class="max-width-container side-padding-container">
			<h1 class="ca-heading-1">
				<?php echo carbon_get_post_meta(get_the_ID(), 'ca_page__related_pages_title'); ?>
			</h1>
			<ul class="ca-related-content-link-list">
				<?php while ($ca_blocks__sister_page_query->have_posts()) : $ca_blocks__sister_page_query->the_post(); ?>
				<li>
					<h3 class="ca-heading-3">
						<?php the_title(); ?>
					</h3>
					<?php the_post_thumbnail(); ?>
					<?php the_excerpt(); ?>
					<a
						class="ca-link-button"
						href="<?php the_permalink(); ?>">
						<?php echo carbon_get_post_meta(get_the_ID(), 'ca_blocks__call_to_action'); ?>
					</a>
				</li>
				<?php endwhile; wp_reset_postdata(); ?>
			</ul>
		</div>
	</section>



</main>

<?php endwhile; ?>

<?php
get_footer();

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

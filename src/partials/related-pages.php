<?php
	$ca_page__page_parent_id = wp_get_post_parent_id(get_the_ID());

	$ca_page__sister_page_query = new WP_Query(array(
		'post_type' => 'page',
		'post_parent' => $ca_page__page_parent_id,
		'post__not_in' => array(get_the_ID()),
		'orderby' => 'menu_order',
		'order' => 'ASC',
	));
?>
<section class="ca-related-content ca-bg-yellow">
	<div class="container max-width-container side-padding-container ca-section-header ca-padding-top-6">
    <div class="row ca-padding-bottom-4">
      <div class="col-md-9 offset-md-3">
    		<h1 class="ca-heading-1 ca-section-header__heading ca-padding-bottom-3">
    			<?php echo carbon_get_post_meta(get_the_ID(), 'ca_page__related_pages_title'); ?>
    		</h1>
      </div>
    </div>
  <!--   <div class="row"> -->
  		<ul class="ca-related-content-link-list ">
  			<?php while ($ca_page__sister_page_query->have_posts()) : $ca_page__sister_page_query->the_post(); ?>
  			<li>
  				<h2 class="ca-heading-2">
  					<?php the_title(); ?>
  				</h2>
  				<?php the_post_thumbnail(); ?>
  				<?php the_excerpt(); ?>
  				<a
  					class="ca-link-button ca-hover-<?php echo carbon_get_post_meta(get_the_ID(), 'ca_page__color_scheme') ?>"
  					href="<?php the_permalink(); ?>">
  					<?php echo carbon_get_post_meta(get_the_ID(), 'ca_page__call_to_action'); ?>
  				</a>
  			</li>
  			<?php endwhile; wp_reset_postdata(); ?>
  		</ul>
<!--     </div> -->
	</div>
</section>

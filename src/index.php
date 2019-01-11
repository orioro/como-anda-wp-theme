<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package como-anda-wp-theme
 */

get_header(); ?>

<main
	id="page-template-mural"
	class="ca-bg-red-light"
  data-bg-color-section="red-light">

	<section id="mural-abertura" class="ca-page-header">
		<div class="container max-width-container side-padding-container ca-padding-top-6 ca-section-header">
			<h1
				data-component="ca-animated-text"
				class="ca-heading-1 ca-decorative-border-bottom ca-padding-bottom-3 ca-animated-text not-visible">Mural **Como Anda**</h1>
		</div>
	</section>

	<section id="mural-postagens">
		<div class="container max-width-container side-padding-container">
			<div class="row">
				<div class="col-md-8">
					<div>
						<?php while (have_posts()) : the_post(); ?>
						<article class="ca-mural-post">
							<div class="ca-mural-post__left">
								<h4
									class="ca-mural-post__left__date"><?php echo get_the_date(); ?></h4>
								
								<a href="<?php the_permalink(); ?>">
									<h2 class="ca-mural-post__left__heading"><?php the_title(); ?></h2>
								</a>
								<a
									class="ca-mural-post__left__excerpt"
									href="<?php the_permalink(); ?>">
									<?php the_excerpt(); ?>
								</a>
							</div>
							<div class="ca-mural-post__right">
								<a
									class="ca-mural-post__right__thumbnail"
									href="<?php the_permalink(); ?>">
									<?php the_post_thumbnail(); ?>
								</a>
								<div class="ca-tag-list">
									<?php the_tags('', ''); ?>
								</div>
							</div>
						</article>
						<?php endwhile; ?>
					</div>
				</div>

				<aside class="col-md-4">
				  <?php echo get_search_form(); ?>

					<!-- sticky posts -->
				  <?php

				  $ca_mural__sticky_posts_query = new WP_Query(array(
				    'posts_per_page' => 3,
				    'post__in'  => get_option('sticky_posts'),
				    'ignore_sticky_posts' => 1
				  ));
				  ?>

				  <?php if ($ca_mural__sticky_posts_query->have_posts()) : ?>
					<div>
						<h4>Destaques</h4>
						<div>
							<?php while ($ca_mural__sticky_posts_query->have_posts()) : $ca_mural__sticky_posts_query->the_post(); ?>

			        <article class="ca-highlight-thumbnail">
			          <a class= "ca-highlight-thumbnail__link" href="<?php the_permalink(); ?>">
			            <?php the_post_thumbnail(); ?>
			            <h4 class="ca-highlight-thumbnail__link__title">
			              <?php the_title(); ?>
			            </h4>
			          </a>
			        </article>

			        <?php endwhile; wp_reset_postdata(); ?>
						</div>
					</div>
					<?php endif; ?>

					<?php $ca_mural__all_tags = get_tags(); ?>
					<?php if (count($ca_mural__all_tags) > 0) : ?>
					<div class="ca-tag-list">
						<?php foreach ($ca_mural__all_tags as $tag) : ?>
						<?php $tag_href = get_tag_link($tag->term_id); ?>
						<a 
							href="<?php echo $tag_href; ?>"
							title="<?php echo $tag->name; ?>">
							<?php echo $tag->name; ?>
						</a>
						<?php endforeach; ?>
					</div>
					<?php endif; ?>
					
				</aside>
			</div>
		</div>
	</section>

</main>

<?php
get_footer();

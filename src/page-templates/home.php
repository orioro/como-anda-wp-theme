<?php
/**
 * Template Name: Home
 */

get_header(); ?>
<?php while (have_posts()) : the_post(); ?>

<main id="page-template-home">
	<section
		id="#sobre"
		class="ca-bg-red">
		<div class="max-width-container side-padding-container container">

			<div class="row">
				<div class="ca-page-header col-md-9 offset-md-3">
					<h1 class="ca-heading-1">
						Como anda é o ponto de encontro de organizações que promovem mobilidade a pé no Brasil
					</h1>
					<div class="wysiwyg-content">
						<?php the_content(); ?>
					</div>
				</div>
			</div>


			<ul></ul>
		</div>
	</section>
	<section
		id="contato"
		class="ca-bg-blue">
		<div class="max-width-container side-padding-container">

			<div class="ca-form">
				<?php echo do_shortcode(carbon_get_post_meta(get_the_ID(), 'ca_home__contact_form_shortcode')); ?>
			</div>
		</div>
	</section>
</main>

<?php endwhile; ?>

<?php
get_footer();

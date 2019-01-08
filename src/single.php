<?php
/**
 * Displays a single post
 */

$ca_post__external_url = carbon_get_post_meta(
	get_queried_object_id(),
	'ca_post__external_url'
);

if ($ca_post__external_url) {
	wp_redirect($ca_post__external_url, 301);
	exit();
}

get_header(); ?>
<main id="page-template-single">

<?php while (have_posts()) : the_post(); ?>
	<?php the_title(); ?>
	<?php the_content(); ?>
<?php endwhile; ?>

</main>

<?php
get_footer();

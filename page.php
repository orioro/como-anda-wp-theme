<?php

get_header(); ?>
<?php while (have_posts()) : the_post(); ?>

<main id="page-template-default">
	<h1>Home: <?php the_title(); ?></h1>
	<?php the_permalink(); ?>
<?php the_content(); ?>
</main>

<?php endwhile; ?>

<?php
get_footer();

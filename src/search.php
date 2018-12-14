<?php

get_header(); ?>

<main id="page-template-search">
<?php while (have_posts()) : the_post(); ?>
	<?php the_title(); ?>
<?php endwhile; ?>
</main>

<?php
get_footer();

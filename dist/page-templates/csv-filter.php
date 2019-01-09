<?php
/**
 * Template Name: Filtro de CSV
 */

get_header(); ?>
<?php while (have_posts()) : the_post(); ?>

<main id="page-template-csv-filter">
	<?php
	$ca_page__color_scheme = carbon_get_post_meta(
		get_the_ID(),
		'ca_page__color_scheme'
	);
	?>

	<template id="ca-csv-filter-config">
		<?php
		echo json_encode(ca_csv_filter__get_config(get_the_ID()));
		?>
	</template>

	<?php require(dirname(__DIR__) . '/partials/page-header.php'); ?>
	
	<section
		class="ca-bg-<?php echo $ca_page__color_scheme; ?>"
		data-bg-color-section="<?php echo $ca_page__color_scheme; ?>">
		<div class="container max-width-container side-padding-container">
			<div id="react-app-root">
				<!-- Elemento raiz do app React -->
			</div>
		</div>
	</section>

	<!-- Related pages -->
	<?php require(dirname(__DIR__) . '/partials/related-pages.php'); ?>
</main>

<?php endwhile; ?>

<?php
get_footer();


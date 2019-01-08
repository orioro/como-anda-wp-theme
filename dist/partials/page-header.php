<?php
$ca_page__color_scheme = $ca_page__color_scheme ? $ca_page__color_scheme : carbon_get_post_meta(
	get_the_ID(),
	'ca_page__color_scheme'
);

$ca_page_header__has_content = get_the_content() ? true : false;
?>

<section
	id="abertura"
	class="ca-bg-<?php echo $ca_page__color_scheme; ?>"
	data-bg-color-section="<?php echo $ca_page__color_scheme; ?>">
	<div class="container max-width-container side-padding-container ca-padding-top-6 ca-section-header">
		<div class="row">
      <div class="col-md-9 offset-md-3">
				<h1
          data-component="ca-animated-text"
          class="ca-heading-1 ca-section-header__heading ca-padding-bottom-3 ca-animated-text not-visible <?php if ($ca_page_header__has_content) : ?>ca-decorative-border-bottom<?php endif; ?>">
					<?php echo carbon_get_post_meta(get_the_ID(), 'ca_page__header_title'); ?>
				</h1>
      </div>
		</div>
		<?php if ($ca_page_header__has_content) : ?>
		<div class="row ca-padding-top-4">
      <div class="col-md-8 offset-md-4">
				<div class="wysiwyg-content ca-section-header__contents ca-padding-bottom-3">
					<?php the_content(); ?>
				</div>
      </div>
		</div>
		<?php endif; ?>
	</div>
</section>

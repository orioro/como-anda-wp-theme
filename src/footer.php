<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package como-anda-wp-theme
 */

?>

<footer id="main-footer">

	<?php
		$ca__email = carbon_get_theme_option('ca__email');
		$ca__instagram_url = carbon_get_theme_option('ca__instagram_url');
		$ca__facebook_url = carbon_get_theme_option('ca__facebook_url');
		$ca__medium_url = carbon_get_theme_option('ca__medium_url');
	?>

	<ul class="contact-icon-link-list">
		<?php if ($ca__instagram_url) : ?>
		<li>
			<a target="_blank" href="<?php echo $ca__instagram_url; ?>">
				<img src="<?php echo get_template_directory_uri(); ?>/resources/img/icon-instagram.svg">
			</a>
		</li>
		<?php endif; ?>
		<?php if ($ca__facebook_url) : ?>
		<li>
			<a target="_blank" href="<?php echo $ca__facebook_url; ?>">
				<img src="<?php echo get_template_directory_uri(); ?>/resources/img/icon-facebook.svg">
			</a>
		</li>
		<?php endif; ?>
		<?php if ($ca__medium_url) : ?>
		<li>
			<a target="_blank" href="<?php echo $ca__medium_url; ?>">
				<img src="<?php echo get_template_directory_uri(); ?>/resources/img/icon-medium.svg">
			</a>
		</li>
		<?php endif; ?>
		<?php if ($ca__email) : ?>
		<li>
			<a href="mailto:<?php echo $ca__email; ?>">
				<img src="<?php echo get_template_directory_uri(); ?>/resources/img/icon-email.svg">
			</a>
		</li>
		<?php endif; ?>
	</ul>

</footer>

<?php wp_footer(); ?>

</body>
</html>

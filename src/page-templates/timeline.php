<?php
/**
 * Template Name: Linha do tempo
 */

get_header(); ?>
<?php while (have_posts()) : the_post(); ?>

<main id="page-template-timeline">
	<?php
	$ca_page__color_scheme = carbon_get_post_meta(
		get_the_ID(),
		'ca_page__color_scheme'
	);
	?>
	<section
		id="abertura"
		class="ca-bg-<?php echo $ca_page__color_scheme; ?>"
		data-bg-color-section="<?php echo $ca_page__color_scheme; ?>">
		<div class="container max-width-container side-padding-container vertical-padding-container ca-section-header">
			<div class="row">
        <div class="col-md-9 offset-md-3">
  				<h1 class="ca-heading-1 ca-section-header__heading ca-padding-bottom-3">
  					<?php echo do_shortcode(carbon_get_post_meta(get_the_ID(), 'ca_timeline__abertura_title'));  ?>
  				</h1>
        </div>
			</div>
			<div class="row ca-padding-top-4">
				<div class="col-md-8 offset-md-4">
          <div class="wysiwyg-content ca-section-header__contents">
				    <?php the_content(); ?>
          </div>
				</div>
			</div>
		</div>
	</section>

	<section
		class="ca-timeline ca-bg-<?php echo $ca_page__color_scheme; ?>"
		data-bg-color-section="<?php echo $ca_page__color_scheme; ?>">
		<div class="container max-width-container side-padding-container ca-padding-top-6 ca-padding-bottom-6">
			<?php $ca_timeline__events = carbon_get_post_meta(get_the_ID(), 'ca_timeline__events'); ?>

			<?php
			$ca_timeline__decades = array(
				array(
					'start' => 1930,
					'events' => array(),
				),
				array(
					'start' => 1940,
					'events' => array(),
				),
				array(
					'start' => 1950,
					'events' => array(),
				),
				array(
					'start' => 1960,
					'events' => array(),
				),
				array(
					'start' => 1970,
					'events' => array(),
				),
				array(
					'start' => 1980,
					'events' => array(),
				),
				array(
					'start' => 1990,
					'events' => array(),
				),
				array(
					'start' => 2000,
					'events' => array(),
				),
				array(
					'start' => 2010,
					'events' => array(),
				),
			);

			foreach ($ca_timeline__events as $event) {
				$event_year = intval(trim($event['year']));

				foreach ($ca_timeline__decades as $decade_index => $decade) {
					$decade_start = $decade['start'];
					$decade_end = $decade_start + 9;

					if ($event_year >= $decade_start &&
							$event_year <= $decade_end) {
						array_push($ca_timeline__decades[$decade_index]['events'], $event);
						break;
					}
				}
			}
			?>

			<div
				class="row ca-bg-<?php echo $ca_page__color_scheme; ?>"
				data-component="ca-sticky-element"
				data-ca-sticky-element-top="#main-header"
				data-ca-sticky-element-bottom=".ca-related-content">
				<div class="col-md-12">
					<ul class="ca-timeline__decades-nav">
						<?php foreach ($ca_timeline__decades as $decade) : ?>
						<li>
							<a
								<?php echo count($decade['events']) > 0 ? 'href="#decada-' . $decade['start'] . '"' : ''; ?>
								class="<?php echo count($decade['events']) === 0 ? 'empty' : ''; ?>">
								<?php echo $decade['start']; ?> (<?php echo count($decade['events']); ?>)
							</a>
						</li>
						<?php endforeach; ?>
					</ul>
				</div>
			</div>
			<div class="row">
				<div class="col-md-8 offset-md-4">
          <div class="ca-timeline__toolbar">
            <a
              class="ca-link-button ca-hover-<?php echo ca_page__get_hover_color_scheme($ca_page__color_scheme); ?>"
              href="mailto:<?php echo carbon_get_theme_option('ca__email'); ?>"> 
              Incluir um marco
            </a>
          </div>
					<ul class="ca-timeline__decade-list">
						<?php foreach ($ca_timeline__decades as $decade) : ?>
						<li
							id="decada-<?php echo $decade['start']; ?>"
							data-in-page-navigation-offset="-42">
							<ul class="ca-timeline__event-list">
								<?php foreach ($decade['events'] as $event) : ?>
								<li class="ca-timeline-event-list__item">
									<h3 class="ca-heading-3">
										<?php echo $event['year'] ?><br>
										<?php echo $event['title'] ?>
									</h3>
									<div class="ca-timeline-event-list__item__body">
										<?php if ($event['image']) : ?>
										<img src="<?php echo wp_get_attachment_image_src($event['image'], 'ca-timeline-image')[0]; ?>">
										<?php endif; ?>
										<div class="wysiwyg-content">
											<?php echo apply_filters('the_content', $event['content']); ?>
										</div>
									</div>
								</li>
								<?php endforeach; ?>
							</ul>
						</li>
						<?php endforeach; ?>
					</ul>
				  <div class="ca-timeline__toolbar">
            <a
              class="ca-link-button ca-hover-<?php echo ca_page__get_hover_color_scheme($ca_page__color_scheme); ?>"
              href="mailto:<?php echo carbon_get_theme_option('ca__email'); ?>"> 
              Incluir um marco
            </a>
          </div>
        </div>
			</div>
		</div>
	</section>

	<!-- Related pages -->
	<?php require(dirname(__DIR__) . '/partials/related-pages.php'); ?>
</main>

<?php endwhile; ?>

<?php
get_footer();

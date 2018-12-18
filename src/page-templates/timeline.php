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
	); ?>
	<section
		id="abertura"
		class="ca-bg-<?php echo $ca_page__color_scheme; ?>">
		<div class="container max-width-container side-padding-container ca-section-header">
			<div class="row">
				<h1 class="col-md-10 offset-md-2 ca-heading-1">
					<?php the_title(); ?>
				</h1>
			</div>
			<div class="row">
				<div class="col-md-9 offset-md-3 wysiwyg-content">
					<?php the_content(); ?>
				</div>
			</div>
		</div>
	</section>

	<section class="ca-timeline">
		<div class="container max-width-container side-padding-container">
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

			<div class="row">
				<ul class="ca-timeline__decades-nav">
					<?php foreach ($ca_timeline__decades as $decade) : ?>
					<li>
						<a
							href="#decada-<?php echo $decade['start']; ?>"
							class="<?php echo count($decade['events']) === 0 ? 'empty' : ''; ?>">
							<?php echo $decade['start']; ?> (<?php echo count($decade['events']); ?>)
						</a>
					</li>
					<?php endforeach; ?>
				</ul>
			</div>

			<div class="row">
				<div class="col-md-8 offset-md-4">
					<ul class="ca-timeline__decade-list">
						<?php foreach ($ca_timeline__decades as $decade) : ?>
						<li id="decada-<?php echo $decade['start']; ?>">
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

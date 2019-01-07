jQuery(() => {
	const $mainHeader = jQuery('#main-header')
	const $window = jQuery(window)

	const updateFarFromTop = () => {
		if ($window.scrollTop() > 10) {
			$mainHeader.addClass('far-from-top')
		} else {
			$mainHeader.removeClass('far-from-top')
		}
	}

	$window.on('scroll', updateFarFromTop)
})

/**
 * Transform header color according to section color
 */
jQuery(() => {
	const $mainHeader = jQuery('#main-header')
	const $window = jQuery(window)
	const $bgColorSections = Array.from(jQuery('[data-bg-color-section]')).map($)

	const BG_COLORS_BY_COLOR_SCHEME = {
		'gray-light': '#E0E0E0',
		'gray': '#BFBFBF',
		'gray-dark': '#808080',

		'blue': '#3880BD',
		'blue-light': '#B1C2C3',
		'yellow': '#FFCD20',
		'brown': '#BA9B88',
		'orange': '#EF7013',
		'orange-light': '#FFAF74',
		'red': '#EC3233',
		'red-light': '#ECABAB',
		'green': '#5F8C3F',
		'green-light': '#B1D698',
	}

	const updateHeaderColor = () => {
		// Scroll top + header height + 1px (1px to next position)
		const colorPosition = $window.scrollTop() + $mainHeader.outerHeight() + 1

		const $bgColorSection = $bgColorSections.find($section => {
			const { top } = $section.offset()
			const bottom = top + $section.outerHeight()
			return colorPosition >= top && colorPosition < bottom
		})

		if ($bgColorSection) {
			$mainHeader.css({
				backgroundColor: BG_COLORS_BY_COLOR_SCHEME[$bgColorSection.attr('data-bg-color-section')]
			})
		} else {
			$mainHeader.css({
				backgroundColor: 'transparent'
			})
		}
	}

	$window.on('scroll', updateHeaderColor)
	updateHeaderColor()
})

/**
 * Mobile menu trigger
 */
jQuery(() => {
	const $body = jQuery('body')
	const $menuTrigger = jQuery('#mobile-menu-trigger')
	const $menuOverlay = jQuery('#mobile-menu-overlay')

	$menuTrigger.on('click', () => {
		$body.toggleClass('menu-open')
	})

	$menuOverlay.on('click', () => {
		$body.removeClass('menu-open')
	})
})

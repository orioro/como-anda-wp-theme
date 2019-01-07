const DISTANCE_FROM_VERTICAL_BOUNDARIES = 0

export default {
	name: 'ca-sticky-element',
	initialize: $component => {
		const $ = window.jQuery

		const $window = $(window)
		if ($window.width() < 500) {
			return
		}

		let $placeholder = null

		const stickyElementTopSelector = $component.attr('data-ca-sticky-element-top') || offsetTargetSelector
		const stickyElementBottomSelector = $component.attr('data-ca-sticky-element-bottom')

		if (!stickyElementTopSelector) {
			throw new Error('sticky-element component requires "data-ca-sticky-element-top" attribute')
		}

		const getTopBoundary = () => {
			return $(stickyElementTopSelector).height() + DISTANCE_FROM_VERTICAL_BOUNDARIES
		}

		const getBottomBoundary = () => {
			if (!stickyElementBottomSelector) {
				return false
			}

			let $bottomEl = $(stickyElementBottomSelector)
			if ($bottomEl.length > 0) {
				return $bottomEl.offset().top - DISTANCE_FROM_VERTICAL_BOUNDARIES
			} else {
				return false
			}
		}

		const INITIAL_POSITION = $component.css('position') || 'static'

		const makeSticky = () => {
			$component.data('sticky-element-original-offset-top', $component.offset().top)

			$component.addClass('active')
			$component.css({
				position: 'fixed',
				zIndex: '10',
				top: getTopBoundary() + 'px',
				width: $component.width() + 'px',
				transform: 'translateY(0)',
			})

			// Put placeholder if none is set
			if (!$placeholder) {
				$placeholder = $('<div data-ca-sticky-element-placeholder style="background-color: red;"></div>')
				$placeholder.css({
					position: INITIAL_POSITION,
					height: $component.height(),
				})
				$placeholder.insertAfter($component)
			}
		}

		const reverseSticky = () => {
			$component.removeClass('active')
			$component.css({
				position: INITIAL_POSITION,
				zIndex: '',
				top: '',
				width: '',
				transform: 'none',
			})

			// Remove placeholder if it is set
			if ($placeholder) {
				$placeholder.remove()
				$placeholder = null
			}
		}

		$window.on('scroll', e => {
			// https://davidwalsh.name/offsetheight-visibility
			let isVisible = $component.height() !== 0

			if (!isVisible) {
				return
			}

			let isSticky = $component.hasClass('active')

			if (!isSticky) {
				let shouldStick = ($window.scrollTop() + getTopBoundary() >= $component.offset().top)

				if (shouldStick) {
					makeSticky()
				}
			} else {
				let currentTop = $window.scrollTop() + getTopBoundary()
				let shouldKeepSticky = currentTop >= $component.data('sticky-element-original-offset-top')

				if (shouldKeepSticky) {
					// if the sticky element has reached the bottom,
					// translate it in the y axis
					let bottomBoundary = getBottomBoundary()
					if (bottomBoundary !== false) {
						const yTranslation = Math.min(
							0,
							bottomBoundary - (currentTop + $component.height())
						)

						$component.css('transform', `translateY(${yTranslation}px)`)
					}

				} else {
					reverseSticky()
				}
			}
		})



	}
}
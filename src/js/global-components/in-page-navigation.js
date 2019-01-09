export default () => {
	const $html = jQuery('html,body')
	const $mainHeader = jQuery('#main-header')

	const scrollTo = (selector) => {
		var $target = jQuery(selector)

		$html.animate({
			scrollTop: $target.offset().top
		})
	}

	const getBaseUrl = (postfix) => {
		var baseUrl = window.location.origin + window.location.pathname + window.location.search

		return postfix ? baseUrl + postfix : baseUrl
	}

	const getAnchorSelector = (targetId) => {
		return [
			'a[href="#' + targetId + '"]',
			'a[href="' + getBaseUrl('#' + targetId) + '"]'
		].join(',')
	}

	const getTargetElementGivenHref = (targetUrl, baseUrl) => {
		if (!targetUrl || !/#/.test(targetUrl)) {
			return null
		}

		var targetUrlSplit = targetUrl.split('#')

		if (targetUrlSplit[0] === '' ||
				targetUrlSplit[0] === baseUrl ||
				targetUrlSplit[1] === '') {
			var candidateSectionId = '#' + targetUrlSplit[1]
			var $targetSection = jQuery(candidateSectionId)

			return $targetSection.length > 0 ? $targetSection : null
		} else {
			return null
		}
	}


	/**
	 * On click, if possible, intercept click and navigate
	 * to corresponding section through scroll.
	 *
	 * In case there is no matching section in the page,
	 * simply allow default browser behavior.                                                                     [description]
	 */
	jQuery('body').on('click', 'a', function (event) {
		var baseUrl = getBaseUrl()
		var $targetAnchor = jQuery(event.currentTarget)

		var $targetSection = getTargetElementGivenHref($targetAnchor.attr('href'), baseUrl)

		if ($targetSection) {
			event.preventDefault()
			event.stopPropagation()
			window.history.pushState(
				{},
				'',
				$targetAnchor.attr('href')
			)

			let targetScrollTop = $targetSection.offset().top - $mainHeader.outerHeight()

			if ($targetSection.attr('data-in-page-navigation-offset')) {
				const offset = parseInt($targetSection.attr('data-in-page-navigation-offset'))

				if (offset) {
					targetScrollTop = targetScrollTop + offset
				}
			}

			/**
			 * Active / inactive
			 */
			jQuery('html, body').animate({
				scrollTop: targetScrollTop,
			})
		}
	})

}

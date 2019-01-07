import { isElementInView } from '../../lib/util'

const NOT_VISIBLE_CLASS = 'not-visible'
const HIGHLIGHT_REGEXP = /\*\*([^\*]+?)\*\*/g

export default {
	name: 'ca-animated-text',
	initialize: $component => {
		const SOURCE_TEXT = $component.text()

		const $window = jQuery(window)

		const highlightedHTML = [
			'<span>',
			SOURCE_TEXT.replace(HIGHLIGHT_REGEXP, '</span><span class="ca-highlight">$1</span><span>'),
			'</span>',
		].join('')
		$component.html(highlightedHTML)

		const $textNodes = Array.from($component.children()).map(jQuery)
		const $charEls = []

		$textNodes.forEach($node => {
			const nodeText = $node.text()
			$node.html('')
			nodeText.split('').forEach(char => {
				const $charEl = jQuery(`<span>${char}</span>`)
				$charEl.addClass(NOT_VISIBLE_CLASS)
				$charEls.push($charEl)
				$node.append($charEl)
			})
		})

		const updateVisibility = () => {
			if (isElementInView($component)) {
				$component.removeClass(NOT_VISIBLE_CLASS)
        $charEls.forEach(function ($charEl) {
        	setTimeout(() => {
        		$charEl.removeClass(NOT_VISIBLE_CLASS)
        	}, Math.round(Math.random() * 600))
        });
			} else {
				// $component.addClass(NOT_VISIBLE_CLASS)
				// $charEls.forEach($charEl => {
				// 	$charEl.addClass(NOT_VISIBLE_CLASS)
				// })
			}
		}

		$window.on('scroll', updateVisibility)
		updateVisibility()
	},
}

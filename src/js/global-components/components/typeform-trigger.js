import { makePopup } from '@typeform/embed'

export default {
	name: 'ca-typeform-trigger',
	initialize: $component => {
		const TYPEFORM_URL = $component.attr('data-typeform-url') || $component.attr('href')

		const popup = makePopup(TYPEFORM_URL, {
			mode: 'popup',
		})

		$component.on('click', e => {
			e.preventDefault()
			e.stopPropagation()

			popup.open()
		})
	}
}

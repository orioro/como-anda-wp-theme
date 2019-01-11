module.exports = (app, options) => {
	const $stateDropdown = jQuery('#state-dropdown')
	const $stateCheckboxes = $stateDropdown.find('input[type="checkbox"][name="state"]')
	const $allCheckbox = $stateDropdown.find('input[type="checkbox"][name="_all"]')

	const ALL_STATE_CODES = Array.from($stateCheckboxes).map(checkbox => {
		return checkbox.getAttribute('value')
	})

	$(window).on('click', ({ target }) => {
		if (!$stateDropdown[0].contains(target)) {
			$stateDropdown.removeClass('active')
		}
	})

	// Activate dropdown
	$stateDropdown.on('click', 'button', e => {
		$stateDropdown.toggleClass('active')
	})

	$stateCheckboxes.on('change', () => {
		const selectedStates = Array.from($stateDropdown.find('input[type="checkbox"]:checked')).map(checkbox => {
			return checkbox.getAttribute('value')
		})

		if (selectedStates.length === 0) {
			$allCheckbox.prop('checked', true)
			app.services.filter.set('Estado:', ALL_STATE_CODES)
		} else {
			$allCheckbox.prop('checked', false)
			app.services.filter.set('Estado:', selectedStates)
		}
	})

	$allCheckbox.on('change', () => {
		if ($allCheckbox.is(':checked')) {
			$stateCheckboxes.prop('checked', false)
			app.services.filter.set('Estado:', ALL_STATE_CODES)
		}
	})
}

const componentSystem = ({ componentNameAttribute, specs }) => {
	const COMPONENT_SELECTOR = `[${componentNameAttribute}]`

	return $rootElement => {
		const $components = Array.from($rootElement.find(COMPONENT_SELECTOR)).map(jQuery)

		$components.forEach($component => {
			const componentName = $component.attr(componentNameAttribute)
			const componentSpec = specs.find(spec => spec.name === componentName)

			if (!componentSpec) {
				console.warn(`Could not find spec for component with name '${componentName}'`)
			}

			componentSpec.initialize($component)
		})
	}
}

export default componentSystem

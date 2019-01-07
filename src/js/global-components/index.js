import componentSystem from './component-system'

import typeformTrigger from './components/typeform-trigger'

jQuery(() => {
	componentSystem({
		componentNameAttribute: 'data-component',
		specs: [
			typeformTrigger,
		]
	})(jQuery('body'))
})

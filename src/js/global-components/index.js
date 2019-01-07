import componentSystem from './component-system'

import typeformTrigger from './components/typeform-trigger'
import caAnimatedText from './components/ca-animated-text'

jQuery(() => {
	componentSystem({
		componentNameAttribute: 'data-component',
		specs: [
			typeformTrigger,
			caAnimatedText,
		]
	})(jQuery('body'))
})

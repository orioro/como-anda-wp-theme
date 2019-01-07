import componentSystem from './component-system'

import typeformTrigger from './components/typeform-trigger'
import animatedText from './components/animated-text'
import stickyElement from './components/sticky-element'

import inPageNavigation from './in-page-navigation'

jQuery(() => {
	componentSystem({
		componentNameAttribute: 'data-component',
		specs: [
			typeformTrigger,
			animatedText,
			stickyElement,
		]
	})(jQuery('body'))

	inPageNavigation()
})

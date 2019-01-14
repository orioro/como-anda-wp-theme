import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/App'

import configureStore from './store/configure-store'

document.addEventListener('DOMContentLoaded', e => {
	const { store } = configureStore()

	render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('react-app-root')
	)
})

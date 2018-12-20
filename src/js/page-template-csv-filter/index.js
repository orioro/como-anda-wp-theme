import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/App'

import configureStore from './store/configure-store'

import parseConfig from './parse-config'

document.addEventListener('DOMContentLoaded', e => {

	const config = parseConfig()
	const { store } = configureStore()

	render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('react-app-root')
	)
})


import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/reducer'
import parseConfig from '../parse-config'

const configureStore = () => {
	const store = createStore(
		rootReducer,
		{
			applicationConfig: parseConfig(),
		},
		applyMiddleware(thunk, createLogger())
	)

	return {
		store
	}
}

export default configureStore

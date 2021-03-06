import { combineReducers } from 'redux'

import query from './query/reducer'
import pagination from './pagination'

const entries = (state = [], action) => {
	switch (action.type) {
		case 'SET_ENTRIES':
			return action.payload.entries.filter(entry => Object.keys(entry).length > 0)
		default:
			return state
	}
}

const loadingState = (state = 'stopped', action) => {
	switch (action.type) {
		case 'LOAD_DATA_REQUEST':
			return 'loading'
		case 'LOAD_DATA_SUCCESS':
			return 'success'
		case 'LOAD_DATA_FAILURE':
			return 'failure'
		default:
			return state
	}
}

const applicationConfig = (state = null) => {
	return state
}

export default combineReducers({
	entries,
	query,
	loadingState,
	applicationConfig,
	pagination,
})

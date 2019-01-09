import { combineReducers } from 'redux'

const currentPageIndex = (state = 0, action) => {
	switch (action.type) {
		case 'SET_CURRENT_PAGE_INDEX':
			return action.payload.pageIndex
		case 'QUERY_SELECT_PARAMETER_OPTION':
		case 'QUERY_DESELECT_PARAMETER_OPTION':
		case 'QUERY_SELECT_PARAMETER_ALL_SELECTED':
		case 'QUERY_DESELECT_PARAMETER_ALL_SELECTED':
			return 0
		default:
			return state
	}
}

const pageLength = (state = 10) => {
	return state
}

export default combineReducers({
	currentPageIndex,
	pageLength
})

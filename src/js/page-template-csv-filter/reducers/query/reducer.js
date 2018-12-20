import { combineReducers } from 'redux'

const arrayRemoveItem = (arr, item) => {
	const index = arr.indexOf(item)

	return index === -1 ? arr : [
		...arr.slice(0, index),
		...arr.slice(index + 1, arr.length - 1)
	]
}

const arrayAddUniqueItem = (arr, item) => {
	const index = arr.indexOf(item)

	return index === -1 ? [...arr, item] : arr
}

const parameters = (state = [], action) => {
	switch (action.type) {
		case 'QUERY_DEFINE_PARAMETERS':
			return action.payload.parameters
		default:
			return state
	}
}

const value = (state = {}, action) => {
	switch (action.type) {
		case 'QUERY_SELECT_PARAMETER_OPTION':
			return {
				...state,
				allSelected: false,
				selected: arrayAddUniqueItem(state.selected, action.payload.optionId)
			}
		case 'QUERY_DESELECT_PARAMETER_OPTION':
			return {
				...state,
				selected: arrayRemoveItem(state.selected, action.payload.optionId)
			}
		case 'QUERY_SELECT_PARAMETER_ALL_SELECTED':
			return {
				...state,
				allSelected: true,
				selected: [],
			}
		case 'QUERY_DESELECT_PARAMETER_ALL_SELECTED':
			return {
				...state,
				allSelected: false
			}
		default:
			return state
	}
}

const values = (state = {}, action) => {
	switch (action.type) {
		case 'QUERY_DEFINE_PARAMETERS':
			return action.payload.parameters.reduce((acc, parameter) => {
				return {
					...acc,
					[parameter.id]: {
						allSelected: true,
						selected: [],
					}
				}
			}, {})
		case 'QUERY_SELECT_PARAMETER_OPTION':
		case 'QUERY_DESELECT_PARAMETER_OPTION':
		case 'QUERY_SELECT_PARAMETER_ALL_SELECTED':
		case 'QUERY_DESELECT_PARAMETER_ALL_SELECTED':
			return {
				...state,
				[action.payload.parameterId]: value(state[action.payload.parameterId], action)
			}
		default:
			return state
	}
}

export default combineReducers({
	parameters,
	values
})

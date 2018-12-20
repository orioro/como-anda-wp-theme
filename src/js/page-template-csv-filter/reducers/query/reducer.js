import { combineReducers } from 'redux'

const arrayRemoveItem = (arr, item) => {
	const index = arr.indexOf(item)

	return index === -1 ? arr : [
		...arr.slice(0, index),
		...arr.slice(index + 1, arr.length)
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

const queryValueDeselectParameterOption = (state, action) => {
	const nextSelected = arrayRemoveItem(state.selected, action.payload.optionId)

	return {
		...state,
		allSelected: nextSelected.length === 0,
		selected: nextSelected
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
			return queryValueDeselectParameterOption(state, action)
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

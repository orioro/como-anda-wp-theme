export const queryDefineParameters = parameters => {
	return {
		type: 'QUERY_DEFINE_PARAMETERS',
		payload: {
			parameters
		}
	}
}

export const querySelectParameterOption = (parameterId, optionId) => {
	return {
		type: 'QUERY_SELECT_PARAMETER_OPTION',
		payload: {
			parameterId,
			optionId
		}
	}
}

export const queryDeselectParameterOption = (parameterId, optionId) => {
	return {
		type: 'QUERY_DESELECT_PARAMETER_OPTION',
		payload: {
			parameterId,
			optionId
		}
	}
}

export const querySelectParameterAllSelected = parameterId => {
	return {
		type: 'QUERY_SELECT_PARAMETER_ALL_SELECTED',
		payload: {
			parameterId
		}
	}
}

export const queryDeselectParameterAllSelected = parameterId => {
	return {
		type: 'QUERY_DESELECT_PARAMETER_ALL_SELECTED',
		payload: {
			parameterId
		}
	}
}

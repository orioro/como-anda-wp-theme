export const applyParametersQuery = (items, parameterValues) => {
	return items.filter(item => {
		return Object.keys(parameterValues).every(parameterId => {
			const value = parameterValues[parameterId]

			if (value.allSelected) {
				return true
			} else {
				return value.selected.some(parameterValue => {
					return item[parameterId] &&
								 item[parameterId].toLowerCase().includes(parameterValue.toLowerCase())
				})
			}
		})
	})
}

const strMatchesTextSearch = (str, textSearchValue) => {
	return str.toLowerCase().includes(textSearchValue)
}

export const applyTextSearchQuery = (items, searchProperties, textSearchValue) => {
	if (!textSearchValue) {
		return items
	}

	textSearchValue = textSearchValue.toLowerCase()

	return items.filter(item => {
		return searchProperties.some(prop => {
			const value = item[prop]
			return value && Array.isArray(value) ?
				value.some(v => v && strMatchesTextSearch(v, textSearchValue)) :
				strMatchesTextSearch(value, textSearchValue)
		})
	})
}

export const applyFullQuery = (items, {
	searchProperties,
	textSearchValue,
	parameterValues
}) => {

}

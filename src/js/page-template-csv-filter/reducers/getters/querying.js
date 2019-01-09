const strMatchesTextSearch = (str, textSearchValue) => {
	return str.toLowerCase().includes(textSearchValue)
}

export const applyParametersQuery = (items, parameterValues) => {
	return items.filter(item => {
		return Object.keys(parameterValues).every(parameterId => {
			const value = parameterValues[parameterId]

			if (value.allSelected) {
				return true
			} else {
				return value.selected.some(parameterValue => {
					return item[parameterId] &&
								 strMatchesTextSearch(item[parameterId], parameterValue.toLowerCase())
				})
			}
		})
	})
}

export const applyTextSearchQuery = (items, textSearchProperties, textSearchValue) => {
	if (!textSearchValue) {
		return items
	}

	textSearchValue = textSearchValue.toLowerCase()

	return items.filter(item => {
		return textSearchProperties.some(prop => {
			const value = item[prop]

			if (!value) {
				return false
			}

			return Array.isArray(value) ?
				value.some(v => v && strMatchesTextSearch(v, textSearchValue)) :
				strMatchesTextSearch(value, textSearchValue)
		})
	})
}

export const applyFullQuery = (items, {
	parameterValues,
	textSearchProperties,
	textSearchValue
}) => {
	return applyTextSearchQuery(
		// Apply text search query only after applying parameters query
		applyParametersQuery(
			items,
			parameterValues
		),
		textSearchProperties,
		textSearchValue
	)
}

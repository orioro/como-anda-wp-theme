const parseConfig = () => {
	const configElement = document.getElementById('ca-csv-filter-config')

	const config = JSON.parse(configElement.innerHTML)

	return {
		csvFile: config.csv_file,
		parameters: config.parameters.map(param => {
			return {
				id: param.label,
				label: param.label,
				// allSelected: true,
				optionLists: param.option_lists.map(optionList => {
					return {
						id: optionList.label,
						label: optionList.label,
						options: optionList.options.map(option => {
							return {
								id: option.label,
								label: option.label,
								// value: false,
							}
						})
					}
				})
			}
		})
	}
}

export default parseConfig

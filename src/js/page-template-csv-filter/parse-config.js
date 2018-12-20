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
		}),

		// Output config
		outputHeadingColumn: config.output_heading_column,
		outputSubHeadingColumns: config.output_sub_heading_columns.map(i => i.column_name),
		outputDescriptionColumn: config.output_description_column,
		outputButtonText: config.output_button_text,
		outputUrlColumn: config.output_url_column,
		outputMetadataColumns: config.output_metadata_columns.map(i => i.column_name),
		outputBoldMetadataColumns: config.output_bold_metadata_columns.map(i => i.column_name),
		outputTagsColumn: config.output_tags_column,
	}
}

export default parseConfig

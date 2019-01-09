const parseConfig = () => {
	const configElement = document.getElementById('ca-csv-filter-config')
	const config = JSON.parse(configElement.innerHTML)

	const parsed = {
		csvFile: config.csv_file,
		paginationPageLength: config.pagination_page_length ? parseInt(config.pagination_page_length) : null,

		backgroundColorScheme: config.background_color_scheme,
		hoverColorScheme: config.hover_color_scheme,
		linkButtons: config.link_buttons.map(btn => {
			return {
				...btn,
				targetBlank: btn.target_blank,
			}
		}),
		parameters: config.parameters.map(param => {
			return {
				id: param.id || param.label,
				label: param.label,
				// allSelected: true,
				optionLists: param.option_lists.map(optionList => {
					return {
						id: optionList.id || optionList.label,
						label: optionList.label,
						options: optionList.options.map(option => {
							return {
								id: option.id || option.label,
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
		outputLinkButtons: config.output_link_buttons.map(i => ({
			buttonText: i.button_text,
			columnName: i.column_name,
		})),
		outputMetadataColumns: config.output_metadata_columns.map(i => i.column_name),
		outputBoldMetadataColumns: config.output_bold_metadata_columns.map(i => i.column_name),
		outputTagsColumn: config.output_tags_column,
	}

	return {
		...parsed,
		textSearchColumns: [
			parsed.outputHeadingColumn,
			parsed.outputDescriptionColumn,
			parsed.outputTagsColumn,
			...parsed.outputSubHeadingColumns,
			...parsed.outputMetadataColumns,
			...parsed.outputBoldMetadataColumns
		].filter(Boolean)
	}
}

export default parseConfig

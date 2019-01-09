export const SEARCHABLE_OUTPUT_DATA_PROPERTIES = [
	'heading',
	'subHeadings',
	'description',
	'metadata',
	'boldMetadata',
	'tags'
]

export const mapOutputData = (applicationConfig, data) => {
	return {
		_id: data._id,
		heading: data[applicationConfig.outputHeadingColumn],
		subHeadings: applicationConfig.outputSubHeadingColumns.map(columnName => data[columnName]),
		description: data[applicationConfig.outputDescriptionColumn],
		url: data[applicationConfig.outputUrlColumn],
		buttonText: applicationConfig.outputButtonText,
		metadata: applicationConfig.outputMetadataColumns.map(columnName => data[columnName]),
		boldMetadata: applicationConfig.outputBoldMetadataColumns.map(columnName => data[columnName]),
		tags: data[applicationConfig.outputTagsColumn] ?
			data[applicationConfig.outputTagsColumn].split(';') : [],
	}
}

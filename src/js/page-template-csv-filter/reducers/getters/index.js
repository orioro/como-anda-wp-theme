import {
	applyFullQuery
} from './querying'

/**
 * Maps the source entry to the application output entry
 */
export const getEntryOutputData = (state, entry) => {
	const cfg = state.applicationConfig

	return {
		_id: entry._id,
		heading: entry[cfg.outputHeadingColumn],
		subHeadings: cfg.outputSubHeadingColumns.map(columnName => entry[columnName]),
		description: entry[cfg.outputDescriptionColumn],
		metadata: cfg.outputMetadataColumns.map(columnName => entry[columnName]),
		boldMetadata: cfg.outputBoldMetadataColumns.map(columnName => entry[columnName]),
		linkButtons: cfg.outputLinkButtons.map(linkButton => {
			return {
				buttonText: linkButton.buttonText,
				url: entry[linkButton.columnName],
			}
		}),
		tags: entry[cfg.outputTagsColumn] ?
			entry[cfg.outputTagsColumn].split(/\s*;\s*/g) : [],
	}
}

/**
 * Applies the full query (parameter and text) to the entries
 * and returns the matching entries.
 */
export const getMatchingEntries = state => {
	return applyFullQuery(
		state.entries,
		{
			parameterValues: state.query.values,
			textSearchProperties: state.applicationConfig.textSearchColumns,
			textSearchValue: state.query.textSearchValue,
		}
	)
}

/**
 * Retrieves all data required for pagination given a set of entries
 */
export const getPaginationData = (state, entries) => {
	let {
		pageLength,
		currentPageIndex,
	} = state.pagination

	pageLength = pageLength || state.applicationConfig.paginationPageLength || 10

	const pageEntriesStart = pageLength * currentPageIndex
	const pageEntriesEnd = pageEntriesStart + pageLength
	const pageEntries = entries.slice(pageEntriesStart, pageEntriesEnd + 1)

	const pageCount = entries.length % pageLength === 0 ?
		entries.length / pageLength :
		Math.floor(entries.length / pageLength) + 1

	const pagesStart = Math.max(0, currentPageIndex - 2)
	const pagesEnd = pagesStart + 4
	const pages = Array.apply(null, Array(pageCount))
		.map((x, i) => i)
		.slice(pagesStart, pagesEnd + 1)

	return {
		pageEntries,
		pages,

		currentPageIndex,
		hasPreviousPage: currentPageIndex > 0,
		hasNextPage: currentPageIndex < (pageCount - 1),
	}
}

/**
 * Counts matching entries in case the parameterId had 'allSelected' true
 *
 * Uses as the base for computation all entries available
 */
export const countEntriesForParameter = (state, parameterId) => {
	return applyFullQuery(
		state.entries,
		{
			parameterValues: {
				...state.query.values,
				[parameterId]: {
					allSelected: true,
				}
			},
			textSearchProperties: state.applicationConfig.textSearchColumns,
			textSearchValue: state.query.textSearchValue,
		}
	).length
}

/**
 * Counts matching entries in a scenario that the given parameterId and optionId
 * are effectively selected
 */
export const countEntriesForParameterOption = (state, parameterId, optionId) => {
	return applyFullQuery(
		state.entries,
		{
			parameterValues: {
				...state.query.values,
				[parameterId]: {
					allSelected: false,
					selected: [optionId]
				}
			},
			textSearchProperties: state.applicationConfig.textSearchColumns,
			textSearchValue: state.query.textSearchValue,
		}
	).length
}

/**
 * Retrieves the filter parameters
 */
export const getFilterParameters = state => {
	return state.query.parameters.map(parameter => {
		return {
			...parameter,
			allSelected: state.query.values[parameter.id].allSelected,
			allSelectedLabel: `Todos (${countEntriesForParameter(state, parameter.id)})`,
			optionLists: parameter.optionLists.map(optionList => {
				return {
					...optionList,
					options: optionList.options.map(option => {
						const optionIsSelected = state.query.values[parameter.id].selected.indexOf(option.id) !== -1
						const availableItemsForOption = countEntriesForParameterOption(state, parameter.id, option.id)

						return {
							...option,
							label: `${option.label} (${availableItemsForOption})`,
							labelSrc: option.label,
							value: optionIsSelected,
							disabled: optionIsSelected ? false : availableItemsForOption === 0,
						}
					})
				}
			})
		}
	})
}

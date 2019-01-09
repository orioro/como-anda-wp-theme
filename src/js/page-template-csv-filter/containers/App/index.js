import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { findDOMNode } from 'react-dom'

import {
	queryDefineParameters,
	querySelectParameterOption,
	queryDeselectParameterOption,
	querySelectParameterAllSelected,
	queryDeselectParameterAllSelected,

	querySetTextSearchValue,
} from '../../reducers/query/actions'

import {
	applyParametersQuery,
	applyTextSearchQuery
} from '../../reducers/query/getters'

import {
	loadCSV,
	setCurrentPageIndex
} from '../../reducers/actions'

import Filter from '../../../lib/react-components/Filter'
import TextSearchForm from '../../../lib/react-components/TextSearchForm'
import OutputCard from '../../../lib/react-components/OutputCard'
import PaginationControl from '../../../lib/react-components/PaginationControl'
import LoadingIndicator from '../../../lib/react-components/LoadingIndicator'

import {
	mapOutputData,
	SEARCHABLE_OUTPUT_DATA_PROPERTIES
} from './data-mapping'

class App extends React.Component {

	scrollToTop() {
		const $html = jQuery('body,html')
		const $mainHeader = jQuery('#main-header')

		$html.animate({
			scrollTop: jQuery(findDOMNode(this)).offset().top - $mainHeader.outerHeight()
		})
	}

	componentDidMount() {
		this.props.queryDefineParameters(this.props.applicationConfig.parameters)
		this.props.loadCSV(this.props.applicationConfig.csvFile)
	}

	render() {
		const HOVER_CLASSNAME = `ca-hover-${this.props.applicationConfig.hoverColorScheme}`

		return <div className='ca-csv-filter-app'>
			<LoadingIndicator
				active={this.props.loadingState === 'loading'}
			/>
			<header className='ca-csv-filter-app__header'>
				<div className='ca-csv-filter-app__header__bar'>
					<div className='ca-csv-filter-app__header__bar__left'>
						<h3 className='ca-heading-3'>
							Filtrar por:
						</h3>
						<Filter
							parameters={this.props.parameters}
							onParameterSelectAll={this.props.querySelectParameterAllSelected}
							onParameterDeselectAll={() => {
								if (this.props.parameters.length > 0 &&
										this.props.parameters[0].optionLists.length > 0 &&
										this.props.parameters[0].optionLists[0].options.length > 0) {
									this.props.querySelectParameterOption(
										this.props.parameters[0].id,
										this.props.parameters[0].optionLists[0].options[0].id
									)
								}
							}}
							onParameterChangeOption={(parameterId, listId, optionId, value) => {
								if (value) {
									this.props.querySelectParameterOption(parameterId, optionId)
								} else {
									this.props.queryDeselectParameterOption(parameterId, optionId)
								}

								this.scrollToTop()
							}}
							popUpTriggerClassName={`ca-bg-transparent ${HOVER_CLASSNAME}`}
						/>
					</div>
					<div className='ca-csv-filter-app__header__bar__right'>
						<TextSearchForm
							value={this.props.textSearchValue}
							label='Buscar por palavra'
							onChange={value => {
								this.props.querySetTextSearchValue(value)
							}}
							onSubmit={value => {
								this.scrollToTop()
							}}
						/>
					</div>
				</div>
				<div className='ca-csv-filter-app__header__bar'>
					<div className='ca-csv-filter-app__header__bar__left'>
						<h3 className='ca-heading-3'>
							Resultados:
						</h3>
					</div>
					<div className='ca-csv-filter-app__header__bar__right'>
						{this.props.applicationConfig.linkButtons.map((btn, index) => {
							return <a
								key={index}
								className={`ca-link-button ${HOVER_CLASSNAME}`}
								target={btn.targetBlank ? '_blank' : ''}
								href={btn.url}>
								{btn.text}
							</a>
						})}
					</div>
				</div>
			</header>
			<div className='ca-csv-filter-app__body'>
				{this.props.shownEntries.map(entry => {
					return <OutputCard
						key={entry._id}
						{...entry}
						tagClassName={`${HOVER_CLASSNAME}`}
						onTagClick={tag => {
							this.props.querySetTextSearchValue(tag)
							this.scrollToTop()
						}}
						highlightWords={this.props.textSearchValue ? [this.props.textSearchValue] : null}/>
				})}
			</div>
			<footer className='ca-csv-filter-app__footer'>
				<PaginationControl
					hasPreviousPage={this.props.hasPreviousPage}
					hasNextPage={this.props.hasNextPage}
					pages={this.props.shownPages}
					currentPageIndex={this.props.currentPageIndex}
					onClickPrevious={() => {
						this.props.setCurrentPageIndex(this.props.currentPageIndex - 1)
						this.scrollToTop()
					}}
					onClickNext={() => {
						this.props.setCurrentPageIndex(this.props.currentPageIndex + 1)
						this.scrollToTop()
					}}
					onClickPage={targetPageIndex => {
						this.props.setCurrentPageIndex(targetPageIndex)
						this.scrollToTop()
					}}
					buttonClassName={`${HOVER_CLASSNAME}`}
				/>
			</footer>
		</div>
	}
}

App.propTypes = {
	parameters: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
	const applicationConfig = state.applicationConfig
	const pageLength = state.pagination.pageLength
	const currentPageIndex = state.pagination.currentPageIndex

	const parameters = state.query.parameters.map(parameter => {
		const allSelectedValue = state.query.values[parameter.id].allSelected
		const availableItemsForAllSelected = applyParametersQuery(
			state.entries,
			{
				...state.query.values,
				[parameter.id]: {
					allSelected: true,
					selected: [],
				}
			}
		).length

		return {
			...parameter,
			allSelected: allSelectedValue,
			allSelectedLabel: `Todos (${availableItemsForAllSelected})`,
			optionLists: parameter.optionLists.map(optionList => {
				return {
					...optionList,
					options: optionList.options.map(option => {
						const optionIsSelected = state.query.values[parameter.id].selected.indexOf(option.id) !== -1
						const availableItemsForOption = applyParametersQuery(
							state.entries,
							{
								...state.query.values,
								[parameter.id]: {
									allSelected: false,
									selected: [option.id]
								}
							}
						).length

						return {
							...option,
							label: `${option.label} (${availableItemsForOption})`,
							value: optionIsSelected,
							disabled: optionIsSelected ? false : availableItemsForOption === 0,
						}
					})
				}
			})
		}
	})

	const parameterMatchedEntries = applyParametersQuery(
		state.entries,
		state.query.values
	)
	const matchedEntries = applyTextSearchQuery(
		// match the text search query against the output data (makes configuration easier)
		parameterMatchedEntries.map(entry => mapOutputData(state.applicationConfig, entry)),
		SEARCHABLE_OUTPUT_DATA_PROPERTIES,
		state.query.textSearchValue
	)
	const shownEntriesStartingIndex = pageLength * currentPageIndex
	const shownEntriesEndingIndex = shownEntriesStartingIndex + pageLength
	const shownEntries = matchedEntries.slice(shownEntriesStartingIndex, shownEntriesEndingIndex + 1)

	const pageCount = matchedEntries.length % pageLength === 0 ?
		matchedEntries.length / pageLength :
		Math.floor(matchedEntries.length / pageLength) + 1

	const shownPagesStartingIndex = Math.max(0, currentPageIndex - 2)
	const shownPagesEndingIndex = shownPagesStartingIndex + 4
	const shownPages = Array.apply(null, Array(pageCount))
		.map((x, i) => i)
		.slice(shownPagesStartingIndex, shownPagesEndingIndex + 1)

	return {
		applicationConfig: state.applicationConfig,
		textSearchValue: state.query.textSearchValue,
		loadingState: state.loadingState,
		parameters,
		shownEntries,

		currentPageIndex: currentPageIndex,
		hasPreviousPage: currentPageIndex > 0,
		hasNextPage: currentPageIndex < (pageCount - 1),
		shownPages,
	}
}

const mapDispatchToProps = {
	queryDefineParameters,
	querySelectParameterAllSelected,
	queryDeselectParameterAllSelected,
	querySelectParameterOption,
	queryDeselectParameterOption,
	querySetTextSearchValue,
	loadCSV,
	setCurrentPageIndex,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

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
	getMatchingEntries,
	getFilterParameters,
	getPaginationData,
	getEntryOutputData,
} from '../../reducers/getters'

import {
	loadCSV,
	setCurrentPageIndex
} from '../../reducers/actions'

import Filter from '../../../lib/react-components/Filter'
import TextSearchForm from '../../../lib/react-components/TextSearchForm'
import OutputCard from '../../../lib/react-components/OutputCard'
import PaginationControl from '../../../lib/react-components/PaginationControl'
import LoadingIndicator from '../../../lib/react-components/LoadingIndicator'

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
							getPopUpTriggerClassName={parameter => {
								return `ca-bg-transparent ${HOVER_CLASSNAME} ${parameter.allSelected ? '' : 'active'}`
							}}
						/>
					</div>
					<div className='ca-csv-filter-app__header__bar__right'>
						<TextSearchForm
							className={`${HOVER_CLASSNAME} ${this.props.textSearchValue ? 'active': ''}`}
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
				{this.props.pageEntries.map(entry => {
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
				{this.props.pages.length > 1 ? <PaginationControl
					hasPreviousPage={this.props.hasPreviousPage}
					hasNextPage={this.props.hasNextPage}
					pages={this.props.pages}
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
				/> : null}
			</footer>
		</div>
	}
}

App.propTypes = {
	parameters: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
	const matchingEntries = getMatchingEntries(state)
	const paginationData = getPaginationData(state, matchingEntries)
	paginationData.pageEntries = paginationData.pageEntries.map(getEntryOutputData.bind(null, state))

	return {
		applicationConfig: state.applicationConfig,
		textSearchValue: state.query.textSearchValue,
		loadingState: state.loadingState,
		parameters: getFilterParameters(state),
		...paginationData,
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

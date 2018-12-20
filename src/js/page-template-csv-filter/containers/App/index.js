import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
	queryDefineParameters,
	querySelectParameterOption,
	queryDeselectParameterOption,
	querySelectParameterAllSelected,
	queryDeselectParameterAllSelected,
} from '../../reducers/query/actions'

import {
	loadCSV
} from '../../reducers/actions'

import Filter from '../../../lib/components/Filter'
import OutputCard from '../../../lib/components/OutputCard'

const mapOutputData = (applicationConfig, data) => {
	return {
		_id: data._id,
		heading: data[applicationConfig.outputHeadingColumn],
		subHeadings: applicationConfig.outputSubHeadingColumns.map(columnName => data[columnName]),
		description: data[applicationConfig.outputDescriptionColumn],
		url: data[applicationConfig.outputUrlColumn],
		buttonText: applicationConfig.outputButtonText,
		metadata: applicationConfig.outputMetadataColumns.map(columnName => data[columnName]),
		boldMetadata: applicationConfig.outputBoldMetadataColumns.map(columnName => data[columnName]),
		tags: data[applicationConfig.outputTagsColumn].split(';')
	}
}

const queryData = (applicationConfig, query, list) => {
	return list.filter(item => {
		return Object.keys(query).every(parameterId => {
			const parameterValues = query[parameterId]

			if (parameterValues.allSelected) {
				return true
			} else {
				return parameterValues.selected.some(parameterValue => {
					return item[parameterId] &&
								 item[parameterId].toLowerCase().includes(parameterValue.toLowerCase())
				})
			}
		})
	})
}

class App extends React.Component {

	componentDidMount() {
		this.props.queryDefineParameters(this.props.applicationConfig.parameters)
		this.props.loadCSV(this.props.applicationConfig.csvFile)
	}

	render() {
		return <div className='csv-filter'>
			<header className='csv-filter__header'>
				<Filter
					parameters={this.props.parameters}
					onParameterSelectAll={this.props.querySelectParameterAllSelected}
					onParameterDeselectAll={this.props.queryDeselectParameterAllSelected}
					onParameterChangeOption={(parameterId, listId, optionId, value) => {
						if (value) {
							this.props.querySelectParameterOption(parameterId, optionId)
						} else {
							this.props.queryDeselectParameterOption(parameterId, optionId)
						}
					}}
				/>
				<div
					className='loading-indicator'
					style={{
						display: this.props.loadingState === 'loading' ? 'block' : 'none'
					}}>
					{this.props.loadingState}
				</div>
			</header>
			<div className='csv-filter__body'>
				{this.props.entries.map(entry => {
					return <OutputCard key={entry._id} {...entry}/>
				})}
			</div>
		</div>
	}
}

App.propTypes = {
	parameters: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
	const applicationConfig = state.applicationConfig

	return {
		applicationConfig: state.applicationConfig,
		parameters: state.query.parameters.map(parameter => {
			const allSelectedValue = state.query.values[parameter.id].allSelected

			return {
				...parameter,
				allSelected: allSelectedValue,
				optionLists: parameter.optionLists.map(optionList => {
					return {
						...optionList,
						options: optionList.options.map(option => {
							return {
								...option,
								value: state.query.values[parameter.id].selected.indexOf(option.id) !== -1
							}
						})
					}
				})
			}
		}),
		loadingState: state.loadingState,
		entries: queryData(
			applicationConfig,
			state.query.values,
			state.entries
		).map(entry => mapOutputData(state.applicationConfig, entry)),
	}
}

const mapDispatchToProps = {
	queryDefineParameters,
	querySelectParameterAllSelected,
	queryDeselectParameterAllSelected,
	querySelectParameterOption,
	queryDeselectParameterOption,
	loadCSV,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

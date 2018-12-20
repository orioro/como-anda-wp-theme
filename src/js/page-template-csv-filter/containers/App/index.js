import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import parseConfig from '../../parse-config'
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

class App extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const config = parseConfig()

		this.props.queryDefineParameters(config.parameters)
		this.props.loadCSV(config.csvFile)
	}

	render() {
		return <div>
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
		</div>
	}
}

App.propTypes = {
	parameters: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
	return {
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
		entries: state.entries,
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

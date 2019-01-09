import React from 'react'
import PropTypes from 'prop-types'

import PopUp from '../PopUp'
import OptionsPanel from '../OptionsPanel'

const Filter = ({
	parameters,
	onParameterSelectAll,
	onParameterDeselectAll,
	onParameterChangeOption,
	popUpTriggerClassName
}) => {
	return <div className='ca-filter'>
		<ul>
			{parameters.map(parameter => {
				return <li key={parameter.id}>
					<PopUp
						label={parameter.label}
						triggerClassName={popUpTriggerClassName}
						render={() => {
							return <OptionsPanel
								{...parameter}
								onSelectAll={() => {
									onParameterSelectAll(parameter.id)
								}}
								onDeselectAll={() => {
									onParameterDeselectAll(parameter.id)
								}}
								onChangeOptionListOption={(listId, optionId, value) => {
									onParameterChangeOption(parameter.id, listId, optionId, value)
								}}
							/>
						}}
					/>
				</li>
			})}
		</ul>
	</div>
}

Filter.propTypes = {
	parameters: PropTypes.array.isRequired,
	onParameterSelectAll: PropTypes.func.isRequired,
	onParameterDeselectAll: PropTypes.func.isRequired,
	onParameterChangeOption: PropTypes.func.isRequired,
	popUpTriggerClassName: PropTypes.string,
}

export default Filter

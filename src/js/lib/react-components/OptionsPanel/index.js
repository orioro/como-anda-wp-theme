import React from 'react'
import PropTypes from 'prop-types'

import Option from '../Option'
import OptionList from '../OptionList'

const OptionsPanel = ({
	optionLists,
	allSelected,
	allSelectedLabel,
	onSelectAll,
	onDeselectAll,
	onChangeOptionListOption
}) => {
	return <div className='ca-options-panel'>
		<header>
			<Option
				id='_all'
				value={allSelected}
				label={allSelectedLabel || 'Todos'}
				onChange={value => {
					if (value) {
						onSelectAll()
					} else {
						onDeselectAll()
					}
				}}
			/>
		</header>
		<ul>
			{optionLists.map((list, index) => {
				return list.options.every(option => option.disabled) ? null : <li key={list.id || index}>
					<OptionList
						{...list}
						onChangeOption={(optionId, value) => {
							onChangeOptionListOption(list.id, optionId, value)
						}}
					/>
				</li>
			})}
		</ul>
	</div>
}

OptionsPanel.propTypes = {
	optionLists: PropTypes.array.isRequired,
	allSelected: PropTypes.bool.isRequired,
	allSelectedLabel: PropTypes.string,
	onSelectAll: PropTypes.func.isRequired,
	onDeselectAll: PropTypes.func.isRequired,
	onChangeOptionListOption: PropTypes.func.isRequired,
}

export default OptionsPanel

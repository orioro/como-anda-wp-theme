import React from 'react'
import PropTypes from 'prop-types'

import Option from '../Option'
import OptionList from '../OptionList'

const OptionsPanel = ({
	optionLists,
	allSelected,
	onSelectAll,
	onDeselectAll,
	onChangeOptionListOption
}) => {
	return <div className='ca-options-panel'>
		<header>
			<Option
				id='_all'
				value={allSelected}
				label='Todos'
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
			{optionLists.map(list => {
				return <li key={list.id}>
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
	onSelectAll: PropTypes.func.isRequired,
	onDeselectAll: PropTypes.func.isRequired,
	onChangeOptionListOption: PropTypes.func.isRequired,
}

export default OptionsPanel

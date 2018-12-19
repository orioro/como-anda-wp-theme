import React from 'react'
import PropTypes from 'prop-types'

const Option = ({ label, id, value, disabled, onChange }) => {
	return <label
		className='ca-option'
		title={label}>
		<input
			type='checkbox'
			disabled={disabled || false}
			onChange={e => {
				onChange(e.target.checked || false)
			}}
			checked={value || false}
		/>
		<span className='ca-option__label'>
			{label}
		</span>
	</label>
}

Option.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.bool.isRequired,
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
}

export default Option

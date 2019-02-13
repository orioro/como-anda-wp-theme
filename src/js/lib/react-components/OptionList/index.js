import React from 'react'
import PropTypes from 'prop-types'

import Option from '../Option'

class OptionList extends React.Component {
	constructor(props) {
		super(props)

		this.optionContainerRef = React.createRef()

		this.state = {
			optionContainerWidth: null
		}
	}
	
	render() {
		const { label, options, onChangeOption } = this.props

		return options.every(option => option.disabled) ? null : <div
			className='ca-option-list'>
			{label ? <h3>{label}</h3> : null}
			<ul
				ref={this.optionContainerRef}
				style={{
					width: this.state.optionContainerWidth || 'auto',
				}}>
				{options.map(option => {
					return <li key={option.id}>
						<Option
							{...option}
							onChange={value => {
								onChangeOption(option.id, value)
							}}
						/>
					</li>
				})}
			</ul>
		</div>
	}
}

OptionList.propTypes = {
	label: PropTypes.string,
	options: PropTypes.array.isRequired,
	onChangeOption: PropTypes.func.isRequired,
}

export default OptionList

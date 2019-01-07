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

	// /**
	//  * When flexbox items wrap in column mode, container does not grow its width
	//  * https://stackoverflow.com/questions/33891709/when-flexbox-items-wrap-in-column-mode-container-does-not-grow-its-width
	//  */
	// calculateOptionContainerWidth() {
	// 	const listItemElements = this.optionContainerRef.current.querySelectorAll('li')
	// 	const first = listItemElements[0]
	// 	const last = listItemElements[listItemElements.length - 1]
	// 	const firstRect = first.getBoundingClientRect()
	// 	const lastRect = last.getBoundingClientRect()

	// 	this.setState({
	// 		optionContainerWidth: lastRect.x + lastRect.width - firstRect.x
	// 	})
	// }

	// componentDidMount() {
	// 	this.calculateOptionContainerWidth()
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	if (this.props.options.length !== prevProps.options.length) {
	// 		this.calculateOptionContainerWidth()
	// 	}
	// }

	render() {
		const { label, options, onChangeOption } = this.props

		return <div
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

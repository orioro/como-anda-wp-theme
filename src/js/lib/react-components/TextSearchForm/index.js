import React from 'react'
import PropTypes from 'prop-types'

import SearchIcon from 'mdi-react/SearchIcon'
import CloseIcon from 'mdi-react/CloseIcon'

class TextSearchForm extends React.Component {
	constructor(props) {
		super(props)

		this.inputRef = React.createRef()
	}

	render() {
		const {
			value,
			label,
			onChange,
			onSubmit,
			className
		} = this.props

		return <form
			className={`ca-text-search-form ${className ? className : ''}`}
			onSubmit={e => {
				e.preventDefault()
				e.stopPropagation()
				
				onSubmit(this.inputRef.current.value)
			}}>
			<input
				name='search'
				type='text'
				ref={this.inputRef}
				value={value}
				onChange={e => {
					onChange(e.target.value)
				}}
				placeholder={label} />
			{value !== '' ? <button
				className='ca-text-search-form__cancel-button'
				type='button'
				onClick={() => {
					onChange('')
				}}>
				<CloseIcon />
			</button> : null}
			<button type='submit'>
				<SearchIcon />
			</button>
		</form>
	}
}

TextSearchForm.propTypes = {
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	className: PropTypes.stirng
}

export default TextSearchForm

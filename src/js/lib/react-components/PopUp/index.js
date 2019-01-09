import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { findDOMNode } from 'react-dom'

import ChevronDownIcon from 'mdi-react/ChevronDownIcon'

class PopUp extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			open: props.open || false,
		}

    this.mounted = false
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.handleDocumentKeydown = this.handleDocumentKeydown.bind(this)
    // this.handleWindowScroll = this.handleWindowScroll.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    document.addEventListener('click', this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)

    document.addEventListener('keydown', this.handleDocumentKeydown, false)
    // window.addEventListener('scroll', this.handleWindowScroll, false)
  }

  componentWillUnmount() {
    this.mounted = false
    document.removeEventListener('click', this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)
    document.removeEventListener('keydown', this.handleDocumentKeydown, false)
    // window.removeEventListener('scroll', this.handleWindowScroll, false)
  }

  // handleWindowScroll(event) {
  //   if (this.mounted) {
  //     if (this.state.open) {
  //       this.setState({ open: false })
  //     }
  //   }
  // }

  handleDocumentClick(event) {
    if (this.mounted) {
      if (!findDOMNode(this).contains(event.target)) {
        if (this.state.open) {
          this.setState({ open: false })
        }
      }
    }
  }

  handleDocumentKeydown(event) {
  	if (event.keyCode === 27) {
  		this.setState({ open: false })
  	}
  }

	render() {
    const { triggerClassName } = this.props

		return <div className={classnames({
				'ca-pop-up': true,
				open: this.state.open
			})}>
			<button
				className={`ca-pop-up__trigger ${triggerClassName ? triggerClassName : ''}`}
				onClick={() => this.setState({
					open: !this.state.open
				})}>
				<span>
					{this.props.label}
				</span>
				<ChevronDownIcon />
			</button>
			<div
				className='ca-pop-up__content-container'>
				{this.props.render()}
			</div>
		</div>
	}
}

PopUp.propTypes = {
	open: PropTypes.bool,
	label: PropTypes.string.isRequired,
	render: PropTypes.func.isRequired,
  triggerClassName: PropTypes.string,
}

export default PopUp

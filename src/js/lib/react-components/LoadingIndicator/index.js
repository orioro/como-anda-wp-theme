import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import RefreshIcon from 'mdi-react/RefreshIcon'

const LoadingIndicator = ({
	active
}) => {
	return <div
		className={classnames({
			'ca-loading-indicator': true,
			'active': active
		})}>
		<RefreshIcon />
	</div>
}

LoadingIndicator.propTypes = {
	active: PropTypes.bool.isRequired,
}

export default LoadingIndicator

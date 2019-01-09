import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon'
import ChevronRightIcon from 'mdi-react/ChevronRightIcon'

const PaginationControl = ({
	hasPreviousPage,
	hasNextPage,
	pages,
	currentPageIndex,
	onClickPrevious,
	onClickNext,
	onClickPage,

	buttonClassName,
}) => {
	return <div className='ca-pagination-control'>
		<button
			className={classnames({
				[buttonClassName]: buttonClassName ? true : false,
				'ca-pagination-control__previous': true,
				enabled: hasPreviousPage,
			})}
			onClick={onClickPrevious}>
			<ChevronLeftIcon />
		</button>
		{pages.map(targetPageIndex => {
			return <button
				key={targetPageIndex}
				className={classnames({
					[buttonClassName]: buttonClassName ? true : false,
					'ca-pagination-control__page': true,
					active: currentPageIndex === targetPageIndex
				})}
				onClick={() => {
					onClickPage(targetPageIndex)
				}}>
				{targetPageIndex + 1}
			</button>
		})}
		<button
			className={classnames({
				[buttonClassName]: buttonClassName ? true : false,
				'ca-pagination-control__next': true,
				enabled: hasNextPage,
			})}
			onClick={onClickNext}>
			<ChevronRightIcon />
		</button>
	</div>
}

PaginationControl.propTypes = {
	hasPreviousPage: PropTypes.bool.isRequired,
	hasNextPage: PropTypes.bool.isRequired,
	pages: PropTypes.array.isRequired,
	currentPageIndex: PropTypes.number.isRequired,
	onClickPrevious: PropTypes.func.isRequired,
	onClickNext: PropTypes.func.isRequired,
	onClickPage: PropTypes.func.isRequired,

	buttonClassName: PropTypes.string,
}

export default PaginationControl

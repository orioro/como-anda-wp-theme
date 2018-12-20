import React from 'react'
import PropTypes from 'prop-types'

const OutputCard = ({
	heading,
	subHeadings,
	description,
	url,
	buttonText,
	metadata,
	boldMetadata,
	tags
}) => {
	return <div className='ca-output-card'>
		<div className='ca-output-card__main'>
			{heading ? <h2 className='ca-output-card__main__heading'>
				{heading}
			</h2> : null}

			{subHeadings ? subHeadings.map((subHeading, index) => (subHeading ? <h3
				key={index}
				className='ca-output-card__main__subheading'>
				{subHeading}
			</h3> : null)) : null }

			{description ? <div className='ca-output-card__main__description'>
				{description}
			</div> : null}

			{url && buttonText ? <a
				className='ca-output-card__main__button'
				href={url}>
				{buttonText}
			</a> : null}
		</div>
		<div className='ca-output-card__side'>
			{metadata ? <ul className='ca-output-card__side__metadata'>
				{metadata.map((data, index) => data ? <li key={index}>{data}</li> : null)}
			</ul> : null}

			{boldMetadata ? <ul className='ca-output-card__side__metadata ca-output-card__side__metadata--bold'>
				{boldMetadata.map((data, index) => data ? <li key={index}>{data}</li> : null)}
			</ul> : null}

			{tags ? <ul className='ca-output-card__side__tags'>
				{tags.map((tag, index) => (tag ? <li
					key={index}
					onClick={e => {alert('clicke tag')}}>
					{tag}
				</li> : null))}
			</ul> : null}
		</div>
	</div>
}

OutputCard.propTypes = {
	heading: PropTypes.string,
	subHeadings: PropTypes.array,
	description: PropTypes.string,
	url: PropTypes.string,
	buttonText: PropTypes.string,
	metadata: PropTypes.array,
	boldMetadata: PropTypes.array,
	tags: PropTypes.array,
}

export default OutputCard

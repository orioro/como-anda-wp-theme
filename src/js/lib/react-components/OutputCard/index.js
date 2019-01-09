import React from 'react'
import PropTypes from 'prop-types'
import Highlighter from 'react-highlight-words'
import classnames from 'classnames'

const MaybeHighlightedText = ({
  highlightWords,
  text
}) => {
  const shouldHighlight = highlightWords && highlightWords.every(word => {
    return word.length > 3
  })
  
  return shouldHighlight ? <Highlighter
    highlightClassName='ca-output-card__search-highlight'
    searchWords={highlightWords}
    autoEscape={true}
    textToHighlight={text}
  /> : text
}

const OutputCard = ({
	heading,
	subHeadings,
	description,
  linkButtons,
	metadata,
	boldMetadata,
	tags,
  tagClassName,
  onTagClick,
  highlightWords
}) => {
  const renterLinkButtonList = () => {
    return linkButtons && linkButtons.length > 0 ? <ul className='ca-output-card__link-button-list'>
      {linkButtons.map(({ buttonText, url }, index) => {
        return buttonText && url ? <li key={index}>
          <a
            target='_blank'
            href={url}>
            {buttonText}
          </a>
        </li> : null
      })}
    </ul> : null
  }

	return <div className='ca-output-card'>
    {heading ? <h2 className='ca-output-card__heading'>
      <MaybeHighlightedText
        highlightWords={highlightWords}
        text={heading}
      />
    </h2> : null}
    <div className='ca-output-card__body'>

  		<div className='ca-output-card__body__main'>
  			{subHeadings && subHeadings.length > 0 ? subHeadings.map((subHeading, index) => (subHeading ? <h3
  				key={index}
  				className='ca-output-card__body__main__subheading'>
          <MaybeHighlightedText
            highlightWords={highlightWords}
            text={subHeading}
          />
  			</h3> : null)) : null }

  			{description ? <div className='ca-output-card__body__main__description'>
          <MaybeHighlightedText
            highlightWords={highlightWords}
            text={description}
          />
  			</div> : null}

        {renterLinkButtonList()}
  		</div>
  		<div className='ca-output-card__body__side'>
  			{metadata && metadata.length > 0 ? <ul className='ca-output-card__body__side__metadata'>
  				{metadata.map((data, index) => {
            return data ? <li key={index}>
              <MaybeHighlightedText
                highlightWords={highlightWords}
                text={data}
              />
            </li> : null
          })}
  			</ul> : null}

  			{boldMetadata && boldMetadata.length > 0 ? <ul className='ca-output-card__body__side__metadata ca-output-card__body__side__metadata--bold'>
  				{boldMetadata.map((data, index) => {
            return data ? <li key={index}>
              <MaybeHighlightedText
                highlightWords={highlightWords}
                text={data}
              />
            </li> : null
          })}
  			</ul> : null}

  			{tags && tags.length > 0 ? <ul className='ca-output-card__body__side__tags'>
  				{tags.map((tag, index) => (tag ? <li
  					key={index}
            className={classnames({
              [tagClassName]: tagClassName ? true : false,
              'ca-bg-gray-dark': true
            })}
  					onClick={e => {
              onTagClick(tag)
            }}>
            <MaybeHighlightedText
              highlightWords={highlightWords}
              text={tag}
            />
  				</li> : null))}
  			</ul> : null}

        {renterLinkButtonList()}
  		</div>
    </div>
	</div>
}

OutputCard.propTypes = {
	heading: PropTypes.string,
	subHeadings: PropTypes.array,
	description: PropTypes.string,
  linkButtons: PropTypes.array,
	metadata: PropTypes.array,
	boldMetadata: PropTypes.array,
	tags: PropTypes.array,
  tagClassName: PropTypes.string,
  onTagClick: PropTypes.func.isRequired,
  highlightWords: PropTypes.array,
}

export default OutputCard

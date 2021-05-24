import React from 'react'
import PropTypes from 'prop-types'

const QuickRepliesList = (props) => {
    const {
      message,
      onQuickReplyClicked,
      verticalQuickReplies
    } = props

    return (
      <div
        className={
          `sc-quick-replies-block ${
            verticalQuickReplies ? 'vertical' : ''
          } ${(message.quickReplies && message.quickReplies.length > 0) ? 'visible' : 'hidden'}`
        }
      >
        <div className={`sc-quick-replies ${verticalQuickReplies ? 'vertical' : ''}`}>
          {message.quickReplies.map((qr, i) => (
            <div key={i} className={`sc-quick-reply ${verticalQuickReplies ? 'vertical' : ''}`}>
              <button
                key={i}
                className="sc-quick-reply-button"
                onClick={() => onQuickReplyClicked(qr)}
              >
                <p>
                  {qr.data[qr.type]}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>
    )
}

QuickRepliesList.propTypes = {
  message: PropTypes.object,
  onQuickReplyClicked: PropTypes.func,
  verticalQuickReplies: PropTypes.bool
}

QuickRepliesList.defaultProps = {
  message: [],
  onQuickReplyClicked: () => {},
}

export default QuickRepliesList

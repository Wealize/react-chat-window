import React from 'react'
import PropTypes from 'prop-types'

const QuickRepliesList = (props) => {
    const {
      message,
      onQuickReplyClicked
    } = props

    return (
      <div className={['sc-quick-replies-block', (message.quickReplies ? 'visible' : 'hidden')].join(' ')}>
        <div className='sc-quick-replies'>
          {message.quickReplies.map((qr, i) => (
            <div key={i} className='sc-quick-reply'>
              <button
                key={i}
                className="sc-quick-reply-button"
                onClick={() => onQuickReplyClicked(qr)}
              >
                {qr.data[qr.type]}
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
}

QuickRepliesList.defaultProps = {
  message: [],
  onQuickReplyClicked: () => {},
}

export default QuickRepliesList

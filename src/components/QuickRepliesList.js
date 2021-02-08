import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuickRepliesList extends Component {
  render() {
    const classList = [
      'sc-quick-replies-block',
      (this.props.quickReplies ? 'visible' : 'hidden')
    ];

    return (
      <div className={classList.join(' ')}>
        <div className='sc-quick-replies'>
          {this.props.quickReplies.map((qr, i) => (
            <div key={i} className='sc-quick-reply'>
              <button
                key={i}
                className="sc-quick-reply-button"
                onClick={() => this.props.onQuickReplyClicked(qr)}
              >
                {qr.data[qr.type]}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

QuickRepliesList.propTypes = {
  quickReplies: PropTypes.arrayOf(PropTypes.object),
  onQuickReplyClicked: PropTypes.func,
};

QuickRepliesList.defaultProps = {
  quickReplies: [],
  onQuickReplyClicked: () => {},
};

export default QuickRepliesList;

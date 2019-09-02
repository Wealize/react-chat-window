import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuickRepliesList extends Component {
  render() {
    const classList = [
      'sc-quick-replies',
      (this.props.quickReplies ? 'visible' : 'hidden')
    ];

    return (
      <div className={classList.join(' ')}>
        {this.props.quickReplies.map((qr, i) => (
          <button
            key={i}
            className="sc-quick-reply"
            onClick={() => this.props.onQuickReplyClicked(qr)}
          >
            {qr.data[qr.type]}
          </button>
        ))}
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

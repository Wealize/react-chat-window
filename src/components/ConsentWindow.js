import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header';
import ConsentBody from './ConsentBody';


class ConsentWindow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classList = [
      'sc-chat-window',
      (this.props.isOpen ? 'opened' : 'closed')
    ];

    return (
      <div className={classList.join(' ')}>
        <Header
          teamName={this.props.agentProfile.teamName}
          imageUrl={this.props.agentProfile.imageUrl}
          onClose={this.props.onClose}
        />

        <ConsentBody />

        <div>
          <a className="consent-window green"
            href=""
            onClick={this.props.onConsent}>Yes</a>
          <a className="consent-window red"
            href=""
            onClick={this.props.onClose}>No</a>
        </div>
      </div>
    );
  }
}

ConsentWindow.propTypes = {
  agentProfile: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConsent: PropTypes.func.isRequired
};

export default ConsentWindow;

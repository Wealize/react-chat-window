import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import ConsentWindow from './ConsentWindow';
import launcherIcon from './../assets/logo-no-bg.svg';
import incomingMessageSound from './../assets/sounds/notification.mp3';
import launcherIconActive from './../assets/close-icon.png';
import { DEFAULT_WELCOME_MESSAGE } from './../constants';

class Launcher extends Component {

  constructor() {
    super();
    this.state = {
      launcherIcon,
      isOpen: false,
      hideConsent: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mute) { return; }
    const nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
    const isIncoming = (nextMessage || {}).author === 'them';
    const isNew = nextProps.messageList.length > this.props.messageList.length;
    if (isIncoming && isNew) {
      this.playIncomingMessageSound();
    }
  }

  playIncomingMessageSound() {
    var audio = new Audio(incomingMessageSound);
    audio.play();
  }

  handleClick() {
    if (this.shouldShowWelcomeMessage()) this.showWelcomeMessage();

    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  shouldShowWelcomeMessage() {
    return !this.state.isOpen && this.props.messageList.length == 0 ;
  }

  shouldShowConsent() {
    return this.props.messageList.length == 0 && !this.state.hideConsent;
  }

  showWelcomeMessage() {
    // I'd say this is the cleanest way and
    // we'll need to specify welcome message depending on locale,
    // but the chat doesn't support locales right now
    this.props.onMessageWasSent(DEFAULT_WELCOME_MESSAGE);
  }

  handleConsent(e) {
    e.preventDefault();
    this.setState({hideConsent: true});
  }

  render() {
    const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
    const classList = [
      'sc-launcher',
      (isOpen ? 'opened' : ''),
    ];

    return (
      <div id="sc-launcher">
        <div className={classList.join(' ')} onClick={this.handleClick.bind(this)}>
          <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
          <img className={'sc-open-icon'} src={launcherIconActive} />
          <img className={'sc-closed-icon'} src={launcherIcon} />
        </div>

        { this.shouldShowConsent() ?
          (
            <ConsentWindow
              agentProfile={this.props.agentProfile}
              isOpen={isOpen}
              onClose={this.handleClick.bind(this)}
              onConsent={this.handleConsent.bind(this)}
            />
          ) : (
            <ChatWindow
              messageList={this.props.messageList}
              onUserInputSubmit={this.props.onMessageWasSent}
              onFilesSelected={this.props.onFilesSelected}
              agentProfile={this.props.agentProfile}
              isOpen={isOpen}
              onClose={this.handleClick.bind(this)}
              showEmoji={this.props.showEmoji}
            />
          )
        }
      </div>
    );
  }
}

const MessageCount = (props) => {
  if (props.count === 0 || props.isOpen === true) { return null; }
  return (
    <div className={'sc-new-messages-count'}>
      {props.count}
    </div>
  );
};

Launcher.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  mute: PropTypes.bool,
  showEmoji: PropTypes.bool,
};

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true
};

export default Launcher;

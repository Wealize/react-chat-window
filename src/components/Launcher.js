import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'

import launcherIcon from './../assets/logo-no-bg.svg'
import incomingMessageSound from './../assets/sounds/notification.mp3'
import launcherIconActive from './../assets/close-icon.png'

import usePrevious from '../helpers/usePrevious'
import ChatWindow from './ChatWindow'
import ConsentWindow from './ConsentWindow'
import MessageCount from './MessageCount'



const Launcher = (props) => {
  const [isOpen, setIsOpen] = useState(props.isOpen)
  const [hideConsent, setHideConsent] = useState(false)
  const previousMessageList = usePrevious(props.messageList)

  useEffect(() => {
    if (shouldShowWelcomeMessage()) {
      props.showWelcomeMessage()
      props.showStartButton()
    }
  }, [])

  useEffect(() => {
    if (props.mute || previousMessageList === undefined) {
      return
    }

    const nextMessage = props.messageList[props.messageList.length - 1]
    const isIncoming = (nextMessage || {}).author === 'them'
    const isNew = props.messageList.length > previousMessageList.length

    if (isIncoming && isNew) {
      playIncomingMessageSound()
    }

  }, [props.messageList])

  const playIncomingMessageSound = () => {
    var audio = new Audio(incomingMessageSound)
    audio.play()
  }

  const handleOnClose = () => {
    setIsOpen(!isOpen)
    if (props.handleClick) {
      props.handleClick()
    }
  }

  const handleScrollDown = () => {
    props.handleReadMessages()
  }

  const shouldShowWelcomeMessage = () => {
    return (isOpen || props.isWebView) && props.messageList.length === 0
  }

  const shouldShowConsent = () => {
    return (
      props.agentProfile.requireConsentFromUser &&
      props.messageList.length == 0 &&
      !hideConsent
    )
  }
  
  const shouldShowMessageCount = () => {
    return props.newMessagesCount > 0
  }

  const handleConsent = (e) => {
    e.preventDefault();
    setHideConsent(true)
  }

  return (
    <div id="sc-launcher">
      <div
        className={`sc-launcher ${isOpen ? 'opened' : ''}`}
        onClick={handleOnClose}
      >
        {shouldShowMessageCount() &&
          <MessageCount
            count={props.newMessagesCount}
          />
        }
        <img
          className='sc-open-icon'
          src={launcherIconActive}
        />
        <img
          className='sc-closed-icon'
          src={launcherIcon}
        />
      </div>

      {shouldShowConsent() ?
        (
          <ConsentWindow
            agentProfile={props.agentProfile}
            isOpen={isOpen}
            onClose={handleOnClose}
            onConsent={handleConsent}
          />
        ) : (
          <ChatWindow
            agentProfile={props.agentProfile}
            count={props.newMessagesCount}
            handleScrollDown={handleScrollDown}
            hideUserInputWithQuickReplies={props.hideUserInputWithQuickReplies}
            isOpen={isOpen}
            isWebView={props.isWebView}
            messageList={props.messageList}
            onClose={handleOnClose}
            onFilesSelected={props.onFilesSelected}
            onUserInputSubmit={props.onMessageWasSent}
            showEmoji={props.showEmoji}
            showFileIcon={props.showFileIcon}
          />
        )
      }
    </div>
  )
}


Launcher.propTypes = {
  handleClick: PropTypes.func,
  handleReadMessages: PropTypes.func,
  hideUserInputWithQuickReplies: PropTypes.bool,
  isOpen: PropTypes.bool,
  isWebView: PropTypes.bool,
  messageList: PropTypes.arrayOf(PropTypes.object),
  mute: PropTypes.bool,
  newMessagesCount: PropTypes.number,
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  showEmoji: PropTypes.bool,
  showFileIcon: PropTypes.bool,
  showStartButton: PropTypes.func,
  showWelcomeMessage: PropTypes.func
}

Launcher.defaultProps = {
  hideUserInputWithQuickReplies: false,
  isOpen: false,
  isWebView: false,
  newMessagesCount: 0,
  showEmoji: true,
  showFileIcon: true
}

export default Launcher

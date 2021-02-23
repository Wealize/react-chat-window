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
      showWelcomeMessage()
      showStartButton()
    }
  }, [])

  useEffect(() => {
    console.log(previousMessageList)
    if (props.mute || previousMessageList === undefined) {
      return
    }

    const nextMessage = props.messageList[props.messageList.length - 1]
    const isIncoming = (nextMessage || {}).author === 'them'
    const isNew = props.messageList.length > previousMessageList.length

    console.log(isIncoming)
    console.log(isNew)

    if (isIncoming && isNew) {
      playIncomingMessageSound()
    }

  }, [props.messageList])

  const playIncomingMessageSound = () => {
    var audio = new Audio(incomingMessageSound)
    audio.play()
  }

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const shouldShowWelcomeMessage = () => {
    return (!isOpen || props.isWebView) && props.messageList.length === 0
  }

  const shouldShowConsent = () => {
    return (
      props.agentProfile.requireConsentFromUser &&
      props.messageList.length == 0 &&
      !hideConsent
    )
  }
  
  const shouldShowMessageCount = () => {
    return props.newMessagesCount > 0 && !isOpen
  }

  const handleConsent = (e) => {
    e.preventDefault();
    setHideConsent(true)
  }

  return (
    <div id="sc-launcher">
      <div
        className={`sc-launcher ${isOpen ? 'opened' : ''}`}
        onClick={handleClick}
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
            onClose={handleClick}
            onConsent={handleConsent}
          />
        ) : (
          <ChatWindow
            messageList={props.messageList}
            onUserInputSubmit={props.onMessageWasSent}
            onFilesSelected={props.onFilesSelected}
            agentProfile={props.agentProfile}
            isOpen={isOpen}
            isWebView={props.isWebView}
            onClose={handleClick}
            showEmoji={props.showEmoji}
            showFileIcon={props.showFileIcon}
            hideUserInputWithQuickReplies={props.hideUserInputWithQuickReplies}
          />
        )
      }
    </div>
  )
}


Launcher.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  isWebView: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  mute: PropTypes.bool,
  showEmoji: PropTypes.bool,
  showFileIcon: PropTypes.bool,
  showWelcomeMessage: PropTypes.func,
  hideUserInputWithQuickReplies: PropTypes.bool,
  showStartButton: PropTypes.func
}

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true,
  showFileIcon: true,
  hideUserInputWithQuickReplies: false,
  isOpen: false,
  isWebView: false
}

export default Launcher

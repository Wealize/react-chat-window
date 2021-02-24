import PropTypes from 'prop-types';
import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';
import QuickRepliesList from './QuickRepliesList';


const ChatWindow = (props) => {
  const {
    messageList,
    agentProfile,
    isOpen,
    isWebView,
    onClose,
    showEmoji,
    showFileIcon,
    onUserInputSubmit,
    onFilesSelected,
    hideUserInputWithQuickReplies,
  } = props


  const getLastMessage = () => {
    if (!messageList) {
      return null
    }

    return messageList[
      messageList.length - 1
    ]
  }

  const isLastMessageQuickReply = () => {
    let lastMessage = getLastMessage()

    if (lastMessage === null || lastMessage === undefined) {
      return false
    } else if (lastMessage.quickReplies === undefined || lastMessage.quickReplies === null) {
      return false
    } else {
      return true
    }
  }

  const isInputHidden = () => {
    let lastMessage = getLastMessage()

    if (lastMessage === null) {
      return false
    }

    return (
      hideUserInputWithQuickReplies &&
      lastMessage &&
      lastMessage.quickReplies &&
      lastMessage.quickReplies.length > 0
    )
  }

  return (
    <div className={`sc-chat-window ${(isOpen || isWebView) ? 'opened' : 'closed'}`}>
      <Header
        teamName={agentProfile.teamName}
        imageUrl={agentProfile.imageUrl}
        onClose={onClose}
        showCloseButton={!isWebView}
      />
      <MessageList
        messages={messageList}
        icon={agentProfile.imageUrl}
      />

      {isLastMessageQuickReply() && (
        <QuickRepliesList
          message={getLastMessage()}
          onQuickReplyClicked={onUserInputSubmit}
        />
      )}
      {!isInputHidden() && (
        <UserInput
          onSubmit={onUserInputSubmit}
          onFilesSelected={onFilesSelected}
          showEmoji={showEmoji}
          showFileIcon={showFileIcon}
        />
      )}
    </div>
  )
}

ChatWindow.propTypes = {
  messageList: PropTypes.array,
  agentProfile: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isWebView: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
  showFileIcon: PropTypes.bool,
  hideUserInputWithQuickReplies: PropTypes.bool
}

ChatWindow.defaultProps = {
  messageList: [],
  isWebView: false
}

export default ChatWindow

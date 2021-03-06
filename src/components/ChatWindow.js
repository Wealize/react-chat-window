import PropTypes from 'prop-types';
import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';
import QuickRepliesList from './QuickRepliesList';


const ChatWindow = (props) => {
  const {
    agentProfile,
    count,
    handleScrollDown,
    hideUserInputWithQuickReplies,
    isOpen,
    isWebView,
    messageList,
    onClose,
    onFilesSelected,
    onUserInputSubmit,
    showEmoji,
    showFileIcon,
    verticalQuickReplies
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
    }
    
    if (lastMessage.quickReplies && lastMessage.quickReplies.length > 0) {
      return true
    } else {
      return false
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
        teamExplanation={agentProfile.teamExplanation}
        onClose={onClose}
        showCloseButton={!isWebView}
      />
      <MessageList
        count={count}
        handleScrollDown={handleScrollDown}
        messages={messageList}
      />

      {isLastMessageQuickReply() && (
        <QuickRepliesList
          message={getLastMessage()}
          onQuickReplyClicked={onUserInputSubmit}
          verticalQuickReplies={verticalQuickReplies}
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
  agentProfile: PropTypes.object.isRequired,
  count: PropTypes.number,
  handleScrollDown: PropTypes.func,
  hideUserInputWithQuickReplies: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  isWebView: PropTypes.bool,
  messageList: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
  showFileIcon: PropTypes.bool,
  verticalQuickReplies: PropTypes.bool
}

ChatWindow.defaultProps = {
  messageList: [],
  isWebView: false
}

export default ChatWindow

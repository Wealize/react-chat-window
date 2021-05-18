import React, { useEffect, useRef } from 'react';

import Message from './Messages';


const MessageList = (props) => {
  const {
    count,
    handleScrollDown,
    messages
  } = props

  const divRef = useRef()

  useEffect(() => {
    if (count === 0 || count === 1) {
      const idLastMessage = messages.length - 1
      const element = document.getElementById(`message-${idLastMessage}`)

      if (divRef && element) {
        divRef.current.scrollTop = element.offsetTop + element.offsetHeight
      }
    } else if (count > 1){
      var offset = 0

      for (var i = 0; i < count; i++) {
        offset += document.getElementById(`message-${messages.length - 1 - i}`).offsetHeight + 8
      }

      if (divRef) {
        divRef.current.scrollTop = divRef.current.scrollTopMax - offset
      }
    }
  }, [props])

  const isLastMessageQuickReply = () => {
    let lastMessage = messages[messages.length - 1]

    if (lastMessage === null || lastMessage === undefined) {
      return false
    }

    if (lastMessage.quickReplies && lastMessage.quickReplies.length > 0) {
      return true
    } else {
      return false
    }
  }

  return (
      <div
        className={`sc-message-list ${isLastMessageQuickReply() ? 'quick-reply' : ''}`}
        onScroll={(e) => {
          if (count > 0 && e.currentTarget.scrollTop === (e.currentTarget.scrollHeight - e.currentTarget.offsetHeight)) {
            handleScrollDown()
          }
        }}
        ref={divRef}
      >
        {messages.map((message, i) => {
          return <Message
            key={i}
            messageId={i}
            message={message}
          />
        })}
      </div>
  )
}

export default MessageList

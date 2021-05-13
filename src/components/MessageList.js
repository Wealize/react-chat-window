import React, { useEffect, useRef, useState } from 'react';

import Message from './Messages';


const MessageList = (props) => {
  const {
    count,
    handleScrollDown,
    messages
  } = props

  const [firstTime, setFirstTime] = useState(false)
  const divRef = useRef()

  useEffect(() => {
    const idLastMessage = messages.length - 1
    var element = document.getElementById(`message-${idLastMessage}`)

    if (count === 0 || count === 1 || firstTime === false) {
      setFirstTime(true)
      divRef.current.scrollTop = element.offsetTop + element.offsetHeight
    } else if (count > 1) {
      if (messages[idLastMessage].author === 'me') {
        divRef.current.scrollTop = element.offsetTop + element.offsetHeight
      }
    }
  }, [props])

  const isLastMessageQuickReply = () => {
    let lastMessage = messages[messages.length - 1]

    if (lastMessage === null || lastMessage === undefined) {
      return false
    } else if (lastMessage.quickReplies === undefined || lastMessage.quickReplies === null) {
      return false
    } else {
      return true
    }
  }

  return (
      <div
        className={`sc-message-list ${isLastMessageQuickReply() && 'quick-reply'}`}
        onScroll={(e) => {
          if (count > 1 && firstTime === true && divRef.current.scrollTop === divRef.current.scrollTopMax) {
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

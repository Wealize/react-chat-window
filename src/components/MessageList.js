import React, { useEffect, useRef, useState } from 'react';

import Message from './Messages';


const MessageList = (props) => {
  const {
    count,
    handleScrollDown,
    messages
  } = props

  const divRef = useRef()
  const [firstTime, setFirstTime] = useState(false)

  useEffect(() => {
    if ((count === 0 || count === 1) && firstTime === false) {
      const idLastMessage = messages.length - 1
      const element = document.getElementById(`message-${idLastMessage}`)

      if (divRef && element) {
        divRef.current.scrollTop = element.offsetTop + element.offsetHeight
      }

      setFirstTime(true)
    } else if (count > 1 && firstTime === false){
      var offset = 0

      for (var i = 0; i < count; i++) {
        offset += document.getElementById(`message-${messages.length - 1 - i}`).offsetHeight + 8
      }

      if (divRef) {
        divRef.current.scrollTop = divRef.current.scrollTopMax - offset
      }

      setFirstTime(true)
    }
    else if ((count === 0 || count === 1) && firstTime === true) {
      const idLastMessage = messages.length - 1
      const element = document.getElementById(`message-${idLastMessage}`)

      if (divRef && element) {
        divRef.current.scrollTop = element.offsetTop + element.offsetHeight
      }
    }
    else if (count > 1 && firstTime === true) {
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
          if (count > 1 && firstTime === true && e.currentTarget.scrollTop === e.currentTarget.scrollTopMax) {
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

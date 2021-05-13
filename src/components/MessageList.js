import React, { useEffect, useRef, useState } from 'react';
import Message from './Messages';


const MessageList = (props) => {
  const [firstTime, setFirstTime] = useState(false)
  const divRef = useRef()

  // useEffect(() => {
  //   const idLastMessage = props.messages.length - 1

  //   var element = document.getElementById(`message-${idLastMessage}`)

  //   if (firstTime === false) {
  //     divRef.current.scrollTop = element.offsetTop + element.offsetHeight + 100
  //     setFirstTime(true)
  //   }
  // }, [])

  useEffect(() => {
    const idBeforeLastMessage = props.messages.length - 2
    const idLastMessage = props.messages.length - 1
    var element = document.getElementById(`message-${idLastMessage}`)

    if (firstTime === false) {
      if (divRef.current.scrollTop !== divRef.current.scrollHeight) {
        divRef.current.scrollTop = element.offsetTop + element.offsetHeight + 100
        setFirstTime(true)
      }
    }

    const beforeLastMessage = props.messages[idBeforeLastMessage]
    console.log(beforeLastMessage)
    const lastMessage = props.messages[idLastMessage]

    if (lastMessage.author === 'me') {
      if (divRef.current.scrollTop !== divRef.current.scrollHeight) {
        divRef.current.scrollTop = element.offsetTop + element.offsetHeight + 100
      }
    }

    if (lastMessage.author === 'them' && beforeLastMessage.author === 'me') {
      if (divRef.current.scrollTop !== divRef.current.scrollHeight) {
        divRef.current.scrollTop = element.offsetTop + element.offsetHeight + 100
      }
    }


  }, [props])


  return (
      <div id='meow' className="sc-message-list" ref={divRef}>
        {props.messages.map((message, i) => {
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

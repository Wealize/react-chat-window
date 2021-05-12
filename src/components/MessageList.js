import React, { useEffect, useState } from 'react';
import Message from './Messages';


const MessageList = (props) => {
  const [scrollList, setScrollList] = useState(null)

  useEffect(() => {
    if (scrollList !== null && scrollList.scrollTop !== scrollList.scrollHeight) {
      const last = props.messages[props.messages.length - 1]
      const oneLast = props.messages[props.messages.length - 2]
      
      if (last.author !== 'them') {
        scrollList.scrollTop = scrollList.scrollHeight
        setScrollList({
          ...scrollList,
          scrollTop: scrollList.scrollHeight
        })
      }

      if (oneLast.author === 'me' && last.author === 'them') {
        scrollList.scrollTop = scrollList.scrollHeight
        setScrollList({
          ...scrollList,
          scrollTop: scrollList.scrollHeight
        })
      }
    }
  }, [props])

  return (
      <div className="sc-message-list" ref={el => setScrollList(el)}>
        {props.messages.map((message, i) => {
          return <Message
            key={i}
            message={message}
          />
        })}
      </div>
  )
}

export default MessageList

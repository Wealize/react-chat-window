import React, { useEffect, useState } from 'react';
import Message from './Messages';


const MessageList = (props) => {
  const [scrollList, setScrollList] = useState(null)

  useEffect(() => {
    if (scrollList !== null && scrollList.scrollTop !== scrollList.scrollHeight) {
      scrollList.scrollTop = scrollList.scrollHeight
      setScrollList({
        ...scrollList,
        scrollTop: scrollList.scrollHeight
      })
    }
  }, [props.messages])

  return (
      <div className="sc-message-list" ref={el => setScrollList(el)}>
        {props.messages.map((message, i) => {
          return <Message message={message} key={i} />
        })}
      </div>
  )
}

export default MessageList

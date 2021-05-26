import React from 'react'

import TextMessage from './TextMessage'
import EmojiMessage from './EmojiMessage'
import FileMessage from './FileMessage'
import AudioMessage from './AudioMessage'
import VideoMessage from './VideoMessage'
import ImageMessage from './ImageMessage'

import ChatbotIcon from '../icons/ChatbotIcon'
import StaffIcon from '../icons/StaffIcon'


const Message = (props) => {
  const _renderMessageOfType = (type) => {
    switch(type) {
      case 'text':
        return <TextMessage {...props.message} />
      case 'emoji':
        return <EmojiMessage {...props.message} />
      case 'file':
        return <FileMessage {...props.message} />
      case 'image':
        return <ImageMessage {...props.message} />
      case 'video':
        return <VideoMessage {...props.message} />
      case 'audio':
        return <AudioMessage {...props.message} />
      default:
        console.error(`Attempting to load message with unsupported file type '${type}'`);
    }
  }

  const _renderIcon = (is_chatbot) => {
    // className="sc-message--avatar"
    return is_chatbot ? <ChatbotIcon /> : <StaffIcon />
  }

  return (
      <div className="sc-message" id={`message-${props.messageId}`}>
        <div className={`sc-message--content ${props.message.author === 'me' ? 'sent' : 'received'}`}>
          {props.message.author === 'them' && _renderIcon(props.message.is_chatbot)}
          {_renderMessageOfType(props.message.type)}
        </div>
      </div>
  )
}

export default Message

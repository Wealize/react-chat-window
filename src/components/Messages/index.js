import React from 'react';
import TextMessage from './TextMessage';
import EmojiMessage from './EmojiMessage';
import FileMessage from './FileMessage';
import AudioMessage from './AudioMessage';
import VideoMessage from './VideoMessage';
import ImageMessage from './ImageMessage';
import chatbotIcon from './../../assets/chatbot-icon.svg';


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

  return (
      <div className="sc-message">
        <div className={`sc-message--content ${props.message.author === 'me' ? 'sent' : 'received'}`}>
          {props.message.author === 'them' && <div 
            className="sc-message--avatar"
            style={{
              backgroundImage: `url(${chatbotIcon})`
            }}
          />}
          {_renderMessageOfType(props.message.type)}
        </div>
      </div>
  )
}

export default Message

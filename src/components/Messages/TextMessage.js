import React from 'react'
import MarkdownView from 'react-showdown'


const TextMessage = (props) => {
  return (
    <MarkdownView
      className="sc-message--text"
      markdown={props.data.text}
      options={{ simplifiedAutoLink: true, openLinksInNewWindow: true }}
      flavor={'github'}
    />
  )
}

export default TextMessage

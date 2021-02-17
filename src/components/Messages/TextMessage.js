import React from 'react'
import MarkdownView from 'react-showdown'


const TextMessage = (props) => {
  return (
    <div className="sc-message--text">
      <MarkdownView
        markdown={props.data.text}
        options={{ simplifiedAutoLink: true, openLinksInNewWindow: true }}
        flavor={'github'}
      />
    </div>
  )
}

export default TextMessage

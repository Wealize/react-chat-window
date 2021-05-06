import React from 'react'
import MarkdownView from 'react-showdown'


const TextMessage = (props) => {
  const removeParagraphs = () => {
    return [{
      type: 'output',
      filter: (text) => {
        return text.replace(/<\/?p[^>]*>/g, '')
      }
    }]
  }

  return (
    <MarkdownView
      className="sc-message--text"
      markdown={props.data.text}
      options={{ simplifiedAutoLink: true, openLinksInNewWindow: true }}
      flavor={'github'}
      extensions={removeParagraphs}
    />
  )
}

export default TextMessage

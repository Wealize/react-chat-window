# @wealize/react-chat-window

`@wealize/react-chat-window` provides an intercom-like chat window that can be included easily in any project for free. It provides no messaging facilities, only the view component.

![Version](https://img.shields.io/badge/version-1.4.4-blue)
<a href="https://www.npmjs.com/package/@wealize/react-chat-window" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/@wealize/react-chat-window" />
</a>
<br/>

## Table of Contents
- [Installation](#installation)
- [Example](#example)
- [Components](#components)
- [Objects](#objects)

## Installation

```
$ npm install @wealize/react-chat-window
$ yarn add @wealize/react-chat-window
```

## Example

``` javascript
import React, { Component } from 'react'
import { Launcher } from '@wealize/react-chat-window'

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false
    };
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message],
      newMessagesCount: 0
    });
  }

  _onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);

    this.setState({
      messageList: [...this.state.messageList, {
        type: 'file', author: 'me',
        data: {
          url: objectURL,
          fileName: fileList[0].name
        }
      }]
    });
  }

  _sendMessage(text) {
    if (text.length > 0) {
      const newMessagesCount = this.state.newMessagesCount + 1;
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          is_chatbot: true,
          data: { text }
        }]
      });
    }
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  _handleReadMessages () {
    this.setState({
      newMessagesCount: 0
    })
  }

  render() {
    return <div>
      <TestArea
        onMessage={this._sendMessage.bind(this)}
      />
      <Launcher
        agentProfile={{
          teamName: 'My bot',
          teamExplanation: 'A bot'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        onFilesSelected={this._onFilesSelected.bind(this)}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        handleReadMessages={this._handleReadMessages.bind(this)}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
        showEmoji
        showFileIcon
        verticalQuickReplies={true}
      />
    </div>;
  }
}
```

For more detailed examples see the demo folder.

## Components
### Launcher

`Launcher` is the only component needed to use react-chat-window. It will react dynamically to changes in messages. All new messages must be added via a change in props as shown in the example.

Launcher props:

|variable|type|required|description|
|:-------|:--:|:------:|:----------|
| `agentProfile` |[Agent profile object](###agent-profile-object)|yes|Represents your product or service's customer service agent. Fields: teamName (string), teamExplanation (string)|
| `handleClick` | `function` | yes | Intercept the click event on the launcher. No argument sent when function is called.|
| `handleReadMessages` | `function` | yes | Intercept the read messages event on the launcher. No argument sent when function is called.|
| `hideUserInputWithQuickReplies` | `boolean` | yes | Hides user input when there are quick replies. Defaults to `false`. |
| `isOpen` | `boolean` | yes | Force the open/close state of the chat window. If this is not set, it will open and close when clicked. |
| `isWebView` |`boolean`|no|Enable webchat for webview in apps. Defaults to `false`|
| `messageList` | `array of` [Message object](###message-objects) | yes | An array of message objects to be rendered as a conversation.|
| `mute` | `boolean` | no | Don't play sound for incoming messages. Defaults to `false`.|
| `newMessagesCount` | `number` | no | The number of new messages. If greater than 0, this number will be displayed in a badge on the launcher. Defaults to `0`.|
| `onFilesSelected`  | `function(`[fileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList)`)` | no | Called after file has been selected from dialogue in chat window.|
| `onMessageWasSent` | `function(`[Message object](###message-objects)`)`| yes | Called when a message is sent, with a message object as an argument.|
|`showEmoji`|`bool`|no|Whether or not to show the emoji button in the input bar. Defaults to `true`.|
|`showFileIcon`|`bool`|no|Whether or not to show the file button in the input bar. Defaults to `true`.|
| `showStartButton` | function | no | Called when we opened the chat and still does not contain any messages. |
| `showWelcomeMessage` | function | no | Called when we opened the chat and still does not contain any messages. |
| `verticalQuickReplies` |`boolean`|no| Quick replies in vertical mode| Defaults to `false`|



## Objects

### Message Objects

Message objects are rendered differently depending on their type. Currently, only text, file, emoji, image, video and audio types are supported. Each message object has an `author` field which can have the value 'me' or 'them'.

``` javascript
{
  author: 'them',
  type: 'text',
  is_chatbot: true,
  data: {
    text: 'some text'
  }
}

{
  author: 'me',
  type: 'emoji',
  is_chatbot: false,
  data: {
    code: 'someCode'
  }
}

{
  author: 'me',
  is_chatbot: false,
  type: 'file',
  data: {
    url: 'somefile.mp3',
    fileName: 'Any old name'
  }
}

{
  author: 'me',
  is_chatbot: false,
  type: 'image',
  data: {
    url: 'somefile.jpg'
  }
}

{
  author: 'me',
  is_chatbot: false,
  type: 'audio',
  data: {
    url: 'somefile.mp3',
  }
}

{
  author: 'me',
  is_chatbot: false,
  type: 'video',
  data: {
    url: 'somefile.mp4',
  }
}

{
  author: 'them',
  type: 'text',
  is_chatbot: true,
  data: {
    text: 'some text'
  },
  quickReplies: [
    {
      author: 'me',
      type: 'text',
      data: { text: 'A quick reply' }
    },
    {
      author: 'me',
      type: 'emoji',
      data: { emoji: '🤓' }
    }
  ]
}


```

### Agent Profile Object
```js
{
  teamName: 'Chatbot 🐱',
  teamExplanation: 'A chatbot'
}
```

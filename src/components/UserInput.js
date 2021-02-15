import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';
import FileIcon from './icons/FileIcon';
import EmojiIcon from './icons/EmojiIcon';
import PopupWindow from './popups/PopupWindow';
import EmojiPicker from './emoji-picker/EmojiPicker';


const UserInput = (props) => {
  const [input, setInput] = useState(null)
  const [inputActive, setInputActive] = useState(false)
  const [inputHasText, setInputHasText] = useState(false)
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false)
  const [emojiFilter, setEmojiFilter] = useState('')
  const [emojiPickerButton, setEmojiPickerButton] = useState(null)
  const [fileUploadButton, setFileUploadButton] = useState(null)

  const {
    onSubmit,
    onFilesSelected,
    showEmoji,
    showFileIcon
  } = props

  useState(() => {
    setEmojiPickerButton(
      document.querySelector('#sc-emoji-picker-button')
    )
  }, [])

  useState(() => {
    console.log(input)
  }, [input])

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      return _submitText(event)
    }
  }

  const handleKeyUp = (event) => {
    const hasText = event.target.innerHTML.length !== 0 &&
      event.target.innerText !== '\n'
    setInputHasText(hasText)
  }

  const _showFilePicker = () => {
    fileUploadButton.click()
  }

  const toggleEmojiPicker = (e) => {
    e.preventDefault()
    if (!emojiPickerIsOpen) {
      setEmojiPickerIsOpen(true)
    }
  }

  const closeEmojiPicker = (e) => {
    if (emojiPickerButton.contains(e.target)) {
      e.stopPropagation()
      e.preventDefault()
    }

    setEmojiPickerIsOpen(false)
  }

  const _submitText = (event) => {
    event.preventDefault()
    const text = input.textContent
    if (text && text.length > 0) {
      onSubmit({
        author: 'me',
        type: 'text',
        data: { text }
      })

      console.log('texto normal')

      setInput({
        ...input,
        innerHTML: ""
      })

      // this.userInput.innerHTML = ''
    }
  }

  const _onFilesSelected = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      onFilesSelected(event.target.files)
    }
  }

  const _handleEmojiPicked = (emoji) => {
    setEmojiPickerIsOpen(false)
    if (inputHasText) {
      setInput({
        ...input,
        innerHTML: input.innerHTML + emoji
      })
      console.log('con emoji')
      // this.userInput.innerHTML += emoji
    } else {
      onSubmit({
        author: 'me',
        type: 'emoji',
        data: { emoji }
      })
    }
  }

  const handleEmojiFilterChange = (event) => {
    setEmojiFilter(event.target.value)
  }

  const _renderEmojiPopup = () => (
    <PopupWindow
      isOpen={emojiPickerIsOpen}
      onClickedOutside={closeEmojiPicker}
      onInputChange={handleEmojiFilterChange}
    >
      <EmojiPicker
        onEmojiPicked={_handleEmojiPicked}
        filter={emojiFilter}
      />
    </PopupWindow>
  )

  const _renderSendOrFileIcon = () => {
    if (inputHasText || !showFileIcon) {
      return (
        <div className="sc-user-input--button">
          <SendIcon onClick={_submitText} />
        </div>
      )
    }

    return (
      <div className="sc-user-input--button">
        <FileIcon onClick={_showFilePicker} />
        <input
          type="file"
          name="files[]"
          multiple
          ref={(e) => setFileUploadButton(e)}
          onChange={_onFilesSelected}
        />
      </div>
    )
  }

  return (
    <form className={`sc-user-input ${(inputActive ? 'active' : '')}`}>
      <div
        role="button"
        tabIndex="0"
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(false)}
        ref={(e) => setInput(e)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        contentEditable="true"
        placeholder="Write a reply..."
        className="sc-user-input--text"
      >
      </div>
      <div className="sc-user-input--buttons">
        <div className="sc-user-input--button"></div>
        <div className="sc-user-input--button">
          {showEmoji && <EmojiIcon
            onClick={toggleEmojiPicker}
            isActive={emojiPickerIsOpen}
            tooltip={_renderEmojiPopup()}
          />}
        </div>
        {_renderSendOrFileIcon()}
      </div>
    </form>
  )
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
  showFileIcon: PropTypes.bool
}

export default UserInput

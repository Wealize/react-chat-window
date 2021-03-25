import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';
import FileIcon from './icons/FileIcon';
import EmojiIcon from './icons/EmojiIcon';
import PopupWindow from './popups/PopupWindow';
import EmojiPicker from './emoji-picker/EmojiPicker';


const UserInput = (props) => {
  const [inputActive, setInputActive] = useState(false)
  const [inputHasText, setInputHasText] = useState(false)
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false)
  const [emojiFilter, setEmojiFilter] = useState('')
  const [fileUploadButton, setFileUploadButton] = useState(null)
  const [text, setText] = useState('')

  const {
    onSubmit,
    onFilesSelected,
    showEmoji,
    showFileIcon
  } = props

  useState(() => {
    setText('')
  }, [])

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      return _submitText(event)
    }
  }

  const handleInputChange = (event) => {
    if (event.currentTarget.value.length !== 0) {
      setInputHasText(true)
    }
    else {
      setInputHasText(false)
    }

    setText(event.currentTarget.value)
  }

  const _showFilePicker = () => {
    fileUploadButton.click()
    setEmojiPickerIsOpen(false)
  }

  const toggleEmojiPicker = (e) => {
    e.preventDefault()
    setEmojiPickerIsOpen(!emojiPickerIsOpen)
  }

  const closeEmojiPicker = () => {
    setEmojiPickerIsOpen(false)
  }

  const _submitText = (event) => {
    event.preventDefault()

    if (text && text.length > 0) {
      onSubmit({
        author: 'me',
        type: 'text',
        data: { text }
      })

      setText('')
      setInputHasText(false)
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
      setText(text + emoji)
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
      onBlur={closeEmojiPicker}
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
    <div className={`sc-user-input${(inputActive ? ' active' : '')}`}>
      <input
        onFocus={() => {
          setInputActive(true)
          setEmojiPickerIsOpen(false)
        }}
        onBlur={() => setInputActive(false)}
        onKeyPress={handleEnter}
        onChange={handleInputChange}
        value={text}
        placeholder="Write a reply..."
        className={`sc-user-input--text`}
      />
      <div className="sc-user-input--buttons">
        <div className="sc-user-input--button">
          {showEmoji && <EmojiIcon
            onClick={toggleEmojiPicker}
            isActive={emojiPickerIsOpen}
            tooltip={_renderEmojiPopup()}
          />}
        </div>
        {_renderSendOrFileIcon()}
      </div>
    </div>
  )
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
  showFileIcon: PropTypes.bool
}

export default UserInput

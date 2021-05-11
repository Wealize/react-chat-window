import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';
import FileIcon from './icons/FileIcon';
import EmojiIcon from './icons/EmojiIcon';

import Picker from 'emoji-picker-react';


const UserInput = (props) => {
  const [inputActive, setInputActive] = useState(false)
  const [inputHasText, setInputHasText] = useState(false)
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false)
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
      setInputActive(false)
    }
  }

  const _onFilesSelected = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      onFilesSelected(event.target.files)
    }
  }

  const _handleEmojiPicked = (event, emoji) => {
    setEmojiPickerIsOpen(false)
    if (inputHasText) {
      setText(text + emoji.emoji)
    } else {
      onSubmit({
        author: 'me',
        type: 'emoji',
        data: { emoji: emoji.emoji }
      })
    }
  }

  return (
    <form className={`sc-user-input ${((inputActive || inputHasText) ? 'active' : '')}`}>
      <div className="sc-user-input--buttons">
        {showEmoji && (
          <div
            className="sc-user-input--button"
          >
            <EmojiIcon
              onClick={toggleEmojiPicker}
              isActive={inputActive || inputHasText}
            />
          </div>
        )} 
        {showFileIcon && (
          <div className="sc-user-input--button">
            <FileIcon onClick={_showFilePicker} isActive={inputActive || inputHasText}/>
            <input
              type="file"
              name="files[]"
              multiple
              ref={(e) => setFileUploadButton(e)}
              onChange={_onFilesSelected}
            />
          </div>
        )}
      </div>
      {emojiPickerIsOpen && 
        <Picker
          onBlur={(e) => {
            if (e.relatedTarget === null) {
              setEmojiPickerIsOpen(false)
            }
            else if (e.relatedTarget.name !== 'sc-emoji-picker-button') {
              setEmojiPickerIsOpen(false)
            }
          }}
          onEmojiClick={_handleEmojiPicked}
          native
        />
      }
      <input
        onFocus={() => {
          setInputActive(true)
          setEmojiPickerIsOpen(false)
        }}
        onBlur={(e) => {
          if (e.relatedTarget === null) {
            setInputActive(false)
          }
          else if (e.relatedTarget.name !== 'send-button' && e.relatedTarget.name !== 'sc-emoji-picker-button') {
            setInputActive(false)
          }
        }}
        onKeyPress={handleEnter}
        onChange={handleInputChange}
        value={text}
        placeholder="Escribe tu respuesta..."
        className={`sc-user-input--text ${((inputActive || inputHasText) ? 'active' : '')}`}
      />
      <SendIcon
        onClick={_submitText}
        inputActive={inputActive}
        inputHasText={inputHasText}
        onBlur={() => setInputActive(false)}
      />
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

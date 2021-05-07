import React from 'react'
import AudioPlayer from 'react-h5-audio-player'


const AudioMessage = (props) => {
  return (
    <AudioPlayer
      className="sc-message--audio"
      src={props.data.url}
      showJumpControls={false}
      showFilledVolume={true}
    />
  )
}

export default AudioMessage

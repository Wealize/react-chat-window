import React from 'react'
import AudioPlayer from 'react-h5-audio-player'


const AudioMessage = (props) => {
  return (
    <AudioPlayer
      src={props.data.url}
      showJumpControls={false}
      showFilledVolume={true}
    />
  )
}

export default AudioMessage

import React from 'react';
import ReactAudioPlayer from 'react-audio-player';


const AudioMessage = (props) => {
  return (
    <ReactAudioPlayer
      src={props.data.url}
      controls
    />
  );
};

export default AudioMessage;

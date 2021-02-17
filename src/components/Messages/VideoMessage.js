import React from 'react';

import { Player } from 'video-react';


const VideoMessage = (props) => {
  return (
    <Player
      className="sc-message--video"
      playsInline
      src={props.data.url}
    ></Player>
  );
};

export default VideoMessage;

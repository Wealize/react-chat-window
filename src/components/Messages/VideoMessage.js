import React from 'react';
import styled from 'styled-components';

import { Player } from 'video-react';

const Video = styled(Player)`
  width: 100%;
  height: 100%;
`;

const VideoMessage = (props) => {
  return (
    <Video
      className="sc-message--video"
      playsInline
      src={props.data.url}
    ></Video>
  );
};

export default VideoMessage;

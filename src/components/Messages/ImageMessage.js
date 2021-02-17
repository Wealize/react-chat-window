import React from 'react';


const ImageMessage = (props) => {
  return (
    <img
      className="sc-message--img"
      src={props.data.url}
    />
  );
};

export default ImageMessage;

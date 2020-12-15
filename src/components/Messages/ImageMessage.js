import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 90%;
  height: auto;
`;

const ImageMessage = (props) => {
  return (
    <Image
      className="sc-message--img"
      src={props.data.url}
    />
  );
};

export default ImageMessage;

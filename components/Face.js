import React from 'react';
import styled from 'styled-components';

const Eye = styled.span`
  width: 8%;
  height: 8%;
  border-radius: 100%;
  background-color: white;
  display: inline-block;
  position: absolute;
`;

const StyledFace = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const Nose = styled.span`
  position: absolute;
  width: 6%;
  height: 16%;
  background-color: white;
  display: inline-block;
`;

const Face = () => {
  return (
    <StyledFace>
      <Eye style={{top: '24%', left: '24%'}} />
      <Eye style={{top: '24%', right: '24%'}} />
      <Nose
        style={{top: '40%', left: '50%', transform: 'translate(-50%, 0)'}}
      />
    </StyledFace>
  );
};

export default Face;

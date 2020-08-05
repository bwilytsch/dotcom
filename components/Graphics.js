import React from 'react';
import styled, {keyframes} from 'styled-components';

const Box = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: calc(100% - 0.8rem);
  padding-bottom: calc(100% - 1rem);
  position: relative;
  margin: 0.4rem;
  border: 1px solid #bcbcbc;
  border-radius: var(--border-radius-m);
`;

const BoxInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  rigth: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const rotate = keyframes`
  0% {
    background-color: var(--accent);
    transform: rotate(0deg)
  }
  20% {
    background-color: var(--accent);
    transform: rotate(360deg)
  }
  21% {
    background-color: #c8c8c8;
    transform: rotate(360deg)
  }
  100% {
    background-color: #c8c8c8;
    transform: rotate(360deg)
  }
`;

const CircleDial = styled.div`
  width: 88%;
  padding-bottom: 88%;
  border-radius: 100%;
  position: relative;
  animation: ${rotate} 10s linear infinite;

  &::after {
    content: '';
    width: 1px;
    height: 20%;
    background-color: white;
    position: absolute;
    bottom: 8%;
    left: 50%;
    display: block;
  }
`;

export const GraphicDial = ({width = '8.2'}) => {
  return (
    <div style={{width: `${width}rem`, height: `${width}rem`}}>
      <Box>
        <BoxInner>
          <CircleDial />
        </BoxInner>
      </Box>
    </div>
  );
};

const Cross = styled.div`
  width: 80%;
  height: 80%;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  position: relative;

  &:before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    z-index: -1;
    width: 33%;
    height: 100%;
    background-color: var(--accent-two);
    background-color: #c8c8c8;
    border-radius: 0.3rem;
    transform: translate(-50%, 0);
  }
  &:after {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    top: 50%;
    z-index: -1;
    height: 33%;
    width: 100%;
    background-color: var(--accent-two);
    background-color: #c8c8c8;
    border-radius: 0.3rem;
    transform: translate(0, -50%);
  }
`;

const Arrow = styled.span`
  display: block;
  width: 0;
  height: 0;
  align-self: center;
  justify-self: center;
`;

const ArrowUp = styled(Arrow)`
  border-left: var(--arrow-size) solid transparent;
  border-right: var(--arrow-size) solid transparent;
  border-bottom: var(--arrow-size) solid var(--b-bg);
  grid-column: 5;
  grid-row: 2;
`;

const ArrowRight = styled(Arrow)`
  border-top: var(--arrow-size) solid transparent;
  border-bottom: var(--arrow-size) solid transparent;
  border-left: var(--arrow-size) solid var(--b-bg);
  grid-column: 8;
  grid-row: 5;
`;

const ArrowLeft = styled(Arrow)`
  border-top: var(--arrow-size) solid transparent;
  border-bottom: var(--arrow-size) solid transparent;
  border-right: var(--arrow-size) solid var(--b-bg);
  grid-column: 2;
  grid-row: 5;
`;

const ArrowDown = styled(Arrow)`
  border-left: var(--arrow-size) solid transparent;
  border-right: var(--arrow-size) solid transparent;
  border-top: var(--arrow-size) solid var(--b-bg);
  grid-column: 5;
  grid-row: 8;
`;

export const GraphicInput = ({width = '8.2'}) => {
  return (
    <div style={{width: `${width}rem`, height: `${width}rem`}}>
      <Box>
        <BoxInner>
          <Cross>
            <ArrowUp />
            <ArrowRight />
            <ArrowLeft />
            <ArrowDown />
          </Cross>
        </BoxInner>
      </Box>
    </div>
  );
};

const Grid = styled.div`
  padding: 0.4rem;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 0.4rem;
  column-gap: 0.4rem;

  > *:first-child {
    border: 1px solid var(--accent-three);
    background-color: var(--accent-three);
    background-color: #c8c8c8;
    border: 1px solid #c8c8c8;
  }
`;

const SubGrid = styled.span`
  width: 100%;
  height: 100%;
  border: 1px solid #c8c8c8;
  border-radius: calc(var(--border-radius-m) - 0.5rem);
`;

export const GraphicGrid = ({width = '8.2'}) => {
  return (
    <div style={{width: `${width}rem`, height: `${width}rem`}}>
      <Box>
        <BoxInner>
          <Grid>
            <SubGrid />
            <SubGrid />
            <SubGrid />
            <SubGrid />
          </Grid>
        </BoxInner>
      </Box>
    </div>
  );
};

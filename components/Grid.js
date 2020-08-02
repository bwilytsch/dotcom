import React from 'react';
import styled from 'styled-components';
import { viewports } from './constants';

export const FlexGrid = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const Grid = styled.section`
  box-sizing: border-box;
  display: grid;
  padding: 2.4rem;
  grid-template-columns: ${props =>
    props.cols ? `repeat(${props.cols}, 1fr)` : `repeat(4, 1fr)`};
  grid-column-gap: ${props => (props.gutter ? props.gutter : `1.6rem`)};

  @media ${viewports.medium()} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${viewports.small()} {
    grid-template-columns: repeat(1, 1fr);

    > * {
      grid-column-start: start;
      grid-column-end: end;
    }
  }
`;

export default Grid;

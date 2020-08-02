import React from 'react';
import styled from 'styled-components';
import { viewports } from './constants';

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
  }
`;

export default Grid;

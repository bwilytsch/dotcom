import React, { forwardRef } from 'react';
import NextLink from 'next/link';
import styled, { css, keyframes } from 'styled-components';
import { viewports } from './constants';

// Grid based extension
const gridStyle = css`
  grid-column-start: ${props => props.from};
  grid-column-end: ${props => props.to};

  @media ${viewports.small()} {
  }
`;

// Fix fonts size to make with agnostic
export const Headline = styled.h1`
  font-size: calc(80vw / 6);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 0.9em;
  color: var(--accent);
  margin: 0;
  padding: 0;
`;

export const Em = () => `— `;

export const CVDate = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  display: block;
  margin: 0;
  padding: 0;
  color: var(--accent);
`;

export const fadeIn = keyframes`
  0%{
    opacity: 0
  }
  100% {
    opacity: 1;
  }
`;

export const DisplayHeadline = styled(Headline)`
  ${gridStyle}
  color: rgba(255,255,255, 0.24);
  opacity: 0;
  text-transform: none;
  animation: ${fadeIn} 0.2s 0.24s linear forwards;
`;

export const Subheadline = styled.h2`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1.33em;
  color: var(--accent);
  letter-spacing: -0.04em;

  @media ${viewports.small()} {
    line-height: 1.5em;
  }
`;

export const CVLink = styled.a`
  font-size: 1.4rem;
  line-height: 1.3em;
  display: block;
  margin: 0 0 0.6em 0;
  text-decoration: underline;
`;

export const CopyHeadline = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.6em;
  color: var(--accent);
`;

const sharedCopyStyle = css`
  font-size: 1.4rem;
  line-height: 1.6em;
  color: var(--accent);
`;

export const Copy = styled.p`
  ${sharedCopyStyle}
`;

export const Label = styled.span`
  font-size: 1rem;
  line-height: 1.4em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent);
`;

export const Link = styled.a`
  ${sharedCopyStyle}
  text-decoration: none;

  &:after {
    content: '🡒',
    margin-left: 0.8rem;
    display: inline-block;
  }
`;

// // Get back to this later
// export const Link = forwardRef((props, ref) => (
//   <NextLink ref={ref} {...props} />
// ));

export const columnRange = (from, to) => ({
  gridColumnStart: from,
  gridColumnEnd: to,
});

const components = Object.freeze({
  Headline,
  Subheadline,
  Copy,
  CopyHeadline,
  Label,
  Link,
});

export default components;

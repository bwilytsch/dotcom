import React from 'react';
import { viewports } from './constants';
import styled, { keyframes } from 'styled-components';

const leftDot = keyframes`
 0%, 70%, 100% {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.48);
    transform: translate(200%, 0) rotate(0deg);
 }
 5%, 65% {
     width: 400%;
     background-color: rgba(255, 255, 255, 1);
     transform: translate(0, -2px) rotate(-30deg);
 }`;

const rightDot = keyframes`
  0%, 70%, 100% {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.48);
    transform: translate(-200%, 0) rotate(0deg);
  }
  5%, 65% {
    width: 400%;
    background-color: rgba(255, 255, 255, 1);
    transform: translate(-10px, -2px) rotate(30deg);
  }
`;

const centerDot = keyframes`
   0%, 70%, 100% {
      background-color: rgba(255, 255, 255, 0.48);
   }
   5%, 65% {
      background-color: rgba(255, 255, 255, 0);
   }
`;

const DotAnimation = styled.div`
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  position: relative;
  animation: ${centerDot} 10s linear infinite;

  &:before {
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 2px;
    animation: ${leftDot} 10s linear infinite;
  }

  &:after {
    content: '';
    display: block;
    height: 100%;
    right: 0;
    top: 0;
    border-radius: 2px;
    transition: all 0.12s;
    animation: ${rightDot} 10s linear infinite;
  }
`;

const StyledNavigation = styled.nav`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: white;
  text-align: center;
  padding: 2.4rem 0;
`;

const Navigation = () => (
  <StyledNavigation>
    <DotAnimation />
  </StyledNavigation>
);

export default Navigation;

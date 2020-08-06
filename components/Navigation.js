import React from 'react';
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
     transform: translate(0, -56%) rotate(-30deg);
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
    transform: translate(-66%, -56%) rotate(30deg);
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
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 0.2rem;
  position: relative;
  animation: ${centerDot} 10s linear infinite;

  &:before {
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 0.5em;
    animation: ${leftDot} 10s linear infinite;
  }

  &:after {
    content: '';
    display: block;
    height: 100%;
    right: 0;
    top: 0;
    border-radius: 0.5em;
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

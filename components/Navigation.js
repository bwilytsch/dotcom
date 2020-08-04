import React from 'react';
import styled from 'styled-components';

const StyledNavigation = styled.nav`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: white;
  text-align: center;
  padding: 2.4rem 0;
`;

const Navigation = () => <StyledNavigation>Menu</StyledNavigation>;

export default Navigation;

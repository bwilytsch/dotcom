import React from 'react';
import styled from 'styled-components';
import Grid from './Grid';
import { viewports } from './constants';

const links = [
  {
    label: 'Github',
    url: '',
  },
  {
    label: 'Linkedin',
    url: '',
  },
  {
    label: 'Codesandbox',
    url: '',
  },
  {
    label: 'Space for thought madebybojan',
    url: '',
  },
];

const StyledFooter = styled.footer`
  width: calc(100% - 4.8rem);
  display: block;
  font-size: 1.4rem;
  margin: 0 2.4rem;
  color: var(--f-base);
  border: 1px solid var(--f-low);
  border-radius: var(--border-radius-m);

  a {
    display: inline-block;
  }

  @media ${viewports.small('max')} {
    a:not(:last-child) {
      margin-bottom: 2.4rem;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Grid>
        {links.map(({ label, url }, idx) => (
          <a href={url} key={idx}>
            {label}
          </a>
        ))}
      </Grid>
    </StyledFooter>
  );
};

export default Footer;

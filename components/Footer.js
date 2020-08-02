import React from 'react';
import styled from 'styled-components';
import Grid from './Grid';

const links = [
  {
    label: 'github',
    url: '',
  },
  {
    label: 'linkedin',
    url: '',
  },
  {
    label: 'codesandbox',
    url: '',
  },
  {
    label: 'Space for thought madebybojan',
    url: '',
  },
];

const StyledFooter = styled.footer`
  width: calc(100% - 4.8rem);
  font-size: 1.4rem;
  margin: 2.4rem;
  color: var(--f-base);
  border: 1px solid var(--f-low);
  border-radius: var(--border-radius-m);
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

import React, {Fragment} from 'react';
import styled from 'styled-components';
import Grid from './Grid';
import {Em} from './Typography';
import {viewports} from './constants';

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
    label: 'Codepen',
    url: '',
  },
];

const StyledCopyright = styled.div`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 2.4rem;
  color: var(--f-base);
`;

const StyledFooter = styled.footer`
  width: calc(100% - 4.8rem);
  display: block;
  font-size: 1.4rem;
  margin: 0 2.4rem 2.4rem 2.4rem;
  color: var(--f-base);
  border: 1px solid var(--f-low);
  border-radius: var(--border-radius-m);

  a {
    padding: 1.6rem;
    display: inline-block;
    border-radius: var(--border-radius-s);

    &:hover {
      background: rgba(0, 0, 0, 0.06);
      color: var(--f-high);
    }
  }

  @media ${viewports.small('max')} {
    padding: 1.2rem 0;

    a {
      padding: 0.4rem 1.6rem;
    }
    a:not(:last-child) {
      margin-bottom: 0rem;
    }
  }
`;

const Footer = () => {
  return (
    <Fragment>
      <StyledFooter>
        <Grid style={{padding: '0.8rem'}}>
          {links.map(({label, url}, idx) => (
            <a href={url} key={idx}>
              {label}
            </a>
          ))}
        </Grid>
      </StyledFooter>
    </Fragment>
  );
};

export default Footer;

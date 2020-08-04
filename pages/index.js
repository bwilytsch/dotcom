import Head from 'next/head';
import styled, {keyframes} from 'styled-components';
// UI Libarry
import {
  Headline,
  Subheadline,
  CopyHeadline,
  Copy,
  Grid,
  Label,
  Link,
  Footer,
  Navigation,
} from '../components';

import {columnRange, Em, DisplayHeadline} from '../components/Typography';
import {FlexGrid} from '../components/Grid';
import Surface from '../components/Surface';
import {projects} from './api/hello';
import {viewports} from '../components/constants';

// SVGs
import GraphicSVG from '../public/graphic.svg';

const Main = styled.main`
  min-height: 100%;
  width: 100%;
`;

const Display = styled.section`
  box-sizing: border-box;
  width: calc(100% - 1.6rem);
  height: 100%;
  max-height: auto;
  margin: 0.8rem;
  border-radius: var(--border-radius-m);
  background: black;

  @media ${viewports.small()} {
    border-radius: 0;
    width: 100%;
    margin: 0;
  }
`;

const DisplayLabel = styled(Label)`
  color: white;
  text-transform: none;
  font-family: var(--font-accent);
`;

// CSS Animation
const pointing = keyframes`
  0%, 100% {
    transform: translate(0, 0);  
  }
  25% {
    transform: translate(-0.4rem, 0);  
  }
  75% {
    transform: translate(0.4rem, 0);  
  }
`;

const DisplayArrow = styled.span`
  display: inline-block;
  padding: 0 0.8rem;
  opacity: 0;

  @media ${viewports.small()} {
    display: none;
  }
`;

const DisplayCopy = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  width: 100%;
  color: rgba(255, 255, 255, 0.48);
  letter-spacing: 0.02em;
  padding: 1.2rem 0;
  margin: 0;
  cursor: pointer;
  transition: color 0.12s ease-in-out;

  &:not(:last-child) {
    border-bottom: 1px solid var(--f-high);
  }

  &:hover {
    color: rgba(255, 255, 255, 1);

    ${DisplayArrow} {
      opacity: 1;
      animation: ${pointing} 1.2s linear infinite;
    }
  }
`;

const DisplayMeta = styled.span`
  padding-left: 0.4rem;
`;

const DisplayStatus = styled.span`
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: white;
  padding: 0.4rem 0.8rem;
  margin: 0 1.2rem;
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: var(--border-radius);
  display: inline-block;
`;

const DisplayPreview = styled.div`
  width: calc(100% - 4.8rem);
  padding-bottom: calc(100% - 4.8rem);
  border: 2px solid white;
  position: relative;
  margin: 2.4rem;
  grid-column: 1 / 2;
  overflow: hidden;

  @media ${viewports.small()} {
    grid-column: inherit;
    width: 100%;
    padding-bottom: 100%;
    margin: 0 0 2.4rem 0;
  }
`;

const DisplayList = styled(FlexGrid)`
  grid-column: 2 /4;
  align-items: center;

  @media ${viewports.small()} {
    grid-column: inherit;
    padding: 0 0 4.8rem 0;
  }
`;

const hasURL = url => {
  return url ? {href: url, target: '_blanked'} : {};
};

export default function Home() {
  return (
    <Main>
      <Display>
        <Grid>
          <DisplayLabel>
            Bojan Wilytsch <br /> Creative Technologist • UX Engineer
          </DisplayLabel>
          <DisplayLabel>
            London <br /> UK
          </DisplayLabel>
        </Grid>
        <Grid>
          <DisplayHeadline from={2} to={5}>
            Hello.
          </DisplayHeadline>
        </Grid>
        <Grid>
          <DisplayPreview>
            <Surface />
          </DisplayPreview>
          <DisplayList data-name="projects" cols={1}>
            {projects.map((project, idx) => (
              <DisplayCopy key={idx} {...hasURL(project.url)}>
                <DisplayMeta>
                  {project.title}
                  {project.status && (
                    <DisplayStatus>{project.status}</DisplayStatus>
                  )}
                </DisplayMeta>
                <DisplayArrow>⟶</DisplayArrow>
              </DisplayCopy>
            ))}
          </DisplayList>
        </Grid>
        <Navigation />
      </Display>
      <Grid>
        <Headline>About</Headline>
      </Grid>
      <Grid>
        <Subheadline style={{...columnRange(1, 3)}}>
          Creative Technologist • UX Engineer
        </Subheadline>
        <Subheadline style={{...columnRange(1, 4)}}>
          Hi I am Bojan, a London based Developer, Designer and Tinkerer with a
          passion for connecting design, art and technology. Working at Fnatic,
          formerly Facebook, Oculus and for Google.
        </Subheadline>
      </Grid>
      <Grid>
        <section>
          <Label>Experiments</Label>
          <Copy>
            Dynamic AABB node tree. Fast & Performant Collision detection.{' '}
            <Em />
          </Copy>
        </section>
        <section>
          <Label>Professional</Label>
          <CopyHeadline>Awards</CopyHeadline>
          <Copy>
            Develeoper Awards - Awwwards <br />
            Site of the Day — Awwwards <br />
            Site of the Day — CSSDesignAwards <br />
            Site of the Day — CSSDesignAwards — Susa Ventures
          </Copy>
        </section>
        <section>
          <Label>Personal</Label>
          <CopyHeadline>Mechanical Keyboards</CopyHeadline>
          <Copy>
            Daily driver — 64%, Brass Plate, lubbed with 205g0 Krytox, TX Films,
            Gateron Yellow Inks, MaxKey BW SA keycaps, frosted low profile case.
          </Copy>
        </section>
      </Grid>
      <Grid>
        <section style={{...columnRange(1, 3)}}>
          <Label>Build With</Label>
          <Copy>
            Inter Typeface <Em />
            <a href="https://rsms.me/inter/">Link</a>
            <br />
            NextJS by Vercel
            <br />
            Styled Components
          </Copy>
        </section>
      </Grid>
      <FlexGrid>
        <GraphicSVG
          style={{
            display: 'inline-block',
            width: '238px',
            margin: '2.4rem auto 6.4rem auto',
          }}
        />
      </FlexGrid>
      <Footer />
    </Main>
  );
}

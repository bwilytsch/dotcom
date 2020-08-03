import Head from 'next/head';
import styled from 'styled-components';
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

import { columnRange, DisplayHeadline } from '../components/Typography';
import { FlexGrid } from '../components/Grid';
import { projects } from './api/hello';
import { viewports } from '../components/constants';

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

const DisplayCopy = styled.a`
  font-size: 1.4rem;
  width: 100%;
  color: rgba(255, 255, 255, 0.48);
  letter-spacing: 0.02em;
  padding: 1.2rem 0;
  margin: 0;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid var(--f-high);
  }

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;

const DisplayStatus = styled.span`
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: white;
  padding: 0.8rem 1.2rem;
  margin: 0 1.2rem;
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: var(--border-radius);
`;

const DisplayPreview = styled.div`
  width: calc(100% - 4.8rem);
  padding-bottom: calc(100% - 4.8rem);
  border-radius: var(--border-radius-m);
  border: 2px solid white;
  position: relative;
  margin: 2.4rem;
  grid-column: 1 / 2;

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
  return url ? { href: url, target: '_blanked' } : {};
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
            Projects
          </DisplayHeadline>
        </Grid>
        <Grid>
          <DisplayPreview>
            <img src={projects[0].media[0].src} />
          </DisplayPreview>
          <DisplayList data-name="projects" cols={1}>
            {projects.map((project, idx) => (
              <DisplayCopy key={idx} {...hasURL(project.url)}>
                {project.title}
                {project.status && (
                  <DisplayStatus>{project.status}</DisplayStatus>
                )}
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
        <Subheadline style={{ ...columnRange(1, 3) }}>
          Creative Technologist • UX Engineer
        </Subheadline>
        <Subheadline style={{ ...columnRange(1, 4) }}>
          Hi I am Bojan, a London based Developer, Designer and Tinkerer with a
          passion for connecting design, art and technology. Working at Fnatic,
          formerly Facebook, Oculus and for Google.
        </Subheadline>
      </Grid>
      <Grid>
        <Label>Awards</Label>
        <Copy>
          <CopyHeadline>About</CopyHeadline>
          Daily driver — 64%, Brass Plate, lubbed with 205g0 Krytox, TX Films,
          Gateron Yellow Inks, MaxKey BW SA keycaps, frosted low profile case.
        </Copy>
        <Link href="">Go To Project</Link>
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

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
} from '../components';

import { columnRange, DisplayHeadline } from '../components/Typography';
import { FlexGrid } from '../components/Grid';
import { projects } from './api/hello';

const Main = styled.main`
  background: var(--b-bg);
  min-height: 80vh;
  width: 100%;
  padding: 0 0 2.4rem 0;
`;

const Display = styled.section`
  box-sizing: border-box;
  width: calc(100% - 0.8rem);
  height: 100%;
  max-height: auto;
  margin: 0.4rem;
  border-radius: var(--border-radius-m);
  background: black;
`;

const DisplayLabel = styled(Label)`
  color: white;
  text-transform: none;
  font-family: var(--font-accent);
`;

const DisplayCopy = styled(Copy)`
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
  background-color: var(--f-high);
  border-radius: var(--border-radius);
`;

const DisplayPreview = styled.div`
  width: calc(100% - 4.8rem);
  padding-bottom: calc(200% - 4.8rem);
  border-radius: var(--border-radius-m);
  border: 2px solid white;
  position: relative;
  margin: 2.4rem;
`;

export default function Home() {
  return (
    <Main>
      <Display>
        <Grid>
          <DisplayLabel>
            Bojan Wilytsch <br /> Creative Technologist
          </DisplayLabel>
          <DisplayLabel>
            London <br /> UK
          </DisplayLabel>
        </Grid>
        <DisplayHeadline from={2} to={5}>
          Projects
        </DisplayHeadline>
        <DisplayPreview style={{ ...columnRange(1, 2) }}>
          <img src={projects[0].media[0].src} />
        </DisplayPreview>
        <FlexGrid
          data-name="projects"
          cols={1}
          style={{
            ...columnRange(2, 4),
            padding: `0 0 4.8rem 0`,
            alignItems: 'center',
          }}
        >
          {projects.map((project, idx) => (
            <DisplayCopy key={idx}>
              {project.title}
              {project.status && (
                <DisplayStatus>{project.status}</DisplayStatus>
              )}
            </DisplayCopy>
          ))}
        </FlexGrid>
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
      <Footer />
    </Main>
  );
}

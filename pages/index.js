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

import { columnRange } from '../components/Typography';
import { projects } from './api/hello';

const Main = styled.main`
  background: var(--b-bg);
  min-height: 100%;
  width: 100%;
`;

const Display = styled.section`
  box-sizing: border-box;
  width: calc(100% - 0.8rem);
  height: 100%;
  max-height: 80rem;
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
  color: white;
  padding: 1.2rem 0;
  margin: 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--f-high);
  }
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
          <Headline style={{ color: 'white', ...columnRange(2, 4) }}>
            Projects
          </Headline>
          <Grid
            data-name="projects"
            cols={1}
            style={{ ...columnRange(2, 4), padding: 0 }}
          >
            {projects.map((project, idx) => (
              <DisplayCopy>{project.title}</DisplayCopy>
            ))}
          </Grid>
        </Grid>
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

import Head from 'next/head';
import React, {useState, useEffect, Fragment, useRef} from 'react';
import styled, {keyframes} from 'styled-components';
import gsap from 'gsap';
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
import {projects, experiments} from './api/hello';
import {viewports} from '../components/constants';
import {GraphicDial, GraphicGrid, GraphicInput} from '../components/Graphics';

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
  margin: 0.8rem 0.8rem 4.8rem 0.8rem;
  border-radius: var(--border-radius-m);
  background: black;

  @media ${viewports.small()} {
    border-radius: 0;
    width: 100%;
    margin: 0 0 2.4rem 0;
  }
`;

const DisplaySelectContainer = styled.div`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: var(--border-radius-s);
  margin: 0 0.8rem;
  padding: 0 1.6rem 0 0;
`;

const DisplaySelect = styled.select`
  box-sizing: content-box;
  align-self: flex-start;
  color: white;
  font-size: 1.6rem;
  padding: 1.2rem 1.6rem;
  background-color: transparent;
  border: none;
  outline: none;
`;

const DisplayOption = styled.option``;

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
  font-size: 2rem;
  align-items: center;
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

  &[data-status='disabled'] {
    cursor: not-allowed;
  }

  &:not([data-status='disabled']):hover {
    color: rgba(255, 255, 255, 1);

    ${DisplayArrow} {
      opacity: 1;
      animation: ${pointing} 1.2s linear infinite;
    }
  }

  @media ${viewports.small()} {
    font-size: 1.4rem;
    line-height: 1.4em;
  }
`;

const DisplayMeta = styled.span`
  padding-left: 0.4rem;
  display: flex;
  align-items: center;

  @media ${viewports.small()} {
    width: 100%;
    justify-content: space-between;
  }
`;

const DisplayStatus = styled.span`
  font-size: 1rem;
  letter-spacing: 0.08em;
  color: white;
  padding: 0.4rem 0.8rem;
  margin: 0 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: var(--border-radius);
  display: inline-block;
  flex: 0 0 auto;
`;

const DisplayPreview = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;

  @media ${viewports.small()} {
    grid-column: inherit;
    width: 100%;
    padding-bottom: 100%;
    margin: 0 0 2.4rem 0;
  }
`;

const DisplayList = styled(FlexGrid)`
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem 0 0 0;
  transition: height 0.24s;
  width: 80%;

  @media ${viewports.small()} {
    grid-column: inherit;
    padding: 0 0 4.8rem 0;
    width: 100%;
  }
`;

// Not sure if needed
const StyledDisplayListInner = styled.div`
  width: 100%;
`;

const DisplayListInner = ({onEnter = () => {}, children, ...restProps}) => {
  const ele = useRef(null);
  const prevHeight = useRef(null);

  useEffect(() => {
    if (prevHeight.current === ele.current.offsetHeight) return;
    onEnter(ele.current.offsetHeight);
    prevHeight.current = ele.current.offsetHeight;
  }, [children]);

  return (
    <StyledDisplayListInner ref={ele} {...restProps}>
      {children}
    </StyledDisplayListInner>
  );
};

const hasURL = url => {
  return url ? {href: url, target: '_blanked'} : {'data-status': 'disabled'};
};

const workMap = {
  projects,
  experiments,
};

const Work = ({style}) => {
  const [work, setWork] = useState(projects);
  const [changed, setChanged] = useState(false);

  const onSelect = e => {
    const {value} = e.target;

    if (workMap[value]) {
      setWork(workMap[value]);
      setChanged(true);
    }
  };

  const getHeight = height => {
    gsap.to('.display-list-wrapper', 0.24, {height});
  };

  useEffect(() => {
    if (changed) {
      setChanged(false);
      gsap.fromTo(
        '.list-node',
        0.48,
        {opacity: 0, x: 10},
        {opacity: 1, x: 0, stagger: 0.1},
      );
    }
  }, [changed]);

  return (
    <DisplayList data-name="projects" cols={1} style={style}>
      <section
        style={{
          alignSelf: 'flex-start',
          color: 'white',
          padding: '0 0.4rem',
          fontSize: '1.4rem',
          margin: '0 0 1.2rem 0',
        }}>
        Show me:
        <DisplaySelectContainer>
          <DisplaySelect name="work" onChange={onSelect}>
            <DisplayOption value="projects">Projects</DisplayOption>
            <DisplayOption value="experiments">Experiments</DisplayOption>
          </DisplaySelect>
        </DisplaySelectContainer>
      </section>
      <div className="display-list-wrapper" style={{width: '100%'}}>
        <DisplayListInner onEnter={getHeight}>
          {work.map((project, idx) => (
            <DisplayCopy
              key={idx}
              {...hasURL(project.url)}
              className={'list-node'}>
              <DisplayMeta>
                {project.title}
                {project.status && (
                  <DisplayStatus>{project.status}</DisplayStatus>
                )}
              </DisplayMeta>
              <DisplayArrow>⟶</DisplayArrow>
            </DisplayCopy>
          ))}
        </DisplayListInner>
      </div>
    </DisplayList>
  );
};

const DisplayHeroGrid = styled.div`
  display: flex;
  align-items: center;

  @media ${viewports.small()} {
    flex-direction: column;
  }
`;

const DisplayHeroHalf = styled.div`
  width: 50%;
  padding: 0 2.4rem;
  flex: 1 1 auto;

  @media ${viewports.small()} {
    width: 100%;
  }
`;

export default function Home() {
  return (
    <Main>
      <Display>
        <Grid>
          <DisplayLabel>
            Bojan <br /> Wilytsch
          </DisplayLabel>
          <DisplayLabel>
            London, <br /> UK
          </DisplayLabel>
          <DisplayLabel style={{...columnRange(4)}}>
            v0.1 <Em />
            {new Date().getFullYear().toString()}
          </DisplayLabel>
        </Grid>
        <DisplayHeroGrid>
          <DisplayHeroHalf>
            <DisplayPreview>
              <Surface ratio={[1, 1]} />
            </DisplayPreview>
          </DisplayHeroHalf>
          <DisplayHeroHalf>
            <Work />
          </DisplayHeroHalf>
        </DisplayHeroGrid>
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
            NextJS
            <br />
            Styled Components
            <br />
            ThreeJS
          </Copy>
        </section>
      </Grid>
      <FlexGrid style={{flexDirection: 'row', margin: '2.4rem  0 6.4rem 0'}}>
        <GraphicGrid />
        <GraphicDial />
        <GraphicInput />
      </FlexGrid>
      <Footer />
    </Main>
  );
}

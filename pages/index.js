import Head from 'next/head';
import React, { useState, useEffect, Fragment, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
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

import {
  CVDate,
  CVLink,
  columnRange,
  Em,
  DisplayHeadline,
} from '../components/Typography';
import { FlexGrid } from '../components/Grid';
import Surface from '../components/Surface';
import { projects, experiments } from './api/hello';
import { viewports } from '../components/constants';
import { GraphicDial, GraphicGrid, GraphicInput } from '../components/Graphics';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 100%;
  }
`;

const Main = styled.main`
  min-height: 100%;
  width: 100%;
  opacity: 0;
  animation: ${fadeIn} 1s linear forwards;

  @media ${viewports.large('min')} {
    max-width: 134rem;
    margin: 4.8rem auto 0 auto;
  }
`;

const DisplayTouch = styled.div`
  display: none;
  width: 100%;

  @media ${viewports.medium()} {
    display: block;
  }
`;

const DisplayTouchTitle = styled.h3`
  color: white;
  margin: 2.4rem 0 0 0;
  font-size: 1.4rem;
  font-weight: 500;
  visibility: hidden;
  opacity: 0;

  @media ${viewports.small()} {
    min-height: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    visibility: visible;
    opacity: 1;
  }
`;

const DisplayTouchControls = styled.div`
  display: grid;
  width: 100%;
  height: 5.6rem;
  grid-template-columns: 5.6rem 5.6rem auto;
  column-gap: 1.2rem;
  margin: 1.2rem 0 3.2rem 0;
`;

const displayButtonStyle = `
  width: 100%;
  height: 100%;
  font-size: 1.4rem;
  border: 2px solid rgba(255, 255, 255, 0.24);
  color: white;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4em;
  transition: all 0.12s;
  cursor: pointer;
  outline: none;
  user-select: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:not([data-status='disabled']) {
    &:hover {
      border: 2px solid rgba(255, 255, 255, 1);
    }
    &:active {
      transform: scale(0.92);
    }
  }

  &[data-status="disabled"] {
    cursor: not-allowed;
  }

`;

const DisplayButton = styled.button`
  ${displayButtonStyle}
`;

const DisplayButtonLink = styled.a`
  ${displayButtonStyle}
`;

const StyledDisplay = styled.section`
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

const DisplaySelectWrapper = styled.section`
  align-self: flex-start;
  color: white;
  padding 0 0.4rem;
  font-size: 1.4rem;
  margin: 0 0 1.2rem 0;

  @media ${viewports.small()} {
    align-self: center;
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
  -moz-appearance: none;
`;

const DisplayOption = styled.option`
  color: black;
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
    visibility: hidden;
    opacity: 0;
    user-select: none;
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

  @media ${viewports.medium()} {
    font-size: 1.4rem;
    line-height: 1.4em;

    &.active {
      color: rgba(255, 255, 255, 1);

      ${DisplayArrow} {
        opacity: 1;
        animation: ${pointing} 1.2s linear infinite;
      }
    }
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

  @media ${viewports.small()} {
    margin: 0.4rem 1.2rem;
  }
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

  @media ${viewports.medium()} {
    width: 92%;
  }

  @media ${viewports.small()} {
    grid-column: inherit;
    padding: 0;
    width: 100%;
  }
`;

const DisplayListWrapper = styled.div`
  width: 100%;

  @media ${viewports.small()} {
    display: none;
  }
`;

// Not sure if needed
const StyledDisplayListInner = styled.div`
  width: 100%;
`;

const DisplayListInner = ({ onEnter = () => {}, children, ...restProps }) => {
  const ele = useRef(null);
  const prevHeight = useRef(null);

  const setHeight = () => {
    onEnter(ele.current.offsetHeight);
    prevHeight.current = ele.current.offsetHeight;
  };

  useEffect(() => {
    // Cover case when switching viewports
    window.addEventListener('resize', setHeight);

    return () => {
      window.removeEventListener('resize', setHeight);
    };
  }, []);

  useEffect(() => {
    if (prevHeight.current === ele.current.offsetHeight) return;
    setHeight();
  }, [children]);

  return (
    <StyledDisplayListInner ref={ele} {...restProps}>
      {children}
    </StyledDisplayListInner>
  );
};

const hasURL = url => {
  return url
    ? { href: url, target: '_blanked' }
    : { 'data-status': 'disabled' };
};

const workMap = {
  projects,
  experiments,
};

const Work = ({ style, handleSelect }) => {
  const [work, setWork] = useState(projects);
  const [activeIndex, setActiveIndex] = useState(0);
  const [changed, setChanged] = useState(false);

  const handleChange = e => {
    const { value } = e.target;

    if (workMap[value]) {
      setWork(workMap[value]);
      setChanged(true);
      setActiveIndex(0);
    }
  };

  const getHeight = height => {
    gsap.to('.display-list-wrapper', 0.24, { height });
  };

  const increment = () => {
    setActiveIndex(state => (state + 1) % work.length);
  };

  const decrement = () => {
    setActiveIndex(state => (state === 0 ? work.length - 1 : state - 1));
  };

  useEffect(() => {
    const project = work[activeIndex];
    if (project) {
      handleSelect(project._id);
    }
  }, [activeIndex, work]);

  useEffect(() => {
    if (changed) {
      setChanged(false);
      gsap.fromTo(
        '.list-node',
        0.32,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, stagger: 0.1 },
      );
    }
  }, [changed]);

  const activeProject = work[activeIndex];

  return (
    <DisplayList data-name="projects" cols={1} style={style}>
      <DisplaySelectWrapper>
        Show me:
        <DisplaySelectContainer>
          <DisplaySelect name="work" onChange={handleChange}>
            <DisplayOption value="projects">Projects</DisplayOption>
            <DisplayOption value="experiments">Experiments</DisplayOption>
          </DisplaySelect>
        </DisplaySelectContainer>
      </DisplaySelectWrapper>
      <DisplayListWrapper className="display-list-wrapper">
        <DisplayListInner onEnter={getHeight}>
          {work.map((project, idx) => (
            <DisplayCopy
              key={project._id}
              {...hasURL(project.url)}
              onMouseEnter={() => {
                handleSelect(project._id);
              }}
              className={`list-node ${activeIndex === idx ? 'active' : ''}`}
            >
              <DisplayMeta>
                {project.title}
                {project.status && (
                  <DisplayStatus>{project.status}</DisplayStatus>
                )}
              </DisplayMeta>
              <DisplayArrow>→</DisplayArrow>
            </DisplayCopy>
          ))}
        </DisplayListInner>
      </DisplayListWrapper>
      <DisplayTouch>
        <DisplayTouchTitle>
          {activeProject.title}
          {activeProject.status && (
            <DisplayStatus>{activeProject.status}</DisplayStatus>
          )}
        </DisplayTouchTitle>
        <DisplayTouchControls>
          <DisplayButton onClick={decrement}>←</DisplayButton>
          <DisplayButton onClick={increment}>→</DisplayButton>
          <DisplayButtonLink {...hasURL(activeProject.url)}>
            Visit
          </DisplayButtonLink>
        </DisplayTouchControls>
      </DisplayTouch>
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

const Display = () => {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = id => {
    if (selectedId === id) return;
    setSelectedId(id);
  };

  return (
    <StyledDisplay>
      <Grid>
        <DisplayLabel>
          Bojan <br /> Wilytsch
        </DisplayLabel>
        <DisplayLabel>
          London, <br /> UK
        </DisplayLabel>
        <DisplayLabel style={{ ...columnRange(4) }}>
          v0.1 <Em />
          {new Date().getFullYear().toString()}
        </DisplayLabel>
      </Grid>
      <DisplayHeroGrid>
        <DisplayHeroHalf>
          <DisplayPreview>
            <Surface ratio={[1, 1]} projectId={selectedId} />
          </DisplayPreview>
        </DisplayHeroHalf>
        <DisplayHeroHalf>
          <Work handleSelect={handleSelect} />
        </DisplayHeroHalf>
      </DisplayHeroGrid>
      <Navigation />
    </StyledDisplay>
  );
};

const CVEntry = styled.section`
  margin: 0 0 1.4rem 0;
`;

export default function Home() {
  return (
    <Main>
      <Display />
      <Grid>
        <Headline>About</Headline>
      </Grid>
      <Grid>
        <Subheadline style={{ ...columnRange(1, 4) }}>
          Hi! I am Bojan, a London based Developer with a passion for connecting
          design, art, and technology. I get a kick out of learning about
          patterns, motion, algorithms, and human user interfaces that connect
          the dots a little better. Currently working at Fnatic, formerly
          Facebook, Oculus, and Google.
        </Subheadline>
      </Grid>
      <Grid cols={2}>
        <section>
          <Label>Professional</Label>
          <CopyHeadline>Experience</CopyHeadline>
          <Copy>
            <CVEntry>
              <CVDate>Sept 2019 - Present</CVDate>
              Creative Technologist <Em /> Fnatic
            </CVEntry>
            <CVEntry>
              <CVDate>May 2017 - May 2019</CVDate>
              UX Engineer & Product Designer <Em /> Oculus & Facebook
            </CVEntry>
            <CVEntry>
              <CVDate>August 2016 - May 2017</CVDate>
              Interaciton Designer <Em /> Google (via Harvey Nash Group)
            </CVEntry>
            <CVEntry>
              <CVDate>Feb 2013 - Jul 2016</CVDate>
              Freelance Designer & Developer
            </CVEntry>
            <CVLink href="https://docs.google.com/presentation/d/1nljKBKEihwkZvuzp3F1869hhVtG2Od1m9xxabJY9Yz0/edit?usp=sharing">
              View Detailed CV
            </CVLink>
          </Copy>
        </section>
        <section>
          <Label>Recognition</Label>
          <CopyHeadline>Awards</CopyHeadline>
          <Copy>
            <CVEntry>1x Develeoper Awards - Awwwards</CVEntry>
            <CVEntry>2x Site of the Day — Awwwards</CVEntry>
            <CVEntry>1x Site of the Day — CSSDesignAwards</CVEntry>
          </Copy>
        </section>
      </Grid>
      <Grid cols={2}>
        <section>
          <Label>Personal</Label>
          <CopyHeadline>Mechanical Keyboards Enthusiast</CopyHeadline>
          <Copy>
            Daily driver — 64%, Brass Plate, lubbed with 205g0 Krytox, TX Films,
            Gateron Yellow Inks, MaxKey BW SA keycaps, frosted low profile case.
          </Copy>
          <Copy>Plaid, Planck and custom 60% build.</Copy>
        </section>
      </Grid>
      <Grid>
        <section style={{ ...columnRange(1, 2) }}>
          <Label>Build With</Label>
          <Copy>
            <CVLink href="https://rsms.me/inter/">Inter Typeface</CVLink>
            <CVLink href="https://vercel.com/">NextJS</CVLink>
            <CVLink href="https://styled-components.com/">
              Styled Components
            </CVLink>
            <CVLink href="https://threejs.org">ThreeJS</CVLink>
            <CVLink href="https://reactjs.org">React</CVLink>
          </Copy>
        </section>
        <section>
          <Label>To DOs</Label>
          <Copy>
            Dark Mode <br />
            Image-Loader WebWorker
          </Copy>
        </section>
      </Grid>
      <FlexGrid style={{ flexDirection: 'row', margin: '2.4rem  0 6.4rem 0' }}>
        <GraphicGrid />
        <GraphicDial />
        <GraphicInput />
      </FlexGrid>
      <Footer />
    </Main>
  );
}

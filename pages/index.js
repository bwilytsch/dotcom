import Head from 'next/head'
import styled from 'styled-components';

const Main = styled.div`
  font-size: 14rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1em;
  text-transform: uppercase;
  background: var(--b-bg);
  color: var(--f-base);
  padding: 2.4rem;
  height: 100%;
  width: 100%;
`

const Dot = styled.span`
  color: var(--accent)
`

const Container = styled.div`
  display: inline-block;
  padding: 1.2rem 2.4rem; 
  border-radius: var(--border-radius);
  border: 1px solid var(--f-high);
`
export default function Home() {
  return (
    <Main>
      <Container>
      Coming Soon<Dot>.</Dot>
      </Container>
    </Main>
  )
}

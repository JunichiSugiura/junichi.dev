import { GetStaticProps } from "next";
import { Head, Header } from "components";
import styled, { createGlobalStyle } from "styled-components";

export default function Home() {
  return (
    <Container>
      <Head />
      <GlobalStyle />

      <Header />

      <Main>
      </Main>
      <Footer>
      </Footer>
    </Container>
  );
}

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

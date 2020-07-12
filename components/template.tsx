import styled from "styled-components";
import { GlobalStyle } from "./global-style";
import { Head } from "./head";
import { Header } from "./header";
import { ThemeProvider, fonts } from "logic/styles";

interface Props {
  children: React.ReactNode;
}

export function Template({ children }: Props) {
  return (
    <>
      <Head />
      <GlobalStyle />

      <ThemeProvider>
        <Container>
          <Center>
            <Header />
            <main>
              {children}
            </main>
          </Center>
        </Container>
      </ThemeProvider>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${fonts.sansSerif}
`;

const Center = styled.div`
  max-width: 64rem;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text);
`;

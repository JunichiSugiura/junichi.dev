import {AppProps} from 'next/app'
import styled from "@emotion/styled";
import { GlobalStyle, Header, Head } from "components";
import { theme, ExactTheme } from "logic/styles";
import { ThemeProvider } from "theme-ui"

export default function App({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head />
      <Container>
        <Center>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </Center>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div<{ theme: ExactTheme }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamily.sansSerif}
`;

const Center = styled.div<{ theme: ExactTheme }>`
  max-width: 64rem;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;

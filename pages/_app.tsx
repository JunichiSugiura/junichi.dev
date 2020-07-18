import { AppProps } from "next/app";
import styled from "@emotion/styled";
import { Header, Head } from "src/components";
import { theme, ExactTheme } from "src/logic/styles";
import { ThemeProvider } from "theme-ui";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head />
      <Container>
        <Header />
        <main>{/* <Component {...pageProps} /> */}</main>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div<{ theme: ExactTheme }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: ${({ theme }) => theme.fontFamily.sansSerif};
`;

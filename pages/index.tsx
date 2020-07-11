import { GetStaticProps } from "next";
import styled, {
  createGlobalStyle,
} from "styled-components";
import { Head, Header, Posts } from "components";
import { ThemeProvider, fonts } from "logic/styles";
import fs from "fs";
import path from "path";
import matter from "gray-matter"

export default function Home({posts}) {
  return (
    <>
      <Head />
      <GlobalStyle />

      <ThemeProvider>
        <Container>
          <Center>
            <Header />
            <Posts posts={posts} />
          </Center>
        </Container>
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  :root {
    --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
    --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
    --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
    --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
    --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    transition: background 0.25s var(--ease-in-out-quad);
    padding: 0;
    margin: 0;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: var(--color-background);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${fonts.sansSerif}
`;

const Center = styled.div`
  max-width: 40rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text);
`

export const getStaticProps: GetStaticProps = async () => {
  const posts = fs.readdirSync(path.join("contents")).map(id => {
    const filePath = path.join("contents", id, "blog.md");
    if (!fs.existsSync(filePath)) {
      return;
    }

    return fs.readFileSync(filePath);
  }).filter(f => !!f).map(f => matter(f.toString()).data);

  return {
    props: { posts },
  };
};

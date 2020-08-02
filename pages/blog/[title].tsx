import { GetStaticPaths, GetStaticProps } from "next";
import { getPostAll, getPost, PostData } from "src/logic/models";
import { elevation, ExactTheme } from "src/logic/styles";
import styled from "@emotion/styled";
import YouTube from "react-youtube";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { Pre } from "src/components";

interface Props {
  source: string;
  data: PostData;
}

export default function Post({ source, data }: Props) {
  const content = hydrate(source, {
    pre: Pre,
  });
  return (
    <Container>
      <Title>{data.title}</Title>
      <YouTubeContainer>
        <YouTube
          videoId={data.videoId}
          containerClassName="youtube-container"
        />
      </YouTubeContainer>

      <Content>{content}</Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-wrap: break-word;
  width: 100vw;
  max-width: 50rem;
`;

const Title = styled.h1<{ theme: ExactTheme }>`
  margin: 1rem;
  text-decoration: underline ${({ theme }) => theme.colors.accent};
`;

const tabletVideoWidth = "70vw";
const desktopVideoWidth = "50vw";

const YouTubeContainer = styled.div<{ theme: ExactTheme }>`
  .youtube-container {
    margin-top: 1rem;
    display: flex;
    justify-content: center;

    > iframe {
      width: 100vw;
      height: ${(100 / 1920) * 1080}vw;

      ${({ theme }) => `
        @media screen and (min-width: ${theme.breakpoints[0]})  {
          width: ${tabletVideoWidth};
          height: calc(${tabletVideoWidth} / 1920 * 1080);
          border-radius: ${theme.borderRadius};
          box-shadow: ${elevation[3]};
        }

        @media screen and (min-width: ${theme.breakpoints[1]})  {
          width: ${desktopVideoWidth};
          height: calc(${desktopVideoWidth} / 1920 * 1080);
        }
      `}
    }
  }
`;

const Content = styled.div<{ theme: ExactTheme }>`
  margin-top: 1rem;

  > :not(pre) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPostAll().map((p) => ({
      params: {
        title: p.data.title,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { title } }) => {
  if (typeof title !== "string") {
    throw new Error("Duplicated title");
  }

  const { content, data } = getPost(title);
  const source = await renderToString(content, { pre: Pre });
  return {
    props: {
      source,
      data,
    },
  };
};

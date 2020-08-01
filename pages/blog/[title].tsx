import { GetStaticPaths, GetStaticProps } from "next";
import { getPostAll, getPost, PostData } from "src/logic/models";
import { elevation, ExactTheme } from "src/logic/styles";
import styled from "@emotion/styled";
import YouTube from "react-youtube";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { Code } from "src/components";

interface Props {
  source: string;
  data: PostData;
}

export default function Post({ source, data }: Props) {
  const content = hydrate(source, { code: Code });
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
  padding: 1rem;
`;

const Title = styled.h1<{ theme: ExactTheme }>`
  margin: 1rem 0;
  text-decoration: underline ${({ theme }) => theme.colors.accent};
`;

const YouTubeContainer = styled.div<{ theme: ExactTheme }>`
  .youtube-container {
    margin-top: 1rem;
    display: flex;
    justify-content: center;

    /* TODO: stretch width and height while respecting the aspect ratio of FHD (1920 * 1080) */
    > iframe {
      border-radius: ${({ theme }) => theme.borderRadius};
      box-shadow: ${elevation[3]};
    }
  }
`;

const Content = styled.div<{ theme: ExactTheme }>`
  margin-top: 1rem;
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
  const source = await renderToString(content, { code: Code });
  return {
    props: {
      source,
      data,
    },
  };
};

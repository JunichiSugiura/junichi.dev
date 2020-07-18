import { GetStaticPaths, GetStaticProps } from "next";
import { getPostAll, getPost, PostData } from "src/logic/models";
import { ExactTheme } from "src/logic/styles";
import styled from "@emotion/styled";
import YouTube from "react-youtube";
import { elevation } from "src/logic/styles";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";

interface Props {
  mdxSource: string;
  frontMatter: PostData;
}

export default function Posts({ mdxSource, frontMatter }: Props) {
  const content = hydrate(mdxSource);
  return (
    <>
      <Title>{frontMatter.title}</Title>
      <YouTubeContainer>
        <YouTube
          videoId={frontMatter.videoId}
          containerClassName="youtube-container"
        />
      </YouTubeContainer>

      <Content>
        {/* TODO: code */}
        {content}
      </Content>
    </>
  );
}

const Title = styled.h1<{ theme: ExactTheme }>`
  margin-top: 3.5rem;
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
  const mdxSource = await renderToString(content, null, null, data);
  return {
    props: {
      mdxSource,
      frontMatter: data,
    },
  };
};

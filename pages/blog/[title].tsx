import { GetStaticPaths, GetStaticProps } from "next";
import { getPostAll, getPost, Post } from "logic/models";
import { Template } from "components";
import styled from "styled-components";
import YouTube from 'react-youtube'
import { size, elevation } from "logic/styles"
import Markdown from "react-markdown"

interface Props {
  post: Post;
}

export default function Posts({ post }: Props) {
  return (
    <Template>
      <Title>
        {post.data.title}
      </Title>
      <YouTubeContainer>
        <YouTube videoId={post.data.videoId} containerClassName="youtube-container" />
      </YouTubeContainer>

      <Content>
        {/* // TODO: code */}
        <Markdown source={post.content} />
      </Content>
    </Template>
  );
}

const Title = styled.h1`
  margin-top: 3.5rem;
  text-decoration: underline var(--color-primary);
`;

const YouTubeContainer = styled.div`
  .youtube-container {
    margin-top: 1rem;
    display: flex;
    justify-content: center;

    // TODO: stretch width and height while respecting the aspect ratio of FHD (1920 * 1080)
    > iframe {
      border-radius: ${size.borderRadius};
      box-shadow: ${elevation[3]};
    }
  }
`

const Content = styled.div`
  margin-top: 1rem;

  * {
    margin-bottom: 1.75rem;
  }

  h2 {
    margin-top: 3.5rem;
    font-size: 1.75rem;
  }

  strong {
    text-style: bold;
  }

  blockquote {
    border-left: solid 0.25rem var(--color-text);
    padding-left: 1.5rem;
  }

  hr {
    border-top: solid 0.063rem var(--color-grey);
  }

  // TODO: fix style for nested list
  ul, ol {
    margin-left: 1rem;
    margin-top: 1rem;

    li {
      margin-bottom: 0.75rem;

      input[type="checkbox"] {
        height: inherit;
        margin-right: 0.5rem;
        margin-bottom: 0;
      }
    }
  }

  // TODO: Links
  // TODO: Images
  // TODO: Tables
`

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

  return {
    props: {
      post: getPost(title),
    },
  };
};

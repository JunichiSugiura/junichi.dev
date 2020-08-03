import { GetStaticPaths, GetStaticProps } from "next";
import { Link } from "src/components";
import { getPostAll, getPost, PostData } from "src/logic/models";
import { elevation, ExactTheme } from "src/logic/styles";
import styled from "@emotion/styled";
import YouTube from "react-youtube";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { Pre } from "src/components";
import Img from "react-optimized-image";
import { getThumbnailLink } from "src/logic/sns";
import { canonical } from "src/logic/seo";
import { NextSeo } from "next-seo";

interface Props {
  source: string;
  data: PostData;
  prevPostData: PostData | null;
  nextPostData: PostData | null;
}

export default function Post({
  source,
  data,
  prevPostData,
  nextPostData,
}: Props) {
  const components = getComponents(data);
  const content = hydrate(source, components);
  return (
    <Container>
      <NextSeo
        title={data.title}
        description={data.spoiler}
        openGraph={{
          url: `${canonical}/blog/${data.slug}`,
          images: [
            { url: getThumbnailLink(data.videoId), alt: "Article picture" },
          ],
        }}
      />
      <Title>{data.title}</Title>
      <YouTubeContainer>
        <YouTube
          videoId={data.videoId}
          containerClassName="youtube-container"
        />
      </YouTubeContainer>

      <Content>{content}</Content>

      <Navigator>
        {prevPostData && (
          <Link href={prevPostData.slug}>
            <a>{`← ${prevPostData.title}`}</a>
          </Link>
        )}
        {nextPostData && (
          <Link href={nextPostData.slug}>
            <a>{`${nextPostData.title} →`}</a>
          </Link>
        )}
      </Navigator>
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

const Navigator = styled.div<{ theme: ExactTheme }>`
  display: flex;
  flex-direction: row;
  padding 1rem;

  a {
    ${({ theme }) => `
      text-decoration: underline;
      text-decoration-color: ${theme.colors.accent};
      font-weight: bold;
    `}
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPostAll().map((p) => ({
      params: {
        slug: p.data.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  if (typeof slug !== "string") {
    throw new Error("Duplicated title");
  }

  const { content, ...post } = getPost(slug);
  const components = getComponents(post.data);
  const source = await renderToString(content, components);
  return {
    props: {
      source,
      ...post,
    },
  };
};

function getComponents(data: PostData) {
  return {
    pre: Pre,
    // eslint-disable-next-line react/display-name
    img: ({ src, ...props }: { src: string }) => (
      <Img
        {...props}
        src={require(`documents/contents/${data.date}/${src.replace(
          "./",
          ""
        )}`)}
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
        sizes={[1920]}
      />
    ),
  };
}

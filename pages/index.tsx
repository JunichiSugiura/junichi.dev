import { GetStaticProps } from "next";
import { getPostDataAll, PostData } from "src/logic/models";
import { ExactTheme } from "src/logic/styles";
import { Profile, Posts, Link } from "src/components";
import styled from "@emotion/styled";

interface Props {
  posts: PostData[];
}

export default function Home({ posts }: Props) {
  return (
    <>
      <Profile />
      <Header>新着記事</Header>
      <Posts posts={posts} />
      <Link href="/blog">
        <ReadMore>もっとみる →</ReadMore>
      </Link>
    </>
  );
}

const Header = styled.h2`
  font-size: 0.875rem;
  margin: 0 1rem;
  display: flex;
  justify-content: center;
`;

const ReadMore = styled.a<{ theme: ExactTheme }>`
  font-size: 0.875rem;
  display: flex;
  justify-content: center;
  margin: 0 0 1rem;
  ${({ theme }) => `
    color: ${theme.colors.muted};
    text-decoration: underline ${theme.colors.accent};
  `}
`;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { posts: getPostDataAll({ limit: 3 }) },
  };
};

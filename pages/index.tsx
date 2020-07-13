import { GetStaticProps } from "next";
import { getPostDataAll, PostData } from "logic/models";
import { Posts } from "components";

interface Props {
  posts: PostData[];
}

export default function Home({ posts }: Props) {
  return (
    <Posts posts={posts} />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { posts: getPostDataAll() },
  };
};

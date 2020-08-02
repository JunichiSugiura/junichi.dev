import { GetStaticProps } from "next";
import { getPostDataAll, PostData } from "src/logic/models";
import { Profile, Posts } from "src/components";

interface Props {
  posts: PostData[];
}

export default function Home({ posts }: Props) {
  return (
    <>
      <Profile />
      <Posts posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { posts: getPostDataAll({ limit: 3 }) },
  };
};

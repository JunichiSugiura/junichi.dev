import { GetStaticProps } from "next";
import { Posts } from "src/components";
import { getPostDataAll, PostData } from "src/logic/models";

export default function Blog({ posts }: { posts: PostData[] }) {
  return (
    <>
      <Posts posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { posts: getPostDataAll() },
  };
};

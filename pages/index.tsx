import { GetStaticProps } from "next";
import { getPostDataAll } from "logic/models";
import { Template, Posts } from "components";

export default function Home({ posts }) {
  return (
    <Template>
      <Posts posts={posts} />
    </Template>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { posts: getPostDataAll() },
  };
};

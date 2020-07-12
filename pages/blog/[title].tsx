import { GetStaticPaths, GetStaticProps } from "next";
import { getPostAll, getPost, Post } from "logic/fs";
import { Template } from "components";

interface Props {
  post: Post;
}

export default function Posts({ post }: Props) {
  return (
    <Template>
      {JSON.stringify(post, null, 2)}
    </Template>
  );
}

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

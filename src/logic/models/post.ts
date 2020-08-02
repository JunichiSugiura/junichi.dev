import path from "path";
import fs from "fs";
import matter, { GrayMatterFile, Input } from "gray-matter";
import moment from "moment";

const contentsPath = path.join("documents", "contents");

interface GetOptions {
  limit?: number;
}

export function getPostAll(options: GetOptions = {}): Post[] {
  const posts = fs
    .readdirSync(contentsPath)
    .map((dirName) => {
      const filePath = path.join(contentsPath, dirName, "blog.md");
      if (!fs.existsSync(filePath)) {
        return;
      }

      if (process.env.NODE_ENV === "production" && dirName === "test") {
        return;
      }

      return fs.readFileSync(filePath);
    })
    .filter((f) => !!f)
    .slice(0, options.limit)
    .map((f) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { orig, ...post } = matter(f);
      return post;
    })
    .sort((m1, m2) => (moment(m1.data.date).isAfter(m2.data.date) ? -1 : 1));

  return posts as Post[];
}

export function getPostDataAll(options?: GetOptions): PostData[] {
  return getPostAll(options).map((m) => m.data);
}

export function getPost(title: string): Post {
  const posts = getPostAll();
  const i = posts.findIndex((m) => m.data.title === title);
  const post = posts[i];
  const prevPostData = posts[i - 1]?.data ?? null;
  const nextPostData = posts[i + 1]?.data ?? null;
  return { ...post, prevPostData, nextPostData };
}

export interface Post extends GrayMatterFile<Input> {
  data: PostData;
  orig: undefined;
  prevPostData: PostData | null;
  nextPostData: PostData | null;
}

export interface PostData {
  title: string;
  videoId: string;
  date: string;
  spoiler: string;
  cta: string[];
}

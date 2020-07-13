import path from "path";
import fs from "fs";
import matter, { GrayMatterFile, Input } from "gray-matter";
import moment from 'moment'

export function getPostAll(): Post[] {
  const posts = fs.readdirSync(path.join("contents"))
    .map((dirName) => {
      const filePath = path.join("contents", dirName, "blog.md");
      if (!fs.existsSync(filePath)) {
        return;
      }

      if (process.env.NODE_ENV === 'production' && dirName === "test") {
        return
      }

      return fs.readFileSync(filePath);
    })
    .filter((f) => !!f)
    .map((f) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { orig, ...post } = matter(f);
      return post;
    }).sort((m1, m2) =>
      moment(m1.data.date)
        .isAfter(m2.data.date)
          ? -1
          : 1
      );

  return posts as Post[];
}

export function getPostDataAll(): PostData[] {
  return getPostAll().map((m) => m.data);
}

export function getPost(title: string): Post {
  return getPostAll().find((m) => m.data.title === title);
}

export interface Post extends GrayMatterFile<Input> {
  data: PostData;
  orig: undefined;
}

export interface PostData {
  title: string;
  videoId: string;
  date: string;
  spoiler: string;
  cta: string[];
}

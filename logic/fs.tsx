import path from "path";
import fs from "fs";
import matter, { GrayMatterFile, Input } from "gray-matter";

export function getPostAll(): Post[] {
  const posts = fs.readdirSync(path.join("contents"))
    .map((id) => {
      const filePath = path.join("contents", id, "blog.md");
      if (!fs.existsSync(filePath)) {
        return;
      }

      return fs.readFileSync(filePath);
    })
    .filter((f) => !!f)
    .map((f) => {
      const { orig, ...post } = matter(f);
      return post;
    });

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

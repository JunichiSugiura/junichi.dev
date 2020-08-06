---
title:
description: >

  ------------- 📌 Chapters -------------
  0:00 今回やること
  0:50 index.tsxの編集
  1:25 index.md テンプレートについて
  4:27 next-mdx-remote と grey-matterのインストール
  6:15 title.tsx の設定
  9:17 front-matterの設定
  18:55 jxsの設定(レイアウトの設定)
  

  # ----------- 🔔 チャンネル登録はこちらから -----------
  # https://www.youtube.com/channel/UC9IdI7wrSz9S3y5QxHvFseg?sub_confirmation=1
  # 今後もエンジニアに欠かせない情報、ワクワクする情報を発信していくので、
  # 通知を受け取りたい方はぜひ！

  # -------------📱 SNSはこちらから -------------
  # Twitter: https://twitter.com/JunichiSugiura
  # GitHub: https://github.com/JunichiSugiura
  # Instagram: https://www.instagram.com/junichisugiura_

  # ---------- 💁‍♂️ 自己紹介 ----------
  # エンジニア・OSS コントリビュータ
  # 現在はフランスのパリに住んでいます。
  # 普段は暗号通貨のハードウェアウォレットを作っています。
  # みなさんの暗号資産をできる限り安全に管理できるようにするのが仕事です。

  ---------- 🙏 ATTRIBUTION ----------
thumbnailKeywords:
  -
tags:
  # - プログラミング
  # - エンジニア
  # - プログラマー
  # - 開発
  # - 学習
  # - テック
  # - 海外就職
  # - キャリア
  -
link: https://youtu.be/VIDEO_ID
publishedAt: 2020-07-31 05:00:00
playlists:
  -
endScreen:
  elements:
    - "Video: Best for viewer"
    - "Subscribe: Junichi"
sns:
  post:
  twitter:
---

## Outline

## Intro

今回はホームをまず static server generation を使ってレンダーして、そのあと next-mdx-remote というライブラリーを主に使ってブログページを実装していきたいと思います。
では早速コーディングしていきましょう!

## Main

ブラウザーの方で前回作ったホームを見ると右下の方に雷マークが見えるかと思います。これはServer Side Renderingを通して作られたページだよという意味です。

今回はServer Side Generationを使ってページを生成したいので、そのためにindex.tsxを変更していきたいと思います。

NextJSでは各ページから`getStaticProps`というfunctionをexportしておくことだけで、build時にページを生成してくれます。

なのでまずはそちらを書いていきたいと思います。

### Server side generation

```tsx
// pages/index.tsx

import { GetStaticProps } from "next";
// ...
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
```
いくつかポイントととしては、`props`を返すことによってdefaultとしてexportしているコンポーネントに必要なpropsを渡すことができます。
あと`getStaticProps`はasync functionになっているので外部からAPI requestなどを通して必要な情報をfetchしてくる場合にも便利になってます。

### Create Blog pages

今度はブログページの方を作っていきますか。参考にできる文章があるといいので、reduxのクリエイターとして有名なDan Abramovさんのブログから記事を借りてきたいと思います。彼のブログはGatsbyJSによって作られているんですが、記事自体はmdファイルとしてGitHubの方に上がっているので、そこからコピーしてきたいと思います。

[overreacted.io/pages](https://github.com/gaearon/overreacted.io/tree/master/src/pages)

彼の場合はpages以下に記事毎にディレクトリを作っていて、その中で英語記事や翻訳記事、あとは記事の中で使われている画像ファイルなどが入っています。

今回はこの一番上の記事をお借りしましょうか。エディターに戻って`blog/`ディレクトリ以下に同じ用に記事ごとのディレクトリを作ります。そして日本語記事をrawページからコピーしてきます。

```sh
mkdir -r ./pages/blog/a-complete-guide-to-useeffect
touch index.ja.md
```

念の為、パクってきたことがわかるように元記事のリンクを貼っておきたいと思います。

```md
<!- pages/blog/a-complete-guide-to-useeffect/index.ja.md ->

This article was originally posted [here](https://raw.githubusercontent.com/gaearon/overreacted.io/master/src/pages/a-complete-guide-to-useeffect/index.ja.md).
Thanks, Dan for open sourcing the article.
```

次にブログのページを作っていきたいんですけど、mdファイルをmdxとしてReact側に読み込むために２つライブラリーをインストールしたいと思います。

1つ目は[gray-matter](https://github.com/jonschlinkert/gray-matter)というやつで、これはfrontmatter（mdファイルの一番上に書いてあるmeta情報ですね）、これをparseするために使います。Gatsbyでもこのライブラリーが使われているみたいです。

そして記事自体をparseしてjsxに変換するするためにNextJSの方から公式で[@next/mdx](https://github.com/vercel/next.js/tree/canary/packages/next-mdx)っていうwebpackのプラグインがあるんですけど、記事が多くなってきた時に全記事データをcacheするためにメモリーをすごい消費したりとか、拡張性がなくて、mdファイルを好きなように配置したりとか、外部のサーバーに置いたりみたいなことが難しいので、今回は[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)っていうTerraformで有名なHashiCorpが作っているプラグインを使っていきたいと思います。ちなみに今個人的にこのライブラリーのTypeScript化に向けてPRを出したので、次のバージョンくらいからは型情報も入ってもっと使いやすくなると思います。

じゃあまずはこの２つをインストールしましょうか。

```sh
yarn add next-mdx-remote gray-matter
```

で、次にやらないといけないことなんですけど、

まずビルド時にNextJSの方に各記事へのルーティングに必要なpathsが何があるのかということを伝えるために、カギ括弧で`[title].tsx`っていうファイルを作って、その中から`getStaticPaths`というfunctionをexportしていきます。俗に言うダイナミックルーティングっていうやつです。

まずは`[title].tsx`を作って、

```sh
touch ./pages/blog/\[title\].tsx
```

この中に一旦ざっくりしたfunctionを書いちゃいますね。あとでまとめて説明します。

```tsx
// pages/blog/[title].tsx

export default function Post({ title }: { title: string }) {
  return (
    <>
      <h1>Title: {title}</h1>
    </>
  );
}

const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params: { title }　}) => {
  return {
    props: params,
  };
};
```

はい、ということでコードがかけたので、説明していくと、まず、pathsの中には`title`propertyが入ったparamsオブジェクトを入れていきます。それがファイル名のtitleに渡って、blog/のあとに続くpathを生成してくれます。

例えばここに、

```tsx
// pages/blog/[title].tsx

const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          title: "投稿1"
        }
      },
      {
        params: {
          title: "投稿2"
        }
      },
      {
        params: {
          title: "投稿3"
        }
      }
    ],
    fallback: false
  }
}
```

と書いた場合、ブラウザーの方で`/blog/投稿1`にアクセスすると、ちゃんとページが生成されているのが、確認できるかと思います。

そして、ちゃんとページ内のタイトルもかわってますよね。これはgetStaticPropsの方で、引数の中から渡ってきたparamsからtitleをdestructuringして、propsとしてリターンすることで一番上のPostコンポーネントに渡してあげてるからです。

なので次は、getStaticPaths内で、returnの前にローカルのmdファイルを全て読みにいって、pathsにarrayとしてつめてリターンするようなコードを書いていきたいと思います。

### Create params based on local *.md files

```tsx
// pages/blog/[title].tsx

// まずは
const blogDirPath = path.join("pages", "blog")

function getPostAll() {
  return fs
     // `blog/` 以下のdirectory entryをとってくる
     // { withFileTypes: true } によってdirectory名に加えてファイルの情報も入ったオブジェクトが返ってくる
    .readdirSync(blogDirPath, { withFileTypes: true })
    // subdirectoryのみをfilter
    .filter((dir) => dir.isDirectory())
    // 全てのファイルを読み込んで一つのarrayに並べる
    .flatMap((dirEnt) => {
      const dirPath = path.join(blogDirPath, dirEnt.name);
      return fs
        .readdirSync(dirPath)
        .map((fileName) => fs.readFileSync(path.join(dirPath, fileName)));
    })
    // gray-matterを使ってfrontmatter(mdファイルの最初の部分)をparseする
    // origは扱いづらいし使わないので外す
    .map((f) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { orig, ...post } = matter(f);
      return post;
    });
}
```

これを使ってgetStaticPathsを書き換えましょう

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPostAll().map((m) => ({
      params: {
        title: m.data.title,
      },
    })),
    fallback: false,
  };
};
```

そしてgetStaticPropsの方では一旦そのままpost contentとdataを渡したいと思います。

```tsx
export const getStaticProps: GetStaticProps = async ({ params: { title } }) => {
  // title paramsを元に対象の記事をfilterします。
  const { content, data } = getPostAll().find(
    (matter) => matter.data.title === title
  );
  return {
    props: { content, data },
  };
};
```

そしてPostコンポーネントの方でrenderしてみましょっか

```tsx
interface Props {
  content: string;
  data: PostData;
}

interface PostData {
  title: string;
  data: string;
  spoiler: string;
}

export default function Post({ content, data }: Props) {
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {content}
    </>
  );
}
```

ブラウザーで見てみると、
こんな感じでちゃんとfrontmatterとcontentが表示されてますね。
ただcontentはただのstringを貼ってるだけで、これだとstyling難しいので、しっかりとjsxにformatしてrenderしたいと思います。next-mdx-remoteの出番ですよね。

```tsx
// ...
import renderToString from "next-mdx-remote/render-to-string"

// ...

export const getStaticProps: GetStaticProps = async ({ params: { title } }) => {
  const { content, data } = getPostAll().find(
    (m) => m.data.title === title
  );

  // mdxで書かれたstring contentをjsx stringに変換します。
  const source = await renderToString(content)

  return {
    props: { source, data },
  };
};
```

```tsx
// ...
import hydrate from "next-mdx-remote/hydrate"

interface Props {
  source: Parameters<hydrate>[0];
  data: PostData;
}
// ...
export default function Post({ source, data }: Props) {
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {hydrate(source)}
    </>
  );
}
```

## Ending

ということで今回はブログページの方を実装して来ましたがいかがだったでしょうか？
次回は Theme UI と emotion を使ってページのスタイリングと Dark Theme の設定をしていこうと思っているので、気になる方はチャンネル登録の方よろしくおねがいします。
じゃあまたね 👋

### Announcement

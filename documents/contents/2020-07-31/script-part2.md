---
title: Next.jsで作る技術ブログ [Part2 - SSG + ルーティング]
description: >
  今回はサーバーサイドレンダリングに代わってSSG(サーバーサイドジェネレーション)を使ってホームとブログページを作っていきます。MDXで書かれたブログ記事の配置方法からルーティング、フロントマッターのパース、Markdownをhtmlに変換する方法までを一緒に開発していきます。💻

  次回はTheme UIとemotionを使ったページのスタイリングとDark Themeの設定をしていこうと思っているのでお楽しみに💪

  質問等ございましたら、コメント欄にてご連絡ください 😉

  ----- 📝 詰まったらこちらを参考にしてみてください -----
  チュートリアルのソースコード: https://github.com/JunichiSugiura/tutorials/tree/main/nextjs-blog

  #毎週金曜14時投稿 #プログラミング #チュートリアル

  ------------- 📌 Chapters -------------
  0:00 今回やること
  0:13 SSG (Server Side Generation)
  0:36 getStaticProps
  2:00 ブログ記事(.md)の準備
  4:13 next-mdx-remoteとgray-matterのインストール
  5:57 ルーティング
  10:27 dir名からpathを生成
  14:32 Front Matterをパース
  18:48 マークダウンをhtmlに変換

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
tags:
  # - プログラミング
  # - エンジニア
  # - プログラマー
  # - 開発
  # - 学習
  # - テック
  # - 海外就職
  # - キャリア
  - ブログ
  - 技術ブログ
  - 初期設定
  - チュートリアル
  - TypeScript
  - React
  - Nextjs
  - next-mdx-remote
  - gray-matter
  - mdx
link: https://youtu.be/MzQZo6p4Qno
publishedAt: 2020-08-07 05:00:00
playlists:
  - Next.jsで作る技術ブログ [チュートリアル]
endScreen:
  elements:
    - "Video: Best for viewer" #TODO: "Video: 2020-07-31-part3"
    - "Subscribe: Junichi"
    - "Video: Recently uploaded"
sns:
  post: 今週は"技術ブログチュートリアル"のPart2としてSSGを使ったページの生成方法から記事ページのルーティング、MarkdownやFront Matterのパース方法などを説明していきます💻 チャンネル登録まだの方はぜひお願いします🔔🤟#プログラミング #エンジニア https://youtu.be/MzQZo6p4Qno
  twitter:
---

## Outline

## Intro

今回はホームをまず static server generation を使ってレンダーして、そのあと next-mdx-remote というライブラリーを主に使ってブログページを実装していきたいと思います。
では早速コーディングしていきましょう!

## Main

ブラウザーの方で前回作ったホームを見ると右下の方に雷マークが見えるかと思います。これは Server Side Rendering を通して作られたページだよという意味です。

今回は Server Side Generation を使ってページを生成したいので、そのために index.tsx を変更していきたいと思います。

NextJS では各ページから`getStaticProps`という function を export しておくことだけで、build 時にページを生成してくれます。

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

いくつかポイントととしては、`props`を返すことによって default として export しているコンポーネントに必要な props を渡すことができます。
あと`getStaticProps`は async function になっているので外部から API request などを通して必要な情報を fetch してくる場合にも便利になってます。

### Create Blog pages

今度はブログページの方を作っていきますか。参考にできる文章があるといいので、redux のクリエイターとして有名な Dan Abramov さんのブログから記事を借りてきたいと思います。彼のブログは GatsbyJS によって作られているんですが、記事自体は md ファイルとして GitHub の方に上がっているので、そこからコピーしてきたいと思います。

[overreacted.io/pages](https://github.com/gaearon/overreacted.io/tree/master/src/pages)

彼の場合は pages 以下に記事毎にディレクトリを作っていて、その中で英語記事や翻訳記事、あとは記事の中で使われている画像ファイルなどが入っています。

今回はこの一番上の記事をお借りしましょうか。エディターに戻って`blog/`ディレクトリ以下に同じ用に記事ごとのディレクトリを作ります。そして日本語記事を raw ページからコピーしてきます。

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

次にブログのページを作っていきたいんですけど、md ファイルを mdx として React 側に読み込むために２つライブラリーをインストールしたいと思います。

1 つ目は[gray-matter](https://github.com/jonschlinkert/gray-matter)というやつで、これは frontmatter（md ファイルの一番上に書いてある meta 情報ですね）、これを parse するために使います。Gatsby でもこのライブラリーが使われているみたいです。

そして記事自体を parse して jsx に変換するするために NextJS の方から公式で[@next/mdx](https://github.com/vercel/next.js/tree/canary/packages/next-mdx)っていう webpack のプラグインがあるんですけど、記事が多くなってきた時に全記事データを cache するためにメモリーをすごい消費したりとか、拡張性がなくて、md ファイルを好きなように配置したりとか、外部のサーバーに置いたりみたいなことが難しいので、今回は[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)っていう Terraform で有名な HashiCorp が作っているプラグインを使っていきたいと思います。ちなみに今個人的にこのライブラリーの TypeScript 化に向けて PR を出したので、次のバージョンくらいからは型情報も入ってもっと使いやすくなると思います。

じゃあまずはこの２つをインストールしましょうか。

```sh
yarn add next-mdx-remote gray-matter
```

で、次にやらないといけないことなんですけど、

まずビルド時に NextJS の方に各記事へのルーティングに必要な paths が何があるのかということを伝えるために、カギ括弧で`[title].tsx`っていうファイルを作って、その中から`getStaticPaths`という function を export していきます。俗に言うダイナミックルーティングっていうやつです。

まずは`[title].tsx`を作って、

```sh
touch ./pages/blog/\[title\].tsx
```

この中に一旦ざっくりした function を書いちゃいますね。あとでまとめて説明します。

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
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { title } }) => {
  return {
    props: params,
  };
};
```

はい、ということでコードがかけたので、説明していくと、まず、paths の中には`title`property が入った params オブジェクトを入れていきます。それがファイル名の title に渡って、blog/のあとに続く path を生成してくれます。

例えばここに、

```tsx
// pages/blog/[title].tsx

const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          title: "投稿1",
        },
      },
      {
        params: {
          title: "投稿2",
        },
      },
      {
        params: {
          title: "投稿3",
        },
      },
    ],
    fallback: false,
  };
};
```

と書いた場合、ブラウザーの方で`/blog/投稿1`にアクセスすると、ちゃんとページが生成されているのが、確認できるかと思います。

そして、ちゃんとページ内のタイトルもかわってますよね。これは getStaticProps の方で、引数の中から渡ってきた params から title を destructuring して、props としてリターンすることで一番上の Post コンポーネントに渡してあげてるからです。

なので次は、getStaticPaths 内で、return の前にローカルの md ファイルを全て読みにいって、paths に array としてつめてリターンするようなコードを書いていきたいと思います。

### Create params based on local \*.md files

```tsx
// pages/blog/[title].tsx

// まずは
const blogDirPath = path.join("pages", "blog");

function getPostAll() {
  return (
    fs
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
      })
  );
}
```

これを使って getStaticPaths を書き換えましょう

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

そして getStaticProps の方では一旦そのまま post content と data を渡したいと思います。

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

そして Post コンポーネントの方で render してみましょっか

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
こんな感じでちゃんと frontmatter と content が表示されてますね。
ただ content はただの string を貼ってるだけで、これだと styling 難しいので、しっかりと jsx に format して render したいと思います。next-mdx-remote の出番ですよね。

```tsx
// ...
import renderToString from "next-mdx-remote/render-to-string";

// ...

export const getStaticProps: GetStaticProps = async ({ params: { title } }) => {
  const { content, data } = getPostAll().find((m) => m.data.title === title);

  // mdxで書かれたstring contentをjsx stringに変換します。
  const source = await renderToString(content);

  return {
    props: { source, data },
  };
};
```

```tsx
// ...
import hydrate from "next-mdx-remote/hydrate";

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

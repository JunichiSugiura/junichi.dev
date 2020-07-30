---
title: Next.jsで作る技術ブログ [Part1 - セットアップ]
description: >

  ------------- 📌 Chapters -------------
  0:00

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

今回は NextJS を使ってブログを作るチュートリアルの第１段としてプロジェクトのセットアップを一緒にやっていこうと思います。
主にやることととしては

1. NextJS のプロジェクトのセットアップ
1. TypeScript のインテグレーション
1. ESLint と Prettier を使った linter のセットアップ
1. 簡単なホームページの作成
1. head の設定

を考えています。

では早速コーディングしていきましょう！

## Main

### Setup project

```sh
npx create-next-app
> ✔ What is your project named? … next-blog
> ✔ Pick a template › Default starter app

cd next-blog
code .
```

```sh
yarn dev
```

![NextJS Starter][./nextjs-starter.png]

### Setup TypeScript

```sh
touch tsconfig.json
yarn add -D typescript @types/react @types/node
mv ./pages/index.js ./pages/index.tsx
rm -rf ./pages/api
yarn dev
```

```json
// tsconfig.json

{
  "compilerOptions": {
    "baseUrl": ".", // <- here
    ...
  },
  ...
}
```

### Setup linter

```sh
# yarn add -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier
# touch .eslintrc
npx eslint --init
? How would you like to use ESLint?
> To check syntax and find problems
? What type of modules does your project use?
> JavaScript modules (import/export)
? Which framework does your project use?
> React
? Does your project use TypeScript?
> Yes
? Where does your code run?
> Browser
? What format do you want your config file to be in? …
> JavaScript
? Would you like to install them now with npm?
> Yes
```

```json
// package.json
{
  "name": "next-blog",
  ...
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .js,.ts,.tsx" // <- here
  },
  ...
}
```

```js
// .eslintrc.js
/* eslint-env node */ // <- here

module.exports = {
  ...
  "rules": {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "react/react-in-jsx-scope": "off",
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};
```

```sh
yarn lint
```

### Setup Prettier

```sh
yarn add -D prettier eslint-plugin-prettier eslint-config-prettier
```

```js
module.exports = {
  ...
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier" // <- here
  ],
  ...
  "plugins": [
    "react",
    "@typescript-eslint",
    "prettier" // <- here
  ],
  ...
  "rules": {
    ...
    "prettier/prettier": "error"
  },
  ...
};
```

```sh
yarn lint
yarn lint --fix
```

### Setup Home

```tsx
// ./pages/index.tsx

import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>NextJS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Welcome</main>
    </div>
  );
}
```

### Create Head component

```sh
mkdir -p ./src/components
touch ./src/components/index.ts
touch ./src/components/head.tsx
```

```tsx
// ./src/components/index.ts

export * from "./head";
```

```tsx
// ./src/components/head.ts

import NextHead from "next/head";

interface Props {
  title?: string;
}

export function Head({ title = "NextJS Blog" }: Props) {
  return (
    <NextHead>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
}
```

Change favicon using emoji.

1. Go to https://emojipedia.org
2. Search your favorite emoji
3. Right click icon and select "Copy Image Address"

```tsx
// ./src/components/head.ts

...
<title>{title}</title>
<link rel="icon" href="PASTE_URL_HERE" />
...

```

```sh
rm ./public/favicon.ico
rm ./public/vercel.svg
```

## Ending

ということで今回はプロジェクトの設定方法について説明してきましたがいかがだったでしょうか？
次回は next-mdx-remote というライブラリーを使ってブログページの方を作成していこうと思うので、この動画が参考になったという方はチャンネル登録よろしくおねがいします。
じゃあまたね〜👋

### Announcement

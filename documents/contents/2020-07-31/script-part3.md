---
title: Next.jsで作る技術ブログ [Part3 - ThemeUI + Emotion]
description: >
  今回はThemeUIとEmotionをセットアップして簡単なスタイリングをしていきます。
  本来はDark Modeの実装までをPart3でカバーしようと思っていたのですが、思いのほか長くなってしまったので、Part4の方でカバーするのでお楽しみに。

  質問等ございましたら、コメント欄にてご連絡ください 😉

  ----- 📝 詰まったらこちらを参考にしてみてください -----
  チュートリアルのソースコード: https://github.com/JunichiSugiura/tutorials/tree/main/nextjs-blog
  Emotion Styled Components: https://emotion.sh/docs/styled
  Theme UI: https://theme-ui.com/home

  #毎週金曜14時投稿 #プログラミング #チュートリアル

  ------------- 📌 Chapters -------------
  0:00 内容紹介
  0:14 Part2のお詫び
  0:38 Appを使ってページ全体のレイアウト
  2:44 Theme UIのインストール
  3:41 logic/stylesモジュール作成
  4:04 themeの作成
  4:43 ThemeProvider
  5:42 Emotion: Styled Components
  6:27 Emotion: Babel plugin
  7:15 Appのスタイリング
  8:15 Homeのスタイリング
  10:12 theme contextを使い方
  11:27 themeプロパティーの紹介
  11:55 プリセットの紹介
  12:39 themeオブジェクトの修正

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
  - チュートリアル
  - TypeScript
  - React
  - Nextjs
  - ThemeUI
  - Emotion
  - CSS
  - スタイリング
link: https://youtu.be/btJAtBeYHhs
publishedAt: 2020-08-14 05:00:00
playlists:
  - Next.jsで作る技術ブログ [チュートリアル]
endScreen:
  elements:
    - "Video: 2020-07-31-part4"
    - "Subscribe: Junichi"
    - "Video: Recently uploaded"
sns:
  post: "技術ブログチュートリアル"のPart3をUpしました！今週はThemeUIとEmotionのStyled Componentsを使ったスタイリングを紹介します🎨 少し長くなってしまいそうだったのでダークモードはPart4として土曜日の朝１に投稿するのでお楽しみに #プログラミング #エンジニア #ユーチューブ #動画 https://youtu.be/btJAtBeYHhs
  twitter:
---

## Outline

## Intro

今回は主に Theme UI と emotion を使って簡単なページのスタイリングと最終的に Dark Mode を一緒に実装していきたいと思います！
世の中の消費電力を減らして地球環境とエンジニアの目を救いましょうｗ

## Main

### Layout with Custom App component

まずは App component を使ってページ全体のレイアウトをしていこうと思います。Next.js には`pages/_app.tsx`という特別なファイルがあって、このコンポーネントは各ページのルートコンポーネントとして使われるので、全ページのレイアウトを書くことができます。まずはこのファイルを作って行きましょうか。

```sh
touch ./pages/_app.tsx
```

```tsx
// pages/_app.tsx

// "next/app"というサブモジュールから AppProps の型も import することができます。
import { AppProps } from "next/app";

// そしてこの中で App コンポーネントを作成して default export しておきます。
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Homeに書いてあったHeadをもってきます */}
      <Head>
        <title>NextJS Blog</title>
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/unicorn-face_1f984.png"
        />
      </Head>

      <main>
        {/* 各ページからdefault exportしているコンポーネントはこんな感じでレンダーします */}
        <Component {...pageProps} />
      </main>
    </>
  );
}
```

そしたらホームの方で main で囲う必要がなくなったので修正しておきます。

```tsx
// pages/index.tsx
// ...
export default function Home() {
  return (
    <div>
      {/* ついでに分かりやすいようにHomeに変えておきますか */}
      <h2>Home</h2>
    </div>
  );
}
```

### Setup Theme UI

次に Theme UI をインストールしましょうか。

```sh
yarn add theme-ui @theme-ui/presets
yarn add -D @types/theme-ui
```

そして新たに `src`dir を作ってその下に logic モジュールを作って `styles.ts` ファイルを作成したいと思います
そして styles 用のロジックを書いておくモジュールを作りたいと思います

```sh
mkdir -p ./src/logic
touch ./src/logic/styles.ts
```

それではこの中に theme 関連のコードを書いていきましょう。

```ts
// src/components/logic/styles.ts
import { base } from "@theme-ui/presets";

export const theme = {
  ...base,
  styles: {
    ...base.styles,
  },
};
```

そして `pages/_app.tsx` に戻って ThemeProvider を通して今作った theme をプロバイドしましょう。

```tsx
// pages/_app.tsx
import { AppProps } from "next/app";
import { ThemeProvider } from "theme-ui"; // <-
import { theme } from "src/logic/styles"; // <-

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}> {/* <- */}
      <div>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider> {/* <- */}
  );
}
```

### Style with Emotion

で、ThemeUI をインストールすると自動で emotion も入ってくるんですが、これだと CSS を JS のオブジェクトとして作成して prop として渡していく方法でスタイリングしていくことになります。個人的には styled を使って CSS を書いていく API の方が好きなのでそちらに必要なモジュールをインストールしたいと思います。ThemeUI のコンポーネントは styled-system と似たような API なので慣れてる人には便利なんですが、初めて目にする人には覚えることも多いので、個人的には pure な CSS を書いていく方が好みです。

```sh
yarn add @emotion/styled
yarn add -D babel-plugin-emotion
```

そして今取ってきた babel プラグインを設定するために`babel.config.json`ファイルを作成します。

```sh
touch babel.config.json
```

```json
// babel.config.json
{
  "presets": ["next/babel"],
  "plugins": ["emotion"]
}
```

以上で emotion の設定は完了です。

### emotion を使って App をスタイル

では次に実際に styled function を使って App の簡単なスタイリングをしていきましょう。

```tsx
// pages/_app.tsx
import { AppProps } from "next/app";
import { ThemeProvider } from "theme-ui";
import { theme } from "src/logic/styles";
import styled from "@emotion/styled"; // <-

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <main>
          <Component {...pageProps} />
        </main>
      </Container>
    </ThemeProvider>
  );
}

// here
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
```

```tsx
// pages/index.tsx
// ...
import { Theme } from "theme-ui";
import styled from "@emotion/styled";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>NextJS Blog</title>
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/unicorn-face_1f984.png"
        />
      </Head>
      <Title>Home</Title>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  max-width: 60rem;
  align-items: center;
`;

const Title = styled.h2<{ theme: Theme }>`
  text-align: center;
  text-decoration: underline ${({ theme }) => theme.colors.primary};
`;
// ...
```

ブラウザーの方で動いてるかチェックしましょうか。

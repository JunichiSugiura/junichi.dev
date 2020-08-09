---
title:
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

そしたらホームの方でmainで囲う必要がなくなったので修正しておきます。

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

### Add dark mode

そしたら次にダークモード用の theme も書いていこうと思います。Theume UI では colors 以下に modes というプロパティーが提供されていて、これを通して default テーマに上書きしていくことができます。

````tsx
// src/logic/styles.tsx
import { base, dark } from "@theme-ui/presets";
import { merge, useColorMode } from "theme-ui";

export const theme = merge(base, {
  colors: {
    ...base.colors,
    modes: {
      dark: {
        ...dark.colors,
      },
    },
  },
});

```

### Custom Document component

そして次にこれも`pages/_app.tsx`と同様に Next.js の特別なコンポーネントになる document コンポーネントを作りたいと思います。
これは App コンポーネントよりも 1 階層上で、html や bodyタグなどを指定することができます。Appと違い、サーバーサイドでしかレンダーされないので、onClickみたいなハンドラーは使えません。

```sh
touch ./pages/_document.tsx
````

```tsx
// pages/_documents.tsx

// Next.jsを正しく使うにはこれらすべてのコンポーネントをレンダーする必要があります
import Document, { Html, Head, Main, NextScript } from "next/document";
import { InitializeColorMode } from "theme-ui";

// Next.jsがexportしているDocumentコンポーネントをここでextendします
export default class extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/*
            カラーモードを設定するために必要なコンポーネントになります。
            カラーをCSS propertiesとしてheadに登録してくれるのでテーマを動的に切り替えた時の一時的なフラッシュをなくすことができます。
          */}
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### Create Header

次に theme を動的に切り替えるためのボタンをレンダーするために Header コンポーネントを作っていきます。

```sh
touch ./src/components/index.ts
touch ./src/components/header.tsx
yarn add react-icons
```

```tsx
// ./src/comopnents/header.tsx
import { IconButton } from "theme-ui";
import { IoMdSunny } from "react-icons/io";
import { useToggleColorMode } from "src/logic/styles";
import styled from "@emotion/styled";

export function Header() {
  const toggleColorMode = useToggleColorMode();

  return (
    <Container>
      <h1>NextJS Blog</h1>

      <IconButton aria-label="Toggle dark mode" onClick={toggleColorMode}>
        <IoMdSunny size={28} />
      </IconButton>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

```

```tsx
// src/logic/styles.ts
import { useCallback } from "react";
import { base, dark } from "@theme-ui/presets";
import { merge, useColorMode } from "theme-ui";
// ...
enum ColorMode {
  Default = "default",
  Dark = "dark",
}

export function useToggleColorMode() {
  const [mode, setColorMode] = useColorMode();

  return useCallback(() => {
    const m = mode === ColorMode.Default ? ColorMode.Dark : ColorMode.Default;
    setColorMode(m);
  }, [mode]);
}
```

そして component モジュールとして再度 export しておきましょう

```tsx
// ./src/components/index.tsx
export * from "./header";
```

そして今作った Header を App コンポーネントの方で使っていきます。

```tsx
// ./pages/_app.tsx
import { AppProps } from "next/app";
import { Header } from "src/components"; // <-
import { ThemeProvider } from "theme-ui";
import { theme } from "src/logic/styles";
import styled from "@emotion/styled";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header /> {/* <- */}
        <main>
          <Component {...pageProps} />
        </main>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: stretch;
`;
```

### Add global style with Theme UI

最後に body 全体のスタイルを ThemeUI の root プロパティーを通して設定しておきたいと思います。

```ts
// src/logic/styles.ts
// ...
export const theme = merge(base, {
  styles: {
    root: {
      button: {
        background: "none",
        color: "inherit",
        border: "none",
        padding: 0,
        font: "inherit",
        cursor: "pointer",
        outline: "inherit",
      },
    },
  },
  colors: {
    ...base.colors,
    modes: {
      dark: {
        ...dark.colors,
      },
    },
  },
});
```

## Ending

以上でスタイリングの設定は全部になります。いかがだったでしょうか？他にもいろいろな方法で jsx のスタイリングをする方法があるんですが、CSS Properties の設定を Theme UI に任せて emotion の styled function を通してピュアな CSS を書いていくのが今の所僕の中では一番いいと思う組み合わせです。何か意見がありましたらコメント欄にて是非教えてください。

次回はブログの一覧ページを作ったり、記事ページへのリンクの仕方などを紹介していくのでまだの方はぜひチャンネル登録の方お願いします。じゃあまたね〜👋

### Announcement

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
      <main>
        {/* 各ページからdefault exportしているコンポーネントはこんな感じでレンダーします */}
        <Component {...pageProps} />
      </main>
    </>
  );
}
```

### Setup Theme UI

次に Theme UI をインストールしましょうか。

```sh
yarn add theme-ui
yarn add -D @types/theme-ui
```

そして新たに s`src`dir を作ってその下に logic モジュールを作って `styles.ts` ファイルを作成したいと思います
そして styles 用のロジックを書いておくモジュールを作りたいと思います

```sh
mkdir -p ./src/logic
touch ./src/logic/styles.ts
```

それではこの中に theme 関連のコードを書いていきましょう。

```ts
// src/components/logic/styles.ts

// @ts-ignore
import { Theme, useThemeUI, ContextValue } from "theme-ui";

// themeオブジェクトのpropertyは公式のdocsを参考にしましょう
// https://theme-ui.com/theme-spec
// ThemeUIからexportされているコンポーネントを使用する場合は個々で設定した内容がcontextを通して自動で反映されます。
// またuseThemeカスタムフックやemotionのstyledファンクションを通して使用することもできます。
export const theme = makeTheme({
  // デフォルトのテーマを指定しておきます
  initialColorModeName: "light",
  // ここでbaseテーマのカラーを上書きしていきます。
  // 今回はbaseのままでいいのでからのオブジェクトを一旦書いておきます。
  colors: {},
});

// 次のバージョンからTSが正式にサポートされるみたいなのですが、今のところまだ方が安定してないので回りくどい書き方をします。
// ref: https://theme-ui.com/guides/typescript
// https://github.com/system-ui/theme-ui/issues/668
function makeTheme<T extends Theme>(t: T) {
  return t;
}

export type ExactTheme = typeof theme;

interface ExactContextValue extends Omit<ContextValue, "theme"> {
  theme: typeof theme;
}

export const useTheme = (useThemeUI as unknown) as () => ExactContextValue;
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
  // 前の会社で一緒だった人が何でも"flex使う人はチャラい"っていうめっちゃ偏見tweetしてたんですけど、
  // 僕ってチャラいんですかねw 堅実な変人でありたいと思いますw
  align-self: center;
  flex-direction: column;
  align-items: stretch;
`;
```

ブラウザーの方で動いてるかチェックしましょうか。

### Add dark mode

そしたら次にダークモード用の theme も書いていこうと思います。Theume UI では colors 以下に modes というプロパティーが提供されていて、これを通して default テーマに上書きしていくことができます。

````tsx
// src/logic/styles.tsx

// ...
export const theme = makeTheme({
  initialColorModeName: "light",
  useColorSchemeMediaQuery: true, // <-
  borderRadius: "0.25rem",
  colors: {
    accent: "#03DAC6",
    background: "#fff",
    text: "#222",
    muted: "#73737D",
    // ↓↓↓
    modes: {
      dark: {
        background: "#111216",
        text: "rgba(255, 255, 255, 0.88)",
        muted: "#73737D",
        boxShadow: "#000",
      },
    },
  },
});
```

### Custom Document component

そして次にこれも`pages/_app.tsx`と同様に Next.js の特別なコンポーネントになる document コンポーネントを作りたいと思います。
これは App コンポーネントよりも 1 階層上で、head や body など HTML タグを指定することができます。App コンポーネントは各ページ毎にレンダーされるのですが、Document はアプリケーションを通して最初に一度だけレンダーされます。

```sh
touch ./pages/_document.tsx
````

```tsx
// pages/_documents.tsx

import Document, { Html, Main, NextScript } from "next/document";
import { InitializeColorMode } from "theme-ui";

// Next.jsがexportしているDocumentコンポーネントをここでextendします
export default class extends Document {
  render() {
    return (
      <Html>
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
touch ./src/components/header.tsx
yarn add react-icons
```

```tsx
// ./src/comopnents/header.tsx

import { useCallback } from "react";
import styled from "@emotion/styled";
import { IoMdSunny } from "react-icons/io";
import { useTheme, ExactTheme } from "src/logic/styles";

export function Header() {
  const { theme, setColorMode } = useTheme();

  const toggleColorMode = useCallback(() => {
    setColorMode((mode) => (mode === "default" ? "dark" : "default"));
  }, []);

  return (
    <Container>
      <Logo>NextJS Blog</Logo>

      <Right>
        <button onClick={toggleColorMode}>
          <IconContainer>
            <IoMdSunny size={28} color={theme.colors.muted} />
          </IconContainer>
        </button>
      </Right>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 1.125rem;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

// 本当はThemeUIとemotionのコンテキストが自動で型を認識してくれればいいのですが、現状うまく実装されていないのでworkaroundとしてExactTheme型を書いておきます。
const IconContainer = styled.div<{ theme: ExactTheme }>`
  height: 2.25rem;
  width: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.25rem;
  // こんな感じでTheme UIのthemeにemotionからアクセスすることができます。
  color: ${({ theme }) => theme.colors.muted};
`;
```

そして component モジュールとして再度 export しておきましょう

```tsx
// ./src/components/index.tsx

// ...
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
export const theme = makeTheme({
  ...
  styles: {
    root: {
      transition: "background 0.25s",
      a: {
        color: "inherit",
        textDecoratiog: "inherit",
      },
      button: {
        background: "none",
        color: "inherit",
        border: "none",
        padding: 0,
        font: "inherit",
        cursor: "pointer",
        outline: "inherit",
      },
    }
  }
  ...
});
```

## Ending

以上でスタイリングの設定は全部になります。いかがだったでしょうか？他にもいろいろな方法で jsx のスタイリングをする方法があるんですが、CSS Properties の設定を Theme UI に任せて emotion の styled function を通してピュアな CSS を書いていくのが今の所僕の中では一番いいと思う組み合わせです。何か意見がありましたらコメント欄にて是非教えてください。

次回は PrismJS を使って markdown の code セクションをスタイリングしていこうと思うのでまだの方はぜひチャンネル登録の方お願いします。じゃあまたね〜👋

### Announcement

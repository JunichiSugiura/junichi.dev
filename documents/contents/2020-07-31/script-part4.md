---
title: Next.jsで作る技術ブログ [Part4 - ダークモード]
description: >

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
  - ダークモード
link: https://youtu.be/VIDEO_ID
publishedAt: 2020-08-15 05:00:00
playlists:
  - Next.jsで作る技術ブログ [チュートリアル]
endScreen:
  elements:
    - "Video: Best for viewer" #TODO "Video: 2020-07-31-part5"
    - "Subscribe: Junichi"
    - "Video: Recently uploaded"
sns:
  post:
  twitter:
---

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

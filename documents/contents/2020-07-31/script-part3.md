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

## Main

### Layout with Custom App component

```sh
touch ./pages/_app.tsx
```

```tsx
// pages/_app.tsx

import { AppProps } from "next/app";
import { Head } from "src/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <div>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
```

```tsx
// pages/index.tsx

export default function Home() {
  return <div>Welcome</div>;
}
```

### Setup Theme UI

```sh
yarn add theme-ui
yarn add -D @types/theme-ui

mkdir ./src/logic
touch ./src/logic/styles.ts
```

```ts
// src/components/logic/styles.ts

// @ts-ignore
import { Theme, useThemeUI, ContextValue } from "theme-ui";

export const theme = makeTheme({
  initialColorModeName: "light",
  borderRadius: "0.25rem",
  colors: {
    accent: "#03DAC6",
    background: "#fff",
    text: "#222",
    muted: "#73737D",
    boxShadow: "#000",
    youtubeRed: "#FF0000",
    twitterBlue: "#1DA1F2",
  },
});

// ref: https://theme-ui.com/guides/typescript
function makeTheme<T extends Theme>(t: T) {
  return t;
}

export type ExactTheme = typeof theme;

interface ExactContextValue extends Omit<ContextValue, "theme"> {
  theme: typeof theme;
}

export const useTheme = (useThemeUI as unknown) as () => ExactContextValue;
```

```tsx
// pages/_app.tsx

import { AppProps } from "next/app";
import { Head } from "src/components";
import { ThemeProvider } from "theme-ui"; // <-
import { theme } from "src/logic/styles"; // <-

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}> {/* <- */}
      <Head />
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

```sh
yarn add @emotion/styled
yarn add -D babel-plugin-emotion

touch babel.config.json
```

```json
// babel.config.json

{
  "presets": ["next/babel"],
  "plugins": ["emotion"]
}
```

```tsx
// pages/_app.tsx

import { AppProps } from "next/app";
import { Head } from "src/components";
import { ThemeProvider } from "theme-ui";
import { theme } from "src/logic/styles";
import styled from "@emotion/styled"; // <-

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head />
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
  align-self: center;
  flex-direction: column;
  align-items: stretch;
`;
```

### Add dark mode

```tsx
// src/logic/styles.tsx

...

export const theme = makeTheme({
  initialColorModeName: "light",
  useColorSchemeMediaQuery: true, // <-
  borderRadius: "0.25rem",
  colors: {
    accent: "#03DAC6",
    background: "#fff",
    text: "#222",
    muted: "#73737D",
    boxShadow: "#000",
    youtubeRed: "#FF0000",
    twitterBlue: "#1DA1F2",
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

...

```

### Custom Document component

```sh
touch ./pages/_document.tsx
```

```tsx
// pages/_documents.tsx

import Document, { Html, Head, Main, NextScript } from "next/document";
import { InitializeColorMode } from "theme-ui";

export default class extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
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

const IconContainer = styled.div<{ theme: ExactTheme }>`
  height: 2.25rem;
  width: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.25rem;
`;
```

```tsx
// ./src/components/index.tsx

...
export * from "./header";
```

```tsx
// ./pages/_app.tsx
import { AppProps } from "next/app";
import { Head, Header } from "src/components"; // <-
import { ThemeProvider } from "theme-ui";
import { theme } from "src/logic/styles";
import styled from "@emotion/styled";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head />
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

### Announcement

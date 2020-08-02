import NextHead from "next/head";
import { useRouter } from "next/router";
import profileImg from "public/profile.jpg";

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const baseUrl = "https://junichi.dev";

export function Head({
  title = "Junichi パリ在住エンジニア🇫🇷",
  description = "エンジニア・OSS コントリビュータ。フランス・パリにあるLedgerという会社で暗号資産用のハードウェアウォレットを作っています。みなさんの暗号資産をできる限り安全に管理できるようにするのが仕事です。",
  // TODO: change image
  image = baseUrl + profileImg,
}: Props) {
  const router = useRouter();
  const url = baseUrl + router.asPath;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content={image} />
      <meta name="twitter:creator" content="@JunichiSugiura" />
      <meta name="twitter:url" content={url} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <meta name="theme-color" content="#ffffff" />
    </NextHead>
  );
}

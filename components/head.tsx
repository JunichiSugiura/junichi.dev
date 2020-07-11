import NextHead from "next/head";

interface Props {
  title?: string;
}

export function Head({ title = "Junichi パリ在住エンジニア🇫🇷" }: Props) {
  return (
    <NextHead>
      <title>{title}</title>
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
      <meta
        name="msapplication-config"
        content="/favicon/browserconfig.xml"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <link
        href="https://fonts.googleapis.com/css?family=Merriweather"
        rel="stylesheet"
      />
    </NextHead>
  );
}

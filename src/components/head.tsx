import NextHead from "next/head";

export function Head() {
  return (
    <NextHead>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-174232195-1"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function() {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-174232195-1');
      })`,
        }}
      />
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

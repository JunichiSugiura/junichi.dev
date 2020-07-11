import NextHead from "next/head";
import { ColorScheme, colors } from "logic/styles";

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
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const initialColorScheme = getInitialColorScheme();
            setCSSVars(initialColorScheme)

            function getInitialColorScheme() {
              const persistedPreference = window.localStorage.getItem(
                "color-scheme",
              );

              if (typeof persistedPreference === "string") {
                return persistedPreference;
              }

              return window.matchMedia("(prefered-color-scheme: ${ColorScheme.dark}").matches
                ? "${ColorScheme.dark}"
                : "${ColorScheme.light}";
            }

            function setCSSVars(colorScheme) {
              const root = document.documentElement;
              root.style.setProperty("--initial-color-scheme", colorScheme);
              const colors = JSON.parse('${JSON.stringify(colors)}');
              Object
                .keys(colors[colorScheme])
                .forEach(k => {
                  const p = "--color-" + k;
                  const val = colors[colorScheme][k];
                  root.style.setProperty(p, val);
                });
            }
          `,
        }}
      />
    </NextHead>
  );
}

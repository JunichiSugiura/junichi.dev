export const theme = {
  initialColorModeName: 'light',
  useColorSchemeMediaQuery: true,
  borderRadius: "0.25rem",
  colors: {
    accent: "#03DAC6",
    background: "#fff",
    text: "#222",
    muted: "#73737D",
    boxShadow: "#000",
    primary: "#03DAC6",
    youtubeRed: "#FF0000",
    twitterBlue: "#1DA1F2",
    modes: {
      dark: {
        background: "#111216",
        text: "rgba(255, 255, 255, 0.88)",
        muted: "#73737D",
        boxShadow: "#000",
      },
    }
  },
  fontFamily: {
    serif: "'Merriweather', 'Noto Sans JP', Georgia, Serif",
    sansSerif:
      "'Noto Sans JP', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif",
    monospace:
      `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
  },
  styles: {
    root: {
      transition: "background 0.25s var(--ease-in-out-quad)",
      a: {
        color: "inherit",
        textDecoratiog: "inherit",
      }
    }
  },
};

// TODO: fix shadow to match https://material-components.github.io/material-components-web-catalog/#/component/elevation
export const elevation = {
  0: "0px 0px 0px 0px var(--color-box-shadow)",
  1: "0px 2px 1px -1px var(--color-box-shadow)",
  2: "0px 3px 1px -2px var(--color-box-shadow)",
  3: "0px 3px 3px -2px var(--color-box-shadow)",
  4: "0px 2px 4px -1px var(--color-box-shadow)",
  5: "0px 3px 5px -1px var(--color-box-shadow)",
  6: "0px 3px 5px -1px var(--color-box-shadow)",
  7: "0px 4px 5px -2px var(--color-box-shadow)",
  8: "0px 5px 5px -3px var(--color-box-shadow)",
  9: "0px 5px 6px -3px var(--color-box-shadow)",
  10: "0px 6px 6px -3px var(--color-box-shadow)",
  11: "0px 6px 7px -4px var(--color-box-shadow)",
  12: "0px 7px 8px -4px var(--color-box-shadow)",
  13: "0px 7px 8px -4px var(--color-box-shadow)",
  14: "0px 7px 9px -4px var(--color-box-shadow)",
  15: "0px 8px 9px -5px var(--color-box-shadow)",
  16: "0px 8px 10px -5px var(--color-box-shadow)",
  17: "0px 8px 11px -5px var(--color-box-shadow)",
  18: "0px 9px 11px -5px var(--color-box-shadow)",
  19: "0px 9px 12px -6px var(--color-box-shadow)",
  20: "0px 10px 13px -6px var(--color-box-shadow)",
  21: "0px 10px 13px -6px var(--color-box-shadow)",
  22: "0px 10px 14px -6px var(--color-box-shadow)",
  23: "0px 11px 14px -7px var(--color-box-shadow)",
  24: "0px 11px 15px -7px var(--color-box-shadow)",
};

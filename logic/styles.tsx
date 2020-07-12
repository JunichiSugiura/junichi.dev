import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";

interface Fonts {
  serif: string;
  sansSerif: string;
  monospace: string;
}

export const fonts: Fonts = {
  serif: "'Merriweather', 'Noto Sans JP', Georgia, Serif",
  sansSerif:
    "'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif",
  monospace:
    `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
};

export enum ColorScheme {
  dark = "dark",
  light = "light",
}

interface Theme {
  background: string;
  text: string;
  primary: string;
  grey: string;
  "box-shadow": string;
}

const sharedTheme = {
  primary: "#03DAC6",
  "youtube-red": "#FF0000",
  "twitter-blue": "#1DA1F2",
};

export const colors: { [K in ColorScheme]: Theme } = {
  light: {
    ...sharedTheme,
    background: "#fff",
    text: "#000",
    grey: "#73737D",
    "box-shadow": "#000",
  },
  dark: {
    ...sharedTheme,
    background: "#111216",
    text: "#fff",
    grey: "#73737D",
    "box-shadow": "#000",
  },
};

interface Size {
  borderRadius: string;
}

export const size: Size = {
  borderRadius: "0.25rem",
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

export const ThemeContext = createContext(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [colorScheme, setColorScheme] = useState(
    ColorScheme.light,
  );

  const toggleColorScheme = useCallback(() => {
    const root = window.document.documentElement;
    const val = colorScheme === ColorScheme.light
      ? ColorScheme.dark
      : ColorScheme.light;

    setColorScheme(val);

    localStorage.setItem("color-scheme", val);

    Object
      .entries(colors[val])
      .forEach(([k, v]) => {
        const p = "--color-" + k;
        root.style.setProperty(p, v);
      });
  }, [colorScheme]);

  useEffect(() => {
    const initialColorScheme = window.document.documentElement.style
      .getPropertyValue(
        "--initial-color-scheme",
      );
    setColorScheme(initialColorScheme as ColorScheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const ThemeConsumer = ThemeContext.Consumer;

export function useTheme() {
  return useContext(ThemeContext);
}

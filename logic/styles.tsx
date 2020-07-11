import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

export const fonts = {
  serif: "'Merriweather', Georgia, Serif",
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
}

const sharedTheme = {
  primary: "#03DAC6",
};

export const colors: { [K in ColorScheme]: Theme } = {
  light: {
    ...sharedTheme,
    background: "#fff",
    text: "#000",
  },
  dark: {
    ...sharedTheme,
    background: "#111216",
    text: "#fff",
  },
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

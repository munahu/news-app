"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export type Theme = "light" | "dark";

interface ThemeContext {
  theme: Theme;
  handleThemeChange: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContext>({
  theme: "dark",
  handleThemeChange: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      <body
        className={`${theme} transition-colors duration-300 ease-in-out dark:bg-darkBlack dark:text-white font-sans has-[.mobileNav]:overflow-hidden`}
      >
        {children}
      </body>
    </ThemeContext.Provider>
  );
}

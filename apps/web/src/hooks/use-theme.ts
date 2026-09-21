import * as React from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "openui-theme";

/**
 * Permanent Dark Theme.
 *
 * Enforces dark theme exclusively across the website with zero flash of light mode.
 */
export function useTheme(): {
  theme: Theme;
  resolved: "light" | "dark";
  setTheme: (theme: Theme) => void;
} {
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    try {
      window.localStorage.setItem(STORAGE_KEY, "dark");
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  const setTheme = React.useCallback((_next: Theme) => {
    // Permanent dark mode
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }, []);

  return { theme: "dark", resolved: "dark", setTheme };
}

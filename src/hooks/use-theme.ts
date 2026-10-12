import { useEffect } from "react";
import { DARK_CLASS, DEFAULT_THEME } from "@/constants";
import { STORAGE_KEYS } from "@/storage";
import type { Theme } from "@/types";
import { usePersistedState } from "./use-persisted-state";

export const useTheme = () => {
  const [theme, setTheme] = usePersistedState<Theme>(STORAGE_KEYS.theme, DEFAULT_THEME);
  useEffect(() => {
    document.documentElement.classList.toggle(DARK_CLASS, theme === "dark");
  }, [theme]);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return { theme, toggleTheme };
};

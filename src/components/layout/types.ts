import type { ReactNode } from "react";
import type { Theme } from "@/types";

export interface AppShellProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

export interface AppHeaderProps {
  primaryLabel: string;
  isPrimaryDisabled?: boolean;
  onPrimary: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onClearCache: () => void;
}

export interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export interface ActionsMenuProps {
  onClearCache: () => void;
}

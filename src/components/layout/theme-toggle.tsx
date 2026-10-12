import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ThemeToggleProps } from "./types";

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => (
  <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={onToggle}>
    {theme === "dark" ? <Sun /> : <Moon />}
  </Button>
);

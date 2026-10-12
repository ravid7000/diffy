import { Button } from "@/components/ui/button";
import { ActionsMenu } from "./actions-menu";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import type { AppHeaderProps } from "./types";

export const AppHeader = ({
  primaryLabel,
  isPrimaryDisabled,
  onPrimary,
  theme,
  onToggleTheme,
  onClearCache,
}: AppHeaderProps) => (
  <header className="flex h-12 shrink-0 items-center justify-between border-b px-4">
    <Logo />
    <div className="flex items-center gap-1">
      <Button disabled={isPrimaryDisabled} onClick={onPrimary}>
        {primaryLabel}
      </Button>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <ActionsMenu onClearCache={onClearCache} />
    </div>
  </header>
);

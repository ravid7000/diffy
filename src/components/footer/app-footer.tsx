import { ChangeCountsBar } from "./change-counts";
import { StrategySelect } from "./strategy-select";
import type { AppFooterProps } from "./types";

export const AppFooter = ({ counts, strategy, onStrategyChange }: AppFooterProps) => (
  <footer className="flex h-10 shrink-0 items-center justify-between border-t px-4 text-sm">
    {counts ? (
      <ChangeCountsBar counts={counts} />
    ) : (
      <span className="text-muted-foreground">Paste, upload or drop two files</span>
    )}
    <StrategySelect value={strategy} onChange={onStrategyChange} />
  </footer>
);

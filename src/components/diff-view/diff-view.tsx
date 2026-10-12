import { SIDE_LABELS } from "@/constants";
import { cn } from "@/lib/utils";
import { ROW_GRID } from "./constants";
import { DiffRowView } from "./diff-row-view";
import type { DiffViewProps } from "./types";

export const DiffView = ({ rows, resolutions, isLocked, onResolve }: DiffViewProps) => (
  <div className="flex h-full min-h-0 flex-col font-mono text-xs leading-5">
    <div className={cn(ROW_GRID, "border-b bg-muted/50 py-1 font-sans text-sm font-medium")}>
      <span />
      <span className="px-2">{SIDE_LABELS.source}</span>
      <span />
      <span />
      <span className="px-2">{SIDE_LABELS.destination}</span>
    </div>
    <div role="region" aria-label="Diff" className="min-h-0 flex-1 overflow-y-auto">
      {rows.map((row) => (
        <DiffRowView
          key={row.key}
          row={row}
          resolution={row.blockId === null ? null : (resolutions[row.blockId] ?? null)}
          isLocked={isLocked}
          onResolve={onResolve}
        />
      ))}
    </div>
  </div>
);

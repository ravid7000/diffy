import { memo } from "react";
import type { Side } from "@/diff-engine";
import { cn } from "@/lib/utils";
import { ROW_GRID, ROW_VISIBILITY } from "./constants";
import { DiffLine } from "./diff-line";
import { HunkActions } from "./hunk-actions";
import type { DiffRowViewProps } from "./types";
import { useRowSegments } from "./use-row-segments";

export const DiffRowView = memo(({ row, resolution, isLocked, onResolve }: DiffRowViewProps) => {
  const segments = useRowSegments(row);
  const isChanged = row.type !== "equal";
  const lineProps = (side: Side) => ({
    side,
    lineNumber: row[side]?.lineNumber ?? null,
    segments: segments[side],
    isChanged,
    isDimmed: isChanged && resolution !== null && resolution !== side,
  });
  const { blockId } = row;

  return (
    <div className={cn(ROW_GRID, ROW_VISIBILITY, row.isBlockStart && "border-t border-dashed")}>
      <DiffLine {...lineProps("source")} />
      <div className="border-x bg-muted/30">
        {row.isBlockStart && blockId !== null && (
          <HunkActions
            resolution={resolution}
            isLocked={isLocked}
            onResolve={(side) => onResolve(blockId, side)}
          />
        )}
      </div>
      <DiffLine {...lineProps("destination")} />
    </div>
  );
});

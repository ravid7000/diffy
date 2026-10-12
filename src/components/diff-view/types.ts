import type { DiffRow, Resolution, Resolutions, Segment, Side } from "@/diff-engine";

export interface DiffViewProps {
  rows: DiffRow[];
  resolutions: Resolutions;
  isLocked: boolean;
  onResolve: (id: number, side: Side) => void;
}

export interface DiffRowViewProps {
  row: DiffRow;
  resolution: Resolution;
  isLocked: boolean;
  onResolve: (id: number, side: Side) => void;
}

export interface DiffLineProps {
  side: Side;
  lineNumber: number | null;
  segments: Segment[] | null;
  isChanged: boolean;
  isDimmed: boolean;
}

export interface HunkActionsProps {
  resolution: Resolution;
  isLocked: boolean;
  onResolve: (side: Side) => void;
}

import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import type { Side } from "@/diff-engine";

export const ROW_GRID = "grid grid-cols-[3rem_minmax(0,1fr)_4.5rem_3rem_minmax(0,1fr)]";

export const LINE_TONES: Record<Side, string> = {
  source: "bg-red-500/10",
  destination: "bg-green-500/10",
};

export const SEGMENT_TONES: Record<Side, string> = {
  source: "bg-red-500/30 rounded-sm",
  destination: "bg-green-500/30 rounded-sm",
};

export const EMPTY_LINE_TONE =
  "bg-muted/60 bg-[repeating-linear-gradient(135deg,transparent_0_6px,var(--border)_6px_7px)]";

export const LOCKED_HINT = "Final buffer was edited. Reset edits to unlock.";

export const SIDE_ICONS: Record<Side, LucideIcon> = {
  source: ChevronLeft,
  destination: ChevronRight,
};

export const ROW_VISIBILITY = "[content-visibility:auto] [contain-intrinsic-size:auto_1.25rem]";

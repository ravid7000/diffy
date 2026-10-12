import type { MergeStrategy, Side } from "./types";

export const CONFLICT_START = "<<<<<<< source";
export const CONFLICT_SEPARATOR = "=======";
export const CONFLICT_END = ">>>>>>> destination";

export const LINE_BREAK = /\r?\n/;

export const DEFAULT_STRATEGY: MergeStrategy = "source";

export const STRATEGY_LABELS: Record<MergeStrategy, string> = {
  source: "Start from source",
  destination: "Start from destination",
  unresolved: "Start unresolved",
};

export const SIDES: Side[] = ["source", "destination"];

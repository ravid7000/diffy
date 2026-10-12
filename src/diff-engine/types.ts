export type Side = "source" | "destination";

export type Resolution = Side | null;

export type MergeStrategy = Side | "unresolved";

export type ChangeType = "added" | "removed" | "modified";

export type RowType = ChangeType | "equal";

export interface EqualBlock {
  kind: "equal";
  lines: string[];
}

export interface ChangeBlock {
  kind: "change";
  id: number;
  source: string[];
  destination: string[];
}

export type DiffBlock = EqualBlock | ChangeBlock;

export type Resolutions = Record<number, Resolution>;

export interface Segment {
  value: string;
  changed: boolean;
}

export interface DiffCell {
  lineNumber: number;
  text: string;
}

export interface DiffRow {
  key: string;
  type: RowType;
  blockId: number | null;
  isBlockStart: boolean;
  source: DiffCell | null;
  destination: DiffCell | null;
}

export interface ChangeCounts {
  added: number;
  removed: number;
  modified: number;
  resolved: number;
  total: number;
}

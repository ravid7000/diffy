import type { ChangeCounts, MergeStrategy } from "@/diff-engine";

export interface AppFooterProps {
  counts: ChangeCounts | null;
  strategy: MergeStrategy;
  onStrategyChange: (strategy: MergeStrategy) => void;
}

export interface StrategySelectProps {
  value: MergeStrategy;
  onChange: (strategy: MergeStrategy) => void;
}

export interface ChangeCountsProps {
  counts: ChangeCounts;
}

export interface CountBadge {
  key: keyof ChangeCounts;
  label: string;
  className: string;
}

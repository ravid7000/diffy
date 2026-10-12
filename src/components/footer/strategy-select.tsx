import { map } from "lodash";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STRATEGY_LABELS, type MergeStrategy } from "@/diff-engine";
import type { StrategySelectProps } from "./types";

export const StrategySelect = ({ value, onChange }: StrategySelectProps) => (
  <Select value={value} onValueChange={(next) => onChange(next as MergeStrategy)}>
    <SelectTrigger size="sm" aria-label="Merge strategy">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {map(STRATEGY_LABELS, (label, key) => (
        <SelectItem key={key} value={key}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

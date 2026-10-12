import { Badge } from "@/components/ui/badge";
import { COUNT_BADGES } from "./constants";
import type { ChangeCountsProps } from "./types";

export const ChangeCountsBar = ({ counts }: ChangeCountsProps) => (
  <div className="flex items-center gap-2">
    <Badge variant="secondary">{counts.total} changes</Badge>
    {COUNT_BADGES.map(({ key, label, className }) => (
      <Badge key={key} variant="outline" className={className}>
        {label} {counts[key]}
      </Badge>
    ))}
    <Badge variant="outline">
      Resolved {counts.resolved}/{counts.total}
    </Badge>
  </div>
);

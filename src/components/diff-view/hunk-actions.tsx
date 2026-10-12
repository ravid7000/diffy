import { Button } from "@/components/ui/button";
import { SIDE_LABELS } from "@/constants";
import { SIDES } from "@/diff-engine";
import { LOCKED_HINT, SIDE_ICONS } from "./constants";
import type { HunkActionsProps } from "./types";

export const HunkActions = ({ resolution, isLocked, onResolve }: HunkActionsProps) => (
  <div className="flex items-start justify-center gap-1 py-0.5">
    {SIDES.map((side) => {
      const Icon = SIDE_ICONS[side];
      const label = `Keep ${SIDE_LABELS[side].toLowerCase()}`;
      return (
        <Button
          key={side}
          size="icon-xs"
          variant={resolution === side ? "default" : "outline"}
          disabled={isLocked}
          aria-label={label}
          aria-pressed={resolution === side}
          title={isLocked ? LOCKED_HINT : label}
          onClick={() => onResolve(side)}
        >
          <Icon />
        </Button>
      );
    })}
  </div>
);

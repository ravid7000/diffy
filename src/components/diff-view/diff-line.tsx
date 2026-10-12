import { cn } from "@/lib/utils";
import { EMPTY_LINE_TONE, LINE_TONES, SEGMENT_TONES } from "./constants";
import type { DiffLineProps } from "./types";

export const DiffLine = ({ side, lineNumber, segments, isChanged, isDimmed }: DiffLineProps) => (
  <>
    <span className="select-none border-r px-2 text-right text-muted-foreground">{lineNumber}</span>
    <span
      className={cn(
        "px-2 break-all whitespace-pre-wrap",
        !segments && EMPTY_LINE_TONE,
        segments && isChanged && LINE_TONES[side],
        isDimmed && "opacity-40",
      )}
    >
      {segments?.map((segment, index) => (
        <span key={index} className={cn(segment.changed && SEGMENT_TONES[side])}>
          {segment.value}
        </span>
      ))}
    </span>
  </>
);

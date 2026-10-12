import { useMemo } from "react";
import {
  buildInlineSegments,
  type DiffCell,
  type DiffRow,
  type Segment,
  type Side,
} from "@/diff-engine";

const wholeLine = (cell: DiffCell | null): Segment[] | null =>
  cell && [{ value: cell.text, changed: false }];

export const useRowSegments = ({
  type,
  source,
  destination,
}: DiffRow): Record<Side, Segment[] | null> =>
  useMemo(
    () =>
      type === "modified" && source && destination
        ? buildInlineSegments(source.text, destination.text)
        : { source: wholeLine(source), destination: wholeLine(destination) },
    [type, source, destination],
  );

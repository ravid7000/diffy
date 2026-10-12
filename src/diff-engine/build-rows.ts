import { times } from "lodash";
import { getChangeType } from "./get-change-type";
import type { ChangeBlock, DiffBlock, DiffCell, DiffRow, EqualBlock } from "./types";

interface Cursor {
  source: number;
  destination: number;
}

const toCell = (lines: string[], index: number, lineNumber: number): DiffCell | null =>
  index < lines.length ? { lineNumber, text: lines[index] } : null;

const equalRows = (block: EqualBlock, cursor: Cursor): DiffRow[] =>
  block.lines.map((text, index) => ({
    key: `e-${cursor.source + index}-${cursor.destination + index}`,
    type: "equal",
    blockId: null,
    isBlockStart: false,
    source: { lineNumber: cursor.source + index, text },
    destination: { lineNumber: cursor.destination + index, text },
  }));

const changeRows = (block: ChangeBlock, cursor: Cursor): DiffRow[] =>
  times(Math.max(block.source.length, block.destination.length), (index) => ({
    key: `c-${block.id}-${index}`,
    type: getChangeType(block),
    blockId: block.id,
    isBlockStart: index === 0,
    source: toCell(block.source, index, cursor.source + index),
    destination: toCell(block.destination, index, cursor.destination + index),
  }));

export const buildRows = (blocks: DiffBlock[]): DiffRow[] => {
  const cursor: Cursor = { source: 1, destination: 1 };
  return blocks.flatMap((block) => {
    const rows = block.kind === "equal" ? equalRows(block, cursor) : changeRows(block, cursor);
    cursor.source += block.kind === "equal" ? block.lines.length : block.source.length;
    cursor.destination += block.kind === "equal" ? block.lines.length : block.destination.length;
    return rows;
  });
};

import { diffArrays } from "diff";
import { last } from "lodash";
import { splitLines } from "./split-lines";
import type { ChangeBlock, DiffBlock } from "./types";

export const buildBlocks = (source: string, destination: string): DiffBlock[] => {
  const blocks: DiffBlock[] = [];
  let nextId = 0;
  diffArrays(splitLines(source), splitLines(destination)).forEach((change) => {
    if (!change.added && !change.removed) {
      blocks.push({ kind: "equal", lines: change.value });
      return;
    }
    const previous = last(blocks);
    const block: ChangeBlock =
      previous?.kind === "change"
        ? previous
        : { kind: "change", id: nextId++, source: [], destination: [] };
    if (block !== previous) blocks.push(block);
    (change.added ? block.destination : block.source).push(...change.value);
  });
  return blocks;
};

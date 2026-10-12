import type { ChangeBlock, DiffBlock, MergeStrategy, Resolutions } from "./types";

export const changeBlocksOf = (blocks: DiffBlock[]): ChangeBlock[] =>
  blocks.filter((block): block is ChangeBlock => block.kind === "change");

export const createResolutions = (blocks: DiffBlock[], strategy: MergeStrategy): Resolutions =>
  Object.fromEntries(
    changeBlocksOf(blocks).map((block) => [block.id, strategy === "unresolved" ? null : strategy]),
  );

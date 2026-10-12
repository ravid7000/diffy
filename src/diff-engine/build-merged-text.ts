import { CONFLICT_END, CONFLICT_SEPARATOR, CONFLICT_START } from "./constants";
import type { ChangeBlock, DiffBlock, Resolution, Resolutions } from "./types";

const resolveLines = (block: ChangeBlock, resolution: Resolution): string[] =>
  resolution
    ? block[resolution]
    : [CONFLICT_START, ...block.source, CONFLICT_SEPARATOR, ...block.destination, CONFLICT_END];

export const buildMergedText = (blocks: DiffBlock[], resolutions: Resolutions): string =>
  blocks
    .flatMap((block) =>
      block.kind === "equal" ? block.lines : resolveLines(block, resolutions[block.id] ?? null),
    )
    .join("\n");

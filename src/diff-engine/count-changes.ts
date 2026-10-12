import { countBy } from "lodash";
import { getChangeType } from "./get-change-type";
import { changeBlocksOf } from "./resolutions";
import type { ChangeCounts, DiffBlock, Resolutions } from "./types";

export const countChanges = (blocks: DiffBlock[], resolutions: Resolutions): ChangeCounts => {
  const changes = changeBlocksOf(blocks);
  const byType = countBy(changes, getChangeType);
  return {
    added: byType.added ?? 0,
    removed: byType.removed ?? 0,
    modified: byType.modified ?? 0,
    resolved: changes.filter((block) => resolutions[block.id]).length,
    total: changes.length,
  };
};

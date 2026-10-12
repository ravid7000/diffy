import { diffWordsWithSpace } from "diff";
import type { Segment, Side } from "./types";

export const buildInlineSegments = (
  source: string,
  destination: string,
): Record<Side, Segment[]> => {
  const changes = diffWordsWithSpace(source, destination);
  return {
    source: changes
      .filter((change) => !change.added)
      .map(({ value, removed }) => ({ value, changed: removed })),
    destination: changes
      .filter((change) => !change.removed)
      .map(({ value, added }) => ({ value, changed: added })),
  };
};

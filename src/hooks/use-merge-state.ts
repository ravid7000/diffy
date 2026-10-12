import { useCallback, useMemo, useState } from "react";
import {
  buildMergedText,
  createResolutions,
  type DiffBlock,
  type MergeStrategy,
  type Side,
} from "@/diff-engine";

export const useMergeState = (blocks: DiffBlock[], strategy: MergeStrategy) => {
  const [resolutions, setResolutions] = useState(() => createResolutions(blocks, strategy));
  const [editedText, setEditedText] = useState<string | null>(null);
  const generatedText = useMemo(() => buildMergedText(blocks, resolutions), [blocks, resolutions]);

  const resolve = useCallback(
    (id: number, side: Side) =>
      setResolutions((current) => ({ ...current, [id]: current[id] === side ? null : side })),
    [],
  );

  return {
    resolutions,
    resolve,
    mergedText: editedText ?? generatedText,
    isLocked: editedText !== null,
    editText: setEditedText,
    resetEdits: () => setEditedText(null),
  };
};

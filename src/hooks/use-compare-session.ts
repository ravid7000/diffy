import dayjs from "dayjs";
import { useState } from "react";
import { EMPTY_SESSION } from "@/constants";
import type { Side } from "@/diff-engine";
import { STORAGE_KEYS, storage, type StoredSession } from "@/storage";
import type { ComparedSession } from "@/types";

export const useCompareSession = () => {
  const [draft, setDraft] = useState<StoredSession>(
    () => storage.load<StoredSession>(STORAGE_KEYS.session) ?? EMPTY_SESSION,
  );
  const [compared, setCompared] = useState<ComparedSession | null>(null);

  const updateDraft = (side: Side, value: string) =>
    setDraft((current) => ({ ...current, [side]: value }));

  const compare = () => {
    setCompared({ ...draft, id: dayjs().valueOf() });
    return storage.save(STORAGE_KEYS.session, draft);
  };

  const edit = () => setCompared(null);

  const reset = () => {
    setDraft(EMPTY_SESSION);
    setCompared(null);
  };

  return { draft, compared, updateDraft, compare, edit, reset };
};

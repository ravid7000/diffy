import { useCallback, useState } from "react";
import { storage } from "@/storage";

export const usePersistedState = <T>(key: string, fallback: T) => {
  const [value, setValue] = useState<T>(() => storage.load<T>(key) ?? fallback);
  const update = useCallback(
    (next: T) => {
      setValue(next);
      storage.save(key, next);
    },
    [key],
  );
  return [value, update] as const;
};

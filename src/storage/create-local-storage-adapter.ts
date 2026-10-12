import { attempt, isError, startsWith } from "lodash";
import { STORAGE_PREFIX } from "./constants";
import type { StorageAdapter } from "./types";

export const createLocalStorageAdapter = (
  store: Storage = window.localStorage,
): StorageAdapter => ({
  load<T>(key: string) {
    const raw = store.getItem(STORAGE_PREFIX + key);
    const parsed = raw === null ? null : attempt(JSON.parse, raw);
    return isError(parsed) ? null : (parsed as T | null);
  },
  save<T>(key: string, value: T) {
    return !isError(attempt(() => store.setItem(STORAGE_PREFIX + key, JSON.stringify(value))));
  },
  clear() {
    Object.keys(store)
      .filter((key) => startsWith(key, STORAGE_PREFIX))
      .forEach((key) => store.removeItem(key));
  },
});

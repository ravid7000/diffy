import { createLocalStorageAdapter } from "./create-local-storage-adapter";

export const storage = createLocalStorageAdapter();
export { STORAGE_KEYS } from "./constants";
export type * from "./types";

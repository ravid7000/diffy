import type { StoredSession } from "@/storage";
import type { Theme } from "@/types";

export const APP_NAME = "Diffy";

export const EMPTY_SESSION: StoredSession = { source: "", destination: "" };

export const DEFAULT_THEME: Theme = "light";

export const DARK_CLASS = "dark";

export const MONACO_THEMES: Record<Theme, string> = { light: "light", dark: "vs-dark" };

export const DOWNLOAD_FILE_PATTERN = "[merged]-YYYYMMDD-HHmmss[.txt]";

export const SIDE_LABELS = { source: "Source", destination: "Destination" } as const;

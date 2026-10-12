import type { StoredSession } from "@/storage";

export type Theme = "light" | "dark";

export interface ComparedSession extends StoredSession {
  id: number;
}

import type { CountBadge } from "./types";

export const COUNT_BADGES: CountBadge[] = [
  { key: "added", label: "Added", className: "text-green-600 dark:text-green-400" },
  { key: "removed", label: "Removed", className: "text-red-600 dark:text-red-400" },
  { key: "modified", label: "Modified", className: "text-amber-600 dark:text-amber-400" },
];

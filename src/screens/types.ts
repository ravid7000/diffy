import type { MergeStrategy, Side } from "@/diff-engine";
import type { StoredSession } from "@/storage";
import type { ComparedSession, Theme } from "@/types";

export interface ChromeProps {
  theme: Theme;
  onToggleTheme: () => void;
  onClearCache: () => void;
  strategy: MergeStrategy;
  onStrategyChange: (strategy: MergeStrategy) => void;
}

export interface InputScreenProps extends ChromeProps {
  draft: StoredSession;
  onDraftChange: (side: Side, value: string) => void;
  onCompare: () => void;
}

export interface DiffScreenProps extends ChromeProps {
  session: ComparedSession;
  onEdit: () => void;
}

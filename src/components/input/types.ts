import type { Side } from "@/diff-engine";
import type { StoredSession } from "@/storage";

export interface FileTextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export interface InputPanelsProps {
  draft: StoredSession;
  onChange: (side: Side, value: string) => void;
}

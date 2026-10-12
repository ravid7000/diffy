import type { Theme } from "@/types";

export interface FinalBufferPaneProps {
  value: string;
  theme: Theme;
  isLocked: boolean;
  onChange: (value: string) => void;
  onResetEdits: () => void;
}

export interface BufferToolbarProps {
  value: string;
  isLocked: boolean;
  onChange: (value: string) => void;
  onResetEdits: () => void;
}

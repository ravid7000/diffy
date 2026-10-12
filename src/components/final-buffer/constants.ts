import type { editor } from "monaco-editor";

export const EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  fontSize: 12,
  wordWrap: "on",
  scrollBeyondLastLine: false,
  automaticLayout: true,
};

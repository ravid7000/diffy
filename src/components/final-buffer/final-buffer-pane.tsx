import "./setup-monaco";
import Editor from "@monaco-editor/react";
import { MONACO_THEMES } from "@/constants";
import { BufferToolbar } from "./buffer-toolbar";
import { EDITOR_OPTIONS } from "./constants";
import type { FinalBufferPaneProps } from "./types";

const FinalBufferPane = ({
  value,
  theme,
  isLocked,
  onChange,
  onResetEdits,
}: FinalBufferPaneProps) => (
  <div className="flex h-full min-h-0 flex-col">
    <BufferToolbar
      value={value}
      isLocked={isLocked}
      onChange={onChange}
      onResetEdits={onResetEdits}
    />
    <div className="min-h-0 flex-1">
      <Editor
        value={value}
        language="plaintext"
        theme={MONACO_THEMES[theme]}
        options={EDITOR_OPTIONS}
        onChange={(next) => onChange(next ?? "")}
      />
    </div>
  </div>
);

export default FinalBufferPane;

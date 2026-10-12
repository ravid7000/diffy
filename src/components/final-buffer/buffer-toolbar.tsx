import dayjs from "dayjs";
import { Copy, Download, Lock, RotateCcw } from "lucide-react";
import { FormatButton } from "@/components/format-button/format-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DOWNLOAD_FILE_PATTERN } from "@/constants";
import { copyText } from "@/lib/copy-text";
import { downloadText } from "@/lib/download-text";
import type { BufferToolbarProps } from "./types";

export const BufferToolbar = ({ value, isLocked, onChange, onResetEdits }: BufferToolbarProps) => (
  <div className="flex h-[29px] items-center justify-between border-b bg-muted/50 px-2 text-sm">
    <div className="flex items-center gap-2 font-medium">
      Final buffer
      {isLocked && (
        <Badge variant="outline">
          <Lock />
          Edited
        </Badge>
      )}
    </div>
    <div className="flex items-center gap-1">
      {isLocked && (
        <Button size="xs" variant="ghost" onClick={onResetEdits}>
          <RotateCcw />
          Reset edits
        </Button>
      )}
      <FormatButton
        label="final buffer"
        value={value}
        onChange={onChange}
        size="xs"
        variant="ghost"
      />
      <Button
        size="icon-xs"
        variant="ghost"
        aria-label="Copy final buffer"
        onClick={() => void copyText(value)}
      >
        <Copy />
      </Button>
      <Button
        size="icon-xs"
        variant="ghost"
        aria-label="Download final buffer"
        onClick={() => downloadText(value, dayjs().format(DOWNLOAD_FILE_PATTERN))}
      >
        <Download />
      </Button>
    </div>
  </div>
);

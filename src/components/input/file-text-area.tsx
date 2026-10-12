import { head } from "lodash";
import { Upload } from "lucide-react";
import { useId, useRef } from "react";
import { toast } from "sonner";
import { FormatButton } from "@/components/format-button/format-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFileDrop } from "@/hooks/use-file-drop";
import { cn } from "@/lib/utils";
import type { FileTextAreaProps } from "./types";

export const FileTextArea = ({ label, value, onChange }: FileTextAreaProps) => {
  const id = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const { isDragging, dragProps, readFile } = useFileDrop(onChange, () =>
    toast.error(`Could not read ${label} file`),
  );

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-2" {...dragProps}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <div className="flex gap-2">
          <FormatButton
            label={label}
            value={value}
            onChange={onChange}
            variant="outline"
            size="sm"
          />
          <Button variant="outline" size="sm" onClick={() => fileInput.current?.click()}>
            <Upload />
            Upload
          </Button>
        </div>
        <input
          ref={fileInput}
          type="file"
          hidden
          aria-label={`Upload ${label} file`}
          onChange={(event) => {
            readFile(head(Array.from(event.target.files ?? [])));
            event.target.value = "";
          }}
        />
      </div>
      <Textarea
        id={id}
        value={value}
        spellCheck={false}
        placeholder={`Paste, upload or drop the ${label.toLowerCase()} file`}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "min-h-0 flex-1 resize-none font-mono text-xs [field-sizing:fixed]",
          isDragging && "border-primary ring-2 ring-primary/40",
        )}
      />
    </section>
  );
};

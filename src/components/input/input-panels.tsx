import { SIDE_LABELS } from "@/constants";
import { FileTextArea } from "./file-text-area";
import type { InputPanelsProps } from "./types";

export const InputPanels = ({ draft, onChange }: InputPanelsProps) => (
  <div className="flex h-full gap-4 p-4">
    <FileTextArea
      label={SIDE_LABELS.source}
      value={draft.source}
      onChange={(value) => onChange("source", value)}
    />
    <FileTextArea
      label={SIDE_LABELS.destination}
      value={draft.destination}
      onChange={(value) => onChange("destination", value)}
    />
  </div>
);

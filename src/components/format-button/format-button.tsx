import { WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FormatButtonProps } from "./types";
import { useFormat } from "./use-format";

export const FormatButton = ({ label, value, onChange, size, variant }: FormatButtonProps) => {
  const { isFormatting, runFormat } = useFormat(label, onChange);

  return (
    <Button
      size={size}
      variant={variant}
      disabled={isFormatting || !value}
      aria-label={`Format ${label}`}
      onClick={() => void runFormat(value)}
    >
      <WandSparkles />
      Format
    </Button>
  );
};

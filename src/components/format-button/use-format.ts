import { useState } from "react";
import { toast } from "sonner";
import { formatCode } from "@/lib/format-code";

export const useFormat = (label: string, onChange: (value: string) => void) => {
  const [isFormatting, setIsFormatting] = useState(false);

  const runFormat = async (value: string) => {
    setIsFormatting(true);
    const { text, status } = await formatCode(value).finally(() => setIsFormatting(false));
    onChange(text);
    if (status === "cleaned") toast.warning(`Partially formatted ${label}`);
  };

  return { isFormatting, runFormat };
};

import { toast } from "sonner";

export const copyText = (text: string) =>
  navigator.clipboard.writeText(text).then(
    () => toast.success("Copied final buffer"),
    () => toast.error("Clipboard is not available"),
  );

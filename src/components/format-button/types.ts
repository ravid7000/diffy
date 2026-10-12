import type { ComponentProps } from "react";
import type { Button } from "@/components/ui/button";

export interface FormatButtonProps extends Pick<ComponentProps<typeof Button>, "size" | "variant"> {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

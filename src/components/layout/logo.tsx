import { GitCompareArrows } from "lucide-react";
import { APP_NAME } from "@/constants";

export const Logo = () => (
  <h1 className="flex items-center gap-2 text-base font-semibold">
    <GitCompareArrows className="size-5 text-primary" />
    <span>{APP_NAME}</span>
  </h1>
);

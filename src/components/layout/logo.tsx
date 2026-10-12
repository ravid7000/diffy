import { GitCompareArrows } from "lucide-react";
import { APP_NAME } from "@/constants";

export const Logo = () => (
  <div className="flex items-center gap-2 font-semibold">
    <GitCompareArrows className="size-5 text-primary" />
    <span>{APP_NAME}</span>
  </div>
);

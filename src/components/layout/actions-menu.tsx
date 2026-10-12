import { EllipsisVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ActionsMenuProps } from "./types";

export const ActionsMenu = ({ onClearCache }: ActionsMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="More actions">
        <EllipsisVertical />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem variant="destructive" onSelect={onClearCache}>
        <Trash2 />
        Clear cache
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

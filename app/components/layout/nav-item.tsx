import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  shortcut?: string;
}

export function NavItem({
  icon: Icon,
  label,
  isActive,
  shortcut,
}: NavItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center justify-between px-4 py-2 rounded-lg text-foreground/80 hover:bg-accent transition-colors cursor-pointer group",
              isActive && "bg-accent text-foreground"
            )}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </div>
            {shortcut && (
              <span className="text-xs text-muted-foreground group-hover:opacity-100 opacity-0 transition-opacity">
                {shortcut}
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

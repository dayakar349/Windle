import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  shortcut?: string;
}

export function NavItem({
  icon: Icon,
  label,
  href,
  isActive,
  shortcut,
}: NavItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href}>
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
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

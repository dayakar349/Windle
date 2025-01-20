"use client";

import { useState } from "react";
import { Home, Settings, Moon, Sun, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavItem } from "./nav-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

const recentChats = [
  { id: 1, title: "AI Technology Research", date: "2h ago" },
  { id: 2, title: "Machine Learning Basics", date: "Yesterday" },
  { id: 3, title: "Data Science Overview", date: "2 days ago" },
];

export function Sidebar() {
  const [isDark, setIsDark] = useState(false);

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[20%] h-screen border-r bg-background/50 backdrop-blur-xl flex flex-col"
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-semibold">Windle.ai</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsDark(!isDark)}
                >
                  {isDark ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button variant="outline" className="w-full justify-start gap-2 mb-6">
          <span className="ml-2">New Chat</span>
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-1 mb-6">
          <NavItem icon={Home} label="Home" isActive />
        </nav>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-4">
            Recent Chats
          </h3>
          <div className="space-y-1">
            {recentChats.map((chat) => (
              <div
                key={chat.id}
                className="px-4 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="text-sm font-medium">{chat.title}</div>
                <div className="text-xs text-muted-foreground">{chat.date}</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Notifications</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <span className="h-2 w-2 bg-primary rounded-full" />
          </Button>
        </div>

        <Button variant="ghost" className="w-full justify-start">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </motion.div>
  );
}

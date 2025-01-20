"use client";

import { useState } from "react";
import {
  Settings,
  Moon,
  Sun,
  Bell,
  BookmarkPlus,
  MessageSquarePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavItem } from "./nav-item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Add more test chats
const recentChats = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  title: `Chat ${i + 1}`,
  date: "2h ago",
  href: `/chat/${i + 1}`,
}));

export function Sidebar() {
  const [isDark, setIsDark] = useState(false);

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-80 h-screen border-r bg-background/50 backdrop-blur-xl flex flex-col shrink-0"
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-xl font-semibold">
            Windle.ai
          </Link>
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

        <Link href="/chat/new">
          <Button variant="outline" className="w-full justify-start gap-2 mb-6">
            <MessageSquarePlus className="w-4 h-4" />
            <span>New Chat</span>
          </Button>
        </Link>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="px-4 py-6">
            <nav className="space-y-1 mb-6">
              <NavItem
                icon={BookmarkPlus}
                label="Saved Chats"
                href="/saved-chats"
                isActive
              />
            </nav>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Recent Chats
              </h3>
              <div className="space-y-1">
                {recentChats.map((chat) => (
                  <Link href={chat.href} key={chat.id}>
                    <div className="px-4 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors">
                      <div className="text-sm font-medium">{chat.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {chat.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <ScrollBar />
        </ScrollArea>
      </div>

      <div className="p-4 border-t space-y-4">
        <Link href="/notifications">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Notifications</span>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <span className="h-2 w-2 bg-primary rounded-full" />
            </Button>
          </div>
        </Link>

        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

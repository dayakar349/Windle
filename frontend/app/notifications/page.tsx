"use client";

import { motion } from "framer-motion";
import { Bell, MessageSquare, Star, Settings } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      icon: MessageSquare,
      title: "New message received",
      description: "You have a new message from the AI assistant",
      time: "2 minutes ago",
    },
    {
      id: 2,
      icon: Star,
      title: "Chat saved",
      description: "Your chat has been saved successfully",
      time: "1 hour ago",
    },
    {
      id: 3,
      icon: Settings,
      title: "System update",
      description: "New features have been added to the chat system",
      time: "2 hours ago",
    },
  ];

  return (
    <main className="flex-1 p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-lg border bg-background hover:bg-accent/50 transition-colors"
              >
                <div className="flex gap-4">
                  <Icon className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <h2 className="font-medium">{notification.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </main>
  );
}

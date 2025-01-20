"use client";

import { motion } from "framer-motion";

function SavedChatsPage() {
  const savedChats = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    title: `Saved Chat ${i + 1}`,
    date: "2h ago",
    preview: "This is a preview of the chat content...",
  }));

  return (
    <main className="flex-1 p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-2xl font-semibold mb-6">Saved Chats</h1>
        <div className="grid gap-4">
          {savedChats.map((chat) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg border bg-background hover:bg-accent/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-medium">{chat.title}</h2>
                <span className="text-sm text-muted-foreground">
                  {chat.date}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{chat.preview}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}

export default SavedChatsPage;

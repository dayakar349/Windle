"use client";

import { useState } from "react";
import { Search, Paperclip, Sparkles, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");

  const suggestions = [
    "What is artificial intelligence?",
    "How does machine learning work?",
    "Explain quantum computing",
  ];

  return (
    <div className="relative max-w-3xl w-full">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Ask anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-32 py-6 text-lg rounded-xl border-2 transition-all duration-300"
        />
        <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
        <div className="absolute right-4 flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-lg">
            <Paperclip className="w-4 h-4" />
          </Button>
          <div className="h-6 w-px bg-border" />
          <Button variant="ghost" size="sm" className="rounded-lg gap-2">
            <Command className="w-4 h-4" />
            <span className="font-medium">Focus</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 p-2 bg-background rounded-lg border shadow-lg"
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{suggestion}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

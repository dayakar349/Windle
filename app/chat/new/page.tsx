"use client";

import { SearchBar } from "@/app/components/search/search-bar";
import { motion } from "framer-motion";
import { InfoWidget } from "@/components/widgets/info-widget";

export default function NewChatPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-8"
      >
        <motion.h1
          className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          What do you want to know?
        </motion.h1>

        <SearchBar />

        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <InfoWidget
            icon="🚀"
            title="Active Sessions"
            value="24"
            subValue="+12% vs last week"
            trend="up"
          />
          <InfoWidget
            icon="⚡"
            title="Response Time"
            value="1.2s"
            subValue="-0.3s vs last week"
            trend="down"
          />
        </motion.div>
      </motion.div>
    </main>
  );
}

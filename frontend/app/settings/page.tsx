"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bell, Lock, User, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="flex-1 p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-lg font-medium">Appearance</h2>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5" />
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred theme
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Sun className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Moon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-medium">Notifications</h2>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about new messages
                  </p>
                </div>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-medium">Privacy</h2>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5" />
                <div>
                  <p className="font-medium">Data & Privacy</p>
                  <p className="text-sm text-muted-foreground">
                    Manage your data and privacy preferences
                  </p>
                </div>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
          </section>
        </div>
      </motion.div>
    </main>
  );
}

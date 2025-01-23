"use client";

import { Sidebar } from "./components/layout/sidebar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      {children}
    </div>
  );
}

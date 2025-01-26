"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { chatStorage } from "@/app/services/chatStorage";

export default function ChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [chat, setChat] = useState<any>(null);

  useEffect(() => {
    const chatId = params.id as string;
    const savedChat = chatStorage.getChatById(chatId);
    if (savedChat) {
      setChat(savedChat);
    }
  }, [params.id]);

  if (!chat) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="p-4 rounded-lg border bg-accent/50">
          <h2 className="font-medium mb-2">Your Question</h2>
          <p>{chat.query}</p>
        </div>
        <div className="p-4 rounded-lg border">
          <h2 className="font-medium mb-2">Response</h2>
          <p>{chat.response}</p>
        </div>
      </div>
    </main>
  );
}

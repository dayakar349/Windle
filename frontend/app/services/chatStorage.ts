interface ChatMessage {
  id: string;
  query: string;
  response: string;
  timestamp: number;
}

export const chatStorage = {
  saveChat: (query: string, response: string): ChatMessage => {
    const chat: ChatMessage = {
      id: Date.now().toString(),
      query,
      response,
      timestamp: Date.now(),
    };

    const chats = JSON.parse(localStorage.getItem("chats") || "[]");
    chats.push(chat);
    localStorage.setItem("chats", JSON.stringify(chats));

    return chat;
  },

  getChats: (): ChatMessage[] => {
    return JSON.parse(localStorage.getItem("chats") || "[]");
  },

  getChatById: (id: string): ChatMessage | undefined => {
    const chats = JSON.parse(localStorage.getItem("chats") || "[]");
    return chats.find((chat: ChatMessage) => chat.id === id);
  },
};

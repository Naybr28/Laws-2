import { useState, useEffect } from "react";

export function useChatHistory() {
  const [history, setHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Load all chat history when page first loads
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setHistory(stored);

    // Load last opened chat ID (if any)
    const lastId = localStorage.getItem("lastChatId");
    if (lastId) setCurrentChatId(lastId);
  }, []);

  // Save to localStorage
  const saveHistory = (newHistory) => {
    setHistory(newHistory);
    localStorage.setItem("chatHistory", JSON.stringify(newHistory));
  };

  // Create a brand new chat room
  const createChat = (title = "新對話") => {
    const newChat = {
      id: "chat_" + Date.now(),
      title,
      messages: [],
      timestamp: Date.now()
    };

    const updated = [...history, newChat];
    saveHistory(updated);

    localStorage.setItem("lastChatId", newChat.id);
    setCurrentChatId(newChat.id);

    return newChat.id;
  };

  // Add a message into a chat
  const addMessage = (chatId, message) => {
    const updated = history.map((chat) =>
      chat.id === chatId
        ? { ...chat, messages: [...chat.messages, message] }
        : chat
    );

    saveHistory(updated);
  };

  // Retrieve messages from one chat
  const getMessages = (chatId) => {
    const found = history.find((c) => c.id === chatId);
    return found ? found.messages : [];
  };

  return {
    history,
    currentChatId,
    setCurrentChatId,
    createChat,
    addMessage,
    getMessages
  };
}

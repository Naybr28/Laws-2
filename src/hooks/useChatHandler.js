import { useState } from "react";
import { sendChatMessage } from "/src/utils/api.js";

export function useChatHandler(userInfo = {}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSendMessage({ chatInput, thirdView, role }) {
    if (!chatInput.trim()) return;

    // Add user message to UI immediately
    setMessages((prev) => [...prev, { from: "user", text: chatInput }]);
    setLoading(true);

    try {
      // Pull email from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const email = storedUser.email || userInfo.email || null;

      // Debug payload
      console.log("Sending chat payload:", {
        chatInput,
        userId: email,
        thirdView,
        role
      });

      // Send all 4 fields to backend
      const data = await sendChatMessage(chatInput, {
        email,
        thirdView,
        role
      });

      // Handle bot reply
      if (data && data.answer) {
        setMessages((prev) => [...prev, { from: "bot", text: data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "沒有收到回覆，請稍後再試." }
        ]);
      }
    } catch (err) {
      console.error("Chat request failed:", err);

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "無法連接至伺服器，請稍後再試." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return { messages, loading, handleSendMessage, setMessages };
}

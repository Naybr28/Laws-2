// src/components/InputBar.jsx
import { useState } from "react";

export default function InputBar({ onSend, disabled = false }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-[30px] w-[90%] max-w-[900px] h-13 bg-white rounded-xl flex items-center px-5 shadow backdrop-blur-sm">
      {/* Input Field */}
      <input
        type="text"
        placeholder="輸入您的法律問題"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={disabled}
        className="flex-1 text-gray-700 text-lg outline-none bg-transparent disabled:opacity-50"
      />

      {/* Microphone
      <img
        src="/Mic.png"
        alt="Mic"
        className="w-7 h-7 mx-4 cursor-pointer hover:opacity-70"
      />
    */}
      {/* Send */}
      <img
        src="/Send24.png"
        alt="Send"
        onClick={handleSend}
        className={`w-7 h-7 cursor-pointer ${disabled ? "opacity-40 cursor-default" : "hover:opacity-70"}`}
      />
    </div>
  );
}

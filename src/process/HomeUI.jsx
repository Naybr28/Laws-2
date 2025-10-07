import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomeUI() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]); // simpan semua chat
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question.trim()) return;

    const newUserMsg = { from: "user", text: question };
    setMessages((prev) => [...prev, newUserMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5678/webhook/law-bot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        }
      );

      const data = await res.json();
      const botMsg = { from: "bot", text: data.answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const botMsg = { from: "bot", text: "❌ Gagal terhubung ke n8n." };
      setMessages((prev) => [...prev, botMsg]);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#FFFFFF] to-[#EAF2FF] flex flex-col justify-between relative">
      {/* Back Button */}
      <div className="flex items-center p-6">
        <button3
          onClick={() => navigate(-1)}
          className="flex items-center text-black hover:text-gray-400"
        >
          <span className="text-xl font-extrabold mr-2 mb-1">←</span>
          <span className="text-xl font-bold">回上一頁</span>
        </button3>
      </div>

      {/* Profile Icon */}
      <img
        src="/Info.png"
        alt="Info"
        className="absolute top-[24px] right-[58px] w-12 h-12 cursor-pointer hover:opacity-70"
      />

      {/* Chat Area */}
      <div className="flex flex-col items-center flex-1 overflow-y-auto px-8 pb-32 mt-8">
        <h2 className="text-3xl font-bold text-center text-sky-900 mb-10">
          您好！我可以幫您什麼忙呢？
        </h2>

        <div className="w-full max-w-[900px] flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-5 py-3 rounded-2xl shadow-md max-w-[70%] text-lg ${
                  msg.from === "user"
                    ? "bg-sky-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <p className="text-gray-500 text-center mt-4">⏳ 正在思考中...</p>
          )}
        </div>
      </div>

      {/* Input Bar */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[50px] w-[1080px] h-16 bg-white shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] rounded-xl flex items-center px-6">
        <input
          type="text"
          placeholder="輸入您的法律問題"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 text-gray-700 text-lg outline-none"
        />
        <img
          src="/Send24.png"
          alt="Send"
          onClick={handleSend}
          className="w-10 h-10 cursor-pointer hover:opacity-70"
        />
      </div>
    </div>
  );
}


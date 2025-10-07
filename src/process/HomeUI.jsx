import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomeUI() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  // 👉 fungsi untuk kirim ke n8n
  const handleSend = async () => {
    if (!question.trim()) return; // kalau kosong jangan kirim

    try {
      const res = await fetch(
        "http://localhost:5678/webhook/2fa3c9fe-d8b3-4520-97a3-9bc619695cec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        }
      );

      const data = await res.json();
      console.log("Balasan dari n8n:", data);
      setResponse(data.answer); // simpan hasil dari n8n
    } catch (error) {
      console.error("Terjadi error:", error);
      setResponse("❌ Gagal terhubung ke n8n");
    }

    setQuestion(""); // kosongkan input setelah kirim
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#FFFFFF] to-[#EAF2FF] flex flex-col justify-center relative">
      {/* Back Button (top-left) */}
      <div className="flex items-center p-6">
        <button3
          onClick={() => navigate(-1)}
          className="flex items-center text-black hover:text-gray-400"
        >
          <span className="text-xl font-extrabold mr-2 mb-1">←</span>
          <span className="text-xl font-bold">回上一頁</span>
        </button3>
      </div>

      {/* Profile Icon (top-right) */}
      <img
        src="/Info.png"
        alt="Info"
        className="absolute top-[24px] right-[58px] w-12 h-12 cursor-pointer hover:opacity-70"
      />

      {/* Center Text */}
      <div className="flex flex-col flex-1 items-center justify-center">
        <h2 className="text-3xl font-bold text-center text-sky-900 mb-10">
          您好！我可以幫您什麼忙呢？
        </h2>

        {/* Tampilkan balasan dari n8n */}
        {response && (
          <p className="text-xl text-gray-800 mt-4">
            💬 {response}
          </p>
        )}
      </div>

      {/* Chat Input Bar */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[70px] w-[1080px] h-16 bg-white shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] rounded-xl flex items-center px-6">
        {/* Left Icon (Menu) */}
        <div className="mr-4 cursor-pointer hover:opacity-70">
          <div className="w-6 h-6 bg-sky-900 rounded-sm" />
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="輸入您的法律問題"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 text-gray-700 text-lg outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()} // tekan Enter juga bisa kirim
        />

        {/* Microphone Icon */}
        <img
          src="/Mic.png"
          alt="Mic"
          className="w-8 h-8 mx-4 cursor-pointer hover:opacity-70"
        />

        {/* Send Button */}
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

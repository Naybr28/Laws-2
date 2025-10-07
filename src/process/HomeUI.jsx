import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function HomeUI() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#FFFFFF] to-[#EAF2FF] flex flex-col justify-center relative">
      {/* Back Button (top-left) */}
      <div className="flex items-center p-6">
        <button3
          onClick={() => navigate(-1)} // go back to previous page
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
        <h2 className="text-3xl font-bold text-center text-sky-900">
          您好！我可以幫您什麼忙呢？
        </h2>
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
          className="flex-1 text-gray-700 text-lg outline-none"
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
          className="w-10 h-10 cursor-pointer hover:opacity-70"
        />
      </div>
    </div>
  );
}

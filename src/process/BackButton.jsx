import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BackButton({ label = "回上一頁" }) {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  let hoverTimer = null;

  const handleMouseEnter = () => {
    hoverTimer = setTimeout(() => setShowTooltip(true), 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    setShowTooltip(false);
  };

  return (
    <div
      onClick={() => navigate(-1)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center cursor-pointer text-black hover:text-gray-400"
    >
      <img
        src="/back.png"
        alt="back"
        className="w-8 h-8 transition-transform duration-200 hover:scale-105 hover:opacity-80"
      />

      {/* Tooltip (popup label) */}
      {showTooltip && (
        <div className="[writing-mode:vertical-lr] absolute top-full left-4 -translate-x-1/2 mt-1.5 bg-gray-800 text-white text-xs rounded-md px-1.5 py-1 shadow-lg animate-fadeIn">
          {label}
        </div>
      )}
    </div>
  );
}

/*
import { useNavigate } from "react-router-dom";

export default function BackButton({ label = "回上一頁" }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(-1)} // go back to the previous page
      className="flex items-center text-black hover:text-gray-400 cursor-pointer"
    >
      <img
        src="/back.png"
        alt="back"
        className="w-8 h-8 mr-2 transition-transform duration-200 hover:scale-110 hover:opacity-80"
      />
      <span className="text-xl font-bold">{label}</span>
    </div>
  );
}
*/
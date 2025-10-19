import { useState, useEffect, useRef } from "react";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({ email: "", role: "" });
  const menuRef = useRef(null);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="absolute top-[20px] right-[24px]">
      {/* Profile Icon */}
      <img
        src="/Info.png"
        alt="Info"
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-105 hover:opacity-80"
      />

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-200 text-gray-700 p-3">
          {/* Top section (user info) */}
          <div className="flex items-center mb-2">
            <img
              src="/profile-icon.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <div className="ml-3">
              <p className="text-xs text-sky-900 font-medium truncate max-w-[130px]">
                {user.email || "未登入"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                身份：{user.role || "未選擇"}
              </p>
            </div>
          </div>

          <hr className="my-2 border-gray-200" />

          {/* Menu buttons */}
          <div className="flex flex-col gap-1 text-sm">
            <button className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded-md">
              🎨 主題
            </button>
            <button className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded-md">
              🕓 歷史記錄
            </button>
            <button className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded-md">
              ⚙️ 設定
            </button>
            <button
              className="flex items-center gap-2 px-3 py-1 text-red-500 hover:bg-red-50 rounded-md"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              🚪 登出
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

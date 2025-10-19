import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "/src/process/BackButton";
import ProfileButton from "./ProfileButton";
import InputBar from "./InputBar";

export default function HomeUI() {
  const location = useLocation();
  const { mainRole, subRole, subSubRole, subSubSubRole } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  // 🧩 Run signup only if "signupInfo" exists (user came from signup)
  useEffect(() => {
    const doSignup = async () => {
      const signupInfo = JSON.parse(localStorage.getItem("signupInfo"));
      if (!signupInfo) {
        console.log("⏸ No signup info found. User already logged in.");
        return;
      }

      console.log("🚀 Sending signup to n8n:", {
        email: signupInfo.email,
        password: signupInfo.password,
        action: "signup",
        mainRole,
        subRole,
        subSubRole,
        subSubSubRole,
      });

      try {
        // ✅ Correct webhook path (not /webhook-test/)
        const res = await fetch("http://localhost:5678/webhook/user-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: signupInfo.email,
            password: signupInfo.password,
            action: "signup",
            mainRole,
            subRole,
            subSubRole,
            subSubSubRole,
          }),
        });

        if (!res.ok) throw new Error("Network error during signup");
        const data = await res.json();
        console.log("✅ Signup success:", data);

        // Save full user info
        const newUser = {
          email: signupInfo.email,
          mainRole,
          subRole,
          subSubRole,
          subSubSubRole,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.removeItem("signupInfo");
        setUserInfo(newUser);
      } catch (err) {
        console.error("❌ Signup failed:", err);
      }
    };

    // Delay to ensure localStorage is fully loaded
    const timer = setTimeout(doSignup, 500);
    return () => clearTimeout(timer);
  }, [mainRole, subRole, subSubRole, subSubSubRole]);

  // 💬 Handle chat messages
  const handleSendMessage = async (message) => {
    setMessages((prev) => [...prev, { from: "user", text: message }]);

    try {
      const res = await fetch("http://localhost:5678/webhook/testwebhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: message,
          mainRole: userInfo.mainRole || mainRole,
          subRole: userInfo.subRole || subRole,
          subSubRole: userInfo.subSubRole || subSubRole,
          subSubSubRole: userInfo.subSubSubRole || subSubSubRole,
        }),
      });

      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.answer }]);
    } catch (err) {
      console.error("⚠️ Chat request failed:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ 無法連接至伺服器，請稍後再試。" },
      ]);
    }
  };

  // 🧠 Store user info if missing
  useEffect(() => {
    if (mainRole && !localStorage.getItem("user")) {
      const newUser = { mainRole, subRole, subSubRole, subSubSubRole };
      localStorage.setItem("user", JSON.stringify(newUser));
      setUserInfo(newUser);
    }
  }, [mainRole, subRole, subSubRole, subSubSubRole]);

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#FFFFFF] to-[#EAF2FF] flex flex-col justify-between relative">
      <div className="flex items-center p-6">
        <BackButton />
      </div>

      <ProfileButton user={userInfo} />

      <div className="flex flex-col flex-1 items-center justify-center px-8 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            } w-full`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] shadow text-lg ${
                msg.from === "user"
                  ? "bg-sky-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <InputBar onSend={handleSendMessage} />
    </div>
  );
}

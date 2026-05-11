import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProfileButton from "/src/components/profile/ProfileButton";
import InputBar from "/src/components/chat/InputBar";
import ChatContainer from "/src/components/chat/ChatContainer";
import ReportSearchFeature from "/src/components/modals/ReportSearchFeature";
import ChatSidebar from "/src/components/chat/ChatSidebar";
import GuideModal from "/src/components/modals/GuideModal";

import { useLocalUser } from "/src/hooks/useLocalUser.js";
import { useChatHandler } from "/src/hooks/useChatHandler.js";
import { signupUser } from "/src/utils/api.js";

// ─── Feature card data ────────────────────────────────────────
const FEATURES = [
  {
    color: "fc-blue",
    icon: "📖",
    title: "法規查詢",
    desc: "根據事件內容找出相關校園法規與條文",
  },
  {
    color: "fc-amber",
    icon: "📋",
    title: "案件分析",
    desc: "整理時間、人物、行為與證據重點",
  },
  {
    color: "fc-teal",
    icon: "🗺️",
    title: "SOP 處理流程",
    desc: "申訴、通報、調查的標準流程建議",
  },
  {
    color: "fc-red",
    icon: "🔍",
    title: "通報書搜尋",
    desc: "依學校名稱搜尋可用通報表單連結",
  },
];

// ─── Quick question chips ─────────────────────────────────────
const QUICK_CHIPS = [
  "我被同學霸凌怎麼辦？",
  "學校收到申訴後要做什麼？",
  "遇到性騷擾可以找誰？",
  "老師被學生騷擾怎麼辦？",
  "被記過可以申訴嗎？",
];

// ─── Helper: normalize role data ──────────────────────────────
function getRoleArray(user) {
  if (!user) return [];

  if (Array.isArray(user.roles)) {
    return user.roles;
  }

  if (typeof user.role === "string" && user.role.trim()) {
    return user.role.split(" → ");
  }

  return [];
}

// ─── Welcome State Component ──────────────────────────────────
function WelcomeState({ userName, onChipClick }) {
  const displayName = userName || "同學";

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-8 pb-44">
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Greeting */}
        <h2
          className="mb-2"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 24,
            fontWeight: 600,
            color: "#1A2E4A",
          }}
        >
          歡迎回來，{displayName} 👋
        </h2>

        <p
          className="mb-7 leading-relaxed"
          style={{
            fontSize: 14,
            color: "#4A6080",
            maxWidth: 560,
          }}
        >
          我是您的校園法律顧問。請描述您遇到的情況，
          我會協助您了解相關法規、案件重點與建議處理步驟。
        </p>

        {/* Section label */}
        <p
          className="mb-3"
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            color: "#8A9BB0",
          }}
        >
          功能
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {FEATURES.map((f) => (
            <div key={f.title} className={`feature-card ${f.color}`}>
              <span className="block text-2xl mb-2">{f.icon}</span>

              <div
                className="mb-1 font-semibold"
                style={{
                  fontSize: 14,
                  color: "#1A2E4A",
                }}
              >
                {f.title}
              </div>

              <div
                className="leading-relaxed"
                style={{
                  fontSize: 12,
                  color: "#4A6080",
                }}
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Section label */}
        <p
          className="mb-3"
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            color: "#8A9BB0",
          }}
        >
          常見問題
        </p>

        {/* Quick chips */}
        <div className="flex flex-wrap gap-2">
          {QUICK_CHIPS.map((q) => (
            <button
              key={q}
              type="button"
              className="q-chip"
              onClick={() => onChipClick(q)}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main HomeUI ──────────────────────────────────────────────
export default function HomeUI() {
  const { user, setUser, refreshUser } = useLocalUser();
  const chatEndRef = useRef(null);
  const inputAreaRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const { messages, loading, handleSendMessage } = useChatHandler({
    email: user?.email || null,
  });

  // Quick chip click → send as chat message
  const handleChipClick = (text) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const roles = getRoleArray(storedUser);

    handleSendMessage({
      chatInput: text,
      thirdView: "受害者",
      role: roles,
    });
  };

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // One-time post-signup cleanup
  useEffect(() => {
    const doSignup = async () => {
      const raw = localStorage.getItem("signupInfo");
      if (!raw) return;

      let signupInfo;

      try {
        signupInfo = JSON.parse(raw);
      } catch {
        return;
      }

      try {
        await signupUser({
          email: signupInfo.email,
          password: signupInfo.password,
          roles: signupInfo.roles || [],
        });

        const newUser = {
          email: signupInfo.email,
          roles: signupInfo.roles || [],
        };

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.removeItem("signupInfo");
      } catch (err) {
        console.error("Signup failed:", err);
      }
    };

    const timer = setTimeout(doSignup, 500);
    return () => clearTimeout(timer);
  }, [setUser]);

  // Display name from email / username
  const displayName = user?.email ? user.email.split("@")[0] : null;

  // Role chip in nav
  const roleArray = getRoleArray(user);
  //const firstRole =
    //roleArray.length > 0 ? roleArray.slice(0, 1).join("・") : null;
  
    const handleLawSearchClick = () => {
    setSidebarOpen(false);
    setGuideOpen(false);

    inputAreaRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

    setTimeout(() => {
      const input = document.querySelector("#legal-chat-input");
      input?.focus();
    }, 300);
  };
  
  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        background: "linear-gradient(160deg, #F6F8FB 0%, #EBF1FA 100%)",
      }}
    >
      {/* ── Header ── */}
      <header
        className="fixed top-0 left-0 right-0 flex items-center justify-between px-5"
        style={{
          height: 56,
          background: "#fff",
          borderBottom: "0.5px solid rgba(26,46,74,0.12)",
          zIndex: 80,
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-1.5 select-none"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            fontWeight: 600,
            color: "#1A2E4A",
          }}
        >
          校園法律顧問
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              background: "#D4891A",
              borderRadius: "50%",
              flexShrink: 0,
            }}
          />
        </div>

        {/* Nav center */}
        <div className="hidden sm:flex items-center gap-1">
          <button
            type="button"
            className="nav-link"
            onClick={handleLawSearchClick}
          >
            法律查詢
          </button>

          <ReportSearchFeature asNavLink />

          <button
            type="button"
            className="nav-link"
            onClick={() => setGuideOpen(true)}
          >
            使用說明
          </button>
        </div>

        {/* Right: role chip + avatar */}
        <div className="flex items-center gap-2.5">
          {/*{firstRole && (
            <span
              className="text-xs font-medium px-2.5 py-0.5 rounded-full select-none"
              style={{
                background: "#E8EFF7",
                color: "#1A2E4A",
                border: "0.5px solid rgba(26,46,74,0.2)",
                fontSize: 10,
              }}
            >
              {firstRole}
            </span>
          )}*/}

          <ProfileButton
            user={user}
            onHistoryClick={() => setSidebarOpen(true)}
          />
        </div>
      </header>

      {/* ── Scrollable main ── */}
      <main
        className="flex flex-col"
        style={{
          paddingTop: 56,
          paddingBottom: messages.length === 0 ? 1 : 130,
        }}
      >
        {messages.length === 0 ? (
          <WelcomeState userName={displayName} onChipClick={handleChipClick} />
        ) : (
          <ChatContainer
            messages={messages}
            loading={loading}
            chatEndRef={chatEndRef}
          />
        )}
      </main>

      {/* ── Fixed composer area ── */}
      <div
        ref={inputAreaRef}
        className="fixed bottom-0 left-0 right-0"
        style={{
          background: "linear-gradient(to top, #EBF1FA 78%, rgba(235,241,250,0.72) 92%, transparent)",
          zIndex: 40,
        }}
      >
        <div className="mx-auto px-4 pb-3 pt-4" style={{ maxWidth: 760 }}>
          {/* Context hint */}
          <div
            className="flex items-center gap-1.5 mb-2 ml-1"
            style={{
              fontSize: 11,
              color: "#8A9BB0",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#D4891A",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            建議輸入：事件對象、發生了什麼、時間地點、是否有證據
          </div>

          <InputBar onSend={handleSendMessage} disabled={loading} />

          {/* Disclaimer */}
          <p
            className="text-center mt-2"
            style={{
              fontSize: 10,
              color: "#8A9BB0",
              lineHeight: 1.5,
            }}
          >
            本系統提供校園法規與流程參考，不能取代正式法律意見。重要事項請向學校單位或專業人員確認。
          </p>
        </div>
      </div>

      {/* Mobile fallback for report search */}
      <div className="sm:hidden fixed bottom-28 right-5 z-50">
        <ReportSearchFeature />
      </div>

      {sidebarOpen && (
        <ChatSidebar
          onClose={() => setSidebarOpen(false)}
          onSelectSession={(session) => {
            console.log("Selected session:", session);
            setSidebarOpen(false);
          }}
        />
      )}
      <GuideModal
        open={guideOpen}
        onClose={() => setGuideOpen(false)}
      />
    </div>
  );
}
// src/components/chat/ChatSidebar.jsx
import { useState, useEffect } from "react";

// Example data shape — replace with real API call
const MOCK_SESSIONS = [
  {
    id: "s1",
    title: "霸凌事件處理流程",
    preview: "我被同學在教室外持續言語騷擾…",
    date: "今天",
    unread: false,
  },
  {
    id: "s2",
    title: "申訴書撰寫問題",
    preview: "學校收到申訴後要做什麼？相關…",
    date: "昨天",
    unread: false,
  },
  {
    id: "s3",
    title: "性別事件通報",
    preview: "遇到性騷擾可以找誰？需要準備…",
    date: "05/08",
    unread: false,
  },
];

export default function ChatSidebar({ onClose, onSelectSession }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Replace this with a real API fetch when available
    const timer = setTimeout(() => {
      setSessions(MOCK_SESSIONS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = sessions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (session) => {
    setActiveId(session.id);
    if (typeof onSelectSession === "function") {
      onSelectSession(session);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="chat-sidebar-overlay"
        onClick={onClose}
        aria-label="關閉側邊欄"
      />

      {/* Sidebar panel */}
      <aside className="chat-sidebar" aria-label="對話紀錄">
        {/* Header */}
        <div
          style={{
            padding: "16px 16px 12px",
            borderBottom: "0.5px solid rgba(26,46,74,0.1)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 600,
                color: "#1A2E4A",
                margin: 0,
              }}
            >
              對話紀錄
            </h2>

            <button
              type="button"
              onClick={onClose}
              aria-label="關閉"
              style={{
                background: "#F6F8FB",
                border: "0.5px solid rgba(26,46,74,0.12)",
                borderRadius: 8,
                width: 28,
                height: 28,
                cursor: "pointer",
                fontSize: 14,
                color: "#4A6080",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-sans)",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#E8EFF7")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#F6F8FB")}
            >
              ✕
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="搜尋對話…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cl-input"
            style={{ fontSize: 12, padding: "7px 11px" }}
          />
        </div>

        {/* Session list */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "8px 8px",
          }}
        >
          {loading ? (
            // Skeleton state
            <div style={{ padding: "8px 4px" }}>
              {[80, 65, 75].map((w, i) => (
                <div key={i} style={{ marginBottom: 12, padding: "10px 8px" }}>
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: `${w}%`, marginBottom: 6 }}
                  />
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "90%", height: 11 }}
                  />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                padding: "32px 16px",
                textAlign: "center",
                color: "#8A9BB0",
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              {searchQuery ? "找不到相關對話" : "尚無對話紀錄"}
              <br />
              <span style={{ fontSize: 11 }}>
                {searchQuery ? "請嘗試其他關鍵字" : "開始第一次諮詢吧！"}
              </span>
            </div>
          ) : (
            filtered.map((session) => (
              <button
                key={session.id}
                type="button"
                onClick={() => handleSelect(session)}
                className={`history-item${activeId === session.id ? " active" : ""}`}
                style={{ width: "100%", border: "none", cursor: "pointer" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1A2E4A",
                      fontFamily: "var(--font-sans)",
                      textAlign: "left",
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {session.title}
                  </span>

                  <span
                    style={{
                      fontSize: 10,
                      color: "#8A9BB0",
                      flexShrink: 0,
                      marginLeft: 8,
                      paddingTop: 2,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {session.date}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: 11,
                    color: "#8A9BB0",
                    fontFamily: "var(--font-sans)",
                    textAlign: "left",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "block",
                  }}
                >
                  {session.preview}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer — new chat */}
        <div
          style={{
            padding: "12px 12px",
            borderTop: "0.5px solid rgba(26,46,74,0.1)",
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="cl-btn-primary"
            style={{ marginTop: 0, fontSize: 13 }}
          >
            ＋ 開始新對話
          </button>
        </div>
      </aside>
    </>
  );
}

// src/components/chat/InputBar.jsx
import { useState } from "react";
import { qaData } from "/src/data/qaData.js";

function getRoleArray(storedUser) {
  if (!storedUser) return [];

  if (Array.isArray(storedUser.roles)) {
    return storedUser.roles;
  }

  if (typeof storedUser.role === "string" && storedUser.role.trim()) {
    return storedUser.role.split(" → ");
  }

  return [];
}

export default function InputBar({ onSend, onQuickQA, disabled = false }) {
  const [input, setInput] = useState("");
  const [qaOpen, setQaOpen] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  // Third view mode: 受害者 / 協助者
  const [thirdView, setThirdView] = useState(
    localStorage.getItem("thirdViewMode") === "協助者"
  );

  const toggleThirdView = () => {
    const newValue = !thirdView;
    setThirdView(newValue);
    localStorage.setItem("thirdViewMode", newValue ? "協助者" : "受害者");
  };

  const handleSend = () => {
    const cleanInput = input.trim();

    if (!cleanInput || disabled) return;

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const roles = getRoleArray(storedUser);

    onSend({
      chatInput: cleanInput,
      thirdView: thirdView ? "協助者" : "受害者",
      role: roles,
    });

    setInput("");
  };

  const toggleTopic = (topic) => {
    setExpandedTopic(expandedTopic === topic ? null : topic);
  };

  const handleQuestionClick = (itemQ) => {
    setModalContent(itemQ);
    setQaOpen(false);

    if (typeof onQuickQA === "function") {
      onQuickQA(itemQ);
    }
  };

  return (
    <>
      {/* Input container */}
      <div
        className="w-full rounded-2xl px-3 py-2 relative"
        style={{
          background: "#fff",
          border: "0.5px solid rgba(26,46,74,0.22)",
          boxShadow: "0 2px 10px rgba(26,46,74,0.08)",
        }}
      >
        <div className="flex items-center gap-2">
          {/* QA toggle button */}
          <button
            type="button"
            onClick={() => setQaOpen((prev) => !prev)}
            className="flex items-center justify-center rounded-lg transition-all flex-shrink-0"
            style={{
              width: 32,
              height: 32,
              background: qaOpen ? "#E8EFF7" : "transparent",
              border: "none",
              cursor: "pointer",
            }}
            title="常見問題"
          >
            <img
              src="/qa.png"
              alt="Quick QA"
              style={{
                width: 18,
                height: 18,
                opacity: qaOpen ? 1 : 0.75,
              }}
            />
          </button>

          {/* Text input */}
          <input
            id="legal-chat-input"
            type="text"
            placeholder="請描述您遇到的校園事件…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSend();
              }
            }}
            disabled={disabled}
            style={{
              flex: 1,
              fontSize: 13,
              color: "#1A2E4A",
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "var(--font-sans)",
              opacity: disabled ? 0.6 : 1,
              minWidth: 0,
            }}
          />

          {/* Role/view toggle
          <button
            type="button"
            onClick={toggleThirdView}
            className="flex-shrink-0 rounded-full transition-all"
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: "3px 10px",
              border: "0.5px solid",
              borderColor: thirdView ? "#1A2E4A" : "rgba(26,46,74,0.22)",
              background: thirdView ? "#1A2E4A" : "transparent",
              color: thirdView ? "#fff" : "#8A9BB0",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              whiteSpace: "nowrap",
            }}
            title="切換身分視角"
          >
            {thirdView ? "協助者" : "受害者"}
          </button>
            */}
          {/* Send button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className="flex items-center justify-center rounded-full flex-shrink-0 transition-all"
            style={{
              width: 34,
              height: 34,
              background: input.trim() && !disabled ? "#1A2E4A" : "#D1D8E0",
              border: "none",
              cursor: input.trim() && !disabled ? "pointer" : "not-allowed",
            }}
            title="送出"
          >
            <img
              src="/Send24.png"
              alt="Send"
              style={{
                width: 18,
                height: 18,
                filter: "brightness(0) invert(1)",
                opacity: input.trim() && !disabled ? 1 : 0.65,
              }}
            />
          </button>
        </div>

        {/* Quick QA Panel */}
        {qaOpen && (
          <div
            className="qa-popup absolute left-0 w-64 rounded-xl p-3 text-sm z-50 overflow-y-auto"
            style={{
              bottom: "calc(100% + 8px)",
              background: "#fff",
              border: "0.5px solid rgba(26,46,74,0.14)",
              boxShadow: "0 8px 24px rgba(26,46,74,0.10)",
              maxHeight: 300,
            }}
          >
            <div
              className="font-semibold ml-1 mb-3"
              style={{
                fontSize: 12,
                color: "#1A2E4A",
                fontFamily: "var(--font-sans)",
              }}
            >
              校園常見法律問題
            </div>

            {qaData.map((item) => (
              <div key={item.topic} className="mb-1.5">
                {/* Topic */}
                <button
                  type="button"
                  onClick={() => toggleTopic(item.topic)}
                  className="w-full text-left transition-colors rounded-md px-2 py-1"
                  style={{
                    fontSize: 12,
                    color: "#4A6080",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F6F8FB";
                    e.currentTarget.style.color = "#1A2E4A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "none";
                    e.currentTarget.style.color = "#4A6080";
                  }}
                >
                  {expandedTopic === item.topic ? "▾ " : "▸ "}
                  {item.topic}
                </button>

                {/* Questions */}
                {expandedTopic === item.topic && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {item.questions.map((itemQ) => (
                      <button
                        key={itemQ.q}
                        type="button"
                        onClick={() => handleQuestionClick(itemQ)}
                        className="block text-left w-full rounded-md px-2 py-1 transition-colors"
                        style={{
                          fontSize: 11,
                          color: "#4A6080",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "var(--font-sans)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#FEF3E2";
                          e.currentTarget.style.color = "#D4891A";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "none";
                          e.currentTarget.style.color = "#4A6080";
                        }}
                      >
                        {itemQ.q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QA Detail Modal */}
      {modalContent && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[200]"
          style={{
            background: "rgba(26,46,74,0.35)",
          }}
          onClick={() => setModalContent(null)}
        >
          <div
            className="relative overflow-y-auto"
            style={{
              background: "#fff",
              width: 520,
              maxWidth: "90vw",
              maxHeight: "70vh",
              borderRadius: 20,
              padding: "28px 24px",
              boxShadow: "0 16px 48px rgba(26,46,74,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 transition-all hover:opacity-80 hover:scale-105"
              style={{
                background: "#F6F8FB",
                border: "0.5px solid rgba(26,46,74,0.14)",
                borderRadius: 8,
                width: 30,
                height: 30,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/close.png"
                alt="close"
                style={{
                  width: 16,
                  height: 16,
                  opacity: 0.7,
                }}
              />
            </button>

            {/* Question */}
            <h3
              className="mb-5 pr-8 leading-snug"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 18,
                fontWeight: 600,
                color: "#1A2E4A",
              }}
            >
              {modalContent.q}
            </h3>

            {/* Answer */}
            <div
              className="leading-relaxed whitespace-pre-line"
              style={{
                fontSize: 14,
                color: "#4A6080",
                lineHeight: 1.7,
              }}
            >
              {modalContent.a}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
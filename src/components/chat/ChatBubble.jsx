// src/components/chat/ChatBubble.jsx
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function parseAnswerSections(text) {
  if (!text || typeof text !== "string") return [];

  const formattedText = text
    .replaceAll("\\n", "\n")
    .replaceAll("\\t", "    ");

  // Only split AI answer if it contains section titles like 【法律摘要】
  if (!formattedText.includes("【")) {
    return [];
  }

  return formattedText
    .split(/(?=【[^】]+】)/g)
    .map((section) => section.trim())
    .filter(Boolean)
    .map((section) => {
      const titleMatch = section.match(/^【([^】]+)】/);
      const title = titleMatch ? titleMatch[1] : "回覆內容";

      const content = titleMatch
        ? section.replace(/^【[^】]+】/, "").trim()
        : section;

      // Preview removes markdown symbols to avoid broken ** when text is cut
      const cleanPreview = content.replace(/\*\*/g, "");

      const preview =
        cleanPreview.length > 100
          ? cleanPreview.slice(0, 100) + "..."
          : cleanPreview;

      return {
        title,
        content,
        preview,
      };
    });
}

// Small AI avatar circle
function AIAvatar() {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-full"
      style={{
        width: 28,
        height: 28,
        background: "#1A2E4A",
        marginTop: 2,
      }}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    </div>
  );
}

export default function ChatBubble({ from, text }) {
  const isUser = from === "user";
  const [openSections, setOpenSections] = useState({});

  // Fix escaped line breaks from n8n
  const formattedText = text
    ?.replaceAll("\\n", "\n")
    ?.replaceAll("\\t", "    ");

  const sections = !isUser ? parseAnswerSections(text) : [];

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      className={`my-3 flex w-full transition-all duration-300 ease-in-out ${
        isUser ? "justify-end" : "justify-start items-start gap-2"
      }`}
    >
      {/* AI avatar — only for AI messages */}
      {!isUser && <AIAvatar />}

      <div
        className={`
          px-4 py-2.5 text-sm leading-relaxed tracking-wide
          ${
            isUser
              ? "rounded-2xl rounded-br-[4px] max-w-[75%]"
              : "rounded-2xl rounded-bl-[4px] max-w-[88%]"
          }
        `}
        style={{
          background: isUser ? "#1A2E4A" : "#fff",
          color: isUser ? "#fff" : "#1A2E4A",
          border: isUser ? "none" : "0.5px solid rgba(26,46,74,0.12)",
          boxShadow: isUser ? "none" : "0 1px 6px rgba(26,46,74,0.06)",
          wordBreak: "break-word",
          lineHeight: 1.55,
          fontFamily: "var(--font-sans)",
        }}
      >
        {/* User message OR normal AI message without sections */}
        {isUser || sections.length === 0 ? (
          <div className="chat-markdown">
            <ReactMarkdown>{formattedText}</ReactMarkdown>
          </div>
        ) : (
          // Structured AI answer with section blocks
          <div className="space-y-2">
            {sections.map((section, index) => {
              const isOpen = openSections[index];

              return (
                <div
                  key={index}
                  className="rounded-xl p-3"
                  style={{
                    background: "#F6F8FB",
                    border: "0.5px solid rgba(26,46,74,0.12)",
                  }}
                >
                  {/* Section title pill */}
                  <div
                    className="inline-block mb-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: "#E8EFF7",
                      color: "#1A2E4A",
                      fontSize: 10,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    【{section.title}】
                  </div>

                  <div
                    className="chat-markdown text-sm leading-relaxed"
                    style={{
                      color: "#4A6080",
                      fontSize: 12,
                    }}
                  >
                    <ReactMarkdown>
                      {isOpen ? section.content : section.preview}
                    </ReactMarkdown>
                  </div>

                  {section.content.length > 100 && (
                    <button
                      type="button"
                      onClick={() => toggleSection(index)}
                      className="mt-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                      style={{
                        color: "#D4891A",
                        fontSize: 11,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {isOpen ? "▲ 收合內容" : "▼ 查看詳細內容"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
// src/components/chat/ChatContainer.jsx
import ChatBubble from "./ChatBubble";

export default function ChatContainer({ messages, loading, chatEndRef }) {
  return (
    <div
      className="
        w-full flex flex-col items-center
        px-4 md:px-8 pt-5 pb-6
        scroll-smooth
      "
    >
      <div
        className="w-full flex flex-col"
        style={{
          maxWidth: 760,
        }}
      >
        {messages.map((msg, i) => (
          <ChatBubble key={i} from={msg.from} text={msg.text} />
        ))}

        {loading && (
          <div className="flex items-center gap-2 mt-3 ml-10">
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((dotIndex) => (
                <span
                  key={dotIndex}
                  className="rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background: "#8A9BB0",
                    display: "inline-block",
                    animation: `chatDotBounce 1.2s ease-in-out ${
                      dotIndex * 0.2
                    }s infinite`,
                  }}
                />
              ))}
            </div>

            <span
              style={{
                fontSize: 11,
                color: "#8A9BB0",
                fontFamily: "var(--font-sans)",
              }}
            >
              正在查詢相關法規…
            </span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <style>{`
        @keyframes chatDotBounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }

          40% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
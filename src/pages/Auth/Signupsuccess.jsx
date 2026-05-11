// src/pages/Auth/SignupSuccess.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "/src/config/config.js";

function normalizeRoles(user) {
  if (!user) return [];

  if (Array.isArray(user.roles)) {
    return user.roles;
  }

  if (typeof user.role === "string" && user.role.trim()) {
    return user.role.split(" → ");
  }

  return [];
}

export default function SignupSuccess() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const roles = normalizeRoles(user);
  const displayName = user?.email ? user.email.split("@")[0] : null;

  return (
    <>
      <style>{`
        @keyframes checkDraw {
          from {
            stroke-dashoffset: 60;
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes circlePop {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          60% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes cardRise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-card {
          animation: cardRise 0.32s ease forwards;
        }

        .check-circle {
          animation: circlePop 0.36s cubic-bezier(0.34, 1.4, 0.64, 1) 0.1s forwards;
          opacity: 0;
          transform-origin: center;
        }

        .check-mark {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: checkDraw 0.3s ease 0.4s forwards;
          opacity: 0;
        }
      `}</style>

      <div
        className="min-h-screen w-full flex items-center justify-center px-4 py-8"
        style={{
          background: "linear-gradient(160deg, #F6F8FB 0%, #EBF1FA 100%)",
        }}
      >
        <div
          className="success-card auth-card"
          style={{
            textAlign: "center",
            maxWidth: 440,
          }}
        >
          {/* Success icon */}
          <div style={{ marginBottom: 20 }}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                margin: "0 auto",
                display: "block",
              }}
            >
              <circle
                className="check-circle"
                cx="32"
                cy="32"
                r="30"
                fill="#E8EFF7"
                stroke="#1A2E4A"
                strokeWidth="1.5"
              />

              <polyline
                className="check-mark"
                points="20,33 28,41 44,24"
                stroke="#1A2E4A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 24,
              fontWeight: 600,
              color: "#1A2E4A",
              marginBottom: 8,
            }}
          >
            {APP_NAME || "校園法律顧問"}
          </h1>

          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#1A2E4A",
              marginBottom: 6,
            }}
          >
            帳號建立成功！
          </p>

          <p
            style={{
              fontSize: 13,
              color: "#8A9BB0",
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            {displayName ? `歡迎，${displayName}。` : "歡迎加入。"}
            您現在可以開始使用校園法律顧問。
          </p>

          {/* Role tags */}
          {roles.length > 0 && (
            <div
              style={{
                background: "#F6F8FB",
                border: "0.5px solid rgba(26,46,74,0.12)",
                borderRadius: 14,
                padding: "12px 16px",
                marginBottom: 22,
                textAlign: "left",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  color: "#8A9BB0",
                  marginBottom: 8,
                }}
              >
                已設定身分
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                {roles.map((role, index) => (
                  <span
                    key={`${role}-${index}`}
                    className="role-tag"
                    style={{
                      fontSize: 12,
                      padding: "4px 10px",
                    }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* What next */}
          <div
            style={{
              background: "#F6F8FB",
              borderRadius: 14,
              border: "0.5px solid rgba(26,46,74,0.1)",
              padding: "14px 16px",
              marginBottom: 24,
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#8A9BB0",
                marginBottom: 10,
              }}
            >
              您可以
            </p>

            {[
              {
                icon: "💬",
                text: "描述校園事件，獲得法規解釋與處理建議",
              },
              {
                icon: "📋",
                text: "整理案件重點、申訴時間軸與相關條文",
              },
              {
                icon: "🔍",
                text: "搜尋學校通報書與相關表單連結",
              },
            ].map(({ icon, text }) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: 8,
                  fontSize: 13,
                  color: "#4A6080",
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </span>

                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Main CTA */}
          <button
            type="button"
            onClick={() => navigate("/homeUI")}
            className="cl-btn-primary"
            style={{
              marginBottom: 10,
            }}
          >
            開始諮詢 →
          </button>

          {/* Secondary CTA */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              width: "100%",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              padding: "10px",
              borderRadius: 12,
              border: "0.5px solid rgba(26,46,74,0.22)",
              background: "transparent",
              color: "#4A6080",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#E8EFF7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            前往登入
          </button>

          {/* Disclaimer */}
          <p
            style={{
              fontSize: 11,
              color: "#C5D0DD",
              marginTop: 20,
              lineHeight: 1.5,
            }}
          >
            本系統提供校園法規與流程參考，不能取代正式法律意見。
          </p>
        </div>
      </div>
    </>
  );
}
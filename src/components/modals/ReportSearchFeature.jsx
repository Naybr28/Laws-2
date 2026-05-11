// src/components/modals/ReportSearchFeature.jsx
import { useState } from "react";

export default function ReportSearchFeature({ asNavLink = false }) {
  const [open, setOpen] = useState(false);
  const [school, setSchool] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const cleanSchool = school.trim();

    if (!cleanSchool) {
      setError("請輸入學校名稱");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch("http://localhost:5678/webhook/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ school: cleanSchool }),
      });

      const data = await res.json();

      const resultList = Array.isArray(data) ? data : data.results;

      if (!resultList || resultList.length === 0) {
        setError("沒有找到結果，請嘗試輸入完整學校名稱");
        return;
      }

      setResults(resultList);
    } catch (err) {
      console.error(err);
      setError("發生錯誤，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  const hasFallbackNotice = results.some((item) => {
    const link = item?.link || "";
    return link.includes("moe.edu.tw") || link.includes("gender.edu.tw");
  });

  const getHostname = (link) => {
    try {
      return new URL(link).hostname;
    } catch {
      return link;
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={asNavLink ? "nav-link nav-highlight" : ""}
        style={
          asNavLink
            ? undefined
            : {
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                color: "#1A2E4A",
                background: "#fff",
                border: "0.5px solid rgba(26,46,74,0.14)",
                borderRadius: 12,
                padding: "8px 12px",
                boxShadow: "0 4px 14px rgba(26,46,74,0.06)",
                cursor: "pointer",
              }
        }
      >
        🔍 通報書搜尋
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[9999] px-4"
          style={{
            background: "rgba(26,46,74,0.38)",
            backdropFilter: "blur(3px)",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full"
            style={{
              maxWidth: 620,
              maxHeight: "calc(100vh - 48px)",
              background: "#fff",
              borderRadius: 22,
              border: "0.5px solid rgba(26,46,74,0.12)",
              boxShadow: "0 24px 70px rgba(26,46,74,0.18)",
              padding: "24px 24px 20px",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between gap-4"
              style={{
                marginBottom: 20,
                flexShrink: 0,
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#1A2E4A",
                    marginBottom: 6,
                  }}
                >
                  通報書搜尋
                </h2>

                <p
                  style={{
                    fontSize: 13,
                    color: "#8A9BB0",
                    lineHeight: 1.6,
                  }}
                >
                  輸入學校名稱，搜尋可用的通報書、申訴表單或相關連結。
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="關閉"
                style={{
                  background: "#F6F8FB",
                  border: "0.5px solid rgba(26,46,74,0.14)",
                  borderRadius: 8,
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                  fontSize: 14,
                  color: "#4A6080",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            {/* Search input */}
            <div
              className="flex gap-2"
              style={{
                marginBottom: 14,
                flexShrink: 0,
              }}
            >
              <input
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="例如：國立東華大學"
                className="cl-input"
                style={{
                  flex: 1,
                }}
              />

              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                style={{
                  minWidth: 92,
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "9px 14px",
                  borderRadius: 12,
                  border: "none",
                  background: loading ? "#9BA8B5" : "#1A2E4A",
                  color: "#fff",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "搜尋中" : "搜尋"}
              </button>
            </div>

            {/* Status area */}
            {loading && (
              <div
                style={{
                  background: "#F6F8FB",
                  border: "0.5px solid rgba(26,46,74,0.1)",
                  borderRadius: 14,
                  padding: "14px 16px",
                  fontSize: 13,
                  color: "#4A6080",
                  marginBottom: 12,
                }}
              >
                正在搜尋相關通報書…
              </div>
            )}

            {error && !loading && (
              <div
                style={{
                  background: "#FEF0F0",
                  border: "0.5px solid rgba(176,48,48,0.18)",
                  borderRadius: 14,
                  padding: "12px 14px",
                  fontSize: 13,
                  color: "#B03030",
                  marginBottom: 12,
                }}
              >
                {error}
              </div>
            )}

            {/* Results */}
            {!loading && results.length > 0 && (
              <div
                style={{
                  overflowY: "auto",
                  paddingRight: 4,
                  maxHeight: "min(420px, 50vh)",
                }}
              >
                {hasFallbackNotice && (
                  <div
                    style={{
                      background: "#FEF3E2",
                      border: "0.5px solid rgba(212,137,26,0.25)",
                      color: "#8A5A13",
                      fontSize: 13,
                      borderRadius: 14,
                      padding: "12px 14px",
                      marginBottom: 12,
                      lineHeight: 1.6,
                    }}
                  >
                    ⚠️ 該學校相關通報資料較少，已補充教育部通用表單供參考。
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  {results.map((item, index) => (
                    <a
                      key={`${item.link}-${index}`}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "block",
                        background: "#F6F8FB",
                        border: "0.5px solid rgba(26,46,74,0.12)",
                        borderRadius: 14,
                        padding: "12px 14px",
                        textDecoration: "none",
                        transition: "background 0.15s, border-color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#E8EFF7";
                        e.currentTarget.style.borderColor =
                          "rgba(26,46,74,0.22)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#F6F8FB";
                        e.currentTarget.style.borderColor =
                          "rgba(26,46,74,0.12)";
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#1A2E4A",
                          marginBottom: 4,
                          lineHeight: 1.5,
                        }}
                      >
                        {item.title || "未命名表單"}
                      </div>

                      <div
                        style={{
                          fontSize: 11,
                          color: "#8A9BB0",
                        }}
                      >
                        {getHostname(item.link)}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Empty hint */}
            {!loading && !error && results.length === 0 && (
              <div
                style={{
                  background: "#F6F8FB",
                  border: "0.5px solid rgba(26,46,74,0.1)",
                  borderRadius: 14,
                  padding: "18px 16px",
                  textAlign: "center",
                  color: "#8A9BB0",
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                請輸入學校名稱後開始搜尋。
                <br />
                <span style={{ fontSize: 11 }}>
                  建議使用完整校名，例如「國立東華大學」。
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
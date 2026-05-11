// src/components/profile/ModalRoleSelect.jsx
import { useEffect, useState, useCallback } from "react";
import { roleHierarchy } from "/src/data/roles.js";
import studentIcon from "/src/assets/icons/student.png";
import teacherIcon from "/src/assets/icons/teacher.png";

const ROOT_MENU = {
  title: "請選擇您的身分",
  subtitle: "系統會根據您的身分提供較適合的校園法規與處理流程。",
  options: [
    { label: "學生", next: "student", icon: studentIcon },
    { label: "教師", next: "teacher", icon: teacherIcon },
  ],
};

const PARENT_MAP = {
  under12_special: "studentUnder12",
  t12to14_special: "student12to14",
  t14to18_special: "student14to18",
  above18_special: "studentAbove18",

  studentUnder12: "student",
  student12to14: "student",
  student14to18: "student",
  studentAbove18: "student",

  teacher_public: "teacher",
  teacher_private: "teacher",
  teacher_support: "teacher",

  teacher_public_fulltime: "teacher_public",
  teacher_public_parttime: "teacher_public",
  teacher_public_admin: "teacher_public",

  teacher_private_teacher: "teacher_private",
  teacher_private_admin: "teacher_private",
};

export default function ModalRoleSelect({ show, onClose, onSelect }) {
  const [currentKey, setCurrentKey] = useState("root");
  const [selectedPath, setSelectedPath] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (show) {
      setCurrentKey("root");
      setSelectedPath([]);
      setHoveredIndex(null);
    }
  }, [show]);

  useEffect(() => {
    if (!show) return;

    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [show, onClose]);

  const handleSelect = useCallback(
    (nextKey, label) => {
      const newPath = [...selectedPath, label];

      if (nextKey === "end") {
        onSelect(newPath);
        onClose();
        return;
      }

      setSelectedPath(newPath);
      setCurrentKey(nextKey);
      setHoveredIndex(null);
    },
    [selectedPath, onSelect, onClose]
  );

  const handleBack = useCallback(() => {
    const parentKey = PARENT_MAP[currentKey];

    if (parentKey) {
      setCurrentKey(parentKey);
      setSelectedPath((prev) => prev.slice(0, -1));
    } else if (currentKey !== "root") {
      setCurrentKey("root");
      setSelectedPath([]);
    } else {
      onClose();
    }

    setHoveredIndex(null);
  }, [currentKey, onClose]);

  if (!show) return null;

  const currentData =
    currentKey === "root" ? ROOT_MENU : roleHierarchy[currentKey];

  const isRoot = currentKey === "root";
  const options = currentData?.options || [];
  const depthLevel = selectedPath.length;

  const shouldUseGrid = !isRoot && options.length >= 5;

  return (
    <>
      <style>{`
        @keyframes rmsModalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes rmsOverlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .rms-overlay {
          animation: rmsOverlayFadeIn 0.18s ease forwards;
        }

        .rms-card {
          animation: rmsModalFadeIn 0.22s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
        }

        .rms-option-card {
          transition:
            background 0.14s ease,
            border-color 0.14s ease,
            transform 0.12s ease,
            box-shadow 0.14s ease;
        }

        .rms-option-card:hover {
          background: #DCE8F5 !important;
          border-color: rgba(26,46,74,0.35) !important;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(26,46,74,0.08);
        }

        .rms-option-card:active {
          transform: translateY(0) scale(0.99);
        }

        .rms-options-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .rms-options-scroll::-webkit-scrollbar-thumb {
          background: #C5D0DD;
          border-radius: 999px;
        }

        .rms-options-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        @media (max-width: 520px) {
          .rms-option-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        className="rms-overlay fixed inset-0 flex justify-center items-center z-[9999] px-4 py-6"
        style={{
          background: "rgba(26, 46, 74, 0.4)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="身分選擇"
      >
        <div
          className="rms-card w-full"
          style={{
            maxWidth: 560,
            maxHeight: "calc(100vh - 48px)",
            background: "#fff",
            borderRadius: 22,
            padding: "26px 28px 20px",
            boxShadow: "0 28px 70px rgba(26,46,74,0.2)",
            border: "0.5px solid rgba(26,46,74,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {!isRoot && (
            <div className="flex items-center justify-center gap-1.5 mb-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: i < depthLevel ? 18 : 7,
                    height: 7,
                    borderRadius: 99,
                    background:
                      i < depthLevel ? "#1A2E4A" : "rgba(26,46,74,0.15)",
                    transition: "width 0.25s ease, background 0.25s ease",
                    display: "inline-block",
                  }}
                />
              ))}
            </div>
          )}

          <div className="text-center mb-5">
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 22,
                fontWeight: 600,
                color: "#1A2E4A",
                marginBottom: 7,
                lineHeight: 1.3,
              }}
            >
              {currentData?.title || "請選擇"}
            </h2>

            <p
              style={{
                fontSize: 13,
                color: "#8A9BB0",
                lineHeight: 1.65,
                maxWidth: 400,
                margin: "0 auto",
              }}
            >
              {currentData?.subtitle || "請依序選擇最符合您目前情境的身分。"}
            </p>
          </div>

          {selectedPath.length > 0 && (
            <div
              style={{
                background: "#F6F8FB",
                border: "0.5px solid rgba(26,46,74,0.1)",
                borderRadius: 12,
                padding: "10px 14px",
                marginBottom: 14,
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  color: "#8A9BB0",
                  fontWeight: 600,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  marginBottom: 7,
                }}
              >
                目前選擇
              </p>

              <div className="flex flex-wrap items-center gap-1.5">
                {selectedPath.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="flex items-center gap-1.5"
                  >
                    {index > 0 && (
                      <span style={{ color: "#C5D0DD", fontSize: 11 }}>
                        ›
                      </span>
                    )}

                    <span
                      className="role-tag"
                      style={{
                        fontSize: 11,
                        padding: "3px 9px",
                      }}
                    >
                      {item}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div
            className="rms-options-scroll"
            style={{
              overflowY: "auto",
              paddingRight: options.length > 4 ? 4 : 0,
              maxHeight: isRoot
                ? "none"
                : selectedPath.length > 0
                  ? "min(360px, 42vh)"
                  : "min(400px, 48vh)",
            }}
          >
            <div
              className={shouldUseGrid ? "rms-option-grid" : ""}
              style={{
                display: "grid",
                gridTemplateColumns: shouldUseGrid ? "repeat(2, 1fr)" : "1fr",
                gap: 10,
              }}
            >
              {options.map((opt, idx) => (
                <button
                  key={opt.label}
                  type="button"
                  className="rms-option-card"
                  onClick={() => handleSelect(opt.next, opt.label)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    width: "100%",
                    minHeight: isRoot ? 88 : shouldUseGrid ? 52 : 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isRoot ? "center" : "space-between",
                    gap: 12,
                    padding: isRoot
                      ? "16px 20px"
                      : shouldUseGrid
                        ? "12px 14px"
                        : "13px 18px",
                    borderRadius: 14,
                    border: "0.5px solid rgba(26,46,74,0.14)",
                    background: "#E8EFF7",
                    color: "#1A2E4A",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isRoot ? "column" : "row",
                      alignItems: "center",
                      gap: isRoot ? 8 : 10,
                      minWidth: 0,
                    }}
                  >
                    {opt.icon && (
                      <img
                        src={opt.icon}
                        alt=""
                        aria-hidden="true"
                        style={{
                          width: isRoot ? 36 : 24,
                          height: isRoot ? 36 : 24,
                          objectFit: "contain",
                          opacity: 0.85,
                          flexShrink: 0,
                        }}
                      />
                    )}

                    <span
                      style={{
                        fontSize: isRoot ? 15 : 14,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: shouldUseGrid ? "normal" : "nowrap",
                        lineHeight: 1.4,
                      }}
                    >
                      {opt.label}
                    </span>
                  </div>

                  {!isRoot && (
                    <span
                      style={{
                        color:
                          hoveredIndex === idx ? "#1A2E4A" : "#8A9BB0",
                        fontSize: 15,
                        transition: "color 0.14s, transform 0.14s",
                        display: "inline-block",
                        transform:
                          hoveredIndex === idx ? "translateX(2px)" : "none",
                        flexShrink: 0,
                      }}
                    >
                      →
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 18,
              paddingTop: 14,
              borderTop: "0.5px solid rgba(26,46,74,0.1)",
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={handleBack}
              style={{
                background: "transparent",
                border: "none",
                color: "#4A6080",
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                cursor: "pointer",
                padding: "5px 0",
              }}
            >
              ← {isRoot ? "取消" : "上一步"}
            </button>

            <div
              style={{
                fontSize: 11,
                color: "#C5D0DD",
                fontFamily: "var(--font-sans)",
              }}
            >
              {selectedPath.length > 0
                ? `已選 ${selectedPath.length} 層`
                : "請從上方選擇"}
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                color: "#4A6080",
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                cursor: "pointer",
                padding: "5px 0",
              }}
            >
              關閉 ×
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
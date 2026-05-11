// src/components/modals/GuideModal.jsx

const GUIDE_SECTIONS = [
  {
    title: "系統可以協助什麼？",
    icon: "⚖️",
    content:
      "校園法律顧問可以協助使用者了解校園霸凌、性別事件、申訴流程、通報流程與相關校園法規。系統會根據您描述的事件內容，整理可能相關的法條、案件重點與處理建議。",
  },
  {
    title: "如何輸入問題？",
    icon: "💬",
    content:
      "請盡量描述清楚事件中的人物、時間、地點、發生了什麼事、是否有證據，以及您想知道的問題。例如：我被同學長期嘲笑，還被拍照上傳到群組，我可以怎麼處理？",
  },
  {
    title: "回答內容怎麼看？",
    icon: "📋",
    content:
      "系統通常會將回答分成法律摘要、白話總結與行動建議。法律摘要會列出可能相關的法規；白話總結會用比較容易理解的方式說明；行動建議會提供後續可以考慮的處理方向。",
  },
  {
    title: "通報書搜尋怎麼用？",
    icon: "🔍",
    content:
      "點選上方的「通報書搜尋」，輸入學校名稱後，系統會嘗試搜尋該校可用的通報書、申訴表單或相關連結。如果找不到明確結果，可能會補充教育部通用表單供參考。",
  },
  {
    title: "使用提醒與限制",
    icon: "⚠️",
    content:
      "本系統提供校園法規與流程參考，不能取代正式法律意見。若事件涉及人身安全、嚴重霸凌、性騷擾、性侵害或緊急情況，請盡快向學校、家長、師長、相關單位或專業人員求助。",
  },
];

const CASE_FIELDS = [
  "參與者類型",
  "參與者身分",
  "事件類型",
  "受害者",
  "加害者",
  "行為",
  "時間",
  "地點",
  "證據",
  "事件結果或後果",
  "危險程度",
];

export default function GuideModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999] px-4"
      style={{
        background: "rgba(26,46,74,0.38)",
        backdropFilter: "blur(3px)",
      }}
      onClick={onClose}
    >
      <div
        className="w-full"
        style={{
          maxWidth: 760,
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
                fontSize: 24,
                fontWeight: 600,
                color: "#1A2E4A",
                marginBottom: 6,
              }}
            >
              使用說明
            </h2>

            <p
              style={{
                fontSize: 13,
                color: "#8A9BB0",
                lineHeight: 1.6,
              }}
            >
              了解如何使用校園法律顧問，以及如何輸入更完整的案件資訊。
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
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

        {/* Content */}
        <div
          style={{
            overflowY: "auto",
            paddingRight: 4,
            maxHeight: "min(620px, 68vh)",
          }}
        >
          {/* Guide sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {GUIDE_SECTIONS.map((section) => (
              <div
                key={section.title}
                className="feature-card"
                style={{
                  padding: 16,
                  minHeight: 150,
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    marginBottom: 8,
                  }}
                >
                  {section.icon}
                </div>

                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#1A2E4A",
                    marginBottom: 8,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {section.title}
                </h3>

                <p
                  style={{
                    fontSize: 13,
                    color: "#4A6080",
                    lineHeight: 1.7,
                  }}
                >
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Case fields */}
          <div
            style={{
              marginTop: 16,
              background: "#F6F8FB",
              border: "0.5px solid rgba(26,46,74,0.12)",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#1A2E4A",
                marginBottom: 10,
              }}
            >
              建議輸入的案件資訊
            </h3>

            <p
              style={{
                fontSize: 13,
                color: "#8A9BB0",
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              不需要每一項都完整填寫，但資訊越完整，系統越能提供準確的法規與處理建議。
            </p>

            <div className="flex flex-wrap gap-2">
              {CASE_FIELDS.map((field) => (
                <span
                  key={field}
                  className="role-tag"
                  style={{
                    fontSize: 12,
                    padding: "5px 10px",
                  }}
                >
                  {field}
                </span>
              ))}
            </div>
          </div>

          {/* Example input */}
          <div
            style={{
              marginTop: 16,
              background: "#F6F8FB",
              border: "0.5px solid rgba(26,46,74,0.12)",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#1A2E4A",
                marginBottom: 10,
              }}
            >
              建議輸入範例
            </h3>

            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 14,
                color: "#4A6080",
                fontSize: 13,
                lineHeight: 1.8,
                border: "0.5px solid rgba(26,46,74,0.1)",
              }}
            >
              我是 12-14 歲的國中生。最近有同班同學在教室和班級群組裡長期嘲笑我，
              還把我的照片傳到群組，並用難聽的話罵我。事情已經持續兩個星期，
              地點主要是在教室和 LINE 群組。我有截圖證據，也有同學可以作證。
              這件事讓我很害怕，不太敢去學校。請問這可能算校園霸凌嗎？
              我可以怎麼申訴？
            </div>

            <p
              style={{
                marginTop: 10,
                fontSize: 12,
                color: "#8A9BB0",
                lineHeight: 1.6,
              }}
            >
              建議包含：身分、事件類型、受害者、加害者、行為、時間、地點、證據、事件結果與危險程度。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
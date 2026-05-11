import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="min-h-screen w-full flex flex-col overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #F6F8FB 0%, #E4EDF8 100%)",
      }}
    >
      {/* ── Top Nav ── */}
      <nav
        className="flex-shrink-0 flex items-center justify-between px-7"
        style={{
          height: 56,
          background: "#fff",
          borderBottom: "0.5px solid rgba(26,46,74,0.12)",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1.5 select-none"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 17,
            fontWeight: 600,
            color: "#1A2E4A",
          }}
        >
          校園法律顧問
          <span
            style={{
              display: "inline-block",
              width: 7,
              height: 7,
              background: "#D4891A",
              borderRadius: "50%",
              flexShrink: 0,
            }}
          />
        </Link>

        {/* Auth buttons */}
        <div className="flex gap-2">
          <Link to="/login">
            <button
              className="text-sm font-medium px-4 py-1.5 rounded-xl transition-all hover:bg-[#E8EFF7] active:scale-95"
              style={{
                border: "0.5px solid rgba(26,46,74,0.22)",
                color: "#1A2E4A",
                background: "transparent",
                fontFamily: "var(--font-sans)",
              }}
            >
              登入
            </button>
          </Link>

          <Link to="/signup">
            <button
              className="text-sm font-semibold px-4 py-1.5 rounded-xl transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "#1A2E4A",
                color: "#fff",
                border: "none",
                fontFamily: "var(--font-sans)",
              }}
            >
              免費註冊
            </button>
          </Link>
        </div>
      </nav>

      {/* ── Main Body ── */}
      <main className="flex-1 flex items-center justify-center px-8 py-12">
        <section
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ maxWidth: 1040 }}
        >
          {/* Left: Main Text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-5 px-3 py-1 rounded-full"
              style={{
                color: "#D4891A",
                background: "#FEF3E2",
                border: "0.5px solid rgba(212,137,26,0.3)",
                fontFamily: "var(--font-sans)",
              }}
            >
              校園法律 AI 顧問
            </span>

            {/* Headline */}
            <h1
              className="mb-5 leading-snug"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(34px, 5vw, 58px)",
                fontWeight: 600,
                color: "#1A2E4A",
              }}
            >
              校園事件的
              <br />
              法律第一道防線
            </h1>

            {/* Description */}
            <p
              className="leading-relaxed mb-8 mx-auto lg:mx-0"
              style={{
                fontSize: 15,
                color: "#4A6080",
                maxWidth: 460,
                fontFamily: "var(--font-sans)",
              }}
            >
              不管是霸凌、性別事件、申訴流程或校規爭議，
              我們以白話解釋法規，協助你了解相關條文與下一步處理方式。
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3 justify-center lg:justify-start mb-8">
              <Link to="/login">
                <button
                  className="font-semibold px-6 py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-95"
                  style={{
                    background: "#1A2E4A",
                    color: "#fff",
                    fontSize: 14,
                    border: "none",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  開始諮詢 →
                </button>
              </Link>

              <a href="#features">
                <button
                  className="font-medium px-6 py-2.5 rounded-xl transition-all hover:bg-[#E8EFF7] active:scale-95"
                  style={{
                    fontSize: 14,
                    color: "#1A2E4A",
                    background: "transparent",
                    border: "0.5px solid rgba(26,46,74,0.22)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  了解功能
                </button>
              </a>
            </div>

            {/* Trust Row */}
            <div className="flex items-center justify-center lg:justify-start gap-5 flex-wrap">
              {["適合學生與教師", "根據台灣校園法規", "提供流程參考"].map(
                (item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5"
                    style={{
                      fontSize: 12,
                      color: "#8A9BB0",
                      fontFamily: "var(--font-sans)",
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
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div
            id="features"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <FeatureCard
              icon="📖"
              title="法規查詢"
              desc="根據案件內容找出可能相關的校園法規與條文。"
            />

            <FeatureCard
              icon="📋"
              title="案件重點整理"
              desc="協助整理人物、時間、行為、證據與事件脈絡。"
            />

            <FeatureCard
              icon="🗺️"
              title="SOP 處理流程"
              desc="提供申訴、通報、調查與後續處理流程參考。"
            />

            <FeatureCard
              icon="🔍"
              title="通報書搜尋"
              desc="依學校名稱搜尋可用的通報書或相關表單。"
            />
          </div>
        </section>
      </main>

      {/* ── Bottom Disclaimer ── */}
      <footer
        className="text-center px-4 pb-4"
        style={{
          fontSize: 11,
          color: "#8A9BB0",
          fontFamily: "var(--font-sans)",
        }}
      >
        本系統提供校園法規與流程參考，不能取代正式法律意見。
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div
      className="feature-card"
      style={{
        minHeight: 150,
      }}
    >
      <div className="text-3xl mb-3">{icon}</div>

      <h3
        className="mb-2"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          fontWeight: 600,
          color: "#1A2E4A",
        }}
      >
        {title}
      </h3>

      <p
        className="leading-relaxed"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          color: "#4A6080",
        }}
      >
        {desc}
      </p>
    </div>
  );
}

export default Home;
// src/pages/Auth/login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { hashPassword } from "/src/utils/crypto.js";
import { loginUser } from "/src/utils/api.js";
import { useLocalUser } from "/src/hooks/useLocalUser.js";
import { APP_NAME } from "/src/config/config.js";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useLocalUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("請輸入帳號與密碼");
      setSuccess("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const hashedPassword = await hashPassword(password);

      // Login request to n8n
      const data = await loginUser(email.trim(), hashedPassword);
      console.log("n8n login response:", data);

      if (!data || data.status !== "ok") {
        setError(data?.message || "登入失敗，請重試");
        setSuccess("");
        return;
      }

      // Keep your original user data format
      const userData = {
        email: data.email || email.trim(),
        role: Array.isArray(data.roles)
          ? data.roles.join(" → ")
          : data.roles || "",
      };

      // Save user to localStorage / hook
      setUser({ ...userData, __forceUpdate: true });

      setSuccess("登入成功！");
      setError("");

      setTimeout(() => {
        navigate("/homeUI");
      }, 800);
    } catch (err) {
      console.error("Login error:", err);
      setError("伺服器連線失敗，請稍後再試");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(160deg, #F6F8FB 0%, #EBF1FA 100%)",
      }}
    >
      <div className="auth-card">
        {/* Logo */}
        <div className="logo-mark" aria-hidden="true">
          ⚖️
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 24,
              fontWeight: 600,
              color: "#1A2E4A",
              marginBottom: 6,
            }}
          >
            {APP_NAME || "校園法律顧問"}
          </h1>

          <p
            style={{
              fontSize: 13,
              color: "#8A9BB0",
            }}
          >
            登入您的帳號
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div
            className="mb-4 text-center"
            style={{
              padding: "9px 12px",
              borderRadius: 12,
              background: "#FEF0F0",
              color: "#B03030",
              fontSize: 13,
              border: "0.5px solid rgba(176,48,48,0.18)",
            }}
          >
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div
            className="mb-4 text-center"
            style={{
              padding: "9px 12px",
              borderRadius: 12,
              background: "#EEF8F1",
              color: "#247A3D",
              fontSize: 13,
              border: "0.5px solid rgba(36,122,61,0.18)",
            }}
          >
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              className="block mb-2"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1A2E4A",
              }}
            >
              帳號
            </label>

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cl-input"
              placeholder="輸入您的帳號或 Email"
              autoComplete="username"
            />
          </div>

          <div>
            <label
              className="block mb-2"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1A2E4A",
              }}
            >
              密碼
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="cl-input"
              placeholder="輸入您的密碼"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="cl-btn-primary"
            disabled={loading}
          >
            {loading ? "登入中..." : "登入"}
          </button>
        </form>

        {/* Signup link */}
        <div
          className="text-center mt-7"
          style={{
            fontSize: 13,
            color: "#8A9BB0",
          }}
        >
          還沒有帳號嗎？{" "}
          <Link
            to="/signup"
            style={{
              color: "#1A2E4A",
              fontWeight: 600,
            }}
          >
            點此註冊
          </Link>
        </div>

        {/* Back home */}
        <div className="text-center mt-3">
          <Link
            to="/"
            style={{
              fontSize: 12,
              color: "#8A9BB0",
            }}
          >
            回到首頁
          </Link>
        </div>
      </div>
    </div>
  );
}
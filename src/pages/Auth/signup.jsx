// src/pages/Auth/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalRoleSelect from "/src/components/profile/ModalRoleSelect";

import { hashPassword } from "/src/utils/crypto.js";
import { signupUser } from "/src/utils/api.js";
import { sendOtpAPI } from "/src/utils/api_signup.js";
import { useLocalUser } from "/src/hooks/useLocalUser.js";
import { APP_NAME } from "/src/config/config.js";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useLocalUser();

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roles, setRoles] = useState([]);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // kept from original, currently not used
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (arr) => {
    setRoles(arr);
    setShowRoleModal(false);
  };

  // SEND OTP — currently not required for signup
  const handleSendOTP = async () => {
    setError("");
    setSuccess("");

    try {
      setSuccess("正在寄送驗證碼…");

      const res = await sendOtpAPI(email);

      if (res?.status === "ok") {
        setSuccess("驗證碼已寄出！請至信箱查看");
        setOtpSent(true);
      } else {
        setError(res?.message || "驗證碼寄送失敗，請稍後再試");
      }
    } catch (err) {
      console.error(err);
      setError("寄送驗證碼時發生錯誤");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim() || !confirm.trim()) {
      setError("請完整填寫所有欄位");
      return;
    }

    if (password !== confirm) {
      setError("兩次密碼不一致");
      return;
    }

    if (roles.length === 0) {
      setError("請選擇註冊身分");
      return;
    }

    try {
      setLoading(true);
      setSuccess("帳號建立中…");

      const hashedPassword = await hashPassword(password);

      const signupInfo = {
        email: email.trim(),
        password: hashedPassword,
        roles,
      };

      await signupUser(signupInfo);

      const newUser = {
        email: email.trim(),
        roles,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      setSuccess("註冊成功！即將前往聊天室…");

      setTimeout(() => navigate("/signup-success"), 1000);
    } catch (err) {
      console.error(err);
      setError("註冊失敗或伺服器錯誤");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-8"
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
            建立新帳號
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username / Email */}
          <div>
            <label
              className="block mb-2"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1A2E4A",
              }}
            >
              用戶名
            </label>

            <input
              type="text"
              placeholder="輸入您的用戶名"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cl-input"
              autoComplete="username"
            />
          </div>

          {/* Password */}
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
              placeholder="設定密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="cl-input"
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className="block mb-2"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1A2E4A",
              }}
            >
              確認密碼
            </label>

            <input
              type="password"
              placeholder="再次輸入密碼"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="cl-input"
              autoComplete="new-password"
            />
          </div>

          {/* Role Select */}
          <div>
            <label
              className="block mb-2"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1A2E4A",
              }}
            >
              身分選擇
            </label>

            <button
              type="button"
              onClick={() => setShowRoleModal(true)}
              className={`cl-role-btn ${roles.length > 0 ? "selected" : ""}`}
            >
              {roles.length > 0
                ? `已選擇：${roles.join(" → ")} ✓`
                : "選擇註冊身分"}
            </button>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="cl-btn-primary">
            {loading ? "建立帳號中…" : "建立帳號"}
          </button>
        </form>

        {/* Login link */}
        <div
          className="text-center mt-7"
          style={{
            fontSize: 13,
            color: "#8A9BB0",
          }}
        >
          已有帳號？{" "}
          <Link
            to="/login"
            style={{
              color: "#1A2E4A",
              fontWeight: 600,
            }}
          >
            點此登入
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

        <ModalRoleSelect
          show={showRoleModal}
          onClose={() => setShowRoleModal(false)}
          onSelect={handleRoleSelect}
        />
      </div>
    </div>
  );
}
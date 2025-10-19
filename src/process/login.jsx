import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSignup, setIsSignup] = useState(false); // switch login/signup mode

  // 🔐 SHA-256 password hashing
  async function hashPassword(password) {
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }

  // 📩 Handle submit for both login and signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("請輸入帳號與密碼");
      setSuccess("");
      return;
    }

    try {
      // Hash password before sending
      const hashedPassword = await hashPassword(password);

      // ✳️ SIGNUP FLOW — save info locally and go to role selection
      if (isSignup) {
        localStorage.setItem(
          "signupInfo",
          JSON.stringify({
            email,
            password: hashedPassword,
          })
        );
        console.log("🧩 Stored signupInfo:", {
          email,
          password: hashedPassword,
        });
        navigate("/ask"); // go to first role selection page
        return;
      }

      // ✳️ LOGIN FLOW — send directly to n8n
      const res = await fetch("http://localhost:5678/webhook/user-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: hashedPassword,
          action: "login",
        }),
      });

      if (!res.ok) throw new Error("連線錯誤");
      const data = await res.json();
      console.log("n8n login response:", data);

      if (data.status !== "ok") {
        setError(data.message || "登入失敗，請重試");
        setSuccess("");
        return;
      }

      // ✅ Successful login
      setError("");
      setSuccess("登入成功！");
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          mainRole: data.mainRole || "",
          subRole: data.subRole || "",
          subSubRole: data.subSubRole || "",
          subSubSubRole: data.subSubSubRole || "",
        })
      );

      // Redirect after short delay
      setTimeout(() => {
        setSuccess("");
        navigate("/HomeUI");
      }, 1000);
    } catch (err) {
      console.error("Error:", err);
      setError("伺服器連線失敗，請稍後再試");
      setSuccess("");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#FFFFFF] to-[#EAF2FF] flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-[90%] max-w-md">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-sky-800 mb-8">
          校園法律顧問
        </h1>

        {/* Error message */}
        {error && (
          <div className="w-full bg-red-100 text-red-600 text-center py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="w-full bg-green-100 text-green-700 text-center py-2 rounded-md mb-4">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sky-900 font-semibold mb-1">帳號</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="輸入您的電子郵件"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sky-900 font-semibold mb-1">密碼</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="輸入您的密碼"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-lg shadow-sm transition"
          >
            {isSignup ? "註冊" : "登入"}
          </button>
        </form>

        {/* Toggle between login/signup */}
        <div className="text-sm text-gray-600 text-center mt-8 space-y-3">
          {!isSignup ? (
            <p>
              還沒有帳號嗎？{" "}
              <button
                onClick={() => {
                  setIsSignup(true);
                  setError("");
                  setSuccess("");
                }}
                className="text-sky-700 font-semibold hover:underline"
              >
                點此註冊
              </button>
            </p>
          ) : (
            <p>
              已經有帳號了嗎？{" "}
              <button
                onClick={() => {
                  setIsSignup(false);
                  setError("");
                  setSuccess("");
                }}
                className="text-sky-700 font-semibold hover:underline"
              >
                返回登入
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// src/utils/api_signup.js

// IMPORTANT:
// Use production domain later (example: https://n8n.yourdomain.com/webhook)
// For now, use local n8n server:
const N8N_BASE = "http://localhost:5678/webhook";


// -------------------------------------------------------------
// Helper: Fetch wrapper with safe JSON parsing
// -------------------------------------------------------------
async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);

    // Protection: if n8n returns empty body
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { status: "error", message: "Invalid JSON from server" };
    }
  } catch (err) {
    console.error("API error:", err);
    return { status: "error", message: "Network error" };
  }
}



// -------------------------------------------------------------
// 1. SEND OTP
// POST http://localhost:5678/webhook/send-otp
// Body: { email }
// -------------------------------------------------------------
export async function sendOtpAPI(email) {
  return await safeFetch(`${N8N_BASE}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
}



// -------------------------------------------------------------
// 2. VERIFY OTP
// POST http://localhost:5678/webhook/verify-otp
// Body: { email, otp }
// -------------------------------------------------------------
export async function verifyOtpAPI(email, otp) {
  return await safeFetch(`${N8N_BASE}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp })
  });
}



// -------------------------------------------------------------
// 3. FINISH SIGNUP
// Create user in Firebase AND Supabase
// POST http://localhost:5678/webhook/finish-signup
// Body: { email, password, roles }
// -------------------------------------------------------------
export async function finishSignupAPI({ email, password, roles }) {
  return await safeFetch(`${N8N_BASE}/finish-signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    email,
      password,
      roles
    })
  });
}

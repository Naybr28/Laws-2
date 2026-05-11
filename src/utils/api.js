/**
 * api.js
 * -------------------------------------
 * Centralized helper for calling n8n webhooks.
 * -------------------------------------
 */

import { N8N_BASE_URL, N8N_ENDPOINTS, DEFAULT_HEADERS } from "/src/config/config.js";

/**
 * Universal helper for POST requests to n8n
 * @param {string} endpoint - endpoint path
 * @param {object} payload - JSON data
 */
export async function sendToN8N(endpoint, payload) {
  try {
    const response = await fetch(`${N8N_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[n8n] Response from ${endpoint}:`, data);
    return data;
  } catch (err) {
    console.error(`n8n API error (${endpoint}):`, err);
    throw err;
  }
}

/**
 * User login request
 */
export async function loginUser(email, password) {
  return await sendToN8N(N8N_ENDPOINTS.login, {
    email,
    password,
    action: "login",
  });
}

/**
 * User signup request
 */
export async function signupUser(signupInfo) {
  return await sendToN8N(N8N_ENDPOINTS.signup, {
    email: signupInfo.email,
    password: signupInfo.password,
    roles: signupInfo.roles,
    action: "signup",
  });
}

/**
 * Send chat message (only question + email)
 */
export async function sendChatMessage(question, userInfo = {}) {
  const payload = {
    chatInput: question,
    userId: userInfo.email || null,
    thirdView: userInfo.thirdView || "off",
    role: userInfo.role || []
  };

  console.log("Sending to n8n chatbot:", payload);

  return await sendToN8N("testwebhook", payload);
}

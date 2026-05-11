/**
 * config.js
 * -------------------------------------
 * Global configuration for environment variables, API base URLs,
 * and shared constants.
 * -------------------------------------
 * Exports:
 *   - ENV
 *   - N8N_BASE_URL
 *   - N8N_ENDPOINTS
 *   - APP_NAME
 *   - DEFAULT_HEADERS
 */

/**
 * Detect environment automatically
 * -------------------------------------
 * Vite provides `import.meta.env.MODE` which returns "development" or "production"
 */
export const ENV = import.meta.env.MODE || "development";

/**
 * n8n Base URL
 * -------------------------------------
 * Uses Vite environment variable if available (from .env file),
 * otherwise defaults to local development n8n instance.
 *
 * Example .env file:
 *   VITE_N8N_URL=https://your-n8n-instance.vercel.app/webhook
 *
 * Local dev default: http://localhost:5678/webhook
 */
export const N8N_BASE_URL =
  import.meta.env.VITE_N8N_URL || "http://localhost:5678/webhook";

/**
 * n8n Endpoint Paths
 * -------------------------------------
 * Each key corresponds to a specific workflow webhook path.
 * These are appended to the base URL automatically.
 *
 * Example:
 *   - Signup  → http://localhost:5678/webhook/user-signup
 *   - Login   → http://localhost:5678/webhook/user-login
 *   - Chat    → http://localhost:5678/webhook/testwebhook
 */
export const N8N_ENDPOINTS = {
  signup: "user-signup",    // Signup workflow
  login: "user-login",      // Login workflow
  chat: "testwebhook",      // Chatbot workflow
  feedback: "feedback",     // Optional future feature
};

/**
 * App Name — displayed in the UI and used for logging
 */
export const APP_NAME = "校園法律顧問"; // Campus Legal Advisor

/**
 * Common headers used in all API requests
 */
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

/**
 * Optional helper to get full URL (for debugging/logging)
 * Usage: getN8nUrl(N8N_ENDPOINTS.signup)
 */
export function getN8nUrl(endpoint) {
  return `${N8N_BASE_URL}/${endpoint}`;
}

/**
 * crypto.js
 * -------------------------------
 * Utility functions for password hashing and token generation.
 * Uses Web Crypto API (built-in, no dependencies).
 * -------------------------------
 * Exports:
 *   - hashPassword(password): Promise<string>
 *   - verifyPassword(password, hashed): Promise<boolean>
 *   - generateRandomToken(length): string
 */

/**
 * Hash a password using SHA-256 (returns lowercase hex string)
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function hashPassword(password) {
  if (!password || typeof password !== "string") {
    throw new Error("Password must be a non-empty string");
  }

  // Convert string → Uint8Array
  const msgUint8 = new TextEncoder().encode(password);

  // Perform SHA-256 hashing
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);

  // Convert ArrayBuffer → hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hashHex;
}

/**
 * Compare a plain text password with a hashed one
 * @param {string} password
 * @param {string} hashed
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, hashed) {
  const newHash = await hashPassword(password);
  return newHash === hashed;
}

/**
 * Generate a secure random token (for session, CSRF, etc.)
 * @param {number} [length=32]
 * @returns {string}
 */
export function generateRandomToken(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

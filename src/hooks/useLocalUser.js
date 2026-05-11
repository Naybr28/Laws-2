/**
 * useLocalUser.js
 * -----------------------------------------------------
 * Custom React hook for managing logged-in user info.
 * This stores minimal, safe data (email + role).
 * IMPORTANT:
 *  - LocalStorage is updated ONLY when __forceUpdate = true
 *  - Prevents old data from overwriting new role on refresh
 * -----------------------------------------------------
 */

import { useState, useEffect } from "react";

export function useLocalUser() {
  // Load user from localStorage on first render
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : {};
    } catch (err) {
      console.error("Error parsing localStorage user:", err);
      return {};
    }
  });

  /**
   * SAFE AUTO-SYNC:
   * Sync to localStorage ONLY if __forceUpdate = true
   * This prevents login.js from overwriting updated role accidentally.
   */
  useEffect(() => {
    try {
      if (user && user.__forceUpdate) {
        const clone = { ...user };
        delete clone.__forceUpdate; // remove flag before saving
        localStorage.setItem("user", JSON.stringify(clone));
      }
    } catch (err) {
      console.error("Error syncing user to localStorage:", err);
    }
  }, [user]);

  // Remove user completely (logout)
  const clearUser = () => {
    try {
      localStorage.removeItem("user");
      setUser({});
    } catch (err) {
      console.error("Error clearing user:", err);
    }
  };

  // Refresh user from localStorage manually
  const refreshUser = () => {
    try {
      const saved = localStorage.getItem("user");
      setUser(saved ? JSON.parse(saved) : {});
    } catch (err) {
      console.error("Error refreshing user:", err);
    }
  };

  return { user, setUser, clearUser, refreshUser };
}

import { useState, useEffect, useRef } from "react";
import ModalRoleSelect from "/src/components/profile/ModalRoleSelect";

function normalizeUser(stored) {
  if (!stored) {
    return {
      email: "",
      role: "",
      roles: [],
    };
  }

  const rolesArray = Array.isArray(stored.roles)
    ? stored.roles
    : stored.role
      ? stored.role.split(" → ")
      : [];

  return {
    email: stored.email || "",
    role: stored.role || rolesArray.join(" → "),
    roles: rolesArray,
  };
}

export default function ProfileButton({ user: propUser, onHistoryClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showFullRoles, setShowFullRoles] = useState(false);

  const [user, setUser] = useState({
    email: "",
    role: "",
    roles: [],
  });

  const menuRef = useRef(null);

  // Load user from props/localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "null");
    setUser(normalizeUser(propUser || stored));
  }, [propUser]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
        setShowFullRoles(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Role update
  const handleRoleSelect = async (rolesArray) => {
    const rolesString = JSON.stringify(rolesArray);

    const updatedUser = {
      ...user,

      // For UI use
      roles: rolesArray,

      // For database / n8n use
      role: rolesString,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    try {
      await fetch("http://localhost:5678/webhook/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: updatedUser.email,

          // This is string: '["學生","12-14歲","一般生"]'
          role: rolesString,
          roles: rolesString,
        }),
      });

      console.log("Role updated.");
    } catch (err) {
      console.error("Role update error:", err);
    }

    setShowRoleModal(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const displayName = user.email
    ? user.email.split("@")[0]
    : "使用者";

  const firstLetter = displayName
    ? displayName.charAt(0).toUpperCase()
    : "U";

  const roleArray = user.roles || [];
  const visibleRoles = showFullRoles ? roleArray : roleArray.slice(0, 3);
  const extraCount = roleArray.length - 3;

  return (
    <div ref={menuRef} className="relative">
      {/* Top-right avatar button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex items-center justify-center rounded-full transition-all hover:scale-105"
        style={{
          width: 34,
          height: 34,
          background: "#1A2E4A",
          color: "#fff",
          border: "none",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "var(--font-sans)",
        }}
      >
        {firstLetter}

        {/* online dot */}
        <span
          style={{
            position: "absolute",
            right: -1,
            bottom: -1,
            width: 10,
            height: 10,
            background: "#2BB673",
            borderRadius: "50%",
            border: "2px solid white",
          }}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-3 z-50"
          style={{
            width: 274,
            background: "#fff",
            borderRadius: 20,
            border: "0.5px solid rgba(26,46,74,0.12)",
            boxShadow: "0 18px 45px rgba(26,46,74,0.14)",
            padding: 12,
          }}
        >
          {/* User header */}
          <div className="flex items-center gap-3 px-1 py-2">
            {/* Avatar */}
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 48,
                height: 48,
                background: "#1A2E4A",
                color: "#fff",
                fontSize: 18,
                fontWeight: 700,
                fontFamily: "var(--font-sans)",
                flexShrink: 0,
              }}
            >
              {firstLetter}
            </div>

            {/* User info */}
            <div className="min-w-0 flex-1">
              <p
                className="truncate"
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#1A2E4A",
                  marginBottom: 5,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {displayName}
              </p>

              {/* Role tags */}
              {roleArray.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {visibleRoles.map((role, index) => (
                    <span key={`${role}-${index}`} className="role-tag">
                      {role}
                    </span>
                  ))}

                  {!showFullRoles && extraCount > 0 && (
                    <button
                      type="button"
                      className="chip-btn"
                      onClick={() => setShowFullRoles(true)}
                      title={roleArray.join(" → ")}
                    >
                      +{extraCount}
                    </button>
                  )}

                  {showFullRoles && roleArray.length > 2 && (
                    <button
                      type="button"
                      className="chip-btn"
                      onClick={() => setShowFullRoles(false)}
                    >
                      收合
                    </button>
                  )}
                </div>
              ) : (
                <span
                  style={{
                    fontSize: 11,
                    color: "#8A9BB0",
                  }}
                >
                  尚未選擇身分
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              height: 1,
              background: "rgba(26,46,74,0.12)",
              margin: "10px 0",
            }}
          />

          {/* Menu items */}
          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="menu-item"
              onClick={() => {
                setIsOpen(false);

                if (typeof onHistoryClick === "function") {
                  onHistoryClick();
                }
              }}
            >
              對話紀錄
            </button>

            <button
              type="button"
              className="menu-item"
              onClick={() => {
                setShowRoleModal(true);
                setIsOpen(false);
              }}
            >
              修改身分設定
            </button>

          {/* <button type="button" className="menu-item">
              偏好設定
            </button>*/}
          </div>

          <div
            style={{
              height: 1,
              background: "rgba(26,46,74,0.12)",
              margin: "8px 0",
            }}
          />

          <button
            type="button"
            onClick={handleLogout}
            className="menu-item danger"
          >
            登出
          </button>
        </div>
      )}

      <ModalRoleSelect
        show={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSelect={handleRoleSelect}
      />
    </div>
  );
}
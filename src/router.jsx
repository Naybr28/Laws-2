import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import Home from "/src/pages/Home.jsx";
import Login from "/src/pages/Auth/login.jsx";
import Signup from "/src/pages/Auth/signup.jsx";
import HomeUI from "/src/pages/Chat/HomeUI.jsx";
import SignupSuccess from "/src/pages/Auth/Signupsuccess.jsx";


// Components
import ModalRoleSelect from "/src/components/profile/ModalRoleSelect.jsx";

// (optional future use)
import { roleHierarchy } from "/src/data/roles.js";

export default function AppRouter() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup-success" element={<SignupSuccess />} />

      {/* Role Selection Modal — not meant to be standalone route */}
      <Route
        path="/select-role"
        element={<ModalRoleSelect show={true} />}
      />

      {/* Main Chat Interface */}
      <Route path="/homeUI" element={<HomeUI />} />
    </Routes>
  );
}

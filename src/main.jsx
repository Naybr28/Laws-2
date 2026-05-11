import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import AppRouter from "./router.jsx"; //move routes here
import './styles/index.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </StrictMode>
);

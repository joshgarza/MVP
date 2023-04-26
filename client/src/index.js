import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { LastRouteProvider } from "./contexts/LastRouteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LastRouteProvider>
        <App />
      </LastRouteProvider>
    </AuthProvider>
  </React.StrictMode>
);

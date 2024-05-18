import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "oidc-react";
import { oidcConfig } from "./config/oidc";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider {...oidcConfig}>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

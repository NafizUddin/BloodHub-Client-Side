import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import MainRoute from "./Routes/Main Route/MainRoute.jsx";
import AuthProvider from "./Auth Provider/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster />
      <HelmetProvider>
        <RouterProvider router={MainRoute} />
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer autoClose={3000} />
    <RouterProvider router={router} />
  </React.StrictMode>
);

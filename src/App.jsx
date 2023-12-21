import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./utils/routes";
const router = createBrowserRouter(routes);
export default function App() {
  const { theme } = useSelector((state) => state);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme={theme.mode}
      />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

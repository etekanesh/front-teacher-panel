import React from "react";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { router } from "./Router";

export const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { MainLayout } from "layouts";
import { DashboardPage } from "pages/Dashboard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={"404"} />
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </>
  )
);

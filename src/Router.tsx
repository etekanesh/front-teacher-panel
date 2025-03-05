import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import { MainLayout } from "layouts";
import { DashboardPage } from "pages";
import StudentsPage from "pages/Students/Students.pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={"404"} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
      <Route path="/students" element={<MainLayout />}>
        <Route index element={<StudentsPage />} />
      </Route>
    </>
  )
);

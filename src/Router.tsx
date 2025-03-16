import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import { MainLayout } from "layouts";
import { DashboardPage, MessagesPage, StudentsPage, SalesIncomePage, ContractsPage } from "pages";

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
      <Route path="/messages" element={<MainLayout />}>
        <Route index element={<MessagesPage />} />
      </Route>
      <Route path="/financial-reports/sales-income" element={<MainLayout />}>
        <Route index element={<SalesIncomePage />} />
      </Route>
      <Route path="/account/contracts" element={<MainLayout />}>
        <Route index element={<ContractsPage />} />
      </Route>
    </>
  )
);

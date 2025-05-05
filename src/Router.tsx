import {
  createBrowserRouter,
  createRoutesFromElements,
  // Navigate,
  Route,
} from "react-router-dom";

import { MainLayout } from "layouts";
import { DashboardPage, StudentsPage, SalesIncomePage, ContractsPage, BankInfoPage, GeneralInfoPage, LoginPages, StudentIncomePage } from "pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={"404"} />
      {/* <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} /> */}
      {/* <Route path="/teacher" element={<LoginPages />} /> */}
      <Route path="/teacher" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
      <Route path="/teacher/dashboard" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
      <Route path="/teacher/students" element={<MainLayout />}>
        <Route index element={<StudentsPage />} />
      </Route>
      {/* <Route path="/messages" element={<MainLayout />}>
        <Route index element={<MessagesPage />} />
      </Route> */}
      <Route path="/teacher/financial-reports/sales-income" element={<MainLayout />}>
        <Route index element={<SalesIncomePage />} />
      </Route>
      <Route path="/teacher/financial-reports/student-income" element={<MainLayout />}>
        <Route index element={<StudentIncomePage />} />
      </Route>
      <Route path="/teacher/account/contracts" element={<MainLayout />}>
        <Route index element={<ContractsPage />} />
      </Route>
      <Route path="/teacher/account/bank-info" element={<MainLayout />}>
        <Route index element={<BankInfoPage />} />
      </Route>
      <Route path="/teacher/account/general-info" element={<MainLayout />}>
        <Route index element={<GeneralInfoPage />} />
      </Route>
    </>
  )
);

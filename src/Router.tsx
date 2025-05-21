import {
  createBrowserRouter,
  createRoutesFromElements,
  // Navigate,
  Route,
} from "react-router-dom";

import { MainLayout } from "layouts";
import {
  DashboardPage,
  StudentsPage,
  SalesIncomePage,
  ContractsPage,
  BankInfoPage,
  GeneralInfoPage,
  StudentIncomePage,
  MessagesPage,
  SalesIncomeManagementPage,
  AssignmentPage,
  CoursesPage,
  WebinarsManagementPages,
  DirectSaleTeacherPages,
} from "pages";

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
      <Route path="/teacher/students/assignment" element={<MainLayout />}>
        <Route index element={<AssignmentPage />} />
      </Route>
      <Route path="/teacher/courses" element={<MainLayout />}>
        <Route index element={<CoursesPage />} />
      </Route>
      <Route path="/teacher/messages" element={<MainLayout />}>
        <Route index element={<MessagesPage />} />
      </Route>
      <Route
        path="/teacher/marketing/sales-income-management"
        element={<MainLayout />}
      >
        <Route index element={<SalesIncomeManagementPage />} />
      </Route>
      <Route
        path="/teacher/marketing/webinars-management"
        element={<MainLayout />}
      >
        <Route index element={<WebinarsManagementPages />} />
      </Route>
      <Route
        path="/teacher/marketing/direct-sale-teacher"
        element={<MainLayout />}
      >
        <Route index element={<DirectSaleTeacherPages />} />
      </Route>
      <Route
        path="/teacher/financial-reports/sales-income"
        element={<MainLayout />}
      >
        <Route index element={<SalesIncomePage />} />
      </Route>
      <Route
        path="/teacher/financial-reports/student-income"
        element={<MainLayout />}
      >
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

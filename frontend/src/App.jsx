import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import LoginPage from "./pages/LoginPage"

import DashboardPage from "./pages/DashboardPage"

import AttendancePage from "./pages/AttendancePage.jsx"

import AdminDashboardPage from "./pages/AdminDashboardPage"

import EmployeePage from "./pages/EmployeePage"

import BranchPage from "./pages/BranchPage"

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token")

  if (!token) {

    return <Navigate to="/" />

  }

  return children

}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN PAGE */}
        <Route
          path="/"
          element={<LoginPage />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE MANAGEMENT */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeePage />
            </ProtectedRoute>
          }
        />

          <Route
    path="/branches"
    element={
        <ProtectedRoute>
            <BranchPage />
        </ProtectedRoute>
    }
/>

        {/* PUBLIC ATTENDANCE PAGE */}
        <Route
          path="/attendance"
          element={<AttendancePage />}
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App
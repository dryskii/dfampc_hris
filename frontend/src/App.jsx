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
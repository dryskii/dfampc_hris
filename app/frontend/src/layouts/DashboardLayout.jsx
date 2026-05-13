import { Link } from "react-router-dom"

function DashboardLayout({ children }) {

  return (

    <div className="flex min-h-screen">

      {/* SIDEBAR */}

      <div className="w-64 bg-blue-900 text-white p-5">

        <h1 className="text-2xl font-bold mb-10">
          DFAMPC HRIS
        </h1>

        <nav className="flex flex-col gap-4">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/employees">
            Employees
          </Link>

          <Link to="/attendance">
            Attendance
          </Link>

          <Link to="/leave">
            Leave
          </Link>

          <Link to="/payroll">
            Payroll
          </Link>

        </nav>

      </div>

      {/* CONTENT */}

      <div className="flex-1 p-10 bg-gray-100">

        {children}

      </div>

    </div>
  )
}

export default DashboardLayout
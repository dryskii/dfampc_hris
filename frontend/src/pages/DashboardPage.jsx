import React from "react"

import {
  Users,
  CalendarCheck,
  Clock,
  FileText
} from "lucide-react"

function DashboardPage() {

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900 text-white p-5">

        <h1 className="text-2xl font-bold mb-8">
          DFAMPC HRIS
        </h1>

        <ul className="space-y-4">

          <li className="hover:text-blue-400 cursor-pointer">
            Dashboard
          </li>

          <li className="hover:text-blue-400 cursor-pointer">
            Employees
          </li>

          <li className="hover:text-blue-400 cursor-pointer">
            Attendance
          </li>

          <li className="hover:text-blue-400 cursor-pointer">
            Leave
          </li>

          <li className="hover:text-blue-400 cursor-pointer">
            Payroll
          </li>

          <li className="hover:text-blue-400 cursor-pointer">
            Reports
          </li>

          <li className="hover:text-blue-400 cursor-pointer">
            Settings
          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        <h2 className="text-4xl font-bold mb-8">
          Dashboard
        </h2>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">

            <Users size={40} />

            <h3 className="text-xl mt-4">
              Employees
            </h3>

            <p className="text-3xl font-bold">
              25
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <CalendarCheck size={40} />

            <h3 className="text-xl mt-4">
              Present Today
            </h3>

            <p className="text-3xl font-bold">
              20
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <Clock size={40} />

            <h3 className="text-xl mt-4">
              Late Employees
            </h3>

            <p className="text-3xl font-bold">
              3
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <FileText size={40} />

            <h3 className="text-xl mt-4">
              Leave Requests
            </h3>

            <p className="text-3xl font-bold">
              2
            </p>

          </div>

        </div>

      </div>

    </div>

  )
}

export default DashboardPage
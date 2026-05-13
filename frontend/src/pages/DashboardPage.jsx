function DashboardPage() {

  return (

    <div className="flex">

      <div className="w-64 min-h-screen bg-blue-900 text-white p-5">

        <h1 className="text-2xl font-bold mb-10">
          DFAMPC HRIS
        </h1>

        <ul className="space-y-4">

          <li>Dashboard</li>
          <li>Employees</li>
          <li>Attendance</li>
          <li>Leave</li>
          <li>Payroll</li>

        </ul>

      </div>

      <div className="flex-1 p-10 bg-gray-100">

        <h1 className="text-4xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded shadow">
            Employees: 25
          </div>

          <div className="bg-white p-6 rounded shadow">
            Present Today: 20
          </div>

          <div className="bg-white p-6 rounded shadow">
            On Leave: 2
          </div>

        </div>

      </div>

    </div>
  )
}

export default DashboardPage
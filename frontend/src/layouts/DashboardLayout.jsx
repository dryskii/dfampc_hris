function DashboardLayout({ children }) {

  return (

    <div className="min-h-screen bg-gray-100">

      {/* TOP NAVBAR */}

      <div className="bg-blue-900 text-white p-4 text-2xl font-bold">

        DFAMPC HRIS

      </div>

      {/* PAGE CONTENT */}

      <div className="p-6">

        {children}

      </div>

    </div>
  )
}

export default DashboardLayout
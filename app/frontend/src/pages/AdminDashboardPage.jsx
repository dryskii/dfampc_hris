import { useEffect, useState } from "react"
import axios from "axios"

function AdminDashboardPage() {

  const [logs, setLogs] = useState([])
  const [search, setSearch] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [activePage, setActivePage] = useState("dashboard")

  const fetchLogs = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/attendance-logs/"
      )

      setLogs(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    fetchLogs()

    const interval = setInterval(() => {

      fetchLogs()

    }, 5000)

    return () => clearInterval(interval)

  }, [])

  const filteredLogs = logs.filter((log) => {

    const matchesSearch =
      log.employee_id
        ?.toLowerCase()
        .includes(search.toLowerCase())

    const matchesDate =
      dateFilter === ""
        ? true
        : log.date === dateFilter

    return matchesSearch && matchesDate

  })

  const sidebarButton = {

    width: "100%",

    padding: "15px",

    marginBottom: "10px",

    backgroundColor: "#1f2937",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer",

    fontSize: "16px"

  }

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >

      {/* SIDEBAR */}

      <div
        style={{
          width: "250px",
          backgroundColor: "#111827",
          color: "white",
          padding: "20px"
        }}
      >

        <h2>DFAMPC Admin</h2>

        <hr />

        <button
          style={sidebarButton}
          onClick={() => setActivePage("dashboard")}
        >
          Dashboard
        </button>

        <button
          style={sidebarButton}
          onClick={() => setActivePage("logs")}
        >
          Attendance Logs
        </button>

        <button
          style={sidebarButton}
          onClick={() => setActivePage("analytics")}
        >
          Analytics
        </button>

        <button
          style={sidebarButton}
          onClick={() => setActivePage("reports")}
        >
          Reports
        </button>

      </div>

      {/* MAIN */}

      <div
        style={{
          flex: 1,
          padding: "30px",
          backgroundColor: "#f3f4f6"
        }}
      >

        <h1>

          {
            activePage === "dashboard"
              ? "Attendance Dashboard"

            : activePage === "logs"
              ? "Attendance Logs"

            : activePage === "analytics"
              ? "Analytics"

            : "Reports"
          }

        </h1>

        {/* DASHBOARD PAGE */}

        {
          activePage === "dashboard" && (

            <>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginBottom: "30px",
                  marginTop: "30px",
                  flexWrap: "wrap"
                }}
              >

                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "220px"
                  }}
                >

                  <h3>Total Attendance Logs</h3>

                  <h1>{logs.length}</h1>

                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "220px"
                  }}
                >

                  <h3>Present Today</h3>

                  <h1>
                    {
                      logs.filter(
                        (log) => log.status === "present"
                      ).length
                    }
                  </h1>

                </div>

              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "20px",
                  flexWrap: "wrap"
                }}
              >

                <input
                  type="text"
                  placeholder="Search Employee ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "300px",
                    borderRadius: "5px",
                    border: "1px solid #ccc"
                  }}
                />

                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc"
                  }}
                />

                <button
                  onClick={() => setDateFilter("")}
                  style={{
                    padding: "10px 20px",
                    cursor: "pointer"
                  }}
                >
                  Clear Filter
                </button>

              </div>

              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  overflowX: "auto"
                }}
              >

                <table
                  width="100%"
                  border="1"
                  cellPadding="10"
                  style={{
                    borderCollapse: "collapse"
                  }}
                >

                  <thead
                    style={{
                      backgroundColor: "#e5e7eb"
                    }}
                  >

                    <tr>

                      <th>Employee ID</th>

                      <th>Status</th>

                      <th>Time In</th>

                      <th>Time Out</th>

                      <th>Date</th>

                      <th>Latitude</th>

                      <th>Longitude</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredLogs.length > 0 ? (

                        filteredLogs.map((log) => (

                          <tr key={log.id}>

                            <td>{log.employee_id}</td>

                            <td>{log.status}</td>

                            <td>{log.time_in}</td>

                            <td>{log.time_out}</td>

                            <td>{log.date}</td>

                            <td>{log.latitude}</td>

                            <td>{log.longitude}</td>

                          </tr>

                        ))

                      ) : (

                        <tr>

                          <td
                            colSpan="7"
                            style={{
                              textAlign: "center",
                              padding: "20px"
                            }}
                          >

                            No attendance records found

                          </td>

                        </tr>

                      )
                    }

                  </tbody>

                </table>

              </div>

            </>

          )
        }

        {/* LOGS PAGE */}

        {
          activePage === "logs" && (

            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "30px"
              }}
            >

              <h2>Attendance Logs</h2>

              <p>
                Employee attendance records will appear here.
              </p>

            </div>

          )
        }

        {/* ANALYTICS PAGE */}

        {
          activePage === "analytics" && (

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "30px",
                flexWrap: "wrap"
              }}
            >

              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  borderRadius: "10px",
                  width: "250px"
                }}
              >

                <h2>Total Employees</h2>

                <h1>{logs.length}</h1>

              </div>

              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  borderRadius: "10px",
                  width: "250px"
                }}
              >

                <h2>Present</h2>

                <h1>
                  {
                    logs.filter(
                      (log) => log.status === "present"
                    ).length
                  }
                </h1>

              </div>

            </div>

          )
        }

        {/* REPORTS PAGE */}

        {
          activePage === "reports" && (

            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "10px",
                marginTop: "30px"
              }}
            >

              <h2>Reports Center</h2>

              <p>
                Generate payroll-ready reports here.
              </p>

            </div>

          )
        }

      </div>

    </div>

  )

}

export default AdminDashboardPage
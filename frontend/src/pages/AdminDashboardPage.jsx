import { useEffect, useState } from "react"
import axios from "axios"

import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function AdminDashboardPage() {

  const [logs, setLogs] = useState([])
  const [search, setSearch] = useState("")
  const [dateFilter, setDateFilter] = useState("")

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

  const exportCSV = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(filteredLogs)

    const workbook =
      XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "AttendanceLogs"
    )

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "csv",
        type: "array"
      })

    const fileData =
      new Blob([excelBuffer], {
        type: "text/csv;charset=utf-8;"
      })

    saveAs(
      fileData,
      "attendance_logs.csv"
    )

  }

  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(filteredLogs)

    const workbook =
      XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "AttendanceLogs"
    )

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
      })

    const fileData =
      new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      })

    saveAs(
      fileData,
      "attendance_logs.xlsx"
    )

  }

  const exportPDF = () => {

    const doc = new jsPDF()

    doc.text(
      "DFAMPC Attendance Logs",
      14,
      15
    )

    autoTable(doc, {

      startY: 25,

      head: [[
        "Employee ID",
        "Status",
        "Time In",
        "Time Out",
        "Date"
      ]],

      body: filteredLogs.map((log) => [

        log.employee_id,
        log.status,
        log.time_in,
        log.time_out,
        log.date

      ])

    })

    doc.save("attendance_logs.pdf")

  }

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
        backgroundColor: "#f3f4f6",
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

        <hr style={{ margin: "20px 0" }} />

        <button
          style={sidebarButton}
          onClick={() => alert("Dashboard")}
        >
          Dashboard
        </button>

        <button
          style={sidebarButton}
          onClick={() => alert("Attendance Logs")}
        >
          Attendance Logs
        </button>

        <button
          style={sidebarButton}
          onClick={() => alert("Analytics")}
        >
          Analytics
        </button>

        <button
          style={sidebarButton}
          onClick={() => alert("Reports")}
        >
          Reports
        </button>

      </div>

      {/* MAIN */}

      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >

        <h1
          style={{
            marginBottom: "30px"
          }}
        >
          Attendance Dashboard
        </h1>

        {/* ANALYTICS CARDS */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap"
          }}
        >

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "220px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >

            <h3>Total Logs</h3>

            <h1>{logs.length}</h1>

          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "220px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
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

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search Employee ID"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "12px",
            width: "320px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "20px"
          }}
        />

        {/* FILTER + EXPORT */}

        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap"
          }}
        >

          <input
            type="date"
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(e.target.value)
            }
            style={{
              padding: "10px"
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

          <button
            onClick={exportCSV}
            style={{
              padding: "10px 20px",
              cursor: "pointer"
            }}
          >
            Export CSV
          </button>

          <button
            onClick={exportExcel}
            style={{
              padding: "10px 20px",
              cursor: "pointer"
            }}
          >
            Export Excel
          </button>

          <button
            onClick={exportPDF}
            style={{
              padding: "10px 20px",
              cursor: "pointer"
            }}
          >
            Download PDF
          </button>

        </div>

        {/* TABLE */}

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
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

      </div>

    </div>

  )

}

export default AdminDashboardPage
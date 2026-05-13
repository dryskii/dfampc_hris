import { Link } from "react-router-dom"

function Sidebar() {

  return (

    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#111827",
        color: "white",
        padding: "20px",
        boxSizing: "border-box"
      }}
    >

      <h2>DFAMPC HRIS</h2>

      <hr />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px"
        }}
      >

        <Link
          to="/admin/dashboard"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/admin/attendance"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Attendance Logs
        </Link>

      </div>

    </div>

  )

}

export default Sidebar
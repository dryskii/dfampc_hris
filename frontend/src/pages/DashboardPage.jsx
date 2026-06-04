import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Clock3,
  FileText,
  Settings,
  Wallet,
  LogOut
} from "lucide-react"

import { useNavigate } from "react-router-dom"

function DashboardPage() {

  const navigate = useNavigate()

  const cards = [

    {
      title: "Employees",
      value: "25",
      icon: <Users size={32} />,
      color: "#2563eb"
    },

    {
      title: "Present Today",
      value: "20",
      icon: <CalendarCheck size={32} />,
      color: "#16a34a"
    },

    {
      title: "Late Employees",
      value: "3",
      icon: <Clock3 size={32} />,
      color: "#dc2626"
    },

    {
      title: "Leave Requests",
      value: "2",
      icon: <FileText size={32} />,
      color: "#ca8a04"
    }

  ]

  function logout() {

    localStorage.removeItem("token")

    localStorage.removeItem("refresh_token")

    navigate("/")

  }

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      {/* SIDEBAR */}

      <div
        style={{
          width: "260px",
          background: "#111827",
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid #1e293b"
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "28px",
              marginBottom: "40px",
              fontWeight: "bold"
            }}
          >
            DFAMPC HRIS
          </h1>

          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            onClick={() => navigate("/dashboard")}
          />

          <SidebarItem
            icon={<Users size={20} />}
            text="Employees"
            onClick={() => navigate("/employees")}
          />

          {/* NEW BRANCH MENU */}

          <SidebarItem
            icon={<Settings size={20} />}
            text="Branches"
            onClick={() => navigate("/branches")}
          />

          <SidebarItem
            icon={<CalendarCheck size={20} />}
            text="Attendance"
            onClick={() => navigate("/attendance")}
          />

          <SidebarItem
            icon={<FileText size={20} />}
            text="Leave"
          />

          <SidebarItem
            icon={<Wallet size={20} />}
            text="Payroll"
          />

          <SidebarItem
            icon={<Settings size={20} />}
            text="Settings"
          />

        </div>

        <div>

          <SidebarItem
            icon={<LogOut size={20} />}
            text="Logout"
            onClick={logout}
          />

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >

        {/* TOP BAR */}

        <div
          style={{
            marginBottom: "30px"
          }}
        >

          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold"
            }}
          >
            Dashboard
          </h1>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "5px"
            }}
          >
            Welcome to DFAMPC Human Resource Information System
          </p>

        </div>

        {/* DASHBOARD CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}
        >

          {
            cards.map((card, index) => (

              <div
                key={index}
                style={{
                  background: "#1e293b",
                  padding: "25px",
                  borderRadius: "16px",
                  boxShadow:
                    "0 4px 10px rgba(0,0,0,0.3)"
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >

                  <div>

                    <h3
                      style={{
                        color: "#cbd5e1",
                        marginBottom: "10px"
                      }}
                    >
                      {card.title}
                    </h3>

                    <h1
                      style={{
                        fontSize: "42px",
                        fontWeight: "bold"
                      }}
                    >
                      {card.value}
                    </h1>

                  </div>

                  <div
                    style={{
                      color: card.color
                    }}
                  >
                    {card.icon}
                  </div>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  )

}

function SidebarItem({

  icon,
  text,
  onClick

}) {

  return (

    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px",
        borderRadius: "10px",
        cursor: "pointer",
        marginBottom: "10px",
        transition: "0.2s",
        background: "#1e293b"
      }}
    >

      {icon}

      <span>{text}</span>

    </div>

  )

}

export default DashboardPage
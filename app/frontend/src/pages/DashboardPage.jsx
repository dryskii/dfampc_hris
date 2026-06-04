import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Clock3,
  FileText,
  Settings,
  Wallet
} from "lucide-react"

function DashboardPage() {

  const cards = [
    {
      title: "Employees",
      value: "25",
      icon: <Users size={40} />,
      color: "#2563eb"
    },
    {
      title: "Present Today",
      value: "20",
      icon: <CalendarCheck size={40} />,
      color: "#16a34a"
    },
    {
      title: "Late Employees",
      value: "3",
      icon: <Clock3 size={40} />,
      color: "#dc2626"
    },
    {
      title: "Leave Requests",
      value: "2",
      icon: <FileText size={40} />,
      color: "#ca8a04"
    }
  ]

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white"
      }}
    >

      {/* SIDEBAR */}

      <div
        style={{
          width: "260px",
          background: "#111827",
          padding: "30px 20px",
          borderRight: "1px solid #1e293b"
        }}
      >

        <h2
          style={{
            marginBottom: "40px",
            fontSize: "28px"
          }}
        >
          DFAMPC HRIS
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px"
          }}
        >

          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
          />

          <SidebarItem
            icon={<Users size={20} />}
            text="Employees"
          />

          <SidebarItem
            icon={<CalendarCheck size={20} />}
            text="Attendance"
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

      </div>

      {/* MAIN CONTENT */}

      <div
        style={{
          flex: 1,
          padding: "40px"
        }}
      >

        <h1
          style={{
            fontSize: "38px",
            marginBottom: "30px"
          }}
        >
          Dashboard
        </h1>

        {/* CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "25px"
          }}
        >

          {
            cards.map((card, index) => (

              <div
                key={index}
                style={{
                  background: "#1e293b",
                  padding: "25px",
                  borderRadius: "14px",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.3)"
                }}
              >

                <div
                  style={{
                    marginBottom: "20px",
                    color: card.color
                  }}
                >
                  {card.icon}
                </div>

                <h2
                  style={{
                    fontSize: "18px",
                    marginBottom: "10px"
                  }}
                >
                  {card.title}
                </h2>

                <h1
                  style={{
                    fontSize: "36px"
                  }}
                >
                  {card.value}
                </h1>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  )

}

function SidebarItem({ icon, text }) {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px",
        borderRadius: "10px",
        cursor: "pointer",
        background: "#1e293b"
      }}
    >

      {icon}

      <span>{text}</span>

    </div>

  )

}

export default DashboardPage
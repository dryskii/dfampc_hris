import Sidebar from "../components/Sidebar"

function AdminLayout({ children }) {

  return (

    <div
      style={{
        display: "flex"
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >

        {children}

      </div>

    </div>

  )

}

export default AdminLayout
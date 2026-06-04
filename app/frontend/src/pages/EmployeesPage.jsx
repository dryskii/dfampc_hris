import { useEffect, useState } from "react"
import api from "../services/api"

function EmployeesPage() {

  const [employees, setEmployees] = useState([])

  const [formData, setFormData] = useState({

    employee_id: "",
    firstname: "",
    lastname: "",
    department: "",
    position: "",
    employment_status: "",
    email: "",
    mobile: "",
    role: "",
    salary: ""

  })

  const fetchEmployees = async () => {

    try {

      const response = await api.get(
        "/api/employees/"
      )

      setEmployees(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    fetchEmployees()

  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await api.post(
        "/api/employees/",
        formData
      )

      alert("Employee added")

      fetchEmployees()

    } catch (error) {

      console.log(error)

      alert("Failed to add employee")

    }

  }

  return (

    <div
      style={{
        padding: "40px",
        color: "white"
      }}
    >

      <h1>Employee Management</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "15px",
          marginTop: "30px",
          maxWidth: "500px"
        }}
      >

        <input
          placeholder="Employee ID"
          onChange={(e) =>
            setFormData({
              ...formData,
              employee_id: e.target.value
            })
          }
        />

        <input
          placeholder="First Name"
          onChange={(e) =>
            setFormData({
              ...formData,
              firstname: e.target.value
            })
          }
        />

        <input
          placeholder="Last Name"
          onChange={(e) =>
            setFormData({
              ...formData,
              lastname: e.target.value
            })
          }
        />

        <input
          placeholder="Department"
          onChange={(e) =>
            setFormData({
              ...formData,
              department: e.target.value
            })
          }
        />

        <input
          placeholder="Position"
          onChange={(e) =>
            setFormData({
              ...formData,
              position: e.target.value
            })
          }
        />

        <button type="submit">

          Add Employee

        </button>

      </form>

      <div
        style={{
          marginTop: "50px"
        }}
      >

        <h2>Employees List</h2>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            marginTop: "20px"
          }}
        >

          <thead>

            <tr>

              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>

            </tr>

          </thead>

          <tbody>

            {
              employees.map((emp) => (

                <tr key={emp.id}>

                  <td>{emp.employee_id}</td>

                  <td>
                    {emp.firstname}
                    {" "}
                    {emp.lastname}
                  </td>

                  <td>{emp.department}</td>

                  <td>{emp.position}</td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default EmployeesPage
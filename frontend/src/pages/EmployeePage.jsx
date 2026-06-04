import { useEffect, useState } from "react"
import axios from "axios"

function EmployeePage() {

    const [employees, setEmployees] = useState([])
    const [branches, setBranches] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
const [filterBranch, setFilterBranch] = useState("")
    const [editId, setEditId] = useState(null)

    const [formData, setFormData] = useState({
        employee_id: "",
        firstname: "",
        middlename: "",
        lastname: "",
        department: "",
        position: "",
        employment_status: "",
        email: "",
        mobile: "",
        role: "",
        salary: "",
        branch_id: ""
    })

    async function fetchBranches() {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/branches/"
            )

            setBranches(response.data)

        } catch (error) {

            console.log(error)

        }

    }

    async function fetchEmployees() {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/employees/"
            )

            setEmployees(response.data)

        } catch (error) {

            console.log(error)

        }

    }

const filteredEmployees = employees.filter((employee) => {

    const fullName =
        `${employee.firstname} ${employee.lastname}`.toLowerCase()

    const matchesSearch =

        employee.employee_id
            ?.toLowerCase()
            .includes(search.toLowerCase())

        ||

        fullName.includes(search.toLowerCase())

        ||

        employee.department
            ?.toLowerCase()
            .includes(search.toLowerCase())

    const matchesBranch =

        filterBranch === ""

        ||

        employee.branch_id == filterBranch

    return matchesSearch && matchesBranch

})

    useEffect(() => {

        fetchEmployees()
        fetchBranches()

    }, [])

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    async function handleSubmit(e) {

        e.preventDefault()

        try {

            setLoading(true)

            if (editId) {

                await axios.put(
                    `http://127.0.0.1:8000/api/employees/${editId}`,
                    formData
                )

                alert("Employee updated successfully")

            } else {

                await axios.post(
                    "http://127.0.0.1:8000/api/employees/",
                    formData
                )

                alert("Employee added successfully")

            }

            setFormData({
                employee_id: "",
                firstname: "",
                middlename: "",
                lastname: "",
                department: "",
                position: "",
                employment_status: "",
                email: "",
                mobile: "",
                role: "",
                salary: "",
                branch_id: ""
            })

            setEditId(null)

            fetchEmployees()

        } catch (error) {

            console.log(error)

            alert("Operation failed")

        } finally {

            setLoading(false)

        }

    }

    function handleEdit(employee) {

        setEditId(employee.id)

        setFormData({
            employee_id: employee.employee_id || "",
            firstname: employee.firstname || "",
            middlename: employee.middlename || "",
            lastname: employee.lastname || "",
            department: employee.department || "",
            position: employee.position || "",
            employment_status: employee.employment_status || "",
            email: employee.email || "",
            mobile: employee.mobile || "",
            role: employee.role || "",
            salary: employee.salary || "",
            branch_id: employee.branch_id || ""
        })

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Delete this employee?"
        )

        if (!confirmDelete) return

        try {

            await axios.delete(
                `http://127.0.0.1:8000/api/employees/${id}`
            )

            alert("Employee deleted successfully")

            fetchEmployees()

        } catch (error) {

            console.log(error)

            alert("Delete failed")

        }

    }

    return (

        <div
            style={{
                padding: "30px",
                background: "#0f172a",
                minHeight: "100vh",
                color: "white"
            }}
        >

            <h1
                style={{
                    fontSize: "32px",
                    marginBottom: "30px"
                }}
            >
                Employee Management
            </h1>

            <div
    style={{
        display: "flex",
        gap: "15px",
        marginBottom: "20px",
        flexWrap: "wrap"
    }}
>

    <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            minWidth: "250px"
        }}
    />

    <select
        value={filterBranch}
        onChange={(e) => setFilterBranch(e.target.value)}
        style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            minWidth: "220px"
        }}
    >

        <option value="">
            All Branches
        </option>

        {
            branches.map((branch) => (

                <option
                    key={branch.id}
                    value={branch.id}
                >
                    {branch.branch_name}
                </option>

            ))
        }

    </select>

</div>
            
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#1e293b",
                    padding: "25px",
                    borderRadius: "12px",
                    marginBottom: "30px"
                }}
            >

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "15px"
                    }}
                >

                    <InputField
                        name="employee_id"
                        placeholder="Employee ID"
                        value={formData.employee_id}
                        onChange={handleChange}
                    />

                    <InputField
                        name="firstname"
                        placeholder="First Name"
                        value={formData.firstname}
                        onChange={handleChange}
                    />

                    <InputField
                        name="lastname"
                        placeholder="Last Name"
                        value={formData.lastname}
                        onChange={handleChange}
                    />

                    <InputField
                        name="department"
                        placeholder="Department"
                        value={formData.department}
                        onChange={handleChange}
                    />

                    <InputField
                        name="position"
                        placeholder="Position"
                        value={formData.position}
                        onChange={handleChange}
                    />

                    <InputField
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <select
                        name="branch_id"
                        value={formData.branch_id}
                        onChange={handleChange}
                        style={{
                            padding: "12px",
                            borderRadius: "8px",
                            border: "none"
                        }}
                    >

                        <option value="">
                            Select Branch
                        </option>

                        {
                            branches.map((branch) => (

                                <option
                                    key={branch.id}
                                    value={branch.id}
                                >
                                    {branch.branch_name}
                                </option>

                            ))
                        }

                    </select>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: "20px",
                        padding: "12px 20px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >

                    {
                        loading
                            ? "Saving..."
                            : editId
                                ? "Update Employee"
                                : "Add Employee"
                    }

                </button>

            </form>

            <div
                style={{
                    background: "#1e293b",
                    padding: "20px",
                    borderRadius: "12px"
                }}
            >

                <table
                    style={{
                        width: "100%"
                    }}
                >

                    <thead>

                        <tr>

                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Branch</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            filteredEmployees.map((employee) => (

                                <tr key={employee.id}>

                                    <td>{employee.employee_id}</td>

                                    <td>
                                        {employee.firstname} {employee.lastname}
                                    </td>

                                    <td>{employee.department}</td>

                                    <td>

                                        {
                                            branches.find(
                                                (branch) =>
                                                    branch.id == employee.branch_id
                                            )?.branch_name || "N/A"
                                        }

                                    </td>

                                    <td>

                                        <button
                                            onClick={() => handleEdit(employee)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(employee.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    )

}

function InputField({
    name,
    placeholder,
    value,
    onChange
}) {

    return (

        <input
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
                padding: "12px",
                borderRadius: "8px",
                border: "none"
            }}
        />

    )

}

export default EmployeePage
import { useEffect, useState } from "react"

import axios from "axios"

function BranchPage() {

    const [branches, setBranches] = useState([])

    const [search, setSearch] = useState("")

    const [editId, setEditId] = useState(null)

    const [formData, setFormData] = useState({

        name: "",

        address: "",

        latitude: "",

        longitude: "",

        allowed_radius: 100

    })

    async function fetchBranches() {

        try {

            const token = localStorage.getItem("token")

            const response = await axios.get(

                "http://127.0.0.1:8000/api/branches/",

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            )

            setBranches(response.data)

        } catch (error) {

            console.log(error)

        }

    }

    useEffect(() => {

        fetchBranches()

    }, [])

    async function handleSubmit(e) {

        e.preventDefault()

        try {

            const token = localStorage.getItem("token")

            if (editId) {

                await axios.put(

                    `http://127.0.0.1:8000/api/branches/${editId}`,

                    formData,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                )

                alert("Branch updated")

            } else {

                await axios.post(

                    "http://127.0.0.1:8000/api/branches/",

                    formData,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                )

                alert("Branch created")

            }

            setFormData({

                name: "",

                address: "",

                latitude: "",

                longitude: "",

                allowed_radius: 100

            })

            setEditId(null)

            fetchBranches()

        } catch (error) {

            console.log(error)

            alert("Operation failed")

        }

    }

    function handleEdit(branch) {

        setEditId(branch.id)

        setFormData({

            name: branch.name,

            address: branch.address,

            latitude: branch.latitude,

            longitude: branch.longitude,

            allowed_radius: branch.allowed_radius

        })

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Delete branch?"
        )

        if (!confirmDelete) return

        try {

            const token = localStorage.getItem("token")

            await axios.delete(

                `http://127.0.0.1:8000/api/branches/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            )

            alert("Branch deleted")

            fetchBranches()

        } catch (error) {

            console.log(error)

            alert("Delete failed")

        }

    }

    const filteredBranches = branches.filter((branch) =>

        branch.name
            .toLowerCase()
            .includes(search.toLowerCase())

    )

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
                    marginBottom: "25px"
                }}
            >
                Branch Management
            </h1>

            {/* SEARCH */}

            <input
                type="text"
                placeholder="Search branch..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    marginBottom: "20px",
                    width: "300px"
                }}
            />

            {/* FORM */}

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
                        name="name"
                        placeholder="Branch Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }
                    />

                    <InputField
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                address: e.target.value
                            })
                        }
                    />

                    <InputField
                        name="latitude"
                        placeholder="Latitude"
                        value={formData.latitude}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                latitude: e.target.value
                            })
                        }
                    />

                    <InputField
                        name="longitude"
                        placeholder="Longitude"
                        value={formData.longitude}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                longitude: e.target.value
                            })
                        }
                    />

                    <InputField
                        name="allowed_radius"
                        placeholder="Allowed Radius"
                        value={formData.allowed_radius}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                allowed_radius: e.target.value
                            })
                        }
                    />

                </div>

                <button
                    type="submit"
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
                        editId
                            ? "Update Branch"
                            : "Add Branch"
                    }

                </button>

            </form>

            {/* TABLE */}

            <div
                style={{
                    background: "#1e293b",
                    padding: "20px",
                    borderRadius: "12px",
                    overflowX: "auto"
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >

                    <thead>

                        <tr>

                            <th style={tableHeader}>Name</th>

                            <th style={tableHeader}>Address</th>

                            <th style={tableHeader}>Latitude</th>

                            <th style={tableHeader}>Longitude</th>

                            <th style={tableHeader}>Radius</th>

                            <th style={tableHeader}>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            filteredBranches.map((branch) => (

                                <tr key={branch.id}>

                                    <td style={tableCell}>
                                        {branch.name}
                                    </td>

                                    <td style={tableCell}>
                                        {branch.address}
                                    </td>

                                    <td style={tableCell}>
                                        {branch.latitude}
                                    </td>

                                    <td style={tableCell}>
                                        {branch.longitude}
                                    </td>

                                    <td style={tableCell}>
                                        {branch.allowed_radius}m
                                    </td>

                                    <td style={tableCell}>

                                        <button
                                            onClick={() =>
                                                handleEdit(branch)
                                            }
                                            style={editButton}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(branch.id)
                                            }
                                            style={deleteButton}
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

function InputField(props) {

    return (

        <input
            {...props}
            style={{
                padding: "12px",
                borderRadius: "8px",
                border: "none"
            }}
        />

    )

}

const tableHeader = {

    padding: "12px",

    textAlign: "left"

}

const tableCell = {

    padding: "12px",

    borderBottom: "1px solid #334155"

}

const editButton = {

    background: "#2563eb",

    color: "white",

    border: "none",

    padding: "8px 12px",

    borderRadius: "6px",

    marginRight: "10px",

    cursor: "pointer"

}

const deleteButton = {

    background: "#dc2626",

    color: "white",

    border: "none",

    padding: "8px 12px",

    borderRadius: "6px",

    cursor: "pointer"

}

export default BranchPage
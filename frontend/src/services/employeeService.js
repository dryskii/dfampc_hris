import api from "./api"

// GET ALL EMPLOYEES
export const getEmployees = async () => {

    const response = await api.get("/api/employees")

    return response.data
}

// CREATE EMPLOYEE
export const createEmployee = async (employeeData) => {

    const response = await api.post(
        "/api/employees",
        employeeData
    )

    return response.data
}

// UPDATE EMPLOYEE
export const updateEmployee = async (
    id,
    employeeData
) => {

    const response = await api.put(
        `/api/employees/${id}`,
        employeeData
    )

    return response.data
}

// DELETE EMPLOYEE
export const deleteEmployee = async (id) => {

    const response = await api.delete(
        `/api/employees/${id}`
    )

    return response.data
}
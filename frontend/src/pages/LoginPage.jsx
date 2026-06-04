import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { loginUser } from "../services/auth"

function LoginPage() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")

    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    async function handleLogin(e) {

        e.preventDefault()

        try {

            setLoading(true)

            const result = await loginUser(

                username,
                password
            )

            localStorage.setItem(
                "token",
                result.access_token
            )

            localStorage.setItem(
                "refresh_token",
                result.refresh_token
            )

            alert("Login successful")

            navigate("/dashboard")

        } catch (error) {

            console.log(error)

            alert("Invalid credentials")

        } finally {

            setLoading(false)

        }
    }

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#0f172a"
            }}
        >

            <form
                onSubmit={handleLogin}
                style={{
                    background: "#1e293b",
                    padding: "40px",
                    borderRadius: "12px",
                    width: "350px",
                    color: "white"
                }}
            >

                <h1
                    style={{
                        marginBottom: "30px",
                        textAlign: "center"
                    }}
                >
                    DFAMPC HRIS
                </h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "none"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: "none"
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >

                    {
                        loading
                            ? "Logging in..."
                            : "Login"
                    }

                </button>

            </form>

        </div>
    )
}

export default LoginPage
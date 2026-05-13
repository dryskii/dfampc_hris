import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginPage() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = (e) => {

    e.preventDefault()

    /*
      TEMPORARY LOGIN
    */

    if (
      username === "admin" &&
      password === "admin"
    ) {

      localStorage.setItem(
        "token",
        "sample_token"
      )

      navigate("/dashboard")

    } else {

      setMessage("Invalid credentials")
    }
  }

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#e2e8f0"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "40px",
          width: "350px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          DFAMPC HRIS
        </h1>

        <form onSubmit={handleLogin}>

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
              marginBottom: "15px"
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
              marginBottom: "20px"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Login
          </button>

        </form>

        <p
          style={{
            color: "red",
            marginTop: "15px",
            textAlign: "center"
          }}
        >
          {message}
        </p>

      </div>

    </div>
  )
}

export default LoginPage
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginPage() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = (e) => {

    e.preventDefault()

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

    <div className="min-h-screen flex items-center justify-center bg-gray-200">

      <div className="bg-white p-8 rounded shadow w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          DFAMPC HRIS
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 mb-4 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-2 rounded"
          >
            Login
          </button>

        </form>

        <p className="mt-4 text-center text-red-500">
          {message}
        </p>

      </div>

    </div>
  )
}

export default LoginPage
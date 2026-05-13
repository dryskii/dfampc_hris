import { useRef, useState } from "react"
import Webcam from "react-webcam"
import axios from "axios"

function AttendancePage() {

  const webcamRef = useRef(null)

  const [employeeId, setEmployeeId] = useState("")
  const [message, setMessage] = useState("")
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [attendanceResult, setAttendanceResult] = useState(null)
  const [attendanceType, setAttendanceType] = useState("")

  // GET GPS LOCATION
  const getLocation = () => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)

      },

      (error) => {

        console.log(error)

        alert(error.message)

      }

    )

  }

  // SUBMIT ATTENDANCE
  const captureAttendance = async () => {

    if (!employeeId) {

      alert("Enter employee ID")
      return

    }

    if (!latitude || !longitude) {

      alert("Get GPS location first")
      return

    }

    const imageSrc = webcamRef.current.getScreenshot()

    const blob = await fetch(imageSrc)
      .then((res) => res.blob())

    const formData = new FormData()

    formData.append("file", blob, "attendance.jpg")
    formData.append("employee_id", employeeId)
    formData.append("latitude", latitude)
    formData.append("longitude", longitude)

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/attendance/log",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      console.log(response.data)

      setMessage(response.data.message)

      setAttendanceResult(response.data)

      if (
  response.data.message.includes("TIME IN")
) {

  setAttendanceType("TIME IN")

} else if (
  response.data.message.includes("TIME OUT")
) {

  setAttendanceType("TIME OUT")

} else {

  setAttendanceType("COMPLETED")

}

    } catch (error) {

      console.log(error)

      if (error.response) {

        console.log(error.response.data)

        setMessage(
          JSON.stringify(error.response.data)
        )

      } else {

        setMessage(error.message)

      }

    }

  }

  return (

    <div
      style={{
        padding: "30px",
        fontFamily: "Arial"
      }}
    >

      <h1>DFAMPC Attendance</h1>

      <input
        type="text"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) =>
          setEmployeeId(e.target.value)
        }
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px"
        }}
      />

      <br />

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
      />

      <br />
      <br />

      <button
        onClick={getLocation}
        style={{
          padding: "10px 20px",
          marginRight: "10px"
        }}
      >
        Get GPS Location
      </button>

      <button
        onClick={captureAttendance}
        style={{
          padding: "10px 20px"
        }}
      >
        Submit Attendance
      </button>

      <br />
      <br />

      <p>
        Latitude: {latitude}
      </p>

      <p>
        Longitude: {longitude}
      </p>

      <h2>{message}</h2>

      {
        attendanceResult && (

          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              backgroundColor:

  attendanceType === "TIME IN"

    ? "#d4edda"

    : attendanceType === "TIME OUT"

    ? "#f8d7da"

    : "#fff3cd"
            }}
          >

            <h2>

  {
    attendanceType === "TIME IN"
      ? "🟢 TIME IN SUCCESS"

      : attendanceType === "TIME OUT"
      ? "🔴 TIME OUT SUCCESS"

      : "⚠ Attendance Completed"
  }

</h2>

            <p>
              <strong>Status:</strong>{" "}
              {attendanceResult.status}
            </p>

            <p>
              <strong>Message:</strong>{" "}
              {attendanceResult.message}
            </p>

            <p>
              <strong>Employee:</strong>{" "}
              {attendanceResult.employee_id}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {attendanceResult.timestamp}
            </p>

          </div>

        )
      }

    </div>

  )

}

export default AttendancePage
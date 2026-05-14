import { useRef, useState } from "react"
import Webcam from "react-webcam"
import api from "../services/api"

function AttendancePage() {

  const webcamRef = useRef(null)

  const [employeeId, setEmployeeId] = useState("")
  const [message, setMessage] = useState("")
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [attendanceResult, setAttendanceResult] = useState(null)
  const [attendanceType, setAttendanceType] = useState("")
  const [loading, setLoading] = useState(false)

  // GET GPS LOCATION

  const getLocation = () => {

    if (!navigator.geolocation) {

      alert("Geolocation is not supported")

      return

    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)

        alert("GPS location captured successfully")

      },

      (error) => {

        console.log(error)

        alert(
          "Unable to retrieve GPS location"
        )

      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }

    )

  }

  // SUBMIT ATTENDANCE

  const captureAttendance = async () => {

    try {

      setLoading(true)

      setMessage("")

      if (!employeeId) {

        alert("Please enter employee ID")

        setLoading(false)

        return

      }

      if (!latitude || !longitude) {

        alert("Please get GPS location first")

        setLoading(false)

        return

      }

      if (!webcamRef.current) {

        alert("Camera not ready")

        setLoading(false)

        return

      }

      const imageSrc =
        webcamRef.current.getScreenshot()

      if (!imageSrc) {

        alert("Failed to capture image")

        setLoading(false)

        return

      }

      const blob = await fetch(imageSrc)
        .then((res) => res.blob())

      const formData = new FormData()

      formData.append(
        "file",
        blob,
        "attendance.jpg"
      )

      formData.append(
        "employee_id",
        employeeId
      )

      formData.append(
        "latitude",
        latitude
      )

      formData.append(
        "longitude",
        longitude
      )

      const response = await api.post(

        "http://127.0.0.1:8000/api/attendance/log",

        formData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }

      )

      console.log(response.data)

      const result = response.data

      setAttendanceResult(result)

      setMessage(
        result.message ||
        "Attendance submitted successfully"
      )

      // DETECT TYPE

      if (
        result.message &&
        result.message.includes("TIME IN")
      ) {

        setAttendanceType("TIME IN")

      } else if (
        result.message &&
        result.message.includes("TIME OUT")
      ) {

        setAttendanceType("TIME OUT")

      } else {

        setAttendanceType("DONE")

      }

      alert(
        result.message ||
        "Attendance submitted successfully"
      )

    } catch (error) {

      console.log(error)

      if (error.response) {

        console.log(error.response.data)

        const errorMessage =

          error.response.data.detail ||
          error.response.data.message ||
          "Attendance request failed"

        setMessage(errorMessage)

        alert(errorMessage)

      } else {

        setMessage(
          "Cannot connect to backend server"
        )

        alert(
          "Cannot connect to backend server"
        )

      }

    } finally {

      setLoading(false)

    }

  }

  return (

    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        textAlign: "center"
      }}
    >

      <h1>
        DFAMPC Attendance System
      </h1>

      <input
        type="text"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) =>
          setEmployeeId(e.target.value)
        }
        style={{
          padding: "12px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      <br />

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={480}
        height={360}
        videoConstraints={{
          facingMode: "user"
        }}
        style={{
          borderRadius: "10px",
          border: "2px solid #ccc"
        }}
      />

      <br />
      <br />

      <button
        onClick={getLocation}
        style={{
          padding: "12px 20px",
          marginRight: "10px",
          cursor: "pointer"
        }}
      >
        Get GPS Location
      </button>

      <button
        onClick={captureAttendance}
        disabled={loading}
        style={{
          padding: "12px 20px",
          cursor: "pointer"
        }}
      >

        {
          loading
            ? "Submitting..."
            : "Submit Attendance"
        }

      </button>

      <br />
      <br />

      <h3>
        Latitude: {latitude || "N/A"}
      </h3>

      <h3>
        Longitude: {longitude || "N/A"}
      </h3>

      {
        message && (

          <div
            style={{
              marginTop: "20px"
            }}
          >

            <h2>{message}</h2>

          </div>

        )
      }

      {
        attendanceResult && (

          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              marginLeft: "auto",
              marginRight: "auto",
              color: "black",

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

                  : "⚠ ATTENDANCE COMPLETED"
              }

            </h2>

            <p>
              <strong>Employee:</strong>{" "}
              {attendanceResult.employee_id}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {attendanceResult.status}
            </p>

            <p>
              <strong>Message:</strong>{" "}
              {attendanceResult.message}
            </p>

            <p>
              <strong>Timestamp:</strong>{" "}
              {attendanceResult.timestamp}
            </p>

          </div>

        )
      }

    </div>

  )

}

export default AttendancePage
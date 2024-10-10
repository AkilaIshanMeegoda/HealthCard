import React, { useState, useEffect } from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateLabAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // State to hold each input field separately
  const [userName, setUserName] = useState("");
  const [contact, setContactNumber] = useState("");
  const [notes, setImportantNotes] = useState("");
  const [date, setAppointmentDate] = useState("");
  const [time, setAppointmentTime] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [testType, setTestType] = useState("");
  const [paymentAmount, setPayment] = useState("");
  const [email, setEmail] = useState(""); // Initialize as empty
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/labappointment/hospital-appointment/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }
          return res.text(); // Use text() to see the raw response
        })
        .then((data) => {
          const appointmentData = JSON.parse(data); // Parse to JSON manually

          // Set appointment details
          setUserName(appointmentData.userName || "");
          setContactNumber(appointmentData.contact || "");
          setImportantNotes(appointmentData.note || "");
          setAppointmentDate(appointmentData.date || "");
          setAppointmentTime(appointmentData.time || "");
          setHospitalName(appointmentData.hospitalName || "");
          setTestType(appointmentData.testType || "");
          setPayment(appointmentData.paymentAmount || "");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          toast.error("Failed to fetch details");
        });
    }
  }, [user, id]);

  useEffect(() => {
    if (user) {
      setEmail(user.email); // Set email when user is available
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields before proceeding
    if (
      !userName ||
      !contact ||
      !notes ||
      !date ||
      !time ||
      !hospitalName ||
      !testType ||
      !paymentAmount ||
      !email
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsFormDisabled(true); // Disable the form on submit

    try {
      const formData = {
        userName,
        contact,
        notes,
        date,
        time,
        hospitalName,
        testType,
        paymentAmount,
        email,
      };

      await axios.patch(
        `http://localhost:3000/labappointment/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Appointment updated successfully!");
      navigate("/patient/patient-lab-appointments"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment.");
    } finally {
      setIsFormDisabled(false); // Re-enable the form after submission
    }
  };

  return (
    <div>
      <Navbar />
      <div className="PatientAddAppointment w-full min-h-screen bg-gray-50 flex items-center justify-center py-5 px-2">
        <div className="w-full max-w-6xl bg-white p-5 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-black mb-5">
            Update Appointment
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User Name */}
              <div>
                <label htmlFor="userName" className="block mb-1 text-sm font-medium text-gray-900">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  readOnly
                  value={email}
                  required
                />
              </div>

              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" className="block mb-1 text-sm font-medium text-gray-900">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={contact}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>

              {/* Appointment Date */}
              <div>
                <label htmlFor="appointmentDate" className="block mb-1 text-sm font-medium text-gray-900">
                  Appointment Date
                </label>
                <input
                  type="date"
                  id="appointmentDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={date}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
              </div>

              {/* Appointment Time */}
              <div>
                <label htmlFor="appointmentTime" className="block mb-1 text-sm font-medium text-gray-900">
                  Appointment Time
                </label>
                <input
                  type="time"
                  id="appointmentTime"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={time}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  readOnly
                />
              </div>

              {/* Hospital Name */}
              <div>
                <label htmlFor="hospitalName" className="block mb-1 text-sm font-medium text-gray-900">
                  Hospital Name
                </label>
                <input
                  type="text"
                  id="hospitalName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  readOnly
                />
              </div>

              {/* Test Type */}
              <div>
                <label htmlFor="testType" className="block mb-1 text-sm font-medium text-gray-900">
                  Test Type
                </label>
                <input
                  type="text"
                  id="testType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={testType}
                  onChange={(e) => setTestType(e.target.value)}
                  readOnly
                />
              </div>

              {/* Payment Amount */}
              <div>
                <label htmlFor="paymentAmount" className="block mb-1 text-sm font-medium text-gray-900">
                  Payment Amount
                </label>
                <input
                  type="text"
                  id="paymentAmount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPayment(e.target.value)}
                  readOnly
                />
              </div>
            </div>

            {/* Important Notes */}
            <div>
              <label htmlFor="importantNotes" className="block mb-1 text-sm font-medium text-gray-900">
                Important Notes
              </label>
              <textarea
                id="importantNotes"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                rows="4"
                required
                value={notes}
                onChange={(e) => setImportantNotes(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                isFormDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isFormDisabled} // Disable button if form is in process
            >
              Update Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateLabAppointment;

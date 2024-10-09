import React, { useState, useEffect } from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AddLabAppointment = () => {
  const location = useLocation();
  const { service, hospital } = location.state || {}; // Access the passed service object
  console.log("service details:", service, hospital);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // State to hold each input field separately
  const [userName, setUserName] = useState("");
  const [contact, setContactNumber] = useState("");
  const [notes, setImportantNotes] = useState("");
  const [date, setAppointmentDate] = useState("");
  const [time, setAppointmentTime] = useState("");
  const [testType, setTestType] = useState(""); // New field for test type
  const [email, setEmail] = useState(""); // Initialize as empty

  useEffect(() => {
    if (user) {
      setEmail(user.email); // Set email when user is available
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields before proceeding
    if (!userName || !contact || !notes || !date || !time || !email) {
      toast.error("Please fill in all fields.");
      return; // Exit the function if there are empty fields
    }

    try {
      const formData = {
        userName,
        contact,
        note: notes,
        date,
        time,
        hospitalName: hospital,
        testType: service?.serviceName,
        paymentAmount: service?.price,
        email,
        labId: service?._id,
        hospitalId: service?.hospitalId,
      };
      // Make the POST request
      console.log("Adding lab appointment with data:", formData);
      await axios.post("http://localhost:3000/labappointment/add", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Lab appointment added successfully!");
      navigate("/patient/patient-lab-appointments");
    } catch (error) {
      console.error("Error adding appointment:", error);
      toast.error("Failed to add appointment.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="PatientAddLabAppointment w-full min-h-screen bg-gray-50 flex items-center justify-center py-5 px-2">
        <div className="w-full max-w-6xl bg-white p-5 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold font-[poppins] text-center text-black mb-5">
            Make Lab Appointment
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User Name */}
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
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

              {/* Email (pre-filled, read-only) */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
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
                <label
                  htmlFor="contactNumber"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
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

              {/* Test Type */}
              <div>
                <label
                  htmlFor="testType"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Test Type
                </label>
                <input
                  type="text"
                  id="testType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  value={service?.serviceName}
                  required
                  readOnly
                />
              </div>

              {/* Appointment Date */}
              <div>
                <label
                  htmlFor="appointmentDate"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Appointment Date
                </label>
                <input
                  type="date"
                  id="appointmentDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  value={date}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </div>

              {/* Appointment Time */}
              <div>
                <label
                  htmlFor="appointmentTime"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Appointment Time
                </label>
                <input
                  type="time"
                  id="appointmentTime"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  value={time}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                />
              </div>

              {/* Payment Amount */}
              <div>
                <label
                  htmlFor="paymentAmount"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Payment Amount
                </label>
                <input
                  type="text"
                  id="paymentAmount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  value={service?.price}
                  required
                  readOnly
                />
              </div>
            </div>

            {/* Important Notes */}
            <div>
              <label
                htmlFor="importantNotes"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Important Notes
              </label>
              <textarea
                id="importantNotes"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                rows="5"
                value={notes}
                onChange={(e) => setImportantNotes(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
              >
                Add Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLabAppointment;

import React, { useState, useEffect } from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientAddAppointment = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // State to hold each input field separately
  const [userName, setUserName] = useState("");
  const [contact, setContactNumber] = useState("");
  const [note, setImportantNotes] = useState("");
  const [date, setAppointmentDate] = useState("");
  const [time, setAppointmentTime] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [paymentAmount, setPayment] = useState("");
  const [email, setEmail] = useState(""); // Initialize as empty

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
      !note ||
      !date ||
      !time ||
      !hospitalName ||
      !doctorName ||
      !specialization ||
      !wardNo ||
      !paymentAmount ||
      !email
    ) {
      toast.error("Please fill in all fields.");
      return; // Exit the function if there are empty fields
    }

    try {
      const formData = {
        userName,
        contact,
        note,
        date,
        time,
        hospitalName,
        doctorName,
        specialization,
        wardNo,
        paymentAmount,
        email
      };
      // Make the POST request
      await axios.post("http://localhost:3000/appointment/add", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Appointment added successfully!");
    } catch (error) {
      console.error("Error adding appointment:", error);
      toast.error("Failed to add appointment.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="PatientAddAppointment w-full min-h-screen bg-gray-50 flex items-center justify-center py-5 px-2">
        <form
          className="max-w-md mx-auto mt-[-40.5rem]"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="date-input"
            className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 3v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3m-10 0v2m6-2v2M4 7h12M4 7v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"
                />
              </svg>
            </div>
            <input
              type="date"
              id="date-input"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={date}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
        </form>

        <div className="w-full max-w-6xl bg-white p-5 rounded-lg shadow-lg">
          {/* Form Container */}
          <h1 className="text-3xl font-bold font-[poppins] text-center text-black mb-5">
            Make Appointment
          </h1>
          <form className="space-y-6" noValidate>
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
                  readOnly
                  value={date}
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
                  required
                  value={time}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                />
              </div>

              {/* Hospital Name */}
              <div>
                <label
                  htmlFor="hospitalName"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Hospital Name
                </label>
                <input
                  type="text"
                  id="hospitalName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  required
                />
              </div>

              {/* Doctor Name */}
              <div>
                <label
                  htmlFor="doctorName"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Doctor Name
                </label>
                <input
                  type="text"
                  id="doctorName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  required
                />
              </div>

              {/* Specialization */}
              <div>
                <label
                  htmlFor="specialization"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Specialization
                </label>
                <input
                  type="text"
                  id="specialization"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                />
              </div>

              {/* Ward No */}
              <div>
                <label
                  htmlFor="wardNo"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Ward No
                </label>
                <input
                  type="text"
                  id="wardNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  value={wardNo}
                  onChange={(e) => setWardNo(e.target.value)}
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
                  value={paymentAmount}
                  onChange={(e) => setPayment(e.target.value)}
                  required
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
                rows="4"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={note}
                onChange={(e) => setImportantNotes(e.target.value)}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 text-center"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientAddAppointment;

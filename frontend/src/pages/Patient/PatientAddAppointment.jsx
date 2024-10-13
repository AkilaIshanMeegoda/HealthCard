// new code for add appointment
import React, { useState, useEffect } from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PatientAddAppointment = () => {
  const location = useLocation();
  const { doctor, hospital } = location.state || {}; // Access the passed doctor object
  console.log("Doctor details:", doctor, hospital);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // State to hold each input field separately
  const [userName, setUserName] = useState("");
  const [contact, setContactNumber] = useState("");
  const [notes, setImportantNotes] = useState("");
  const [date, setAppointmentDate] = useState("");
  const [email, setEmail] = useState(""); // Initialize as empty
  const [enabledDays, setEnabledDays] = useState([]);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const maxAppointments =  2; // Default to 2 if maxCount is not available
  console.log("Max appointments for doctor:", maxAppointments);
  useEffect(() => {
    if (user) {
      setEmail(user.email); // Set email when user is available
    }
  }, [user]);

  useEffect(() => {
    if (doctor) {
      // Set the enabled days from the doctor's availability
      const days = doctor.availability.map((item) => item.date); // Extract available days
      setEnabledDays(days);
    }
  }, [doctor]);

  console.log("Doctor availability:", enabledDays);
  useEffect(() => {
    const checkAppointments = async () => {
      if (date) {
        try {
          console.log("Checking appointments for date:", date);
          const response = await axios.get(
            `http://localhost:3000/appointment/appointment-date`, // Updated endpoint
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
              params: {
                date: date, // Include date as a query parameter
                hospitalId: doctor?.hospitalId, // Include hospitalId as a query parameter
                doctorId: doctor?._id, // Include doctorId as a query parameter
              },
            }
          );
          console.log("Appointments response:", response.data);
          const count = response.data.length;
          console.log("Appointments count for date:", count);
          setAppointmentsCount(count);

          // Disable the form and show a message if the appointment limit is reached
          if (count + 1 > maxAppointments) {
            setIsFormDisabled(true);
            toast.error(
              "Cannot add an appointment for this day, limit reached."
            );
          } else {
            setIsFormDisabled(false);
          }
        } catch (error) {
          console.error("Error fetching appointments count:", error);
          toast.error("Failed to check appointment availability.");
        }
      }
    };
    checkAppointments();
  }, [date, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields before proceeding
    if (!userName || !contact || !notes || !date || !email) {
      toast.error("Please fill in all fields.");
      return; // Exit the function if there are empty fields
    }

    try {
      const formData = {
        userName,
        contact,
        note: notes,
        date,
        time: doctor?.time,
        hospitalName: hospital,
        doctorName: doctor?.doctorName,
        specialization: doctor?.specialization,
        wardNo: doctor?.ward,
        paymentAmount: doctor?.paymentAmount,
        email,
        doctorId: doctor?._id,
        hospitalId: doctor?.hospitalId,
      };
      // Make the POST request
      console.log("Adding appointment with data:", formData);
      await axios.post("http://localhost:3000/appointment/add", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Appointment added successfully!");
      navigate("/patient/patient-doctor-appointments");
    } catch (error) {
      console.error("Error adding appointment:", error);
      toast.error("Failed to add appointment.");
    }
  };

  const isDateEnabled = (date) => {
    const dayName = new Date(date).toLocaleString("en-US", { weekday: "long" });
    return enabledDays.includes(dayName);
  };

  return (
    <div>
      <Navbar />

      <div className="PatientAddAppointment w-full min-h-screen bg-gray-50 flex items-center justify-center py-5 px-2">
        <div className="mr-3">
          <form
            className="max-w-md mx-auto mt-[-20.5rem]"
            // onSubmit={handleSubmit}
          >
            <label
              htmlFor="date-input"
              className="inline-block mb-4 text-base font-medium text-blue-700 dark:text-white bg-blue-50 dark:bg-blue-900 py-2 px-4 rounded-lg shadow-md flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-blue-500 dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Select a Date for Appointment
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
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  if (isDateEnabled(selectedDate)) {
                    setAppointmentDate(selectedDate);
                  } else {
                    toast.error("Please select an available day.");
                  }
                }}
              />
            </div>

            {/* Display Available Days */}
            <div className="mt-16">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Available Days for Doctor:
              </h3>
              <div className="flex flex-wrap gap-4">
                {doctor.availability.map((days) => (
                  <span
                    key={days._id}
                    className="px-4 py-2 bg-blue-100 text-blue-600 font-medium rounded-lg hover:bg-blue-200 hover:text-blue-700 transition-all duration-200 ease-in-out"
                  >
                    {days.date}
                  </span>
                ))}
              </div>
            </div>
            {/* Availability Card */}
            <div
              className={`mt-8 p-6 rounded-lg shadow-md transition-all duration-200 ease-in-out 
      ${
        isFormDisabled
          ? "bg-red-100 text-red-800"
          : "bg-green-100 text-green-800"
      }
    `}
            >
              <h4 className="text-xl font-medium mb-2">
                {isFormDisabled ? "Not Available" : "Available"}
              </h4>
              <p className="text-sm">
                {isFormDisabled
                  ? "The selected date is not available for an appointment."
                  : "The selected date is available for an appointment."}
              </p>
            </div>
          </form>
        </div>
        <div className="w-full max-w-6xl bg-white p-5 rounded-lg shadow-lg">
          {/* Form Container */}
          <div className="bg-blue-200 py-2 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold font-[poppins] text-center text-black mb-2">
              Make Appointment
            </h1>
          </div>
          <form className="space-y-6">
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
                  type="text"
                  id="appointmentTime"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={doctor?.time}
                  readOnly
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
                  value={hospital}
                  required
                  readOnly
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
                  value={doctor?.doctorName}
                  required
                  readOnly
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
                  value={doctor?.specialization}
                  required
                  readOnly
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
                  value={doctor?.ward}
                  required
                  readOnly
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
                  value={doctor?.paymentAmount}
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
                rows="4"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={notes}
                onChange={(e) => setImportantNotes(e.target.value)}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-6 text-center">
              <button
                type="submit"
                className={`w-full py-3 px-5 text-base font-medium text-white rounded-lg focus:ring-4 ${
                  isFormDisabled
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={isFormDisabled} // Disable the button when form is disabled
                onClick={handleSubmit}
              >
                Submit Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientAddAppointment;

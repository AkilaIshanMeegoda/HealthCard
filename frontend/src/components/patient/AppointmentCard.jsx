import React from 'react';

const AppointmentCard = () => {
  return (
    <div className="AppointmentCard w-full min-h-screen bg-gray-50 flex items-center justify-center py-5 px-2">
        
        <form className="max-w-md mx-auto mt-[-40.5rem]">
    <label htmlFor="date-input" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Date</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 3v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3m-10 0v2m6-2v2M4 7h12M4 7v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"/>
            </svg>
        </div>
        <input type="date" id="date-input" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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
                value="user@example.com"
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
                value="2024-10-05"
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
                value="City Hospital"
                readOnly
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
                value="Dr. John Doe"
                readOnly
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
                value="Cardiology"
                readOnly
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
                value="Ward 5"
                readOnly
                required
              />
            </div>

            {/* Payment */}
            <div>
              <label
                htmlFor="payment"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Payment
              </label>
              <input
                type="number"
                id="payment"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value="2000"
                readOnly
                required
              />
            </div>

            {/* Important Notes */}
            <div className="col-span-2">
              <label
                htmlFor="importantNotes"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Important Notes
              </label>
              <textarea
                id="importantNotes"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Enter any important details..."
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-6 py-3 text-center"
            >
              Submit Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentCard;

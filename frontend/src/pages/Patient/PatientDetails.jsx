import React from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import PatientIdentification from "../../components/patient/PatientIdentification";

const PatientDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full h-screen items-center"> {/* Centering the form */}
        {/* Left Half - Patient Details Form */}
        <div className="w-1/2 bg-white p-5 rounded-lg shadow-lg ml-10">
          <h1 className="text-3xl font-bold font-[poppins] text-center text-black mb-5">
            Enter Patient Details
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

              {/* Age */}
              <div>
                <label
                  htmlFor="age"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                />
              </div>

              {/* Email */}
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
                  required
                />
              </div>
              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                />
              </div>

              {/* Telephone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Telephone No
                </label>
                <input
                  type="telephone"
                  id="telephone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
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
            <div className="flex justify-center mt-4"> {/* Adjusted margin to mt-4 */}
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-6 py-3 text-center"
              >
                Submit Details
              </button>
            </div>
          </form>
        </div>

        {/* Right Half - Other Component */}
        <PatientIdentification />
      </div>
    </div>
  );
};

export default PatientDetails;

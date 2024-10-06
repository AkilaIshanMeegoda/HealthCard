import React from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PatientAppointments = () => {
  const navigate = useNavigate();

  const handleAppointmentHistory = () => {
    navigate('/patient/myappointmenthistory'); // Navigate to the discount items page
  };

  return (
    <div>
      <Navbar />
      <h1
        className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
        style={{ fontSize: "2rem", marginTop: "30px", marginLeft: "20px" }}
      >
        My Appointments 
      </h1>

      <button
          onClick={(e) => {
            e.stopPropagation();
            handleAppointmentHistory();
          }}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ml-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View Appointment History
        </button>
      <div className="mx-4 overflow-hidden rounded-lg shadow-lg md:mx-10">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                Item Name
              </th>
              <th className="w-1/4 px-16 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                Start Date
              </th>
              <th className="w-1/4 py-2 text-sm font-bold text-left text-gray-600 uppercase px-14">
                End Date
              </th>
              <th className="w-1/4 px-1 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                Discount Percentage
              </th>
              <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                Discount Price
              </th>
              <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                Availability
              </th>
              <th className="w-1/4 px-8 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                Item 1
              </td>
              <td className="px-16 py-2 text-sm border-b border-gray-200">
                {new Date('2024-10-01').toLocaleDateString()}
              </td>
              <td className="py-2 text-sm border-b border-gray-200 px-14">
                {new Date('2024-10-10').toLocaleDateString()}
              </td>
              <td className="px-16 py-2 text-sm border-b border-gray-200">
                20%
              </td>
              <td className="py-2 text-sm border-b border-gray-200 px-14">
                $80.00
              </td>
              <td className="px-8 py-2 text-sm border-b border-gray-200">
                <span className="py-1 px-2 rounded-full text-xs bg-green-500 text-white">
                  Active
                </span>
              </td>
              <td className="px-1 py-2 border-b border-gray-200">
                <button className="px-4 py-1 mx-2 text-sm font-medium text-white bg-blue-500 rounded-lg">
                  Edit
                </button>
                <button className="px-4 py-1 text-sm font-medium text-white bg-red-500 rounded-lg">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                Item 2
              </td>
              <td className="px-16 py-2 text-sm border-b border-gray-200">
                {new Date('2024-11-01').toLocaleDateString()}
              </td>
              <td className="py-2 text-sm border-b border-gray-200 px-14">
                {new Date('2024-11-10').toLocaleDateString()}
              </td>
              <td className="px-16 py-2 text-sm border-b border-gray-200">
                15%
              </td>
              <td className="py-2 text-sm border-b border-gray-200 px-14">
                $70.00
              </td>
              <td className="px-8 py-2 text-sm border-b border-gray-200">
                <span className="py-1 px-2 rounded-full text-xs bg-red-500 text-white">
                  Inactive
                </span>
              </td>
              <td className="px-1 py-2 border-b border-gray-200">
                <button className="px-4 py-1 mx-2 text-sm font-medium text-white bg-blue-500 rounded-lg">
                  Edit
                </button>
                <button className="px-4 py-1 text-sm font-medium text-white bg-red-500 rounded-lg">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default PatientAppointments;

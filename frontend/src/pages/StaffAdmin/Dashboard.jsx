import React, { useState } from 'react';
import DoctorList from '../../components/adminStaff/DoctorList';
import ServiceList from '../../components/adminStaff/ServiceList';

const Dashboard = () => {
  const [showDoctors, setShowDoctors] = useState(true); // Local state for toggling

  return (
    <div className="min-h-screen bg-[#D3E6FF] w-full p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome, Staff Admin!</h1>
      
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-4">
        <button
          className={`mx-2 px-4 py-2 rounded ${showDoctors ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setShowDoctors(true)}
        >
          Doctors
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded ${!showDoctors ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setShowDoctors(false)}
        >
          Services
        </button>
      </div>

      {/* Display the appropriate list based on toggle */}
      {showDoctors ? (
        <div className="my-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Doctors</h2>
          <DoctorList />
        </div>
      ) : (
        <div className="my-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Services</h2>
          <ServiceList />
        </div>
      )}
    </div>
  );
}

export default Dashboard;

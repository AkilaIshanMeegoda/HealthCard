import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/home/Navbar/Navbar';
import axios from 'axios';  // Axios for fetching data

const PatientHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();  // To navigate to another page

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/hospitals');
        setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };
    fetchHospitals();
  }, []);

  // Function to handle card click and navigate to the doctors page
  const handleCardClick = (hospitalEmail, hospitalName) => {
    navigate(`/hospital/${hospitalEmail}/doctors`, { state: { hospitalName } });  // Pass hospitalName as state
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <h1 className="text-4xl font-bold text-center mt-10 text-gray-800">Hospitals</h1>
      
      {/* Display hospital cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {hospitals.length > 0 ? (
          hospitals.map(hospital => (
            <div 
              key={hospital.email} 
              className="bg-white border border-gray-200 shadow-md rounded-lg p-20 w-64 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer"
              onClick={() => handleCardClick(hospital.email, hospital.hospitalName)}  // Handle card click
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{hospital.hospitalName}</h3> {/* Display hospital name */}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No hospitals found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientHospitals;

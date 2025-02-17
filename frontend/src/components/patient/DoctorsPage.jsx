import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation  } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Navbar from '../home/Navbar/Navbar';

const DoctorsPage = () => {
  const location = useLocation();
  const { hospitalId } = useParams();  // Get hospitalId from the URL
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const { hospitalName } = location.state || {};  // Access the passed hospitalName

  const [services, setServices] = useState([]); // State for services

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/doctors/${hospitalId}`);
        console.log('Full response:', response); // Log the full response for debugging
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/services/${hospitalId}`);
        console.log('Services response:', response); // Log services response for debugging
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchDoctors();
    fetchServices(); // Fetch services when the component loads

  }, [hospitalId]);

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctors/${doctorId}`); // Redirect to the doctor details page
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`); // Redirect to service details page
  };

  const handleAppointmentClick = (doctor) => {
    console.log("Doctor object:", doctor, hospitalName);  // Check the doctor object

    navigate('/patient/patient-add-appointment', { state: { doctor, hospital: hospitalName } });
  };
  const handleLabAppointmentClick = (service) => {
    console.log("Doctor object:", service, hospitalName);  // Check the doctor object

    navigate('/patient/patient-add-lab-appointment', { state: { service, hospital: hospitalName } });
  };
  
  return (

    <div>      
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <h1 className="text-3xl font-bold text-center mt-6 text-gray-800">Doctors</h1>

      {/* Display doctors */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {doctors.length > 0 ? (
          doctors.map(doctor => (
            <div 
              key={doctor._id} 
              className="bg-white border border-gray-200 shadow-md rounded-lg p-6 w-64 cursor-pointer" 
            >
              {doctor.image && (
                <img 
                  src={doctor.image} 
                  alt={doctor.doctorName} 
                  className="w-full h-50 object-cover rounded-t-lg mb-4" 
                  onClick={() => handleDoctorClick(doctor._id)}
                />
              )}
              <h3 className="text-xl font-semibold text-blue-600 mb-2" onClick={() => handleDoctorClick(doctor._id)}>{doctor.doctorName}</h3>
              <p className="text-gray-600">{doctor.specialization}</p>

              <p className="text-gray-500">Experience: {doctor.experience} years</p> {/* Additional info */}             

              <p className="text-gray-500">Payment Amount: ${doctor.paymentAmount}</p> {/* Additional info */}


               {/* Button to book an appointment */}
               <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => handleAppointmentClick(doctor)} // Add appointment button handler
              >
                Book Appointment
              </button>

            </div>
          ))
        ) : (
          <p className="text-gray-600">No doctors found for this hospital.</p>
        )}
      </div>
{/* Display services */}
<h1 className="text-3xl font-bold text-center mt-10 text-gray-800">Services</h1>

<div className="flex flex-wrap justify-center gap-6 mt-8">
  {services.length > 0 ? (
    services.map(service => (
      <div 
        key={service._id} 
        className="bg-white border border-gray-200 shadow-md rounded-lg p-6 w-64 h-80" // Set a fixed height for the card
      >
        {service.image && (
          <img 
            src={service.image} 
            alt={service.serviceName} 
            className="w-full h-32 object-cover rounded-t-lg mb-4" // Set fixed height for image with object-cover
            onClick={() => handleServiceClick(service._id)} // Add click handler for image

          />
        )}
        <h3 className="text-xl font-semibold text-green-600 mb-2" onClick={() => handleServiceClick(service._id)} >{service.serviceName}</h3>
        {service.price && <p className="text-gray-500">Price: ${service.price}</p>}

        {/* Button to book an appointment */}
        <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => handleLabAppointmentClick(service)} // Add appointment button handler
              >
                Book Appointment
         </button>
      </div>
    ))
  ) : (
    <p className="text-gray-600">No services found for this hospital.</p>
  )}
</div>
</div>

    </div>
  );
};

export default DoctorsPage;

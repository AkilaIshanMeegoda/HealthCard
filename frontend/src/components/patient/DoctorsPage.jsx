import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const DoctorsPage = () => {
  const location = useLocation();
  const { hospitalId } = useParams(); // Get hospitalId from the URL
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const { hospitalName } = location.state || {}; // Access the passed hospitalName

  const [services, setServices] = useState([]); // State for services

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/doctors/${hospitalId}`
        );
        console.log("Full response:", response); // Log the full response for debugging
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/services/${hospitalId}`
        );
        console.log("Services response:", response); // Log services response for debugging
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
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
    console.log("Doctor object:", doctor, hospitalName); // Check the doctor object

    navigate("/patient/patient-add-appointment", {
      state: { doctor, hospital: hospitalName },
    });
  };
  const handleLabAppointmentClick = (service) => {
    console.log("Doctor object:", service, hospitalName); // Check the doctor object

    navigate("/patient/patient-add-lab-appointment", {
      state: { service, hospital: hospitalName },
    });
  };

  return (
    <div>
      <h1 className="mt-8 text-3xl font-bold text-center text-gray-800">
        Doctors
      </h1>

      <div className="min-h-screen bg-gray-100">
        <h1 className="mt-10 text-3xl font-bold text-center text-gray-800">
          Doctors
        </h1>

        {/* Display doctors */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="w-64 p-6 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer"
              >
                {doctor.image && (
                  <img
                    src={doctor.image}
                    alt={doctor.doctorName}
                    className="object-cover w-full mb-4 rounded-t-lg h-50"
                    onClick={() => handleDoctorClick(doctor._id)}
                  />
                )}
                <h3
                  className="mb-2 text-xl font-semibold text-blue-600"
                  onClick={() => handleDoctorClick(doctor._id)}
                >
                  {doctor.doctorName}
                </h3>
                <p className="text-gray-600">{doctor.specialization}</p>
                <p className="text-gray-500">
                  Experience: {doctor.experience} years
                </p>{" "}
                {/* Additional info */}
                <p className="text-gray-500">
                  Payment Amount: ${doctor.paymentAmount}
                </p>{" "}
                {/* Additional info */}
                <p className="text-gray-500">Status: {doctor.status}</p>{" "}
                {/* Button to book an appointment */}
                <button
                  className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
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
      </div>
      {/* Display services */}
      <h1 className="mt-10 text-3xl font-bold text-center text-gray-800">
        Services
      </h1>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service._id}
              className="w-64 p-6 bg-white border border-gray-200 rounded-lg shadow-md h-80" // Set a fixed height for the card
            >
              {service.image && (
                <img
                  src={service.image}
                  alt={service.serviceName}
                  className="object-cover w-full h-32 mb-4 rounded-t-lg" // Set fixed height for image with object-cover
                  onClick={() => handleServiceClick(service._id)} // Add click handler for image
                />
              )}
              <h3
                className="mb-2 text-xl font-semibold text-green-600"
                onClick={() => handleServiceClick(service._id)}
              >
                {service.serviceName}
              </h3>
              {service.price && (
                <p className="text-gray-500">Price: ${service.price}</p>
              )}

              {/* Button to book an appointment */}
              <button
                className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
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
  );
};

export default DoctorsPage;

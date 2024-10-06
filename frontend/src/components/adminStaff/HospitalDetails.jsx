import React, { useEffect, useState } from "react";
import axios from "axios";

const HospitalDetails = ({ hospitalId }) => {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(
          `http://localhost:3000/api/hospital/${hospitalId}`,
          {
            headers: { Accept: "application/json" },
          }
        );
        console.log(response);
        setDoctors(response.data.doctors || []); // Ensure doctors is always an array
        setServices(response.data.services || []); // Ensure services is always an array
        setError(null); // Reset error on successful fetch
      } catch (err) {
        setError("Failed to load hospital details. Please try again later.");
      } finally {
        setLoading(false); // Stop loading after fetch is done
      }
    };

    fetchHospitalDetails();
  }, [hospitalId]);

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Doctors</h2>
      {doctors.length === 0 ? (
        <p>No doctors available.</p>
      ) : (
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor._id}>
              <h3>{doctor.doctorName}</h3>
              <p>Specialization: {doctor.specialization}</p>
              <p>Experience: {doctor.experience} years</p>
              {doctor.image && (
                <img
                  src={doctor.image}
                  alt={`Image of Dr. ${doctor.doctorName}`}
                  style={{ width: "100px", height: "100px" }}
                />
              )}
            </li>
          ))}
        </ul>
      )}

      <h2>Services</h2>
      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <ul>
          {services.map((service) => (
            <li key={service._id}>
              <h3>{service.serviceName}</h3>
              <p>{service.description}</p>
              <p>
                Price: ${service.price ? service.price.toFixed(2) : "N/A"}
              </p>{" "}
              {/* Format price */}
              {service.image && (
                <img
                  src={service.image}
                  alt={`Image of ${service.serviceName}`}
                  style={{ width: "100px", height: "100px" }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HospitalDetails;

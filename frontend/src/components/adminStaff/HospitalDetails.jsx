import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HospitalDetails = ({ hospitalId }) => {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await axios.get(`/api/hospital/${hospitalId}`);
        
        // Ensure the response has the expected structure
        const { doctors = [], services = [] } = response.data;
        console.log(response.data); // Log the response data to inspect it
        setDoctors(doctors);
        setServices(services);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchHospitalDetails();
  }, [hospitalId]);

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
              <img src={doctor.image} alt={doctor.doctorName} style={{ width: '100px', height: '100px' }} />
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
              <p>Price: ${service.price || 'N/A'}</p>
              {service.image && <img src={service.image} alt={service.serviceName} style={{ width: '100px', height: '100px' }} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HospitalDetails;

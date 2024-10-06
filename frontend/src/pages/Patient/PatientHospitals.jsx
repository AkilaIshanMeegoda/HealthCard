import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/home/Navbar/Navbar';

const PatientHospitals = () => {
  const navigate = useNavigate();

  // Function to handle button click and navigate to a new page
  const handleNavigation = () => {
    navigate('/patient/patient-add-appointment');  // Replace '/new-page' with the route you want to navigate to
  };

  return (
    <div>
      <Navbar />
      <button onClick={handleNavigation}>Go to New Page</button> {/* Add the button */}
    </div>
  );
};

export default PatientHospitals;

import React, { useContext } from 'react';
import HospitalDetails from '../../../src/components/adminStaff/HospitalDetails';
import { AuthContext } from '../../../src/context/AuthContext'; // Adjust the path as necessary
import DoctorList from '../../components/adminStaff/DoctorList';


const Dashboard = () => {
  const { user } = useContext(AuthContext); // Destructure user from AuthContext
  console.log("User from AuthContext:", user); // Log user to check its value
  console.log("User in Dashboard:", user); // Log user to check its value

  // Get the hospitalId from the user's email
  const hospitalId = user ? user.email : null;

  return (
    <div className="min-h-screen bg-[#D3E6FF] w-full">
      <h1>Welcome StaffAdmin!</h1>
      <h1>Doctors</h1>
      <DoctorList />
    </div>
  );
}

export default Dashboard;

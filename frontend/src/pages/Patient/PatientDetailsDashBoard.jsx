import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/home/Navbar/Navbar";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom"; 
import PatientIdentification from "../../components/patient/PatientIdentification";

const PatientDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // State to hold each input field separately
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState(""); // Initialize as empty
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email); // Set email when user is available
    }
  }, [user]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields before proceeding
    if (!name || !age || !email || !address || !telephone || !description) {
      toast.error("Please fill in all fields.");
      return; // Exit the function if there are empty fields
    }

    try {
      const formData = {
        name,
        age,
        email,
        address,
        telephone,
        description,
      };
      // Make the POST request
      await axios.post("http://localhost:3000/patientprofile/add", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Patient profile added successfully!"); 
    } catch (error) {
      console.error("Error adding patient profile:", error);
      toast.error("Failed to add patient profile.");
    }
  };

  const handleViewDetails = () => {
    navigate('/patient/viewmydetails'); // Navigate to the discount items page
  };

  return (
    <div>
      <Navbar />
      <div className="flex w-full h-screen items-center">
        <div className="w-1/2 bg-white p-5 rounded-lg shadow-lg ml-10">
          <h1 className="text-3xl font-bold font-[poppins] text-center text-black mb-5">
            Enter Patient Details
          </h1>
          <form className="space-y-6" noValidate onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="userName" className="block mb-1 text-sm font-medium text-gray-900">User Name</label>
                <input type="text" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="age" className="block mb-1 text-sm font-medium text-gray-900">Age</label>
                <input type="number" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" required value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">Email</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" required value={email} readOnly />
              </div>
              <div>
                <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-900">Address</label>
                <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" required value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div>
                <label htmlFor="telephone" className="block mb-1 text-sm font-medium text-gray-900">Telephone No</label>
                <input type="text" id="telephone" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" required value={telephone} onChange={(e) => setTelephone(e.target.value)} />
              </div>
              <div className="col-span-2">
                <label htmlFor="importantNotes" className="block mb-1 text-sm font-medium text-gray-900">Important Notes</label>
                <textarea id="importantNotes" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" placeholder="Enter any important details..." required value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-6 py-3 text-center mr">Submit Details</button>
              <button onClick={(e) => { e.stopPropagation(); handleViewDetails(); }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-6 py-3 text-center ml-4">View My Details</button>
            </div>
          </form>
        </div>
        <PatientIdentification qrCodeSize={300} componentSize="max-w-3xl" email={user? user.email : email} />
      </div>
    </div>
  );
};

export default PatientDetails;

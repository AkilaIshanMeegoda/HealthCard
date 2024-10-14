import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/home/Navbar/Navbar";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const UpdatePatientDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/patientprofile/${user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }
          return res.text(); // Use text() to see the raw response
        })
        .then((data) => {
          console.log("Fetched raw data:", data); // Log raw data
          const jsonData = JSON.parse(data); // Parse to JSON manually

          // Since jsonData is an array, extract the first element
          const patientData = jsonData[0];

          setName(patientData.name || "");
          setAge(patientData.age || "");
          setEmail(patientData.email || "");
          setTelephone(patientData.telephone || "");
          setAddress(patientData.address || "");
          setDescription(patientData.description || "");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          toast.error("Failed to fetch details");
        });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name,
        age,
        email,
        address,
        telephone,
        description,
      };

      await axios.patch(
        `http://localhost:3000/patientprofile/update/${user.email}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Patient profile updated successfully!");
      navigate("/patient/viewmydetails");
    } catch (error) {
      console.error("Error updating patient profile:", error);
      toast.error("Failed to update patient profile.");
    }
  };

  const handleDelete = async () => {
    try {
        console.log("check pass email to delete section",email);
      await axios.delete(
        "http://localhost:3000/patientprofile/delete",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Patient profile deleted successfully!");
      navigate("/patient/viewmydetails"); // Navigate to the desired page after deletion
    } catch (error) {
      console.error("Error deleting patient profile:", error);
      toast.error("Failed to delete patient profile.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex w-full h-screen items-center">
        <div className="w-1/2 bg-white p-5 rounded-lg shadow-lg ml-10">
          <h1 className="text-3xl font-bold font-[poppins] text-center text-black mb-5">
            Update Patient Details
          </h1>
          <form className="space-y-6" noValidate onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="telephone"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Telephone No
                </label>
                <input
                  type="text"
                  id="telephone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  required
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="importantNotes"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Important Notes
                </label>
                <textarea
                  id="importantNotes"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  placeholder="Enter any important details..."
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 text-center"
              >
                Update Details
              </button>
              <button
                type="button" // Prevent default form submission
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-5 py-3 text-center ml-4"
                onClick={handleDelete} // Call delete handler on click
              >
                Delete Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePatientDetails;

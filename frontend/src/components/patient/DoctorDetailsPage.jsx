import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DoctorDetailsPage = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/doctors/doctor/${doctorId}`
        );
        setDoctor(response.data);
        console.log("Doctor Details:", response.data);
      } catch (error) {
        console.error(
          "Error fetching doctor details:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">No doctor details available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center p-6">
          {doctor.image && (
            <img
              src={doctor.image}
              alt={doctor.doctorName}
              className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 mr-6"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {doctor.doctorName}
            </h1>
            <p className="text-lg font-semibold text-blue-600">
              {doctor.specialization}
            </p>
            <p className="text-gray-600">
              Experience: {doctor.experience} years
            </p>
            <p className="text-gray-600">
              Ward: {doctor.ward || "Not specified"}
            </p>
            <p className="text-gray-600">
              Payment Amount:{" "}
              {doctor.paymentAmount
                ? `$${doctor.paymentAmount}`
                : "Not specified"}
            </p>
            {/* Additional info */}
            <p className="text-gray-500">Time: {doctor.time}</p>

          </div>
        </div>
        <div className="px-6 pb-6">
          <h2 className="text-xl font-bold mb-2">Availability</h2>
          {doctor.availability && doctor.availability.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {doctor.availability.map((slot) => (
                <div
                  key={slot._id}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow-md hover:bg-blue-200 transition duration-300"
                >
                  <p className="font-semibold">
                    {slot.date || "Not specified"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No availability slots available.</p>
          )}
          <h2 className="text-xl font-bold mt-4 mb-2">Description</h2>
          <p className="text-gray-600">
            {doctor.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;

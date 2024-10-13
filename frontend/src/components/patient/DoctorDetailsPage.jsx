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
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <p className="text-2xl font-semibold text-blue-600">Loading...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <p className="text-2xl text-red-600">No doctor details available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 px-16 py-10">
      <section className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 bg-white shadow-lg rounded-lg p-6">
        {/* Doctor Image */}
        {doctor.image && (
          <img
            src={doctor.image}
            alt={doctor.doctorName}
            className="w-48 h-48 object-cover rounded-full shadow-md"
            style={{ objectPosition: "top" }} // Keep face visible
          />
        )}

        {/* Doctor Info */}
        <div className="space-y-2">
          <h2 className="text-4xl font-semibold text-gray-800">{doctor.doctorName}</h2>
          <p className="text-xl text-blue-700">{doctor.specialization}</p>
          <p className="text-lg">
            <strong>Experience:</strong> {doctor.experience} years
          </p>
          <p className="text-lg">
            <strong>Ward:</strong> {doctor.ward || "Not specified"}
          </p>
          <p className="text-lg">
            <strong>Payment:</strong> {doctor.paymentAmount ? `$${doctor.paymentAmount}` : "Not specified"}
          </p>
          <p className="text-md italic text-gray-600">
            <strong>Time:</strong> {doctor.time}
          </p>
        </div>
      </section>

      {/* Availability Section */}
      <section className="mt-8">
        <h3 className="text-3xl font-semibold mb-4 text-blue-800">Availability</h3>
        {doctor.availability && doctor.availability.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {doctor.availability.map((slot) => (
              <div
                key={slot._id}
                className="bg-blue-200 text-blue-700 px-5 py-3 rounded-md shadow-md hover:bg-blue-300 transition ease-in-out duration-300"
              >
                <p className="text-lg">{slot.date || "Not specified"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600">No availability slots available.</p>
        )}
      </section>

      {/* Description Section */}
      <section className="mt-8">
        <h3 className="text-3xl font-semibold mb-4 text-blue-800">Description</h3>
        <p className="text-lg leading-7 text-gray-700">
          {doctor.description || "No description available."}
        </p>
      </section>
    </div>
  );
};

export default DoctorDetailsPage;

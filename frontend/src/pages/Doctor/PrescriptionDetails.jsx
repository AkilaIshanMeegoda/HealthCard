import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Spinner } from "flowbite-react";
import reportImg from "../../images/report.jpg";

const PrescriptionDetails = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [imageLoading, setImageLoading] = useState(true); // State to track image loading
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && id) {
      fetch(`http://localhost:3000/prescription/getPrescription/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
            setPrescription(data);
        })
        .catch((error) => {
          console.error("Error fetching prescription", error);
          toast.error("Failed to fetch prescription details");
        });
    }
  }, [id, user]);

  const handleImageLoaded = () => {
    setImageLoading(false); // Set image loading state to false when the image is loaded
  };

  if (!prescription) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full h-20 bg-blue-600">
        <h1 className="pt-4 ml-16 text-3xl text-white">{prescription.patientName}</h1>
      </div>
      <div className="flex p-8">
        {/* <div>
          <img className="mt-16 ml-8 w-[600px]" src={prescription.image} />
        </div> */}
        <div className="relative">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner color="blue" size="xl" /> {/* Flowbite Spinner */}
            </div>
          )}
          <img
            src={prescription.image}
            alt={prescription.patientName}
            onLoad={handleImageLoaded} // Call this function when the image is loaded
            className={`object-contain pt-8 m-4 h-80 w-96 ${
              imageLoading ? "hidden" : ""
            }`} // Hide image if it's loading
          />

          <div className="flex-1 md:ml-8">
            <p className="mb-2 text-2xl font-bold text-gray-600">
              Patient Name : {prescription.patientName}
            </p>
            <p className="mb-2 text-xl font-bold text-blue-600">
              Prescription Date : {prescription.date}
            </p>
            <p className="text-lg text-black">
              Description: {prescription.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetails;

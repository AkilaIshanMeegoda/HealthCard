import React, { useEffect, useState } from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const PatientPrescriptions = () => {
  const [prescriptionFiles, setprescriptionFiles] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // For viewing the large image
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch reports from the server
  const fetchAppointments = () => {
    if (user && user.token) {
      axios
        .get("http://localhost:3000/prescription/viewMyPrescription", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          if (res.data.length === 0) {
            setprescriptionFiles([]); // No reports found
          } else {
            setprescriptionFiles(res.data); // Set reports to state
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching items", error);
          if (error.response && error.response.status === 404) {
            setLoading(false); // Handle 404 error
          } else {
            toast.error("Failed to fetch items");
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }
  };

  console.log("prescriptionFiles", prescriptionFiles);

  // Fetch reports when the component loads or user changes
  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  // Open the modal and show the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Navbar />
      <h1
        className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
        style={{
          fontSize: "2rem",
          marginTop: "40px",
          marginBottom: "40px",
          marginLeft: "20px",
        }}
      >
        My Reports
      </h1>

      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        {prescriptionFiles.length === 0 ? (
          <p className="py-4 text-center">No items available.</p>
        ) : (
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Patient Name
                </th>
                <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Date
                </th>
                <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                Description
                </th>
                <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                  Image
                </th>
                <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {prescriptionFiles.map((pre) => (
                <tr key={pre._id}>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {pre.patientName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {pre.date}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {pre.description}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    <img
                      src={pre.image}
                      alt={pre.patientName}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      className="py-1 px-4 rounded-lg text-xs font-medium bg-blue-500 mx-2 text-white"
                      onClick={() => openModal(pre.image)}
                    >
                      View
                    </button>
                    <a
                      href={pre.image} // Assuming the image URL is the report to download
                      download
                    >
                      <button className="py-1 px-4 rounded-lg text-xs font-medium bg-red-500 text-white">
                        Download
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal to show large image */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
            <img
              src={selectedImage}
              alt="Report"
              style={{ width: "500px", height: "500px", objectFit: "cover" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptions;

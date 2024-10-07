import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";
import PatientImg from "../../images/patient.jpg";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/user/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPatient(data);
        })
        .catch((error) => {
          console.error("Error fetching item", error);
        });
    }
  }, [user, id]);

  const handleViewClick = (patientId) => {
    navigate(`/staffMember/view-reports/${patientId}`);
  };

  return (
    <div className="relative w-full min-h-screen">
      <img
        src={PatientImg}
        alt="Full Screen"
        className="absolute inset-0 object-cover w-full h-full opacity-70"
      />

      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 p-4 text-white justify-items-center">
        <p className="mt-8 mb-32 text-4xl text-center">Patient Details</p>
        <div className="flex items-center justify-center ">
          <div className="flex text-2xl justify-items-center">
            <div className="pr-4 text-left text-gray-200">
              <h1>Patient Name :</h1>
              <h1>Patient Email :</h1>
              <h1>Patient Address :</h1>
              <h1>Patient Gender :</h1>
              <h1>Patient Age :</h1>
              <h1>Patient Contact :</h1>
            </div>
            <div className="text-black">
              <p>&nbsp;&nbsp;{patient?.name}</p>
              <p>&nbsp;&nbsp;{patient?.email}</p>
              <p>&nbsp;&nbsp;{patient?.address}</p>
              <p>&nbsp;&nbsp;{patient?.gender}</p>
              <p>&nbsp;&nbsp;{patient?.age}</p>
              <p>&nbsp;&nbsp;{patient?.contact}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewClick(patient._id); 
            }}
            className="relative z-20 px-4 py-1 mt-12 text-xl font-medium text-white bg-green-500 rounded-lg opacity-100"
          >
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;

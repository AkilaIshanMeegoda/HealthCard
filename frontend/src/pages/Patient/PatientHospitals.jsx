import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/home/Navbar/Navbar';
import axios from 'axios';

const PatientHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/hospitals');
        setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };
    fetchHospitals();
  }, []);

  const handleCardClick = (hospitalEmail, hospitalName) => {
    navigate(`/hospital/${hospitalEmail}/doctors`, { state: { hospitalName } });
  };

  // Map of hospital names to predefined images
  const hospitalImages = {
    "Nawaloka Hospital": "https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/434676019_841549568011883_3987155695013898762_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFaV80LrmS2apbMHonZ6KRUlby34rgjcnmVvLfiuCNyeZIdWJ_jf1podmDYvxoxcNxEe7WBfhKUdSzA5HVEJbUg&_nc_ohc=CZJY_1C75bIQ7kNvgHlvKaI&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=A4Kwmzz20bD0Ut_89RUhq6J&oh=00_AYAoIT00SY-kVy4d3aEwkfwz7UaJMOmU5fYaaF4nrrn8RA&oe=6711A0CA",
    "Durdans Hospital": "https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/270059778_6752556924786211_6496881281630425489_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE3uWQQmEWin1q5IRVYDlBl4NnSMYr9pPHg2dIxiv2k8bs2Ie8-CWrJQD4WBMquo1imEs7EMYuZ9UwD0T4ftfUO&_nc_ohc=s8ToUVpQzOYQ7kNvgGJfmzF&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=AharXZepcaA7OLqDht9wC2X&oh=00_AYCf38FAUwZxIzz6-k5zCCFIRlLy7jevcLShw0DVYl1Lvg&oe=67118F26",
    "Lanka Hospital": "https://www.seylan.lk/uploads/LANKA-HOSPITAL-.jpg",
    "Asiri Hospital": "https://upload.wikimedia.org/wikipedia/en/f/f6/Asiri_Hospital_Holdings_logo.png",
  };

  const getHospitalImage = (hospitalName) =>
    hospitalImages[hospitalName] || "https://via.placeholder.com/300"; // Default image

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <h1 className="text-4xl font-bold text-center mt-10 text-blue-800">Hospitals</h1>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div
              key={hospital.email}
              className="card bg-white border border-gray-200 shadow-md rounded-lg p-5 w-72 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer"
              onClick={() => handleCardClick(hospital.email, hospital.hospitalName)}
            >
              <img
                src={getHospitalImage(hospital.hospitalName)}
                alt={hospital.hospitalName}
                className="object-contain w-full h-40 mb-4 rounded-lg"
              />
              <div className="flex flex-col gap-3">
                <h2 className="text-center text-xl font-semibold text-blue-600">{hospital.hospitalName}</h2>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No hospitals found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientHospitals;

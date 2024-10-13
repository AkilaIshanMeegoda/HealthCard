import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { Card, Button } from "flowbite-react"; 
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import axios from "axios";

const DoctorCard = ({ doctor, onDelete = () => {} }) => { // Provide a default function for onDelete
  const navigate = useNavigate(); 

  const handleEditClick = () => {
    navigate(`/admin/addDashboard/edit-doctor/${doctor._id}`); 
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`http://localhost:3000/api/doctors/${doctor._id}`);
        toast.success("Doctor deleted successfully!", {
          position: "bottom-right",
          theme: "colored",
        });
        onDelete(doctor._id); // Call onDelete to remove the doctor from the UI
      } catch (error) {
        console.error("Error deleting doctor:", error);
        toast.error("Failed to delete doctor.");
      }
    }
  };

  return (
    <Card className="max-w-2xl min-h-[500px]">
      <img
        src={doctor.image}
        alt={`${doctor.doctorName}`}
        className="h-56 w-full object-contain"
      />
      <div className="p-6">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 h-12 overflow-hidden">
          {doctor.doctorName}
        </h5>
        <p className="text-gray-500 h-8 overflow-hidden">
          {doctor.specialization}
        </p>
        <p className="text-gray-700 h-8 overflow-hidden">
          Experience: {doctor.experience} years
        </p>
        <p className="text-gray-700 h-8 overflow-hidden">Ward: {doctor.ward}</p>
        <p className="text-gray-700 h-8 overflow-hidden">
          Status: {doctor.status}
        </p>
        
        <div className="button-container flex justify-between mt-4">
          <Button
            onClick={handleEditClick}
            color="blue"
            className="flex-1 mr-2"
          >
            Edit
          </Button>
          <Button
            onClick={handleDeleteClick}
            color="red"
            className="flex-1 ml-2"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

// PropTypes validation
DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doctorName: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    ward: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    availability: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    time: PropTypes.string.isRequired,
    maxAppointmentCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func, // onDelete should be a function
};

export default DoctorCard;

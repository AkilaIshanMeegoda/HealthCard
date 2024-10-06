import React from "react";
import { Card, Button } from "flowbite-react"; // Import Button from flowbite-react
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle edit button click
  const handleEditClick = () => {
    navigate(`/admin/addDashboard/edit-doctor/${doctor._id}`); // Redirect to edit page with doctor ID
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
        <p className="text-gray-700 font-bold">Availability:</p>
        <ul className="max-h-60 overflow-y-auto">
          {doctor.availability.length > 0 ? (
            doctor.availability.map((slot, index) => (
              <li key={index} className="h-8 overflow-hidden">
                {slot.date} - {slot.time} ({slot.status})
              </li>
            ))
          ) : (
            <li className="h-8 text-gray-500">No availability</li>
          )}
        </ul>
        <p className="text-gray-500 h-24 overflow-hidden">
          {doctor.description}
        </p>
        <Button onClick={handleEditClick} color="blue" className="mt-4">
          Edit
        </Button>{" "}
        {/* Edit button */}
      </div>
    </Card>
  );
};

export default DoctorCard;

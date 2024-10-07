import React from "react";
import { Card } from "flowbite-react";

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="max-w-sm">
      <img src={doctor.image} alt={`${doctor.doctorName}`} className="h-40 object-cover" />
      <h5 className="text-xl font-bold tracking-tight text-gray-900">
        {doctor.doctorName}
      </h5>
      <p className="text-gray-500">{doctor.specialization}</p>
      <p className="text-gray-700">Experience: {doctor.experience} years</p>
      <p className="text-gray-700">Ward: {doctor.ward}</p>
      <p className="text-gray-700">Status: {doctor.status}</p>
      <p className="text-gray-700">Availability:</p>
      <ul>
        {doctor.availability.map((slot, index) => (
          <li key={index}>
            {slot.date} - {slot.time} ({slot.status})
          </li>
        ))}
      </ul>
      <p className="text-gray-500">{doctor.description}</p>
    </Card>
  );
};

export default DoctorCard;

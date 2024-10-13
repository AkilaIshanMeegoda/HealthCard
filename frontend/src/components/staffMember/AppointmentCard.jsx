import React from "react";

const AppointmentCard = ({ appointment }) => {
    return (
        <div className="bg-gray-50 shadow-sm rounded-lg p-4 flex items-start justify-between hover:shadow-md transition-shadow">
            <div>
                <h3 className="text-lg font-semibold text-gray-800">Dr.{appointment.doctorName}</h3>
                <p className="text-sm text-gray-500">Date: {appointment.date}, Time: {appointment.time}</p>
                <p className={`text-sm mt-2 ${appointment.status === "Pending" ? "text-red-500" : "text-green-500"}`}>Payment Status: {appointment.status}</p>
            </div>
        </div>
    );
};

export default AppointmentCard;

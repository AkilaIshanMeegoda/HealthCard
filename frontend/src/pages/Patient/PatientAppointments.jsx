import React from "react";
import Navbar from "../../components/home/Navbar/Navbar";

const PatientAppointments = () => {
  return (
    <div>
      <Navbar />
      <h1
        className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
        style={{ fontSize: "2rem", marginTop: "30px", marginLeft: "20px" }}
      >
        My Appointments 
      </h1>
      PatientAppointments
    </div>
  );
};

export default PatientAppointments;

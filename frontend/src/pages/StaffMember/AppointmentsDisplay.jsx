import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import dayjs from "dayjs";
import AppointmentCard from "../../components/staffMember/AppointmentCard";
import { Navigate, useNavigate } from "react-router";

const AppointmentsDisplay = () => {
  const { user } = useAuthContext();
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = () => {
      user &&
        fetch("http://localhost:3000/appointment/hospital-appointments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setAppointments(Array.isArray(data) ? data : []);
          })
          .catch((error) => {
            console.error("Error fetching items", error);
            toast.error("Failed to fetch appointments");
          });
    };

    fetchAppointments();
  }, [user]);

  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

  // Filter today's, tomorrow's, and other upcoming appointments
  const todayAppointments = appointments.filter(
    (appt) => dayjs(appt.date).format("YYYY-MM-DD") === today
  );
  const tomorrowAppointments = appointments.filter(
    (appt) => dayjs(appt.date).format("YYYY-MM-DD") === tomorrow
  );
  const otherUpcomingAppointments = appointments.filter((appt) =>
    dayjs(appt.date).isAfter(tomorrow)
  );

  return (
    <div className="w-full">
      <div className="container p-6 mx-auto">
        <h1 className="mb-6 text-4xl font-bold text-center">
          Appointment Overview
        </h1>

        {/* Today's Appointments */}
        <h2 className="mb-4 text-2xl font-semibold">Today's Appointments</h2>
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3">
          {todayAppointments.length > 0 ? (
            todayAppointments.map((appt) => (
              <AppointmentCard key={appt._id} appointment={appt} />
            ))
          ) : (
            <p className="text-gray-500">No appointments for today.</p>
          )}
        </div>

        {/* Tomorrow's Appointments */}
        <h2 className="mb-4 text-2xl font-semibold">Tomorrow's Appointments</h2>
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3">
          {tomorrowAppointments.length > 0 ? (
            tomorrowAppointments.map((appt) => (
              <AppointmentCard key={appt._id} appointment={appt} />
            ))
          ) : (
            <p className="text-gray-500">No appointments for tomorrow.</p>
          )}
        </div>

        {/* Other Upcoming Appointments */}
        <h2 className="mb-4 text-2xl font-semibold">
          Other Upcoming Appointments
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {otherUpcomingAppointments.length > 0 ? (
            otherUpcomingAppointments.map((appt) => (
              <AppointmentCard key={appt._id} appointment={appt} />
            ))
          ) : (
            <p className="text-gray-500">No other upcoming appointments.</p>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-10">
        <button
          className="px-4 py-2 text-white bg-green-400 rounded-xl"
          onClick={() => navigate("/staffMember/doctorAppointments")}
        >
          All Doctor Appointments
        </button>
        <button
          className="px-4 py-2 text-white bg-green-400 rounded-xl"
          onClick={() => navigate("/staffMember/labAppointments")}
        >
          All Lab Appointments
        </button>
      </div>
    </div>
  );
};

export default AppointmentsDisplay;

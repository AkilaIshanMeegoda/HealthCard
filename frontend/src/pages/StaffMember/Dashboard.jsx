import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import dayjs from 'dayjs';

const Dashboard = () => {
  const { user } = useAuthContext();
  const [appointments, setAppointments] = useState([]);

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

  const todayAppointments = appointments.filter(
    (appt) => dayjs(appt.date).format("YYYY-MM-DD") === today
  );

  const todayAppointmentsCount = todayAppointments.length;


  return (
    <div className="w-full min-h-screen">
      <h1>Today we have {todayAppointmentsCount} appointments.</h1>
    </div>
  )
}

export default Dashboard
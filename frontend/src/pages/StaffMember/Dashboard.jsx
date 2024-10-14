import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import WeeklyAppointmentsChart from '../../components/staffMember/WeeklyAppointmentsChart';

const Dashboard = () => {
  const { user } = useAuthContext();
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [labAppointments, setLabAppointments] = useState([]);

  useEffect(() => {
    const fetchDoctorAppointments = () => {
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
            setDoctorAppointments(Array.isArray(data) ? data : []);
          })
          .catch((error) => {
            console.error("Error fetching doctor appointments", error);
            toast.error("Failed to fetch doctor appointments");
          });
    };

    fetchDoctorAppointments();
  }, [user]);

  useEffect(() => {
    const fetchLabAppointments = () => {
      user &&
        fetch("http://localhost:3000/labappointment/hospital-appointments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setLabAppointments(Array.isArray(data) ? data : []);
          })
          .catch((error) => {
            console.error("Error fetching lab appointments", error);
            toast.error("Failed to fetch lab appointments");
          });
    };

    fetchLabAppointments();
  }, [user]);

  const today = dayjs().format("YYYY-MM-DD");
  const todayAppointments = doctorAppointments.filter(
    (appt) => dayjs(appt.date).format("YYYY-MM-DD") === today
  );
  const todayAppointmentsCount = todayAppointments.length;

  return (
    <div className="w-full min-h-screen px-7">
      {todayAppointmentsCount > 0 && (
        <div className="w-5/6 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mt-6" role="alert">
          <span className="block sm:inline mb-5 font-semibold">
            Today we have <strong>{todayAppointmentsCount}</strong> appointments.
          </span>
          <Link to="/staffMember/appointments">
            <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              View Appointments
            </button>
          </Link>
        </div>
      )}

      <WeeklyAppointmentsChart appointments={doctorAppointments} type={'Doctor'} />
      <WeeklyAppointmentsChart appointments={labAppointments} type={'Lab'} />
    </div>
  );
};

export default Dashboard;
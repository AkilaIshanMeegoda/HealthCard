import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import dayjs from "dayjs";
import AppointmentCard from "../../components/staffMember/AppointmentCard";

const AppointmentsDisplay = () => {
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
    const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

    // Filter today's, tomorrow's, and other upcoming appointments
    const todayAppointments = appointments.filter(
        (appt) => dayjs(appt.date).format("YYYY-MM-DD") === today
    );
    const tomorrowAppointments = appointments.filter(
        (appt) => dayjs(appt.date).format("YYYY-MM-DD") === tomorrow
    );
    const otherUpcomingAppointments = appointments.filter(
        (appt) => dayjs(appt.date).isAfter(tomorrow)
    );

    return (
        <div>
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-6 text-center">Appointment Overview</h1>

                {/* Today's Appointments */}
                <h2 className="text-2xl font-semibold mb-4">Today's Appointments</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    {todayAppointments.length > 0 ? (
                        todayAppointments.map((appt) => (
                            <AppointmentCard key={appt._id} appointment={appt} />
                        ))
                    ) : (
                        <p className="text-gray-500">No appointments for today.</p>
                    )}
                </div>

                {/* Tomorrow's Appointments */}
                <h2 className="text-2xl font-semibold mb-4">Tomorrow's Appointments</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    {tomorrowAppointments.length > 0 ? (
                        tomorrowAppointments.map((appt) => (
                            <AppointmentCard key={appt._id} appointment={appt} />
                        ))
                    ) : (
                        <p className="text-gray-500">No appointments for tomorrow.</p>
                    )}
                </div>

                {/* Other Upcoming Appointments */}
                <h2 className="text-2xl font-semibold mb-4">Other Upcoming Appointments</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {otherUpcomingAppointments.length > 0 ? (
                        otherUpcomingAppointments.map((appt) => (
                            <AppointmentCard key={appt._id} appointment={appt} />
                        ))
                    ) : (
                        <p className="text-gray-500">No other upcoming appointments.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppointmentsDisplay;
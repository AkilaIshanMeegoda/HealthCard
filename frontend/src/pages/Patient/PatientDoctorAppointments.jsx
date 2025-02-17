import React from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PatientDoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchAppointments = () => {
    if (user && user.token) {
      axios
        .get(`http://localhost:3000/appointment/my-appointments/${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          if (res.data.length === 0) {
            setAppointments([]); // Set items to empty if no discounts are found
          } else {
            setAppointments(res.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching items", error);
          if (error.response && error.response.status === 404) {
            // Handle 404 error
            setLoading(false);
          } else {
            // Handle other errors
            toast.error("Failed to fetch items");
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleUpdate = (id) => {
    console.log("Update discount item with id:", id);
    navigate(`/patient/patient-update-appointment/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`http://localhost:3000/appointment/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setAppointments(appointments.filter((item) => item._id !== id));
          toast.success("Item deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting item", error);
          toast.error("Failed to delete item");
        });
    }
  };

  const handlePayment = (id) => {
    navigate(`/patient/appointment-payment/${id}`);
  };

  return (
    <div>
      <Navbar />
      <h1
        className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
        style={{ fontSize: "2rem", marginTop: "30px", marginLeft: "20px" }}
      >
        My Appointments History
      </h1>

      <div className="mx-4 overflow-hidden rounded-lg shadow-lg md:mx-10">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-200">
                <th className="w-2/12 px-1 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                  Appointment Date
                </th>
                <th className="w-2/12 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                  Hospital Name
                </th>
                <th className="w-2/12 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                  Doctor Name
                </th>
                <th className="w-1/12 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                  Payment Amount
                </th>
                <th className="w-2/12 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
                  Payment Status
                </th>
                <th className="w-3/12 px-8 py-2 text-sm font-bold text-center text-gray-600 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {appointments.map((apyt) => (
                <tr key={apyt._id}>
                  <td className="px-4 py-2 text-sm border-b border-gray-200">
                    {apyt.date}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-200">
                    {apyt.hospitalName}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-200">
                    {apyt.doctorName}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-200">
                    {apyt.paymentAmount}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-200">
                    {apyt.status}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdate(apyt._id);
                      }}
                      className="px-4 py-1 mx-2 text-xs font-medium text-white bg-blue-500 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(apyt._id);
                      }}
                      className="px-4 py-1 text-xs font-medium text-white bg-red-500 rounded-lg"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePayment(apyt._id);
                      }}
                      className={`ml-2 py-1 px-4 rounded-lg text-xs font-medium ${apyt.status === "Paid" ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 text-white"
                        }`}
                      disabled={apyt.status === "Paid"}
                    >
                      Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientDoctorAppointments;

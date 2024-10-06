import React from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PatientReports = () => {
  const [reportFiles, setReportsFiles] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchAppointments = () => {
    if (user && user.token) {
      axios
        .get(
          "http://localhost:3000/report/viewMyReports",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.length === 0) {
            setReportsFiles([]); // Set items to empty if no discounts are found
          } else {
            setReportsFiles(res.data);
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

  // Sample data for promotions

  return (
    <div>
      <Navbar />
      <h1
        className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
        style={{
          fontSize: "2rem",
          marginTop: "40px",
          marginBottom: "40px",
          marginLeft: "20px",
        }}
      >
        My Reports
      </h1>

      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        {reportFiles.length === 0 ? (
          <p className="py-4 text-center">No items available.</p>
        ) : (
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                  Title
                </th>
                <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                  Date
                </th>
                <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                  Category
                </th>
                <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                  Description
                </th>
                <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                  Image
                </th>
                <th className="w-1/4 py-2 px-4 text-left text-gray-600 font-bold uppercase text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reportFiles.map((repo) => (
                <tr key={repo._id}>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {repo.titleName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {repo.date}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {repo.category}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    {repo.description}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    <img
                      src={repo.image}
                      alt={repo.title}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button className="py-1 px-4 rounded-lg text-xs font-medium bg-blue-500 mx-2 text-white">
                      Edit
                    </button>
                    <button className="py-1 px-4 rounded-lg text-xs font-medium bg-red-500 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientReports;

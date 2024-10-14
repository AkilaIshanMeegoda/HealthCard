import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";

const Patients = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState([]);

  const fetchPatients = () => {
    user &&
      fetch("http://localhost:3000/user/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPatients(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error("Error fetching items", error);
        });
  };

  const handleViewClick = (patientId) =>{
    navigate(`/staffMember/view-patient/${patientId}`);
  }

  useEffect(() => {
    fetchPatients();
  }, [user]);

  return (
    <div className="min-h-screen">
      <div
        style={{
          marginTop: "24px",
          marginRight: "40px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      ></div>
      <div className="flex justify-between px-8">
        <h1
          className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
          style={{ fontSize: "2rem", marginLeft: "20px" }}
        >
          All Patients <br />
        </h1>
        <div className="relative hidden mt-8 group sm:block">
          <div className="relative text-gray-600 ">
            <input
              className="h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg w-80 focus:outline-none"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              name="search"
              placeholder="Search by patient name"
            />
            <button
              type="submit"
              className="absolute top-0 right-0 mt-3.5 mr-1"
            >
              <svg
                className="w-4 h-4 text-gray-600 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="mx-4 mt-8 overflow-hidden rounded-lg shadow-lg md:mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-[#00135F]">
              <th className="w-3/12 px-4 py-2 text-sm font-bold text-left text-white uppercase">
                Patient Name
              </th>
              <th className="w-3/12 px-4 py-2 text-sm font-bold text-left text-white uppercase">
                Email Address
              </th>
              <th className="w-2/12 px-4 py-2 text-sm font-bold text-left text-white uppercase">
                Address
              </th>
              <th className="w-1/12 px-4 py-2 text-sm font-bold text-left text-white uppercase">
                Age
              </th>
              <th className="w-2/12 px-4 py-2 text-sm font-bold text-left text-white uppercase">
                Contact Number
              </th>
              <th className="w-2/12 px-4 py-2 text-sm font-bold text-center text-white uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {patients.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-2 text-sm font-medium text-center text-gray-600"
                >
                  No patients found.
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient._id}>
                  <td className="px-4 py-2 text-sm border-b border-gray-200">
                    {patient.name}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-200">
                    {patient.email}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-200">
                    {patient.address}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-200">
                    {patient.age}
                  </td>
                  <td className="px-4 py-2 text-sm border-b border-gray-200">
                    {patient.telephone}
                  </td>

                  <td className="flex items-center justify-center px-16 py-2 border-b border-gray-200">
                    <button onClick={(e) => {
                        e.stopPropagation();
                        handleViewClick(patient._id);
                      }} className="px-4 py-1 mx-2 text-sm font-medium text-white bg-green-500 rounded-lg">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;

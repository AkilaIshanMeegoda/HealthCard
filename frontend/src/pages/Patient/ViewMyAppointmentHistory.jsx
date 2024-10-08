// import React from "react";
// import Navbar from "../../components/home/Navbar/Navbar";
// import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ViewMyAppointmentHistory = () => {
//   const [appointments, setAppointments] = useState([]);
//   const { user } = useAuthContext();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   const fetchAppointments = () => {
//     if (user && user.token) {
//       axios
//         .get(`http://localhost:3000/api/promotions/${user.email}`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         })
//         .then((res) => {
//           if (res.data.length === 0) {
//             setAppointments([]); // Set items to empty if no discounts are found
//           } else {
//             setAppointments(res.data);
//           }
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching items", error);
//           if (error.response && error.response.status === 404) {
//             // Handle 404 error
//             setLoading(false);
//           } else {
//             // Handle other errors
//             toast.error("Failed to fetch items");
//             setLoading(false);
//           }
//         });
//     } else {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchAppointments();
//     }
//   }, [user]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   const handleUpdate = (id) => {
//     console.log("Update discount item with id:", id);
//     navigate(`/shopOwner/promotion/update-promotion/${id}`);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this item?")) {
//       axios
//         .delete(`http://localhost:3000/api/promotions/${id}`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         })
//         .then(() => {
//           setAppointments(promotionItems.filter((item) => item._id !== id));
//           toast.success("Item deleted successfully");
//         })
//         .catch((error) => {
//           console.error("Error deleting item", error);
//           toast.error("Failed to delete item");
//         });
//     }
//   };
//   return (
//     <div>
//       <Navbar />
//       <h1
//         className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
//         style={{ fontSize: "2rem", marginTop: "30px", marginLeft: "20px" }}
//       >
//         My Appointments History
//       </h1>

//       <div className="mx-4 overflow-hidden rounded-lg shadow-lg md:mx-10">
//       <div className="overflow-x-auto">
//         <table className="w-full table-fixed">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
//                 Item Name
//               </th>
//               <th className="w-1/4 px-16 py-2 text-sm font-bold text-left text-gray-600 uppercase">
//                 Start Date
//               </th>
//               <th className="w-1/4 py-2 text-sm font-bold text-left text-gray-600 uppercase px-14">
//                 End Date
//               </th>
//               <th className="w-1/4 px-1 py-2 text-sm font-bold text-left text-gray-600 uppercase">
//                 Discount Percentage
//               </th>
//               <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
//                 Discount Price
//               </th>
//               <th className="w-1/4 px-4 py-2 text-sm font-bold text-left text-gray-600 uppercase">
//                 Availability
//               </th>
//               <th className="w-1/4 px-8 py-2 text-sm font-bold text-left text-gray-600 uppercase">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white">
//             {appointments.map((apyt) => (
//               <tr key={apyt._id}>
//                 <td className="py-2 px-4 border-b border-gray-200 text-sm">
//                   {apyt.title}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200 text-sm">
//                   {apyt.description}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200 text-sm">
//                 <img
//                     src={apyt.image}
//                     alt={apyt.title}
//                     style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleUpdate(apyt._id);
//                     }}
//                     className="py-1 px-4 rounded-lg text-xs font-medium bg-blue-500 mx-2 text-white"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(apyt._id);
//                     }}
//                     className="py-1 px-4 rounded-lg text-xs font-medium bg-red-500 text-white"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ViewMyAppointmentHistory;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/home/Home";
import Login from "../components/landingPage/PatientLogin";
import SignUp from "../components/landingPage/PatientSignUp";
import StaffMemberDashboardLayout from "../pages/StaffMember/StaffMemberDashboardLayout";
import StaffMemberDashboard from "../pages/StaffMember/Dashboard";
import AdminDashboardLayout from "../pages//StaffAdmin/AdminDashboardLayout";
import AdminDashboard from "../pages/StaffAdmin/Dashboard";
import DoctorDashboardLayout from "../pages/Doctor/DoctorDashboardLayout";
import DoctorDashboard from "../pages/Doctor/Dashboard";
import AddDashboard from "../pages/StaffAdmin/addDashboard";
import AddDoctors from "../pages/StaffAdmin/addDoctors";
import AddServices from "../pages/StaffAdmin/addServices";
 



function CreateRouter() {
  return createBrowserRouter([
    /*home routes*/
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },

    {
      path: "/staffMember",
      element: <StaffMemberDashboardLayout />,
      children: [
        {
          path: "/staffMember/staffDashboard",
          element: <StaffMemberDashboard />,
        },
      ],
    },

    {
      path: "/admin",
      element: <AdminDashboardLayout />,
      children: [
        {
          path: "/admin/adminDashboard",
          element: <AdminDashboard />,
        },
      ],
    },

    {
      path: "/admin",
      children: [
        {
          path: "/admin/addDashboard",
          element: <AddDashboard />,
        },
      ],
    },

    {
      path: "/admin",
      children: [
        {
          path: "/admin/addDashboard/add-doctors",
          element: <AddDoctors />,
        },
      ],
    },

    {
      path: "/admin",
      children: [
        {
          path: "/admin/addDashboard/add-services",
          element: <AddServices />,
        },
      ],
    },

    {
      path: "/doctor",
      element: <DoctorDashboardLayout />,
      children: [
        {
          path: "/doctor/doctorDashboard",
          element: <DoctorDashboard />,
        },
      ],
    },
  ]);
}
export default CreateRouter;

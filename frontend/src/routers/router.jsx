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
import Patients from "../pages/StaffMember/Patients";
import Appointments from "../pages/StaffMember/Appointments";
import ViewAppointment from "../pages/StaffMember/ViewAppointment";
import PatientDetails from "../pages/StaffMember/PatientDetails";
import Reports from "../pages/StaffMember/Reports";
import AddReport from "../pages/StaffMember/AddReport";

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
          path: "/staffMember/dashboard",
          element: <StaffMemberDashboard />,
        },
        {
          path: "/staffMember/patients",
          element: <Patients />,
        },
        {
          path: "/staffMember/appointments",
          element: <Appointments />,
        },
        {
          path: "/staffMember/view-appointment/:id",
          element: <ViewAppointment />,
        },
        {
          path: "/staffMember/view-patient/:id",
          element: <PatientDetails />,
        },
        {
          path: "/staffMember/reports",
          element: <Reports />,
        },
        {
          path: "/staffMember/add-report/:id",
          element: <AddReport />,
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

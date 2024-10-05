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
import PatientHome from "../pages/Patient/PatientHome";
import PatientAppointments from "../pages/Patient/PatientAppointments";
import PatientReports from "../pages/Patient/PatientReports";
import PatientHospitals from "../pages/Patient/PatientHospitals";

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
        {
          path: "/staffMember/patients",
          element: <Patients />,
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

    {
      path: '/patient/appointments', element: <PatientAppointments />
    },
    {
      path: '/patient/patienthospitals', element: <PatientHospitals />
    },
    {
      path: '/patient/patientreports', element: <PatientReports />
    },
  ]);
}
export default CreateRouter;

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
 

import Patients from "../pages/StaffMember/Patients";

import PatientHome from "../pages/Patient/PatientHome";
import PatientAppointments from "../pages/Patient/PatientAppointments";
import PatientReports from "../pages/Patient/PatientReports";
import PatientHospitals from "../pages/Patient/PatientHospitals";
import PatientDetailsUser from "../pages/Patient/PatientDetails";

import Appointments from "../pages/StaffMember/Appointments";
import ViewAppointment from "../pages/StaffMember/ViewAppointment";
import PatientDetails from "../pages/StaffMember/PatientDetails";
import Reports from "../pages/StaffMember/Reports";
import AddReport from "../pages/StaffMember/AddReport";
import ViewReports from "../pages/StaffMember/ViewReports";
import ReportDetails from "../pages/StaffMember/ReportDetails";

import ViewMyAppointmentHistory from "../pages/Patient/ViewMyAppointmentHistory";
import MaanagePatientProfile from "../pages/Patient/MaanagePatientProfile";

import UpdateReport from "../pages/StaffMember/UpdateReport";




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
        {
          path: "/staffMember/view-reports/:id",
          element: <ViewReports />,
        },
        {
          path: "/staffMember/view-report/:id",
          element: <ReportDetails />,
        },
        {
          path: "/staffMember/update-report/:id",
          element: <UpdateReport />,
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

    {
      path: '/patient/appointments', element: <PatientAppointments />
    },
    {
      path: '/patient/patienthospitals', element: <PatientHospitals />
    },
    {
      path: '/patient/patientreports', element: <PatientReports />
    },
    {
      path: '/patient/mydetails', element: <PatientDetailsUser />
    },
    {
      path: '/patient/myappointmenthistory', element: <ViewMyAppointmentHistory />
    },
    {
      path: '/patient/viewmydetails', element: <MaanagePatientProfile />
    },
  ]);
}
export default CreateRouter;

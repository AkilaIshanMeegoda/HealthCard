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
import DoctorPatients from "../pages/Doctor/Patients";
import DoctorPatientDetails from "../pages/Doctor/PatientDetails";
import DoctorPatientsViewReports from "../pages/Doctor/ViewReports";
import DoctorPatientsViewReport from "../pages/Doctor/ReportDetails";
import DoctorDashboard from "../pages/Doctor/Dashboard";

import AddDashboard from "../pages/StaffAdmin/addDashboard";
import AddDoctors from "../pages/StaffAdmin/addDoctors";
import AddServices from "../pages/StaffAdmin/addServices";
import Analyze from "../pages/StaffAdmin/analyze";
 

import Patients from "../pages/StaffMember/Patients";

import PatientHome from "../pages/Patient/PatientHome";
import PatientAppointments from "../pages/Patient/PatientAppointmentDashBoard";
import PatientReports from "../pages/Patient/PatientTreatmentsAndReports";
import PatientHospitals from "../pages/Patient/PatientHospitals";
import PatientDetailsUser from "../pages/Patient/PatientDetailsDashBoard";
import ServicePayment from "../pages/Patient/ServicePayment";
import DoctorAppointmentPayment from "../pages/Patient/DoctorAppointmentPayment";

import Appointments from "../pages/StaffMember/Appointments";
import ViewAppointment from "../pages/StaffMember/ViewAppointment";
import PatientDetails from "../pages/StaffMember/PatientDetails";
import Reports from "../pages/StaffMember/Reports";
import AddReport from "../pages/StaffMember/AddReport";
import ViewReports from "../pages/StaffMember/ViewReports";
import ReportDetails from "../pages/StaffMember/ReportDetails";
import Payments from "../pages/StaffMember/Payments";
import AppointmentsDisplay from "../pages/StaffMember/AppointmentsDisplay";

// import ViewMyAppointmentHistory from "../pages/Patient/ViewMyAppointmentHistory";
import ManagePatientProfile from "../pages/Patient/ManagePatientDetails";

import UpdateReport from "../pages/StaffMember/UpdateReport";
import AddPrescription from "../pages/Doctor/AddPrescription";
import PrescriptionUsers from "../pages/Doctor/PrescriptionUsers";
import ViewPrescriptions from "../pages/Doctor/ViewPrescriptions";
import PrescriptionDetails from "../pages/Doctor/PrescriptionDetails";
import PatientAddAppointment from "../pages/Patient/PatientAddAppointment";
import PatientUpdateAppointment from "../pages/Patient/PatientUpdateAppointment";


import EditDoctor from "../pages/StaffAdmin/editDoctor";
import DoctorsPage from "../components/patient/DoctorsPage";
import DoctorDetailsPage from "../components/patient/DoctorDetailsPage";

import PatientDoctorAppointments from "../pages/Patient/PatientDoctorAppointments";
import PatientLabReportsDetails from "../pages/Patient/PatientLabReportsDetails";

import UpdateService from "../pages/StaffAdmin/editService";

import AddLabAppointment from "../pages/Patient/AddLabAppointment";
import ServiceDetailsPage from "../components/patient/ServiceDetailsPage";
import AllLabAppointment from "../pages/Patient/AllLabAppointment";
import UpdateLabAppointment from "../pages/Patient/UpdateLabAppointment ";
import LabAppointments from "../pages/StaffMember/LabAppointments";
import PatientPrescriptions from "../pages/Patient/PatientPrescriptions";

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
          // element: <Appointments />,
          element: <AppointmentsDisplay />,
        },
        {
          path: "/staffMember/doctorAppointments",
          // element: <Appointments />,
          element: <Appointments />,
        },
        {
          path: "/staffMember/labAppointments",
          // element: <Appointments />,
          element: <LabAppointments />,
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
        {
          path: "/staffMember/payments",
          element: <Payments />
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
      element: <AdminDashboardLayout />,
      children: [
        {
          path: "/admin/analyze",
          element: <Analyze />,
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
      path: "/admin",
      children: [
        {
          path: "/admin/addDashboard/edit-doctor/:id",
          element: <EditDoctor />,
        },
      ],
    },

    {
      path: "/admin",
      children: [
        {
          path: "/admin/addDashboard/edit-service/:id",
          element: <UpdateService />,
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
        {
          path: "/doctor/addPrescription/:id",
          element: <AddPrescription />,
        },
        {
          path: "/doctor/prescriptionUsers",
          element: <PrescriptionUsers />,
        },
        {
          path: "/doctor/patients",
          element: <DoctorPatients />,
        },
        {
          path: "/doctor/patientDetails/:id",
          element: <DoctorPatientDetails/>,
        },
        {
          path: "/doctor/viewReports/:id",
          element: <DoctorPatientsViewReports />,
        },
        {
          path: "/doctor/viewReport/:id",
          element: <DoctorPatientsViewReport />,
        },
        {
          path: "/doctor/viewPrescriptions/:id",
          element: <ViewPrescriptions />,
        },
        {
          path: "/doctor/viewPrescription/:id",
          element: <PrescriptionDetails />,
        },
      ],
    },{

      path: '/hospital/:hospitalId/doctors', 
      element: <DoctorsPage />  // This is the page showing doctors of the selected hospital
    },
    {
      path: '/doctors/:doctorId', 
      element: <DoctorDetailsPage />  // This is the page showing doctors of the selected hospital

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
    // {
    //   path: '/patient/myappointmenthistory', element: <ViewMyAppointmentHistory />
    // },
    {
      path: '/patient/viewmydetails', element: <ManagePatientProfile />
    },
    {
      path: '/patient/patient-add-appointment', element: < PatientAddAppointment/>
    },
    {
      path: '/patient/patient-add-lab-appointment', element: < AddLabAppointment/>
    },
    {
      path: '/patient/patient-update-appointment/:id', element: < PatientUpdateAppointment/>
    },
    {
      path: '/patient/patient-update-lab-appointment/:id', element: < UpdateLabAppointment/>
    },
    
    {
      path: '/patient/patient-lab-reports-details', element: < PatientLabReportsDetails/>
    },
    {
      path: '/patient/patient-my-prescriptions', element: < PatientPrescriptions/>
    },
    {

      path: '/doctors/:doctorId', 
      element: <DoctorDetailsPage />  
    },
    {
      path: '/patient/patient-doctor-appointments', element: < PatientDoctorAppointments/>
    },
    {
      path: '/patient/patient-lab-appointments', element: <AllLabAppointment />
    },
    {
      path: '/patient/appointment-payment/:id', element: <DoctorAppointmentPayment />
    },
    {
      path: '/patient/service-payment/:id', element: <ServicePayment />
    },

    


    {
      path: '/patient/patient-add-lab-appointment', element: < AddLabAppointment/>
    },
    {

      path: '/services/:serviceId', 
      element: <ServiceDetailsPage />  
    },


  ]);
}
export default CreateRouter;

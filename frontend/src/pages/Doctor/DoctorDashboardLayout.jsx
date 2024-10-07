import React from "react";
import { Outlet } from "react-router";
import SideBar from './SideBar'

const DoctorDashboardLayout = () => {
  return (
    <div className='flex flex-col min-h-screen md:flex-row' style={{
      backgroundSize: "cover",
      backgroundPosition: "50% 10%",
      backgroundRepeat: "no-repeat",
    }}>
        <SideBar/>
        <Outlet/>
    </div>
  )
};

export default DoctorDashboardLayout;

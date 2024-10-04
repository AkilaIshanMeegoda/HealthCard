import React from "react";
import { Outlet } from "react-router";
import SideBar from "./Sidebar";

const AdminDashboardLayout = () => {
  return (
    <div className='flex flex-col md:flex-row' style={{
      backgroundSize: "cover",
      backgroundPosition: "50% 10%",
      backgroundRepeat: "no-repeat",
    }}>
        <SideBar/>
        <Outlet/>
    </div>
  )
};

export default AdminDashboardLayout;

import { MdAddToPhotos } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import React from "react";
import logo from "../../../src/images/logo.png";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useLogout } from "../../hooks/useLogout";

const SideBar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  
  const Menus = [
    { title: "Dashboard", icon: <MdSpaceDashboard />,href:"/admin/addDashboard" },
    { title: "Report", icon: <MdAddToPhotos />,href:"/admin/dashboard" },
    { title: "Staff Members", icon: <FaUserTie />,href:"/admin/reservation/dashboard/manage" },
    { title: "Logout", icon: <IoLogOut /> ,href:"/"},
  ];

  const showSuccess = () => {
    toast.info("Logout successfully!", {
      position: "bottom-right",
      theme: "colored",
      autoClose: 5000,
    });
  };

  const handleClick = (href) => {
    if (href === "/") {
      showSuccess();
      logout();
      navigate(href);
    }
    navigate(href);
  };

  return (
    <div className="pr-16 bg-black shadow-2xl h-full-screen w-72" >
      <div className="flex items-center mb-8">
        <img
          src={logo}
          alt="Logo"
          className="w-24 m-auto mt-4 duration-500 cursor-pointer rounded-xl"
        />
        <h1 className="mr-6 text-2xl font-bold text-white duration-300 origin-left ">
          HealthCard
        </h1>
      </div>
      <ul>
        {Menus.map((menu, index) => (
          <li key={index} onClick={() => handleClick(menu.href)} className="flex items-center p-4 text-xl font-bold text-gray-300 cursor-pointer rounded-2xl gap-x-4 hover:bg-white hover:text-black">
            {menu.icon}
            <span>{menu.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;

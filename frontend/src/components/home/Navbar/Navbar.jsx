import React from "react";
import Logo from "../../../images/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Avatar, Dropdown } from "flowbite-react";
import profile from "../../../images/profile-img2.jpg";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLogout } from "../../../hooks/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const showSuccess = () => {
    toast.info("Logout successfully!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  const handleClick = () => {
    logout();
    showSuccess();
    navigate("/");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-40 duration-200 bg-[#D3E6FF] shadow-md dark:bg-gray-900 dark:text-white">
      <div className="py-2 bg-client-yellow ">
        <div className="container flex items-center justify-between ">
          <div>
            <a href="/" className="flex gap-2 font-bold text - 2xl sm:text-3xl">
              <img src={Logo} alt="Logo" className="w-10 h-10 ml-20" />
              <p className="text-blue-800">HealthCard</p>
            </a>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col md:flex md:flex-row md:items-center md:gap-6 absolute md:relative left-0 w-full md:w-auto p-4 md:p-0 z-50 mr-16`}
          >
            {user && user.userType === "staffMember" && (
              <>
                <a
                  href="/staffMember/staffDashboard"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Dashboard
                </a>
                <a
                  href="/"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Add report
                </a>
                <a
                  href="/"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Patients
                </a>
                <a
                  href="/"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Doctors
                </a>
              </>
            )}

            {user && user.userType === "doctor" && (
              <>
                <a
                  href="/doctor/doctorDashboard"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Dashboard
                </a>
                <a
                  href="/"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Add report
                </a>
                <a
                  href="/"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Patients
                </a>
                <a
                  href="/"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Add prescriptions
                </a>
              </>
            )}

            {user && user.userType === "staffAdmin" && (
              <>
                <a
                  href="/admin/adminDashboard"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Dashboard
                </a>
                <a
                  href="/"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Staff Members
                </a>
                <a
                  href="/"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Reports
                </a>
              </>
            )}

            {user && user.userType === "user" && (
              <>
                <a
                  href="/patient"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Home
                </a>
                <a
                  href="/patient/appointments"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Appointments
                </a>
                <a
                  href="/patient/patienthospitals"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Hospitals
                </a>
                <a
                  href="/patient/patientreports"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Reports
                </a>
                <a
                  href="/"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  About Us
                </a>
              </>
            )}

            {!user && (
              <>
                <a
                  href="/"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Home
                </a>
                <a
                  href="/client/dashboard/shops"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Hospitals
                </a>
                <a
                  href="/login"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  About Us
                </a>
              </>
            )}
          </div>

          {/* search bar and oder button */}
          <div className="flex items-center gap-4">
            <div className="w-36"></div>
            <div className="mr-4">
              {/* sign button */}
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="User settings" img={profile} rounded />}
              >
                {user && (
                  <div>
                    <Dropdown.Header>
                      <span className="block text-sm font-medium truncate">
                        {user.email}
                      </span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={handleClick}>Log out</Dropdown.Item>
                    {user && user.userType === "staffAdmin" ? (
                      <Dropdown.Item href="/">Dashboard</Dropdown.Item>
                    ) : (
                      <Dropdown.Item href="/">Dashboard</Dropdown.Item>
                    )}
                  </div>
                )}
                {!user && (
                  <div>
                    <Dropdown.Item href="/login">Log In</Dropdown.Item>
                    <Dropdown.Item href="/signup">Sign Up</Dropdown.Item>
                  </div>
                )}
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      <div></div>
    </div>
  );
};

export default Navbar;

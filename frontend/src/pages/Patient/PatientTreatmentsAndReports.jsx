import React, { useEffect, useState } from "react";
import Navbar from "../../components/home/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const PatientReports = () => {

  const navigate = useNavigate();

  const handleLabs = () => {
    navigate("/patient/patient-lab-reports-details");
  };
  const handlePrescription = () => {
    navigate("/patient/patient-my-prescriptions");
  };

  return (
    <div>
      <Navbar />
      <h1
        className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
        style={{
          fontSize: "2rem",
          marginTop: "40px",
          marginLeft: "20px",
        }}
      >
        My Reports
      </h1>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1
              className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
              style={{ fontSize: "3rem" }}
            >
             Treatment History and Lab Reports
            </h1>

            {/* <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Treatment History and Lab Reports
            </p> */}

            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <button
                className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                onClick={handleLabs}
              >
                Lab Reports
              </button>

              <button
                className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={handlePrescription}
              >
                Doctor Treatrment Reports
              </button>
            </div>
          </div>

          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://demo.themesberg.com/landwind/images/hero.png"
              alt="hero"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default PatientReports;

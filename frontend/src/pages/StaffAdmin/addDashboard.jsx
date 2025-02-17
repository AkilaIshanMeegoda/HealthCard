import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddDashboard() {
  const navigate = useNavigate();

  const handleAddDoctors = () => {
    navigate('/admin/addDashboard/add-doctors'); // Change this path to your desired route for adding doctors
  };

  const handleAddServices = () => {
    navigate('/admin/addDashboard/add-services'); // Change this path to your desired route for adding services
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 mt-28">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1
              className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
              style={{ fontSize: "3rem" }}
            >
              Manage your<br /> Dashboard efficiently.
            </h1>

            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Organize your tasks by adding doctors and services!
            </p>

            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleAddDoctors}
                className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Add Doctors
              </button>

              <button
                onClick={handleAddServices}
                className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Add Services
              </button>
            </div>
          </div>

          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://media.istockphoto.com/id/1267013330/photo/portrait-of-a-confident-young-female-doctor-at-work.jpg?s=612x612&w=0&k=20&c=_E-ImNGq8ZRzCq3QcKxDjXtk3OWPOvMqzddjGzlad9U="
              alt="doctor"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

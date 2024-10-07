import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";
import appointmentImg from "../../images/appointment.jpg";
import { FaUser } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdOutlineContactPhone } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoTime } from "react-icons/io5";
import { GrStatusInfo } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { GrUserExpert } from "react-icons/gr";
import { MdBedroomParent } from "react-icons/md";
import { CgNotes } from "react-icons/cg";

const ViewAppointment = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/appointment/hospital-appointment/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAppointment(data);
        })
        .catch((error) => {
          console.error("Error fetching item", error);
        });
    }
  }, [user, id]); 

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-20 bg-blue-600">
        <h1 className="pt-4 ml-16 text-3xl text-white">
          Patient Appointment Details
        </h1>
      </div>
      <div>
        <div className="flex justify-center">
          <div>
            <img className="mt-16 ml-16 w-96" src={appointmentImg} />
          </div>
          <div className="p-8 mt-8 ml-16 mr-40">
            <div className="flex">
              <FaUser className="mt-1 mr-4" fontSize="20px" />
              <h1 className="mb-6 text-2xl font-bold">
                Patient Name: {appointment?.userName}
              </h1>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 md:ml-8">
                <div className="flex">
                  <MdOutlinePayments className="mt-1 mr-4 " fontSize="24px" color="red"/>
                  <p className="mb-2 text-2xl font-bold text-red-500">
                    Payment Amount: Rs. {appointment?.paymentAmount}
                  </p>
                </div>
                <div className="flex">
                  <MdEmail className="mr-4 " fontSize="24px" color="blue"/>
                  <p className="mb-2 text-xl font-bold text-blue-600">
                    Email: {appointment?.email}
                  </p>
                </div>
                <div className="flex">
                  <MdOutlineContactPhone className="mr-4 " fontSize="24px" color="blue"/>
                  <p className="mb-2 text-xl font-bold text-blue-600">
                    Contact: {appointment?.contact}
                  </p>
                </div>
                <div className="flex">
                  <BsCalendar2DateFill className="mr-4 " fontSize="24px" />
                  <p className="mb-2 text-xl font-bold text-gray-600">
                    Date: {appointment?.date}
                  </p>
                </div>
                <div className="flex">
                  <IoTime className="mr-4 " fontSize="24px" />
                  <p className="mb-2 text-xl font-bold text-gray-600">
                    Time: {appointment?.time}
                  </p>
                </div>
                <div className="flex">
                  <GrStatusInfo className="mr-4 " fontSize="24px" color="green"/>
                  <p className="mb-2 text-xl font-bold text-green-600">
                    Status: {appointment?.status}
                  </p>
                </div>
                <div className="flex">
                  <FaUserDoctor className="mr-4 " fontSize="24px" />
                  <p className="mb-2 text-xl font-bold text-gray-600">
                    Doctor: {appointment?.doctorName}
                  </p>
                </div>
                <div className="flex">
                  <GrUserExpert className="mr-4 " fontSize="24px" />
                  <p className="mb-2 text-xl font-bold text-gray-600">
                    Specialization: {appointment?.specialization}
                  </p>
                </div>
                <div className="flex">
                  <MdBedroomParent className="mr-4 " fontSize="24px" />
                  <p className="mb-2 text-xl font-bold text-gray-600">
                    Ward No: {appointment?.wardNo}
                  </p>
                </div>
                <div className="flex">
                  <CgNotes className="mr-4 " fontSize="24px" />
                  <p className="mb-2 text-xl font-bold text-gray-600">
                    Notes: {appointment?.notes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;

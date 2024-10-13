import React from "react";
import WhyUsImg from "../../images/whyus.png";
import solutions from "../../images/solutions.png";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";

const Container2 = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    if (user) {
      alert("You are already logged in. Please log out if you want to create a new account.");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="justify-center">
      <p className="pt-10 text-5xl text-center text-blue-700 font-[poppins]">
        Why Choose Us
      </p>
      <div className="flex justify-center w-full">
        <img src={WhyUsImg} />
      </div>
      <p className="pt-10 text-5xl text-center text-blue-700 font-[poppins]">
        Our Solutions
      </p>
      <div className="flex justify-between gap-20 mx-40 h-[600px]">
        <div className="flex-1 mt-20">
          <img src={solutions} className="object-cover" />
        </div>
        <div className="flex-1 mt-40">
          <p className="text-justify">
            Our healthcare platform integrates key modules like EMR, billing,
            pharmacy, and inventory management, streamlining hospital operations
            and improving patient care. It optimizes front desk tasks, automates
            billing processes, and tracks inventory in real time. Accessible via
            web and mobile, it enhances coordination, leading to better outcomes
            and efficiency.
          </p>
          <div className="flex items-center justify-center">
            <button
              onClick={handleCreateAccount}
              className="px-4 py-2 mt-10 text-center text-white bg-green-500 shadow-xl rounded-2xl"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container2;

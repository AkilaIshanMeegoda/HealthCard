import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Container = () => {
  return (
    <div className="w-full min-h-screen bg-[#D3E6FF]">
      <h1 className="font-[poppins] text-center pt-16 text-4xl text-blue-800">
        Our Partnership Hospitals
      </h1>
      <div className="flex justify-between mx-20 mt-20">
        {/*hospital1*/}
        <div>
          <div className="card min-w-[300px] rounded-2xl">
            <img
              className="object-contain w-full h-40"
              src="https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/434676019_841549568011883_3987155695013898762_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFaV80LrmS2apbMHonZ6KRUlby34rgjcnmVvLfiuCNyeZIdWJ_jf1podmDYvxoxcNxEe7WBfhKUdSzA5HVEJbUg&_nc_ohc=CZJY_1C75bIQ7kNvgHlvKaI&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=A4Kwmzz20bD0Ut_89RUhq6J&oh=00_AYAoIT00SY-kVy4d3aEwkfwz7UaJMOmU5fYaaF4nrrn8RA&oe=6711A0CA"
            />
            <div className="flex flex-col gap-3 p-5">
              <div className="flex gap-2 ">
                <FaMapMarkerAlt size={20} color="blue" />
                <span className="badge bg-[#D3E6FF]">Colombo</span>
              </div>

              <h2 className="text-center product-title">Nawaloka Hospital</h2>

              <div>
                <h2 className="px-2 text-sm font-bold text-justify text-gray-500">
                  Nawaloka Hospital in Sri Lanka provides healthcare services
                  with advanced facilities, specialized treatments, and
                  experienced professionals.
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/*hospital2*/}
        <div>
          <div className="card min-w-[300px] rounded-2xl">
            <img
              className="object-contain w-full h-40"
              src="https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/270059778_6752556924786211_6496881281630425489_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE3uWQQmEWin1q5IRVYDlBl4NnSMYr9pPHg2dIxiv2k8bs2Ie8-CWrJQD4WBMquo1imEs7EMYuZ9UwD0T4ftfUO&_nc_ohc=s8ToUVpQzOYQ7kNvgGJfmzF&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=AharXZepcaA7OLqDht9wC2X&oh=00_AYCf38FAUwZxIzz6-k5zCCFIRlLy7jevcLShw0DVYl1Lvg&oe=67118F26"
            />
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt size={20} color="blue" />
                <span className="badge bg-[#D3E6FF]">Colombo</span>
              </div>

              <h2 className="product-title">Durdans Hospital</h2>

              <div>
                <h2 className="px-2 text-sm font-bold text-justify text-gray-500">
                  Durdans Hospital in Sri Lanka offers high-quality healthcare
                  services with modern facilities, specialized treatments, and
                  experienced professionals.
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/*hospital3*/}
        <div>
          <div className="card min-w-[300px] rounded-2xl">
            <img
              className="object-contain w-full h-40"
              src="https://www.seylan.lk/uploads/LANKA-HOSPITAL-.jpg"
            />
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt size={20} color="blue" />
                <span className="badge bg-[#D3E6FF]">Colombo</span>
              </div>

              <h2 className="product-title">Lanka Hospital</h2>

              <div>
                <h2 className="px-2 text-sm font-bold text-justify text-gray-500">
                  Lanka Hospital in Sri Lanka delivers exceptional healthcare
                  services with modern facilities, specialized treatments, and
                  experienced professionals.
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/*hospital4*/}
        <div>
          <div className="card min-w-[300px] rounded-2xl">
            <img
              className="object-contain w-full h-40"
              src="https://upload.wikimedia.org/wikipedia/en/f/f6/Asiri_Hospital_Holdings_logo.png"
            />
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt size={20} color="blue" />
                <span className="badge bg-[#D3E6FF]">Colombo</span>
              </div>

              <h2 className="product-title">Asiri Hospital</h2>

              <div>
                <h2 className="px-2 text-sm font-bold text-justify text-gray-500">
                  Asiri Hospital in Sri Lanka offers advanced healthcare
                  services with modern facilities, specialize treatments, and
                  experienced medical professionals.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button className="px-4 py-2 mt-10 text-center text-white bg-blue-700 shadow-xl rounded-2xl">View Hospitals</button>
      </div>
    </div>
  );
};

export default Container;

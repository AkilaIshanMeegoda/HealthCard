import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Optional if you want autoplay CSS (not mandatory)

import doctor1 from "../../images/doctor (1).jpg";
import doctor2 from "../../images/doctor (2).jpeg";
import doctor3 from "../../images/doctor (3).jpg";
import { Pagination, Autoplay } from 'swiper/modules'; // Import Autoplay module

const SideBar = () => {
  return (
    <div className="w-full bg-fixed"> 
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{ // Enable autoplay
          delay: 2000, // Delay in ms between slides
          disableOnInteraction: false, // Keeps autoplay running even after user interaction
        }}
        modules={[Pagination, Autoplay]} // Include the Autoplay module
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={doctor1} alt="Image 1" className="object-cover w-full h-[640px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={doctor2} alt="Image 2" className="object-cover w-full h-[640px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={doctor3} alt="Image 3" className="object-cover w-full h-[640px]" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SideBar;

import React from "react";
import NavBar from "./Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import SlideBar from "./SlideBar";
import Container from "./Container";
import Container2 from "./Container2";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <div>
      <NavBar />
      <SlideBar/>
      <Container2/>
      <Container/>
      <Footer/>
    </div>
  );
};

export default Home;

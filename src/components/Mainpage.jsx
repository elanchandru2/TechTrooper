import React from "react";
import bgvideo from "../assets/bgvideo.mp4";
import "../styles/Mainpage.css"
import Sub_comp from "./Sub_comp"
import Hey from "../assets/hey.png"
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Carousel } from "react-bootstrap"; // Import Carousel component from react-bootstrap
import ProductCarousel from "./Productcarsoul";

const Mainpage = () => {
  return (
    <>
<div className="whole d-lg-flex flex-lg-row flex-sm-column">
    <div className="container m-lg-5 p-lg-5 m-md-5 p-md-5 m-sm-0 p-sm-0">
  <h1 className="welcome-heading" style={{ fontFamily: "Caveat, cursive" }}>
    Welcome to our world of gadgets
  </h1>
  <p className="welcome-text " style={{width:"100%"}}>
    Step into a realm where innovation and excitement collide. Explore our curated collection of cutting-edge technology, from sleek smartphones to smart home devices, designed to inspire and delight.
  </p>
  <p className="welcome-text" style={{ width: "100%" }}>
  Discover a world where imagination meets innovation. Dive into our carefully crafted assortment of state-of-the-art gadgets, ranging from cutting-edge smartphones to intuitive smart home devices, crafted to ignite your curiosity and captivate your senses.
</p>
<button className="btn btn-outline-dark rounded">Lets get Started</button>

</div>


    <div className="container">
    <img src={Hey} alt="" className="img-fluid h-100 mirrored-image" />

    </div>
    </div>

<div>
  <ProductCarousel/>
</div>
<div>
  <Sub_comp/>
</div>
    </>
  );
};

export default Mainpage;

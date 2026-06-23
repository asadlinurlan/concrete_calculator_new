import React from "react";
import "./Home.css";
import Calculator from "../Calculator/Calculator";
import Img1 from "../Home/img/calc1.webp";
import Img2 from "../Home/img/calc2.webp";
import Img3 from "../Home/img/calc3.webp";
import Img4 from "../Home/img/calc4.webp";
import Img5 from "../Home/img/calc5.webp";
import Img6 from "../Home/img/calc6.webp";

function Home() {
  return (
    <div className="home-page">
      <div className="calculator-container">
        <Calculator />
      </div>
      <div className="images-container">
        <div className="image-row">
          <img src={Img1} alt="Ready-Mixed Concrete" />
          <div className="image-caption"> <strong>Ready-Mixed Concrete</strong></div>
        </div>
        <div className="image-row">
          <img src={Img2} alt="Concrete & Screed Pumps" />
          <div className="image-caption"> <strong> Concrete & Screed Pumps</strong></div>
        </div>
        <div className="image-row">
          <img src={Img3} alt="Screeds" />
          <div className="image-caption"> <strong>Screeds</strong></div>
        </div>
        <div className="image-row">
          <img src={Img4} alt="Transport Division & Other Services" />
          <div className="image-caption"><strong>Transport Division & Other Services</strong></div>
        </div>
      </div>
    </div>
  );
}


export default Home;

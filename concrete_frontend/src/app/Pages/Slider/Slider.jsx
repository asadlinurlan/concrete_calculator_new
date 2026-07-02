import React, { useState } from "react";
import "./Slider.css";
import Carousel from "react-bootstrap/Carousel";
import slider1 from "./img/IMG_3663.HEIC";
import slider2 from "./img/slider4.jpg";
import slider3 from "./img/slider3.jpg";

function Slider() {
  const [index, setIndex] = useState(0);

  // Captions for each slide
  const captions = [
    {
      title: "Müasir Texnologiya",
      description: "Zavodumuz hər layihə üçün yüksək keyfiyyətli beton istehsalını təmin etmək üçün qabaqcıl texnologiyadan istifadə edir.",
    },
    {
      title: "Yüksək Keyfiyyətli Beton",
      description: "Müxtəlif tikinti ehtiyacları üçün davamlı, etibarlı beton təmin edirik — hər dəfə ən yüksək keyfiyyəti zəmanət veririk.",
    },
    {
      title: "Sənayedə Lider Həllər",
      description: "İllərin təcrübəsi ilə sənaye standartlarını müəyyən edən və gözləntiləri aşan beton həlləri təklif edirik.",
    }
  ];

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="slider__container">
      {/* Slider Section */}
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
        <Carousel.Item>
          <div className="carousel-container">
            <img className="d-block w-100" src={slider1} alt="Slide 1" />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="carousel-container">
            <img className="d-block w-100" src={slider2} alt="Slide 2" />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="carousel-container">
            <img className="d-block w-100" src={slider3} alt="Slide 3" />
          </div>
        </Carousel.Item> 
      </Carousel>

      {/* Caption Section */}
      <div className="custom-caption-outside">
        <h3>{captions[index].title}</h3>
        <p>{captions[index].description}</p>
        <a href="#our-solutions" className="cta-btn-outside">Ətraflı</a>
      </div>
    </div>
  );
}

export default Slider;

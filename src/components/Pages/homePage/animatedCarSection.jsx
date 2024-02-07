import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "owl.carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import "owl.carousel/dist/owl.carousel.min.js";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.theme.green.css";
import { BsPersonCircle } from "react-icons/bs";
import carFleetImg1 from '../../images/car-fleet-1.png';
import carFleetImg2 from '../../images/car-fleet-2.png';
import carFleetImg3 from '../../images/car-fleet-3.png';

const AnimatedCarSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.$(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      autoplaySpeed: 3000,
      center: true,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 3,
        },
      },
    });
  }, []);

  const imagesData = [
    // {
    //   url: carFleetImg1,
    //   type: "Sedan",
    // },
    {
      url: carFleetImg2,
      type: "SUV",
    },
    {
      url: carFleetImg3,
      type: "Economy",
    },
    {
      url: carFleetImg1,
      type: "Sedan",
    },
    {
      url: carFleetImg2,
      type: "SUV",
    },
    {
      url: carFleetImg3,
      type: "Economy",
    },
    {
      url: carFleetImg1,
      type: "Sedan",
    },
  ];

  const handleImageClick = (carType) => {
    navigate(`/vehicles?carType=${carType}`);
  };

  return (
    <div>
      <section id="slider" className="pt-5">
        <div className="container">
          <div className="bg-white">
            <h2 className="offer-heading pl-3 bg-white">
              <div className="location-label">
                <div className="styled-label">
                  <BsPersonCircle className="mr-2 home-page-heading-icon" />
                  <b>Our Fleet Cars:</b>
                  <hr className="home-page-heading-underline col-3" />
                </div>
              </div>
            </h2>
            <div className="slider-container">
              <div className="slider">
                <div className="owl-carousel owl-carousel-main-container">
                  {imagesData.map((data, index) => (
                    <div className="animated-imgs-container" key={index} >
                      <div className="slider-card slider-imgs">
                        <h2 className="text-center pt-3">{data.type}</h2>
                        <div className="d-flex justify-content-center align-items-center mb-4">
                          <div className="animated-car-anchor-tag">
                            <img
                              src={data.url}
                              alt={`Slide ${index + 1}`}
                              className="img-fluid slider-item"
                              onClick={() => handleImageClick(data.type)}
                              />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimatedCarSection;

import React from "react";
import SedanFleetCarImg1PNG from "../../images/sedan-fleet-car.jpg";
import SUVFleetCarImg1PNG from "../../images/suv-fleet-car.jpg";
import SevenSeaterFleetCarImg1PNG from "../../images/sevenseater-fleet-car.jpg";
import HatchBackFleetCarImg1PNG from "../../images/hatchback-fleet-car.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from "react-router";

const Carousel = () => {
  const navigate = useNavigate();

  const imagesData = [
    { vehicleCategory: "Sedan", vehicleImage: SedanFleetCarImg1PNG },
    { vehicleCategory: "SUV", vehicleImage: SUVFleetCarImg1PNG },
    { vehicleCategory: "7 Seater", vehicleImage: SevenSeaterFleetCarImg1PNG },
    { vehicleCategory: "Hatchback", vehicleImage: HatchBackFleetCarImg1PNG },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleImageClick = (carType) => {
    console.log("Car type clicked is: ", carType);
    const nextUrl = `/vehicles?carCategory=${carType}`;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "carTypeClick",
      carType: carType,
      navigationValue: carType,
      nextUrl: nextUrl,
    });

    navigate(nextUrl);
  };

  return (
    <div className="pt-4 fleet-car-main-section pb-5">
      <div className="animated-car-container pb-3">
        <div className="container">
          <h2 className="our-fleet-heading-home-page text-center">
            <span>
              <b className="fs-1">OUR FLEET</b>
            </span>
          </h2>

          <Slider {...settings}>
            {imagesData.map((image, index) => (
              <div key={index} className="each-slide-effect p-3">
                <img
                  src={image?.vehicleImage}
                  alt={`${image?.vehicleCategory}`}
                  className="fleet-vehicles-images"
                  title={`${image?.vehicleCategory}`}
                  aria-label={`${image?.vehicleCategory}`}
                  id={`home-page-${image?.vehicleCategory
                    .replace(/\s+/g, "-")
                    .toLowerCase()}-img`}
                  onClick={() => handleImageClick(image?.vehicleCategory)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

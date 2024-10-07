import React from "react";
import SedanFleetCarImg1WebP from "../../images/sedan-fleet-car.webp";
import SUVFleetCarImg1WebP from "../../images/suv-fleet-car.webp";
import SevenSeaterFleetCarImg1WebP from "../../images/sevenseater-fleet-car.webp";
import HatchBackFleetCarImg1WebP from "../../images/hatchback-fleet-car.webp";

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
    {
      vehicleCategory: "Sedan",
      vehicleImgWebP: SedanFleetCarImg1WebP,
      vehicleImage: SedanFleetCarImg1PNG,
    },
    {
      vehicleCategory: "SUV",
      vehicleImgWebP: SUVFleetCarImg1WebP,
      vehicleImage: SUVFleetCarImg1PNG,
    },
    {
      vehicleCategory: "7 Seater",
      vehicleImgWebP: SevenSeaterFleetCarImg1WebP,
      vehicleImage: SevenSeaterFleetCarImg1PNG,
    },
    {
      vehicleCategory: "Hatchback",
      vehicleImgWebP: HatchBackFleetCarImg1WebP,
      vehicleImage: HatchBackFleetCarImg1PNG,
    },
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
                <picture className="rent-exp-pic-container">
                  <source srcSet={image?.vehicleImgWebP} type="image/webp" />
                  <img
                    src={image?.vehicleImage}
                    alt={image?.vehicleCategory}
                    className="fleet-vehicles-images"
                    title={image?.vehicleCategory}
                    aria-label={image?.vehicleCategory}
                    id={`home-page-${image?.vehicleCategory
                      .replace(/\s+/g, "-")
                      .toLowerCase()}-img`}
                    onClick={() => handleImageClick(image?.vehicleCategory)}
                  />
                </picture>
                <span
                  className="visually-hidden"
                  style={{ display: "none" }}
                  aria-hidden="true"
                >
                  {image.vehicleCategory}
                </span>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

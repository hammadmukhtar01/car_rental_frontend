import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import "owl.carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import "owl.carousel/dist/owl.carousel.min.js";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.theme.green.css";
import axios from "axios";

const AnimatedCarSection = () => {
  const navigate = useNavigate();
  const [sedanImg, setSedanImg] = useState("");
  const [suvImg, setSUVImg] = useState("");
  const [hatchBackImg, setHatchBackImg] = useState("");
  const [stationWagonImg, setStationWagonImg] = useState("");

  const [carsData] = useState([]);

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
        "<span class='nav-btn prev-slide'><</span>",
        "<span class='nav-btn next-slide'>></span>",
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

  const fetchCarsData = useCallback(async () => {
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const startDate = new Date().toISOString();
      const endDate = new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).toISOString();
      const url = `https://app.speedautosystems.com/api/services/app/bookingPluginSearch/SearchVehicleRates?startDate=${startDate}&endDate=${endDate}`;

      const response = await axios.post(url, {}, { headers });

      response?.data?.result?.items?.forEach((car) => {
        switch (car.acrissCategory?.name) {
          case "Standard":
            setSedanImg(car?.displayImageUrl);
            break;
          case "Small SUV 5 Seater":
            setSUVImg(car?.displayImageUrl);
            break;
          case "Compact":
            setHatchBackImg(car?.displayImageUrl);
            break;
          case "Fullsize":
            setStationWagonImg(car?.displayImageUrl);
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, []);

  useEffect(() => {
    fetchCarsData();
  }, [fetchCarsData]);

  useEffect(() => {
    if (sedanImg && suvImg && hatchBackImg && stationWagonImg) {
      window.$(".owl-carousel").trigger("refresh.owl.carousel");
    }
  }, [sedanImg, suvImg, hatchBackImg, stationWagonImg]);

  const imagesData = [
    {
      displayImageUrl: sedanImg,
      acrissCategory: "Standard",
    },
    {
      displayImageUrl: suvImg,
      acrissCategory: "Small SUV 5 Seater",
    },
    {
      displayImageUrl: hatchBackImg,
      acrissCategory: "Compact",
    },
    {
      displayImageUrl: stationWagonImg,
      acrissCategory: "Fullsize",
    },
  ];

  carsData?.forEach((car) => {
    const existingIndex = imagesData?.findIndex(
      (item) => item?.acrissCategory === car?.acrissCategory?.name
    );
    if (existingIndex !== -1) {
      imagesData[existingIndex].displayImageUrl = car?.displayImageUrl;
    }
  });

  const mapCategoryToNavigationValue = (category) => {
    switch (category) {
      case "Standard":
        return "Sedan";
      case "Small SUV 5 Seater":
        return "SUV";
      case "Compact":
        return "HatchBack";
      case "Fullsize":
        return "7 Seater";
      default:
        return category;
    }
  };

  const handleImageClick = (carType) => {
    const navigationValue = mapCategoryToNavigationValue(carType);
    console.log("Car type clicked is: ", navigationValue);
    navigate(`/vehicles?carCategory=${navigationValue}`);
  };

  return (
    <div>
      <section id="slider" className="pt-5">
        <div className="container">
          <div className="bg-white">
            <h2 className="offer-heading pl-3 bg-white">
              <div className="styled-label text-center">
                <div className="insta-testimonial-heading-icon-container-div">
                  <span>
                    <b className="fs-3">Fleet Cars</b>
                  </span>
                </div>
              </div>
            </h2>
            <div className="slider-container">
              <div className="slider">
                <div className="owl-carousel owl-carousel-main-container">
                  {imagesData.map((data, index) => (
                    <div className="animated-imgs-container" key={index}>
                      <div className="slider-card slider-imgs">
                        <h2 className="text-center pt-3">
                          {mapCategoryToNavigationValue(data?.acrissCategory)}
                        </h2>
                        <div className="d-flex justify-content-center align-items-center mb-4">
                          <div className="animated-car-anchor-tag">
                            <img
                              src={data?.displayImageUrl}
                              title={`${mapCategoryToNavigationValue(
                                data?.acrissCategory
                              )} Vehicle Category`}
                              alt={`${mapCategoryToNavigationValue(
                                data?.acrissCategory
                              )} Vehicle Category`}
                              className="img-fluid slider-item"
                              onClick={() =>
                                handleImageClick(data?.acrissCategory)
                              }
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

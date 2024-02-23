import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import "owl.carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import "owl.carousel/dist/owl.carousel.min.js";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.theme.green.css";
import { BsPersonCircle } from "react-icons/bs";
import carFleetImg1 from "../../images/suv-car-fleet-1.png";
import carFleetImg2 from "../../images/sedan-car-fleet-2.png";
import carFleetImg3 from "../../images/economy-car-fleet-3.png";
import axios from "axios";

const AnimatedCarSection = () => {
  const navigate = useNavigate();

  const [carsData, setCarsData] = useState([]);
 
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

  const fetchCarsData = useCallback(async () => {
    try {
      const token =
        "pwhUHSoPIOJmECDhAyhlP1X5ZvzD1W3dmhUOdpQ-BQtQzg1PNlv8invCvbT1qk3EsoJfM_v8Pj8ZJsPKXVoC-kZtg0p2mpAu4f5g8LiMWrGbqZ4QRY-1xJRJTcWF-t24jUgdng1-myn-TgDddhkldDmkOufYlMdkGQDpZtnUfQ00qgl58t65VCWwK29g4ZWq_Y9djzMDXsmSARNbtZD4TkjqEtIihGsxcffl8VEdO_f3oqDZamOk-mq9XrzlOxdU76g7WRmubIBctGiJPO8DV5crp-ccVfeZ_3TinZc6pmUABcezl9QxkrcbcgTGrRjMhpdqtXYOworyQjpjOfEhbTHYrkQFw-7yTJOJiUCIUMX05z97fE5DIi7GJg8-PL5xfzUyPgruvfnkHHmlFRWIFOkoEgf7FdcQ3S7EveRJZsHVxCKUKg-Dvjm4k7VyHE3uLhKurIgj4VzVSdRYGVRiggymUxvRT4h5Lr_nh2G1vzIrOG1R5vfb_93Pk5SelyNHoizjG_3nCfGbgWzwQ728Z6Vn22CAcbKemFRF7kVh0mg";
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

      const filteredCarsData = response.data.result.items.filter(
        (car) =>
          car.title === "SUV" ||
          car.title === "Economy" ||
          car.title === "Sedan" ||
          car.title === "HatchBack"
      );
      setCarsData(filteredCarsData);

      // setCarsData(response.data.result.items);
      console.log(
        "Result of all cars in fleeeeeet : ",
        response.data.result.items
      );
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, []);

  useEffect(() => {
    fetchCarsData();
  }, [fetchCarsData]);

  const imagesData = [
    {
      displayImageUrl: carFleetImg2,
      title: "SUV",
    },
    {
      displayImageUrl: carFleetImg3,
      title: "Economy",
    },
    {
      displayImageUrl: carFleetImg1,
      title: "Sedan",
    },
    {
      displayImageUrl: carFleetImg2,
      title: "SUV",
    },
    {
      displayImageUrl: carFleetImg3,
      title: "Economy",
    },
    {
      displayImageUrl: carFleetImg1,
      title: "Sedan",
    },
  ];

  carsData.forEach((car) => {
    const existingIndex = imagesData.findIndex((item) => item.title === car.title);
    if (existingIndex !== -1) {
      imagesData[existingIndex].displayImageUrl = car.displayImageUrl; 
    }
  });

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
                    <div className="animated-imgs-container" key={index}>
                      <div className="slider-card slider-imgs">
                        <h2 className="text-center pt-3">{data?.title}</h2>
                        <div className="d-flex justify-content-center align-items-center mb-4">
                          <div className="animated-car-anchor-tag">
                            <img
                              src={data?.displayImageUrl}
                              alt={`Slide ${index + 1}`}
                              className="img-fluid slider-item"
                              onClick={() => handleImageClick(data?.title)}
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

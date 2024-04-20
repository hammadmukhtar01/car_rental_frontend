import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";

const AnimatedCarSection = () => {
  const navigate = useNavigate();
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    window.$(".owl-carousel").owlCarousel({
      // Owl Carousel initialization
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

      const validTitles = [
        // "SUV",
        // "Economy",
        // "Sedan",
        "Chevrolet",
        "Nissan",
        "Toyota Corolla",
        "HatchBack",
      ];
      const filteredCarsData = response.data.result.items.filter((car) =>
        validTitles.includes(car.title)
      );
      console.log("Filtered -- -- - Result of all cars is : ", filteredCarsData);


      setCarsData(filteredCarsData);
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, []);

  useEffect(() => {
    fetchCarsData();
  }, [fetchCarsData]);

  const handleImageClick = (carType) => {
    navigate(`/vehicles?carType=${carType}`);
  };

  return (
    <div>
      <section id="slider" className="pt-5">
        <div className="container">
          <div className="bg-white">
            <h2 className="offer-heading pl-3 bg-white">
              <div className="styled-label">
                <div className="location-label">
                  <BsPersonCircle className="mr-2 home-page-heading-icon" />
                  <span className="fs-3">Our Fleet Cars:</span>
                  <hr className="home-page-heading-underline" />
                </div>
              </div>
            </h2>
            <div className="slider-container">
              <div className="slider">
                <div className="owl-carousel owl-carousel-main-container">
                  {carsData.map((car, index) => (
                    <div className="animated-imgs-container" key={index}>
                      <div className="slider-card slider-imgs">
                        <h2 className="text-center pt-3">{car.title}</h2>
                        <div className="d-flex justify-content-center align-items-center mb-4">
                          {car.displayImageUrl ? (
                            <div className="animated-car-anchor-tag">
                              <img
                                src={car.displayImageUrl}
                                alt={`Slide ${index + 1}`}
                                className="img-fluid slider-item"
                                onClick={() => handleImageClick(car.title)}
                              />
                            </div>
                          ) : (
                            <p>Image not available</p> // Handle the case where the image is null
                          )}
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

import React, { useState, useEffect, useMemo } from "react";
import Pagination from "./pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "../../../index.css";

const PageSize = 6;

const VehiclesPage = () => {
  const [carsData, setCarsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const durations = ["Day", "Week", "Month"];
  const durationValues = [1, 7, 30];

  const [simpleFeaturesIcons, setSimpleFeaturesIcons] = useState([]);
  const [complexFeaturesIcons, setComplexFeaturesIcons] = useState([]);
  const navigate = useNavigate();

  const fetchSimpleFeaturesIcons = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/simpleFeature/all"
      );
      console.log("Simple Icons Data : ", response.data);
      setSimpleFeaturesIcons(response.data.simpleFeaturesData);
    } catch (error) {
      console.error("Error fetching simple features icons:", error);
    }
  };

  const fetchComplexFeaturesIcons = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/complexFeature/all"
      );
      console.log("Complex Icons Data : ", response.data);
      setComplexFeaturesIcons(response.data.complexFeaturesData);
    } catch (error) {
      console.error("Error fetching complex features icons:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/car/all"
        );
        console.log("Vehicles Page data is: ", response.data);
        setCarsData(response.data.carsData);
        fetchSimpleFeaturesIcons();
        fetchComplexFeaturesIcons();
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchData();
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return carsData.slice(firstPageIndex, lastPageIndex);
  }, [carsData, currentPage]);

  if (!carsData) {
    return <p>Loading...</p>;
  }

  const renderStarRating = (rating) => {
    const filledStars = Math.round(rating);
    const stars = Array.from({ length: 1 }, (_, index) => (
      <FaStar key={index} color={index < filledStars ? "#f0ad4e" : "#929292"} />
    ));
    return stars;
  };

  const handleBooking = (id) => {
    navigate(`/booking/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/vehicleDetails/${id}`);
  };

  return (
    <>
      <div className="vehiclePage-container space-after-navbar pt-5">
        <div className="container22">
          <div className="elementor-widget-container">
            <div className="motors-elementor-widget car-listing-tabs-unit ">
              <div className="car-listing-top-part">
                <div className="found-cars-cloned found-cars-51281 position-right hide-on-mobile"></div>
                <div className="title text-center">
                  <h2>
                    <span style={{ color: "#cc6118" }}>VEHICLES</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row all-cars-details">
            {currentTableData.map((car) => (
              <div key={car.id} className="col-lg-4 col-md-6 col-sm-6 mb-4">
                <div className="card one-car-card">
                  <div className="all-cars-img-div">
                    <a
                      href={`/vehicleDetails/${car.id}`}
                      className="vehicle-img-tag"
                    >
                      <img
                        data-src="https://milelecarrental.com/Thumbnails/TN - ACCENT.jpg"
                        srcSet="https://milelecarrental.com/Thumbnails/TN - ACCENT.jpg 1x,
                        https://milelecarrental.com/Thumbnails/TN - ACCENT.jpg 2x"
                        src="Thumbnails/TN%20-%20ACCENT.jpg"
                        className="all-cars-img"
                        alt="(LHD) HYUNDAI ACCENT 1.4P AT MY2023 - WHITE"
                      />
                    </a>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <h5 className="card-title car-title-div">
                          <b>{car.carName}</b>
                        </h5>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div
                          className="card-text rating-div"
                          style={{ float: "right" }}
                        >
                          {renderStarRating(car.ratingsAverage)}{" "}
                          {car.ratingsAverage}/5 (6)
                        </div>
                      </div>
                    </div>

                    <div className="simple-icon-main-div">
                      <div className="row">
                        {simpleFeaturesIcons.map((simple_icon, index) => (
                          <div
                            key={index}
                            className="col-lg-6 col-md-6 col-sm-12"
                          >
                            <div className="d-flex align-items-center mb-3">
                              <div className="col-lg-3 col-md-6 ">
                                <img
                                  src={`data:${
                                    simple_icon.icon.contentType
                                  };base64,${btoa(
                                    String.fromCharCode(
                                      ...new Uint8Array(
                                        simple_icon.icon.iconData.data
                                      )
                                    )
                                  )}`}
                                  alt={simple_icon.icon.filename}
                                  className="features-icon"
                                />
                              </div>
                              <div className="col-lg-8 col-md-6">
                                <p style={{ color: "gray", margin: 0 }}>
                                  {simple_icon.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <br />

                    <div className="complex-icon-main-div">
                      <div className="row">
                        {complexFeaturesIcons.map((complex_icon, index) => (
                          <div
                            key={index}
                            className="col-lg-6 col-md-6 col-sm-12"
                          >
                            <div className="d-flex align-items-center mb-3">
                              <div className="col-lg-3 col-md-6">
                                <img
                                  src={`data:${
                                    complex_icon.icon.contentType
                                  };base64,${btoa(
                                    String.fromCharCode(
                                      ...new Uint8Array(
                                        complex_icon.icon.iconData.data
                                      )
                                    )
                                  )}`}
                                  alt={complex_icon.icon.filename}
                                  className="features-icon"
                                />
                              </div>
                              <div className="col-lg-8 col-md-6">
                                <p style={{ color: "gray", margin: 0 }}>
                                  {complex_icon.value} {complex_icon.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="price-day-main-div">
                      <div className="row">
                        {durations.map((duration, index) => (
                          <div
                            key={index}
                            className="col-lg-4 col-md-4 col-sm-4"
                          >
                            <div className="card">
                              <div className="card-body price-day-div">
                                <div className="card-text">
                                  <p style={{ color: "gray" }}>
                                    Per {duration}
                                  </p>
                                  <del
                                    style={{
                                      textDecorationColor: "red",
                                      color: "#cc6119",
                                    }}
                                  >
                                    {car.originalPrice * durationValues[index]}{" "}
                                    AED
                                  </del>{" "}
                                  <p style={{ color: "green" }}>
                                    {car.salePrice * durationValues[index]} AED{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <br />

                    <br />
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleDetails(car.id)}
                        >
                          More Details{" "}
                        </button>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <button
                          className="btn btn-primary booking-button"
                          onClick={() => handleBooking(car.id)}
                        >
                          Start Booking{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={carsData.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <br />
      </div>
    </>
  );
};

export default VehiclesPage;

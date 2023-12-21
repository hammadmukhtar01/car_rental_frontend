import React, { useState, useEffect, useMemo } from "react";
import Pagination from "./pagination";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "../../../index.css";

const PageSize = 6;

const VehiclesPage = () => {
  const [carsData, setCarsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const durations = ["Day", "Week", "Month"];
  const durationValues = [1, 7, 30];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/car/getAllCars"
        );
        console.log("Vehicles Page data is: ", response.data);
        setCarsData(response.data.carsData);
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

  return (
    <>
      <div className="container">
        <h5
          style={{
            fontSize: "30px",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <b>VEHICLES</b>
        </h5>
        <div className="row all-cars-details">
          {currentTableData.map((car) => (
            <div key={car.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card one-car-card">
                <a href="/vehicleDetails" className="vehicle-img-tag">
                  <img
                    data-src="https://milelecarrental.com/Thumbnails/TN - ACCENT.jpg"
                    srcSet="https://milelecarrental.com/Thumbnails/TN - ACCENT.jpg 1x,
                        https://milelecarrental.com/Thumbnails/TN - ACCENT.jpg 2x"
                    src="Thumbnails/TN%20-%20ACCENT.jpg"
                    className=""
                    alt="(LHD) HYUNDAI ACCENT 1.4P AT MY2023 - WHITE"
                  />
                </a>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <h5 className="card-title car-title-div">
                        <b>{car.carName}</b>
                      </h5>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div
                        className="card-text rating-div"
                        style={{ float: "right" }}
                      >
                        {renderStarRating(car.ratingsAverage)}{" "}
                        {car.ratingsAverage}/5 (6)
                      </div>
                    </div>
                  </div>

                  <div className="container">
                    <div className="row">
                      {durations.map((duration, index) => (
                        <div key={index} className="col-lg-4 col-md-4">
                          <div className="card">
                            <div className="card-body price-day-div">
                              <p className="card-text">
                                <p style={{ color: "gray" }}>Per {duration}</p>
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
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
<br />
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <a href="/vehicleDetails" className="btn btn-primary">
                        More Details{" "}
                        <span className="fas fa-arrow-right ps-2"></span>
                      </a>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <a href="/booking" className="btn btn-primary">
                        Start Booking{" "}
                        <span className="fas fa-arrow-right ps-2"></span>
                      </a>
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
    </>
  );
};

export default VehiclesPage;

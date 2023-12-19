import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../index.css";

const VehiclesPage = () => {
  const [carsData, setCarsData] = useState([]);

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

  if (!carsData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="all-vehicles-container">
      <h5
        style={{
          fontSize: "30px",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <b>VEHICLES</b>
      </h5>
      {carsData.map((car) => (
        <div
          key={car.id}
          className="listing-list-loop stm-listing-directory-list-loop stm-isotope-listing-item"
        >
          <div className="image">
            <a href="/vehicleDetails" className="rmv_txt_drctn">
              <div className="image-inner interactive-hoverable">
                <div className="hoverable-wrap">
                  <div className="hoverable-unit active">
                    <div className="thumb">
                      <img
                        data-src="https://milelecarrental.com/Thumbnails/TN - ACCENT.jpg"
                        srcSet="https://milelecarrental.com/Thumbnails/TN - ACCENT.jpg 1x,
                        https://milelecarrental.com/Thumbnails/TN - ACCENT.jpg 2x"
                        src="Thumbnails/TN%20-%20ACCENT.jpg"
                        className="img-responsive"
                        alt="(LHD) HYUNDAI ACCENT 1.4P AT MY2023 - WHITE"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="content">
            <div className="meta-top">
              <div className="price discounted-price">
                <div className="sale-price">{car.salePrice} AED Daily</div>
                <div className="sale-price">{car.salePrice * 7} AED Weekly</div>
                <div className="sale-price">
                  {car.salePrice * 30} AED Monthly
                </div>
              </div>
              <div className="title heading-font">
                <a href="/vehicleDetails" className="rmv_txt_drctn">
                  {car.carName}
                </a>
              </div>
            </div>
            <div style={{ color: "#cc6119", marginBottom: "5px" }}>
              {" "}
              Features
            </div>

            <div className="meta-middle" style={{ marginBottom: "0px" }}>
              {car.detailsFeatures.map((feature, index) => (
                <div key={index} className="meta-middle-unit font-exists drive">
                  <div className="meta-middle-unit-top">
                    <div className="name">{feature}</div>
                  </div>
                  {/* Assuming the API returns values for each feature */}
                  <div className="value h5">{/* Render the value here */}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehiclesPage;

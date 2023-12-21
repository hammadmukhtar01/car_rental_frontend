import React from "react";
import "./bookingDetails.css";

const PaymentPage = () => {
  return (
    <>
      <div className="container"  style={{padding: "50px"}}>
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
        <div className="row m-0">
          <div className="col-lg-7 pb-5 pe-lg-5">
            <div className="row">
              <div className="col-12 p-5">
                <img
                  src="https://www.freepnglogos.com/uploads/honda-car-png/honda-car-upcoming-new-honda-cars-india-new-honda-3.png"
                  alt=""
                />
              </div>
              <div className="row m-0 bg-light">
                <div className="col-md-4 col-6 ps-30 pe-0 my-4">
                  <p className="text-muted">Mileage</p>
                  <p className="h5">
                    25000<span className="ps-1">Km</span>
                  </p>
                </div>
                <div className="col-md-4 col-6  ps-30 my-4">
                  <p className="text-muted">Transmission</p>
                  <p className="h5 m-0">Manual</p>
                </div>
                <div className="col-md-4 col-6 ps-30 my-4">
                  <p className="text-muted">Drive unit</p>
                  <p className="h5 m-0">Front</p>
                </div>
                <div className="col-md-4 col-6 ps-30 my-4">
                  <p className="text-muted">Body</p>
                  <p className="h5 m-0">Coupe</p>
                </div>
                <div className="col-md-4 col-6 ps-30 my-4">
                  <p className="text-muted">Color</p>
                  <p className="h5 m-0">White</p>
                </div>
                <div className="col-md-4 col-6 ps-30 my-4">
                  <p className="text-muted">Daily UI</p>
                  <p className="h5 m-0">#002</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 p-0 ps-lg-4">
            <div className="row m-0">
              <div className="col-12 px-4">
                <div className="">
                  <div className="booking-price-evaluation">
                    <div className="price-row" style={{ lineHeight: "300%" }}>
                      <span className="price-label">Actual Price:</span>
                      <span className="price-value">$100</span>{" "}
                    </div>

                    <div className="price-row" style={{ lineHeight: "300%" }}>
                      <span className="price-label">Discount Price:</span>
                      <span className="price-value">$80</span>{" "}
                    </div>

                    <hr />

                    <div
                      className="total-price-row"
                      style={{ lineHeight: "100%", fontSize: "16px" }}
                    >
                      <span className="price-label">Total Price:</span>
                      <span className="price-value">
                        <b>$80</b>
                      </span>{" "}
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="col-12 px-0">
                <div className="row bg-light m-0">
                  <div className="col-12 px-4 my-4">
                    <h4 className="fw-bold">Payment Detail:</h4>
                  </div>
                  <div className="col-12 px-4">
                    <div className="d-flex  mb-4">
                      <span className="">
                        <p className="payment-text">Card number</p>
                        <input
                          className="form-control"
                          type="text"
                          value="4485 6888 2359 1498"
                          placeholder="1234 5678 9012 3456"
                        />
                      </span>
                      <div className=" w-100 d-flex flex-column align-items-end">
                        <p className="payment-text">Expires</p>
                        <input
                          className="form-control2"
                          type="text"
                          value="01/2020"
                          placeholder="MM/YYYY"
                        />
                      </div>
                    </div>
                    <div className="d-flex mb-5">
                      <span>
                        <p className="payment-text">Cardholder Name</p>
                        <input
                          className="form-control"
                          type="text"
                          value="David J.Frias"
                          placeholder="Name"
                        />
                      </span>
                      <div className="w-100 d-flex flex-column align-items-end">
                        <p className="payment-text">CVC</p>
                        <input
                          className="form-control3"
                          type="text"
                          value="630"
                          placeholder="XXX"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row m-0">
                  <div className="col-12  mb-4 p-0">
                    <div className="btn btn-primary">
                      {" "}
                      Purchase <span className="fas fa-arrow-right ps-2"></span>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;

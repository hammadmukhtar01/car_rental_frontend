import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const VehicleDetails = ({ nextStep }) => {
  const additionalCharges = [
    {
      _id: 1,
      name: "Charge 1",
      value: 200,
    },

    {
      _id: 2,
      name: "Charge 2",
      value: 70,
    },

    {
      _id: 3,
      name: "Charge 3",
      value: 100,
    },
  ];

  const images = [
    {
      id: "12",
      author: "Paul Jarvis",
      width: 250,
      height: 167,
      url: "https://unsplash.com/photos/I_9ILwtsl_k",
      download_url: "https://picsum.photos/id/12/2500/1667",
    },
    {
      id: "13",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/3MtiSMdnoCo",
      download_url: "https://picsum.photos/id/13/2500/1667",
    },
    {
      id: "14",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/IQ1kOQTJrOQ",
      download_url: "https://picsum.photos/id/14/2500/1667",
    },
    {
      id: "15",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/NYDo21ssGao",
      download_url: "https://picsum.photos/id/15/2500/1667",
    },

    {
      id: "15",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/NYDo21ssGao",
      download_url: "https://picsum.photos/id/15/2500/1667",
    },
    {
      id: "14",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/IQ1kOQTJrOQ",
      download_url: "https://picsum.photos/id/14/2500/1667",
    },
    {
      id: "14",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/IQ1kOQTJrOQ",
      download_url: "https://picsum.photos/id/14/2500/1667",
    },
    {
      id: "14",
      author: "Paul Jarvis",
      width: 2500,
      height: 1667,
      url: "https://unsplash.com/photos/IQ1kOQTJrOQ",
      download_url: "https://picsum.photos/id/14/2500/1667",
    },
  ];

  return (
    <div>
      <div className="vehicle-details-location-main-div">
        <Container fluid>
          <>
            <div className="step1-car-location-details-container">
              <div className="step1-location-details">
                <Row>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <div className="pickup-location-div">
                      <span className="location-heading">Pickup Location</span>
                      <h4 className="location-value">
                        Sharja Airport - Terminal 1
                      </h4>
                      <span className="city-name">City name</span>
                      <div>
                        <span className="pickup-location-value">
                          05 Jan 2024 11:00 am
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <div className="dropoff-location-div">
                      <span className="location-heading">Pickup Location</span>
                      <h4 className="location-value">
                        Sharja Airport - Terminal 1
                      </h4>
                      <span className="city-name">City name</span>
                      <div>
                        <span className="dropoff-location-value">
                          05 Jan 2024 7:00 pm
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <br />
              <div className="step1-car-details">
                <Row>
                  <h4 className="step1-car-name">Car Name</h4>
                  <span className="step1-car-type ">Car Type </span>
                  <Col lg={6} md={12} sm={12} xs={12}>
                    <div className="car-imgs-details-container">
                      <div className="car-img-container">
                        <Row>
                          <Col lg={8} md={8} sm={12} xs={12}>
                            <div className="pt-3">
                              <div className="carousel-container">
                                <Carousel className="crsl">
                                  {images.map((image) => (
                                    <img
                                      key={image.id}
                                      src={image.download_url}
                                      alt={image.author}
                                    ></img>
                                  ))}
                                </Carousel>
                              </div>
                            </div>
                          </Col>

                          <Col lg={4} md={4} sm={12} xs={12}>
                            <div className="car-features-main-container">
                              Features Icons:
                              <div className="car-features-div">
                                <Container fluid>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                  <div>Feature 1</div>
                                </Container>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <div className="vl"></div>
                  <Col lg={6} md={12} sm={12} xs={12}>
                    <div className="car-prices-details-container">
                      <h4>
                        <b>Prices:</b>
                      </h4>
                      <div className="total-days-row">
                        <span className="total-days-label">Total Days</span>
                        <span className="total-days-value">3 days</span>
                      </div>
                      <div className="total-days-div">
                        <div className="price-details-div col-lg-12">
                          <div className="booking-price-evaluation">
                            <div className="booking-detail-heading">
                              Booking Details:
                            </div>
                            {/* {data && data.additionalCharges && ( */}
                            <>
                              {additionalCharges.map((charge) => (
                                <div
                                  key={charge._id}
                                  className="price-row p-1"
                                  style={{ lineHeight: "300%" }}
                                >
                                  <span className="price-label">
                                    {charge.name}:
                                  </span>
                                  <div className="">
                                    AED{" "}
                                    <span className="charges-value pl-1">{`${charge.value}`}</span>
                                  </div>
                                </div>
                              ))}
                              <hr />
                            </>
                            {/* )} */}
                            <div
                              className="total-price-row p-1"
                              style={{ lineHeight: "100%", fontSize: "16px" }}
                            >
                              <span className="sub-total-price-label">
                                Sub Total
                              </span>
                              <div className="">
                                AED{" "}
                                <span className="sub-total-price-value pl-1">
                                  {" "}
                                  234
                                </span>
                              </div>
                            </div>
                            <div
                              className="total-price-row p-1"
                              style={{ lineHeight: "100%", fontSize: "16px" }}
                            >
                              <div>
                                <span className="sub-total-price-label">
                                  Tax Total
                                </span>{" "}
                                (5% of 234)
                              </div>
                              <div className="">
                                AED{" "}
                                <span className="sub-total-price-value pl-1">
                                  {" "}
                                  56
                                </span>
                              </div>
                            </div>
                            <hr />

                            <div
                              className="total-price-row p-1"
                              style={{ lineHeight: "100%", fontSize: "16px" }}
                            >
                              <span className="grand-total-price-label">
                                Grand Total
                              </span>
                              <div className="">
                                AED{" "}
                                <span className="grand-total-price-value pl-1">
                                  {" "}
                                  310
                                </span>
                              </div>
                            </div>
                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </>
        </Container>
        {/* <button
          type="button"
          className="action-button next mt-5"
          onClick={nextStep}
        >
          Continue
        </button> */}
      </div>
    </div>
  );
};

export default VehicleDetails;

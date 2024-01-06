import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const VehicleDetails = ({ nextStep }) => {
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const couponsData = [
    {
      name: "ABC123",
      value: 20,
    },

    {
      name: "NEW40",
      value: 40,
    },
  ];

  const applyCoupon = (e) => {
    e.preventDefault();

    const foundCoupon = couponsData.find(
      (coupon) => coupon.name === couponCode
    );

    if (foundCoupon) {
      setAppliedCoupon(foundCoupon);
      setIsCouponApplied(true);
    }
  };

  const removeCoupon = (e) => {
    setAppliedCoupon(null);
    setIsCouponApplied(false);
    e.preventDefault();
  };

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

  const totalDays = 3;
  const totalPrice = 90;
  const totalCharges = totalDays * totalPrice;

  const calculateTotalPrice = () => {
    if (additionalCharges) {
      return additionalCharges.reduce(
        (total, charge) => total + charge.value,
        0
      );
    }
    return 0;
  };

  const subTotalValue = calculateTotalPrice() + totalCharges;
  const taxTotal = Math.floor((5 * subTotalValue) / 100);
  const grandTotalPrice = subTotalValue + taxTotal;

  const grandTotalDiscountedValue = () => {
    if (appliedCoupon) {
      const discountedValue = Math.ceil(
        (appliedCoupon.value * grandTotalPrice) / 100
      );
      return discountedValue;
    }
    return 0;
  };

  const grandTotalPriceWithDiscount =
    grandTotalPrice - grandTotalDiscountedValue();

  return (
    <div>
      <div className="vehicle-details-location-main-div p-3">
        <Container fluid className="pt-4">
          <>
            <div className="step1-car-location-details-container">
              <div className="step1-location-details p-3">
                <Row>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <div className="pickup-location-div">
                      <span className="location-heading">Pickup Location</span>
                      <h5 className="location-value">
                        Sharja Airport - Terminal 1
                      </h5>
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
                      <h5 className="location-value">
                        Sharja Airport - Terminal 1
                      </h5>
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
              <div className="step1-car-details p-4">
                <Row>
                  <h4 className="step1-car-name">Car Name</h4>
                  <span className="step1-car-type ">Car Type </span>
                  <Col lg={7} md={12} sm={12} xs={12}>
                    <div className="car-imgs-details-container">
                      <div className="car-img-container">
                        <Row>
                          <Col lg={9} md={9} sm={12} xs={12}>
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

                          <Col lg={3} md={3} sm={12} xs={12}>
                            <div className="car-features-main-container ">
                              <span className="features-icons-heading">
                                <b>Features Icons:</b>
                              </span>
                              <hr className="hr-line-heading-scroll" />
                              <div className="car-features-div mt-2">
                                <Container
                                  fluid
                                  className="features-scroll-container"
                                >
                                  {Array.from({ length: 27 }, (_, index) => (
                                    <Row>
                                      <Col lg={12} md={12} sm={12} xs={12}>
                                        <div
                                          key={index}
                                          className="features-values"
                                        >
                                          Feature {index < 9 && 0}
                                          {index + 1}
                                        </div>
                                      </Col>
                                    </Row>
                                  ))}
                                </Container>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <hr />

                        <div className="car-features-description-main-div2 p-2">
                          <div className="features-sub-div">
                            <span className="car-features-div2-heading">
                              Car Features:{" "}
                            </span>
                            <div className="car-features-text-2">
                              Air Condtioner, Central Lock, Power Windows, Power
                              Steering, Radio
                            </div>
                          </div>
                          <br />
                          <div className="car-description-div">
                            <div className="car-description-div2-heading m-2">
                              Description:{" "}
                            </div>
                            <hr className="hr-line-heading-scroll" />

                            <div>
                              <div className="car-description-text-2">
                                Complete Description of Car. Lorem ipsum dolor
                                sit amet consectetur adipisicing elit. A
                                sapiente ducimus qui aliquam in quibusdam
                                quisquam neque illum incidunt. Nostrum pariatur
                                in sed ipsam ad nisi dolores possimus corrupti
                                asperiores? Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Dolores hic cumque
                                eum accusantium debitis corrupti dicta
                                cupiditate quibusdam officia? Vitae quod vero
                                autem laudantium neque! Qui sint quisquam
                                asperiores dolore! Lorem, ipsum dolor sit amet
                                consectetur adipisicing elit. Molestias suscipit
                                vitae maiores animi dignissimos quam labore
                                neque accusamus possimus quo ipsum maxime illo
                                quisquam, reiciendis rerum nemo aspernatur
                                deserunt! Ipsa? Lorem ipsum dolor sit amet
                                consectetur, adipisicing elit. Eos maiores qui
                                ullam vel rem veniam accusantium animi fuga,
                                obcaecati quaerat nisi, sint, omnis reiciendis
                                numquam ratione repellat error tempore expedita!
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Exercitationem dolores magnam
                                eligendi, repellendus mollitia fuga nam aperiam
                                odit fugit est corporis, odio aut perferendis,
                                amet hic. Obcaecati laboriosam pariatur
                                consequuntur.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <div className="vertical-line-car-details-page"></div>
                  <Col lg={5} md={12} sm={12} xs={12}>
                    <div className="car-prices-details-container p-5">
                      <h4>
                        <b>Prices:</b>
                      </h4>
                      <div className="total-days-row">
                        <span className="total-days-label">Total Days</span>
                        <span className="total-days-value">3 days</span>
                      </div>
                      <div className="total-days-div">
                        <div className="price-details-div col-lg-12">
                          <div className="booking-charges-evaluation-step1">
                            <div className="booking-detail-heading">
                              Booking Details:
                            </div>
                            <div
                              className="price-row p-1"
                              style={{ lineHeight: "300%" }}
                            >
                              <span className="price-label">
                                Rental Charges / {totalDays} days
                              </span>
                              <div className="">
                                AED{" "}
                                <span className="charges-value pl-1">
                                  {totalCharges}
                                </span>
                              </div>
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
                            <div className="charges-section-2">
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
                                    {subTotalValue}
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
                                </div>
                                <div className="">
                                  AED{" "}
                                  <span className="sub-total-price-value pl-1">
                                    {" "}
                                    {taxTotal}
                                  </span>
                                </div>
                              </div>
                              <span> (5% of {subTotalValue})</span>
                              <div className="coupon-main-div pt-3">
                                <Row>
                                  <Col xs={12} className="coupon-label-div">
                                    <span className="coupon-label">
                                      Coupon:
                                    </span>
                                  </Col>
                                </Row>
                                <Row className="coupon-input-fields-div">
                                  <Col lg={7} md={8} sm={7} xs={10}>
                                    <input
                                      type="text"
                                      placeholder="Coupon Code"
                                      className="form-control"
                                      value={couponCode}
                                      onChange={(e) =>
                                        setCouponCode(e.target.value)
                                      }
                                    />
                                  </Col>
                                  <Col
                                    lg={4}
                                    md={4}
                                    sm={4}
                                    xs={12}
                                    className="coupon-apply-button-div"
                                  >
                                    {isCouponApplied ? (
                                      <>
                                        <button
                                          className="ml-2 btn btn-danger"
                                          onClick={removeCoupon}
                                        >
                                          Remove
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        className="ml-2 btn btn-success"
                                        onClick={applyCoupon}
                                      >
                                        Apply
                                      </button>
                                    )}
                                  </Col>
                                </Row>
                              </div>
                            </div>
                            <hr />

                            {isCouponApplied && appliedCoupon && (
                              <div className="coupon-discount-main-div-container">
                                <div
                                  className="total-price-row p-1"
                                  style={{
                                    lineHeight: "100%",
                                    fontSize: "16px",
                                  }}
                                >
                                  <span className="grand-total-price-label">
                                    Grand Total
                                  </span>
                                  <div className="del-value-main-div pb-3">
                                    AED{" "}
                                    <span className="coupon-discount-value">
                                      -{appliedCoupon.value}%
                                    </span>
                                    <span className="deleted-grand-total-price-value pl-1">
                                      {" "}
                                      {grandTotalPrice}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className="total-price-row p-1"
                                  style={{
                                    lineHeight: "100%",
                                    fontSize: "16px",
                                  }}
                                >
                                  <span className="discount-price-label">
                                    Total Discount
                                  </span>
                                  <div className="del-value-main-div pb-3">
                                    AED{" "}
                                    <span className="discounted-value">
                                      -{grandTotalDiscountedValue()}
                                    </span>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            )}
                            <div
                              className="total-price-row p-1"
                              style={{ lineHeight: "100%", fontSize: "16px" }}
                            >
                              <span className="grand-total-price-label">
                                Grand Total Price
                              </span>
                              <div className="">
                                AED{" "}
                                <span className="grand-total-price-value pl-1">
                                  {" "}
                                  {grandTotalPriceWithDiscount}
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
                <div className="booking-button-main-div-step1 d-flex justify-content-center pb-2">
                  <Col lg={3} md={4} sm={6} xs={8}>
                    <Button
                      variant="primary"
                      className="booking-text next"
                      onClick={nextStep}
                    >
                      Start Booking
                    </Button>
                  </Col>
                </div>
              </div>
            </div>
          </>
        </Container>
      </div>
    </div>
  );
};

export default VehicleDetails;

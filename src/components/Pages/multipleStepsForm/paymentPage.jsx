import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

const PaymentPage = ({ prevStep }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const handlePurchase = async () => {
    alert("Purchase Message");
  };

  return (
    <>
      <div
        className="payment-container"
        style={{ padding: "20px 50px 20px 50px" }}
      >
        <div className="elementor-widget-container">
          <div className="motors-elementor-widget car-listing-tabs-unit ">
            <div className="car-listing-top-part">
              <div className="found-cars-cloned found-cars-51281 position-right hide-on-mobile"></div>
              <div className="title text-center">
                <h2>
                  <span style={{ color: "#cc6118" }}>Payment Page</span>
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
              <div className=" px-0">
                <div className="row bg-light pb-5 pl-3 pr-3">
                  <div className="col-12 px-4 my-4">
                    <h4 className="fw-bold">Payment Detail:</h4>
                  </div>
                  <br />
                  <Col xxl={12} lg={2} md={5} sm={6} xs={12}>
                    <Form.Group controlId="formKeyword">
                      <div className="location-label">
                        <label className="styled-label">
                          <b>Card Number</b>
                        </label>
                      </div>
                      <div className="custom-dropdown-container">
                        <input
                          className="form-control-location mt-2 col-12"
                          id="cardnumber"
                          name="cardnumber"
                          required
                          placeholder="1234 5678 9012 3456"
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </Col>

                  <Col xxl={6} lg={2} md={5} sm={6} xs={12}>
                    <Form.Group controlId="formKeyword">
                      <div className="location-label">
                        <label className="styled-label">
                          <b> Expiry Month</b>
                        </label>
                      </div>
                      <div className="custom-dropdown-container">
                        <input
                          className="form-control-location mt-2 col-12"
                          id="expMonth"
                          name="expMonth"
                          type="number"
                          required
                          placeholder="mm"
                          min={1}
                          max={12}
                          value={expMonth}
                          onChange={(e) => setExpMonth(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </Col>

                  <Col xxl={6} lg={2} md={5} sm={6} xs={12}>
                    <Form.Group controlId="formKeyword">
                      <div className="location-label">
                        <label className="styled-label">
                          <b> Expiry Year</b>
                        </label>
                      </div>
                      <div className="custom-dropdown-container">
                        <input
                          className="form-control-location mt-2 col-12"
                          id="expYear"
                          name="expYear"
                          type="number"
                          required
                          placeholder="yy"
                          value={expYear}
                          onChange={(e) => setExpYear(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </Col>

                  <Col xxl={6} lg={2} md={5} sm={6} xs={12}>
                    <Form.Group controlId="formKeyword">
                      <div className="location-label">
                        <label className="styled-label">
                          <b>Cardholder Name</b>
                        </label>
                      </div>
                      <div className="custom-dropdown-container">
                        <input
                          className="form-control-location mt-2 col-12"
                          id="cardholderName"
                          name="cardholderName"
                          type="text"
                          required
                          placeholder="Card Holder Full Name"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </Col>

                  <Col xxl={6} lg={2} md={5} sm={6} xs={12}>
                    <Form.Group controlId="formKeyword">
                      <div className="location-label">
                        <label className="styled-label">
                          <b>CVC</b>
                        </label>
                      </div>
                      <div className="custom-dropdown-container">
                        <input
                          className="form-control-location mt-2 col-12"
                          id="cvc"
                          name="cvc"
                          type="text"
                          required
                          placeholder="###"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </div>
                <br />
                <div className="row col-lg-6 col-md-6 ">
                  <button className="animated-button" onClick={handlePurchase}>
                    {" "}
                    <span className="button-text-span">
                      <span className="transition"></span>
                      <span className="gradient"></span>
                      <span className="label"> Pay & Book</span>
                    </span>{" "}
                  </button>
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

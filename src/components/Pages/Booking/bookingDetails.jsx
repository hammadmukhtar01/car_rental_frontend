import React, { useState } from "react";
import { Link } from "react-router-dom";

const BookingDetails = () => {
  const [customerId, setCustomerId] = useState("");
  const [carId, setCarId] = useState("");
  const [additionalCharges, setAdditionalCharges] = useState([
    { name: "", value: 0 },
    { name: "", value: 0 },
  ]);
  const [noOfBookingDays, setNoOfBookingDays] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pickupDateTime, setPickupDateTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnDateTime, setReturnDateTime] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [drivingLisence, setDrivingLisence] = useState("");
  const [comments, setComments] = useState("");

  // Sample response from backend API
  const bookingData = {
    customerId: "657ff352a0533d6f8bfef3cc",
    carId: "6579bc2a5e77ac6bfceae492",
    additionalCharges: [
      { name: "22222", value: 100 },
      { name: "2222", value: 50 },
    ],
    discountPrice: 22,
    totalPrice: 2222,
    pickupCarDetails: {
      pickupDateTime: "2023-12-31T12:00:00.000Z",
      pickupLocation: "Some Pickup Location",
    },
    returnCarDetails: {
      returnDateTime: "2024-01-07T15:30:00.000Z",
      returnLocation: "Some Return Location",
    },
    arrivalTime: "2023-12-31T10:30:00.000Z",
    returnTime: "2024-01-07T17:00:00.000Z",
    flightNumber: "ABC123",
    driverName: "John Doe",
    drivingLisence: "XYZ789",
    comments: "Some additional comments",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.warn("Data: ");
    let data = {};

    let result = await fetch("http://localhost:8000/api/v1/customer/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(data),
    });

    result = await result.json();
    console.warn("Result", result);
  };

  return (
    <div
      className="booking-details-container"
      style={{ display: "flex", flexDirection: "column", padding: "30px" }}
    >
      <div className="elementor-widget-container">
        <div className="motors-elementor-widget car-listing-tabs-unit ">
          <div className="car-listing-top-part">
            <div className="found-cars-cloned found-cars-51281 position-right hide-on-mobile"></div>
            <div className="title text-center">
              <h2>
                <span style={{ color: "#cc6118" }}>Booking Details</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ gap: "16px" }}>
        {/* Left Side - Col-9 */}

        <div className="col-lg-9 col-md-6">
          <form action="#" className="signin-form">
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="city" className="col-lg-6 col-form-label">
                  Pick Car Time
                </label>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={pickupDateTime}
                    onChange={(e) => {
                      setPickupDateTime(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <label htmlFor="phoneNum" className="col-lg-6 col-form-label">
                  Dropoff Car Time
                </label>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                    value={returnDateTime}
                    onChange={(e) => {
                      setReturnDateTime(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="city" className="col-lg-6 col-form-label">
                  Pickup Car Location
                </label>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={pickupLocation}
                    onChange={(e) => {
                      setPickupLocation(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <label htmlFor="city" className="col-lg-6 col-form-label">
                  Drop Off Car Location
                </label>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={returnLocation}
                    onChange={(e) => {
                      setReturnDateTime(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="city" className="col-lg-6 col-form-label">
                  Arrival Time
                </label>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={arrivalTime}
                    onChange={(e) => {
                      setArrivalTime(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <label htmlFor="city" className="col-lg-6 col-form-label">
                  Return Time
                </label>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={returnDateTime}
                    onChange={(e) => {
                      setReturnDateTime(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="city" className="col-lg-6 col-form-label">
                  Flight Number
                </label>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={flightNumber}
                    onChange={(e) => {
                      setFlightNumber(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <label htmlFor="city" className="col-lg-6 col-form-label">
                  Driver Name
                </label>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={driverName}
                    onChange={(e) => {
                      setDriverName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="city" className="col-lg-6 col-form-label">
                  Driver Driving Lisence
                </label>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={drivingLisence}
                    onChange={(e) => {
                      setDrivingLisence(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <label htmlFor="city" className="col-lg-6 col-form-label">
                  Number of days to book
                </label>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={noOfBookingDays}
                    onChange={(e) => {
                      setNoOfBookingDays(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

             <div className="form-group row">
              <div className="col-lg-12">
                <label htmlFor="comments" className="col-lg-3 col-form-label">
                Additional Comments
              </label>
              <div className="col-lg-9">
                <textarea
                className="additional-comments"
                  id="comments"
                  name="comments"
                 rows={4}
                //  cols={25}
                  required
                  placeholder="Additional Comments"
                  value={comments}
                  onChange={(e) => {
                    setComments(e.target.value);
                  }}
                />
              </div>
              </div>

            </div>


            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="prebooking-button">
                  <Link to="/payment" className="btn btn-primary">
                    Continue to Payment{" "}
                    <span className="fas fa-arrow-right ps-2"></span>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right Side - Col-3 */}
        <br />
        <div
          className="col-lg-3 col-md-6 booking-price-evaluation-main-div"
          style={{
            border: "1px solid rgb(233, 233, 233)",
            borderRadius: "6px",
            marginTop: "10px",
          }}
        >
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
            <div className="total-price-row" style={{ lineHeight: "100%" }}>
              <span className="price-label">Total Price:</span>
              <span className="price-value">
                <b>$80</b>
              </span>{" "}
            </div>
            <hr />
          </div>
        </div>
      </div>
      <br />

      <br />
      <br />
    </div>
  );
};

export default BookingDetails;

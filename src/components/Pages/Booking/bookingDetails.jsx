import React from "react";
import { Link } from "react-router-dom";

const BookingDetails = () => {
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

  return (
    <div
      className="booking-details-container"
      style={{ display: "flex", flexDirection: "column", padding: "30px" }}
    >
      <div className="row" style={{ gap: "16px" }}>
        {/* Left Side - Col-9 */}
        <div className="col-lg-9 col-md-6">
          <div className="booking-form">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-section">
                  <label htmlFor="arrivalTime">Pickup car Time:</label>
                  <input
                    type="text"
                    id="arrivalTime"
                    value={bookingData.pickupCarDetails.pickupDateTime}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-section">
                  <label htmlFor="returnTime">pickup car location:</label>
                  <input
                    type="text"
                    id="returnTime"
                    value={bookingData.pickupCarDetails.pickupLocation}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="form-section">
                  <label htmlFor="arrivalTime">dropoff car Time:</label>
                  <input
                    type="text"
                    id="arrivalTime"
                    value={bookingData.returnCarDetails.returnDateTime}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-section">
                  <label htmlFor="returnTime">dropoff car location:</label>
                  <input
                    type="text"
                    id="returnTime"
                    value={bookingData.returnCarDetails.returnLocation}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="form-section">
                  <label htmlFor="arrivalTime">Arrival Time:</label>
                  <input
                    type="text"
                    id="arrivalTime"
                    value={bookingData.arrivalTime}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-section">
                  <label htmlFor="returnTime">Return Time:</label>
                  <input
                    type="text"
                    id="returnTime"
                    value={bookingData.returnTime}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-section">
                  <label htmlFor="flightNumber">Flight Number:</label>
                  <input
                    type="text"
                    id="flightNumber"
                    value={bookingData.flightNumber}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-section">
                  <label htmlFor="driverName">Driver Name:</label>
                  <input
                    type="text"
                    id="driverName"
                    value={bookingData.driverName}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-section">
                  <label htmlFor="drivingLisence">Driving License:</label>
                  <input
                    type="text"
                    id="drivingLisence"
                    value={bookingData.drivingLisence}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-section">
                  <label htmlFor="comments">Comments:</label>
                  <textarea id="comments" value={bookingData.comments} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Col-3 */}
        <br />
        <div
          className="col-lg-3 col-md-6"
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
      <div className="">
        <div className="col-lg-3 col-md-6">
          <div className="prebooking-button">
            <Link to="/payment" className="btn btn-primary">
              Continue to Payment{" "}
              <span className="fas fa-arrow-right ps-2"></span>
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default BookingDetails;

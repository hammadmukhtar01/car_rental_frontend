/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [carId, setCarId] = useState("");
  const [noOfBookingDays, setNoOfBookingDays] = useState(1);
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
  const navigate = useNavigate();

  const customer_info = JSON.parse(localStorage.getItem("user"));
  const customer_token = customer_info.token
  const customer_id = customer_info.data._id
  console.log(
    "User info of local storage in Booking details page is",
   customer_info
  );

  const car_id = id;
  console.log("Car ID in Booking details page is", car_id);
  const actualPrice = data.originalPrice * noOfBookingDays;
  const discountedPrice =
    (data.originalPrice - data.salePrice) * noOfBookingDays;
  const totalPriceValue =
    isNaN(actualPrice) || isNaN(discountedPrice)
      ? 0
      : actualPrice - discountedPrice;

  const calculateTotalAdditionalPrice = () => {
    if (data && data.additionalCharges) {
      return data.additionalCharges.reduce(
        (total, charge) => total + charge.value,
        0
      );
    }
    return 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/car/getSingleCar/${id}`
        );
        console.log("Vehicles Page data is: ", response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleBookingDetails = async (e) => {
    console.warn("Data: ");
    e.preventDefault();
   
      const data1 = {
        customerId: customer_id,
        carId: car_id,
        noOfBookingDays: noOfBookingDays,
        totalPrice: totalPriceValue,
        pickupCarDetails: {
          pickupDateTime: pickupDateTime,
          pickupLocation: pickupLocation,
        },
        returnCarDetails: {
          returnDateTime: returnDateTime,
          returnLocation: returnLocation,
        },
        arrivalTime: arrivalTime,
        returnTime: returnTime,
        flightNumber: flightNumber,
        driverName: driverName,
        drivingLisence: drivingLisence,
        comments: comments,
      };

      try {

      const response = await axios.post(
        "http://localhost:8000/api/v1/additionalBooking/createadditionalBooking",
        data1,
        {
          headers: {
            "Content-Type": "application/json", 
            Authorization: "Bearer " + customer_token,
          },
        }
      );

      console.log("Booking created successfully:", response.data);
      const bookingDetailsId = response.data.additionalBookingDetails.additionalBookings._id ;
      console.log(`Booking details id is : ${bookingDetailsId}`);
      if (response.status === 201) {
        console.log("Product created successfully");
        alert("Booking in Progress. Please procceed with payment");
        navigate(`/payment/${bookingDetailsId}`);
      } else {
        console.log("Product creation failed");
        alert("Product creation failed");
      }
    } catch (error) {
      console.error(`API error: ${error}`);
    }
    
  };

  return (
    <div
      className="booking-details-container"
      style={{ display: "flex", flexDirection: "column", padding: "0px 30px" }}
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
      <br />
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
                    className="form-control-date"
                    id="pickupDateTime"
                    name="pickupDateTime"
                    type="datetime-local"
                    required
                    placeholder="PickUp Time"
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
                    className="form-control-date"
                    id="dropoffDateTime"
                    name="dropoffDateTime"
                    type="datetime-local"
                    required
                    placeholder="PickUp Time"
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
                    type="text"
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
                    type="text"
                    required
                    placeholder="Email"
                    value={returnLocation}
                    onChange={(e) => {
                      setReturnLocation(e.target.value);
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
                    className="form-control-date"
                    id="flightArrivalDateTime"
                    name="flightArrivalDateTime"
                    type="datetime-local"
                    required
                    placeholder="Arrival Time"
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
                    className="form-control-date"
                    id="flightReturnDateTime"
                    name="flightReturnDateTime"
                    type="datetime-local"
                    required
                    placeholder="Return Time"
                    value={returnTime}
                    onChange={(e) => {
                      setReturnTime(e.target.value);
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
                    id="flightNum"
                    name="flightNum"
                    type="text"
                    required
                    placeholder="flight number"
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
                    id="driverName"
                    name="driverName"
                    type="text"
                    required
                    placeholder="driver name"
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
                    id="drivingLisense"
                    name="drivingLisense"
                    type="text"
                    required
                    placeholder="driving lisense"
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
                    id="numOfDays"
                    name="numOfDays"
                    type="number"
                    min={1}
                    required
                    placeholder="days"
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
                  <button
                    className="btn btn-primary"
                    onClick={handleBookingDetails}
                  >
                    Continue to Payment{" "}
                    <span className="fas fa-arrow-right ps-2"></span>
                  </button>
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
              <span className="price-value">
                {" "}
                {data.originalPrice} * {noOfBookingDays} ={" "}
                {data.originalPrice * noOfBookingDays} | AED
              </span>{" "}
            </div>
            <div className="price-row" style={{ lineHeight: "300%" }}>
              <span className="price-label">Discount Price:</span>
              <span className="price-value">
                {" "}
                {discountedPrice} * {noOfBookingDays} ={" "}
                {discountedPrice * noOfBookingDays} | AED
              </span>{" "}
            </div>
            <hr />
            <div className="price-row" style={{ lineHeight: "300%" }}>
              <span className="price-label">Additional Charges:</span>
              <span className="price-value">
                {" "}
                {calculateTotalAdditionalPrice()} | AED
              </span>{" "}
            </div>
            <hr />

            <div className="total-price-row" style={{ lineHeight: "100%" }}>
              <span className="price-label">Total Price:</span>
              <span className="price-value">
                {" "}
                <b>{totalPriceValue}</b> | AED
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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./customerDashboard.css";

const BookingDetails = ({ label, value }) => (
  <div className="row">
    <div className="col-lg-6">
      <strong>{label}:</strong>
    </div>
    <div className="col-lg-6">{value}</div>
  </div>
);

const CustomerProfilePage = () => {
  const [bookingDetails, setBookingDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomerBookingsDetails = async () => {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_MILELE_API_URL}/additionalBooking/one/${id}`,
          { headers }
        );
        setBookingDetails(response?.data?.data);
      } catch (error) {
        console.error("Error fetching complex features icons:", error);
      }
    };

    fetchCustomerBookingsDetails();
  }, [id]);

  return (
    <div>
      <div className="card-section">
        <h3>Booking Details</h3>
        <BookingDetails
          label="Pickup Date"
          value={bookingDetails?.pickupDateTime}
        />
        <BookingDetails
          label="Pickup Location"
          value={bookingDetails?.pickupLocation}
        />
        <BookingDetails
          label="Return Date"
          value={bookingDetails?.returnDateTime}
        />
        <BookingDetails
          label="Return Location"
          value={bookingDetails?.returnLocation}
        />
        <BookingDetails
          label="Number of Booking Days"
          value={bookingDetails?.noOfBookingDays}
        />
      </div>
    </div>
  );
};

export default CustomerProfilePage;

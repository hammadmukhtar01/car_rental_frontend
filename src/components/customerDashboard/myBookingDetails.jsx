import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./customerDashboard.css";
import CustomerProfilePage from "./myProfilePage";

const ResponsiveExample = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const { id } = useParams();
  const [isCardVisible, setIsCardVisible] = useState(false);

  useEffect(() => {
    const fetchCustomerBookingsStatusData = async () => {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_MILELE_API_URL}/booking/userSpecificAllBookings/${id}`,
          { headers }
        );
        setBookings(response?.data?.bookings);
      } catch (error) {
        console.error("Error fetching complex features icons:", error);
      }
    };

    fetchCustomerBookingsStatusData();
  }, [id]);

  const bookingStatusTableHeadings = [
    "#",
    "Car Name",
    "Car Model",
    "Booking Number",
    "Payment Status",
    "Paid Amount",
    "Booking Status",
    "Earned Credit pts",
    "Booking Date",
    "View Booking Details",
  ];

  const handleViewDetailsClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsCardVisible(true);
  };

  const handleHideDetailsClick = () => {
    setSelectedBookingId(null);
    setIsCardVisible(false);
  };

  return (
    <>
      <div className="customer-bookings-status-main-container p-5">
        <div className="myBookings-heading pb-4">
          <center>
            <h3>
              <strong>MY BOOKINGS</strong>
            </h3>
          </center>
          <div
            className="elementor-element elementor-element-5224060 elementor-widget elementor-widget-stm-colored-separator"
            data-id="5224060"
            data-element_type="widget"
            data-widget_type="stm-colored-separator.default"
          >
            <div className="elementor-widget-container">
              <div
                className="colored-separator"
                style={{ textAlign: "center" }}
              >
                <div className="first-long stm-base-background-color"></div>
                <div className="last-short stm-base-background-color"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="customer-bookings-status-container">
          <Table responsive striped>
            <thead>
              <tr>
                {bookingStatusTableHeadings?.map((heading, index) => (
                  <th key={index}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking, index) => (
                <React.Fragment key={booking?._id}>
                  <tr>
                    <td className="align-middle">
                      <b>{index + 1}.</b>
                    </td>
                    <td className="align-middle">{booking?.carId}</td>
                    <td className="align-middle">
                      {/* Add Car Model here */}111
                    </td>
                    <td className="align-middle">{booking?.bookingno}</td>
                    <td className="align-middle">
                      <span
                        className={`customer-booking-status ${
                          booking?.paymentStatus === "Pending"
                            ? "bg-danger"
                            : "bg-success"
                        }`}
                      >
                        {" "}
                        <b>{booking?.paymentStatus}</b>{" "}
                      </span>
                    </td>
                    <td className="align-middle">{booking?.totalPrice}</td>
                    <td className="align-middle">
                      <span
                        className={`customer-payment-status ${
                          booking?.bookingStatus === "Pending"
                            ? "bg-danger"
                            : "bg-success"
                        }`}
                      >
                        {" "}
                        <b>{booking?.bookingStatus}</b>{" "}
                      </span>
                    </td>
                    <td className="align-middle">{booking?.totalPrice * 1}</td>
                    <td className="align-middle">
                      {new Date(booking?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="d-flex justify-content-center">
                      <button
                        className="booking-details-button"
                        id="my-booking-buton"
                        onClick={() =>
                          isCardVisible
                            ? handleHideDetailsClick()
                            : handleViewDetailsClick(booking?._id)
                        }
                      >
                        {isCardVisible && selectedBookingId === booking?._id
                          ? "Hide Details"
                          : "View Details"}
                      </button>
                    </td>
                  </tr>

                  {isCardVisible && selectedBookingId === booking?._id && (
                    <tr>
                      <td colSpan={bookingStatusTableHeadings?.length}>
                        <CustomerProfilePage />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ResponsiveExample;

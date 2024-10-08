/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./customerDashboard.css";
import FooterCombination from "../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HeaderCombination from "../PrivateComponents/headerCombination";
import SingleBookingDetails from "./singleBookingDetails";

const CustomerBookings = () => {
  const [bookingsIDs, setBookingsIDs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingsStatusValue, setBookingsStatusValue] = useState([]);
  const [visibleDetails, setVisibleDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const auth = JSON.parse(localStorage?.getItem("user"));
  const customerSpeedID = auth?.data?.customerIdFromSpeed;

  const fetchCustomerBookingsIDs = useMemo(
    () => async (customerSpeedID) => {
      try {
        console.log("fetchCustomerBookingsIDs");

        const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const url =
          "https://app.speedautosystems.com/api/services/app/bookingSearch/GetBookings";
        const requiredCustomerData = {
          customerId: customerSpeedID,
          enableDateRange: false,
          maxResultCount: 1000,
        };

        const response = await axios.post(url, requiredCustomerData, {
          headers,
        });

        const resultedaData = response?.data?.result;
        const resultedBookingStatus = response?.data?.result?.items?.map(
          (bookingsData) => bookingsData?.bookingStatus
        );
        setBookingsStatusValue(resultedBookingStatus);

        const bookingIds = resultedaData?.items?.map((item) => item.id);

        setBookingsIDs(bookingIds);
        if (bookingIds) {
          setIsLoading(false);
        } else {
          console.log("Fetching Customer Bookings ID is incorrect!");
        }
      } catch (error) {
        console.error("Error Fetching Customer Bookings Data: ", error);
        setIsLoading(false);
      }
    },
    []
  );

  const fetchCustomerBookingsData = useMemo(
    () => async (bookingIds) => {
      try {
        console.log("fetchCustomerBookingsData");
        const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const url =
          "https://app.speedautosystems.com/api/services/app/bookingSearch/GetBookingForView";
        const bookingDetailsPromises = bookingIds.map(async (id) => {
          const response = await axios.post(url, { id: id }, { headers });
          return response?.data?.result;
        });

        const bookingsData = await Promise.all(bookingDetailsPromises);

        setBookings(bookingsData);
        if (bookingsData) {
          setIsLoading(false);
        } else {
          console.log("Fetching Customer Bookings Data is incorrect");
        }
      } catch (error) {
        console.error("Error Fetching Customer Bookings Data: ", error);
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (customerSpeedID) {
      fetchCustomerBookingsIDs(customerSpeedID);
    }
  }, [customerSpeedID, fetchCustomerBookingsIDs]);

  useEffect(() => {
    if (bookingsIDs.length > 0) {
      fetchCustomerBookingsData(bookingsIDs);
    }
  }, [bookingsIDs, fetchCustomerBookingsData]);

  const bookingStatusTableHeadings = [
    "#",
    "Car Name",
    "Booking No.",
    "Payment Status",
    "Paid Amount (AED)",
    "Booking Status",
    "Booking Created",
    "Earned Credit pts",
    "",
  ];

  const handleViewDetailsClick = (bookingId) => {
    setVisibleDetails((prevState) => ({
      ...prevState,
      [bookingId]: !prevState[bookingId],
    }));
  };

  const transformBookingStatus = (status) => {
    let displayStatus = status;
    let cssClass = "";

    switch (status) {
      case "NoShow":
        displayStatus = "Voided";
        cssClass = "bg-orange";
        break;
      case "Closed":
        displayStatus = "Done";
        cssClass = "bg-green";
        break;
      case "Cancelled":
        displayStatus = "Cancelled";
        cssClass = "bg-red";
        break;
      case "Confirmed":
        displayStatus = "Accepted";
        cssClass = "bg-green";
        break;
      case "New":
        displayStatus = "In Progress";
        cssClass = "bg-blue";
        break;
      default:
        cssClass = status === "Pending" ? "bg-danger" : "bg-success";
        break;
    }

    return { displayStatus, cssClass };
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>My Bookings | Milele Car Rental Application </title>
          <meta
            name="description"
            content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
          />
          <meta name="keywords" content="keywords" />
          {/* <link rel="canonical" href="https://milelecarrental.com/login" /> */}
        </Helmet>
        <HeaderCombination />{" "}
        <div className="customer-bookings-status-main-container p-3">
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

              {bookings.length > 0 && (
                <tbody>
                  {bookings?.map((booking, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td className="align-middle">
                          <b>{index + 1}.</b>
                        </td>
                        <td className="align-middle">
                          {booking?.tariffGroup?.title}
                        </td>
                        <td className="align-middle">{booking?.agreementNo}</td>
                        <td className="align-middle">
                          <span
                            className={`customer-payment-status ${
                              booking?.paymentStatus === "Pending"
                                ? "bg-orange"
                                : "bg-green"
                            }`}
                          >
                            Done
                          </span>
                        </td>
                        <td className="align-middle">
                          {booking?.totalCharges}
                        </td>
                        <td className="align-middle">
                          <div
                            className={`customer-booking-status ${
                              transformBookingStatus(bookingsStatusValue[index])
                                .cssClass
                            }`}
                          >
                            <span>
                              {" "}
                              {
                                transformBookingStatus(
                                  bookingsStatusValue[index]
                                ).displayStatus
                              }
                            </span>
                          </div>
                        </td>

                        <td className="align-middle">
                          {new Date(booking?.creationTime).toLocaleDateString()}
                        </td>

                        <td className="align-middle">
                          {/* {booking?.totalCharges * 1} */}
                          0
                        </td>

                        <td className="d-flex justify-content-center">
                          <button
                            className="booking-details-button"
                            id="my-booking-buton"
                            aria-label="My Bookings"
                            onClick={() => handleViewDetailsClick(booking?.id)}
                          >
                            {visibleDetails[booking?.id]
                              ? "Hide Details"
                              : "View Details"}
                          </button>
                        </td>
                      </tr>

                      {visibleDetails[booking?.id] && (
                        <tr>
                          <td colSpan={bookingStatusTableHeadings?.length}>
                            <SingleBookingDetails
                              bookingData={booking}
                              className="bg-white"
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              )}
            </Table>
          </div>
          {/* {bookings.length <= 0 && (
            <>
              {" "}
              <center>
                <h4>
                  <p>Loading...</p>
                  <>No Booking Record Found!</>
                </h4>
              </center>
            </>
          )} */}

          {isLoading ? (
            <center>
              <h4>
                <p>Loading...</p>
              </h4>
            </center>
          ) : bookings.length === 0 ? (
            <center>
              <h4>
                <>No Booking Record Found!</>
              </h4>
            </center>
          ) : null}
        </div>
        <FooterCombination />
      </HelmetProvider>
    </>
  );
};

export default CustomerBookings;

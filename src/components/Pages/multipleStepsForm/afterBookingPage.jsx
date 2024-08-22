import React from "react";
import "../OtherPages/errorPage.css";
import { useNavigate } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TickIcon from "../../images/icons/tick.png";
import "./thankyouPage.css";

const AfterBookingPage = () => {
  const navigate = useNavigate();

  const thankYouPageBackButton = () => {
    navigate("/");
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>Booking Success | Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="robots" content="noindex, nofollow" />{" "}
      </Helmet>
      <div className="after-payment-succcess-booking-page">
        <div className="thank-you-div-container">
          <div className="icon">
            <img src={TickIcon} alt="Tick Icon" className="tick-icon" />
          </div>
          <h5>
            <span className="thank-you-bold-text">
              Booking confirmed! Thank you for choosing Milele Car Rental.
            </span>
          </h5>
          <p>A payment link has been sent to your email</p>
          <div>
            <hr className="thank-you-page-small-line" />
          </div>
        </div>
        <br />
        <div className="text-center">
          <button
            onClick={thankYouPageBackButton}
            className="middle"
            id="return-home-button-booking-success-page"
            aria-label="Return Home"
          >
            <span className="animate-button btn4">
              <b>Back to home</b>
            </span>
          </button>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AfterBookingPage;

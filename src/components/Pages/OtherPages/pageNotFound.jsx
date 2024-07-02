/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./errorPage.css";
import { useNavigate } from "react-router";
import HeaderCombination from "../../PrivateComponents/headerCombination";
import FooterCombination from "../../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PageNotFoundImg from "../../images/icons/PageNotFound.png";

const PageNotFound = () => {
  const navigate = useNavigate();

  const errorPageBackButton = () => {
    navigate("/");
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>Error 404. | (Page Not Found with this url)!</title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="robots" content="noindex, nofollow" />{" "}
      </Helmet>
      <HeaderCombination />
      <div className="error-404-page">
        <div className="error-404-div-container">
          <h3>
            <b>Error</b>
          </h3>
          <div className="icon">
            <img
              src={PageNotFoundImg}
              alt="Error 404"
              className="error-404-icon"
            />
          </div>

          <p>Page URL Not Found!</p>
          <div>
            <hr className="error-404-page-small-line" />
          </div>
        </div>
        <br />
        <div className="text-center">
          <button
            onClick={errorPageBackButton}
            className="middle"
            id="return-home-button-booking-success-page"
          >
            <span className="animate-button btn4">
              <b>Back to home</b>
            </span>
          </button>
        </div>
      </div>
      <FooterCombination />
    </HelmetProvider>
  );
};

export default PageNotFound;

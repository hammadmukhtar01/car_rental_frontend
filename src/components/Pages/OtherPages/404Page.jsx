/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./errorPage.css";
import { useNavigate } from "react-router";
import HeaderCombination from "../../PrivateComponents/headerCombination";
import FooterCombination from "../../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Error404Page from "../../images/icons/Eror404.png";
import axios from "axios";

const Page404 = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_MILELE_API_URL}/set-404-status`,
  //       {},
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("404 status set on server");
  //     })
  //     .catch((error) => {
  //       console.error("Error setting 404 status:", error);
  //     });
  // }, []);

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
        <meta name="keywords" content="keywords" />
      </Helmet>
      <HeaderCombination />
      <div className="error-404-page">
        <div className="error-404-div-container">
          <h3><b>Error</b></h3>
          <div className="icon">
            <img src={Error404Page} alt="Error 404" className="error-404-icon" />
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

export default Page404;

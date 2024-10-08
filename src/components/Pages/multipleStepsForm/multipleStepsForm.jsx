/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VehicleDetails from "./vehicleDetails";
import AddOnsDocuments from "./documentsAndBooking";
import AfterBookingPage from "./afterBookingPage";
import ProgressBar from "./progressBar";
import FooterCombination from "../../PrivateComponents/footerCombination";
import HomePageTopBar from "../navbar/homePageTopBar";
import MainNavbar from "../navbar/mainNavbar";

function VerificationForm() {
  const { step } = useParams();
  const navigate = useNavigate();
  const [currentStep] = useState(parseInt(step) || 1);

  const nextStep = () => {
    const next = currentStep + 1;
    navigate(`/booking-page/${next}`);
  };

  const prevStep = () => {
    const prev = currentStep - 1;
    navigate(`/booking-page/${prev}`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <VehicleDetails nextStep={nextStep} />
          </>
        );
      case 2:
        return (
          <>
            <AddOnsDocuments prevStep={prevStep} nextStep={nextStep} />
          </>
        );
      case 3:
        return (
          <>
            <AfterBookingPage prevStep={prevStep} />
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <>
      <HomePageTopBar />
      <div className="navbar-div-container">
        <MainNavbar />
      </div>
      <div className="multi_step_form co">
        <div id="msform">
          <div className="progress-bar-div">
            <ProgressBar step={currentStep} />
          </div>
          <div className="steps-data-main-div pb-4 container">
            <div className="steps-data-container">{renderStep()}</div>
          </div>
        </div>
      </div>
      <FooterCombination />
    </>
  );
}

export default VerificationForm;

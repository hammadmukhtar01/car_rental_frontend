import React, { useState, useEffect } from "react";
import VehicleDetails from "./vehicleDetails";
import AddOnsDocuments from "./addOnsDocuments";
import PaymentPage from "./paymentPage";
import ProgressBar from "./progressBar";
import "./multipleStepsForm.css";
import MainNavbar from "../navbar/mainNavbar";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "../../PrivateComponents/reloadingComponent";

function VerificationForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <VehicleDetails nextStep={nextStep} />;
      case 2:
        return <AddOnsDocuments prevStep={prevStep} nextStep={nextStep} />;
      case 3:
        return <PaymentPage prevStep={prevStep} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { loading } = useReload();

  if (loading) {
    return (
      <>
       <ReloadingComponent/>
      </>
    );
  }

  return (
    <div className="multi_step_form">
      <div className="navbar-bg-img-container">
        <div className="booking-page-banner-navbar">
          {" "}
          <MainNavbar />
        </div>
      </div>
      <form id="msform">
        <div className="progress-bar-div">
          <ProgressBar step={step} />
        </div>
        <div className="steps-data-main-div pb-4 container">
          <div className="steps-data-container">{renderStep()}</div>
        </div>
      </form>
    </div>
  );
}

export default VerificationForm;

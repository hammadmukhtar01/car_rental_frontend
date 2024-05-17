import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VehicleDetails from "./vehicleDetails";
import AddOnsDocuments from "./documentsAndBooking";
import AfterBookingPage from "./afterBookingPage";
import ProgressBar from "./progressBar";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "../../PrivateComponents/reloadingComponent";
import HeaderCombination from "../../PrivateComponents/headerCombination";
import FooterCombination from "../../PrivateComponents/footerCombination";

function VerificationForm() {
  const { step } = useParams();
  const navigate = useNavigate();
  const [currentStep] = useState(parseInt(step) || 1);

  const nextStep = () => {
    const next = currentStep + 1;
    navigate(`/bookingPage/${next}`);
  };

  const prevStep = () => {
    const prev = currentStep - 1;
    navigate(`/bookingPage/${prev}`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <VehicleDetails nextStep={nextStep} />;
      case 2:
        return <AddOnsDocuments prevStep={prevStep} nextStep={nextStep} />;
      case 3:
        return <AfterBookingPage prevStep={prevStep} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const { loading } = useReload();

  if (loading) {
    return (
      <>
        <ReloadingComponent />
      </>
    );
  }

  return (
    <>
      <HeaderCombination />
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

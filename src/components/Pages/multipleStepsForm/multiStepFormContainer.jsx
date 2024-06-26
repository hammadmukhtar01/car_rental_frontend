import React from "react";
import ProgressBar from "./progressBar";

function MultiStepFormContainer({ children, currentStep }) {
  return (
    <div className="multi_step_form co">
      <form id="msform">
        <div className="progress-bar-div">
          <ProgressBar step={currentStep} />
        </div>
        <div className="steps-data-main-div pb-4 container">
          <div className="steps-data-container">{children}</div>
        </div>
      </form>
    </div>
  );
}

export default MultiStepFormContainer;

import React from "react";

const AddOnsDocuments = ({ prevStep, nextStep }) => {
  return (
    <div>
      AddOnsDocuments
      <h3>Step 2</h3>
      <button type="button" className="action-button next" onClick={nextStep}>
        Continue
      </button>
    </div>
  );
};

export default AddOnsDocuments;

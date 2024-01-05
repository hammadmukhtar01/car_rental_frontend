import React from "react";

const PaymentPage = ({ prevStep }) => {
  return (
    <div>
      PaymentPage
      <h3>This is Step 3</h3>
      <button
        type="button"
        className="action-button previous"
        onClick={prevStep}
      >
        Back
      </button>
    </div>
  );
};

export default PaymentPage;

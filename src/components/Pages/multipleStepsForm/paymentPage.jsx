import React from "react";

const PaymentPage = ({ prevStep }) => {
  return (
    <div className="text-center">
      PaymentPage
      <h3>This is Step 3</h3>
      <button
        type="button"
        className="action-button previous btn btn-success"
        onClick={prevStep}
      >
        Back
      </button>
    </div>
  );
};

export default PaymentPage;

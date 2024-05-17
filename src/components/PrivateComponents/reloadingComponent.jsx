import React from "react";
import "./reloadingComponent.css";

const ReloadingComponent = () => {
  return (
    <>
      <div className="reloading-icon-container text-center">
        <div className="lds-dual-ring text-center"></div>
      </div>
    </>
  );
};

export default ReloadingComponent;

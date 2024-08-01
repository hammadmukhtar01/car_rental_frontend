import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterWrapper = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          border: "1.3px solid #e87a28f2",
          boxShadow: "1px 1px 4px 0px #e87a28f2",
          color: "white",
          backgroundColor: "rgb(52 58 64 / 78%)",
          fontSize: "16px",
          maxWidth: "600px",
        },
      }}
    />
  );
};

export default ToasterWrapper;

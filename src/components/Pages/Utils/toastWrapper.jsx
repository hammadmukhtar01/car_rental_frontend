import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToasterWrapper = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          border: "1.3px solid white",
          boxShadow: "1px 1px 15px 1px #e87a28",
          color: "white",
          backgroundColor: "#e87a28f2",
          fontSize: "16px",
          maxWidth: "600px",
        },
      }}
    />
  );
};

export default ToasterWrapper;

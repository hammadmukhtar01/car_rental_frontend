import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import { useLocation } from "react-router";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { FaMapMarkerAlt, FaTelegramPlane } from "react-icons/fa";
import "./verticalSliderCarDetails.css";

const steps = [
  {
    locName: "Pickup Loc Name",
    locTime: "Pickup Loc Time",
    locIcon: FaTelegramPlane,
  },
  {
    locName: "Drop off Loc Name",
    locTime: "Drop off Loc Time",
    locIcon: FaMapMarkerAlt,
  },
];

function CustomStepIcon({ locName, IconName, locTime }) {
  return (
    <>
      <div className="customer-step-container">
        <div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconName className="mr-4" />{" "}
            <div>
              <Typography variant="body1" className="loc-name-text-car-details">
                {locName}
              </Typography>
            </div>
          </Box>
        </div>
        <div className="loc-name-car-details-page d-flex flex-row-reverse">
          <Typography variant="body2">{locTime}</Typography>
        </div>
      </div>
    </>
  );
}

const CustomIconStepper = () => {

  return (
    <Box sx={{ width: "100%" }} className="customer-icon-stepper-container">
      <div className="pickup-dropoff-heading mb-3 text-center">
        <h4>Pick-up & Drop-off</h4>
        <hr style={{ opacity: "1" }} />
      </div>
      <Stepper
        activeStep={steps?.length - 1}
        orientation="vertical"
        className="pick-drop-data"
      >
        {steps?.map((label, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={() => (
                <CustomStepIcon
                  locName={label?.locName}
                  IconName={label?.locIcon}
                  locTime={label?.locTime}
                />
              )}
            />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CustomIconStepper;

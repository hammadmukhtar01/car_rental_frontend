/* eslint-disable no-unused-vars */
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./stepperComponent.css";
import LocationIcon from "../../images/pin-home-page-icon.svg";
import DatePickerIcon from "../../images/pick-drop-date-icon.svg";
import BookVehicleIcon from "../../images/car-booking-icon.svg";
import LocationWebPIcon from "../../images/pin-home-page-icon.webp";
import DatePickerWebPIcon from "../../images/pick-drop-date-icon.webp";
import BookVehicleWebPIcon from "../../images/car-booking-icon.webp";

const StepperComponent = () => {
  const rentalStepsDataArr = [
    {
      id: 1,
      iconName: LocationIcon,
      webPIcon: LocationWebPIcon,
      headingName: "Choose a location",
      rentalStepsDetail:
        "Start by selecting the most convenient pick-up location for you.",
    },
    {
      id: 2,
      iconName: DatePickerIcon,
      webPIcon: DatePickerWebPIcon,
      headingName: "Choose pick-up date",
      rentalStepsDetail:
        "Next, choose your desired pick-up date with our flexible scheduling.",
    },
    {
      id: 3,
      iconName: BookVehicleIcon,
      webPIcon: BookVehicleWebPIcon,
      headingName: "Book your car",
      rentalStepsDetail:
        "Finally, browse our extensive fleet and select the one that best suits your needs.",
    },
  ];

  return (
    <Container>
      <section>
        <div className="home-page-rental-exps-container">
          <div className="rental-exps-heading">
            <div className="how-it-works-p">How it Works</div>
            <h2>
              <strong>Rent in 3 Simple Steps</strong>
            </h2>
          </div>
          <div className="rental-exps-data">
            <Row>
              {rentalStepsDataArr.map((rentalStepsData, index) => (
                <Col
                  xxl={4}
                  lg={4}
                  md={12}
                  sm={12}
                  xs={12}
                  className="rental-exps-icon-text-container"
                  key={rentalStepsData.id}
                >
                  <div className="rent-exp-pic-container">
                    <picture className="rent-exp-pic-container">
                      <source
                        srcSet={rentalStepsData?.webPIcon}
                        type="image/webp"
                      />
                      <img
                        src={rentalStepsData.iconName}
                        alt={rentalStepsData.headingName}
                        className={`rental-exps-icon ${
                          index === 1 ? "date-picker-icon" : ""
                        }`}
                        title="steps to rent a car"
                      />
                    </picture>
                  </div>

                  {index < rentalStepsDataArr.length - 1 && (
                    <div className="divider"></div>
                  )}
                  <Row>
                    <div className="rental-exps-sub-headings">
                      {rentalStepsData.headingName}
                    </div>
                    <div className="rental-exps-detail">
                      {rentalStepsData.rentalStepsDetail}
                    </div>
                  </Row>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default StepperComponent;

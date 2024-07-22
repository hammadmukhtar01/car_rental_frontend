import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./stepperComponent.css";
import LocationIcon from "../../images/pin-home-page-icon.png";
import DatePickerIcon from "../../images/pick-drop-date-icon.png";
import BookVehicleIcon from "../../images/car-booking-icon.png";

const StepperComponent = () => {
  const rentalStepsDataArr = [
    {
      id: 1,
      iconName: LocationIcon,
      headingName: "Choose a location",
      rentalStepsDetail:
        "Start by selecting the most convenient pick-up location for you.",
    },
    {
      id: 2,
      iconName: DatePickerIcon,
      headingName: "Choose pick-up date",
      rentalStepsDetail:
        "Next, choose your desired pick-up date with our flexible scheduling.",
    },
    {
      id: 3,
      iconName: BookVehicleIcon,
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
                  <img
                    src={rentalStepsData.iconName}
                    alt={rentalStepsData.headingName}
                    className={`rental-exps-icon ${index === 1 ? 'date-picker-icon' : ''}`}
                  />
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

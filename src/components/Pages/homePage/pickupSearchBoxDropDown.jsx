import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Form } from "react-bootstrap";
import $ from "jquery";

const CustomDropdown = ({
  show,
  handleButtonClick,
  cityNames,
  selectedCarModel,
  setSelectedCarModel,
  setDropoffLocation,
}) => {
  const [selectedButton, setSelectedButton] = useState("Deliver");

  useEffect(() => {
    if (show) {
      $("#deliverToCityNameSelect").select2({
        placeholder: "Select City",
        data: cityNames.map((cityName) => ({ id: cityName, text: cityName })),
      });

      return () => {
        $("#deliverToCityNameSelect").select2("destroy");
      };
    }
  }, [show, cityNames]);

  const handleButtonToggle = (button) => {
    setSelectedButton(button);
  }

  const [selectedpickUpLocation, setSelectedpickUpLocation] = useState("");
  const [selectedLocationText, setSelectedLocationText] = useState(
    "Please select location from drop down."
  );

  const mileleLocations = useMemo(
    () => [
      {
        id: 1,
        locationName: "Showroom 93",
        locationDetails: "Milele Showroom 93, Ras Al Khor, Dubai, UAE.",
      },
      {
        id: 2,
        locationName: "Head Office AF03",
        locationDetails:
          "Milele Head Office, Samari Retails, Office Number AF03, Dubai.",
      },
    ],
    []
  );

  useEffect(() => {
    $("#pickupSelfLocationNameSelect").select2({
      placeholder: "Select Location",
      data: mileleLocations.map((locations) => ({
        id: locations.locationName,
        locName: locations.locationName,
        text: locations.locationDetails,
      })),
    });

    return () => {
      $("#pickupSelfLocationNameSelect").select2("destroy");
    };
  }, [mileleLocations]);

  return (
    show && (
      <div className="custom-dropdown p-4">
        <>
          <Row>
            <Col className="d-flex align-items-center pickup-locations-button-col">
              <div className="pr-3">
                <button
                  className="btn btn-danger"
                  onClick={() => handleButtonToggle("Deliver")}
                >
                  Deliver to Me
                </button>
              </div>{" "}
              <div>
                <button
                  className="btn btn-success pick-myself-button"
                  onClick={() => handleButtonToggle("Pick")}
                >
                  Pick Myself
                </button>
              </div>
            </Col>
          </Row>
          <br />
          {selectedButton === "Deliver" && (
            <div className="deliver-to-me-main-container">
              <Row>
                <div className="deliver-to-me-container">
                  <Row>
                    <Col xxl={3} lg={3} md={3} sm={5} xs={12}>
                      <Form.Group controlId="formCarModel">
                        <select
                          id="deliverToLocationSelect"
                          className="form-select"
                          value={selectedCarModel}
                          onChange={(e) => setSelectedCarModel(e.target.value)}
                        >
                          <option
                            value=""
                            disabled
                            className="disabled-choose-button"
                          >
                            Choose City
                          </option>
                          {cityNames.map((cityName) => (
                            <option key={cityName} value={cityName}>
                              {cityName}
                            </option>
                          ))}
                        </select>
                      </Form.Group>
                    </Col>
                    <Col xxl={6} lg={7} md={6} sm={7} xs={12}>
                      <Form.Group controlId="formLocation">
                        <input
                          className="form-control-location mt-2 col-12"
                          type="text"
                          placeholder="Enter dropoff location"
                          value="test"
                          onChange={(e) => setDropoffLocation(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col
                      xxl={3}
                      lg={2}
                      md={2}
                      sm={6}
                      xs={8}
                      className="d-flex justify-content-center align-items-center submit-button"
                    >
                      <button
                        className="btn btn-primary"
                        onClick={() => handleButtonClick("Pick")}
                      >
                        <span className="d-block text-center">Submit</span>
                      </button>
                    </Col>
                  </Row>
                </div>
                <div className="pickup-myself-container"></div>
              </Row>
            </div>
          )}
          {selectedButton === "Pick" && (
            <div className="pickup-myself-main-container">
              <Row>
                <div className="pickup-car-details-container">
                  <Row>
                    <Col xxl={3} lg={3} md={3} sm={5} xs={12}>
                      <Form.Group controlId="formCarModel">
                        <select
                          id="deliverToLocationSelect"
                          className="form-select"
                          value={selectedpickUpLocation}
                          onChange={(e) =>
                            setSelectedpickUpLocation(e.target.value)
                          }
                        >
                          <option
                            value=""
                            disabled
                            className="disabled-choose-button"
                          >
                            Choose Location
                          </option>
                          {mileleLocations.map((locations) => (
                            <option
                              key={locations.id}
                              value={locations.locationName}
                            >
                              {locations.locationName}
                            </option>
                          ))}
                        </select>
                      </Form.Group>
                    </Col>
                    <Col
                      xxl={6}
                      lg={7}
                      md={6}
                      sm={7}
                      xs={12}
                      className="pickup-location-col-container"
                    >
                      <div className="pickup-location-text">
                        <span className="pickup-location-data">
                          {selectedpickUpLocation
                            ? mileleLocations.find(
                                (location) =>
                                  location.locationName ===
                                  selectedpickUpLocation
                              )?.locationDetails
                            : "Please select location from drop down"}
                        </span>
                      </div>
                    </Col>

                    <Col
                      xxl={3}
                      lg={2}
                      md={2}
                      sm={6}
                      xs={8}
                      className="d-flex justify-content-center align-items-center submit-button"
                    >
                      <button
                        className="btn btn-primary"
                        onClick={() => handleButtonClick("Pick")}
                      >
                        <span className="d-block text-center">Submit</span>
                      </button>
                    </Col>
                  </Row>
                </div>
              </Row>
            </div>
          )}
        </>
      </div>
    )
  );
};

export default CustomDropdown;

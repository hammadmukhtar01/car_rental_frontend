import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Form } from "react-bootstrap";
import $ from "jquery";

const DropoffLocationDropdown = ({
  show,
  handleButtonClick,
  cityNames,
  selectedDropoffCityName,
  setSelectedDropoffCityName,
  setDropoffLocation,
}) => {
  const [selectedButton, setSelectedButton] = useState("CompanyDropOff");

  useEffect(() => {
    if (show) {
      $("#deliverToCityNameSelect").select2({
        placeholder: "Choose City",
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

  const [selecteddropOffLocation, setSelecteddropOffLocation] = useState("");
  const [dropoffCityValue, setDropoffCityValue] = useState("")

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
    $("#dropoffSelfLocationNameSelect").select2({
      placeholder: "Select Location",
      data: mileleLocations.map((locations) => ({
        id: locations.locationName,
        locName: locations.locationName,
        text: locations.locationDetails,
      })),
    });

    return () => {
      $("#dropoffSelfLocationNameSelect").select2("destroy");
    };
  }, [mileleLocations]);

  return (
    show && (
      <div className="custom-dropdown p-4">
        <>
          <Row>
            <Col className="d-flex align-items-center dropoff-locations-button-col">
              <div className="pr-3">
                <button
                  className="btn btn-danger"
                  onClick={() => handleButtonToggle("CompanyDropOff")}
                >
                  Dropoff By Company
                </button>
              </div>{" "}
              <div>
                <button
                  className="btn btn-success pick-drop-myself-button"
                  onClick={() => handleButtonToggle("SelfDropOff")}
                >
                  Dropoff By Self
                </button>
              </div>
            </Col>
          </Row>
          <br />
          {selectedButton === "CompanyDropOff" && (
            <div className="drop-off-by-company-main-container">
              <Row>
                <div className="drop-off-by-company-container">
                  <Row>
                    <Col xxl={3} lg={3} md={3} sm={5} xs={12}>
                      <Form.Group controlId="formCarModel">
                        <select
                          id="CompanyDropOffLocationSelect"
                          className="form-select"
                          value={selectedDropoffCityName}
                          onChange={(e) => setSelectedDropoffCityName(e.target.value)}
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
                          value={dropoffCityValue}
                          onChange={(e) => setDropoffCityValue(e.target.value)}
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
                        onClick={() => handleButtonClick("SelfDropOff")}
                      >
                        <span className="d-block text-center">Submit</span>
                      </button>
                    </Col>
                  </Row>
                </div>
              </Row>
            </div>
          )}
          {selectedButton === "SelfDropOff" && (
            <div className="dropoff-myself-main-container">
              <Row>
                <div className="dropoff-car-details-container">
                  <Row>
                    <Col xxl={3} lg={3} md={3} sm={5} xs={12}>
                      <Form.Group controlId="formCarModel">
                        <select
                          id="CompanyDropOffLocationSelect"
                          className="form-select"
                          value={selecteddropOffLocation}
                          onChange={(e) =>
                            setSelecteddropOffLocation(e.target.value)
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
                      className="dropoff-location-col-container"
                    >
                      <div className="dropoff-location-text bg-white">
                        <span className="dropoff-location-data">
                          {selecteddropOffLocation
                            ? mileleLocations.find(
                                (location) =>
                                  location.locationName ===
                                  selecteddropOffLocation
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
                        onClick={() => handleButtonClick("SelfDropOff")}
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

export default DropoffLocationDropdown;

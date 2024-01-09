import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import {
  BsGeoAltFill,
  BsGeoAlt,
  BsCalendar2Check,
  BsCalendar4Week,
} from "react-icons/bs";
import "./homePage.css";
import CustomDropdown from "./pickupSearchBoxDropDown";

const SearchBox = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCarModel, setSelectedCarModel] = useState("");
  const [selectedButton, setSelectedButton] = useState("Deliver");

  const cityNames = useMemo(() => ["Sharja", "Dubai", "Burjman"], []);

  useEffect(() => {
    if (pickUpDate && dropOffDate) {
      const pickupDate = new Date(pickUpDate);
      const dropoffDate = new Date(dropOffDate);
      const timeDifference = dropoffDate.getTime() - pickupDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      setNumberOfDays(daysDifference);
    }
  }, [pickUpDate, dropOffDate]);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const isoDateString = currentDate.toISOString().slice(0, -8);
    return isoDateString;
  };
  const handleButtonClick = (option) => {
    if (option === "Deliver") {
      console.log("In delivery");
    } else if (option === "Pick") {
      console.log("In pick");
    }
    setShowDropdown(false);
    setSelectedButton(option);
  };

  return (
    <div className=" form-group bg-img-container pt-4">
      <div className="search-box-container">
        <Row>
          <Col lg={10} md={9} sm={12} xs={12}>
            <Row>
              <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                <Form.Group controlId="formKeyword">
                  <div className="location-label">
                    <label className="styled-label">
                      <BsGeoAlt className="mr-2" />
                      <b>Pickup Location</b>
                    </label>
                  </div>
                  <div className="custom-dropdown-container">
                    <input
                      className="form-control-location mt-2 col-12"
                      type="text"
                      placeholder="Enter pickup location"
                      defaultValue={pickupLocation}
                      onClick={() => setShowDropdown(!showDropdown)}
                    />
                    <CustomDropdown
                      show={showDropdown}
                      handleButtonClick={handleButtonClick}
                      cityNames={cityNames}
                      selectedCarModel={selectedCarModel}
                      setSelectedCarModel={setSelectedCarModel}
                      setDropoffLocation={setDropoffLocation}
                      selectedButton={selectedButton}
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col xxl={2} lg={3} md={5} sm={6} xs={12}>
                <Form.Group controlId="formPickupDateTime">
                  <div className="date-label">
                    <label className="styled-label">
                      <BsCalendar2Check className="mr-2" />
                      <b>Pickup Date</b>
                    </label>
                  </div>
                  <input
                    className="form-control-date mt-2 col-12"
                    type="date"
                    min={getCurrentDateTime()}
                    value={pickUpDate}
                    onChange={(e) => setPickUpDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xxl={2} lg={2} md={3} sm={6} xs={12}>
                <Form.Group controlId="formPickupDateTime">
                  <div className="date-label">
                    <label className="styled-label">
                      <b>Pickup Time</b>
                    </label>
                  </div>
                  <input
                    className="form-control-date mt-2 col-12"
                    type="time"
                    min={getCurrentDateTime()}
                    value={pickUpTime}
                    onChange={(e) => setPickUpTime(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xxl={2} lg={3} md={5} sm={6} xs={12}>
                <Form.Group controlId="formDropoffDateTime">
                  <div className="date-label">
                    <label className="styled-label">
                      <BsCalendar4Week className="mr-2" />
                      <b>Dropoff Date</b>
                    </label>
                  </div>
                  <input
                    className="form-control-date mt-2 col-12"
                    type="date"
                    min={pickUpDate}
                    value={dropOffDate}
                    onChange={(e) => setDropOffDate(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xxl={2} lg={2} md={3} sm={6} xs={12}>
                <Form.Group controlId="formDropoffDateTime">
                  <div className="date-label">
                    <label className="styled-label">
                      <b>Dropoff Time</b>
                    </label>
                  </div>
                  <input
                    className="form-control-date mt-2 col-12"
                    type="time"
                    // min={pickUpTime}
                    value={dropOffTime}
                    onChange={(e) => setDropOffTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                <Form.Group controlId="formLocation">
                  <div className="location-label">
                    <label className="styled-label">
                      <BsGeoAltFill className="mr-2" />
                      <b>DropOff Location</b>
                    </label>
                  </div>
                  <input
                    className=" form-control-location mt-2 col-12"
                    type="text"
                    placeholder="Enter dropoff location"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col lg={2} md={3} sm={6} xs={10} className="p-4">
            <Button variant="primary">Search</Button>
          </Col>
        </Row>

        <Row>
          <Col className="mt-2">
            {numberOfDays > 0 && (
              <span className="fs-5">
                Number of days:{" "}
                <span className="total-days">{numberOfDays}</span>
              </span>
            )}
          </Col>
        </Row>
      </div>
      <div className="bg-img"></div>
    </div>
  );
};

export default SearchBox;

import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  BsGeoAltFill,
  BsGeoAlt,
  BsCalendar2Check,
  BsCalendar4Week,
} from "react-icons/bs";
import "./homePage.css";
import PickupLocationDropdown from "./pickupSearchBoxDropDown";
import DropoffLocationDropdown from "./dropoffSearchBoxDropDown";
import MainNavbar from "../navbar/mainNavbar";
import AnimatedCarVideo from "../../images/noBgVideo3.webm";
import VideoPlayer from "./videoPlayer";

const SearchBox = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const [selectedPickupCityName, setSelectedPickupCityName] = useState("");
  const [selectedDropoffCityName, setSelectedDropoffCityName] = useState("");
  const [selectedPickUpOptionButton, setSelectedPickUpOptionButton] =
    useState("Deliver");
  const [selectedDropOffOptionButton, setSelectedDropOffOptionButton] =
    useState("CompanyDropOff");

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
  const handlePickUpButtonClick = (option) => {
    if (option === "Deliver") {
      console.log("In delivery", option);
    } else if (option === "Pick") {
      console.log("In pick up", option);
    }
    setShowPickupDropdown(false);
    setSelectedPickUpOptionButton(option);
  };

  const handleDropOffButtonClick = (option) => {
    if (option === "CompanyDropOff") {
      console.log("In company drop off", option);
    } else if (option === "SelfDropOff") {
      console.log("In self drop pick", option);
    }
    setShowDropoffDropdown(false);
    setSelectedDropOffOptionButton(option);
  };

  return (
    <>
      <div className="bg-img-container ">
        <div className="container">
          <MainNavbar />
          <div className="search-box-container pb-4">
            <Row>
              <Col>
                <Row>
                  <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                    <Form.Group controlId="formKeyword">
                      <div className="location-label">
                        <label className="styled-label">
                          <BsGeoAlt className="mr-2" />
                          <b>Pickup Option</b>
                        </label>
                      </div>
                      <div className="custom-dropdown-container">
                        <input
                          className="form-control-location mt-2 col-12"
                          type="text"
                          placeholder="Enter pickup Option"
                          defaultValue={pickupLocation}
                          onClick={() =>
                            setShowPickupDropdown(!showPickupDropdown)
                          }
                        />
                        <PickupLocationDropdown
                          show={showPickupDropdown}
                          handleButtonClick={handlePickUpButtonClick}
                          cityNames={cityNames}
                          selectedPickupCityName={selectedPickupCityName}
                          setSelectedPickupCityName={setSelectedPickupCityName}
                          setPickupLocation={setPickupLocation}
                          selectedPickUpOptionButton={
                            selectedPickUpOptionButton
                          }
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
                          <b>DropOff Option</b>
                        </label>
                      </div>
                      <div className="custom-dropdown-container">
                        <input
                          className="form-control-location mt-2 col-12"
                          type="text"
                          placeholder="Enter dropoff Option"
                          defaultValue={dropoffLocation}
                          onClick={() =>
                            setShowDropoffDropdown(!showDropoffDropdown)
                          }
                        />
                        <DropoffLocationDropdown
                          show={showDropoffDropdown}
                          handleButtonClick={handleDropOffButtonClick}
                          cityNames={cityNames}
                          selectedDropoffCityName={selectedDropoffCityName}
                          setSelectedDropoffCityName={
                            setSelectedDropoffCityName
                          }
                          setDropoffLocation={setDropoffLocation}
                          selectedDropOffOptionButton={
                            selectedDropOffOptionButton
                          }
                        />
                      </div>
                    </Form.Group>
                  </Col>

                  <Col
                    xxl={4}
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                    className="d-flex align-items-end mt-3"
                  >
                    <div className="button-container">
                      <button className="animated-button">
                        <span className="button-text-span">
                          <span className="transition"></span>
                          <span className="gradient"></span>
                          <span className="label">Search</span>
                        </span>
                      </button>
                    </div>
                  </Col>
                  <Col className="mt-2 d-flex align-items-end justify-content-end">
                    {numberOfDays > 0 && (
                      <span className="rental-period-label">
                        <span>Rental Period:</span>{" "}
                        <span className="total-days">{numberOfDays}</span>
                      </span>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>

        <div>
          <VideoPlayer videoUrl={AnimatedCarVideo} bgColor="" />
        </div>
      </div>
    </>
  );
};

export default SearchBox;

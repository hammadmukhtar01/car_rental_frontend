import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Form, Modal } from "react-bootstrap";
import { BsGeoAltFill, BsGeoAlt, BsCalendar2Check } from "react-icons/bs";
import "./homePage.css";
import PickupLocationModal from "./pickupSearchBoxDropDown";
import DropoffLocationModal from "./dropoffSearchBoxDropDown";
import MainNavbar from "../navbar/mainNavbar";
import AnimatedCarVideo from "../../images/noBgVideo3.webm";
import VideoPlayer from "./videoPlayer";
import { DateRange } from "react-date-range";
import { LuSearch } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [showDropoff, setShowDropoff] = useState(false);
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [pickupLocationMessage, setPickupLocationMessage] = useState("");
  const [dropoffLocationMessage, setDropoffLocationMessage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDropoffModal, setShowDropoffModal] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();

  const mileleLocations = [
    { id: 1, locationName: "Showroom 93", lat: 25.276987, lng: 55.296249 },
    { id: 2, locationName: "Showroom 11", lat: 35.476987, lng: 45.596249 },
  ];

  const cityNames = [
    { id: 1, locationName: "Sharja", lat: 25.276987, lng: 55.296249 },
    { id: 2, locationName: "Dubai", lat: 35.276987, lng: 65.296249 },
    { id: 3, locationName: "Burjman", lat: 45.276987, lng: 75.296249 },
  ];
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
      console.log("In delivery");
    } else if (option === "Pick") {
      console.log("In pick");
    }
    setPickupLocation(option);
    setShowPickupModal(false);
  };

  const handleDropOffButtonClick = (option) => {
    if (option === "Deliver") {
      console.log("In deliver drop off");
    } else if (option === "Pick") {
      console.log("In drop off pick");
    }
    setDropoffLocation(option);
    setShowDropoffModal(false);
  };

  const handleDropoffCheckboxChange = () => {
    setShowDropoff(!showDropoff);
  };

  const dateInputRef = useRef(null);

  const handleDateClick = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    const pickupDate = startDate ? startDate.toLocaleDateString() : null;
    const dropoffDate = endDate ? endDate.toLocaleDateString() : null;

    setPickUpDate(pickupDate);
    setDropOffDate(dropoffDate);

    console.log("Pickup Date:", pickupDate);
    console.log("Dropoff Date:", dropoffDate);

    setDateRange([ranges.selection]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("Clicked outside");
      if (
        showDatePicker &&
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target)
      ) {
        console.log("Closing datepicker");
        setShowDatePicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDatePicker]);

  const handleSearchCarButton = () => {
    alert("Loading required cars");
    navigate('/vehicles')
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
                  <Col xxl={3} lg={3} md={7} sm={6} xs={12}>
                    <Form.Group controlId="formDropoffDateTime">
                      <div className="date-label">
                        <label className="styled-label">
                          <BsCalendar2Check className="mr-2" />
                          <b>Pickup-Dropoff Date</b>
                        </label>
                      </div>
                      <div onClick={handleDateClick} ref={dateInputRef}>
                        <input
                          className="form-control-date mt-2 col-12"
                          type="text"
                          value={
                            dateRange[0].startDate
                              ? `${dateRange[0].startDate.toLocaleDateString()} - ${
                                  dateRange[0].endDate
                                    ? dateRange[0].endDate.toLocaleDateString()
                                    : "Select end date"
                                }`
                              : "Select date range"
                          }
                          readOnly
                        />
                      </div>
                      {showDatePicker && (
                        <div onClick={(e) => e.stopPropagation()}>
                          <DateRange
                            editableDateInputs={true}
                            onChange={handleDateChange}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRange}
                            disabledDay={(date) =>
                              date < new Date().setHours(0, 0, 0, 0)
                            }
                            onClose={() => setShowDatePicker(false)}
                          />
                        </div>
                      )}
                    </Form.Group>
                  </Col>

                  <Col
                    xxl={showDropoff ? 2 : 4}
                    lg={showDropoff ? 2 : 4}
                    md={5}
                    sm={6}
                    xs={12}
                    className={` ${
                      showDropoff ? "dropoff-visible" : "dropoff-hidden"
                    }`}
                  >
                    <Form.Group controlId="formKeyword">
                      <div className="location-label">
                        <label className="styled-label">
                          <BsGeoAlt className="mr-2" />
                          <b>Pick-Up</b>
                        </label>
                      </div>
                      <div className="custom-dropdown-container">
                        <input
                          className="form-control-location mt-2 col-12"
                          type="text"
                          placeholder="Enter pickup location"
                          value={pickupLocationMessage}
                          onChange={() => console.log("On change in pickup")}
                          onClick={() => setShowPickupModal(true)}
                        />
                      </div>
                    </Form.Group>
                    <div className="mt-2">
                      <Form.Check
                      className="diff-dropoff-loc-lable"
                        type="checkbox"
                        label="Different Dropoff Location"
                        onChange={handleDropoffCheckboxChange}
                      />
                    </div>
                  </Col>

                  {showDropoff && (
                    <Col xxl={2} lg={2} md={5} sm={6} xs={12}>
                      <Form.Group controlId="formKeyword">
                        <div className="location-label">
                          <label className="styled-label">
                            <BsGeoAltFill className="mr-2" />
                            <b>Drop-Off</b>
                          </label>
                        </div>
                        <div className="custom-dropdown-container">
                          <input
                            className="form-control-location mt-2 col-12"
                            type="text"
                            placeholder="Enter dropoff location"
                            value={dropoffLocationMessage}
                            onChange={() => console.log("On change in dropoff")}
                            onClick={() => setShowDropoffModal(true)}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  )}

                  <Modal
                    show={showPickupModal}
                    onHide={() => setShowPickupModal(false)}
                    size="xl"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Pickup Location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <PickupLocationModal
                        show={showPickupModal}
                        handleButtonClick={handlePickUpButtonClick}
                        cityNames={cityNames}
                        mileleLocations={mileleLocations}
                        updatePickupLocationMessage={setPickupLocationMessage}
                      />
                    </Modal.Body>
                  </Modal>

                  <Modal
                    show={showDropoffModal}
                    onHide={() => setShowDropoffModal(false)}
                    size="xl"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>DropOff Location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <DropoffLocationModal
                        show={showDropoffModal}
                        handleButtonClick={handleDropOffButtonClick}
                        cityNames={cityNames}
                        mileleLocations={mileleLocations}
                        updateDropoffLocationMessage={setDropoffLocationMessage}
                      />
                    </Modal.Body>
                  </Modal>

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

                  <Col xxl={1} lg={1} md={3} sm={6} xs={6} className="pt-5">
                    <div className="button-container">
                      <button
                        className="animated-search-button"
                        onClick={handleSearchCarButton}
                      >
                        {" "}
                        <span className="button-text-span">
                          <span className="transition"></span>
                          <span className="gradient"></span>
                          <span className="label">
                            {" "}
                            <LuSearch />{" "}
                          </span>
                        </span>
                      </button>
                    </div>
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

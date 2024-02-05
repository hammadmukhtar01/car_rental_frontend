import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Form, Modal } from "react-bootstrap";
import { BsGeoAltFill, BsGeoAlt, BsCalendar2Check } from "react-icons/bs";
import "./homepage.css";
import PickupLocationModal from "./pickupSearchBoxDropDown";
import DropoffLocationModal from "./dropoffSearchBoxDropDown";
import MainNavbar from "../navbar/mainNavbar";
import { DateRange } from "react-date-range";
import { LuSearch } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    {
      id: 2,
      locationName: "Showroom 11",
      lat: 25.17415786184568,
      lng: 55.37397086110656,
    },
  ];

  const cityNames = [
    { id: 1, locationName: "Sharjah", lat: 25.3461498, lng: 55.4210633 },
    {
      id: 2,
      locationName: "Dubai",
      lat: 25.246583391917024,
      lng: 55.36045718226757,
    },
    {
      id: 3,
      locationName: "Ajman",
      lat: 25.406758980569528,
      lng: 55.442444567785444,
    },
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
    // setPickupLocationMessage(option);
  };

  const handleDropOffButtonClick = (option) => {
    if (option === "Deliver") {
      console.log("In deliver drop off");
    } else if (option === "Pick") {
      console.log("In drop off pick");
    }
    setDropoffLocation(option);
    setShowDropoffModal(false);
    // setDropoffLocationMessage(option);
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

  const handleSearchCarButton = async (e) => {
    e.preventDefault();
    // alert("Loading required cars");
    toast.info("Loading required cars!", {
      autoClose: 3000,
      style: { border: "1px solid #c0c0c0" },
    });

    navigate("/vehicles");
    return false;
  };

  return (
    <>
      <div className="bg-img-container ">
        <MainNavbar />
        <div className="container">
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
                          required
                          placeholder="Enter pickup location"
                          value={pickupLocationMessage}
                          onChange={() => console.log("On change in pickup")}
                          onClick={() => setShowPickupModal(true)}
                        />
                      </div>
                    </Form.Group>
                    <div className="mt-2">
                      <Form.Check
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
                            required
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
                        initialSelectedLocation={pickupLocation}
                        initialInputFieldValue={pickupLocationMessage}

                        // Selected Pickup Type (Delivery, pickup)
                        // selected location name
                        // selected input address for location name
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
                        initialSelectedLocation={dropoffLocation}
                        initialInputFieldValue={dropoffLocationMessage}
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
                        required
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
                        required
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
                      <ToastContainer />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;

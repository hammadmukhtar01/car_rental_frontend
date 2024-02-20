import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Form, Modal } from "react-bootstrap";
import { BsGeoAltFill, BsGeoAlt, BsCalendar2Check } from "react-icons/bs";
import "./homepage.css";
import PickupLocationModal from "./pickupSearchBoxDropDown";
import DropoffLocationModal from "./dropoffSearchBoxDropDown";
import MainNavbar from "../navbar/mainNavbar";
import { DateRange } from "react-date-range";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const SearchBox = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [showDropoff, setShowDropoff] = useState(false);
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [pickupLocationMessage, setPickupLocationMessage] = useState("");
  const [dropoffLocationMessage, setDropoffLocationMessage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDropoffModal, setShowDropoffModal] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
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
      lat: 25.3461498,
      lng: 55.4210633,
    },
    {
      id: 3,
      locationName: "Ajman",
      lat: 25.3461498,
      lng: 55.4210633,
    },
    {
      id: 4,
      locationName: "Fujairah",
      lat: 25.3461498,
      lng: 55.4210633,
    },
    {
      id: 5,
      locationName: "Al Ain",
      lat: 25.3461498,
      lng: 55.4210633,
    },
    {
      id: 6,
      locationName: "Abu Dhabi",
      lat: 25.3461498,
      lng: 55.4210633,
    },
    {
      id: 7,
      locationName: "Ras Al Khaimah",
      lat: 25.3461498,
      lng: 55.4210633,
    },
  ];

  const generateTimeSlots = () => {
    const timeSlots = [];
    let hour = 8;
    let minute = 0;
    let ampm = "AM";

    while (!(hour === 23 && minute === 30)) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const time = `${formattedHour}:${formattedMinute} ${ampm}`;
      timeSlots.push({ label: time, value: time });

      minute += 30;
      if (minute === 60) {
        hour++;
        minute = 0;
      }
      if (hour === 12 && minute === 0) {
        ampm = "PM";
      }
    }

    return timeSlots;
  };

  const timeOptions = generateTimeSlots();

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

  const handleSearchVehicleButtonHomePage = async (e) => {
    e.preventDefault();

    if (!dateRange[0].startDate || !dateRange[0].endDate) {
      toast.warn("Date must be chosen", {
        autoClose: 1000,
        style: { border: "1px solid #c0c0c0", fontSize: "14px" },
      });
      return;
    }

    const startLocalDate = new Date(
      dateRange[0].startDate.getTime() -
        dateRange[0].startDate.getTimezoneOffset() * 60000
    );
    const endLocalDate = new Date(
      dateRange[0].endDate.getTime() -
        dateRange[0].endDate.getTimezoneOffset() * 60000
    );

    const startDate = startLocalDate.toISOString().split("T")[0];
    const endDate = endLocalDate.toISOString().split("T")[0];
    const url = `/vehicles?startDate=${startDate}&endDate=${endDate}`;

    navigate(url);
  };

  const selectStyles = {
    control: (provided, { hasValue }) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid rgb(184, 184, 184)",
      boxShadow: "none",
      lineHeight: "32px",
      marginLeft: "-13px",
      marginRight: "-14px",
      borderRadius: "6px",
      ":hover": {
        border: "1px solid rgb(184, 184, 184)",
      },
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: isSelected ? "#cc6119" : "white",
      ":hover": {
        backgroundColor: isSelected ? "#cc6119" : "rgb(229, 229, 229)",
      },
    }),
  };

  return (
    <>
      <div className="bg-img-container ">
        <MainNavbar />
        <div className="container">
          <div className="search-box-container pb-4">
            <Row>
              <Col>
                <form
                  action="#"
                  className="signin-form"
                  onSubmit={handleSearchVehicleButtonHomePage}
                >
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
                            required
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
                              rangeColors={["#cc6119"]}
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
                      xxl={4}
                      lg={4}
                      md={showDropoff ? 9 : 6}
                      sm={12}
                      xs={12}
                    >
                      <Row>
                        <Col
                          xxl={showDropoff ? 6 : 12}
                          lg={showDropoff ? 6 : 12}
                          md={showDropoff ? 6 : 12}
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
                                onChange={() =>
                                  console.log("On change in pickup")
                                }
                                onClick={() => setShowPickupModal(true)}
                              />
                            </div>
                          </Form.Group>
                        </Col>

                        {showDropoff && (
                          <Col xxl={6} lg={6} md={6} sm={6} xs={12}>
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
                                  onChange={() =>
                                    console.log("On change in dropoff")
                                  }
                                  onClick={() => setShowDropoffModal(true)}
                                />
                              </div>
                            </Form.Group>
                          </Col>
                        )}
                      </Row>
                      <Row>
                        <div className="mt-2">
                          <Form.Check
                            type="checkbox"
                            label="Different Dropoff Location"
                            onChange={handleDropoffCheckboxChange}
                          />
                        </div>
                      </Row>
                    </Col>

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
                          updateDropoffLocationMessage={
                            setDropoffLocationMessage
                          }
                          initialSelectedLocation={dropoffLocation}
                          initialInputFieldValue={dropoffLocationMessage}
                        />
                      </Modal.Body>
                    </Modal>

                    <Col xxl={2} lg={2} md={3} sm={6} xs={12}>
                      <Form.Group controlId="formKeyword">
                        <div className="location-label">
                          <label className="styled-label mb-3">
                            <b>Pickup Time</b>
                          </label>
                        </div>
                        <Select
                          options={timeOptions}
                          // required
                          className="form-control-pickup-time col-12"
                          value={timeOptions.find(
                            (option) => option.value === pickUpTime
                          )}
                          onChange={(selectedOption) => {
                            console.log("Selected option is: ", selectedOption);
                            setPickUpTime(selectedOption.value);
                          }}
                          styles={selectStyles}
                        />
                      </Form.Group>
                    </Col>

                    <Col xxl={2} lg={2} md={3} sm={6} xs={12}>
                      <Form.Group controlId="formKeyword">
                        <div className="location-label">
                          <label className="styled-label mb-3">
                            <b>Dropoff Time</b>
                          </label>
                        </div>
                        <Select
                          options={timeOptions}
                          // required
                          className="form-control-dropoff-time col-12"
                          value={timeOptions.find(
                            (option) => option.value === dropOffTime
                          )}
                          onChange={(selectedOption) => {
                            console.log(
                              "Selected Dropoff option is: ",
                              selectedOption
                            );
                            setDropOffTime(selectedOption.value);
                          }}
                          styles={selectStyles}
                        />
                      </Form.Group>
                    </Col>

                    <Col xxl={1} lg={1} md={3} sm={6} xs={6} className="pt-5">
                      <div className="button-container">
                        <button
                          className="animated-search-button"
                          // onClick={handleSearchCarButton}
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
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;

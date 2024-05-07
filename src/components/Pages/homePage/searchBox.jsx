/* eslint-disable no-unused-vars */
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
import UseGlobalFormFields from "../Utils/useGlobalFormFields";

const SearchBox = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [showDropoff, setShowDropoff] = useState(false);
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [pickupLocationMessage, setPickupLocationMessage] = useState("");
  console.log("pickup loc msg is-----------: ", pickupLocationMessage);
  const [dropoffLocationMessage, setDropoffLocationMessage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDropoffModal, setShowDropoffModal] = useState(false);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [inputPickupFieldValue, setPickupInputFieldValue] = useState("");
  const [inputDropoffFieldValue, setDropoffInputFieldValue] = useState("");
  const [activeSelection, setActiveSelection] = useState({
    startDate: false,
    endDate: false,
  });

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);

  useEffect(() => {
    console.log("ddddddd rrrrrrrrrrrrrrrr- ---- is: ", dateRange);
  }, [dateRange]);

  useEffect(() => {
    const reqLocalStorageData = localStorage.getItem("formFields");
    if (reqLocalStorageData) {
      const storedFormFields = JSON.parse(reqLocalStorageData);
      console.log("Stored date range is: ", storedFormFields);
      let storedStartDateRange;
      let storedEndDateRange;
      let pickupLocMainInput;
      let dropoffLocMainInput;
      let pickupLocTabV1;
      let dropoffLocTabV1;
      let checkBoxStoredValue;

      if (storedFormFields) {
        checkBoxStoredValue = storedFormFields?.showDropoffV1 === 1;
        console.log(
          "jfvnj checkBoxStoredValuendfe --- 1/0 -- ",
          checkBoxStoredValue
        );
        setShowDropoff(checkBoxStoredValue);

        pickupLocTabV1 = storedFormFields?.selectedTabPickUp;
        dropoffLocTabV1 = storedFormFields?.selectedTabDropOff;
        // pickupLocMainInput = storedFormFields?.pickupInputMessageV1;
        // setPickupLocationMessage(pickupLocMainInput? pickupLocMainInput : '');

        // pickupLocMainInput = storedFormFields?.deliveryMapLocPickUp;
        // setPickupLocationMessage(pickupLocMainInput? pickupLocMainInput : '');

        if (storedFormFields?.dateRangeV1) {
          storedStartDateRange = new Date(
            storedFormFields.dateRangeV1.startDate
          );
          storedEndDateRange = new Date(storedFormFields.dateRangeV1.endDate);
          if (
            isNaN(storedStartDateRange.getTime()) ||
            isNaN(storedEndDateRange.getTime())
          ) {
            storedStartDateRange = new Date(); // Fallback to current date
            storedEndDateRange = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000
            ); // Fallback to tomorrow
          }
        }

        if (pickupLocTabV1 === "pick") {
          pickupLocMainInput = storedFormFields?.pickupInputMessageV1;
          setPickupLocationMessage(
            pickupLocMainInput ? pickupLocMainInput : ""
          );
        } else if (pickupLocTabV1 === "deliver") {
          pickupLocMainInput = storedFormFields?.deliveryMapLocPickUp;
          setPickupLocationMessage(
            pickupLocMainInput ? pickupLocMainInput : ""
          );
        }
        if (dropoffLocTabV1 === "pick") {
          dropoffLocMainInput = storedFormFields?.dropoffInputMessageV1;
          setDropoffLocationMessage(dropoffLocMainInput);
        } else if (dropoffLocTabV1 === "deliver") {
          dropoffLocMainInput = storedFormFields?.deliveryMapLocDropOff;
          setDropoffLocationMessage(dropoffLocMainInput);
        }
        const storedPickUpTime = storedFormFields?.pickTimeV1 || "";
        setPickUpTime(storedPickUpTime);
        const storedDropOffTime = storedFormFields?.dropTimeV1 || "";
        setDropOffTime(storedDropOffTime);
      }

      setDateRange([
        {
          startDate: storedStartDateRange || new Date(),
          endDate:
            storedEndDateRange ||
            new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          key: "selection",
        },
      ]);
    }
  }, []);

  const navigate = useNavigate();
  const { formFields, handleFieldChange } = UseGlobalFormFields({
    pickTimeV1: pickUpTime || "",
    dropTimeV1: dropOffTime || "",
    dateRangeV1: dateRange || "",
    showDropoffV1: 0,
  });

  const handlePickupTimeChange = (selectedOption) => {
    console.log("Selected time option is: ", selectedOption);
    setPickUpTime(selectedOption.value);
    handleFieldChange("pickTimeV1", selectedOption.value);
  };

  const handleDropoffTimeChange = (selectedOption) => {
    console.log("Selected time option is: ", selectedOption);
    setDropOffTime(selectedOption.value);
    handleFieldChange("dropTimeV1", selectedOption.value);
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    let hour = 7;
    let minute = 0;
    let ampm = "AM";
    while (!(hour === 23 && minute === 30)) {
      let formattedHour;
      if (hour <= 12) {
        formattedHour = hour.toString().padStart(2, "0");
      } else {
        const newhour = hour - 12;
        formattedHour = newhour.toString().padStart(2, "0");
      }

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
    handleFieldChange("showDropoffV1", !showDropoff ? 1 : 0);
  };

  const dateInputRef = useRef(null);

  const handleDateClick = () => {
    setActiveSelection({ startDate: false, endDate: false });
    setShowDatePicker(true);
  };

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    const pickupDate = startDate ? startDate.toLocaleDateString() : null;
    const dropoffDate = endDate ? endDate.toLocaleDateString() : null;

    setPickUpDate(pickupDate);
    setDropOffDate(dropoffDate);

    setActiveSelection(prev => ({
      startDate: true,
      endDate: prev.startDate ? true : false
  }));

    console.log("Pickup Date:", pickupDate);
    console.log("Dropoff Date:", dropoffDate);

    if (activeSelection.startDate && endDate) {
      setShowDateRangeModal(false);
    }

    const updatedStartDate = startDate
      ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
      : null;
    const updatedEndDate = endDate
      ? new Date(endDate.getTime() + 24 * 60 * 60 * 1000)
      : null;

    const dateRangeObject = {
      startDate: updatedStartDate.toISOString().split("T")[0],
      endDate: updatedEndDate.toISOString().split("T")[0],
      // key: "selection",
    };

    handleFieldChange("dateRangeV1", dateRangeObject);

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
    console.log(
      `pickup time is: ${pickUpTime} and dropoff time is: ${dropOffTime} and pickup loc msg is: ${pickupLocationMessage} and dropoff loc msg is: ${dropoffLocationMessage}`
    );
    if (
      !pickUpTime ||
      !dropOffTime ||
      !pickupLocationMessage ||
      (showDropoff === true && !dropoffLocationMessage)
    ) {
      toast.error("Some inputs are missing.", {
        autoClose: 1000,
        style: {
          border: "1px solid #c0c0c0",
          fontWeight: "400",
          fontSize: "16px",
        },
      });
      return;
    }

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
    const url = `/vehicles?startDate=${startDate}&endDate=${endDate}&pickupTime=${pickUpTime}&dropoffTime=${dropOffTime}&pickupLoc=${pickupLocationMessage}&dropoffLoc=${dropoffLocationMessage}`;

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
      backgroundColor: isSelected ? "#e87a28" : "white",
      ":hover": {
        backgroundColor: isSelected ? "#e87a28" : "rgb(229, 229, 229)",
      },
    }),
  };

  const handleInputFieldChange = (value) => {
    setPickupInputFieldValue(value);
  };

  return (
    <>
      <div className="bg-img-container ">
        {/* <MainNavbar /> */}
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
                            <b>Pickup-Dropoff Date *</b>
                          </label>
                        </div>
                        <div onClick={handleDateClick} ref={dateInputRef}>
                          <input
                            className="form-control-date mt-2 col-12"
                            type="text"
                            required
                            value={
                              formFields?.dateRangeV1?.startDate &&
                              formFields?.dateRangeV1?.endDate
                                ? `${new Date(
                                    formFields?.dateRangeV1?.startDate
                                  ).toLocaleDateString()} - ${new Date(
                                    formFields?.dateRangeV1?.endDate
                                  ).toLocaleDateString()}`
                                : "Select date range"
                            }
                            onClick={() => setShowDateRangeModal(true)}
                            readOnly
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    <Modal
                      show={showDateRangeModal}
                      onHide={() => setShowDateRangeModal(false)}
                      size="sm"
                    >
                      <DateRange
                        editableDateInputs={true}
                        onChange={handleDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        rangeColors={["#e87a28"]}
                        disabledDay={(date) =>
                          date < new Date().setHours(0, 0, 0, 0)
                        }
                        onClose={() => setShowDatePicker(false)}
                      />
                    </Modal>

                    <Col
                      xxl={4}
                      lg={4}
                      md={showDropoff ? 9 : 6}
                      sm={12}
                      xs={12}
                    >
                      <Row>
                        {/* Error  */}
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
                                <b>Pick-Up *</b>
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

                        {showDropoff ? (
                          <Col xxl={6} lg={6} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <BsGeoAltFill className="mr-2" />
                                  <b>Drop-Off *</b>
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
                        ) : null}
                      </Row>
                      <Row>
                        <div className="mt-2">
                          <Form.Check
                            type="checkbox"
                            label="Different Dropoff Location"
                            onChange={handleDropoffCheckboxChange}
                            checked={showDropoff}
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
                          updatePickupLocationMessage={setPickupLocationMessage}
                          initialSelectedLocation={pickupLocation}
                          initialInputFieldValue={pickupLocationMessage}
                          inputPickupFieldValue={inputPickupFieldValue}
                          setPickupInputFieldValue={setPickupInputFieldValue}
                          handleInputFieldChange={handleInputFieldChange}
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
                          updateDropoffLocationMessage={
                            setDropoffLocationMessage
                          }
                          initialSelectedLocation={dropoffLocation}
                          initialInputFieldValue={dropoffLocationMessage}
                          inputDropoffFieldValue={inputDropoffFieldValue}
                          setDropoffInputFieldValue={setDropoffInputFieldValue}
                          handleInputFieldChange={handleInputFieldChange}
                        />
                      </Modal.Body>
                    </Modal>

                    <Col xxl={2} lg={2} md={3} sm={6} xs={12}>
                      <Form.Group controlId="formKeyword">
                        <div className="location-label">
                          <label className="styled-label mb-3">
                            <b>Pickup Time *</b>
                          </label>
                        </div>
                        <Select
                          options={timeOptions}
                          required
                          className="form-control-pickup-time col-12"
                          value={timeOptions.find(
                            (option) => option.value === formFields.pickTimeV1
                          )}
                          onChange={handlePickupTimeChange}
                          // onChange={(selectedOption) => {
                          //   console.log("Selected option is: ", selectedOption);
                          //   setPickUpTime(selectedOption.value);
                          // }}
                          styles={selectStyles}
                        />
                      </Form.Group>
                    </Col>

                    <Col xxl={2} lg={2} md={3} sm={6} xs={12}>
                      <Form.Group controlId="formKeyword">
                        <div className="location-label">
                          <label className="styled-label mb-3">
                            <b>Dropoff Time *</b>
                          </label>
                        </div>
                        <Select
                          options={timeOptions}
                          required
                          className="form-control-dropoff-time col-12"
                          value={timeOptions.find(
                            (option) => option.value === formFields.dropTimeV1
                          )}
                          onChange={handleDropoffTimeChange}
                          // value={timeOptions.find(
                          //   (option) => option.value === dropOffTime
                          // )}
                          // onChange={(selectedOption) => {
                          //   console.log(
                          //     "Selected Dropoff option is: ",
                          //     selectedOption
                          //   );
                          //   setDropOffTime(selectedOption.value);
                          // }}
                          styles={selectStyles}
                        />
                      </Form.Group>
                    </Col>

                    <Col xxl={1} lg={1} md={3} sm={6} xs={6} className="pt-5">
                      <div className="button-container">
                        <button className="animated-search-button">
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

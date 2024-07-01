/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Form, Modal } from "react-bootstrap";
import { BsGeoAltFill, BsGeoAlt, BsCalendar2Check } from "react-icons/bs";
import "./homepage.css";
import PickupLocationModal from "./pickupSearchBoxDropDown";
import DropoffLocationModal from "./dropoffSearchBoxDropDown";
import { DateRange } from "react-date-range";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import UseGlobalFormFields from "../Utils/useGlobalFormFields";
import "../OtherPages/toastStyle.css";

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
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [inputPickupFieldValue, setPickupInputFieldValue] = useState("");
  const [inputDropoffFieldValue, setDropoffInputFieldValue] = useState("");
  const [pickupSelectedTab, setPickupSelectedTab] = useState("");
  const [dropoffSelectedTab, setDropoffSelectedTab] = useState("");
  const [pickupStateValueProp, setPickupStateValueProp] = useState("DUBAI");
  const [dropoffStateValueProp, setDropoffStateValueProp] = useState("DUBAI");

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

  useEffect(() => {}, [dateRange]);

  const localStorageDataCalculation = () => {
    const reqLocalStorageData = localStorage?.getItem("formFields");
    if (reqLocalStorageData) {
      const storedFormFields = JSON.parse(reqLocalStorageData);
      let storedStartDateRange, storedEndDateRange;

      if (storedFormFields) {
        setShowDropoff(storedFormFields?.showDropoffV1 === 1);

        const pickupLocTabV1 = storedFormFields?.selectedTabPickUp;
        const dropoffLocTabV1 = storedFormFields?.selectedTabDropOff;

        if (storedFormFields?.dateRangeV1) {
          storedStartDateRange = new Date(
            storedFormFields?.dateRangeV1?.startDate
          );
          storedEndDateRange = new Date(storedFormFields?.dateRangeV1?.endDate);
          if (
            isNaN(storedStartDateRange.getTime()) ||
            isNaN(storedEndDateRange.getTime())
          ) {
            storedStartDateRange = new Date();
            storedEndDateRange = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000
            );
          }
        }

        if (pickupLocTabV1 === "pick") {
          setPickupLocationMessage(
            storedFormFields?.pickupInputMessageV1 || ""
          );
        } else if (pickupLocTabV1 === "deliver") {
          setPickupLocationMessage(
            storedFormFields?.deliveryMapLocPickUp || ""
          );
        }

        if (dropoffLocTabV1 === "pick") {
          setDropoffLocationMessage(
            storedFormFields?.dropoffInputMessageV1 || ""
          );
        } else if (dropoffLocTabV1 === "deliver") {
          setDropoffLocationMessage(
            storedFormFields?.deliveryMapLocDropOff || ""
          );
        }

        setDropoffInputFieldValue(
          storedFormFields?.inputDropoffFieldValue || ""
        );

        setPickupInputFieldValue(storedFormFields?.inputPickupFieldValue || "");

        setPickUpTime(storedFormFields?.pickTimeV1 || "");
        setDropOffTime(storedFormFields?.dropTimeV1 || "");
        setPickupSelectedTab(storedFormFields?.selectedTabPickUp || "");
        setDropoffSelectedTab(storedFormFields?.selectedTabDropOff || "");
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
  };

  useEffect(() => {
    localStorageDataCalculation();
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
    setPickUpTime(selectedOption?.value);
    handleFieldChange("pickTimeV1", selectedOption?.value);
  };

  const handleDropoffTimeChange = (selectedOption) => {
    console.log("Selected time option is: ", selectedOption);
    setDropOffTime(selectedOption?.value);
    handleFieldChange("dropTimeV1", selectedOption?.value);
  };

  const validateTimeDifference = (pickUpTime, dropOffTime) => {
    const [pickUpHour, pickUpMinute] = pickUpTime.split(/[: ]/);
    const [dropOffHour, dropOffMinute] = dropOffTime.split(/[: ]/);

    const pickUpDate = new Date();
    const dropOffDate = new Date();

    pickUpDate.setHours(
      pickUpTime.includes("PM") && pickUpHour !== "12"
        ? parseInt(pickUpHour) + 12
        : parseInt(pickUpHour)
    );
    pickUpDate.setMinutes(parseInt(pickUpMinute));

    dropOffDate.setHours(
      dropOffTime.includes("PM") && dropOffHour !== "12"
        ? parseInt(dropOffHour) + 12
        : parseInt(dropOffHour)
    );
    dropOffDate.setMinutes(parseInt(dropOffMinute));

    const timeDifference = (dropOffDate - pickUpDate) / (1000 * 60);

    if (timeDifference < 60) {
      return false;
    } else return true;
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
    handleFieldChange("showDropoffV1", !showDropoff ? 1 : 0);
  };

  const dateInputRef = useRef(null);

  const handleDateClick = () => {
    setActiveSelection({ startDate: false, endDate: false });
    setShowDatePicker(true);
  };

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges?.selection;

    const pickupDate = startDate ? startDate?.toLocaleDateString() : null;
    const dropoffDate = endDate ? endDate?.toLocaleDateString() : null;

    setPickUpDate(pickupDate);
    setDropOffDate(dropoffDate);

    setActiveSelection((prev) => ({
      startDate: true,
      endDate: prev.startDate ? true : false,
    }));

    console.log("Pickup Date:", pickupDate);
    console.log("Dropoff Date:", dropoffDate);

    if (activeSelection?.startDate && endDate) {
      setShowDateRangeModal(false);
    }

    const updatedStartDate = startDate
      ? new Date(startDate?.getTime() + 24 * 60 * 60 * 1000)
      : null;
    const updatedEndDate = endDate
      ? new Date(endDate?.getTime() + 24 * 60 * 60 * 1000)
      : null;

    const dateRangeObject = {
      startDate: updatedStartDate?.toISOString().split("T")[0],
      endDate: updatedEndDate?.toISOString().split("T")[0],
    };

    handleFieldChange("dateRangeV1", dateRangeObject);

    setDateRange([ranges?.selection]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("Clicked outside");
      if (
        showDatePicker &&
        dateInputRef?.current &&
        !dateInputRef?.current?.contains(event.target)
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

  const calculateNumberOfDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
  };

  const onPickupSelectTabChange = (tab) => {
    console.log("pickupSelectedTab Tab in all vehciles page is :", tab);
    setPickupSelectedTab(tab);
  };

  const onDropoffSelectTabChange = (tab) => {
    console.log("dropoffSelectedTab Tab in all vehciles page is :", tab);
    setDropoffSelectedTab(tab);
  };

  const handlePickupStateChange = (stateName) => {
    setPickupStateValueProp(stateName);
    console.log("Pickup state changed to:", stateName);
  };

  const handleDropoffStateChange = (stateName) => {
    setDropoffStateValueProp(stateName);
    console.log("Dropoff state changed to:", stateName);
  };

  const handleSearchClick = () => {
    console.log("Search button is clicked");
  };

  const handleSearchVehicleButtonHomePage = async (e) => {
    e.preventDefault();
    handleSearchClick();
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

    if (!dateRange[0]?.startDate || !dateRange[0]?.endDate) {
      toast.warn("Date must be chosen", {
        autoClose: 1000,
        style: { border: "1px solid #c0c0c0", fontSize: "14px" },
      });
      return;
    }

    const startLocalDate = new Date(
      dateRange[0]?.startDate?.getTime() -
        dateRange[0]?.startDate?.getTimezoneOffset() * 60000
    );
    const endLocalDate = new Date(
      dateRange[0]?.endDate?.getTime() -
        dateRange[0]?.endDate?.getTimezoneOffset() * 60000
    );

    const startDate = startLocalDate?.toISOString()?.split("T")[0];
    const endDate = endLocalDate?.toISOString()?.split("T")[0];
    const numberOfDays = calculateNumberOfDays(startLocalDate, endLocalDate);

    const url = `/vehicles?startDate=${startDate}&endDate=${endDate}&pickupTime=${pickUpTime}&dropoffTime=${dropOffTime}&pickupLoc=${pickupLocationMessage}&dropoffLoc=${dropoffLocationMessage}&pickupLocState=${pickupStateValueProp}&dropoffLocState=${dropoffStateValueProp}&pickupLocSelectedTab=${pickupSelectedTab}&dropoffLocSelectedTab=${dropoffSelectedTab}`;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "searchButtonClick",
      nextUrl: url,
    });
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

  const handlePickupInputFieldChange = (value) => {
    setPickupInputFieldValue(value);
  };

  const handleDropoffInputFieldChange = (value) => {
    setDropoffInputFieldValue(value);
  };

  return (
    <>
      <div className="bg-img-container ">
        <div className="container">
          <div className="search-box-container pb-4">
            <Row>
              <Col>
                <form
                  action="#"
                  className="search-input-fields-form"
                  onSubmit={handleSearchVehicleButtonHomePage}
                >
                  <Row>
                    <Col xxl={3} lg={3} md={7} sm={6} xs={12}>
                      <Form.Group controlId="formDropoffDateTime">
                        <div className="date-label">
                          <label className="styled-label">
                            <BsCalendar2Check className="mr-2" />
                            <b>Pick & Drop Date *</b>
                          </label>
                        </div>
                        <div onClick={handleDateClick} ref={dateInputRef}>
                          <input
                            className="form-control-date mt-2 col-12"
                            type="text"
                            id="searchboxInputDate"
                            required
                            value={
                              formFields?.dateRangeV1?.startDate &&
                              formFields?.dateRangeV1?.endDate
                                ? `${new Date(
                                    formFields?.dateRangeV1?.startDate
                                  )?.toLocaleDateString()} - ${new Date(
                                    formFields?.dateRangeV1?.endDate
                                  )?.toLocaleDateString()}`
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
                      className="search-box-date-picker-modal"
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
                                id="searchboxInputPickUpLoc"
                                placeholder="Enter pickup location"
                                value={`${pickupLocationMessage} - ${inputPickupFieldValue}`}
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
                                  id="searchboxInputDropOffLoc"
                                  placeholder="Enter dropoff location"
                                  value={`${dropoffLocationMessage} - ${inputDropoffFieldValue}`}
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
                            id="searchboxInputDiffLocCheckbox"
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
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <span className="modal-heading">
                            Pickup Location{" "}
                          </span>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <PickupLocationModal
                          show={showPickupModal}
                          handleButtonClick={handlePickUpButtonClick}
                          updatePickupLocationMessage={setPickupLocationMessage}
                          initialSelectedLocation={pickupLocation}
                          PickupInitialInputFieldValue={pickupLocationMessage}
                          inputPickupFieldValue={inputPickupFieldValue}
                          setPickupInputFieldValue={setPickupInputFieldValue}
                          handlePickupInputFieldChange={
                            handlePickupInputFieldChange
                          }
                          onSelectTabChange={onPickupSelectTabChange}
                          onStateChange={handlePickupStateChange}
                        />
                      </Modal.Body>
                    </Modal>

                    <Modal
                      show={showDropoffModal}
                      onHide={() => setShowDropoffModal(false)}
                      size="xl"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <span className="modal-heading">
                            DropOff Location
                          </span>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <DropoffLocationModal
                          show={showDropoffModal}
                          handleButtonClick={handleDropOffButtonClick}
                          updateDropoffLocationMessage={
                            setDropoffLocationMessage
                          }
                          initialSelectedLocation={dropoffLocation}
                          dropoffInitialInputFieldValue={dropoffLocationMessage}
                          inputDropoffFieldValue={inputDropoffFieldValue}
                          setDropoffInputFieldValue={setDropoffInputFieldValue}
                          handleDropoffInputFieldChange={
                            handleDropoffInputFieldChange
                          }
                          onSelectTabChange={onDropoffSelectTabChange}
                          onStateChange={handleDropoffStateChange}
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
                          id="searchboxInputPickUpTime"
                          value={timeOptions?.find(
                            (option) => option?.value === formFields?.pickTimeV1
                          )}
                          onChange={handlePickupTimeChange}
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
                          id="searchboxInputDropOffTime"
                          value={timeOptions?.find(
                            (option) => option?.value === formFields?.dropTimeV1
                          )}
                          onChange={handleDropoffTimeChange}
                          styles={selectStyles}
                        />
                      </Form.Group>
                    </Col>

                    <Col
                      xxl={1}
                      lg={1}
                      md={3}
                      sm={6}
                      xs={6}
                      id="home-page-search-box-button"
                      className="search-box-search-button-div"
                    >
                      <button
                        type="submit"
                        className="search-box-search-button"
                        id="home-page-search-box-button"
                        onClick={handleSearchClick}
                      >
                        <span id="home-page-search-box-button">
                          <LuSearch id="home-page-search-box-button" />
                        </span>
                      </button>
                      <ToastContainer />
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

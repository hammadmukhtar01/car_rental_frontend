/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Row, Col, Form, Modal } from "react-bootstrap";
import { BsGeoAltFill, BsGeoAlt, BsCalendar2Check } from "react-icons/bs";
import "./homepage.css";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import "../OtherPages/toastStyle.css";

const locations = [
  { value: "FUJAIRAH", label: "FUJAIRAH" },
  { value: "ABU_DHABI", label: "ABU DHABI" },
  { value: "DUBAI", label: "DUBAI" },
  { value: "RAS_AL_KHAIMAH", label: "RAS AL KHAIMAH" },
  { value: "SHARJAH", label: "SHARJAH" },
  { value: "AJMAN", label: "AJMAN" },
  { value: "UMM_AL_QUWAIN", label: "Umm Al Quwain" },
];

const SearchBox = () => {
  const [showDropoff, setShowDropoff] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);

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
    const storedUserData = JSON.parse(localStorage.getItem("userLocationData"));
    if (storedUserData) {
      setPickupLocation(storedUserData?.userData?.pickupLocation);
      setDropoffLocation(storedUserData?.userData?.dropoffLocation);
      setShowDropoff(storedUserData?.userData?.showDropoff || false);
      setDateRange([
        {
          startDate: new Date(storedUserData?.userData?.dateRange?.startDate),
          endDate: new Date(storedUserData?.userData?.dateRange?.endDate),
          key: "selection",
        },
      ]);
    }
  }, []);

  const navigate = useNavigate();

  const userDataHandling = useMemo(
    () => JSON.parse(localStorage.getItem("userLocationData")),
    []
  );

  const updateLocalStorage = (newUserData) => {
    localStorage.setItem("userLocationData", JSON.stringify(newUserData));
  };

  const handleDropoffCheckboxChange = () => {
    const newShowDropoff = !showDropoff;
    setShowDropoff(newShowDropoff);
    const updatedUserData = {
      ...userDataHandling,
      userData: {
        ...userDataHandling?.userData,
        showDropoff: newShowDropoff,
        dropoffLocation: newShowDropoff ? dropoffLocation : "",
      },
    };
    setDropoffLocation(newShowDropoff ? dropoffLocation : "");
    updateLocalStorage(updatedUserData);
  };

  const dateInputRef = useRef(null);

  const handleDateClick = () => {
    setActiveSelection({ startDate: false, endDate: false });
  };

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges?.selection;

    setActiveSelection((prev) => ({
      startDate: true,
      endDate: prev.startDate ? true : false,
    }));

    if (activeSelection?.startDate && endDate) {
      setShowDateRangeModal(false);
    }

    setDateRange([ranges?.selection]);
  };

  const calculateNumberOfDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
  };

  const handleSearchClick = () => {
    console.log("Search button is clicked");
  };

  const handleSearchVehicleButtonHomePage = async (e) => {
    e.preventDefault();
    handleSearchClick();
    if (!pickupLocation || (showDropoff && !dropoffLocation)) {
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

    const userData = {
      pickupLocation,
      dropoffLocation,
      showDropoff,
      dateRange: {
        startDate,
        endDate,
      },
    };

    updateLocalStorage({ ...userDataHandling, userData });

    const url = `/vehicles?startDate=${startDate}&endDate=${endDate}&pickupLoc=${pickupLocation?.value}&dropoffLoc=${dropoffLocation?.value}`;

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
      // marginLeft: "-13px",
      // marginRight: "-14px",
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
                    <Col xxl={3} lg={3} md={4} sm={10} xs={12}>
                      <Form.Group controlId="formDropoffDateTime">
                        <div className="date-label">
                          <label className="styled-label">
                            <BsCalendar2Check className="mr-2" />
                            <b>Pick & Drop Date *</b>
                          </label>
                        </div>
                        <div onClick={handleDateClick} ref={dateInputRef}>
                          <label
                            htmlFor="searchboxInputDate"
                            className="d-none"
                          >
                            {" "}
                            Date Range
                          </label>
                          <input
                            className="form-control-date mt-2 col-12"
                            type="text"
                            id="searchboxInputDate"
                            required
                            value={`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
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
                      />
                    </Modal>

                    <Col
                      xxl={showDropoff ? 3 : 6}
                      lg={showDropoff ? 3 : 6}
                      md={showDropoff ? 4 : 6}
                      sm={showDropoff ? 6 : 12}
                      xs={showDropoff ? 12 : 12}
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

                        <Select
                          className="mt-2"
                          id="searchboxInputPickUpLoc"
                          options={locations}
                          value={pickupLocation}
                          onChange={setPickupLocation}
                          placeholder="Pickup Loc"
                          styles={selectStyles}
                        />
                      </Form.Group>
                    </Col>

                    {showDropoff ? (
                      <Col xxl={3} lg={3} md={4} sm={6} xs={12}>
                        <Form.Group controlId="formKeyword">
                          <div className="location-label">
                            <label className="styled-label">
                              <BsGeoAltFill className="mr-2" />
                              <b>Drop-Off *</b>
                            </label>
                          </div>
                          <div className="custom-dropdown-container">
                            <Select
                              className="mt-2"
                              id="searchboxInputDropOffLoc"
                              options={locations}
                              value={dropoffLocation}
                              onChange={setDropoffLocation}
                              placeholder="Dropoff Loc"
                              styles={selectStyles}
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    ) : (
                      ""
                    )}
                    <Col
                      xxl={3}
                      lg={3}
                      md={2}
                      sm={6}
                      xs={8}
                      id="home-page-search-box-button"
                      className="search-box-search-button-div"
                    >
                      <button
                        type="submit"
                        className="search-box-search-button"
                        id="home-page-search-box-button"
                        onClick={handleSearchClick}
                        aria-label="Search Vehicles"
                      >
                        <span id="home-page-search-box-button">
                          {/* <LuSearch id="home-page-search-box-button" /> */}
                          Search
                        </span>
                      </button>
                      <ToastContainer />
                    </Col>

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

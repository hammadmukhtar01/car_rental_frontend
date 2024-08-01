import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Form, Modal } from "react-bootstrap";
import { BsGeoAltFill, BsCalendar2CheckFill } from "react-icons/bs";
import "./homepage.css";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Select from "react-select";

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

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userLocationData"));
    if (storedUserData) {
      setPickupLocation(storedUserData?.userData?.pickupLocation || "");
      setDropoffLocation(storedUserData?.userData?.dropoffLocation || "");
      setShowDropoff(storedUserData?.userData?.showDropoff || false);
      setDateRange([
        {
          startDate:
            new Date(storedUserData?.userData?.dateRange?.startDate) ||
            new Date(),
          endDate:
            new Date(storedUserData?.userData?.dateRange?.endDate) ||
            new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          key: "selection",
        },
      ]);
    }
  }, []);

  const updateLocalStorage = (newUserData) => {
    localStorage.setItem("userLocationData", JSON.stringify(newUserData));
  };

  const handleDropoffCheckboxChange = () => {
    const newShowDropoff = !showDropoff;
    setShowDropoff(newShowDropoff);
    const updatedUserData = {
      userData: {
        pickupLocation,
        dropoffLocation: newShowDropoff ? dropoffLocation : "",
        showDropoff: newShowDropoff,
        dateRange: {
          startDate: dateRange[0].startDate,
          endDate: dateRange[0].endDate,
        },
      },
    };
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

    const updatedUserData = {
      userData: {
        pickupLocation,
        dropoffLocation,
        showDropoff,
        dateRange: {
          startDate,
          endDate,
        },
      },
    };
    updateLocalStorage(updatedUserData);
  };

  const handleSearchVehicleButtonHomePage = async (e) => {
    e.preventDefault();
    if (!pickupLocation || (showDropoff && !dropoffLocation)) {
      toast.dismiss();
      toast("Some inputs are missing1.", {
        duration: 2000,
        
      });
      return;
    }

    if (!dateRange[0]?.startDate || !dateRange[0]?.endDate) {
      toast.dismiss();
      toast("Date must be chosen", {
        duration: 2000,
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

    const userData = {
      pickupLocation,
      dropoffLocation,
      showDropoff,
      dateRange: {
        startDate,
        endDate,
      },
    };

    updateLocalStorage({ userData });

    const url = `/vehicles?startDate=${startDate}&endDate=${endDate}&pickupLoc=${
      pickupLocation?.value
    }&dropoffLoc=${
      showDropoff === false ? pickupLocation?.value : dropoffLocation?.value
    }`;

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
                    <Col
                      xxl={10}
                      lg={10}
                      md={10}
                      sm={12}
                      xs={12}
                      id="home-page-search-box-button"
                      className="search-box-main-div"
                    >
                      <Row>
                        <Col xxl={6} lg={6} md={6} sm={12} xs={12}>
                          <Form.Group controlId="formDropoffDateTime">
                            <div className="date-label">
                              <label className="search-box-label">
                                <BsCalendar2CheckFill className="mr-2" />
                                <>Pick & Drop Date *</>
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
                          md={showDropoff ? 3 : 6}
                          sm={showDropoff ? 6 : 12}
                          xs={showDropoff ? 6 : 12}
                          className={` ${
                            showDropoff ? "dropoff-visible" : "dropoff-hidden"
                          }`}
                        >
                          <Form.Group controlId="formKeyword">
                            <div className="location-label">
                              <label className="search-box-label">
                                <BsGeoAltFill className="mr-2" />
                                <>Pick-Up*</>
                              </label>
                            </div>

                            <Select
                              className="mt-2"
                              id="searchboxInputPickUpLoc"
                              options={locations}
                              value={pickupLocation}
                              onChange={(location) => {
                                setPickupLocation(location);
                                const updatedUserData = {
                                  userData: {
                                    pickupLocation: location,
                                    dropoffLocation,
                                    showDropoff,
                                    dateRange: {
                                      startDate: dateRange[0].startDate,
                                      endDate: dateRange[0].endDate,
                                    },
                                  },
                                };
                                updateLocalStorage(updatedUserData);
                              }}
                              placeholder="Pickup"
                              styles={selectStyles}
                            />
                          </Form.Group>
                        </Col>

                        {showDropoff ? (
                          <Col xxl={3} lg={3} md={3} sm={6} xs={6}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="search-box-label">
                                  <BsGeoAltFill className="mr-2" />
                                  <>Drop-Off *</>
                                </label>
                              </div>
                              <div className="custom-dropdown-container">
                                <Select
                                  className="mt-2"
                                  id="searchboxInputDropOffLoc"
                                  options={locations}
                                  value={dropoffLocation}
                                  onChange={(location) => {
                                    setDropoffLocation(location);
                                    const updatedUserData = {
                                      userData: {
                                        pickupLocation,
                                        dropoffLocation: location,
                                        showDropoff,
                                        dateRange: {
                                          startDate: dateRange[0].startDate,
                                          endDate: dateRange[0].endDate,
                                        },
                                      },
                                    };
                                    updateLocalStorage(updatedUserData);
                                  }}
                                  placeholder="Dropoff "
                                  styles={selectStyles}
                                />
                              </div>
                            </Form.Group>
                          </Col>
                        ) : (
                          ""
                        )}

                        <div className="mt-2 different-loc-checkbox-div">
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

                    <Col
                      xxl={2}
                      lg={2}
                      md={2}
                      sm={12}
                      xs={12}
                      id="home-page-search-box-button"
                      className="search-box-search-button-div pt-2"
                    >
                      <button
                        type="submit"
                        className="search-box-search-button"
                        id="home-page-search-box-button"
                        aria-label="Search Vehicles"
                      >
                        <span id="home-page-search-box-button">Search</span>
                      </button>
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

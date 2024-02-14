import React, { useState, useEffect, useMemo, useRef } from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import {
  BsGeoAltFill,
  BsGeoAlt,
  BsCalendar2Check,
  BsCarFrontFill,
  BsJustify,
  BsTags,
  BsCpu,
  BsPerson,
  BsSuitcase,
} from "react-icons/bs";
import { GiGearStickPattern, GiCarDoor } from "react-icons/gi";
import { LuSnowflake, LuSearch } from "react-icons/lu";
import "./vehicleDetails.css";
import Car1 from "../../images/car-fleet-1.png";
import Car2 from "../../images/car-fleet-2.png";
import Car3 from "../../images/car-fleet-3.png";
import PickupLocationModal from "../homePage/pickupSearchBoxDropDown";
import DropoffLocationModal from "../homePage/dropoffSearchBoxDropDown";
import Pagination from "./pagination";
import MainNavbar from "../navbar/mainNavbar";
import { useNavigate, useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "../../PrivateComponents/reloadingComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Select from "react-select";

const PageSize = 20;

const VehiclesPage = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [showDropoff, setShowDropoff] = useState(false);
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const durations = ["Day", "Week", "Month"];
  const durationValues = [1, 7, 30];
  const [currentPage, setCurrentPage] = useState(1);
  const [pickupLocationMessage, setPickupLocationMessage] = useState("");
  const [dropoffLocationMessage, setDropoffLocationMessage] = useState("");
  const [isCarModelOpen, setIsCarModelOpen] = useState(true);
  const [isCarTypeOpen, setIsCarTypeOpen] = useState(true);
  const [isCarPriceRangeOpen, setIsCarPriceRangeOpen] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    carModels: [],
    carTypes: [],
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDropoffModal, setShowDropoffModal] = useState(false);

  const carModels = ["Picanto", "Creta", "K5", "Elantra", "Corolla", "2008"];
  const carTypes = ["Sedan", "SUV", "Economy"];

  const carTypeInURL = useLocation();
  const queryParams = new URLSearchParams(carTypeInURL.search);
  const initialCarType = queryParams.get("carType");

  // console.log("Initial Car type is : ", initialCarType)

  const carFeaturesWithIcons = [
    {
      name: "Person Seats",
      value: 4,
      featureIcon: BsPerson,
    },

    {
      name: "Doors",
      value: 5,
      featureIcon: GiCarDoor,
    },
    {
      name: "Automatic",
      value: "A",
      featureIcon: GiGearStickPattern,
    },

    {
      name: "Luggage Space",
      value: 2,
      featureIcon: BsSuitcase,
    },
    {
      name: "L Engine",
      value: 1.7,
      featureIcon: BsCpu,
    },

    {
      name: "AC",
      value: "AC",
      featureIcon: LuSnowflake,
    },
  ];
  const calculateSalePrice = (originalPrice, discount) => {
    const calculatedPrice = (originalPrice * discount) / 100;
    return Math.floor(originalPrice - calculatedPrice);
  };

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

  const carsData = useMemo(
    () =>
      [
        {
          name: "Car name 1",
          image: Car1,
          discount: 0,
          originalPrice: 300,
          days: 0,
          carType: "SUV",
          carModel: "Picanto",
        },
        {
          name: "Car name 2",
          image: Car2,
          discount: 3,
          originalPrice: 200,
          days: 0,
          carType: "Sedan",
          carModel: "Cretaa",
        },
        {
          name: "Car name 3",
          image: Car3,
          discount: 0,
          originalPrice: 342,
          days: 0,
          carType: "Economy",
          carModel: "Cretaa",
        },
        {
          name: "Car name 4",
          image: Car1,
          discount: 0,
          originalPrice: 975,
          days: 0,
          carType: "SUV",
          carModel: "K5",
        },
        {
          name: "Car name 5",
          image: Car2,
          discount: 15,
          originalPrice: 250,
          days: 0,
          carType: "Sedan",
          carModel: "2008",
        },
        {
          name: "Car name 6",
          image: Car1,
          discount: 0,
          originalPrice: 100,
          days: 0,
          carType: "SUV",
          carModel: "K5",
        },
        {
          name: "Car name 7",
          image: Car3,
          discount: 15,
          originalPrice: 79,
          days: 0,
          carType: "SUV",
          carModel: "K5",
        },
      ].map((car) => ({
        ...car,
        salePrice: calculateSalePrice(
          car.originalPrice,
          car.discount,
          car.days
        ),
      })),
    []
  );

  useEffect(() => {
    if (pickUpDate && dropOffDate) {
      const pickupDate = new Date(pickUpDate);
      const dropoffDate = new Date(dropOffDate);
      const timeDifference = dropoffDate.getTime() - pickupDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      setNumberOfDays(daysDifference);
    }
  }, [pickUpDate, dropOffDate]);

  const sortByDropDown = [
    { label: "Low to High", value: "LowToHigh" },
    { label: "High to Low", value: "HighToLow" },
    { label: "Recommended", value: "Recommended" },
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

  const allCarsBookingButton = () => {
    console.log("All Cars Booking Button");
    navigate("/bookingPage/1");
  };

  useEffect(() => {
    if (initialCarType) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        carTypes: [...prevFilters.carTypes, initialCarType],
      }));
    }
  }, [initialCarType]);

  const filterCars = useMemo(() => {
    const filteredCars = carsData.filter((car) => {
      const modelMatch =
        selectedFilters.carModels.length === 0 ||
        selectedFilters.carModels.includes(car.carModel);
      const typeMatch =
        selectedFilters.carTypes.length === 0 ||
        selectedFilters.carTypes.includes(car.carType);
      const priceMatch =
        (minPrice === "" || car.salePrice >= minPrice) &&
        (maxPrice === "" || car.salePrice <= maxPrice);

      return modelMatch && typeMatch && priceMatch;
    });

    let sortedFilteredCars = [...filteredCars];

    switch (sortBy) {
      case "LowToHigh":
        sortedFilteredCars.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case "HighToLow":
        sortedFilteredCars.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case "Recommended":
        sortedFilteredCars.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    return sortedFilteredCars;
  }, [
    carsData,
    maxPrice,
    minPrice,
    selectedFilters.carModels,
    selectedFilters.carTypes,
    sortBy,
  ]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterCars.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filterCars]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleCheckboxChange = (option, type) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(option)
        ? prevFilters[type].filter((item) => item !== option)
        : [...prevFilters[type], option],
    }));
  };

  const handleClearAllFilters = () => {
    console.log("Clear all filetrs");
    setSelectedFilters({
      carModels: [],
      carTypes: [],
    });
    setMinPrice("");
    setMaxPrice("");
    // setSortBy("Recommended");
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
    // toast("Loading required cars!", { autoClose: 3000 });

    // toast.success("Success Notification !", {
    //   position: "top-center",
    // });

    // toast.error("Error Notification !", {
    //   position: "top-right",
    // });

    // toast.info("Info Notification !", {
    //   position: "bottom-center",
    // });

    // toast("Custom Style Notification with css class!", {
    //   position: "bottom-right",
    //   className: "foo-bar",
    // });
  };

  const toggleCarModel = () => {
    setIsCarModelOpen(!isCarModelOpen);
  };

  const toggleCarType = () => {
    setIsCarTypeOpen(!isCarTypeOpen);
  };

  const toggleCarPriceRange = () => {
    setIsCarPriceRangeOpen(!isCarPriceRangeOpen);
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

  const { loading } = useReload();

  if (loading) {
    return (
      <>
        <ReloadingComponent />
      </>
    );
  }

  return (
    <div id="main" className="pb-2 ">
      <>
        <div className="navbar-bg-img-container">
          <div className="booking-page-banner-navbar">
            {" "}
            {/* <MainNavbar /> */}
          </div>
        </div>
        <div className="all-cars-main-container-div container">
          <div className="vehicles-page-main-container">
            <div className="searchbox-container">
              <div className="form-group pb-4 pt-4">
                <Row className=" d-flex justify-content-center">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="all-cars-search-box-container pb-4"
                  >
                    <Row>
                      <Col xxl={3} lg={3} md={6} sm={6} xs={12}>
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
                            updatePickupLocationMessage={
                              setPickupLocationMessage
                            }
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
                            required
                            className="form-control-pickup-time col-12"
                            value={timeOptions.find(
                              (option) => option.value === pickUpTime
                            )}
                            onChange={(selectedOption) => {
                              console.log(
                                "Selected option is: ",
                                selectedOption
                              );
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
                            required
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

          <Container fluid className="all-cars-container pb-4">
            <Row>
              <Col xxl={3} lg={3} md={4} className="filters-section">
                <div className="filters-heading">
                  <div className="row d-flex">
                    <Col>
                      <h4 className="filters-text">Filters</h4>
                    </Col>
                    <Col className="clear-filters-container text-end">
                      <span
                        className="clear-filters "
                        onClick={handleClearAllFilters}
                      >
                        Clear all <RxCross2 />
                      </span>
                    </Col>
                  </div>
                </div>
                <div className="card search-filters-card checkbox-container">
                  <article className="card-group-item">
                    <div className="car-model-label">
                      <header
                        className="card-header styled-label pt-3 pb-3"
                        onClick={toggleCarModel}
                      >
                        <div className="car-brand-filter-container d-flex justify-content-between">
                          <div className="car-brand-icon-title">
                            <BsCarFrontFill className="mr-2" />
                            <b>Car Model</b>
                          </div>
                          <div className="car-brand-open-close-modal ">
                            {isCarModelOpen ? (
                              <>
                                <div className="brand-open-icon">
                                  <AiOutlineMinusCircle className="text-right" />
                                </div>
                              </>
                            ) : (
                              <div className="brand-open-icon">
                                <AiOutlinePlusCircle className="text-right" />
                              </div>
                            )}
                          </div>
                        </div>
                      </header>
                    </div>{" "}
                    {isCarModelOpen && (
                      <div className="filter-content">
                        <div className="card-body">
                          <form>
                            {carModels.map((model, index) => (
                              <label
                                className="form-check flipBox"
                                aria-label={`Checkbox ${index}`}
                                key={index}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={model}
                                  onChange={() =>
                                    handleCheckboxChange(model, "carModels")
                                  }
                                  checked={selectedFilters.carModels.includes(
                                    model
                                  )}
                                />
                                <span className="form-check-label">
                                  {model}
                                </span>
                                <div className="flipBox_boxOuter">
                                  <div className="flipBox_box">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </form>
                        </div>
                      </div>
                    )}
                  </article>
                  <article className="card-group-item">
                    <div className="car-type-filter-label">
                      <header
                        className="card-header styled-label title car-type-filter-heading pt-3 pb-3"
                        onClick={toggleCarType}
                      >
                        <div className="car-type-filter-container d-flex justify-content-between">
                          <div className="car-type-icon-title">
                            <BsJustify className="mr-2" />
                            <b>Car Type</b>
                          </div>
                          <div className="car-type-open-close-modal ">
                            {isCarTypeOpen ? (
                              <>
                                <div className="type-open-icon">
                                  <AiOutlineMinusCircle className="text-right" />
                                </div>
                              </>
                            ) : (
                              <div className="type-open-icon">
                                <AiOutlinePlusCircle className="text-right" />
                              </div>
                            )}
                          </div>
                        </div>
                      </header>
                    </div>
                    {isCarTypeOpen && (
                      <div className="filter-content">
                        <div className="card-body">
                          <form>
                            {carTypes.map((type, index) => (
                              <label
                                className="form-check flipBox"
                                aria-label={`Checkbox ${index}`}
                                key={index}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={type}
                                  onChange={() =>
                                    handleCheckboxChange(type, "carTypes")
                                  }
                                  checked={selectedFilters.carTypes.includes(
                                    type
                                  )}
                                />
                                <span className="form-check-label">{type}</span>
                                <div className="flipBox_boxOuter">
                                  <div className="flipBox_box">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </form>
                        </div>
                      </div>
                    )}
                  </article>
                  <article className="card-group-item">
                    <div className="car-price-filter-label">
                      <header
                        className="card-header styled-label price-filter-heading pt-3 pb-3"
                        onClick={toggleCarPriceRange}
                      >
                        <div className="car-type-filter-container d-flex justify-content-between">
                          <div className="car-type-icon-title">
                            <BsTags className="mr-2" />
                            <b>Price Range</b>
                          </div>
                          <div className="car-price-range-open-close-modal ">
                            {isCarPriceRangeOpen ? (
                              <>
                                <div className="price-range-open-icon">
                                  <AiOutlineMinusCircle className="text-right" />
                                </div>
                              </>
                            ) : (
                              <div className="price-range-open-icon">
                                <AiOutlinePlusCircle className="text-right" />
                              </div>
                            )}
                          </div>
                        </div>
                      </header>
                    </div>
                    {isCarPriceRangeOpen && (
                      <div className="filter-content">
                        <div className="card-body">
                          <div className="">
                            <div className="form-group col-xxl-6 col-lg-9 col-md-9 col-sm-6 col-6 pl-0">
                              <input
                                className="form-control-login"
                                name="minPrice"
                                autoComplete="off"
                                required
                                type="number"
                                min={0}
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="min value"
                              />
                            </div>

                            <div className="form-group col-xxl-6 col-lg-9 col-md-9 col-sm-6 col-6 pl-0">
                              {/* <input
                              type="number"
                              className="form-control"
                              value={maxPrice}
                              onChange={(e) => setMaxPrice(e.target.value)}
                              placeholder="max value"
                              min={minPrice}
                            /> */}
                              <input
                                className="form-control-login "
                                name="maxPrice"
                                autoComplete="off"
                                required
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="max value"
                                min={minPrice}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                </div>
              </Col>

              <Col xxl={9} lg={9} md={8}>
                <div className="all-cars-section ">
                  <Row className="d-flex justify-content-end">
                    <Col xxl={4} lg={4} md={6} sm={6} xs={12}>
                      <div className="sort-by-dropdown">
                        <Row className="sort-by-row  mb-4">
                          <Col>
                            <Form.Group controlId="formSortBy">
                              <Form.Label className="styled-label mt-2">
                                <h6>
                                  {" "}
                                  <b>Sort By:</b>
                                </h6>
                              </Form.Label>
                              {/* <select
                                id="sortBySelect"
                                className="form-select sort-by-select-tag"
                                title="sorting"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                              >
                                <option value="LowToHigh">Low to High</option>
                                <option value="HighToLow">High to Low</option>
                                <option value="Recommended">Recommended</option> 
                              </select>
                                */}

                              <Select
                                options={sortByDropDown}
                                required
                                className="form-control-sort-by col-12"
                                setNationality
                                onChange={(selectedOption) => {
                                  console.log(
                                    "Selected optn is: ",
                                    selectedOption
                                  );
                                  setSortBy(selectedOption.value);
                                }}
                                styles={selectStyles}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>

                  <>
                    <h3 className="pb-2 all-cars-heading">
                      All Cars
                      <hr className="all-cars-hr-tag" />
                    </h3>
                    <Row className="offers-car-container-row">
                      {currentTableData.map((car, index) => (
                        <Col
                          key={index}
                          xxl={6}
                          lg={6}
                          md={12}
                          sm={12}
                          className="offers-car-div pb-5"
                        >
                          <div className="all-offer-cars p-3">
                            <div className="car-name-div">
                              <span className="car-name text-end">
                                {" "}
                                <b>{car.name} | </b>( {car.carType} ){" "}
                              </span>
                            </div>
                            <div className="car-image-container ">
                              <a href="/bookingPage/1">
                                {" "}
                                <img
                                  src={car.image}
                                  alt={`Car ${index + 1}`}
                                  className="car-image"
                                />
                              </a>
                              {/* <div className="car-image-overlay"></div> */}
                            </div>
                            <div className="all-vehicles-features-icons features-scroll-container text-center">
                              {carFeaturesWithIcons.map(
                                (carFeaturesIcons, index) => (
                                  <span key={index}>
                                    <span className="features-values">
                                      <carFeaturesIcons.featureIcon className="all-car-icons" />{" "}
                                      <span className="">{carFeaturesIcons.value}{" "}</span>
                                      {index <
                                        carFeaturesWithIcons.length - 1 && (
                                        <span className="car-features-vertical-line mr-2 ml-2">
                                          |
                                        </span>
                                      )}
                                    </span>
                                  </span>
                                )
                              )}
                            </div>

                            <hr className="discount-line" />

                            {car.days <= 0 && (
                              <>
                                <div className="price-day-main-div">
                                  <div className="row">
                                    {durations.map((duration, index) => (
                                      <div
                                        key={index}
                                        className="col-xxl-4 col-lg-6 col-md-6 col-sm-6 col-8 pt-2"
                                      >
                                        <div className="card price-per-specificDay-container">
                                          <div className="card-body price-day-div">
                                            <div className="card-text">
                                              <span className="per-specificDay-heading">
                                                Per {duration}
                                              </span>
                                              <br />
                                              {/* {car.discount > 0 && (
                                                <>
                                                  <del className="value-del-line">
                                                    {car.originalPrice *
                                                      durationValues[
                                                        index
                                                      ]}{" "}
                                                  </del>{" "}
                                                  <span className="AED-text">
                                                    
                                                  </span>{" "}
                                                </>
                                              )}{" "} */}
                                              {/* {car.discount <= 0 && (
                                                <>
                                                  <span className="p-1 mr-2"></span>
                                                </>
                                              )} */}
                                              <span className="final-discounted-value-span">
                                                {/* {calculateSalePrice(
                                                  car.originalPrice,
                                                  car.discount
                                                ) * durationValues[index]}{" "}
                                                AED{" "} */}
                                                {car.originalPrice *
                                                  durationValues[index]}{" "}
                                                AED{" "}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <br />
                              </>
                            )}
                            <div className="d-flex justify-content-center">
                              <div className="col-xxl-10 col-lg-10 col-md-12 col-sm-8 col-10 d-flex justify-content-center">
                                {car.days > 0 ? (
                                  <>
                                    <button
                                      className="animated-button"
                                      onClick={allCarsBookingButton}
                                    >
                                      <span className="button-text-span">
                                        <span className="transition"></span>
                                        <span className="gradient"></span>
                                        <span className="label">
                                          Pay Now | AED:{" "}
                                          {calculateSalePrice(
                                            car.originalPrice,
                                            car.discount
                                          ) * car.days}{" "}
                                          | {car.days} days
                                        </span>
                                      </span>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <div className="button-container">
                                      <button
                                        className="animated-button"
                                        onClick={allCarsBookingButton}
                                      >
                                        <span className="button-text-span">
                                          <span className="transition"></span>
                                          <span className="gradient"></span>
                                          <span className="label">
                                            Rent Now
                                          </span>
                                        </span>
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={carsData.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    </div>
  );
};

export default VehiclesPage;

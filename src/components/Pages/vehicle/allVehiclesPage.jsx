import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
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
import axios from "axios";
import makeAnimated from "react-select/animated";

const PageSize = 8;
const animatedComponents = makeAnimated();

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
  const [carsData, setCarsData] = useState([]);
  const [carType, setCarType] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCarTypes, setSelectedCarTypes] = useState([]);
  const [carCategoriesData, setCarCategoriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pickupLocationMessage, setPickupLocationMessage] = useState("");
  const [dropoffLocationMessage, setDropoffLocationMessage] = useState("");
  const [isCarCategoriesOpen, setIsCarCategoriesOpen] = useState(true);
  const [isCarTypeOpen, setIsCarTypeOpen] = useState(true);
  const [isCarPriceRangeOpen, setIsCarPriceRangeOpen] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigate = useNavigate();
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDropoffModal, setShowDropoffModal] = useState(false);

  const carTypeInURL = useLocation();
  const queryParams = new URLSearchParams(carTypeInURL.search);
  // const initialCarType = queryParams.get("carType");
  const startDateParam = queryParams.get("startDate");
  const endDateParam = queryParams.get("endDate");

  // console.log(`Start param dateeeeee ${startDateParam}\nEEEEEEEE ${endDateParam}`)
  const defaultStartDate = new Date();
  const defaultEndDate = new Date(
    defaultStartDate.getTime() + 24 * 60 * 60 * 1000
  );

  const [dateRange, setDateRange] = useState([
    {
      startDate: startDateParam ? new Date(startDateParam) : defaultStartDate,
      endDate: endDateParam ? new Date(endDateParam) : defaultEndDate,
      key: "selection",
    },
  ]);

  const startDate = useMemo(() => dateRange[0].startDate, [dateRange]);
  const endDate = useMemo(() => dateRange[0].endDate, [dateRange]);

  const startDateFunc = new Date(startDate);
  if (
    startDateFunc.toISOString().split("T")[0] ===
      new Date().toISOString().split("T")[0] ||
    startDateFunc.toISOString().split("T")[0] === startDateParam
  ) {
    startDateFunc.setDate(startDateFunc.getDate());
  } else startDateFunc.setDate(startDateFunc.getDate() + 1);

  const endDateFunc = new Date(endDate);
  if (
    endDateFunc.toISOString().split("T")[0] ===
      new Date(defaultStartDate.getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0] ||
    endDateFunc.toISOString().split("T")[0] === endDateParam
  ) {
    endDateFunc.setDate(endDateFunc.getDate());
  } else endDateFunc.setDate(endDateFunc.getDate() + 1);

  const datePickerStartDate = encodeURIComponent(
    startDateFunc.toISOString()
  ).split("T")[0];
  const datePickerEndDate = encodeURIComponent(endDateFunc.toISOString()).split(
    "T"
  )[0];

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
      console.log(`pickup is: ${pickUpDate} and drop off is ${dropOffDate}`);
    }
  }, [pickUpDate, dropOffDate]);

  const fetchCarsData = useCallback(async () => {
    try {
      const token =
        "pwhUHSoPIOJmECDhAyhlP1X5ZvzD1W3dmhUOdpQ-BQtQzg1PNlv8invCvbT1qk3EsoJfM_v8Pj8ZJsPKXVoC-kZtg0p2mpAu4f5g8LiMWrGbqZ4QRY-1xJRJTcWF-t24jUgdng1-myn-TgDddhkldDmkOufYlMdkGQDpZtnUfQ00qgl58t65VCWwK29g4ZWq_Y9djzMDXsmSARNbtZD4TkjqEtIihGsxcffl8VEdO_f3oqDZamOk-mq9XrzlOxdU76g7WRmubIBctGiJPO8DV5crp-ccVfeZ_3TinZc6pmUABcezl9QxkrcbcgTGrRjMhpdqtXYOworyQjpjOfEhbTHYrkQFw-7yTJOJiUCIUMX05z97fE5DIi7GJg8-PL5xfzUyPgruvfnkHHmlFRWIFOkoEgf7FdcQ3S7EveRJZsHVxCKUKg-Dvjm4k7VyHE3uLhKurIgj4VzVSdRYGVRiggymUxvRT4h5Lr_nh2G1vzIrOG1R5vfb_93Pk5SelyNHoizjG_3nCfGbgWzwQ728Z6Vn22CAcbKemFRF7kVh0mg";
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const startDate = encodeURIComponent(
        dateRange[0].startDate.toISOString()
      );
      const endDate = encodeURIComponent(dateRange[0].endDate.toISOString());
      const url = `https://app.speedautosystems.com/api/services/app/bookingPluginSearch/SearchVehicleRates?startDate=${startDate}&endDate=${endDate}`;

      const response = await axios.post(url, {}, { headers });
      const titles = response.data.result.items.map((item) => item.title);
      setCarType(titles);

      setCarsData(response.data.result.items);
      console.log("Result of all cars is : ", response.data.result.items);
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchCarsData();
  }, [dateRange, fetchCarsData]);

  const handleSearchCarButton = async (e) => {
    e.preventDefault();
    fetchCarsData();
  };

  const fetchAllCategories = useCallback(async () => {
    try {
      const token =
        "pwhUHSoPIOJmECDhAyhlP1X5ZvzD1W3dmhUOdpQ-BQtQzg1PNlv8invCvbT1qk3EsoJfM_v8Pj8ZJsPKXVoC-kZtg0p2mpAu4f5g8LiMWrGbqZ4QRY-1xJRJTcWF-t24jUgdng1-myn-TgDddhkldDmkOufYlMdkGQDpZtnUfQ00qgl58t65VCWwK29g4ZWq_Y9djzMDXsmSARNbtZD4TkjqEtIihGsxcffl8VEdO_f3oqDZamOk-mq9XrzlOxdU76g7WRmubIBctGiJPO8DV5crp-ccVfeZ_3TinZc6pmUABcezl9QxkrcbcgTGrRjMhpdqtXYOworyQjpjOfEhbTHYrkQFw-7yTJOJiUCIUMX05z97fE5DIi7GJg8-PL5xfzUyPgruvfnkHHmlFRWIFOkoEgf7FdcQ3S7EveRJZsHVxCKUKg-Dvjm4k7VyHE3uLhKurIgj4VzVSdRYGVRiggymUxvRT4h5Lr_nh2G1vzIrOG1R5vfb_93Pk5SelyNHoizjG_3nCfGbgWzwQ728Z6Vn22CAcbKemFRF7kVh0mg";
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = `https://app.speedautosystems.com/api/services/app/bookingPluginSearch/getSettings`;
      const response = await axios.post(url, {}, { headers });

      setCarCategoriesData(response.data.result.categories);
      console.log(
        "All Categories of cars are :------- ",
        response.data.result.categories
      );
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  const carFeaturesWithIcons = [
    {
      name: "Person Seats",
      value: null,
      featureIcon: BsPerson,
    },

    // {
    //   name: "Doors",
    //   value: 5,
    //   featureIcon: GiCarDoor,
    // },
    {
      name: "Automatic",
      value: "A",
      featureIcon: GiGearStickPattern,
    },

    {
      name: "Air Bags",
      value: 2,
      featureIcon: BsSuitcase,
    },
    {
      name: "AC",
      value: "AC",
      featureIcon: LuSnowflake,
    },
  ];

  const dataArray = [];

  carsData.forEach((item) => {
    const dataObject = {
      category: item.acrissCategory?.name,
      fuel: item.acrissFuelAc?.name,
      type: item.acrissType?.name,
      transmission: item.acrissTransDrive?.name,
      passengerCapacity: item?.passengerCapacity,
      smallBagsCapacity: item?.smallBagsCapacity,
      largeBagsCapacity: item?.largeBagsCapacity,
      tariffGroupId: item?.tariffGroupId,
    };
    dataArray.push(dataObject);
  });

  console.log("Data Array is: --- ", dataArray);

  const sortByDropDown = [
    { label: "Recommended", value: "Recommended" },
    { label: "Low to High", value: "LowToHigh" },
    { label: "High to Low", value: "HighToLow" },
  ];

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
  };

  const allCarsBookingButton = (tariffGroupId, startDate, endDate) => {
    if (!pickUpTime || !dropOffTime) {
      toast.error("pickup & dropoff time is missing.", {
        autoClose: 1000,
        style: {
          border: "1px solid #c0c0c0",
          fontWeight: "400",
          lineHeight: "18px",
          fontSize: "14px",
        },
      });
      return;
    }

    console.log("All Cars Booking Button");
    navigate(
      `/bookingPage/1?tariffGroupId=${tariffGroupId}&startDate=${startDate}&endDate=${endDate}&pickupTime=${pickUpTime}&dropoffTime=${dropOffTime}`
    );
  };

  const filterCars = useMemo(() => {
    const filteredCars = carsData.filter((car) => {
      const typeMatch =
        selectedCarTypes.length === 0 || selectedCarTypes.includes(car.title);
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some(
          (selectedCategory) =>
            selectedCategory.value === car.acrissCategory.code
        );
      const priceMatch =
        (minPrice === "" || car.rate >= minPrice) &&
        (maxPrice === "" || car.rate <= maxPrice);

      return typeMatch && categoryMatch && priceMatch;
    });

    let sortedFilteredCars = [...filteredCars];

    switch (sortBy) {
      case "LowToHigh":
        sortedFilteredCars.sort((a, b) => a.rate - b.rate);
        break;
      case "HighToLow":
        sortedFilteredCars.sort((a, b) => b.rate - a.rate);
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
    selectedCarTypes,
    selectedCategories,
    sortBy,
  ]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    console.log("Selected categories ------- :", selectedOptions);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterCars.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filterCars]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleCarTypeCheckboxChange = (type) => {
    setSelectedCarTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleClearAllFilters = () => {
    console.log("Clear all filetrs");
    setSelectedCarTypes([]);
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
  };

  const dateInputRef = useRef(null);

  const handleDateClick = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    const pickupDate = startDate ? startDate : null;
    const dropoffDate = endDate ? endDate : null;

    setPickUpDate(pickupDate ? pickupDate.toLocaleDateString() : null);
    setDropOffDate(dropoffDate ? dropoffDate.toLocaleDateString() : null);

    console.log(
      "Pickup Date:",
      pickupDate ? pickupDate.toLocaleDateString() : null
    );
    console.log(
      "Dropoff Date:",
      dropoffDate ? dropoffDate.toLocaleDateString() : null
    );

    if (pickupDate && dropoffDate) {
      const timeDifference = dropoffDate.getTime() - pickupDate.getTime();
      const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      console.log("Number of days:", totalDays);
      setNumberOfDays(totalDays + 1);
    }

    setDateRange([ranges.selection]);
  };

  useEffect(() => {
    console.log("Start Date from URL:", startDate);
    console.log("End Date from URL:", endDate);
    if (startDate && endDate) {
      const timeDifference = endDate.getTime() - startDate.getTime();
      const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      console.log("Number of days:", totalDays);
      setNumberOfDays(totalDays);
    }
  }, [startDate, endDate]);

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

  const toggleCarCategories = () => {
    setIsCarCategoriesOpen(!isCarCategoriesOpen);
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

  const selectCategoriesStyles = {
    control: (provided, { hasValue }) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid rgb(184, 184, 184)",
      boxShadow: "none",
      lineHeight: "32px",
      marginLeft: "-7px",
      marginRight: "-8px",
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
        backgroundColor: isSelected ? "#cc6119" : "#cc6119",
        color: isSelected ? "gray" : "white",
      },
    }),
  };

  // const { loading } = useReload();

  // if (loading) {
  //   return (
  //     <>
  //       <ReloadingComponent />
  //     </>
  //   );
  // }

  return (
    <div id="main" className="pb-2 ">
      <form action="#" className="signin-form">
        <>
          <div className="navbar-bg-img-container">
            <div className="booking-page-banner-navbar">
              {" "}
              <MainNavbar />
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
                                showDropoff
                                  ? "dropoff-visible"
                                  : "dropoff-hidden"
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

                        <Col
                          xxl={1}
                          lg={1}
                          md={3}
                          sm={6}
                          xs={6}
                          className="pt-5"
                        >
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
                          Reset <RxCross2 />
                        </span>
                      </Col>
                    </div>
                  </div>

                  <div className="card search-filters-card ">
                    <article className="card-group-item">
                      <div className="car-categories-label">
                        <header
                          className="card-header styled-label pt-3 pb-3"
                          onClick={toggleCarCategories}
                        >
                          <div className="car-categories-filter-container d-flex justify-content-between">
                            <div className="car-categories-icon-title">
                              <BsCarFrontFill className="mr-2" />
                              <b>Car Categories</b>
                            </div>
                            <div className="car-categories-open-close-modal ">
                              {isCarCategoriesOpen ? (
                                <>
                                  <div className="categories-open-icon">
                                    <AiOutlineMinusCircle className="text-right" />
                                  </div>
                                </>
                              ) : (
                                <div className="categories-open-icon">
                                  <AiOutlinePlusCircle className="text-right" />
                                </div>
                              )}
                            </div>
                          </div>
                        </header>
                      </div>{" "}
                      {isCarCategoriesOpen && (
                        <div className="filter-content">
                          <div className="card-body">
                            <article className="card-group-item">
                              <div className="car-card">
                                <Select
                                  isMulti
                                  components={animatedComponents}
                                  options={carCategoriesData?.map(
                                    (category) => ({
                                      value: category?.code,
                                      label: category?.name,
                                    })
                                  )}
                                  value={selectedCategories}
                                  onChange={handleCategoryChange}
                                  styles={selectCategoriesStyles}
                                />
                              </div>
                            </article>
                          </div>
                        </div>
                      )}
                    </article>
                  </div>

                  <div className="card search-filters-card checkbox-container">
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
                            {carType?.map((type, index) => (
                              <label
                                className="form-check flipBox"
                                aria-label={`Checkbox ${index}`}
                                key={index}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={type}
                                  checked={selectedCarTypes.includes(type)}
                                  onChange={() =>
                                    handleCarTypeCheckboxChange(type)
                                  }
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
                                  type="number"
                                  min={0}
                                  value={minPrice}
                                  onChange={(e) => setMinPrice(e.target.value)}
                                  placeholder="min value"
                                />
                              </div>

                              <div className="form-group col-xxl-6 col-lg-9 col-md-9 col-sm-6 col-6 pl-0">
                                <input
                                  className="form-control-login "
                                  name="maxPrice"
                                  autoComplete="off"
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
                                <Select
                                  options={sortByDropDown}
                                  required
                                  className="form-control-sort-by col-12"
                                  setSortBy
                                  onChange={(selectedOption) => {
                                    console.log(
                                      "Selected optn is: ",
                                      selectedOption
                                    );
                                    setSortBy(selectedOption?.value);
                                  }}
                                  defaultValue={sortByDropDown[0]}
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
                        <hr className="middle-hr-tag" />
                      </h3>
                      <Row className="offers-car-container-row">
                        {currentTableData.map((car, index) => (
                          <Col
                            key={car?.tariffGroupId}
                            xxl={6}
                            lg={6}
                            md={12}
                            sm={12}
                            className="all-cars-container-div pb-5"
                          >
                            <div className="single-car-container-div pb-3">
                              <div className="car-name-div">
                                <span className="car-name text-end">
                                  {" "}
                                  <b>{car?.acrissCategory?.name} | </b>(
                                  {car?.title})
                                </span>
                              </div>
                              <div className="car-image-container ">
                                <div
                                  onClick={() =>
                                    allCarsBookingButton(
                                      car?.tariffGroupId,
                                      startDate,
                                      endDate
                                    )
                                  }
                                >
                                  {" "}
                                  <img
                                    src={car?.displayImageUrl}
                                    alt={`Car ${index + 1}`}
                                    className="car-image"
                                  />
                                </div>
                              </div>
                              <div className="all-vehicles-features-icons features-scroll-container text-center">
                                {dataArray.map((carData, dataIndex) => (
                                  <span key={dataIndex}>
                                    {carFeaturesWithIcons?.map(
                                      (carFeature, featureIndex) => {
                                        const showIcon =
                                          carData?.tariffGroupId ===
                                          car?.tariffGroupId;
                                        let value;
                                        switch (carFeature?.name) {
                                          case "Person Seats":
                                            value = carData?.passengerCapacity;
                                            break;
                                          // case "Doors":
                                          //   const [doorRange = carData.type] = carData.type.split(/[-/]/);
                                          //   const [doorRange = carData.type] =
                                          //     carData.type.includes("%")
                                          //       ? carData.type.split("")
                                          //       : [carData.type];
                                          //   value = doorRange;
                                          //   break;
                                          case "Automatic":
                                            value = carData.transmission
                                              ? carData.transmission
                                                  .split("/")[0]
                                                  .charAt(0)
                                              : "N";
                                            break;
                                          case "Air Bags":
                                            value =
                                              carData?.smallBagsCapacity +
                                              carData?.largeBagsCapacity;
                                            break;
                                          case "AC":
                                            value = "AC";
                                            break;
                                          default:
                                            value = carData[carFeature?.name];
                                            break;
                                        }

                                        return value !== undefined &&
                                          value !== null &&
                                          showIcon === true ? (
                                          <span
                                            key={featureIndex}
                                            className="single-feature-container features-values"
                                          >
                                            {carFeature?.name !== "Doors" && (
                                              <>
                                                <carFeature.featureIcon className="all-car-icons" />{" "}
                                              </>
                                            )}
                                            <span className="">{value}</span>
                                            {/* {featureIndex < carFeaturesWithIcons.length - 1 && (
                                              <span className="car-features-vertical-line mr-2 ml-2">|</span>
                                            )} */}
                                          </span>
                                        ) : null;
                                      }
                                    )}
                                  </span>
                                ))}
                              </div>

                              <hr className="discount-line" />

                              {numberOfDays <= 0 && (
                                <>
                                  <div className="price-day-main-div">
                                    <div className="row">
                                      {durations?.map((duration, index) => (
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
                                                  {car.rate *
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
                                <div className="col-xxl-10 col-lg-11 col-md-12 col-sm-8 col-12 d-flex justify-content-center">
                                  {numberOfDays > 0 ? (
                                    <>
                                      <button
                                        className="animated-button"
                                        onClick={() => {
                                          console.log(
                                            `--------------------------Start date is ---- ${datePickerStartDate} \n End Date is ---- ${datePickerEndDate}`
                                          );
                                          allCarsBookingButton(
                                            car?.tariffGroupId,
                                            datePickerStartDate,
                                            datePickerEndDate
                                          );
                                        }}
                                      >
                                        <span className="button-text-span">
                                          <span className="transition"></span>
                                          <span className="gradient"></span>
                                          <span className="label">
                                            Pay Now{" "}
                                            <span className="pay-now-price-md-lg">
                                              <span>|</span> AED:{" "}
                                              {car?.rate * numberOfDays} |{" "}
                                              {numberOfDays} days
                                            </span>
                                            <div className="pay-now-price-xs">
                                              AED: {car?.rate * numberOfDays} |{" "}
                                              {numberOfDays} days
                                            </div>
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
                      totalCount={filterCars?.length}
                      pageSize={PageSize}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      </form>
    </div>
  );
};

export default VehiclesPage;

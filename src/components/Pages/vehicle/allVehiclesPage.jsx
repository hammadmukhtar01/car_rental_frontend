import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  BsGeoAltFill,
  BsGeoAlt,
  BsCalendar2Check,
  BsCalendar4Week,
  BsCarFrontFill,
  BsJustify,
  BsTags,
  BsCpu,
  BsPerson,
  BsSuitcase,
} from "react-icons/bs";
import { GiGearStickPattern, GiCarDoor } from "react-icons/gi";
import { LuSnowflake } from "react-icons/lu";
import $ from "jquery";
import "./vehicleDetails.css";
import Car1 from "../../images/car1.jpg";
import PickupLocationDropdown from "../homePage/pickupSearchBoxDropDown";
import DropoffLocationDropdown from "../homePage/dropoffSearchBoxDropDown";
import Pagination from "./pagination";
import MainNavbar from "../navbar/mainNavbar";
import { useNavigate } from "react-router-dom";

const PageSize = 6;

const VehiclesPage = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCarModel, setSelectedCarModel] = useState([]);
  const [selectedCarType, setSelectedCarType] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const durations = ["Day", "Week", "Month"];
  const durationValues = [1, 7, 30];
  const [currentPage, setCurrentPage] = useState(1);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const [selectedPickupCityName, setSelectedPickupCityName] = useState("");
  const [selectedDropoffCityName, setSelectedDropoffCityName] = useState("");
  const [selectedPickUpOptionButton, setSelectedPickUpOptionButton] =
    useState("Deliver");
  const [selectedDropOffOptionButton, setSelectedDropOffOptionButton] =
    useState("CompanyDropOff");
  const navigate = useNavigate();

  useEffect(() => {
    $("#sortBySelect").select2();
  }, []);

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

  const carsData = useMemo(
    () => [
      {
        name: "Car name 1",
        image: Car1,
        discount: 90,
        originalPrice: 300,
        days: 0,
        carType: "Intermediate",
      },
      {
        name: "Car name 2",
        image:
          "https://th.bing.com/th/id/R.5984159799b0816018fee4e99b7411d5?rik=juCYPL27dy2pDw&riu=http%3a%2f%2ftonyferraricertified.com%2fwp-content%2fuploads%2f2018%2f08%2fsportscar-17583_1920.jpg&ehk=w%2fCNEgr5e37cX%2bi7bfuD64D1puZfzMxXPSjpJlzSYLw%3d&risl=&pid=ImgRaw&r=0",
        discount: 0,
        originalPrice: 200,
        days: 0,
        carType: "Family",
      },
      {
        name: "Car name 3",
        image:
          "https://www.dkeng.co.uk/sales_images/1593558000/large_1594227296_murcielagosv_57.jpg",
        discount: 25,
        originalPrice: 342,
        days: 0,
        carType: "Small",
      },
      {
        name: "Car name 4",
        image: Car1,
        discount: 90,
        originalPrice: 975,
        days: 0,
        carType: "Small",
      },
      {
        name: "Car name 5",
        image:
          "https://th.bing.com/th/id/R.5984159799b0816018fee4e99b7411d5?rik=juCYPL27dy2pDw&riu=http%3a%2f%2ftonyferraricertified.com%2fwp-content%2fuploads%2f2018%2f08%2fsportscar-17583_1920.jpg&ehk=w%2fCNEgr5e37cX%2bi7bfuD64D1puZfzMxXPSjpJlzSYLw%3d&risl=&pid=ImgRaw&r=0",
        discount: 15,
        originalPrice: 250,
        days: 4,
        carType: "Family",
      },
      {
        name: "Car name 6",
        image: Car1,
        discount: 0,
        originalPrice: 100,
        days: 0,
        carType: "Intermediate",
      },
      {
        name: "Car name 7",
        image:
          "https://th.bing.com/th/id/R.5984159799b0816018fee4e99b7411d5?rik=juCYPL27dy2pDw&riu=http%3a%2f%2ftonyferraricertified.com%2fwp-content%2fuploads%2f2018%2f08%2fsportscar-17583_1920.jpg&ehk=w%2fCNEgr5e37cX%2bi7bfuD64D1puZfzMxXPSjpJlzSYLw%3d&risl=&pid=ImgRaw&r=0",
        discount: 15,
        originalPrice: 79,
        days: 0,
        carType: "Intermediate",
      },
    ],
    []
  );

  const calculateSalePrice = (originalPrice, discount) => {
    const calculatedPrice = (originalPrice * discount) / 100;
    return Math.floor(originalPrice - calculatedPrice);
  };

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

  const carModels = useMemo(() => ["Model A", "Model B", "Model C"], []);
  const carTypes = useMemo(() => ["Family", "Intermediate", "Single"], []);

  useEffect(() => {
    // For Car Model dropdown
    $("#carModelSelect").select2({
      placeholder: "Select Model",
      data: carModels.map((model) => ({ id: model, text: model })),
    });

    // For Car Type dropdown
    $("#carTypeSelect").select2({
      placeholder: "Select Type",
      data: carTypes.map((type) => ({ id: type, text: type })),
    });
  }, [carModels, carTypes]);

  useEffect(() => {
    if (pickUpDate && dropOffDate) {
      const pickupDate = new Date(pickUpDate);
      const dropoffDate = new Date(dropOffDate);
      const timeDifference = dropoffDate.getTime() - pickupDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      setNumberOfDays(daysDifference);
    }
  }, [pickUpDate, dropOffDate]);

  const cityNames = useMemo(() => ["Sharja", "Dubai", "Burjman"], []);

  const handlePickUpButtonClick = (option) => {
    if (option === "Deliver") {
      console.log("In delivery");
    } else if (option === "Pick") {
      console.log("In pick");
    }
    setShowPickupDropdown(false);
    setSelectedPickUpOptionButton(option);
  };

  const handleDropOffButtonClick = (option) => {
    if (option === "CompanyDropOff") {
      console.log("In company drop off");
    } else if (option === "SelfDropOff") {
      console.log("In self drop pick");
    }
    setShowPickupDropdown(false);
    setSelectedDropOffOptionButton(option);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return carsData.slice(firstPageIndex, lastPageIndex);
  }, [carsData, currentPage]);

  const allCarsBookingButton = () => {
    console.log("All Cars Booking Button");
    navigate("/bookingPage1");
  };
  return (
    <div id="main" className="pb-2 ">
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
                    className="all-cars-search-box-container"
                  >
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
                              setSelectedPickupCityName={
                                setSelectedPickupCityName
                              }
                              setPickupLocation={setPickupLocation}
                              selectedPickUpOptionButton={
                                selectedPickUpOptionButton
                              }
                            />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col xxl={2} lg={2} md={3} sm={6} xs={12}>
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

                      <Col xxl={2} lg={2} md={3} sm={6} xs={12}>
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
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col className="mt-2">
                    {numberOfDays > 0 && (
                      <span className="fs-5">
                        Number of days:{" "}
                        <span className="total-days">{numberOfDays}</span>
                      </span>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          <Container fluid className="all-cars-container pb-4">
            <Row>
              <Col xxl={3} lg={3} md={4} className="filters-section">
                <h3 className="filters-heading text-center">
                  <b>
                    Filters: <hr />
                  </b>
                </h3>
                <div className="card search-filters-card">
                  <article className="card-group-item">
                    <div className="location-label car-model-label">
                      <header className="card-header styled-label">
                        <BsCarFrontFill className="mr-2" />
                        <b>Car Model</b>
                      </header>
                    </div>{" "}
                    <div className="filter-content">
                      <div className="card-body">
                        <form>
                          <label className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <span className="form-check-label">Mersedes Benz</span>
                          </label>
                          <label className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <span className="form-check-label">Nissan Altima</span>
                          </label>
                          <label className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <span className="form-check-label">Another Brand</span>
                          </label>
                        </form>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="card search-filters-card">
                  <article className="card-group-item">
                    <div className="location-label">
                      <header className="card-header styled-label title">
                        <BsJustify className="mr-2" />
                        <b>Car Type</b>
                      </header>
                    </div>
                    <div className="filter-content">
                      <div className="card-body">
                        <form>
                          <label className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <span className="form-check-label">Mersedes Benz</span>
                          </label>
                          <label className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <span className="form-check-label">Nissan Altima</span>
                          </label>
                          <label className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <span className="form-check-label">Another Brand</span>
                          </label>
                        </form>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="card search-filters-card">
                  <article className="card-group-item">
                    <div className="location-label">
                      <header className="card-header styled-label">
                        <BsTags className="mr-2" />
                        <b>Price Range</b>
                      </header>
                    </div>
                    <div className="filter-content">
                      <div className="card-body">
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              type="number"
                              className="form-control"
                              id="inputEmail4"
                              placeholder="AED 0"
                            />
                          </div>
                          <div className="form-group col-md-6 text-right">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="AED 1,0000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </Col>

              <Col xxl={9} lg={9} md={8}>
                <div className="all-cars-section ">
                  <Row>
                    <Col xxl={8} lg={8}>
                      {/* <div className="">
                        <Row>
                          <Col xxl={6} lg={6} md={6} sm={6}>
                            <Form.Group controlId="formCarModel">
                              <div className="location-label car-model-label">
                                <label className="styled-label mt-2">
                                  <BsCarFrontFill className="mr-2" />
                                  <b>Car Model</b>
                                </label>
                              </div>{" "}
                              <select
                                id="carModelSelect"
                                className="form-select"
                                value={selectedCarModel}
                                multiple
                                onChange={(e) =>
                                  setSelectedCarModel(e.target.value)
                                }
                              >
                                <option value="" disabled>
                                  Choose Car Model
                                </option>
                                {carModels.map((model) => (
                                  <option key={model} value={model}>
                                    {model}
                                  </option>
                                ))}
                              </select>
                            </Form.Group>
                          </Col>

                          <Col xxl={6} lg={6} md={6} sm={6}>
                            <Form.Group controlId="formCarType">
                              <div className="location-label">
                                <label className="styled-label mt-2">
                                  <BsJustify className="mr-2" />
                                  <b>Car Type</b>
                                </label>
                              </div>
                              <select
                                id="carTypeSelect"
                                className="form-select"
                                value={selectedCarType}
                                multiple
                                onChange={(e) =>
                                  setSelectedCarType(e.target.value)
                                }
                              >
                                <option value="" disabled>
                                  Choose Car Type
                                </option>
                                {carTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col xxl={6} lg={6}>
                            <Form.Group controlId="formMinMaxPrice">
                              <div className="location-label">
                                <label className="styled-label">
                                  <BsTags className="mr-2" />
                                  <b>Price Range</b>
                                </label>
                              </div>
                              <Row>
                                <Col className="min-price-input">
                                  <Form.Control
                                    type="number"
                                    placeholder="Min Price"
                                    min={1}
                                    value={minPrice}
                                    onChange={(e) =>
                                      setMinPrice(e.target.value)
                                    }
                                  />
                                </Col>{" "}
                                <br />
                                <Col className="max-price-input">
                                  <Form.Control
                                    type="number"
                                    placeholder="Max Price"
                                    min={minPrice}
                                    value={maxPrice}
                                    onChange={(e) => {
                                      if (
                                        e.target.value >= minPrice ||
                                        e.target.value === ""
                                      ) {
                                        setMaxPrice(e.target.value);
                                      }
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div> */}
                    </Col>

                    <Col xxl={4} lg={4}>
                      <div className="sort-by-dropdown">
                        <Row className="sort-by-row justify-content-between align-items-center mb-4">
                          <Col>
                            <Form.Group controlId="formSortBy">
                              <Form.Label className="styled-label mt-2">
                                <h6>
                                  {" "}
                                  <b>Sort By:</b>
                                </h6>
                              </Form.Label>
                              <select
                                id="sortBySelect"
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                              >
                                <option value="LowToHigh">Low to High</option>
                                <option value="HighToLow">High to Low</option>
                                <option value="Recommended">Recommended</option>
                              </select>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>

                  <>
                    <h4 className="pt-4 pb-2 all-cars-heading">
                      All Cars
                      <hr />
                    </h4>
                    <Row className="offers-car-container-row">
                      {currentTableData.map((car, index) => (
                        <Col
                          key={index}
                          xxl={4}
                          lg={6}
                          md={6}
                          sm={12}
                          className="offers-car-div pb-5"
                        >
                          <div className="all-offer-cars p-3">
                            {car.discount > 0 && (
                              <>
                                <div id={`hr-value-allcars-1`}></div>
                                <div className="offer-car-price">
                                  <b>{car.discount}% Off</b>
                                </div>
                                <div id={`hr-value-allcars-2`}></div>
                              </>
                            )}
                            <div className="car-name-div">
                              <span className="car-name text-end">
                                {" "}
                                <b>{car.name} | </b>( {car.carType} ){" "}
                              </span>
                            </div>
                            <div className="car-image-container ">
                              <img
                                src={car.image}
                                alt={`Car ${index + 1}`}
                                className="car-image m-4"
                              />
                              {/* <div className="car-image-overlay"></div> */}
                            </div>
                            <div className="all-vehicles-features-icons features-scroll-container text-center">
                              {carFeaturesWithIcons.map(
                                (carFeaturesIcons, index) => (
                                  <span key={index}>
                                    <span className="features-values">
                                      <carFeaturesIcons.featureIcon className="" />{" "}
                                      {carFeaturesIcons.value}{" "}
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
                                        <div className="card">
                                          <div className="card-body price-day-div">
                                            <div className="card-text">
                                              <span style={{ color: "gray" }}>
                                                Per {duration}
                                              </span>
                                              <br />
                                              {car.discount > 0 && (
                                                <>
                                                  <del
                                                    style={{
                                                      textDecorationColor:
                                                        "red",
                                                      color: "#cc6119",
                                                    }}
                                                  >
                                                    {car.originalPrice *
                                                      durationValues[
                                                        index
                                                      ]}{" "}
                                                  </del>{" "}
                                                  <span
                                                    className="AED"
                                                    style={{
                                                      textDecorationColor:
                                                        "red",
                                                      color: "#cc6119",
                                                    }}
                                                  >
                                                    AED
                                                  </span>{" "}
                                                </>
                                              )}{" "}
                                              {car.discount <= 0 && (
                                                <>
                                                  <span className="p-1"></span>
                                                </>
                                              )}
                                              <p style={{ color: "green" }}>
                                                {calculateSalePrice(
                                                  car.originalPrice,
                                                  car.discount
                                                ) * durationValues[index]}{" "}
                                                AED{" "}
                                              </p>
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
                              <div className="col-xxl-10 col-lg-9 col-md-12 col-sm-8 col-10">
                                {car.days > 0 ? (
                                  <>
                                    <Button
                                      variant="primary"
                                      className="pay-now-button"
                                    >
                                      <span className="pay-now-value">
                                        Pay Now | AED:{" "}
                                        {calculateSalePrice(
                                          car.originalPrice,
                                          car.discount
                                        ) * car.days}{" "}
                                        | {car.days} days
                                      </span>
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      variant="primary"
                                      className="book-now-button"
                                      onClick={allCarsBookingButton}
                                    >
                                      Book Now
                                    </Button>
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

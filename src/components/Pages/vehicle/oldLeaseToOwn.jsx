/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import {
  BsCarFrontFill,
  BsCalendar2Check,
  BsJustify,
  BsCpu,
  BsPerson,
  BsSuitcase,
} from "react-icons/bs";
import { GiGearStickPattern, GiCarDoor } from "react-icons/gi";
import { LuSnowflake } from "react-icons/lu";
import "./vehicleDetails.css";
import Car1 from "../../images/suv-car-fleet-1.png";
import Car2 from "../../images/sedan-car-fleet-2.png";
import Car3 from "../../images/economy-car-fleet-3.png";
import Pagination from "./pagination";
import Select from "react-select";
import MainNavbar from "../navbar/mainNavbar";
import { useNavigate, useLocation } from "react-router-dom";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "../../PrivateComponents/reloadingComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { FaPhone, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import ContactUsForm from "../OtherPages/contactUsForm";

import makeAnimated from "react-select/animated";

const PageSize = 8;
const animatedComponents = makeAnimated();

const LeaseToOwnVehicles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCarModelOpen, setIsCarModelOpen] = useState(true);
  const [isCarTypeOpen, setIsCarTypeOpen] = useState(true);
  const [isNumOfyearsOpen, setIsNumOfyearsOpen] = useState(true);
  const [selectedNumOfYears, setSelectedNumOfYears] = useState({
    label: "1 year",
    value: 1,
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    carModels: [],
    carTypes: [],
  });

  const navigate = useNavigate();

  const phoneNumber = "+971508805974";
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;

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
  const calculateSalePrice = (originalPrice, discount) => {
    const calculatedPrice = (originalPrice * discount) / 100;
    return Math.floor(originalPrice - calculatedPrice);
  };

  const carsData = useMemo(
    () =>
      [
        {
          name: "Car name 1",
          image: Car1,
          carType: "SUV",
          carModel: "Picanto",
          carPrice: 124000,
        },
        {
          name: "Car name 2",
          image: Car2,
          carType: "Sedan",
          carModel: "Cretaa",
          carPrice: 90000,
        },
        {
          name: "Car name 3",
          image: Car3,
          carType: "Economy",
          carModel: "Cretaa",
          carPrice: 245000,
        },
        {
          name: "Car name 4",
          image: Car1,
          carType: "SUV",
          carModel: "K5",
          carPrice: 540000,
        },
        {
          name: "Car name 5",
          image: Car2,
          carType: "Sedan",
          carModel: "2008",
          carPrice: 85000,
        },
        {
          name: "Car name 6",
          image: Car1,
          carType: "SUV",
          carModel: "K5",
          carPrice: 250000,
        },
        {
          name: "Car name 7",
          image: Car3,
          carType: "SUV",
          carModel: "K5",
          carPrice: 20000,
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

  const numOfYears = useMemo(() => [1, 2, 3, 4, 5], []);
  const numOfYearsOptions = numOfYears.map((year) => ({
    label: `${year} year${year > 1 ? "s" : ""}`,
    value: year,
  }));

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

      return modelMatch && typeMatch;
    });

    let sortedFilteredCars = [...filteredCars];

    return sortedFilteredCars;
  }, [carsData, selectedFilters.carModels, selectedFilters.carTypes]);

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
  };

  const handleSendInquiryButton = () => {
    setShowModal(true);
    // navigate("/contactus");
  };

  const toggleCarModel = () => {
    setIsCarModelOpen(!isCarModelOpen);
  };

  const toggleCarType = () => {
    setIsCarTypeOpen(!isCarTypeOpen);
  };

  const toggleNumofYears = () => {
    setIsNumOfyearsOpen(!isNumOfyearsOpen);
  };

  const calculateLeaseToOwnPrice = (numOfYears, totalSellingPrice) => {
    const downPaymentWithVAT = totalSellingPrice * 0.2;
    const downPaymentWithoutVAT = downPaymentWithVAT / 1.05;
    const leasedAmouontPerYearWithoutDownPayment =
      totalSellingPrice - downPaymentWithoutVAT;

    const financeCostPeryear =
      leasedAmouontPerYearWithoutDownPayment * 0.08 * numOfYears;

    const leastAmountFinanceCostWithoutVAT =
      leasedAmouontPerYearWithoutDownPayment + financeCostPeryear;
    const leastAmountFinanceCostWithVAT =
      leastAmountFinanceCostWithoutVAT * 1.05;

    const monthlyInstallmentsPriceWithoutVAT =
      leastAmountFinanceCostWithoutVAT / (12 * numOfYears);
    const monthlyInstallmentsPriceWithVAT =
      monthlyInstallmentsPriceWithoutVAT * 1.05;

    const totalLeasedPaymentWithoutVAT =
      monthlyInstallmentsPriceWithoutVAT * 12 * numOfYears;
    const totalLeasedPaymentWithVAT =
      monthlyInstallmentsPriceWithVAT * 12 * numOfYears;

    const premiumFullInsurancePerYearWihtoutVAT =
      totalSellingPrice * 1.1 * 0.03 * numOfYears;
    const premiumFullInsurancePerYearWihtVAT =
      premiumFullInsurancePerYearWihtoutVAT * 1.05;

    const yearlyRegisterationWithoutVAT = 2000 * numOfYears;
    const yearlyRegisterationWithVAT = yearlyRegisterationWithoutVAT * 1.05;

    const someChargesCalculation =
      (premiumFullInsurancePerYearWihtoutVAT + yearlyRegisterationWithoutVAT) *
      1.08;

    const monthlyRegisterationInsurancePriceWithoutVAT =
      someChargesCalculation / (12 * numOfYears);
    const monthlyRegisterationInsurancePriceWithVAT =
      monthlyRegisterationInsurancePriceWithoutVAT * 1.05;

    const finalPricePerMonthWithoutVATBeforeRound =
      monthlyInstallmentsPriceWithoutVAT +
      monthlyRegisterationInsurancePriceWithoutVAT;

    const finalPricePerMonthWithoutVAT = Math.round(
      finalPricePerMonthWithoutVATBeforeRound
    );

    const finalPricePerMonthWithVAT = Math.round(
      finalPricePerMonthWithoutVATBeforeRound * 1.05
    );

    console.log(
      `Final Price without VAT is: ${finalPricePerMonthWithoutVAT}\nFinal Price Including VAT is: ${finalPricePerMonthWithVAT}`
    );
    return finalPricePerMonthWithVAT;
  };

  // useEffect(() => {
  //   calculateLeaseToOwnPrice(5, 245000);
  // }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNumOfYearsChange = (selectedOptions) => {
    console.log("111111- Change num of years...", selectedOptions);
    if (selectedOptions.length > 0) {
      const latestSelectedOption = selectedOptions[selectedOptions.length - 1];
      setSelectedNumOfYears(latestSelectedOption);
      console.log("222222- Change num of years...", latestSelectedOption);
    } else {
      setSelectedNumOfYears(null);
      console.log("333333333-Change num of years...", selectedNumOfYears);
    }
  };

  const selectNumOfyearsStyles = {
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
      backgroundColor: isSelected ? "#e87a28" : "white",
      ":hover": {
        backgroundColor: isSelected ? "#e87a28" : "#e87a28",
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
      <>
        {/* <div className="navbar-bg-img-container">
          <div className="booking-page-banner-navbar">
            {" "}
            <MainNavbar />
          </div>
        </div> */}
        <div className="styled-label text-center pb-3">
          <span>
            <b className="fs-3 mt-2 mb-2">Lease To Own</b>
          </span>
        </div>
        <div className="all-cars-main-container-div container">
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

                <div className="card search-filters-card">
                  <article className="card-group-item">
                    <div className="car-categories-label">
                      <header
                        className="card-header styled-label pt-3 pb-3"
                        onClick={toggleNumofYears}
                      >
                        <div className="car-categories-filter-container d-flex justify-content-between">
                          <div className="car-categories-icon-title">
                            <BsCalendar2Check className="mr-2" />
                            <b>Select years</b>
                          </div>
                          <div className="car-categories-open-close-modal ">
                            {isNumOfyearsOpen ? (
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
                    {isNumOfyearsOpen && (
                      <div className="filter-content">
                        <div className="card-body">
                          <article className="card-group-item">
                            <div className="car-card">
                              <Select
                                isMulti
                                components={animatedComponents}
                                options={numOfYearsOptions}
                                value={selectedNumOfYears}
                                onChange={handleNumOfYearsChange}
                                styles={selectNumOfyearsStyles}
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
                        <div className="card-body car-type-filter">
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
                </div>
              </Col>

              <Col xxl={9} lg={9} md={8}>
                <div className="all-cars-section ">
                  <>
                    <h3 className="pb-2 all-cars-heading">
                      All Cars
                      <hr className="middle-hr-tag" />
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
                          <div className="single-car-container-div pb-3">
                            <div className="car-price-name-container pb-3">
                              <div className="test-div">
                                <span className="test text-start">
                                  {/* <div id="tag">
                                    <span id="price">100 AED /Month</span>
                                  </div> */}
                                </span>
                              </div>

                              <div className="car-details-div">
                                <span className="car-name text-end">
                                  <b>{car.name} | </b>( {car.carType} )
                                </span>
                              </div>
                            </div>

                            <div className="car-image-container ">
                              <a href="#1">
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
                                  <span
                                    key={index}
                                    className="lease-page-single-feature-container"
                                  >
                                    <span className="features-values">
                                      <carFeaturesIcons.featureIcon className="all-car-icons" />{" "}
                                      <span className="">
                                        {carFeaturesIcons.value}{" "}
                                      </span>
                                      {/* {index <
                                        carFeaturesWithIcons.length - 1 && (
                                        <span className="car-features-vertical-line mr-2 ml-2">
                                          |
                                        </span>
                                      )} */}
                                    </span>
                                  </span>
                                )
                              )}
                            </div>

                            <hr className="discount-line" />

                            <div className="car-installments-price pl-3 pr-3">
                              <div className="product-panel__prices d-flex mb-3">
                                <div className="product-panel__price">
                                  <span>Installment per Month :</span>
                                  {/* {selectedNumOfYears?.value} */}
                                  AED{" "}
                                  {selectedNumOfYears
                                    ? calculateLeaseToOwnPrice(
                                        selectedNumOfYears?.value,
                                        car.carPrice
                                      )
                                    : "Select years"}
                                  {/* {car.carPrice} */}
                                </div>
                              </div>
                            </div>

                            <div className="lease-cars-buttons-container">
                              <div className="button-container d-flex flex-wrap justify-content-center align-items-start">
                                <div className="lease-car-phone-num-div">
                                  <a
                                    href={`tel:${phoneNumber}`}
                                    className="lease-car-button phone-call-link-lease-section"
                                  >
                                    <FaPhone />
                                  </a>
                                </div>
                                <div className="lease-car-whatsapp-div mr-2">
                                  <a
                                    href={whatsappLink}
                                    target="_blank"
                                    className="lease-car-button whatsapp-link-lease-section"
                                    rel="noreferrer"
                                  >
                                    <FaWhatsapp />
                                  </a>
                                </div>
                                <div className="lease-car-button send-inquiry-button">
                                  <button
                                    onClick={handleSendInquiryButton}
                                    className="map-loc-middle py-3"
                                  >
                                    <span
                                      href=""
                                      className="animate-button btn4"
                                    >
                                      Send Inquiry
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </>
                  <Modal
                    show={showModal}
                    onHide={handleCloseModal}
                    centered
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>View Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <>
                        <ContactUsForm />{" "}
                      </>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                    </Modal.Footer>
                  </Modal>
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

export default LeaseToOwnVehicles;

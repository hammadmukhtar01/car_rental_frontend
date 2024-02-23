import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  BsCarFrontFill,
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
import MainNavbar from "../navbar/mainNavbar";
import { useNavigate, useLocation } from "react-router-dom";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "../../PrivateComponents/reloadingComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { FaPhone, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const PageSize = 20;

const QuickLeaseVehicles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCarModelOpen, setIsCarModelOpen] = useState(true);
  const [isCarTypeOpen, setIsCarTypeOpen] = useState(true);
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
        },
        {
          name: "Car name 2",
          image: Car2,
          carType: "Sedan",
          carModel: "Cretaa",
        },
        {
          name: "Car name 3",
          image: Car3,
          carType: "Economy",
          carModel: "Cretaa",
        },
        {
          name: "Car name 4",
          image: Car1,
          carType: "SUV",
          carModel: "K5",
        },
        {
          name: "Car name 5",
          image: Car2,
          carType: "Sedan",
          carModel: "2008",
        },
        {
          name: "Car name 6",
          image: Car1,
          carType: "SUV",
          carModel: "K5",
        },
        {
          name: "Car name 7",
          image: Car3,
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
    navigate('/contactus')
  };

  const toggleCarModel = () => {
    setIsCarModelOpen(!isCarModelOpen);
  };

  const toggleCarType = () => {
    setIsCarTypeOpen(!isCarTypeOpen);
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
        <div className="navbar-bg-img-container">
          <div className="booking-page-banner-navbar">
            {" "}
            <MainNavbar />
          </div>
        </div>
        <div className="styled-label text-center pb-3">
          <span>
            <b className="fs-3">Lease To Own</b>
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
                          <div className="all-offer-cars pb-3">
                            <div className="car-name-div">
                              <span className="car-name text-end">
                                {" "}
                                <b>{car.name} | </b>( {car.carType} ){" "}
                              </span>
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
                                  <span key={index} className="lease-page-single-feature-container">
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
                                    className="animated-button"
                                    onClick={handleSendInquiryButton}
                                  >
                                    <span className="button-text-span">
                                      <span className="transition"></span>
                                      <span className="gradient"></span>
                                      <span className="label">
                                        Send Inquiry
                                      </span>
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

export default QuickLeaseVehicles;

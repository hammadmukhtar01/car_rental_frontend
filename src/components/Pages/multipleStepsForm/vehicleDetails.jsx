import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Container, Row, Col, Modal, Form } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  BsPerson,
  BsSuitcase,
  BsFillShieldLockFill,
  BsPersonCircle,
  BsFileEarmarkArrowUp,
} from "react-icons/bs";
import { GiGearStickPattern, GiCarDoor } from "react-icons/gi";
import { LuSnowflake } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import Modals from "./imageEnlarger";
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowTrendUp } from "react-icons/fa6";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { FaMapMarkerAlt, FaTelegramPlane } from "react-icons/fa";
import "./verticalSliderCarDetails.css";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

const VehicleDetails = ({ nextStep }) => {
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleVehicleDetails, setSingleVehicleDetails] = useState({});
  const [addOnsValuesData, setAddOnsValuesData] = useState([]);
  const [selectedAddOn, setSelectedAddOn] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [mileageInput, setMileageInput] = useState("");

  const carTypeInURL = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(carTypeInURL?.search),
    [carTypeInURL?.search]
  );
  const TariffGroupId = queryParams?.get("tariffGroupId");
  const StartDateTime = queryParams?.get("startDate");
  const ReturnDateTime = queryParams?.get("endDate");
  const pickupTimeParam = queryParams?.get("pickupTime");
  const dropoffTimeParam = queryParams?.get("dropoffTime");
  const pickupLocParam = queryParams?.get("pickupLoc");
  const pickupLocStateParam = queryParams?.get("pickupLocState");
  const dropoffLocStateParam = queryParams?.get("dropoffLocState");
  const checkBoxValueParam = queryParams?.get("checkBoxValue");
  const numberOfDays = queryParams?.get("noOfDays");
  const pickupLocTabValue = queryParams?.get("pickupLocSelectedTab");
  const DropoffLocTabValue = queryParams?.get("dropoffLocSelectedTab");
  const calculatedVehiclePrice = parseInt(queryParams?.get("vehiclePrice"));
  const [dropoffLocParam, setDropoffLocParam] = useState("DUBAI");
  console.log(
    `pickupLocTabValue values: ${pickupLocTabValue}\nDropoffLocTabValue values: ${DropoffLocTabValue}`
  );
  const fetchSingleCarDetails = useCallback(async () => {
    let data = { TariffGroupId, StartDateTime, ReturnDateTime };
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = `https://app.speedautosystems.com/api/services/app/bookingPluginSearch/GetVehicleRateDetail`;
      const response = await axios.post(url, data, { headers });

      setSingleVehicleDetails(response?.data?.result);
      // console.log("Complete Details of a cars is : ", response?.data?.result);
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, [TariffGroupId, StartDateTime, ReturnDateTime]);

  useEffect(() => {
    fetchSingleCarDetails();
  }, [StartDateTime, ReturnDateTime, fetchSingleCarDetails]);

  const categoryMap = {
    Standard: "Sedan",
    "Small SUV 5 Seater": "SUV",
    Compact: "HatchBack",
    Fullsize: "7 Seater",
  };

  const baseAPIResponsePath = singleVehicleDetails?.vehicle?.tariffGroup;

  const carTypeName = baseAPIResponsePath?.title;
  const carCategory =
    categoryMap[baseAPIResponsePath?.acrissCategory?.name] ||
    baseAPIResponsePath?.acrissCategory?.name;
  const carImg = baseAPIResponsePath?.displayImage?.url;
  const totalPrice = singleVehicleDetails?.charges?.[0]?.tariff?.[0]?.rate;
  const totalAPIResponseCharges =
    calculatedVehiclePrice ?? totalPrice * numberOfDays;

  const singleDayPriceCalculation =
    parseFloat(calculatedVehiclePrice / numberOfDays).toFixed(2) ?? totalPrice;

  const carPassengerCapacity = baseAPIResponsePath?.passengerCapacity;
  const carManualAutomaticType =
    baseAPIResponsePath?.acrissTransDrive?.name?.split("/")[0];
  const carDoorstype =
    baseAPIResponsePath?.acrissType?.name?.split("/")[1] ||
    baseAPIResponsePath?.acrissType?.name?.split("-")[1] ||
    baseAPIResponsePath?.acrissType?.name;
  const carlargeSafetyBags = baseAPIResponsePath?.largeBagsCapacity;
  const carsmallSafetyBags = baseAPIResponsePath?.smallBagsCapacity;
  const carTotalSafetyBags = carlargeSafetyBags + carsmallSafetyBags;

  const additionalFeaturesArray =
    singleVehicleDetails?.notes?.split(", ") || [];

  // const additionalFeaturesList = [...additionalFeaturesArray];
  // console.log(`additionalFeaturesList ${additionalFeaturesList}`);

  const carFeaturesWithIcons = [
    {
      name: "Seater",
      value: carPassengerCapacity,
      featureIcon: BsPerson,
    },

    {
      name: "",
      value: carDoorstype,
      featureIcon: GiCarDoor,
    },
    {
      name: carManualAutomaticType,
      value: null,
      featureIcon: GiGearStickPattern,
    },

    {
      name: "Luggage Bags",
      value: carTotalSafetyBags,
      featureIcon: BsSuitcase,
    },
    {
      name: "Air Conditioner",
      value: null,
      featureIcon: LuSnowflake,
    },
  ];

  const couponsData = [
    {
      name: "ABC123",
      value: 10,
    },

    {
      name: "NEW40",
      value: 40,
    },
  ];

  const getUpdatedPrice = (addOn, numberOfDays, carCategory) => {
    switch (addOn?.addOnsName) {
      case "CDW (Collision Damage Waiver)":
        if (numberOfDays >= 1 && numberOfDays < 7) {
          return carCategory === "HatchBack" ? 20 : 30;
        } else if (numberOfDays >= 7 && numberOfDays <= 21) {
          return carCategory === "HatchBack" ? 15 : 20;
        } else if (numberOfDays > 21) {
          return carCategory === "HatchBack" ? 10 : 15;
        }
        break;
      case "Baby Seat":
        if (numberOfDays >= 1 && numberOfDays < 7) return 20;
        if (numberOfDays >= 7 && numberOfDays <= 21)
          return Math.round((120 / 7) * numberOfDays);
        if (numberOfDays > 21) return Math.round((400 / 30) * numberOfDays);
        break;
      case "Mobile Holder":
        if (numberOfDays >= 1 && numberOfDays < 7) return 5;
        if (numberOfDays >= 7 && numberOfDays <= 21)
          return Math.round((10 / 7) * numberOfDays);
        if (numberOfDays > 21) return Math.round((20 / 30) * numberOfDays);
        break;
      case "Sunshades":
        if (numberOfDays >= 1 && numberOfDays < 7) return 10;
        if (numberOfDays >= 7 && numberOfDays <= 21)
          return Math.round((30 / 7) * numberOfDays);
        if (numberOfDays > 21) return Math.round((50 / 30) * numberOfDays);
        break;
      case "PAI (Personal Accident Insurance)":
        if (numberOfDays >= 1 && numberOfDays < 7) return 15;
        if (numberOfDays >= 7 && numberOfDays <= 21) return 10;
        if (numberOfDays > 21) return 5;
        break;
      default:
        return addOn?.pricePerTrip;
    }
  };

  const totalDays = parseInt(queryParams?.get("noOfDays"), 10) || 1;

  const AddOnsData = useMemo(
    () => [
      {
        id: 2,
        addOnsName: "CDW (Collision Damage Waiver)",
        pricePerTrip: getUpdatedPrice(
          { addOnsName: "CDW (Collision Damage Waiver)" },
          totalDays,
          carCategory
        ),
        IconName: BsFileEarmarkArrowUp,
        checkBoxValue: 0,
        addOnsDetail:
          "Optional coverage that limits the renter's liability in case of damage to the rental vehicle due to collision.",
      },

      {
        id: 3,
        addOnsName: "PAI (Personal Accident Insurance)",
        pricePerTrip: getUpdatedPrice(
          { addOnsName: "PAI (Personal Accident Insurance)" },
          totalDays
        ),
        checkBoxValue: 0,
        IconName: BsPersonCircle,
        addOnsDetail:
          "Coverage providing personal accident insurance for the driver and passengers during the rental period.",
      },
      // {
      //   id: 5,
      //   addOnsName: "Mileage",
      //   pricePerTrip: 0.5,
      //   checkBoxValue: 1,
      //   IconName: BsPersonCircle,
      //   addOnsDetail:
      //     "Additional miles beyond the standard limit included in the rental agreement, charged per mile/kilometer.",
      // },
      {
        id: 19,
        addOnsName: "Baby Seat",
        pricePerTrip: getUpdatedPrice({ addOnsName: "Baby Seat" }, totalDays),
        IconName: BsFileEarmarkArrowUp,
        checkBoxValue: 0,
        addOnsDetail:
          "Child safety seat suitable for infants or toddlers, ensuring safe transportation for young passengers.",
      },
      {
        id: 54,
        // Extra1Charges -> Tint
        addOnsName: "Tint",
        pricePerTrip: 150,
        IconName: BsFileEarmarkArrowUp,
        checkBoxValue: 0,
        addOnsDetail:
          "Dark window tinting for added privacy and sun protection during the rental period.",
      },

      {
        id: 55,
        // Extra2Charges -> Mobile Holder
        addOnsName: "Mobile Holder",
        pricePerTrip: getUpdatedPrice(
          { addOnsName: "Mobile Holder" },
          totalDays
        ),
        IconName: BsFileEarmarkArrowUp,
        checkBoxValue: 0,
        addOnsDetail:
          "Convenient mount to securely hold smartphones for GPS navigation or hands-free calling.",
      },

      {
        id: 58,
        // Extra3Charges -> Sunshades
        addOnsName: "Sunshades",
        pricePerTrip: getUpdatedPrice({ addOnsName: "Sunshades" }, totalDays),
        IconName: BsFileEarmarkArrowUp,
        checkBoxValue: 0,
        addOnsDetail:
          "Shades for car windows to reduce heat and glare, providing a more comfortable interior.",
      },

      {
        id: 67,
        addOnsName: "Airport Surcharges",
        pricePerTrip: 120,
        IconName: BsFileEarmarkArrowUp,
        checkBoxValue: 0,
        addOnsDetail:
          "Convenient pick-up service directly from the airport terminal to start the rental seamlessly.",
      },
    ],
    [carCategory, totalDays]
  );

  const fetchAddOnsChargesData = useCallback(async () => {
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = `https://app.speedautosystems.com/api/services/app/chargesSetting/GetChargesSettings`;

      const ModuleValue = {
        module: 1,
      };

      const response = await axios.post(url, ModuleValue, { headers });
      const fetchedAddOns = response?.data?.result?.items;

      const mergedAddOns = fetchedAddOns?.map((addOn) => ({
        ...addOn,
        ...AddOnsData?.find(
          (localAddOn) => localAddOn?.id === addOn?.chargesTypeId
        ),
      }));

      setAddOnsValuesData(mergedAddOns?.filter((addOn) => addOn?.addOnsName));
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, [AddOnsData]);

  useEffect(() => {
    fetchAddOnsChargesData();
  }, [fetchAddOnsChargesData]);

  const handleViewDetails = (addOn) => {
    setSelectedAddOn(addOn);
    setShowModal(true);
  };

  // const handleMileageChange = (e) => {
  //   console.log("mileage value is chnaged ", e.target.value);
  //   const value = parseFloat(e.target.value);
  //   if (!isNaN(value)) {
  //     setMileageInput(value);
  //   }
  // };

  const handleCheckBoxChange = (id) => {
    setSelectedAddOns((prevSelectedAddOns) => {
      const index = prevSelectedAddOns?.findIndex((addOn) => addOn?.id === id);
      if (index !== -1) {
        const updatedAddOns = [...prevSelectedAddOns];
        updatedAddOns?.splice(index, 1);
        return updatedAddOns;
      } else {
        const addOnToAdd = AddOnsData?.find((addOn) => addOn?.id === id);
        return [...prevSelectedAddOns, addOnToAdd];
      }
    });
  };

  const totalAddOnsPriceSimple = () => {
    return selectedAddOns?.reduce((total, addOn) => {
      const isCDWorPAI =
        addOn?.addOnsName === "CDW (Collision Damage Waiver)" ||
        addOn?.addOnsName === "PAI (Personal Accident Insurance)";
      // console.log(`mileage Input is: ${mileageInput}`);

      // const mileageCost =
      //   addOn?.addOnsName === "Mileage" ? mileageInput * 0.5 : 0;
      // console.log(`mileageCost is: ${mileageCost}`);
      return total + (addOn?.pricePerTrip || 0) * (isCDWorPAI ? totalDays : 1);
    }, 0);
  };

  useEffect(() => {
    if (checkBoxValueParam === "false") {
      setDropoffLocParam(pickupLocParam);
    } else {
      setDropoffLocParam(queryParams?.get("dropoffLoc"));
    }
  }, [checkBoxValueParam, pickupLocParam, queryParams]);

  const deliveryCharges = {
    FUJAIRAH: 250,
    "AL AIN": 250,
    "ABU DHABI": 250,
    DUBAI: 50,
    "RAS AL KHAIMAH": 250,
    SHARJAH: 80,
    AJMAN: 80,
    "Umm Al Quwain": 250,
  };

  const steps = [
    {
      locName: pickupLocParam,
      locDate: StartDateTime,
      locTime: pickupTimeParam,
      locIcon: FaTelegramPlane,
    },
    {
      locName: dropoffLocParam,
      locDate: ReturnDateTime,
      locTime: dropoffTimeParam,
      locIcon: FaMapMarkerAlt,
    },
  ];

  const applyCoupon = (e) => {
    e.preventDefault();

    const foundCoupon = couponsData?.find(
      (coupon) => coupon?.name === couponCode
    );

    if (couponCode?.trim() === "") {
      toast.warning("Please enter a coupon code", {
        autoClose: 3000,
        style: { border: "1px solid #c0c0c0", fontSize: "14px" },
      });

      return;
    }

    if (!foundCoupon) {
      toast.error("Invalid coupon code. Please enter a valid one.", {
        autoClose: 3000,
        style: {
          lineHeight: "20px",
          border: "1px solid #c0c0c0",
          fontSize: "14px",
        },
      });
      return;
    }

    setAppliedCoupon(foundCoupon);
    setIsCouponApplied(true);
  };

  const removeCoupon = (e) => {
    setAppliedCoupon(null);
    setIsCouponApplied(false);
    setCouponCode("");
    e.preventDefault();
  };

  const getDeliveryCharge = () => {
    const selectedStatePickup = pickupLocStateParam?.toUpperCase();
    const selectedStateDropoff = dropoffLocStateParam?.toUpperCase();
    let pickupCharge = 0;
    let dropoffCharge = 0;

    if (pickupLocTabValue.toUpperCase() === "DELIVER") {
      pickupCharge =
        deliveryCharges[selectedStatePickup] !== undefined
          ? deliveryCharges[selectedStatePickup]
          : 50;
      console.log(
        `pickup selected tab: ${selectedStatePickup} has charges: ${pickupCharge}`
      );
    }

    if (DropoffLocTabValue.toUpperCase() === "DELIVER") {
      dropoffCharge =
        deliveryCharges[selectedStateDropoff] !== undefined
          ? deliveryCharges[selectedStateDropoff]
          : 50;
      console.log(
        `Dropoff selected tab: ${selectedStateDropoff} has charges: ${dropoffCharge}`
      );
    }

    return pickupCharge + dropoffCharge;
  };

  const subTotalValue =
    totalAPIResponseCharges + getDeliveryCharge() + totalAddOnsPriceSimple();

  const taxTotal = Math.floor((5 * subTotalValue) / 100);
  const grandTotalPrice = subTotalValue + taxTotal;
  const grandTotalDiscountedValue = () => {
    if (appliedCoupon) {
      const discountedValue = appliedCoupon?.value;
      return discountedValue;
    }
    return 0;
  };

  const grandTotalPriceWithDiscount =
    grandTotalPrice - grandTotalDiscountedValue();

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowModal(false);
  };

  const handleNextStep1 = () => {
    const baseUrl = `/bookingPage/2`;
    const urlParams = new URLSearchParams(window.location.search);

    const selectedAddOnsDetails = selectedAddOns?.map((addOn) => ({
      id: addOn?.id,
      price: addOn?.pricePerTrip,
    }));

    const selectedAddOnsIds = selectedAddOnsDetails
      ?.map((addOn) => addOn?.id)
      .join(",");

    urlParams?.set("page", "2");
    urlParams?.set("totalNoOfDays", numberOfDays);
    urlParams?.set("discountValue", grandTotalDiscountedValue());
    urlParams?.set("grandTotalCharges", grandTotalPriceWithDiscount);
    urlParams?.set("addOns", selectedAddOnsIds);
    urlParams?.set("totalDeliveryCharges", getDeliveryCharge());

    const nextStepUrl = `${baseUrl}?${urlParams?.toString()}`;
    window.location.href = nextStepUrl;
  };

  function CustomStepIcon({ locName, locDate, IconName, locTime }) {
    function formatDate(dateString) {
      const options = { day: "2-digit", month: "short", year: "numeric" };
      const date = new Date(dateString);
      return date?.toLocaleDateString("en-US", options);
    }

    const formattedDate = formatDate(locDate);

    return (
      <>
        <div className="customer-step-container">
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconName className="mr-4" />{" "}
              <div>
                <Typography
                  variant="body1"
                  className="loc-name-text-car-details"
                >
                  {locName}
                </Typography>
              </div>
            </Box>
          </div>
          <div className="loc-name-car-details-page d-flex justify-content-start">
            <Typography variant="body2">
              {locTime} <span className="text-dark">(</span> {formattedDate}{" "}
              <span className="text-dark">)</span>
            </Typography>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Vehicle Detail - Milele Car Rental </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
      </Helmet>
      <div className="vehicle-details-location-main-div pb-3 pt-3">
        <Container fluid>
          <>
            <div className="step1-car-location-details-container">
              <div className="step1-car-details">
                <Row className="pl-3 pr-3 pt-3">
                  <h4 className="step1-car-name pl-3">{carTypeName}</h4>
                  <span className="step1-car-type pl-3">{carCategory} </span>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <div className="car-imgs-details-container">
                      <div className="car-img-container">
                        <Row>
                          <Col
                            lg={8}
                            md={12}
                            sm={12}
                            xs={12}
                            className="pl-3 pb-2"
                          >
                            <div className="pt-3 text-center">
                              <div className="carousel-container">
                                <img
                                  src={carImg}
                                  alt={``}
                                  className="car-image-1"
                                  onClick={handleImageClick}
                                />
                              </div>
                            </div>
                          </Col>

                          <Col lg={4} md={12} sm={12} xs={12}>
                            <div className=" ">
                              <span className="features-icons-heading pl-2">
                                <b>Key Features</b>
                              </span>
                              <hr className="hr-line-heading-scroll" />
                              <div className="car-features-div mt-3">
                                <Container
                                  fluid
                                  className="features-scroll-container"
                                >
                                  {carFeaturesWithIcons?.map(
                                    (carFeaturesIcons, index) => (
                                      <Row key={index}>
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                          <div className="features-values">
                                            <carFeaturesIcons.featureIcon className="mr-1 " />{" "}
                                            <span className="features-icon-name">
                                              {carFeaturesIcons?.value}{" "}
                                              {carFeaturesIcons?.name}
                                            </span>
                                          </div>
                                        </Col>
                                      </Row>
                                    )
                                  )}
                                </Container>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <hr />

                        <div className="car-features-description-main-div2 p-2">
                          <div className="features-sub-div">
                            <span className="car-features-div2-heading fw-bolder">
                              Car Features:{" "}
                            </span>
                            <div className="car-features-text-2 pt-2">
                              <div className="car-features-div">
                                <Row className="car-features-list-main-div">
                                  {additionalFeaturesArray?.map(
                                    (additionalFeatures, index) => (
                                      <Col
                                        lg={6}
                                        md={6}
                                        sm={6}
                                        xs={12}
                                        key={index}
                                      >
                                        <div className="car-features-list pt-2">
                                          <FaArrowTrendUp
                                            className="mr-2"
                                            style={{
                                              color: "#e87a28",
                                              fontSize: "20px",
                                            }}
                                          />{" "}
                                          {additionalFeatures}
                                        </div>
                                      </Col>
                                    )
                                  )}
                                </Row>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="step1-car-details pt-4">
                      <div className="location-label">
                        <div className="rental-addons-main-heading styled-label">
                          <BsFillShieldLockFill className="mr-2 heading-icon" />
                          <b>Rental AddOns</b>
                        </div>
                        <br />
                        <br />
                        <div className="driver-details-form-container">
                          <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                              <div className=" form-group ">
                                <Row className="d-flex">
                                  {addOnsValuesData?.map((AddOnsDataValues) => (
                                    <Col
                                      lg={8}
                                      md={12}
                                      sm={12}
                                      xs={12}
                                      className="add-on-container"
                                      key={AddOnsDataValues?.chargesTypeId}
                                    >
                                      <Form.Group
                                        controlId={`formKeyword_${AddOnsDataValues?.chargesTypeId}`}
                                      >
                                        <div className="row d-flex align-items-center">
                                          <Col lg={1} md={2} sm={2} xs={2}>
                                            <BsFileEarmarkArrowUp className="mr-2 heading-icon" />
                                          </Col>
                                          <Col lg={8} md={7} sm={7} xs={7}>
                                            <div className="add-ons-label-name p-2">
                                              <label className="add-ons-label">
                                                <b>
                                                  {AddOnsDataValues?.addOnsName}
                                                </b>
                                                <br />
                                                <span>
                                                  <b>
                                                    {" "}
                                                    {
                                                      AddOnsDataValues?.pricePerTrip
                                                    }
                                                  </b>{" "}
                                                  AED{" "}
                                                  {
                                                    AddOnsDataValues?.rateType
                                                      ?.name
                                                  }
                                                </span>
                                                <br />
                                                <a
                                                  href={`#${AddOnsDataValues?.chargesTypeId}`}
                                                  onClick={() =>
                                                    handleViewDetails(
                                                      AddOnsDataValues
                                                    )
                                                  }
                                                  className="add-ons-view-details"
                                                >
                                                  View Details
                                                </a>
                                              </label>
                                            </div>
                                          </Col>
                                          <Col lg={3} md={3} sm={3} xs={3}>
                                            {/* {AddOnsDataValues?.addOnsName ===
                                            "Mileage" ? (
                                              <input
                                                type="number"
                                                autoComplete="off"
                                                min={0}
                                                placeholder="/km"
                                                className="form-control form-control-contact-us"
                                                id="kmValue"
                                                name="kmValue"
                                                value={mileageInput}
                                                onChange={handleMileageChange}
                                              />
                                            ) : ( */}
                                            <div className="form-check form-switch form-switch-md float-end">
                                              <input
                                                className="form-check-input add-ons-toggle-input"
                                                type="checkbox"
                                                id={`flexSwitchCheckDefault_${AddOnsDataValues?.chargesTypeId}`}
                                                onChange={() =>
                                                  handleCheckBoxChange(
                                                    AddOnsDataValues
                                                      ?.chargesType?.id
                                                  )
                                                }
                                              />
                                            </div>
                                            {/* )} */}
                                          </Col>
                                        </div>
                                      </Form.Group>
                                    </Col>
                                  ))}
                                </Row>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      <Modal
                        show={showModal}
                        onHide={handleCloseModal}
                        centered
                        size="lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            <span className="modal-heading">
                              {" "}
                              View Details{" "}
                            </span>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {selectedAddOn && (
                            <>
                              <p>{selectedAddOn?.addOnsDetail}</p>
                            </>
                          )}
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
                    </div>
                    <br />
                  </Col>
                  <Col lg={4} md={12} sm={12} xs={12}>
                    <div className="step1-car-location-details-container">
                      <Box
                        sx={{ width: "100%" }}
                        className="customer-icon-stepper-container"
                      >
                        <div className="pickup-dropoff-heading mb-3 text-center">
                          <h4>Pick-up & Drop-off</h4>
                          <hr style={{ opacity: "1" }} />
                        </div>
                        <Stepper
                          activeStep={steps?.length - 1}
                          orientation="vertical"
                          className="pick-drop-data col-11"
                        >
                          {steps?.map((label, index) => (
                            <Step key={index}>
                              <StepLabel
                                StepIconComponent={() => (
                                  <CustomStepIcon
                                    locName={label?.locName}
                                    locDate={label?.locDate}
                                    IconName={label?.locIcon}
                                    locTime={label?.locTime}
                                  />
                                )}
                              />
                            </Step>
                          ))}
                        </Stepper>
                      </Box>
                    </div>
                    <br />
                    <div className="car-prices-details-container">
                      <div className="price-breakdown-heading mb-3 text-center">
                        <h4>Price Breakdown</h4>
                        <hr style={{ opacity: "1" }} />
                      </div>
                      <div className="price-break-down-container p-3">
                        <div className="total-days-div">
                          <div className="price-details-div col-lg-12">
                            <div className="booking-charges-evaluation-step1">
                              <>
                                <div
                                  className="price-row p-1"
                                  style={{ lineHeight: "100%" }}
                                >
                                  <span className="price-label">
                                    Total Days:
                                  </span>
                                  <div className="text-right">
                                    Days{" "}
                                    <span className="charges-value pl-1">
                                      {numberOfDays}
                                    </span>
                                  </div>
                                </div>

                                <div
                                  className="price-row p-1"
                                  style={{ lineHeight: "100%" }}
                                >
                                  <span className="price-label">
                                    Rental Charges per day
                                  </span>
                                  <div className="text-right">
                                    AED{" "}
                                    <span className="charges-value pl-1">
                                      {singleDayPriceCalculation}
                                    </span>
                                  </div>
                                </div>

                                <div
                                  className="price-row p-1"
                                  style={{ lineHeight: "100%" }}
                                >
                                  <span className="price-label">
                                    Rental Charges / {numberOfDays} days
                                  </span>
                                  <div className="text-right">
                                    AED{" "}
                                    <span className="charges-value pl-1">
                                      {totalAPIResponseCharges}
                                    </span>
                                  </div>
                                </div>

                                <hr />
                              </>
                              <>
                                <div
                                  className="price-row p-1"
                                  style={{ lineHeight: "100%" }}
                                >
                                  <span className="price-label">
                                    Delivery Charges:
                                  </span>
                                  <div className="text-right">
                                    AED{" "}
                                    <span className="charges-value pl-1">
                                      {getDeliveryCharge()}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className="price-row p-1"
                                  style={{ lineHeight: "100%" }}
                                >
                                  <span className="price-label">
                                    Add-Ons Total
                                  </span>
                                  <div className="text-right">
                                    AED{" "}
                                    <span className="charges-value pl-1">
                                      {totalAddOnsPriceSimple()}
                                    </span>
                                  </div>
                                </div>
                                <hr />
                              </>
                              <div className="charges-section-2">
                                <div
                                  className="total-price-row p-1"
                                  style={{
                                    lineHeight: "100%",
                                    fontSize: "16px",
                                  }}
                                >
                                  <span className="sub-total-price-label">
                                    Sub Total
                                  </span>
                                  <div className="text-right">
                                    AED{" "}
                                    <span className="sub-total-price-value pl-1">
                                      {" "}
                                      {subTotalValue}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className="total-price-row p-1"
                                  style={{
                                    lineHeight: "100%",
                                    fontSize: "16px",
                                  }}
                                >
                                  <div>
                                    <span className="sub-total-price-label">
                                      VAT
                                      <span className="pl-2">
                                        {" "}
                                        (5% of {subTotalValue})
                                      </span>
                                    </span>{" "}
                                  </div>
                                  <div className="text-right">
                                    AED{" "}
                                    <span className="sub-total-price-value pl-1">
                                      {" "}
                                      {taxTotal}
                                    </span>
                                  </div>
                                </div>

                                <div className="coupon-main-div pt-3">
                                  <Row>
                                    <Col xs={12} className="coupon-label-div">
                                      <span className="coupon-label">
                                        Coupon:
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row className="coupon-input-fields-div d-flex">
                                    <Col>
                                      <div className="input-group">
                                        <input
                                          className="form-control-login col-xl-9 col-lg-9 col-md-9 col-sm-9 col-8"
                                          name="couponCode"
                                          autoComplete="off"
                                          type="text"
                                          placeholder="Coupon Code"
                                          value={couponCode}
                                          onChange={(e) =>
                                            setCouponCode(e.target.value)
                                          }
                                        />

                                        {isCouponApplied ? (
                                          <>
                                            <button
                                              className="remove-coupon-btn button--submit"
                                              onClick={removeCoupon}
                                            >
                                              <RxCross2 />
                                            </button>
                                          </>
                                        ) : (
                                          <button
                                            className="apply-coupon-btn button--submit"
                                            onClick={applyCoupon}
                                          >
                                            <TiTick />
                                          </button>
                                        )}
                                        <ToastContainer />
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                              <hr />

                              {isCouponApplied && appliedCoupon && (
                                <div className="coupon-discount-main-div-container">
                                  <div
                                    className="total-price-row p-1"
                                    style={{
                                      lineHeight: "100%",
                                      fontSize: "16px",
                                    }}
                                  >
                                    <span className="grand-total-price-label">
                                      Grand Total
                                    </span>
                                    <div className="del-value-main-div pb-3">
                                      AED{" "}
                                      <span className="coupon-discount-value">
                                        -{appliedCoupon?.value}
                                      </span>
                                      <span className="deleted-grand-total-price-value pl-1">
                                        {" "}
                                        {grandTotalPrice}
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className="total-price-row p-1"
                                    style={{
                                      lineHeight: "100%",
                                      fontSize: "16px",
                                    }}
                                  >
                                    <span className="discount-price-label">
                                      Total Discount
                                    </span>
                                    <div className="del-value-main-div pb-3">
                                      AED{" "}
                                      <span className="discounted-value">
                                        -{grandTotalDiscountedValue()}
                                      </span>
                                    </div>
                                  </div>
                                  <hr />
                                </div>
                              )}
                              <div
                                className="total-price-row p-1"
                                style={{ lineHeight: "100%", fontSize: "16px" }}
                              >
                                <span className="grand-total-price-label">
                                  Grand Total Price
                                </span>
                                <div className="">
                                  AED{" "}
                                  <span className="grand-total-price-value pl-1">
                                    {" "}
                                    {grandTotalPriceWithDiscount}
                                  </span>
                                </div>
                              </div>

                              <hr />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="booking-button-main-div-step1 d-flex justify-content-center pb-2 pt-3">
                <Col className="d-flex justify-content-center ">
                  <button
                    onClick={() => handleNextStep1()}
                    className="map-loc-middle py-3"
                  >
                    <span className="animate-button btn4">Start Booking</span>
                  </button>
                </Col>
              </div>
            </div>
            <Modals
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              imageSrc={carImg}
              alt=""
            />
          </>
        </Container>
      </div>
    </div>
  );
};

export default VehicleDetails;

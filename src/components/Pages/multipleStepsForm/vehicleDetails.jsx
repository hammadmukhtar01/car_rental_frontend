/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsCpu, BsPerson, BsSuitcase } from "react-icons/bs";
import { GiGearStickPattern, GiCarDoor } from "react-icons/gi";
import { LuSnowflake } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import Modals from "./imageEnlarger";
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Car1 from "../../images/suv-car-fleet-1.png";
import { MdRadioButtonChecked } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { FaMapMarkerAlt, FaTelegramPlane } from "react-icons/fa";
import "./verticalSliderCarDetails.css";
import axios from "axios";

const VehicleDetails = ({ nextStep }) => {
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleVehicleDetails, setSingleVehicleDetails] = useState({});
  const [numberOfDays, setNumberOfDays] = useState(0);
  // const [totalCharges, setTotalCharges] = useState("");

  const carTypeInURL = useLocation();
  const queryParams = new URLSearchParams(carTypeInURL.search);
  const TariffGroupId = queryParams.get("tariffGroupId");
  const StartDateTime = queryParams.get("startDate");
  const ReturnDateTime = queryParams.get("endDate");
  const pickupTimeParam = queryParams.get("pickupTime");
  const dropoffTimeParam = queryParams.get("dropoffTime");
  const pickupLocParam = queryParams.get("pickupLoc");
  const dropoffLocParam = queryParams.get("dropoffLoc");
  const pickupLocStateParam = queryParams.get("pickupLocState");

  console.log("state is ---- ", pickupLocStateParam);
  // const selectedAddressState = "Dubai";

  const deliveryCharges = {
    FUJAIRAH: 250,
    "AL AIN": 200,
    "ABU DHABI": 200,
    DUBAI: 50,
    "RAS AL KHAIMAH": 250,
    SHARJAH: 80,
    AJMAN: 100,
  };

  useEffect(() => {
    if (StartDateTime && ReturnDateTime) {
      const startTimeStamp = new Date(StartDateTime).getTime();
      const endTimeStamp = new Date(ReturnDateTime).getTime();
      const timeDifference = endTimeStamp - startTimeStamp;
      const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      setNumberOfDays(totalDays);
    }
  }, [StartDateTime, ReturnDateTime]);

  const fetchSingleCarDetails = useCallback(async () => {
    let data = { TariffGroupId, StartDateTime, ReturnDateTime };
    try {
      const token =
        "pwhUHSoPIOJmECDhAyhlP1X5ZvzD1W3dmhUOdpQ-BQtQzg1PNlv8invCvbT1qk3EsoJfM_v8Pj8ZJsPKXVoC-kZtg0p2mpAu4f5g8LiMWrGbqZ4QRY-1xJRJTcWF-t24jUgdng1-myn-TgDddhkldDmkOufYlMdkGQDpZtnUfQ00qgl58t65VCWwK29g4ZWq_Y9djzMDXsmSARNbtZD4TkjqEtIihGsxcffl8VEdO_f3oqDZamOk-mq9XrzlOxdU76g7WRmubIBctGiJPO8DV5crp-ccVfeZ_3TinZc6pmUABcezl9QxkrcbcgTGrRjMhpdqtXYOworyQjpjOfEhbTHYrkQFw-7yTJOJiUCIUMX05z97fE5DIi7GJg8-PL5xfzUyPgruvfnkHHmlFRWIFOkoEgf7FdcQ3S7EveRJZsHVxCKUKg-Dvjm4k7VyHE3uLhKurIgj4VzVSdRYGVRiggymUxvRT4h5Lr_nh2G1vzIrOG1R5vfb_93Pk5SelyNHoizjG_3nCfGbgWzwQ728Z6Vn22CAcbKemFRF7kVh0mg";
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = `https://app.speedautosystems.com/api/services/app/bookingPluginSearch/GetVehicleRateDetail`;
      const response = await axios.post(url, data, { headers });

      setSingleVehicleDetails(response.data.result);
      console.log("Complete Details of a cars is : ", response.data.result);
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, [TariffGroupId, StartDateTime, ReturnDateTime]);

  useEffect(() => {
    fetchSingleCarDetails();
  }, [StartDateTime, ReturnDateTime, fetchSingleCarDetails]);

  const baseAPIResponsePath = singleVehicleDetails?.vehicle?.tariffGroup;

  const carTypeName = baseAPIResponsePath?.title;
  const carCategory = baseAPIResponsePath?.acrissCategory?.name;
  const carImg = baseAPIResponsePath?.displayImage?.url;
  const totalPrice = singleVehicleDetails?.charges?.[0]?.tariff?.[0]?.rate;
  const totalAPIResponseCharges = singleVehicleDetails?.totalCharges;

  const carPassengerCapacity = baseAPIResponsePath?.passengerCapacity;
  const carFuelType = baseAPIResponsePath?.acrissFuelAc?.name;
  const carManualAutomaticType =
    baseAPIResponsePath?.acrissTransDrive?.name?.split("/")[0];
  const carDoorstype =
    baseAPIResponsePath?.acrissType?.name?.split("/")[1] ||
    baseAPIResponsePath?.acrissType?.name?.split("-")[1] ||
    baseAPIResponsePath?.acrissType?.name;
  const carlargeSafetyBags = baseAPIResponsePath?.largeBagsCapacity;
  const carsmallSafetyBags = baseAPIResponsePath?.smallBagsCapacity;
  const carTotalSafetyBags = carlargeSafetyBags + carsmallSafetyBags;

  console.log(
    `Passengers are ${carPassengerCapacity} and Fuel type is: ${carFuelType} and car type is ${carManualAutomaticType} and carDoors are ${carDoorstype} and total bags are ${carTotalSafetyBags}`
  );

  const carFeaturesWithIcons = [
    {
      name: "Person Seats",
      value: carPassengerCapacity,
      featureIcon: BsPerson,
    },

    {
      name: "Doors",
      value: carDoorstype,
      featureIcon: GiCarDoor,
    },
    {
      name: carManualAutomaticType,
      value: null,
      featureIcon: GiGearStickPattern,
    },

    {
      name: "Safety Bags",
      value: carTotalSafetyBags,
      featureIcon: BsSuitcase,
    },
    {
      name: "AC",
      value: null,
      featureIcon: LuSnowflake,
    },

    {
      name: " Engine",
      value: carFuelType,
      featureIcon: BsCpu,
    },
  ];

  const couponsData = [
    {
      name: "ABC123",
      value: 10,
    },

    {
      name: "NEW40",
      value: 20,
    },
  ];

  const carAdditionalFeatures = [
    "Air Condtioner",
    "Central Lock",
    "Power Windows",
    "Power Steering",
    "Radio Listening",
    "Air Condtioner",
    "Central Lock",
    "Power Windows",
    "Power Steering",
    "Radio Listening",
  ];

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

    const foundCoupon = couponsData.find(
      (coupon) => coupon.name === couponCode
    );

    if (couponCode.trim() === "") {
      toast.warning("Please enter a coupon code", {
        autoClose: 3000,
        style: { border: "1px solid #c0c0c0", fontSize: "14px" },
      });

      return;
    }

    if (!foundCoupon) {
      toast.error("Invalid coupon code. Please enter a valid coupon code.", {
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

  const additionalCharges = [
    // {
    //   _id: 1,
    //   name: "Total Days",
    //   value: 200,
    // },
    // {
    //   _id: 2,
    //   name: "Rental Charges / 3 days",
    //   value: 200,
    // },
    // {
    //   _id: 1,
    //   name: "Charge ",
    //   value: 200,
    // },
  ];

  const getDeliveryCharge = () => {
    const selectedState = pickupLocStateParam.toUpperCase();

    if (deliveryCharges[selectedState]) {
      return deliveryCharges[selectedState];
    } else {
      return 0;
    }
  };

  const calculateTotalPrice = () => {
    if (additionalCharges) {
      return additionalCharges.reduce(
        (total, charge) => total + charge.value,
        0
      );
    }
    return 0;
  };

  const subTotalValue =
    calculateTotalPrice() + totalAPIResponseCharges + getDeliveryCharge();
  const taxTotal = Math.floor((5 * subTotalValue) / 100);
  const grandTotalPrice = subTotalValue + taxTotal;

  const grandTotalDiscountedValue = () => {
    if (appliedCoupon) {
      const discountedValue = Math.ceil(
        (appliedCoupon.value * grandTotalPrice) / 100
      );
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
  };

  const handleNextStep1 = () => {
    const nextStepUrl = "/bookingPage/2";
    window.location.href = nextStepUrl;
  };

  function CustomStepIcon({ locName, locDate, IconName, locTime }) {
    function formatDate(dateString) {
      const options = { day: "2-digit", month: "short", year: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", options);
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
    <div className="">
      <div className="vehicle-details-location-main-div pb-3 pt-3">
        <Container fluid>
          <>
            <div className="step1-car-location-details-container">
              <div className="step1-car-details">
                <Row className="pl-3 pt-3">
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
                                {/* <Carousel className="crsl">
                                  {images.map((image) => (
                                    <img
                                      key={image.id}
                                      src={image.download_url}
                                      alt={image.author}
                                    ></img>
                                  ))}
                                </Carousel> */}

                                <img
                                  src={carImg}
                                  alt={`Car-1`}
                                  className="car-image-1"
                                  onClick={handleImageClick}
                                />
                              </div>
                            </div>
                          </Col>

                          <Col lg={4} md={12} sm={12} xs={12}>
                            <div className=" ">
                              <span className="features-icons-heading pl-2">
                                <b>Features Icons:</b>
                              </span>
                              <hr className="hr-line-heading-scroll" />
                              <div className="car-features-div mt-2">
                                <Container
                                  fluid
                                  className="features-scroll-container"
                                >
                                  {carFeaturesWithIcons.map(
                                    (carFeaturesIcons, index) => (
                                      <Row key={index}>
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                          <div className="features-values">
                                            <carFeaturesIcons.featureIcon className="mr-1 " />{" "}
                                            <span className="features-icon-name">
                                              {carFeaturesIcons.value}{" "}
                                              {carFeaturesIcons.name}
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
                                <Row>
                                  {carAdditionalFeatures.map(
                                    (additionalFeatures, index) => (
                                      <Col
                                        lg={4}
                                        md={4}
                                        sm={6}
                                        xs={8}
                                        key={index}
                                      >
                                        <div className="car-features-list pt-2">
                                          <FaArrowTrendUp
                                            className="mr-2"
                                            style={{
                                              color: "#cc6119",
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
                          <br />
                          <div className="car-description-div">
                            <div className="car-description-div2-heading m-2">
                              <b> Description: </b>
                            </div>
                            <hr className="hr-line-heading-scroll" />

                            <div>
                              <div className="car-description-text-2">
                                {baseAPIResponsePath?.subTitle}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} md={12} sm={12} xs={12}>
                    <div className="step1-car-location-details-container">
                      {/* <VerticalSliderCarDetails /> */}
                      <Box
                        sx={{ width: "100%" }}
                        className="customer-icon-stepper-container"
                      >
                        <div className="pickup-dropoff-heading mb-3 text-center">
                          <h4>Pick-up & Drop-off</h4>
                          <hr style={{ opacity: "1" }} />
                        </div>
                        <Stepper
                          activeStep={steps.length - 1}
                          orientation="vertical"
                          className="pick-drop-data col-11"
                        >
                          {steps.map((label, index) => (
                            <Step key={index}>
                              <StepLabel
                                StepIconComponent={() => (
                                  <CustomStepIcon
                                    locName={label.locName}
                                    locDate={label.locDate}
                                    IconName={label.locIcon}
                                    locTime={label.locTime}
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
                                  <div className="">
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
                                  <div className="">
                                    AED{" "}
                                    <span className="charges-value pl-1">
                                      {totalPrice}
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
                                  <div className="">
                                    AED{" "}
                                    <span className="charges-value pl-1">
                                      {totalAPIResponseCharges}
                                    </span>
                                  </div>
                                </div>

                                <hr />
                              </>
                              <>
                                {/* {additionalCharges.map((charge) => ( */}
                                <div
                                  // key={charge._id}
                                  className="price-row p-1"
                                  style={{ lineHeight: "100%" }}
                                >
                                  <span className="price-label">
                                    Delivery Charges:
                                  </span>
                                  <div className="">
                                    AED{" "}
                                    <span className="charges-value pl-1">
                                      {getDeliveryCharge()}
                                    </span>
                                  </div>
                                </div>
                                {/* ))} */}
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
                                  <div className="">
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
                                      Tax Total
                                    </span>{" "}
                                  </div>
                                  <div className="">
                                    AED{" "}
                                    <span className="sub-total-price-value pl-1">
                                      {" "}
                                      {taxTotal}
                                    </span>
                                  </div>
                                </div>
                                <span className="pl-2">
                                  {" "}
                                  (5% of {subTotalValue})
                                </span>
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
                                        -{appliedCoupon.value}%
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
                <Col lg={3} md={4} sm={6} xs={8}>
                  <div className="button-container">
                    <button
                      className="animated-button booking-text next"
                      onClick={() => handleNextStep1()}
                    >
                      {" "}
                      <span className="button-text-span">
                        <span className="transition"></span>
                        <span className="gradient"></span>
                        <span className="label">Start Booking</span>
                      </span>
                    </button>
                  </div>
                </Col>
              </div>
            </div>
            <Modals
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              imageSrc={carImg}
              alt="Car-1"
            />
          </>
        </Container>
      </div>
    </div>
  );
};

export default VehicleDetails;

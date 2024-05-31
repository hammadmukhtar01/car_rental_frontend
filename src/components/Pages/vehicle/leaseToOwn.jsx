import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./leaseToOwn.css";
import LTOMainBannerImg from "../../images/lto-images/lto-main-banner-img.png";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import FreeConsultationForm from "../Blog/freeConsultationBlogForm";
import LTOProcessImgWeb from "../../images/lto-images/lto-process-img-web-updated.png";
import LTOProcessImgMob from "../../images/lto-images/lto-process-img-mob-updated.png";
import { Modal } from "react-bootstrap";
import InstagramFeed from "../homePage/instagramFeed";
import LeaseNowFormDetails from "./leaseNowDetailsForm";
import HeaderCombination from "../../PrivateComponents/headerCombination";
import FooterCombination from "../../PrivateComponents/footerCombination";
import { Helmet } from "react-helmet";

const LargeBanner = LTOProcessImgWeb;
const SmallBanner = LTOProcessImgMob;

const LeaseToOwnVehicles = () => {
  const [estCarPrice, setEstCarPrice] = useState("");
  const [bannerImg, setBannerImg] = useState(LargeBanner);
  const [userInteractedLTOInput, setUserInteractedLTOInput] = useState(false);
  const [isLeasingCarPriceValid, setIsLeasingCarPriceValid] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const iconsContext = require.context(
    "../../images/lto-images/lto-our-brands-all-icons",
    false,
    /\.png$/
  );
  const icons = iconsContext.keys().map((key) => iconsContext(key));

  function formatNumber(num) {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
      num
    );
  }

  useEffect(() => {
    const changeBanner = () => {
      if (window.innerWidth <= 767) {
        setBannerImg(SmallBanner);
      } else {
        setBannerImg(LargeBanner);
      }
    };

    changeBanner();

    window.addEventListener("resize", changeBanner);

    return () => {
      window.removeEventListener("resize", changeBanner);
    };
  }, []);

  useEffect(() => {
    if (userInteractedLTOInput) {
      setIsLeasingCarPriceValid(estCarPrice >= 30000);
    }
  }, [estCarPrice, userInteractedLTOInput]);

  const validateLeasingCarInput = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setEstCarPrice(value);
      setUserInteractedLTOInput(true);
    }
    setIsLeasingCarPriceValid(estCarPrice >= 30000 && userInteractedLTOInput);
  };

  const servicePackages = [
    { carValue: 50000, packagePrice: "2,500" },
    { carValue: 100000, packagePrice: "3,000" },
    { carValue: 150000, packagePrice: "3,500" },
    { carValue: 200000, packagePrice: "4,000" },
    { carValue: 250000, packagePrice: "4,500" },
    { carValue: 300000, packagePrice: "5,000" },
    { carValue: 350000, packagePrice: "5,500" },
    { carValue: 400000, packagePrice: "6,000" },
    { carValue: 450000, packagePrice: "7,500" },
    { carValue: 500000, packagePrice: "12,500" },
  ];

  const findServiceCharge = (estCarPrice) => {
    if (!estCarPrice) return "0";

    let packagePrice = "0";
    let foundPackage = false;

    for (let i = 0; i < servicePackages?.length; i++) {
      if (estCarPrice <= servicePackages[i]?.carValue) {
        packagePrice = servicePackages[i]?.packagePrice;
        foundPackage = true;
        break;
      }
    }
    if (!foundPackage) {
      packagePrice = servicePackages[servicePackages?.length - 1].packagePrice;
    }

    return packagePrice;
  };

  const serviceChargeValue =
    estCarPrice >= 30000 ? `${findServiceCharge(estCarPrice)} AED` : "0 AED";

  const durationMIN = 12;
  const durationMAX = 60;
  const durations = [
    {
      value: durationMIN,
      label: "",
    },
    {
      value: durationMAX,
      label: "",
    },
  ];

  const downPayMIN = 0;
  const downPayMAX = 80;
  const downPayment = [
    {
      value: downPayMIN,
      label: "",
    },
    {
      value: downPayMAX,
      label: "",
    },
  ];

  const [durationVal, setDurationVal] = React.useState(durationMIN);
  const handleDurationChange = (_, newValue) => {
    setDurationVal(newValue);
  };

  const [downPaymentVal, setDownPaymentVal] = React.useState(downPayMIN);
  const handleDownPaymentChange = (_, newValue) => {
    setDownPaymentVal(newValue);
  };

  const calculateLeaseToOwnPrice = (
    numOfYears,
    totalSellingPrice,
    downPaymentPercentage
  ) => {
    if (!numOfYears || !totalSellingPrice || totalSellingPrice < 30000) {
      return 0;
    }

    const downPaymentWithVAT = totalSellingPrice * downPaymentPercentage;
    console.log("DonwPayment with vat ---- ", downPaymentWithVAT);
    const downPaymentWithoutVAT = downPaymentWithVAT / 1.05;
    const leasedAmouontPerYearWithoutDownPayment =
      totalSellingPrice - downPaymentWithoutVAT;

    const financeCostPeryear =
      leasedAmouontPerYearWithoutDownPayment * 0.08 * numOfYears;

    const leastAmountFinanceCostWithoutVAT =
      leasedAmouontPerYearWithoutDownPayment + financeCostPeryear;

    const monthlyInstallmentsPriceWithoutVAT =
      leastAmountFinanceCostWithoutVAT / (12 * numOfYears);

    const premiumFullInsurancePerYearWihtoutVAT =
      totalSellingPrice * 1.1 * 0.03 * numOfYears;

    const yearlyRegisterationWithoutVAT = 2000 * numOfYears;

    const someChargesCalculation =
      (premiumFullInsurancePerYearWihtoutVAT + yearlyRegisterationWithoutVAT) *
      1.08;

    const monthlyRegisterationInsurancePriceWithoutVAT =
      someChargesCalculation / (12 * numOfYears);

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

  const calculateCarInsuranceEstimate = (estCarPrice) => {
    if (!estCarPrice || estCarPrice < 30000) {
      return "0 AED";
    }
    const insuranceEstimate = Math.round(estCarPrice * 1.1 * 0.03);
    return `${formatNumber(insuranceEstimate)} AED`;
  };

  const ltoSummaryData = [
    {
      label: "Monthly Payment",
      value:
        estCarPrice >= 30000 && durationVal
          ? `${formatNumber(
              calculateLeaseToOwnPrice(
                durationVal / 12,
                estCarPrice,
                downPaymentVal / 100
              )
            )} AED`
          : "0 AED",
    },

    {
      label: "Down payment",
      value:
        estCarPrice >= 30000
          ? `${formatNumber(
              Math.round(estCarPrice * (downPaymentVal / 100))
            )} AED`
          : "0 AED",
    },
    { label: "Duration", value: `${durationVal} months` },
    {
      label: "Car Insurance estimate p/a",
      value: calculateCarInsuranceEstimate(estCarPrice),
    },

    {
      label: "Service Charges p/a (optional)",
      value: serviceChargeValue,
    },
  ];

  const resetLeasingDetails = () => {
    handleCloseModal();
    setEstCarPrice("");
    setDurationVal(durationMIN);
    setDownPaymentVal(downPayMIN);
  };

  const handleLTOCalculatorForm = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <Helmet>
        <title>Lease To Own - Milele Car Rental </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
      </Helmet>
      <HeaderCombination />
      <div id="main" className="pb-2 bg-white">
        <section className="lto-main-banner-section mt-3">
          <div className="lto-main-banner-div">
            <div className="imgBox">
              <img
                src={LTOMainBannerImg}
                alt="abc"
                height="auto"
                width="40%"
                id="image-section"
              />
            </div>
          </div>
        </section>
        <Container>
          <section className="lto-dealing-brands mt-3">
            <div className="lto-our-brand-div">
              <div className="lto-our-brand-heading">
                <h3 className="lto-headings">OUR BRANDS</h3>
              </div>
              <div className="lto-brand-icons">
                {icons?.map((icon, index) => (
                  <img
                    key={index}
                    src={icon}
                    className="lto-single-brand-class"
                    alt={`Icon ${index}`}
                  />
                ))}
              </div>
            </div>
          </section>
          <br />
          <br />

          <section className="lto-process">
            <div className="lto-process-heading">
              <h3 className="lto-process-main-heading lto-headings">
                LEASE TO OWN PROCESS
              </h3>
            </div>
            <div className="lto-main-banner-div">
              <div className="imgBox">
                <img
                  src={bannerImg}
                  alt="abc"
                  height="auto"
                  width="40%"
                  id="image-section"
                />
              </div>
            </div>
          </section>
          <br />
          <form
            action="#"
            className="lto-calculator-form"
            onSubmit={handleLTOCalculatorForm}
          >
            <section className="lto-calculator-main-section">
              <div className="lto-calculator-main-div">
                <h3 className="lto-calculator-main-heading lto-headings">
                  LEASE TO OWN CALCULATOR
                </h3>
                <p>
                  Craft a bespoke lease to own financial plan based on the down
                  payment value, lease duration & vehicle preferences.
                </p>
                <br />
                <div className="lto-calculator-container">
                  <div className="lto-calculator-div">
                    <Row>
                      <Col className="leasing-detail-div col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">
                        <h4 className="lto-cal-leasing-detail">
                          Leasing Details
                        </h4>
                        <br />
                        <Row className="align-items-center">
                          <label htmlFor="est_CarPrice">
                            <Row>
                              <Col className="text-left">
                                <span>Estimated car price</span>
                              </Col>
                              <Col
                                className={`text-right ${
                                  !isLeasingCarPriceValid &&
                                  userInteractedLTOInput &&
                                  "text-danger"
                                }`}
                              >
                                <span>(30,000 minimum)</span>
                              </Col>
                            </Row>
                          </label>
                        </Row>

                        <div className="lto-calculator-input-group">
                          <input
                            className={`form-control-lto-input mt-2 col-12 ${
                              isLeasingCarPriceValid ? "" : "invalid-input"
                            }`}
                            id="est_CarPrice"
                            name="estCarPrice"
                            type="number"
                            min={30000}
                            autoComplete="estCarPrice"
                            required
                            placeholder="Enter Price"
                            value={estCarPrice}
                            onChange={validateLeasingCarInput}
                          />
                        </div>
                        <br />
                        <br />

                        <div className="lto-cal-detail-duration-main-div">
                          <Row className="align-items-center">
                            <Col className="text-left">
                              <span>Duration</span>{" "}
                            </Col>
                            <Col className="text-right">
                              <span>{durationVal} months</span>
                            </Col>
                          </Row>

                          <Box className="lto-calculator-duration-box">
                            <Typography
                              className="lto-cal-duration-min-month"
                              variant="body2"
                              onClick={() => setDurationVal(durationMIN)}
                              sx={{ cursor: "pointer" }}
                            >
                              {durationMIN}
                            </Typography>

                            <Slider
                              className="lto-calculator-duration-slider"
                              marks={durations}
                              step={12}
                              value={durationVal}
                              valueLabelDisplay="auto"
                              min={durationMIN}
                              max={durationMAX}
                              onChange={handleDurationChange}
                            />

                            <Typography
                              className="lto-cal-duration-max-month"
                              variant="body2"
                              onClick={() => setDurationVal(durationMAX)}
                              sx={{ cursor: "pointer" }}
                            >
                              {durationMAX}
                            </Typography>
                          </Box>
                        </div>

                        <br />
                        <br />

                        <div className="lto-cal-summary-down-payment-main-div">
                          <Row className="align-items-center">
                            <Col className="text-left">
                              <span>Down Payment</span>
                            </Col>
                            <Col className="text-right">
                              <span>{downPaymentVal}%</span>
                            </Col>
                          </Row>

                          <Box className="lto-calculator-down-payment-box">
                            <Typography
                              className="lto-cal-down-payment-min-percentage"
                              variant="body2"
                              onClick={() => setDownPaymentVal(downPayMIN)}
                              sx={{ cursor: "pointer" }}
                            >
                              {downPayMIN}%
                            </Typography>

                            <Slider
                              className="lto-calculator-down-payment-slider"
                              marks={downPayment}
                              step={10}
                              value={downPaymentVal}
                              valueLabelDisplay="auto"
                              min={downPayMIN}
                              max={downPayMAX}
                              onChange={handleDownPaymentChange}
                            />

                            <Typography
                              className="lto-cal-down-payment-max-percentage"
                              variant="body2"
                              onClick={() => setDownPaymentVal(downPayMAX)}
                              sx={{ cursor: "pointer" }}
                            >
                              {downPayMAX}%
                            </Typography>
                          </Box>
                        </div>
                      </Col>
                      <Col className="lto-own-summary col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <h4 className="lto-cal-summary-heading">
                          Lease to Own Summary
                        </h4>
                        <br />
                        {ltoSummaryData?.map((item, index) => (
                          <Row
                            key={index}
                            className="align-items-center pt-2 pb-2"
                          >
                            <Col className="text-left col-8">
                              <h5 className="lto-cal-summary-label-text">
                                {item?.label}
                              </h5>
                            </Col>
                            <Col className="lto-cal-summary-value-text text-right col-4">
                              <p>{item?.value}</p>
                            </Col>
                          </Row>
                        ))}
                        <br />
                        <button
                          type="submit"
                          className="lto-lease-now-button submit col-lg-12"
                        >
                          <h4 className="button-text"> LEASE NOW</h4>
                        </button>
                      </Col>
                    </Row>
                    <Modal
                      show={showModal}
                      onHide={handleCloseModal}
                      size="lg"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <span className="modal-heading">Car Leasing </span>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {" "}
                        <LeaseNowFormDetails
                          estCarPrice={estCarPrice}
                          durationVal={durationVal}
                          downPaymentVal={downPaymentVal}
                          resetLeasingDetails={resetLeasingDetails}
                        />{" "}
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
                </div>
              </div>
            </section>
          </form>
          <br />
          <section className="lto-testimonial-section">
            <div className="lto-testimonial-div">
              <h3 className="lto-headings">Instagram Feeds</h3>
              <InstagramFeed />
            </div>
          </section>
          <br />
          <br />
        </Container>
        <FreeConsultationForm />
      </div>
      <FooterCombination />
    </>
  );
};

export default LeaseToOwnVehicles;

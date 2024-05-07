import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainNavbar from "../navbar/mainNavbar";
import "./leaseToOwn.css";
import hyundaiIcon from "../../images/lto-images/lto-brands-icons/Hyundai.png";
import kiaIcon from "../../images/lto-images/lto-brands-icons/KIA.png";
import lexusIcon from "../../images/lto-images/lto-brands-icons/Lexus.png";
import suzukiIcon from "../../images/lto-images/lto-brands-icons/Suzuki.png";
import toyotaIcon from "../../images/lto-images/lto-brands-icons/Toyota.png";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import FreeConsultationForm from "../Blog/freeConsultationBlogForm";
// import LTOBannerImg

const LeaseToOwnVehicles = () => {
  const [estCarPrice, setEstCarPrice] = useState("");

  const carBrands = [
    { name: "hyundai", logo: hyundaiIcon, title: "Hyundai" },
    { name: "kia", logo: kiaIcon, title: "Kia" },
    { name: "lexus", logo: lexusIcon, title: "Lexus" },
    { name: "suzuki", logo: suzukiIcon, title: "Suzuki" },
    { name: "toyota", logo: toyotaIcon, title: "Toyota" },
  ];

  const servicePackages = [
    { carValue: "50,000", packagePrice: "2,500" },
    { carValue: "100,000", packagePrice: "3,000" },
    { carValue: "150,000", packagePrice: "3,500" },
    { carValue: "200,000", packagePrice: "4,000" },
    { carValue: "250,000", packagePrice: "4,500" },
    { carValue: "300,000", packagePrice: "5,000" },
    { carValue: "350,000", packagePrice: "5,500" },
    { carValue: "400,000", packagePrice: "6,000" },
    { carValue: "450,000", packagePrice: "7,500" },
    { carValue: "500,000+", packagePrice: "12,500" },
  ];

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
    const downPaymentWithVAT = totalSellingPrice * downPaymentPercentage;
    console.log("DonwPayment with vat ---- ", downPaymentWithVAT);
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

  const ltoSummaryData = [
    {
      label: "Monthly Payment",
      value: `${calculateLeaseToOwnPrice(
        durationVal / 12,
        estCarPrice,
        downPaymentVal / 100
      )} AED`,
    },
    {
      label: "Down payment",
      value: `${estCarPrice * (downPaymentVal / 100)} AED`,
    },
    { label: "Duration", value: `${durationVal} months` },
    {
      label: "Car Insurance estimate p/a",
      value: `${estCarPrice * 0.011 * 0.03} AED`,
    },
  ];

  const handleLTOCalculatorForm = () => {
    console.log("test");
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
        {/* <div className="lto-main-banner">
          <Container>
            <Row>
              <Col lg={8} md={8} sm={12} xs={12}>
                <h1>LEASE TO OWN</h1>
                <h4 className="heading-4-lto pt-3">
                  Build Your Own Leasing Plan
                </h4>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={6} className="pt-2">
                    <span>LEASE TERM</span>
                    <h5 className="heading-5-lto">1-5 YEARS</h5>
                    <span>For Any Car</span>
                  </Col>

                  <Col lg={4} md={4} sm={4} xs={6} className="pt-2">
                    <span>DOWN PAYMENT</span>
                    <h5 className="heading-5-lto">FROM 0%</h5>
                    <span>No Hidden Fees</span>
                  </Col>

                  <Col lg={4} md={4} sm={4} xs={6} className="pt-2">
                    <span>CAR HANDOVER</span>
                    <h5 className="heading-5-lto">WITHIN 4 DAYS</h5>
                    <span>After a Down Payment</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div> */}
        <br />
        <div className="section-main">
        <div className="container main-container">
          
           
            <div className="main-features">
                <div className="feature">
                    <span className="main-tip">Lease term</span>
                    <span className="feature-value">3 years</span>
                    <span className="feature-tip">For any car</span>
                </div>

                <div className="feature">
                    <span className="main-tip">Down payment</span>
                    <span className="feature-value">From 20%</span>
                    <span className="feature-tip">No hidden fees</span>
                </div>
                <div className="feature">
                    <span className="main-tip">Car handover</span>
                    <span className="feature-value">24-48 hours</span>
                    <span className="feature-tip">After a down payment</span>
                </div>
            </div>
        </div>

    </div>
        <br />
        <Container>
          <section className="lto-dealing-brands">
            <Row>
              <Col
                xl={5}
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className="dealing-brands-lto-text-col"
              >
                <h1 className="dealing-brands-lto-text">
                  BRANDS <br className="br-tag-lg-screens" /> WE DEAL IN
                </h1>
              </Col>
              <Col
                className="dealing-brands-lto-icons-container"
                xl={7}
                lg={8}
                md={8}
                sm={12}
                xs={12}
              >
                {carBrands.map((brand, index) => (
                  <div key={index} className={`car-brands-lto-div`}>
                    <img
                      src={brand.logo}
                      className="single-brand-logo-lto"
                      title={brand.title}
                      alt="Logo"
                    />
                  </div>
                ))}
              </Col>
            </Row>
          </section>
          <br />
          <br />

          <section className="lto-process">
            <div className="lto-process-heading">
              <h3 className="lto-process-main-heading">LEASE TO OWN PROCESS</h3>
            </div>
            <div className="lto-process-icons-main-div"></div>
          </section>

          <form
            action="#"
            className="signin-form"
            onSubmit={handleLTOCalculatorForm}
          >
            <section className="lto-calculator-main-section">
              <div className="lto-calculator-main-div">
                <h3 className="lto-calculator-main-heading">
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
                        <h4>Leasing Details</h4>
                        <br />
                        <Row className="align-items-center">
                          <label htmlFor="est_CarPrice">
                            <Row>
                              <Col className="text-left">
                                <span>Estimated car price</span>
                              </Col>
                              <Col className="text-right">
                                <span>(30,000 minimum)</span>
                              </Col>
                            </Row>
                          </label>
                        </Row>

                        <div className="lto-calculator-input-group">
                          <input
                            className="form-control-consultation mt-2 col-12"
                            id="est_CarPrice"
                            name="estCarPrice"
                            type="number"
                            min={30000}
                            autoComplete="estCarPrice"
                            required
                            placeholder="Enter Price"
                            value={estCarPrice}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value) && value >= 0) {
                                setEstCarPrice(value);
                              }
                            }}
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
                        {ltoSummaryData.map((item, index) => (
                          <Row
                            key={index}
                            className="align-items-center pt-2 pb-2"
                          >
                            <Col className="text-left">
                              <h5 className="lto-cal-summary-label-text">
                                {item.label}
                              </h5>
                            </Col>
                            <Col className="lto-cal-summary-value-text text-right ">
                              <p>{item.value}</p>
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
                  </div>
                </div>
              </div>
            </section>
          </form>
          <br />
          <section className="lto-service-pkg-main-section">
            <div className="ltoservice-pkg-main-div">
              <h3>SERVICE PACKAGES</h3>
              <p>
                Comprehensive packages can provide valuable financial
                protection, particularly for higher-value vehicles, enhancing
                the rental experience with peace of mind.{" "}
              </p>
              <table className="lto-service-pkg-table">
                <thead>
                  <tr>
                    <th className="lto-service-pkg-table-heading-1 col-6">
                      <h5 className="car-value-th-1">CAR VALUE</h5>
                    </th>
                    <th className="lto-service-pkg-table-heading-2 col-6">
                      <h5 className="car-value-th-2">
                        SERVICE + WARRANTY PACKAGE PRICE
                      </h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {servicePackages.map((pkg, index) => (
                    <tr key={index}>
                      <td
                        className={`lto-service-pkg-table-value service-pkg-table-value-1 col-6 ${
                          index === servicePackages.length - 1
                            ? "last-child"
                            : ""
                        }`}
                      >
                        <span className="car-value-span">{pkg.carValue}</span>{" "}
                        AED
                      </td>
                      <td
                        className={`lto-service-pkg-table-value service-pkg-table-value-2 col-6 ${
                          index === servicePackages.length - 1
                            ? "last-child"
                            : ""
                        }`}
                      >
                        <span className="service-warranty-value-span">
                          {" "}
                          {pkg.packagePrice}
                        </span>{" "}
                        AED
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <br />
          <br />
        </Container>
        <FreeConsultationForm />
      </>
    </div>
  );
};

export default LeaseToOwnVehicles;

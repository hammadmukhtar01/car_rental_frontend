import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import MainNavbar from "../navbar/mainNavbar";
import CarImg from "../../images/only-car-bg-home-banner.png";
import "./leaseToOwn.css";
import hyundaiIcon from "../../images/Brands icons/Hyundai.png";
import kiaIcon from "../../images/Brands icons/KIA.png";
import lexusIcon from "../../images/Brands icons/Lexus.png";
import suzukiIcon from "../../images/Brands icons/Suzuki.png";
import toyotaIcon from "../../images/Brands icons/Toyota.png";

const QuickLeaseVehicles = () => {
  const carBrands = [
    { name: "hyundai", logo: hyundaiIcon, title: "Hyundai" },
    { name: "kia", logo: kiaIcon, title: "Kia" },
    { name: "lexus", logo: lexusIcon, title: "Lexus" },
    { name: "suzuki", logo: suzukiIcon, title: "Suzuki" },
    { name: "toyota", logo: toyotaIcon, title: "Toyota" },
  ];
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
        <div className="lto-main-banner">
          <Container>
            <Row>
              <Col lg={8} md={8} sm={8} xs={12}>
                <h2>LEASE TO OWN</h2>
                <br />
                <h4 className="heading-4-lto">Build Your Own Leasing Plan</h4>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <span>LEASE TERM</span>
                    <h5 className="heading-5-lto">1-5 YEARS</h5>
                    <span>For Any Car</span>
                  </Col>

                  <Col lg={4} md={4} sm={4} xs={4}>
                    <span>DOWN PAYMENT</span>
                    <h5 className="heading-5-lto">FROM 0%</h5>
                    <span>No Hidden Fees</span>
                  </Col>

                  <Col lg={4} md={4} sm={4} xs={4}>
                    <span>CAR HANDOVER</span>
                    <h5 className="heading-5-lto">WITHIN 4 DAYS</h5>
                    <span>After a Down Payment</span>
                  </Col>
                </Row>
              </Col>

              <Col lg={4} md={4} sm={4} xs={4}>
                <div className="main-banner-lto-img-container">
                  <img
                    className="main-car-img-lto"
                    id="lto-car-img"
                    src={CarImg}
                    alt="lto-img"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <br />
        <br />
        <Container>
          <div className="lto-dealing-brands">
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
          </div>
          <br />
          <br />

          <div className="lto-process">
            <div className="lto-process-heading">
              <h3>LEASE TO OWN PROCESS</h3>
            </div>
            <div className="lto-process-icons-main-div">
              
            </div>
          </div>
        </Container>
      </>
    </div>
  );
};

export default QuickLeaseVehicles;

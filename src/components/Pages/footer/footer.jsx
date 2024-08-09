/* eslint-disable no-unused-vars */
import React from "react";
import "./footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaRegBell } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import Image from "react-bootstrap/Image";
import logoImage from "../../images/car-rental-logo.png";
import logoImageWebP from "../../images/car-rental-logo.webp";

import { FaMapMarkerAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { BiSolidPhone } from "react-icons/bi";
import { IoMailSharp } from "react-icons/io5";

const Footer = () => {
  const footerSubscriptionButton = (e) => {
    e.preventDefault();
    toast.dismiss();
    toast("Thank You for Subscribing Milele.", {
      duration: 2000,
      
    });
  };

  const footerContactUs = [
    {
      footerContactUsData: (
        <>
          <b className="ml-2">Main Office Address:</b> <br />{" "}
          <span className="pl-1 ">
            Showroom 11, Auto Market <br />
          </span>{" "}
          <span className="pl-1">Ras Al Khor - Dubai, UAE</span>
        </>
      ),
      IconName: FaMapMarkerAlt,
      idValue: "contact-us-location",
    },

    {
      footerContactUsData: "09:00 am - 10:00 pm",
      IconName: IoTime,
      idValue: "contact-us-working-hours",
    },
    {
      footerContactUsData: "info@milelecarrental.com",
      IconName: IoMailSharp,
      href: "mailto:info@milelecarrental.com",
      idValue: "contact-us-email",
    },
    {
      footerContactUsData: "+971 54 451 9432",
      IconName: BiSolidPhone,
      href: "tel:+971544519432",
      idValue: "contact-us-phone-number",
    },
  ];

  const footerInformation = [
    {
      headingName: "Find a Car for Rent in the Nearest Location?",
      hrefLink: "/vehicles",
    },

    {
      headingName: "Cars Catalog",
      hrefLink: "/vehicles",
    },
    {
      headingName: "FAQ",
      hrefLink: "/faqs",
    },

    {
      headingName: "About Us",
      hrefLink: "/aboutus",
    },

    {
      headingName: "Contact Us",
      hrefLink: "/contactus",
    },

    {
      headingName: "Privacy Policy",
      hrefLink: "/terms&Conditions",
    },
  ];

  return (
    <div>
      <footer id="footer">
        <div className="footer-main-container pt-5 pb-5">
          <Container>
            <div className="footer-data-container">
              <Row>
                <Col
                  lg={4}
                  md={6}
                  sm={12}
                  xs={12}
                  className="footer-milele-text-col"
                >
                  <Row className="footer-heading-row align-items-end">
                    <div className="toggle-main-logo">
                      <a href="/">
                        <picture>
                          <source srcSet={logoImageWebP} type="image/webp" />
                          <source srcSet={logoImage} type="image/png" />
                          <Image
                            src={logoImage}
                            title="Milele Car Rental"
                            alt="Main Logo lg"
                            id="Milele Car Rental Footer Logo"
                            fluid
                          />
                        </picture>
                      </a>
                    </div>
                  </Row>

                  <Row className="footer-data-row">
                    <div className="footer-info-data">
                      <p className="footer-info-paragraph">
                        We strive to offer clients affordable short term and
                        long term rental solutions, which takes away all the
                        administrative hassles. No matter if you are a small or
                        medium-sized business, or an individual looking for a
                        personal vehicle. We provide efficient solutions that
                        are both flexible and customizable at a cost-effective
                        price.
                      </p>
                    </div>
                  </Row>
                </Col>

                <Col
                  lg={4}
                  md={6}
                  sm={12}
                  xs={12}
                  className="footer-milele-text-col"
                >
                  <Row className="footer-heading-row align-items-end">
                    <h2 className="footer-heading">Contact Us</h2>
                  </Row>

                  <Row className="footer-data-row">
                    <div className="footer-info-data">
                      {footerContactUs.map((footerContactUsList, index) => (
                        <div
                          className="footer-info-list pt-2 pb-2"
                          key={index}
                          id={`${footerContactUsList?.idValue}`}
                        >
                          <span>
                            {" "}
                            <strong>
                              {" "}
                              <footerContactUsList.IconName />{" "}
                            </strong>{" "}
                            {footerContactUsList.href ? (
                              <a
                                href={footerContactUsList.href}
                                title={footerContactUsList.footerContactUsData}
                              >
                                {footerContactUsList.footerContactUsData}
                              </a>
                            ) : (
                              footerContactUsList.footerContactUsData
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Row>
                </Col>

                <Col
                  lg={4}
                  md={6}
                  sm={12}
                  xs={12}
                  className="footer-information-text-col"
                >
                  <Row className="footer-heading-row align-items-end">
                    <h2 className="footer-heading">Information</h2>
                  </Row>
                  <Row className="footer-data-row">
                    <div className="footer-info-data">
                      {footerInformation.map((footerInfoList, index) => (
                        <div className="footer-info-list pt-2 pb-2" key={index}>
                          <a
                            href={footerInfoList?.hrefLink}
                            title={`${footerInfoList?.headingName} info`}
                          >
                            <span>
                              {" "}
                              <strong>{">"}</strong>{" "}
                              {footerInfoList?.headingName}{" "}
                            </span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

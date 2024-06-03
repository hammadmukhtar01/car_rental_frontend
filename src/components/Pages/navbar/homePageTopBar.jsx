import React from "react";
import { BiSolidPhone } from "react-icons/bi";
import { IoMailSharp } from "react-icons/io5";
import { FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
// import Tooltip from "@mui/material/Tooltip";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";

const HomePageTopBar = () => {
  const phoneNumber = "+971563298330";
  const email = "info@milelecarrental.com";

  return (
    <>
      <div className="top-bar-without-container">
        <Container>
          <div className="top-page-horizontal-line">
            <Row className="top-bar-row-div">
              <Col className="left-content col-lg-6 col pl-4">
                <a
                  href={`mailto:${email}`}
                  title="email"
                  className="top-contact-button top-email-link"
                >
                  <IoMailSharp />
                  <span>{email}</span>
                </a>
                <a
                  href={`tel:${phoneNumber}`}
                  title="phone number"
                  className="top-contact-button top-phone-call-link"
                >
                  <BiSolidPhone />
                  <span>{phoneNumber}</span>
                </a>
              </Col>

              <Col className="right-content col-lg-6 col text-right">
                <a
                  href="https://www.facebook.com/milelecarrental/"
                  title=" Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="social-media-icons-top-bar" />
                </a>
                <a
                  href="https://www.instagram.com/milelecarrentals/"
                  title=" Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="social-media-icons-top-bar" />
                </a>
                <a
                  href="https://twitter.com/milelecarrental"
                  title=" Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsTwitterX className="social-media-icons-top-bar" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCGZsbfATcMxEBbz1PWAKt0A"
                  title=" YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="social-media-icons-top-bar" />
                </a>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePageTopBar;

import React from "react";
import { BiSolidPhone } from "react-icons/bi";
import { IoMailSharp } from "react-icons/io5";
import { FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";

const HomePageTopBar = () => {
  const phoneNumber = "+971544519432";
  const email = "info@milelecarrental.com";

  return (
    <>
      <div className="top-bar-without-container">
        <Container>
          <div className="top-page-horizontal-line">
            <Row className="justify-content-center">
              <Col className="left-content col-lg-6 col pl-4">
                <Tooltip title="email us">
                  <a
                    href={`mailto:${email}`}
                    className="top-contact-button top-email-link"
                  >
                    <IoMailSharp />
                    <span>{email}</span>
                  </a>
                </Tooltip>
                <Tooltip title="call us">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="top-contact-button top-phone-call-link"
                  >
                    <BiSolidPhone />
                    <span>{phoneNumber}</span>
                  </a>
                </Tooltip>
              </Col>

              <Col className="right-content col-lg-6 col text-right">
                <Tooltip title="Facebook">
                  <a
                    href="https://www.facebook.com/milelecarrental/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF className="social-media-icons-top-bar" />
                  </a>
                </Tooltip>
                <Tooltip title="Instagram">
                  <a
                    href="https://www.instagram.com/milelecarrentals/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="social-media-icons-top-bar" />
                  </a>
                </Tooltip>
                <Tooltip title="Twitter">
                  <a
                    href="https://twitter.com/milelecarrental"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsTwitterX className="social-media-icons-top-bar" />
                  </a>
                </Tooltip>
                <Tooltip title="YouTube">
                  <a
                    href="https://www.youtube.com/channel/UCGZsbfATcMxEBbz1PWAKt0A"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube className="social-media-icons-top-bar" />
                  </a>
                </Tooltip>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePageTopBar;

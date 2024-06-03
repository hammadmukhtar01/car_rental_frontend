import React from "react";
import {
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaLinkedin,
  FaPinterest,
  FaSnapchat,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
// import Tooltip from "@mui/material/Tooltip";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";

const HomePageBottomBar = () => {
  return (
    <>
      <div className="bottom-bar-without-container">
        <Container>
          <div className="bottom-home-page-horizontal-line">
            <Row className="justify-content-center">
              <Col lg={6} xs={12} className="left-content text-lg-left">
                <div className="pl-2">
                  <h3>
                    <span className="bottom-bar-copyright-text text-white">
                      Copyright &copy; 2024. Milele Car rental All Rights
                      Reserved
                    </span>
                  </h3>
                </div>
              </Col>

              <Col
                xs={12}
                lg={6}
                className="right-content text-center text-lg-right"
              >
                <a
                  href="https://www.facebook.com/milelecarrental/"
                  title="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="social-media-icons-top-bar" />
                </a>
                <a
                  href="https://www.instagram.com/milelecarrentals/"
                  title="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="social-media-icons-top-bar" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCGZsbfATcMxEBbz1PWAKt0A"
                  title="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="social-media-icons-top-bar" />
                </a>
                <a
                  href="https://www.tiktok.com/@milelecarrental"
                  title="Tiktok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok className="social-media-icons-top-bar" />
                </a>
                <a
                  href="https://www.linkedin.com/company/99998565/admin/feed/posts/"
                  title="Linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="social-media-icons-top-bar" />
                </a>
                <a
                  href="https://twitter.com/milelecarrental"
                  title="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsTwitterX className="social-media-icons-top-bar" />
                </a>
                <a
                  href="https://www.pinterest.com/MileleCarRental/"
                  title="Pinterest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaPinterest className="social-media-icons-top-bar" />
                </a>
                <a
                  href="https://www.snapchat.com/add/milelecarrental"
                  title="Snapchat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSnapchat className="social-media-icons-top-bar" />
                </a>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePageBottomBar;

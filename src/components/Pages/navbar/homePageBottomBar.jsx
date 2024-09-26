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
  const socialMediaLinks = [
    {
      href: "https://www.facebook.com/milelecarrental/",
      title: "Facebook",
      icon: FaFacebookF,
    },
    {
      href: "https://www.instagram.com/milelecarrentals/",
      title: "Instagram",
      icon: FaInstagram,
    },
    {
      href: "https://www.youtube.com/channel/UCGZsbfATcMxEBbz1PWAKt0A",
      title: "YouTube",
      icon: FaYoutube,
    },
    {
      href: "https://www.tiktok.com/@milelecarrental",
      title: "Tiktok",
      icon: FaTiktok,
    },
    {
      href: "https://www.linkedin.com/company/99998565/admin/feed/posts/",
      title: "Linkedin",
      icon: FaLinkedin,
    },
    {
      href: "https://twitter.com/milelecarrental",
      title: "Twitter",
      icon: BsTwitterX,
    },
    {
      href: "https://www.pinterest.com/MileleCarRental/",
      title: "Pinterest",
      icon: FaPinterest,
    },
    {
      href: "https://www.snapchat.com/add/milelecarrental",
      title: "Snapchat",
      icon: FaSnapchat,
    },
  ];

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
                {socialMediaLinks.map(({ href, title, icon: Icon }, index) => (
                  <a
                    key={index}
                    href={href}
                    title={title}
                    target="_blank"
                    id={`${title} icon`}
                    rel="noopener noreferrer"
                  >
                    <Icon className="social-media-icons-top-bar" />
                  </a>
                ))}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePageBottomBar;

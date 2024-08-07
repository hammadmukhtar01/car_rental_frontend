/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Coloredlogo from "../../images/car-rental-logo.png";
import ColoredlogoWebP from "../../images/car-rental-logo.webp";
import { Col, Row } from "react-bootstrap";
import "./navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";
import { Modal as BootstrapModal } from "react-bootstrap";
import LoginSignupPage from "../../authentication/loginSignupPage";
import ForgotPasswordPage from "../../authentication/forgotPassword";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4,
};

function MainNavbar() {
  const [isHomePage, setIsHomePage] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const toggleOffCanvas = () => setShowOffCanvas(!showOffCanvas);
  const theme = useTheme();
  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [openMuiModal, setOpenMuiModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = JSON.parse(localStorage?.getItem("user"));
  const authStatus = auth?.status;
  const authToken = auth?.token;
  const user_info = auth?.data;
  const userAuthId = user_info?._id;

  useEffect(() => {
    setIsHomePage(location?.pathname === "/");
  }, [location?.pathname]);

  const isExactHomePage = location?.pathname === "/";

  // const logoImage = isExactHomePage ? Whitelogo : Coloredlogo;
  const logoImage = Coloredlogo;
  const logoImageWebP = ColoredlogoWebP;
  useEffect(() => {
    if (location.pathname) {
      localStorage.setItem("lastUrl", `${location.pathname}${location.search}`);
    }
  }, [navigate, location.pathname, location.search]);

  const handleConfirmLogout = () => {
    setOpenMuiModal(false);
    localStorage?.removeItem("user");
    const lastUrl = localStorage.getItem("lastUrl") || "/";
    window.location.reload();
    console.log("lastUrl : ", lastUrl);
    navigate(lastUrl);
  };

  const handleOpenMuiModal = () => {
    setOpenMuiModal(true);
  };

  const handleCloseMuiModal = () => {
    setOpenMuiModal(false);
  };

  const handleCloseModal = () => {
    setShowLoginSignupModal(false);
    setShowForgotPasswordModal(false);
  };

  const handleLoginSignupFunc = () => {
    setShowLoginSignupModal(true);
    setShowOffCanvas(false);
  };

  const handleForgotPasswordClick = () => {
    setShowLoginSignupModal(false);
    setShowForgotPasswordModal(true);
  };

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  return (
    <>
      <Container>
        <nav className="navbar navbar-expand-lg navbar-light p-0 mt-2">
          <Col lg={2} md={3} xs={6}>
            <a
              href="/"
              title="home page"
              onClick={() => setShowOffCanvas(false)}
              id="navbar-logo-to-home-page-lg"
            >
              <picture>
                <source srcSet={ColoredlogoWebP} type="image/webp" />
                <source srcSet={Coloredlogo} type="image/png" />
                <Image
                  src={Coloredlogo}
                  title="Milele Car Rental"
                  alt="Main Logo lg"
                  fluid
                />
              </picture>
            </a>
          </Col>
          <Col xs={9} style={{ display: "contents" }}>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleOffCanvas}
              aria-controls="offcanvasNavbar"
              aria-label="Toggle Menu Bar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`offcanvas offcanvas-end ${
                showOffCanvas ? "show" : ""
              }`}
              id="offcanvasNavbar"
            >
              <div className="offcanvas-header">
                <div className="toggle-main-logo">
                  <a
                    href="/"
                    title="home page"
                    id="navbar-logo-to-home-page-sm"
                    onClick={() => setShowOffCanvas(false)}
                  >
                    <Image
                      // src={logoImage}
                      src={Coloredlogo}
                      title="Milele Car Rental"
                      alt="Main Logo Sm"
                      fluid
                    />
                  </a>
                </div>
                <button
                  type="button"
                  className="btn-close text-reset"
                  aria-label="Toggle Menu Bar"
                  onClick={() => setShowOffCanvas(false)}
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul
                  className={`navbar-nav ml-auto ${
                    isHomePage ? "navbar-white" : "navbar-black"
                  }`}
                >
                  <li className="nav-item">
                    <a
                      href="/"
                      title="home page"
                      className={`navbar-all-menus nav-link ${
                        location.pathname === "/" ? "active" : ""
                      }`}
                      onClick={() => setShowOffCanvas(false)}
                      id="home-page-url"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/vehicles"
                      title="fleet page"
                      className={`navbar-all-menus nav-link ${
                        location.pathname === "/vehicles" ? "active" : ""
                      }`}
                      onClick={() => setShowOffCanvas(false)}
                      id="fleet-page-url"
                    >
                      Fleet
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/aboutus"
                      title="about us page"
                      className={`navbar-all-menus nav-link ${
                        location.pathname === "/aboutus" ? "active" : ""
                      }`}
                      onClick={() => setShowOffCanvas(false)}
                      id="about-us-page-url"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/terms&Conditions"
                      title="terms & Conditions page"
                      className={`navbar-all-menus nav-link ${
                        location.pathname === "/terms&Conditions"
                          ? "active"
                          : ""
                      }`}
                      onClick={() => setShowOffCanvas(false)}
                      id="terms-and-conditions-page-url"
                    >
                      T&Cs
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/contactus"
                      title="contact us page"
                      className={`navbar-all-menus nav-link ${
                        location.pathname === "/contactus" ? "active" : ""
                      }`}
                      onClick={() => setShowOffCanvas(false)}
                      id="contact-us-page-url"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/faqs"
                      title="Frequently Asked Questions"
                      className={`navbar-all-menus nav-link ${
                        location.pathname === "/faqs" ? "active" : ""
                      }`}
                      onClick={() => setShowOffCanvas(false)}
                      id="faqs-page-url"
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
                {auth && authStatus === "success" ? (
                  <>
                    <div className="nav-item d-flex align-items-center user-name-icon-div">
                      <FaUserCircle className="fa-user-circle" />

                      <NavDropdown title={`${user_info?.fName}`} className=" ">
                        <NavDropdown.Item
                          as={NavLink}
                          to={`/myProfile/${userAuthId}`}
                          // to={"/#1"}
                        >
                          My Profile
                        </NavDropdown.Item>

                        <NavDropdown.Item
                          as={NavLink}
                          to={`/myBookings/${userAuthId}`}
                        >
                          My Bookings
                        </NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/updatePassword">
                          Update Password
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleOpenMuiModal}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="login-signup-button">
                      <span
                        // href="/login"
                        title="Login Sign Up"
                        className="navbar-all-menus nav-link login-signup-button"
                        onClick={handleLoginSignupFunc}
                        id="login-signup-url"
                      >
                        <b className="signup-menu">Login | Sign Up</b>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Col>
        </nav>
      </Container>
      <style>{`
        .offcanvas {
          visibility: hidden;
          background-color: white;
          transition: visibility 0.3s, transform 0.3s;
          transform: translateX(-100%);
        }
        .offcanvas.show {
          visibility: visible;
          transform: translateX(0);
        }
      `}</style>

      <Modal
        keepMounted
        open={openMuiModal}
        onClose={handleCloseMuiModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="p" sx={{ mb: 3 }}>
            Are you sure you want to log out?
            {/* </Typography> */}
            <Row className="d-flex justify-content-end pt-4">
              <Col></Col>
              <Col className="d-flex">
                <button
                  className="btn btn-secondary cancel-logout-button"
                  onClick={handleCloseMuiModal}
                  aria-label="Close Authentication Modal"
                >
                  Cancel
                </button>

                <button
                  className="btn btn-secondary success-logout-button ml-3"
                  onClick={handleConfirmLogout}
                  aria-label="Close Authentication Modal"
                >
                  Logout
                </button>
              </Col>
            </Row>
          </Typography>
        </Box>
      </Modal>

      <BootstrapModal
        show={showLoginSignupModal}
        onHide={handleCloseModal}
        size="xl"
        centered
      >
        <BootstrapModal.Body className="login-signup-modal">
          {" "}
          <LoginSignupPage
            onCloseModal={handleCloseModal}
            onForgotPasswordClick={handleForgotPasswordClick}
          />{" "}
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleCloseModal}
            aria-label="Close Authentication Modal"
          >
            Close
          </button>
        </BootstrapModal.Footer>
      </BootstrapModal>

      <BootstrapModal
        show={showForgotPasswordModal}
        onHide={handleCloseForgotPasswordModal}
        size="xl"
        centered
      >
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>Forgot Password</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          <ForgotPasswordPage onClose={handleCloseForgotPasswordModal} />
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleCloseForgotPasswordModal}
            aria-label="Close Authentication Modal"
          >
            Close
          </button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
}

export default MainNavbar;

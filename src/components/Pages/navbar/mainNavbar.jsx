/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Coloredlogo from "../../images/car-rental-logo.png";
import { Col } from "react-bootstrap";
import "./navbar.css";
import { FaUserCircle } from "react-icons/fa";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Modal } from "react-bootstrap";
import SignupPage from "../../authentication/signupPage";
import LoginPage from "./../../authentication/loginPage";

function MainNavbar() {
  const [isHomePage, setIsHomePage] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const toggleOffCanvas = () => setShowOffCanvas(!showOffCanvas);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
  useEffect(() => {
    if (location.pathname) {
      localStorage.setItem("lastUrl", `${location.pathname}${location.search}`);
    }
  }, [navigate, location.pathname, location.search]);

  const handleLogout = () => {
    setOpen(true);
  };

  const handleConfirmLogout = () => {
    localStorage?.removeItem("user");
    setTimeout(() => {
      window.location.reload();
    }, 100);
    const lastUrl = localStorage.getItem("lastUrl") || "/";
    console.log("lastUrl : ", lastUrl);
    navigate(lastUrl);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLoginSignupFunc = () => {
    // e.preventDefault();
    setShowModal(true);
    setShowOffCanvas(false);
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
              <Image
                src={Coloredlogo}
                title="Milele Car Rental"
                alt="Main Logo lg"
                fluid
              />
            </a>
          </Col>
          <Col xs={9} style={{ display: "contents" }}>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleOffCanvas}
              aria-controls="offcanvasNavbar"
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

                  {auth && authStatus === "success" ? (
                    <>
                      <div className="nav-item d-flex align-items-center user-name-icon-div">
                        <FaUserCircle className="fa-user-circle" />

                        <NavDropdown
                          title={`${user_info?.fName}`}
                          className=" "
                        >
                          <NavDropdown.Item
                            as={NavLink}
                            to={`/myProfile/${userAuthId}`}
                          >
                            My Profile
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            as={NavLink}
                            to={`/myBookings/${userAuthId}`}
                          >
                            My Bookings
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            as={NavLink}
                            to={`/myBookings/${userAuthId}`}
                          >
                            Update Password
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item onClick={handleLogout}>
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
                </ul>
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

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Logout Confirmation!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout}>Logout</Button>
        </DialogActions>
      </Dialog>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="modal-heading">
              <strong>Authentication:</strong>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <LoginPage onCloseModal={handleCloseModal} />
          {/* <SignupPage onCloseModal={handleCloseModal} /> */}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MainNavbar;

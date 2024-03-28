import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import Whitelogo from "../../images/car_rental_logo_old.png";
import Coloredlogo from "../../images/car_rental_logo.png";
import { Col } from "react-bootstrap";

function OffcanvasExample() {
  const [isHomePage, setIsHomePage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("user"));
  const authStatusCode = auth?.statusText;
  const user_info = auth?.data;
  const userName = user_info?.result?.userName;

  console.log("Auth in local storage is --: ", auth);

  useEffect(() => {
    setIsHomePage(location.pathname === "/home" || location.pathname === "/");
    console.log("hevyevfyevfuevfuevfuevfuevfuevfuevfuevf");
  }, [location.pathname]);

  const isExactHomePage =
    location.pathname === "/home" || location.pathname === "/";

  const logoImage = isExactHomePage ? Whitelogo : Coloredlogo;

  console.log("isHomePage:", isHomePage);
  console.log("isExactHomePage:", isExactHomePage);
  console.log("logoImage:", logoImage);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      setTimeout(() => {
        window.location.reload();
      }, 100);
      navigate("/home");
    }
  };

  return (
    <>
      <Container className="">
        <Navbar key={"lg"} expand={"lg"} className={`p-0 `}>
          <Col lg={2} md={3} xs={6}>
            <Navbar.Brand>
              <div className="main-logo">
                <a href="/home">
                  <Image
                    // src={`${isHomePage ? Whitelogo : Coloredlogo}`}
                    src={logoImage}
                    alt="Main Logo"
                    fluid
                  />
                </a>
              </div>
            </Navbar.Brand>
          </Col>
          {/* Right Side */}
          <Col xs={9} style={{ display: "contents" }}>
            <Navbar.Toggle
              className="hidden-toggle-button"
              aria-controls="responsive-navbar-nav"
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Navbar.Brand>
                  <div className="toggle-main-logo">
                    <a href="/home">
                      <Image
                        // src={`${isHomePage ? Whitelogo : Coloredlogo}`}
                        src={logoImage}
                        alt="Main Logo"
                        fluid
                      />
                    </a>
                  </div>
                </Navbar.Brand>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  className={`justify-content-end flex-grow-1 ${
                    isHomePage ? "navbar-white" : "navbar-black"
                  }`}
                >
                  <Nav.Link
                    as={NavLink}
                    to="/home"
                    className={`navbar-all-menus ${
                      location.pathname === "/home"
                        ? "active"
                        : "" || location.pathname === "/"
                        ? "active"
                        : ""
                    }`}
                    activeclassname="active"
                  >
                    Home
                  </Nav.Link>
                  {/* <NavDropdown
                    title="Vehicles"
                    id={`offcanvasNavbarDropdown-expand-lg`}
                    className={`navbar-dropdown-title ${
                      isVehiclesPage ? "active" : ""
                    }`}
                  >
                    <NavDropdown.Item
                      href="/vehicles"
                      className={`navbar-sub-menus ${
                        location.pathname.includes("/vehicles") ? "active" : ""
                      }`}
                    >
                      For Rent
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href="/leaseToOwn"
                      className={`navbar-sub-menus ${
                        location.pathname.includes("/leaseToOwn")
                          ? "active"
                          : ""
                      }`}
                    >
                      For Lease
                    </NavDropdown.Item>
                  </NavDropdown> */}
                  <Nav.Link
                    as={NavLink}
                    to="/vehicles"
                    className={`navbar-all-menus ${
                      location.pathname === "/vehicles" ? "active" : ""
                    }`}
                    activeclassname="active"
                  >
                    Fleet
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/aboutus"
                    className={`navbar-all-menus ${
                      location.pathname === "/aboutus" ? "active" : ""
                    }`}
                    activeclassname="active"
                  >
                    About Us
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/terms&Conditions"
                    className={`navbar-all-menus ${
                      location.pathname === "/terms&Conditions" ? "active" : ""
                    }`}
                    activeclassname="active"
                  >
                    T&Cs
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/leaseToOwn"
                    className={`navbar-all-menus ${
                      location.pathname === "/leaseToOwn" ? "active" : ""
                    }`}
                    activeclassname="active"
                  >
                    LTO
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/contactus"
                    className={`navbar-all-menus ${
                      location.pathname === "/contactus" ? "active" : ""
                    }`}
                    activeclassname="active"
                  >
                    Contact Us
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/faqs"
                    className={`navbar-all-menus ${
                      location.pathname === "/faqs" ? "active" : ""
                    }`}
                    activeclassname="active"
                  >
                    FAQs
                  </Nav.Link>
                </Nav>
                {auth && authStatusCode === "OK" ? (
                  <>
                    <Nav.Link disabled className="welcome-text">
                      Welcome, {auth?.data?.result?.userName?.slice(0, 6)}
                    </Nav.Link>

                    <NavDropdown title="User" id="user-nav-dropdown">
                      <NavDropdown.Item
                        as={NavLink}
                        to={`/myProfile/${userName}`}
                      >
                        My Profile
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        as={NavLink}
                        to={`/myBookings/${userName}`}
                      >
                        My Bookings
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Nav.Link
                      as={NavLink}
                      to="/login"
                      className="auth-menu"
                      activeclassname="active"
                    >
                      <b className="login-menu">Login</b>
                    </Nav.Link>

                    <Nav.Link
                      as={NavLink}
                      to="/signup"
                      className="auth-menu"
                      activeclassname="active"
                    >
                      <b className="signup-menu">Sign Up</b>
                    </Nav.Link>
                  </>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Col>
        </Navbar>
      </Container>
    </>
  );
}

export default OffcanvasExample;

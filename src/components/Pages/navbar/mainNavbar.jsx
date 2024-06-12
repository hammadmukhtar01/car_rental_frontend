/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import Coloredlogo from "../../images/car-rental-logo.png";
import { Col } from "react-bootstrap";
import "./navbar.css";

function MainNavbar() {
  const [isHomePage, setIsHomePage] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const toggleOffCanvas = () => setShowOffCanvas(!showOffCanvas);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = JSON.parse(localStorage?.getItem("user"));
  const authStatusCode = auth?.statusText;
  const user_info = auth?.data;
  const userName = user_info?.result?.userName;

  useEffect(() => {
    setIsHomePage(location?.pathname === "/");
  }, [location?.pathname]);

  // useEffect(() => {
  //   const handleNavLinkClick = (event) => {
  //     const id = event.target.id;
  //     if (typeof window.gtag === "function") {
  //       window.gtag("event", "click", {
  //         event_category: "Navigation",
  //         event_label: `Clicked on ${id}`,
  //         event_action: "click",
  //         event_id: id,
  //       });
  //     }
  //   };

  //   const navLinks = document.querySelectorAll("a.navbar-all-menus nav-link");
  //   navLinks.forEach((link) => {
  //     link.addEventListener("click", handleNavLinkClick);
  //   });

  //   return () => {
  //     navLinks.forEach((link) => {
  //       link.removeEventListener("click", handleNavLinkClick);
  //     });
  //   };
  // }, []);

  const isExactHomePage = location?.pathname === "/";

  // const logoImage = isExactHomePage ? Whitelogo : Coloredlogo;
  const logoImage = Coloredlogo;

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage?.removeItem("user");
      setTimeout(() => {
        window.location.reload();
      }, 100);
      navigate("/");
    }
  };

  return (
    <>
      <Container>
        <nav className="navbar navbar-expand-lg navbar-light p-0 mt-3">
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
                </ul>
              </div>
            </div>
          </Col>
        </nav>
      </Container>
      <style jsx>{`
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
    </>
  );
}

export default MainNavbar;

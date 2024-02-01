import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import Image from "react-bootstrap/Image";
import logo from "../../images/car_rental_logo_old.png";
import { useReload } from "../../PrivateComponents/utils";
import HashLoader from "react-spinners/ClipLoader";
import "./navbar.css";

function MainNavbar() {
  const { loading, reloadPage } = useReload();
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const user_info = JSON.parse(auth);
  const customer_Id = user_info?.data?._id;

  // console.log("Auth in local storage is: ", user_info);

  const handleLogout = () => {
    localStorage.removeItem("user");
    reloadPage();
    navigate(`/`);
  };

  const handleReload = () => {
    console.log("Reloading...");
    reloadPage();
  };

  const navbarMenus = [
    {
      menuName: "Home",
      navigateTo: "/",
    },
    {
      menuName: "Vehicles",
      navigateTo: "/vehicles",
    },
    {
      menuName: "About Us",
      navigateTo: "/aboutus",
    },
    {
      menuName: "FAQs",
      navigateTo: "/faqs",
    },
    {
      menuName: "Contact Us",
      navigateTo: "/contactus",
    },
  ];

  const renderSeparator = (index, length) => {
    if (index < length - 1) {
      if (window.innerWidth >= 768) {
        return (
          <span className="vertical-line d-flex flex-row align-items-center">
            |
          </span>
        );
      } else {
        return (
          <span className="horizontal-line d-flex flex-row align-items-center"></span>
        );
      }
    }
    return null;
  };

  return (
    <>
      <div className="navabr-main-container container">
        <Navbar
          collapseOnSelect
          expand="lg"
          className={`p-0 ${loading ? "hidden" : ""}`}
        >
          <div className="d-flex align-items-center col-lg-2 col-sm-10">
            <Navbar.Brand>
              <div className="main-logo">
                <a href="/home">
                  <Image src={logo} alt="Main Logo" fluid />
                </a>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle
              className="hidden-toggle-button"
              aria-controls="responsive-navbar-nav"
            />
          </div>

          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="col-lg-10 col-md-10 navbar-menus-main-container"
          >
            <Nav className=" d-flex align-items-center">
              {navbarMenus.map((navbarMenu, index) => (
                <React.Fragment key={index}>
                  <Nav.Link
                    as={NavLink}
                    to={navbarMenu.navigateTo}
                    activeclassname="active"
                    className="navbar-all-menus"
                    key={index}
                    onClick={handleReload}
                  >
                    {navbarMenu.menuName}
                  </Nav.Link>

                  {renderSeparator(index, navbarMenus.length)}
                </React.Fragment>
              ))}
              {renderSeparator(1, navbarMenus.length)}

              {user_info && user_info.status === "success" ? (
                <>
                  <Nav.Link disabled className="welcome-text">
                    Welcome, {user_info.data.name.slice(0, 6)}
                  </Nav.Link>

                  <NavDropdown title="User" id="user-nav-dropdown">
                    <NavDropdown.Item
                      as={NavLink}
                      to={`/myProfile/${customer_Id}`}
                    >
                      My Profile
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      as={NavLink}
                      to={`/myBookings/${customer_Id}`}
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
                    activeclassname="active"
                    className=""
                  >
                    <b className="login-menu">Login</b>
                  </Nav.Link>
                  {renderSeparator(1, navbarMenus.length)}

                  <Nav.Link
                    as={NavLink}
                    to="/signup"
                    activeclassname="active"
                    className=""
                  >
                    <b className="signup-menu">Sign Up</b>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default MainNavbar;

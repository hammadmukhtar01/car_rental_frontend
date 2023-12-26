import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";

function CollapsibleExample() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const user_info = JSON.parse(auth);
  const customer_Id = user_info.data._id

  console.log("Auth in local storage is: ", user_info);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate(`/`);
  };

  const navbarMenus = [
    {
      menuName: "Home",
      navigateTo: "/",
    },
    {
      menuName: "Vehicles",
      navigateTo: "/vehicles"
    },
    {
      menuName: "About Us",
      navigateTo: "/aboutus"
    },
    {
      menuName: "FAQs",
      navigateTo: "/faqs"
    },
    {
      menuName: "Contact Us",
      navigateTo: "/contactus"
    }
  ]

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary p-0">
      <Container className="navabr-main-container">
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="main-nav-menus col-lg-9">
           {navbarMenus.map((navbarMenu, index) => (
             <Nav.Link as={NavLink} to={navbarMenu.navigateTo} activeclassname="active" className="navbar-all-menus" key={index}>
             {navbarMenu.menuName}
           </Nav.Link>
           )

           )}
          </Nav>
          <Nav className="col-lg-3">
            {user_info && user_info.status === "success" ? (
              <>
                <Nav.Link disabled className="welcome-text">
                  Welcome, {user_info.data.name.slice(0, 6)}
                </Nav.Link>
              
                <NavDropdown
                  title="User"
                  id="user-nav-dropdown"
                >
                  <NavDropdown.Item as={NavLink} to={`/myProfile/${customer_Id}`}>My Profile</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to={`/myBookings/${customer_Id}`}>My Bookings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" activeclassname="active" className="navbar-all-menus">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signup" activeclassname="active" className="navbar-all-menus">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;

/* eslint-disable jsx-a11y/anchor-is-valid */
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

// function MainNavbar() {
//   const [isHomePage, setIsHomePage] = useState(false);
//   const [showOffCanvas, setShowOffCanvas] = useState(false);
//   const toggleOffCanvas = () => setShowOffCanvas(!showOffCanvas);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const auth = JSON.parse(localStorage?.getItem("user"));
//   const authStatusCode = auth?.statusText;
//   const user_info = auth?.data;
//   const userName = user_info?.result?.userName;

//   useEffect(() => {
//     setIsHomePage(location?.pathname === "/");
//   }, [location?.pathname]);

//   useEffect(() => {
//     setIsHomePage(location?.pathname === "/");
//   }, [location?.pathname]);

//   useEffect(() => {
//     const handleNavLinkClick = (event) => {
//       const id = event.target.id;
//       if (typeof window.gtag === 'function') {
//         window.gtag('event', 'click', {
//           event_category: 'Navigation',
//           event_label: `Clicked on ${id}`,
//           event_action: 'click',
//           event_id: id,
//         });
//       }
//     };

//     const navLinks = document.querySelectorAll('a.nav-link');
//     navLinks.forEach(link => {
//       link.addEventListener('click', handleNavLinkClick);
//     });

//     return () => {
//       navLinks.forEach(link => {
//         link.removeEventListener('click', handleNavLinkClick);
//       });
//     };
//   }, []);

//   const isExactHomePage = location?.pathname === "/";

//   // const logoImage = isExactHomePage ? Whitelogo : Coloredlogo;
//   const logoImage = Coloredlogo;

//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to log out?");
//     if (confirmLogout) {
//       localStorage?.removeItem("user");
//       setTimeout(() => {
//         window.location.reload();
//       }, 100);
//       navigate("/");
//     }
//   };

//   return (
//     <>
//       <Container>
//         <Navbar key={"lg"} expand={"lg"} className={`p-0 `}>
//           <Col lg={2} md={3} xs={6}>
//             <Navbar.Brand>
//               <div className="main-logo">
//                 <a
//                   href="/"
//                   title="home page"
//                   onClick={() => setShowOffCanvas(false)}
//                   id="navbar-logo-to-home-page-lg"
//                 >
//                   <Image
//                     // src={`${isHomePage ? Whitelogo : Coloredlogo}`}
//                     src={logoImage}
//                     title="Milele Car Rental"
//                     alt="Main Logo lg"
//                     fluid
//                   />
//                 </a>
//               </div>
//             </Navbar.Brand>
//           </Col>
//           {/* Right Side */}
//           <Col xs={9} style={{ display: "contents" }}>
//             <Navbar.Toggle
//               onClick={toggleOffCanvas}
//               className="hidden-toggle-button white-navbar-toggler-icon"
//               aria-controls="responsive-navbar-nav"
//             />
//             <Navbar.Offcanvas
//               id={`offcanvasNavbar-expand-lg`}
//               aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
//               placement="end"
//               show={showOffCanvas}
//               onHide={toggleOffCanvas}
//             >
//               <Offcanvas.Header closeButton>
//                 <Navbar.Brand>
//                   <div className="toggle-main-logo">
//                     <a
//                       href="/"
//                       title="home page"
//                       id="navbar-logo-to-home-page-sm"
//                       onClick={() => setShowOffCanvas(false)}
//                     >
//                       <Image
//                         // src={logoImage}
//                         src={Coloredlogo}
//                         title="Milele Car Rental"
//                         alt="Main Logo Sm"
//                         fluid
//                       />
//                     </a>
//                   </div>
//                 </Navbar.Brand>
//               </Offcanvas.Header>
//               <Offcanvas.Body>
//                 <Nav
//                   className={`navbar-menus-container-div justify-content-end flex-grow-1 ${
//                     isHomePage ? "navbar-white" : "navbar-black"
//                   }`}
//                 >
//                   <Nav.Link
//                     as={NavLink}
//                     to="/"
//                     title="home page"
//                     className={`navbar-all-menus ${
//                       location.pathname === "/"
//                         ? "active"
//                         : ""
//                     }`}
//                     activeclassname="active"
//                     onClick={() => setShowOffCanvas(false)}
//                     id="home-page-url"
//                   >
//                     Home
//                   </Nav.Link>
//                   <Nav.Link
//                     as={NavLink}
//                     to="/vehicles"
//                     title="fleet page"
//                     className={`navbar-all-menus ${
//                       location.pathname === "/vehicles" ? "active" : ""
//                     }`}
//                     activeclassname="active"
//                     onClick={() => setShowOffCanvas(false)}
//                     id="fleet-page-url"
//                   >
//                     Fleet
//                   </Nav.Link>

//                   <Nav.Link
//                     as={NavLink}
//                     to="/aboutus"
//                     title="about us page"
//                     className={`navbar-all-menus ${
//                       location.pathname === "/aboutus" ? "active" : ""
//                     }`}
//                     activeclassname="active"
//                     onClick={() => setShowOffCanvas(false)}
//                     id="about-us-page-url"
//                   >
//                     About Us
//                   </Nav.Link>

//                   <Nav.Link
//                     as={NavLink}
//                     to="/terms&Conditions"
//                     title="terms & Conditions page"
//                     className={`navbar-all-menus ${
//                       location.pathname === "/terms&Conditions" ? "active" : ""
//                     }`}
//                     activeclassname="active"
//                     onClick={() => setShowOffCanvas(false)}
//                     id="terms-and-conditions-page-url"
//                   >
//                     T&Cs
//                   </Nav.Link>

//                   {/* <Nav.Link
//                     as={NavLink}
//                     to="/leaseToOwn"
//                     title="lease to own page"
//                     className={`navbar-all-menus ${
//                       location.pathname === "/leaseToOwn" ? "active" : ""
//                     }`}
//                     activeclassname="active"
//                     onClick={() => setShowOffCanvas(false)}
//                     id="lto-page-url"
//                   >
//                     LTO
//                   </Nav.Link> */}

//                   <Nav.Link
//                     as={NavLink}
//                     to="/contactus"
//                     title="contact us page"
//                     className={`navbar-all-menus ${
//                       location.pathname === "/contactus" ? "active" : ""
//                     }`}
//                     activeclassname="active"
//                     onClick={() => setShowOffCanvas(false)}
//                     id="contact-us-page-url"
//                   >
//                     Contact Us
//                   </Nav.Link>
//                   <Nav.Link
//                     as={NavLink}
//                     to="/faqs"
//                     title="Frequently Asked Questions"
//                     className={`navbar-all-menus ${
//                       location.pathname === "/faqs" ? "active" : ""
//                     }`}
//                     activeclassname="active"
//                     onClick={() => setShowOffCanvas(false)}
//                     id="faqs-page-url"
//                   >
//                     FAQs
//                   </Nav.Link>
//                 </Nav>
//                 {/* {auth && authStatusCode === "OK" ? (
//                   <>
//                     <Nav.Link disabled className="welcome-text">
//                       Welcome, {auth?.data?.result?.userName?.slice(0, 6)}
//                     </Nav.Link>

//                     <NavDropdown title="User" id="user-nav-dropdown">
//                       <NavDropdown.Item
//                         as={NavLink}
//                         to={`/myProfile/${userName}`}
//                       >
//                         My Profile
//                       </NavDropdown.Item>

//                       <NavDropdown.Item
//                         as={NavLink}
//                         to={`/myBookings/${userName}`}
//                       >
//                         My Bookings
//                       </NavDropdown.Item>
//                       <NavDropdown.Divider />
//                       <NavDropdown.Item onClick={handleLogout}>
//                         Logout
//                       </NavDropdown.Item>
//                     </NavDropdown>
//                   </>
//                 ) : (
//                   <>
//                     <Nav.Link
//                       as={NavLink}
//                       to="/signup"
//                       className="auth-menu"
//                       activeclassname="active"
//                     >
//                       <b className="signup-menu">Login | Sign Up</b>
//                     </Nav.Link>
//                   </>
//                 )} */}
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>
//           </Col>
//         </Navbar>
//       </Container>
//     </>
//   );
// }

function MainNavbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/vehicles">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="faqs">
                Pricing
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link disabled"
                href="#"
                tabindex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default MainNavbar;

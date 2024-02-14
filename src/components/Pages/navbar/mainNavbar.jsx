import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import logo from "../../images/car_rental_logo_old.png";
import { Col } from "react-bootstrap";

function OffcanvasExample() {
  return (
    <>
      <Container >
        <Navbar key={"md"} expand={"md"} className="bg-body-tertiary">
          <Col lg={3} md={3} xs={6}>
            <Navbar.Brand>
              <div className="main-logo">
                <a href="/home">
                  <Image src={logo} alt="Main Logo" fluid />
                </a>
              </div>
            </Navbar.Brand>
          </Col>
          {/* Right Side */}
          <Col xs={9} style={{display: "contents"}}>
            <Navbar.Toggle
              className="hidden-toggle-button"
              aria-controls="responsive-navbar-nav"
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Navbar.Brand>
                  <div className="main-logo">
                    <a href="/home">
                      <Image src={logo} alt="Main Logo" fluid />
                    </a>
                  </div>
                </Navbar.Brand>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-md`}
                  >
                    <NavDropdown.Item href="#action4">
                      Vehicles
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Lease Car
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#action2">About Us</Nav.Link>
                  <Nav.Link href="#action2">FAQs</Nav.Link>
                  <Nav.Link href="#action2">Contact Us</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Col>
        </Navbar>
      </Container>
    </>
  );
}

export default OffcanvasExample;

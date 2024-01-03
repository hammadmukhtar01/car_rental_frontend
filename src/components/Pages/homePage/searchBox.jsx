import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsGeoAltFill, BsGeoAlt, BsCalendar2Check, BsCalendar4Week } from "react-icons/bs";
import './homePage.css'

const SearchBox = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState("");
  const [dropoffDateTime, setDropoffDateTime] = useState("");

  return (
    <div className=" form-group bg-img-container  pt-4">
      <Container className="search-box-container">
        <Row>
          <Col lg={10} md={9} sm={12} xs={12}>
            <Row>
              <Col xxl={3}  lg={4} md={6} sm={6} xs={12}>
                <Form.Group controlId="formKeyword">
                <div className="location-label">
                <label className="styled-label">
                    <BsGeoAlt className="mr-2" />
                    <b>Pickup Location</b>
                  </label>
                </div>
                  <input
                    className="form-control-location mt-2 col-12"
                    type="text"
                    placeholder="Enter pickup location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                <Form.Group controlId="formLocation">
                <div className="location-label">
                <label className="styled-label">
                    <BsGeoAltFill className="mr-2" />
                    <b>DropOff Location</b>
                  </label>
                </div>
                  <input
                    className=" form-control-location mt-2 col-12"
                    type="text"
                    placeholder="Enter dropoff location"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                <Form.Group controlId="formPickupDateTime">
                <div className="date-label">
                 <label className="styled-label">
                    <BsCalendar2Check className="mr-2" />
                    <b>Pickup Date & Time</b>
                  </label>
                 </div>
                  <input
                    className="form-control-date mt-2 col-12"
                    type="datetime-local"
                    value={pickupDateTime}
                    onChange={(e) => setPickupDateTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                <Form.Group controlId="formDropoffDateTime">
                 <div className="date-label">
                 <label className="styled-label">
                    <BsCalendar4Week className="mr-2" />
                    <b>Dropoff Date & Time</b>
                  </label>
                 </div>
                  <input
                    className="form-control-date mt-2 col-12"
                    type="datetime-local"
                    value={dropoffDateTime}
                    onChange={(e) => setDropoffDateTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col lg={2} md={3} sm={6} xs={6} className="p-4">
            <Button variant="primary">Search</Button>
          </Col>
        </Row>
      </Container>
      <div className="bg-img"></div>
    </div>
  );
};

export default SearchBox;

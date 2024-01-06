import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import {
  BsGeoAltFill,
  BsGeoAlt,
  BsCalendar2Check,
  BsCalendar4Week,
} from "react-icons/bs";
import "./homePage.css";

const SearchBox = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState("");
  const [dropoffDateTime, setDropoffDateTime] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);

  useEffect(() => {
    if (pickupDateTime && dropoffDateTime) {
      const pickupDate = new Date(pickupDateTime);
      const dropoffDate = new Date(dropoffDateTime);
      const timeDifference = dropoffDate.getTime() - pickupDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      setNumberOfDays(daysDifference);
    }
  }, [pickupDateTime, dropoffDateTime]);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const isoDateString = currentDate.toISOString().slice(0, -8);
    return isoDateString;
  };

  return (
    <div className=" form-group bg-img-container pt-4">
      <div className="search-box-container">
        <Row>
          <Col lg={10} md={9} sm={12} xs={12}>
            <Row>
              <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
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
                    min={getCurrentDateTime()}
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
                    min={pickupDateTime}
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

        <Row>
          <Col className="mt-2">
            {numberOfDays > 0 && (
              <span className="fs-5">
                Number of days:{" "}
                <span className="total-days">{numberOfDays}</span>
              </span>
            )}
          </Col>
        </Row>
      </div>
      <div className="bg-img"></div>
    </div>
  );
};

export default SearchBox;

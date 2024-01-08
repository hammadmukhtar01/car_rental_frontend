import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import axios from "axios";

import {
  BsPersonCircle,
  BsFillShieldLockFill,
  BsFileEarmarkArrowUp,
} from "react-icons/bs";
import $ from "jquery";

const AddOnsDocuments = ({ prevStep, nextStep }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [driversAge, setDriversAge] = useState("");
  const [airlineTicketNum, setAirlineTicketNum] = useState("");
  const [addOns, setAddOns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAddOn, setSelectedAddOn] = useState(null);
  // const [complexFeaturesIcons, setComplexFeaturesIcons] = useState([]);

  const nationalityValues = useMemo(
    () => ["India", "Pakistan", "UAE", "UK", "USA"],
    []
  );

  useEffect(() => {
    $("#nationalityValueselect").select2({
      placeholder: "Select Nationality",
      data: nationalityValues.map((nationalityV) => ({
        id: nationalityV,
        text: nationalityV,
      })),
    });
  });

  const AddOnsData = [
    {
      id: 1,
      addOnsName: "Name 11",
      pricePerDay: 5,
      IconName: BsFileEarmarkArrowUp,
      checkBoxValue: 0,
      addOnsDetail:
        "1 Detail Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam natus quia provident ipsa, eius aut totam fugiat nostrum. Assumenda, deserunt commodi. Quibusdam dolorum in corrupti ipsum. Ducimus nostrum itaque quas?",
    },

    {
      id: 2,
      addOnsName: "name 22",
      pricePerDay: 22,
      checkBoxValue: 1,
      IconName: BsPersonCircle,
      addOnsDetail:
        "2 Detail Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam natus quia provident ipsa, eius aut totam fugiat nostrum. Assumenda, deserunt commodi. Quibusdam dolorum in corrupti ipsum. Ducimus nostrum itaque quas?",
    },
    {
      id: 3,
      addOnsName: "Name 33",
      pricePerDay: 12,
      IconName: BsFileEarmarkArrowUp,
      checkBoxValue: 0,
      addOnsDetail:
        "1 Detail Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam natus quia provident ipsa, eius aut totam fugiat nostrum. Assumenda, deserunt commodi. Quibusdam dolorum in corrupti ipsum. Ducimus nostrum itaque quas?",
    },

    {
      id: 4,
      addOnsName: "name 44",
      pricePerDay: 32,
      checkBoxValue: 1,
      IconName: BsPersonCircle,
      addOnsDetail:
        "2 Detail Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam natus quia provident ipsa, eius aut totam fugiat nostrum. Assumenda, deserunt commodi. Quibusdam dolorum in corrupti ipsum. Ducimus nostrum itaque quas?",
    },
  ];

  const handleCheckBoxChange = (id) => {
    setAddOns((prevAddOns) =>
      prevAddOns.map((addOn) =>
        addOn.id === id
          ? { ...addOn, checkBoxValue: 1 - addOn.checkBoxValue }
          : addOn
      )
    );
  };

  const handleViewDetails = (addOn) => {
    setSelectedAddOn(addOn);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="vehicle-details-location-main-div p-3">
        <Container fluid className="pt-4">
          <>
            <div className="step1-car-location-details-container">
              <div className="step1-location-details p-3">
                <div className="location-label">
                  <div className="styled-label">
                    <BsPersonCircle className="mr-2 heading-icon" />
                    <b>Driver's Details</b>
                    <hr className="heading-underline" />
                  </div>
                </div>

                <div className="driver-details-form-container">
                  <div className=" form-group pl-4 pr-4">
                    <div className="">
                      <Row>
                        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                          <Form.Group controlId="formKeyword">
                            <div className="location-label">
                              <label className="styled-label">
                                <b>First Name</b>
                              </label>
                            </div>
                            <input
                              className="form-control-location mt-2 col-12"
                              type="text"
                              placeholder="First name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>

                        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                          <Form.Group controlId="formKeyword">
                            <div className="location-label">
                              <label className="styled-label">
                                <b>Last Name</b>
                              </label>
                            </div>
                            <input
                              className="form-control-location mt-2 col-12"
                              type="text"
                              placeholder="Last name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                          <Form.Group controlId="formKeyword">
                            <div className="location-label">
                              <label className="styled-label">
                                <b>Contact Number</b>
                              </label>
                            </div>
                            <input
                              className="form-control-location mt-2 col-12"
                              type="text"
                              placeholder="contact number"
                              value={contactNum}
                              onChange={(e) => setContactNum(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                          <Form.Group controlId="formKeyword">
                            <div className="location-label">
                              <label className="styled-label">
                                <b>Email</b>
                              </label>
                            </div>
                            <input
                              className="form-control-location mt-2 col-12"
                              type="text"
                              placeholder="Email address"
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                          <Form.Group controlId="formKeyword">
                            <div className="location-label">
                              <label className="styled-label mb-3">
                                <b>Nationality</b>
                              </label>
                            </div>
                            <select
                              id="nationalityValueselect"
                              className="form-select dropdown-value"
                              value={nationality}
                              onChange={(e) => setNationality(e.target.value)}
                            >
                              <option value="" disabled>
                                Choose Car Model
                              </option>
                              {nationalityValues.map((model) => (
                                <option key={model} value={model}>
                                  {model}
                                </option>
                              ))}
                            </select>
                          </Form.Group>
                        </Col>
                        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                          <Form.Group controlId="formKeyword">
                            <div className="location-label">
                              <label className="styled-label">
                                <b>Driver's Age</b>
                              </label>
                            </div>
                            <input
                              className="form-control-location mt-2 col-12"
                              type="text"
                              placeholder="Enter pickup location"
                              value={driversAge}
                              onChange={(e) => setDriversAge(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                          <Form.Group controlId="formKeyword">
                            <div className="location-label">
                              <label className="styled-label">
                                <b>Airline Ticket No.</b>
                              </label>
                            </div>
                            <input
                              className="form-control-location mt-2 col-12"
                              type="text"
                              placeholder="Enter pickup location"
                              value={airlineTicketNum}
                              onChange={(e) =>
                                setAirlineTicketNum(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="step1-car-details p-4">
                <div className="location-label">
                  <div className="styled-label">
                    <BsFillShieldLockFill className="mr-2 heading-icon" />
                    <b>Rental AddOns</b>
                    <hr className="heading-underline" />
                  </div>

                  <div className="driver-details-form-container">
                    <Row>
                      <Col lg={10} md={10} sm={12} xs={12}>
                        <div className=" form-group pl-4 pr-4">
                          <Row className="d-flex">
                            {AddOnsData.map((AddOnsDataValues) => (
                              <Col
                                lg={5}
                                md={6}
                                sm={6}
                                xs={12}
                                className="add-on-container"
                                key={AddOnsDataValues.id}
                              >
                                <Form.Group controlId="formKeyword">
                                  <div className="row d-flex align-items-center">
                                    <Col lg={1} md={6} sm={6} xs={12}>
                                      <AddOnsDataValues.IconName className="mr-2 heading-icon" />
                                    </Col>

                                    <Col lg={8} md={6} sm={6} xs={12}>
                                      <div className="add-ons-label-name p-2">
                                        <label className="">
                                          <b>{AddOnsDataValues.addOnsName}</b>
                                          <br />
                                          <span>
                                            {" "}
                                            Price AED{" "}
                                            {AddOnsDataValues.pricePerDay} / Day{" "}
                                          </span>
                                          <br />
                                          <a
                                            href="#{AddOnsDataValues.id}"
                                            onClick={() =>
                                              handleViewDetails(
                                                AddOnsDataValues
                                              )
                                            }
                                            className="add-ons-view-details"
                                          >
                                            View Details
                                          </a>
                                        </label>
                                      </div>
                                    </Col>

                                    <Col lg={3} md={6} sm={6} xs={12}>
                                      <div className="form-check form-switch form-switch-md float-end">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id={`flexSwitchCheckDefault_${AddOnsDataValues.id}`}
                                          checked={
                                            AddOnsDataValues.checkBoxValue === 1
                                          }
                                          onChange={() =>
                                            handleCheckBoxChange(
                                              AddOnsDataValues.id
                                            )
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </div>
                                </Form.Group>
                              </Col>
                            ))}

                          </Row>
                        </div>
                      </Col>

                      <Col>
                        <p>Total price</p>
                      </Col>
                    </Row>
                  </div>
                </div>
                <Modal show={showModal} onHide={handleCloseModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>View Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {selectedAddOn && (
                      <>
                        <p>{selectedAddOn.addOnsDetail}</p>
                        {/* Add other details you want to display */}
                      </>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
              <br />
              <div className="step1-car-details p-4">
                <div className="location-label">
                  <div className="styled-label">
                    <BsFileEarmarkArrowUp className="mr-2 heading-icon" />
                    <b>Documents Upload</b>
                    <hr className="heading-underline" />
                  </div>
                  <div className="driver-details-form-container">
                    <div className=" form-group pl-4 pr-4">
                      <div className="">
                        <Row>
                          <Col xxl={2} lg={1}></Col>

                          <Col xxl={3} lg={4} md={5} sm={8} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>First Name</b>
                                </label>
                              </div>
                              <input
                                className="form-control-fname p-2 col-12"
                                type="file"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col xxl={1} lg={1} md={1}></Col>

                          <Col xxl={3} lg={4} md={5} sm={8} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>Last Name</b>
                                </label>
                              </div>
                              <input
                                className="form-control-lname p-2 col-12"
                                type="file"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col xxl={2} lg={2}></Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="booking-button-main-div-step1 d-flex justify-content-center pb-2 pt-3">
                <Col lg={3} md={4} sm={6} xs={8}>
                  <Button
                    variant="primary"
                    className="booking-text action-button next"
                    onClick={nextStep}
                  >
                    Book and Pay
                  </Button>
                </Col>
              </div>
            </div>
          </>
        </Container>
      </div>
    </div>
  );
};

export default AddOnsDocuments;

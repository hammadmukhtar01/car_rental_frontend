/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import { BsPersonCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
// import dayjs from 'dayjs';
import Select from "react-select";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
// import { getJson, setOptions, localeAr } from '@mobiscroll/react';

const AddOnsDocuments = ({ prevStep, nextStep }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [driversAge, setDriversAge] = useState("");
  const [airlineTicketNum, setAirlineTicketNum] = useState("");
  const [driverDrivingLicense, setDriverDrivingLicense] = useState("");
  const [driverPassport, setDriverPassport] = useState("");
  // const [complexFeaturesIcons, setComplexFeaturesIcons] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState("");
  const [driverFlightDateTime, setDriverFlightDateTime] = useState(new Date());
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const nationalityOptions = response.data
          .map((country) => ({
            label: country.name.common,
            value: country.cca2,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setNationality(nationalityOptions);
      } catch (error) {
        console.error("Failed to fetch nationalities:", error);
      }
    };

    fetchNationalities();
  }, []);

  const submitBooking = async (data) => {
    console.log("submit booking start", data);
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url =
        "https://app.speedautosystems.com/api/services/app/BookingPluginCreation/CreateOrUpdateWebBookingForPlugin";
      const payload = {
        booking: data,
      };

      const response = await axios.post(url, payload, { headers });
      console.log("Booking response--------:", response.data);

      if (response.data.success === true) {
        const nextStepUrl = "/bookingPage/3";
        window.location.href = nextStepUrl;
      }
    } catch (error) {
      console.error("Error creating/updating booking:", error);
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedNationality(selectedOption);
    console.log("Selected nationality:", selectedOption);
  };

  const handleNextStep = () => {
    let isFormValid = true;

    if (!firstName.trim()) {
      isFormValid = false;
      console.log("First name is required");
    }

    if (!lastName.trim()) {
      isFormValid = false;
      console.log("Last name is required");
    }

    if (!contactNum.trim()) {
      isFormValid = false;
      console.log("Contact Num is required");
    }

    if (!emailAddress.trim()) {
      isFormValid = false;
      console.log("Email is required");
    }

    if (!nationality) {
      console.log("nationlity value is: ", nationality);
      isFormValid = false;
      console.log("Nationality is required");
    }

    // if (!driversAge.trim()) {
    //   isFormValid = false;
    //   console.log("Age is required");
    // }

    if (!airlineTicketNum.trim()) {
      isFormValid = false;
      console.log("Ticket Number is required");
    }

    if (!driverDrivingLicense.trim()) {
      isFormValid = false;
      console.log("Lisence is required");
    }

    if (!driverPassport.trim()) {
      isFormValid = false;
      console.log("Passport is required");
    }

    if (!isFormValid) {
      console.log("");
      return;
    }
  };

  const handleAddOnsDocumentStepForm = async (e) => {
    e.preventDefault();
    console.log(
      "Data: ",
      firstName,
      lastName,
      contactNum,
      emailAddress,
      driversAge,
      airlineTicketNum,
      driverDrivingLicense,
      driverPassport
    );

    const bookingData = {
      bookingType: 0,
      IsBooking: true,
      bookingStatus: 0,
      startDate: "2024-05-05T06:55:00.000Z",
      endDate: "2024-06-16T06:16:00.000Z",
      charges: [
        {
          accepted: true,
          tariff: [
            {
              id: 97430,
            },
          ],
          chargesTypeId: 1,
          rate: 150,
          rateTypeId: 1,
        },
        // 1 below
        {
          accepted: true,
          tariff: [
            {
              id: 97433,
            },
          ],
          chargesTypeId: 2,
          rate: 10,
          rateTypeId: 1,
        },
        // 2 Below
        {
          accepted: true,
          tariff: [
            {
              id: 97438,
            },
          ],
          chargesTypeId: 3,
          rate: 20,
          rateTypeId: 1,
        },
        {
          accepted: true,
          tariff: [
            {
              id: 97439,
            },
          ],
          chargesTypeId: 4,
          rate: 30,
          rateTypeId: 1,
        },
        // 4 Below
        {
          accepted: false,
          tariff: [],
          chargesTypeId: 5,
          rate: 40,
          rateTypeId: 5,
        },
        // 5 Below
        {
          accepted: true,
          tariff: [
            {
              id: 97444,
            },
          ],
          chargesTypeId: 54,
          rate: 50,
          rateTypeId: 6,
        },
        // 6 Below
        {
          accepted: true,
          tariff: [
            {
              id: 97443,
            },
          ],
          chargesTypeId: 26,
          rate: 60,
          rateTypeId: 6,
        },
        // 7 below
        {
          accepted: true,
          tariff: [
            {
              id: 97446,
            },
          ],
          chargesTypeId: 7,
          rate: 70,
          rateTypeId: 6,
        },
        // 8 Below
        {
          accepted: true,
          tariff: [
            {
              id: 97447,
            },
          ],
          chargesTypeId: 32,
          rate: 80,
          rateTypeId: 1,
        },
        // 9 Below
        {
          accepted: true,
          tariff: [
            {
              id: 97448,
            },
          ],
          chargesTypeId: 73,
          rate: 90,
          rateTypeId: 6,
        },
        // 10 Below
        {
          accepted: true,
          tariff: [
            {
              id: 97449,
            },
          ],
          chargesTypeId: 74,
          rate: 100,
          rateTypeId: 6,
        },
        // 11 Below
        {
          accepted: true,
          tariff: [
            {
              id: 97450,
            },
          ],
          chargesTypeId: 8,
          rate: 110,
          rateTypeId: 6,
        },
        // 12 Below
        {
          accepted: true,
          tariff: [
            {
              id: 97451,
            },
          ],
          chargesTypeId: 34,
          rate: 120,
          rateTypeId: 6,
        },
        // 13 Below
        {
          accepted: true,
          tariff: [],
          chargesTypeId: 19,
          rate: 130,
          rateTypeId: 6,
        },
        // 14 below
        {
          accepted: true,
          tariff: [],
          chargesTypeId: 67,
          rate: 140,
          rateTypeId: 6,
        },
        // 15 Below
        {
          accepted: true,
          tariff: [],
          chargesTypeId: 28,
          rate: 150,
          rateTypeId: 6,
        },
      ],
      closingLocationId: 8033,
      customer: {
        id: 899443,
        firstName: "Hammad Mukhtar",
      },
      customerId: 899443,
      discount: 10,
      driver: {
        id: 899443,
      },
      driverId: 899443,
      flightDateTime: "2024-06-13T06:16:00.000Z",
      flightNo: "flight num test",
      locationId: 8039,
      notes: "API integration",
      tariffGroupId: 8965,
      tax: 200,
      taxPercent: 5,
      totalCharges: 100000,
    };

    submitBooking(bookingData);
  };

  const selectStyles = {
    control: (provided, { hasValue }) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid rgb(184, 184, 184)",
      boxShadow: "none",
      lineHeight: "32px",
      marginLeft: "-13px",
      marginRight: "-14px",
      borderRadius: "6px",
      ":hover": {
        border: "1px solid rgb(184, 184, 184)",
      },
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: isSelected ? "#cc6119" : "white",
      ":hover": {
        backgroundColor: isSelected ? "#cc6119" : "rgb(229, 229, 229)",
      },
    }),
  };
  return (
    <div>
      <div className="vehicle-details-location-main-div pt-3 pb-3">
        <Container fluid className="pt-4">
          <>
            <form
              action="#"
              className="signin-form"
              onSubmit={handleAddOnsDocumentStepForm}
            >
              <div className="step1-car-location-details-container">
                <div className="step1-location-details p-4">
                  <div className="location-label">
                    <div className="styled-label">
                      <BsPersonCircle className="mr-2 heading-icon" />
                      <b>Customer's Details</b>
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
                                required
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
                                required
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
                                type="tel"
                                required
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
                                type="email"
                                placeholder="Email address"
                                required
                                value={emailAddress}
                                onChange={(e) =>
                                  setEmailAddress(e.target.value)
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
                <div className="step1-location-details p-4">
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
                                  <b>Airline Ticket No.</b>
                                </label>
                              </div>
                              <input
                                className="form-control-location mt-2 col-12"
                                required
                                type="text"
                                placeholder="Enter ticket number"
                                value={airlineTicketNum}
                                onChange={(e) =>
                                  setAirlineTicketNum(e.target.value)
                                }
                              />
                            </Form.Group>
                          </Col>

                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>Flight DateTime</b>
                                </label>
                              </div>
                              <DateTimePicker
                                required
                                className="form-control-age mt-2 col-12"
                                onChange={setDriverFlightDateTime}
                                value={driverFlightDateTime}
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
                              <Select
                                options={nationality}
                                required
                                className="form-control-nationality col-12"
                                value={selectedNationality}
                                onChange={handleChange}
                                styles={selectStyles}
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
                                    <b>Driver's Driving Lisence</b>
                                  </label>
                                </div>
                                <input
                                  className="form-control-fname p-2 col-12"
                                  required
                                  type="file"
                                  placeholder="driving license"
                                  value={driverDrivingLicense}
                                  onChange={(e) =>
                                    setDriverDrivingLicense(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col xxl={1} lg={1} md={1}></Col>

                            <Col xxl={3} lg={4} md={5} sm={8} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <b>Driver's Passport</b>
                                  </label>
                                </div>
                                <input
                                  className="form-control-lname p-2 col-12"
                                  required
                                  type="file"
                                  placeholder="passport number"
                                  value={driverPassport}
                                  onChange={(e) =>
                                    setDriverPassport(e.target.value)
                                  }
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
                  <Col lg={3} md={4} sm={6} xs={8} className="d-flex just">
                    <div className="button-container">
                      <button
                        className="animated-button booking-text action-button next"
                        onClick={handleNextStep}
                      >
                        {" "}
                        <span className="button-text-span">
                          <span className="transition"></span>
                          <span className="gradient"></span>
                          <span className="label">Book & Pay</span>
                        </span>
                      </button>
                    </div>
                  </Col>
                </div>
              </div>
            </form>
          </>
        </Container>
      </div>
    </div>
  );
};

export default AddOnsDocuments;

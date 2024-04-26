/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import { BsPersonCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
// import dayjs from 'dayjs';
import Select from "react-select";
import { useLocation } from "react-router-dom";
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
  // Driving License
  const [drivingLicenseNum, setDrivingLicenseNum] = useState("");
  const [drivingLicenseIssueBy, setDrivingLicenseIssueBy] = useState("");
  const [drivingLicenseIssueDate, setDrivingLicenseIssueDate] = useState("");
  const [drivingLicenseExpiryDate, setDrivingLicenseExpiryDate] = useState("");
  const [drivingLicenseImg, setDrivingLicenseImg] = useState("");
  const [isInternationalLicense, setIsInternationalLicense] = useState("");
  // Passport
  const [passportNum, setPassportNum] = useState("");
  const [passportIssueBy, setPassportIssueBy] = useState("");
  const [passportIssueDate, setPassportIssueDate] = useState("");
  const [passportExpiryDate, setPassportExpiryDate] = useState("");
  const [passportImg, setPassportImg] = useState("");
  // const [complexFeaturesIcons, setComplexFeaturesIcons] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState("");
  const [driverFlightDateTime, setDriverFlightDateTime] = useState(new Date());
  const [airlineTicketNum, setAirlineTicketNum] = useState("");

  const [pickupLocationId, setPickupLocationId] = useState(null);
  const [dropoffLocationId, setDropoffLocationId] = useState(null);

  const [newCustomerId, setNewCustomerId] = useState("");
  const [newCustomerDetail, setNewCustomerDetail] = useState("");
  const [bookingData, setBookingData] = useState(null);
  const [createCustomerData, setCreateCustomerData] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  const bookingDocURL = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(bookingDocURL.search),
    [bookingDocURL.search]
  );
  const TariffGroupIdParam = parseInt(queryParams.get("tariffGroupId"));
  const addOnsFromUrl = queryParams.get("addOns").split(",").map(Number);

  const startDateValue = queryParams.get("startDate");
  const returnDateValue = queryParams.get("endDate");
  const pickupTimeParam = queryParams.get("pickupTime");
  const dropoffTimeParam = queryParams.get("dropoffTime");

  const [pickupHour, pickupMinute] = pickupTimeParam.split(":");
  const startDateTime = new Date(startDateValue);
  startDateTime.setHours(parseInt(pickupHour, 10));
  startDateTime.setMinutes(parseInt(pickupMinute, 10));
  const startDateTimeISO = startDateTime.toISOString();

  const [dropoffHour, dropoffMinute] = dropoffTimeParam.split(":");
  const dropoffDateTime = new Date(returnDateValue);
  dropoffDateTime.setHours(parseInt(dropoffHour, 10));
  dropoffDateTime.setMinutes(parseInt(dropoffMinute, 10));
  const dropoffDateTimeISO = dropoffDateTime.toISOString();

  const discountedValueParam = queryParams.get("discountValue");
  const totalGrandPriceParam = queryParams.get("grandTotalCharges");
  const deliveryChargesParam = parseInt(
    queryParams.get("totalDeliveryCharges")
  );

  const taxPercentage = 5;
  const taxValue = Math.ceil((taxPercentage * totalGrandPriceParam) / 100);

  const totalGrandPriceWithTax =
    parseInt(totalGrandPriceParam) + parseFloat(taxValue);

  const pickupLocParam = queryParams.get("pickupLoc");
  const dropoffLocParam = queryParams.get("dropoffLoc");
  const pickdropCombineLoc = `pickup: ${pickupLocParam}, dropoff: ${dropoffLocParam}`;

  const pickupLocStateParam = queryParams.get("pickupLocState");
  const dropoffLocStateParam = queryParams.get("dropoffLocState");
  const checkBoxValueParam = queryParams.get("checkBoxValue");

  const today = new Date();
  const invoiceExpiryDate = new Date(today);
  invoiceExpiryDate.setDate(today.getDate() + 5);
  const paymentLinkExpiryDate = invoiceExpiryDate.toISOString().split("T")[0];

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

  const fetchAvailableLocationsData = useCallback(async () => {
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = `https://app.speedautosystems.com/api/services/app/webBooking/GetLocations`;

      const response = await axios.post(url, {}, { headers });
      const fetchedAvailableLocations = response.data.result.items;

      const matchedPickupLocation = fetchedAvailableLocations.find(
        (location) =>
          location.name.toUpperCase() === pickupLocStateParam.toUpperCase()
      );
      const matchedDropoffLocation = fetchedAvailableLocations.find(
        (location) =>
          location.name.toUpperCase() === dropoffLocStateParam.toUpperCase()
      );

      if (matchedPickupLocation) {
        setPickupLocationId(matchedPickupLocation.id);
      }
      if (matchedDropoffLocation) {
        setDropoffLocationId(matchedDropoffLocation.id);
      }

      // console.log(
      //   "List of available locations in Speed:",
      //   fetchedAvailableLocations
      // );
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, [dropoffLocStateParam, pickupLocStateParam]);

  useEffect(() => {
    fetchAvailableLocationsData();
  }, [fetchAvailableLocationsData]);

  // Create Customer API

  const createCustomer = async (data) => {
    console.log("creatingg customer", data);
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url =
        "https://app.speedautosystems.com/api/services/app/person/CreateOrUpdatePerson";
      const payload = {
        person: data,
      };

      const response = await axios.post(url, payload, { headers });
      console.log(
        "===createddddd customer response--------:",
        response?.data?.result
      );
      // setNewCustomerId(response?.data?.result);

      if (response.data && response.data.success && response.data.result) {
        console.log(
          "create customer success if method console - - - - - -- done"
        );
        alert("alert customer created...");
        getCustomerDetails(response?.data?.result);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error creating/updating customer:", error);
    }
  };

  // get Customer Detail API

  const getCustomerDetails = async (customerID) => {
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const url =
        "https://app.speedautosystems.com/api/services/app/person/GetPersonForEdit";
      const requestNewCustomerId = {
        id: customerID,
      };

      const response = await axios.post(url, requestNewCustomerId, { headers });

      setNewCustomerDetail(response?.data?.result);
      if (response?.data?.success) {
        alert("alert customer get details...");
        console.log("get customer response--------:", response?.data?.result);
        createBooking(
          response?.data?.result?.id,
          response?.data?.result?.firstName,
          response?.data?.result?.lastName,
          response?.data?.result?.mobileNo,
          response?.data?.result?.email
        );
      } else {
        console.log("User ID is incorrect");
      }
    } catch (error) {
      console.error("Error creating/updating customer:", error);
    }
  };

  const createBooking = async (
    newId,
    customerFName,
    customerLName,
    customerMobileNo,
    customerEmail
  ) => {
    console.log(
      "before setting value to booking data, newId is:",
      newId,
      "\nand first name --- is: ",
      customerFName,
      "\ntotal charges are: ",
      totalGrandPriceWithTax
    );

    const charges = [
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
        accepted: addOnsFromUrl.includes(2),
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
        accepted: addOnsFromUrl.includes(3),
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
        accepted: addOnsFromUrl.includes(4),
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
        accepted: addOnsFromUrl.includes(5),
        tariff: [],
        chargesTypeId: 5,
        rate: 40,
        rateTypeId: 5,
      },
      // 5 Below
      {
        accepted: addOnsFromUrl.includes(54),
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
        rate: deliveryChargesParam,
        rateTypeId: 6,
      },
      // 7 below
      {
        accepted: addOnsFromUrl.includes(7),
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
        accepted: addOnsFromUrl.includes(32),
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
        accepted: addOnsFromUrl.includes(73),
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
        accepted: addOnsFromUrl.includes(74),
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
        accepted: addOnsFromUrl.includes(8),
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
        accepted: addOnsFromUrl.includes(34),
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
        accepted: addOnsFromUrl.includes(19),
        tariff: [],
        chargesTypeId: 19,
        rate: 130,
        rateTypeId: 6,
      },
      // 14 below
      {
        accepted: addOnsFromUrl.includes(67),
        tariff: [],
        chargesTypeId: 67,
        rate: 140,
        rateTypeId: 6,
      },
      // 15 Below
      {
        accepted: addOnsFromUrl.includes(28),
        tariff: [],
        chargesTypeId: 28,
        rate: 150,
        rateTypeId: 6,
      },
    ];

    const bookingData = {
      bookingType: 0,
      IsBooking: true,
      bookingStatus: 0,
      startDate: startDateTimeISO,
      endDate: dropoffDateTimeISO,
      charges: charges,
      closingLocationId: dropoffLocationId,
      customer: {
        id: newId,
        firstName: customerFName,
        lastName: customerLName,
        mobileNo: customerMobileNo,
        email: customerEmail,
      },
      customerId: newId,
      discount: parseInt(discountedValueParam),
      driver: {
        id: newId,
      },
      driverId: newId,
      flightDateTime: driverFlightDateTime.toISOString(),
      flightNo: airlineTicketNum,
      locationId: pickupLocationId,
      notes: pickdropCombineLoc,
      tariffGroupId: TariffGroupIdParam,
      tax: taxValue,
      taxPercent: taxPercentage,
      totalCharges: totalGrandPriceWithTax,
    };

    const updatedBookingData = {
      ...bookingData,
      charges: bookingData.charges.map((charge) => ({
        ...charge,
        accepted: addOnsFromUrl.includes(charge.chargesTypeId),
      })),
    };
    console.log("Updated Booking Data:", bookingData);
    submitBooking(bookingData);
  };

  // Booking API

  const submitBooking = async (data) => {
    console.log("submit booking start");
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

      console.log("Before exact booking, payload data is: ", payload);
      const response = await axios.post(url, payload, { headers });
      console.log("Finallll Booking response--------:", response?.data);
      console.log(
        "After Booking checking customer detail response--------:",
        newCustomerDetail
      );

      setBookingStatus(response?.data?.success);
      const responseResult = response?.data?.success;

      if (responseResult === true) {
        const bookingStatus = "success";
        alert("Booking status is: ", bookingStatus);
        console.log("booking done successfully. Time for Payment");
        alert("alert booking fully created...");
        getAccessToken();
      }
    } catch (error) {
      console.error("Error creating/updating booking:", error);
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedNationality(selectedOption);
  };

  const handlePassportChange = (selectedOption) => {
    setPassportIssueBy(selectedOption);
  };

  const handleDrivingLicenseChange = (selectedOption) => {
    setDrivingLicenseIssueBy(selectedOption);
  };

  const handleNextStep = () => {
    let isFormValid = true;

    if (!firstName.trim()) {
      isFormValid = false;
      console.log("First name is required");
    }

    // if (!lastName.trim()) {
    //   isFormValid = false;
    //   console.log("Last name is required");
    // }

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

    if (!drivingLicenseNum.trim()) {
      isFormValid = false;
      console.log("Lisence is required");
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
      airlineTicketNum,
      drivingLicenseNum
    );
    // Creating Customer Data

    const createCustomerData = {
      firstName: firstName,
      lastName: lastName,
      mobileNo: contactNum,
      email: emailAddress,
      identityDocuments: [
        {
          documentNo: drivingLicenseNum,
          expiryDate: drivingLicenseExpiryDate,
          identityDocumentType: 4,
          isInternational: isInternationalLicense,
          issueDate: drivingLicenseIssueDate,
          gallaryImages: [
            {
              url: drivingLicenseImg,
            },
          ],
          images: [
            {
              url: drivingLicenseImg,
            },
          ],
          issuedBy: drivingLicenseIssueBy.label,
        },
        {
          documentNo: passportNum,
          expiryDate: passportExpiryDate,
          identityDocumentType: 2,
          issueDate: passportIssueDate,
          gallaryImages: [
            {
              url: passportImg,
            },
          ],
          images: [
            {
              url: passportImg,
            },
          ],
          issuedBy: passportIssueBy.label,
        },
      ],
    };

    await createCustomer(createCustomerData);
  };

  // Payment APIs

  const getAccessToken = async () => {
    const Payment_Req_Access_Token =
      process.env.REACT_APP_NETWORK_PAYMENT_REQ_ACCESS_TOKEN;
    console.log(
      "Payment_Req_Access_Token value is: ",
      Payment_Req_Access_Token
    );
    const url =
      "https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token";

    const headers = {
      accept: "application/vnd.ni-identity.v1+json",
      authorization: `Basic ${Payment_Req_Access_Token}`,
      "Content-Type": "application/vnd.ni-identity.v1+json",
    };

    try {
      const response = await axios.post(url, {}, { headers });
      if (response.data && response.data.access_token) {
        alert("alert access token for payment link is creating...");
        console.log("Access Token Received:", response.data.access_token);
        createInvoice(response.data.access_token);
      }
    } catch (error) {
      console.error("Failed to fetch access token:", error);
    }
  };

  const createInvoice = async (accessToken) => {
    const url =
      "https://api-gateway.sandbox.ngenius-payments.com/invoices/outlets/0e93daef-8a7b-40fc-ae21-6cb36ce40c1d/invoice";
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: emailAddress,
      transactionType: "PURCHASE",
      emailSubject: "Click to Pay: Milele Car Rental Invoice",
      invoiceExpiryDate: paymentLinkExpiryDate,
      paymentAttempts: 3,
      redirectUrl: "https://milelecarrental.com/bookingPage/3&booking-success",
      items: [
        {
          description: TariffGroupIdParam,
          totalPrice: {
            currencyCode: "AED",
            value: totalGrandPriceWithTax * 100,
          },
          quantity: 1,
        },
      ],
      total: {
        currencyCode: "AED",
        value: totalGrandPriceWithTax * 100,
      },
      message:
        "Thank you for booking at Milele Car Rental. By clicking on the below link and processing your payment successful, your booking will be confirmed..",
    };
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.ni-invoice.v1+json",
    };

    try {
      const response = await axios.post(url, body, { headers });
      if (
        response.data &&
        response.data._links &&
        response.data._links.payment
      ) {
        console.log(
          "Invoice Created, Payment URL:",
          response.data._links.payment.href
        );
        alert("alert payment link sent...");
        setPaymentUrl(response.data._links.payment.href);
        const nextStepUrl = `/bookingPage/3&booking-${bookingStatus}`;
        window.location.href = nextStepUrl;
      }
    } catch (error) {
      console.error("Failed to create invoice:", error);
    }
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
                                  <b>First Name *</b>
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
                                  <b>Contact Number *</b>
                                </label>
                              </div>
                              <input
                                className="form-control-location mt-2 col-12"
                                type="tel"
                                required
                                placeholder="Contact number"
                                value={contactNum}
                                onChange={(e) => setContactNum(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>Email *</b>
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
                            <Col xxl={4} lg={4} md={6} sm={6} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <b>Passport No. *</b>
                                  </label>
                                </div>
                                <input
                                  className="form-control-location mt-2 col-12"
                                  required
                                  type="text"
                                  placeholder="Passport no."
                                  value={passportNum}
                                  onChange={(e) =>
                                    setPassportNum(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col xxl={4} lg={4} md={6} sm={6} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label mb-3">
                                    <b>Passport Issued By *</b>
                                  </label>
                                </div>
                                <Select
                                  options={nationality}
                                  required
                                  className="form-control-nationality col-12"
                                  value={passportIssueBy}
                                  onChange={handlePassportChange}
                                  styles={selectStyles}
                                />
                              </Form.Group>
                            </Col>

                            <Col xxl={4} lg={4} md={6} sm={6} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <b>Passport Issue Date *</b>
                                  </label>
                                </div>
                                <DateTimePicker
                                  required
                                  className="form-control-age mt-2 col-12"
                                  value={passportIssueDate}
                                  onChange={setPassportIssueDate}
                                  maxDate={
                                    new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col xxl={4} lg={4} md={6} sm={6} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <b>Passport Expiry Date *</b>
                                  </label>
                                </div>
                                <DateTimePicker
                                  required
                                  className="form-control-age mt-2 col-12"
                                  value={passportExpiryDate}
                                  onChange={setPassportExpiryDate}
                                  minDate={new Date(new Date())}
                                />
                              </Form.Group>
                            </Col>
                            <Col xxl={4} lg={4} md={5} sm={8} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <b>Passport Photo *</b>
                                  </label>
                                </div>
                                <input
                                  className="form-control-lname p-2 col-12 mt-2"
                                  required
                                  type="file"
                                  placeholder="passport number"
                                  value={passportImg}
                                  onChange={(e) =>
                                    setPassportImg(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <br />
                          <br />
                          <Row>
                            <Col xxl={4} lg={4} md={6} sm={8} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <b>Driving License No. *</b>
                                  </label>
                                </div>
                                <input
                                  className="form-control-location mt-2 col-12"
                                  required
                                  type="text"
                                  placeholder="Driving license no."
                                  value={drivingLicenseNum}
                                  onChange={(e) =>
                                    setDrivingLicenseNum(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col xxl={4} lg={4} md={6} sm={8} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label mb-3">
                                    <b>Driving License Issued By *</b>
                                  </label>
                                </div>
                                <Select
                                  options={nationality}
                                  required
                                  className="form-control-nationality col-12"
                                  value={drivingLicenseIssueBy}
                                  onChange={handleDrivingLicenseChange}
                                  styles={selectStyles}
                                />
                              </Form.Group>
                            </Col>

                            <Col xxl={4} lg={4} md={6} sm={8} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <b>Driving License Issue Date *</b>
                                  </label>
                                </div>

                                <DateTimePicker
                                  required
                                  className="form-control-age mt-2 col-12"
                                  value={drivingLicenseIssueDate}
                                  onChange={setDrivingLicenseIssueDate}
                                  maxDate={
                                    new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col xxl={4} lg={4} md={6} sm={8} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <b>Driving License Expiry Date *</b>
                                  </label>
                                </div>
                                <DateTimePicker
                                  required
                                  className="form-control-age mt-2 col-12"
                                  value={drivingLicenseExpiryDate}
                                  onChange={setDrivingLicenseExpiryDate}
                                  minDate={new Date(new Date())}
                                />
                              </Form.Group>
                            </Col>
                            <Col xxl={4} lg={4} md={6} sm={8} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <b>Driving Lisence Photo *</b>
                                  </label>
                                </div>
                                <input
                                  className="form-control-fname p-2 col-12 mt-2"
                                  required
                                  type="file"
                                  placeholder="driving license"
                                  value={drivingLicenseImg}
                                  onChange={(e) =>
                                    setDrivingLicenseImg(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col xxl={4} lg={4} md={6} sm={8} xs={12}>
                              <Form.Group controlId="formKeyword">
                                <div className="location-label">
                                  <label className="styled-label">
                                    <b>Is Driving License International? *</b>
                                  </label>
                                </div>
                                <div className="mt-2 d-flex">
                                  <Form.Check
                                    className="mb-1 col-4"
                                    type="radio"
                                    label="Yes"
                                    name="internationalLicense"
                                    value="true"
                                    checked={isInternationalLicense === "true"}
                                    onChange={() =>
                                      setIsInternationalLicense("true")
                                    }
                                  />
                                  <Form.Check
                                    className="mb-1 col-4"
                                    type="radio"
                                    label="No"
                                    name="internationalLicense"
                                    value="false"
                                    checked={isInternationalLicense === "false"}
                                    onChange={() =>
                                      setIsInternationalLicense("false")
                                    }
                                  />
                                </div>
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="step1-location-details p-4">
                  <div className="location-label">
                    <div className="styled-label">
                      <BsPersonCircle className="mr-2 heading-icon" />
                      <b>Driver's Details *</b>
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
                                  <b>Airline Ticket No. *</b>
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
                                  <b>Flight DateTime *</b>
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
                                  <b>Nationality *</b>
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

                <div className="booking-button-main-div-step1 d-flex justify-content-center pb-2 pt-3">
                  <Col lg={3} md={4} sm={6} xs={8} className="d-flex just">
                    <div className="button-container">
                      <button
                        className="animated-button booking-text action-button next"
                        onClick={handleNextStep}
                      >
                        {" "}
                        <span className="button-text-span p-4">
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

/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { BsPersonCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Helmet } from "react-helmet";

const AddOnsDocuments = ({ prevStep, nextStep }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [country, setCountry] = useState({ dialCode: "971", name: "UAE" });
  const [emailAddress, setEmailAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(false);

  // Driving License
  const [drivingLicenseNum, setDrivingLicenseNum] = useState("");
  const [drivingLicenseIssueBy, setDrivingLicenseIssueBy] = useState("");
  const [drivingLicenseIssueDate, setDrivingLicenseIssueDate] = useState("");
  const [drivingLicenseExpiryDate, setDrivingLicenseExpiryDate] = useState("");
  const [drivingLicenseImg, setDrivingLicenseImg] = useState("");
  const [isInternationalLicense, setIsInternationalLicense] = useState("");
  // Passport

  const [selectedNationality, setSelectedNationality] = useState("");
  const [driverFlightDateTime, setDriverFlightDateTime] = useState(new Date());
  const [airlineTicketNum, setAirlineTicketNum] = useState("");

  const [pickupLocationId, setPickupLocationId] = useState(null);
  const [dropoffLocationId, setDropoffLocationId] = useState(null);
  const [newCustomerDetail, setNewCustomerDetail] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  const bookingDocURL = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(bookingDocURL?.search),
    [bookingDocURL?.search]
  );
  const TariffGroupIdParam = parseInt(queryParams?.get("tariffGroupId"));
  const TariffVehicleNameParam = queryParams?.get("vehicleName");
  console.log(`TariffVehicleNameParam ${TariffVehicleNameParam}`);
  const vehicleType = TariffVehicleNameParam.split("-")[1]?.trim();
  console.log(`vehicleType ${vehicleType}`);

  const addOnsFromUrl = queryParams?.get("addOns").split(",").map(Number);

  const startDateValue = queryParams?.get("startDate");
  const returnDateValue = queryParams?.get("endDate");
  const pickupTimeParam = queryParams?.get("pickupTime");
  const dropoffTimeParam = queryParams?.get("dropoffTime");

  const [pickupHour, pickupMinute] = pickupTimeParam?.split(":");
  const startDateTime = new Date(startDateValue);
  startDateTime.setHours(parseInt(pickupHour, 10));
  startDateTime.setMinutes(parseInt(pickupMinute, 10));
  const startDateTimeISO = startDateTime?.toISOString();

  const [dropoffHour, dropoffMinute] = dropoffTimeParam?.split(":");
  const dropoffDateTime = new Date(returnDateValue);
  dropoffDateTime.setHours(parseInt(dropoffHour, 10));
  dropoffDateTime.setMinutes(parseInt(dropoffMinute, 10));
  const dropoffDateTimeISO = dropoffDateTime?.toISOString();

  const vehiclePriceParam = parseInt(queryParams?.get("vehiclePrice"));
  const numberOfDays = queryParams?.get("totalNoOfDays");
  const vehiclePricePerDay = parseFloat(
    vehiclePriceParam / numberOfDays
  ).toFixed(2);

  const discountedValueParam = queryParams?.get("discountValue");
  const totalGrandPriceParam = queryParams?.get("grandTotalCharges");
  const deliveryChargesParam = parseInt(
    queryParams?.get("totalDeliveryCharges")
  );

  const totalGrandPriceWithTax = parseInt(totalGrandPriceParam);

  const totalGrandPriceWithoutTax = totalGrandPriceWithTax / (1 + 0.05);
  const taxValue = parseFloat(
    (totalGrandPriceWithTax - totalGrandPriceWithoutTax).toFixed(2)
  );

  console.log(`taxValue ${taxValue}`);

  const pickupLocParam = queryParams?.get("pickupLoc");
  const dropoffLocParam = queryParams?.get("dropoffLoc");
  const checkBoxValueParam = queryParams?.get("checkBoxValue");

  let pickdropCombineLoc;
  if (checkBoxValueParam === true) {
    pickdropCombineLoc = `pickup: ${pickupLocParam}, dropoff: ${dropoffLocParam}`;
  } else {
    pickdropCombineLoc = `pickup: ${pickupLocParam}, dropoff: ${pickupLocParam}`;
  }

  const pickupLocStateParam = queryParams?.get("pickupLocState");
  const dropoffLocStateParam = queryParams?.get("dropoffLocState");

  const today = new Date();
  const invoiceExpiryDate = new Date(today);
  invoiceExpiryDate.setDate(today.getDate() + 5);
  const paymentLinkExpiryDate = invoiceExpiryDate?.toISOString().split("T")[0];

  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const nationalityOptions = response?.data
          .map((country) => ({
            label: country?.name?.common,
            value: country?.cca2,
          }))
          .sort((a, b) => a?.label?.localeCompare(b?.label));

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
      const fetchedAvailableLocations = response?.data?.result?.items;

      const matchedPickupLocation = fetchedAvailableLocations?.find(
        (location) =>
          location?.name?.toUpperCase() === pickupLocStateParam?.toUpperCase()
      );
      const matchedDropoffLocation = fetchedAvailableLocations?.find(
        (location) =>
          location?.name?.toUpperCase() === dropoffLocStateParam?.toUpperCase()
      );

      if (matchedPickupLocation) {
        setPickupLocationId(matchedPickupLocation?.id);
      }
      if (matchedDropoffLocation) {
        setDropoffLocationId(matchedDropoffLocation?.id);
      }
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, [dropoffLocStateParam, pickupLocStateParam]);

  useEffect(() => {
    fetchAvailableLocationsData();
  }, [fetchAvailableLocationsData]);

  const handleDrivingLicenseImgChange = (e) => {
    const file = e.target.files[0];
    console.log(`handleDrivingLicenseImgChange --- `, file?.name);
    getCustomerUploadedImgUrl(file, "Driving License");
  };

  // Get Customer's Documents URL

  const getCustomerUploadedImgUrl = async (file, documentType) => {
    try {
      const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      formData.append("file", file);

      const url = `https://app.speedautosystems.com/api/UploadFile`;

      const response = await axios.post(url, formData, { headers });
      const fetchedRequiredImgUrl = response?.data?.Result?.url;

      console.log(
        `fetchedRequiredImgUrl response for ${documentType} is: -- ${JSON.stringify(
          fetchedRequiredImgUrl
        )}`
      );
      setDrivingLicenseImg(fetchedRequiredImgUrl);
    } catch (error) {
      console.error("Error while creating img url of documents", error);
    }
  };

  // Create Customer API

  const createCustomer = async (data) => {
    console.log("creatingg customer", data);
    setLoadingCustomer(true);
    document.body.classList.add("loadings");

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

      if (response?.data && response?.data?.success && response?.data?.result) {
        console.log(
          "create customer success if method console - - - - - -- done"
        );
        // alert("alert customer created...");
        getCustomerDetails(response?.data?.result);
      } else {
        const errorMessage = response?.data?.error?.message;
        toast.error(errorMessage, {
          autoClose: 2000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            lineHeight: "18px",
            fontSize: "14px",
          },
        });
        console.error("Unexpected response structure:", response?.data);
      }
    } catch (error) {
      console.error("Error creating/updating customer:", error);
    } finally {
      setLoadingCustomer(false);
      document.body.classList.remove("loadings");
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
        // alert("alert customer get details...");
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

    const getUpdatedPrice = (addOn, numberOfDays, carCategory) => {
      switch (addOn?.addOnsName) {
        case "CDW (Collision Damage Waiver)":
          console.log("In CDW add on numberOfDays", numberOfDays);
          if (numberOfDays >= 1 && numberOfDays < 7) {
            console.log(
              `carCategory === "HatchBack" ? 20 : 30; ${carCategory}`
            );
            return carCategory === "HatchBack" ? 20 : 30;
          } else if (numberOfDays >= 7 && numberOfDays <= 21) {
            console.log(
              `carCategory === "HatchBack" ? 20 : 30; ${carCategory}`
            );

            return carCategory === "HatchBack" ? 15 : 20;
          } else if (numberOfDays > 21) {
            console.log(
              `carCategory === "HatchBack" ? 20 : 30; ${carCategory}`
            );

            return carCategory === "HatchBack" ? 10 : 15;
          }
          break;
        case "Baby Seat":
          console.log("In baby seat add on", numberOfDays);
          if (numberOfDays >= 1 && numberOfDays < 7) return 20;
          if (numberOfDays >= 7 && numberOfDays <= 21)
            return Math.round((120 / 7) * numberOfDays);
          if (numberOfDays > 21) return Math.round((400 / 30) * numberOfDays);
          break;
        case "Mobile Holder":
          console.log("In mobile holder add on", numberOfDays);
          if (numberOfDays >= 1 && numberOfDays < 7) return 5;
          if (numberOfDays >= 7 && numberOfDays <= 21)
            return Math.round((10 / 7) * numberOfDays);
          if (numberOfDays > 21) return Math.round((20 / 30) * numberOfDays);
          break;
        case "Sunshades":
          console.log("In sunshade add on");
          if (numberOfDays >= 1 && numberOfDays < 7) return 10;
          if (numberOfDays >= 7 && numberOfDays <= 21)
            return Math.round((30 / 7) * numberOfDays);
          if (numberOfDays > 21) return Math.round((50 / 30) * numberOfDays);
          break;
        case "PAI (Personal Accident Insurance)":
          console.log("In PAI add on", numberOfDays);
          if (numberOfDays >= 1 && numberOfDays < 7) {
            console.log(`PAI === ; ${numberOfDays}`);

            return 15;
          }
          if (numberOfDays >= 7 && numberOfDays <= 21) {
            console.log(`PAI === ; ${numberOfDays}`);

            return 10;
          }
          if (numberOfDays > 21) {
            console.log(`PAI === ; ${numberOfDays}`);

            return 5;
          }
          break;
        default:
          return addOn?.pricePerTrip;
      }
    };

    const charges = [
      {
        accepted: true,
        tariff: [
          {
            id: 97430,
          },
        ],
        chargesTypeId: 1,
        rate: vehiclePricePerDay,
        rateTypeId: 1,
      },
      // 1 below
      {
        accepted: addOnsFromUrl?.includes(2),
        tariff: [
          {
            id: 97433,
          },
        ],
        chargesTypeId: 2,
        rate: getUpdatedPrice(
          { addOnsName: "CDW (Collision Damage Waiver)" },
          numberOfDays,
          TariffVehicleNameParam
        ),
        rateTypeId: 1,
      },
      // 2 Below
      {
        accepted: addOnsFromUrl?.includes(3),
        tariff: [
          {
            id: 97438,
          },
        ],
        chargesTypeId: 3,
        rate: getUpdatedPrice(
          { addOnsName: "PAI (Personal Accident Insurance)" },
          numberOfDays,
          TariffVehicleNameParam
        ),
        rateTypeId: 1,
      },
      {
        accepted: addOnsFromUrl?.includes(4),
        tariff: [
          {
            id: 97439,
          },
        ],
        chargesTypeId: 4, // Fuel
        rate: 0,
        rateTypeId: 1,
      },
      // 4 Below
      {
        accepted: addOnsFromUrl?.includes(5),
        tariff: [],
        chargesTypeId: 5, // Milage
        rate: 0.5,
        rateTypeId: 5,
      },
      // 5 Below
      {
        accepted: true,
        tariff: [
          {
            id: 97443,
          },
        ],
        chargesTypeId: 26, // DeliveryCharges
        rate: deliveryChargesParam,
        rateTypeId: 6,
      },
      // 6 Below

      {
        accepted: addOnsFromUrl?.includes(28),
        tariff: [],
        chargesTypeId: 28, // DamageCharges
        rate: 0,
        rateTypeId: 6,
      },
      // 7 below
      {
        accepted: addOnsFromUrl?.includes(7),
        tariff: [
          {
            id: 97446,
          },
        ],
        chargesTypeId: 7, // Tolls
        rate: 0,
        rateTypeId: 6,
      },
      // 8 Below
      {
        accepted: addOnsFromUrl?.includes(19),
        tariff: [],
        chargesTypeId: 19,
        rate: getUpdatedPrice(
          { addOnsName: "Baby Seat" },
          numberOfDays,
          TariffVehicleNameParam
        ),
        rateTypeId: 6,
      },
      // 9 Below
      {
        accepted: addOnsFromUrl?.includes(73),
        tariff: [
          {
            id: 97448,
          },
        ],
        chargesTypeId: 73, // DarbTolls
        rate: 0,
        rateTypeId: 6,
      },
      // 10 Below
      {
        accepted: addOnsFromUrl?.includes(74),
        tariff: [
          {
            id: 97449,
          },
        ],
        chargesTypeId: 74, // DarbTollsSurcharge
        rate: 0,
        rateTypeId: 6,
      },
      // 11 Below
      {
        accepted: addOnsFromUrl?.includes(8),
        tariff: [
          {
            id: 97450,
          },
        ],
        chargesTypeId: 8, // Fines
        rate: 0,
        rateTypeId: 6,
      },
      // 12 Below
      {
        accepted: addOnsFromUrl?.includes(34),
        tariff: [
          {
            id: 97451,
          },
        ],
        chargesTypeId: 34, // FinesSurcharge
        rate: 0,
        rateTypeId: 6,
      },
      // 13 Below
      {
        accepted: addOnsFromUrl?.includes(67),
        tariff: [],
        chargesTypeId: 67, // AirportsurchargesCharges
        rate: 120,
        rateTypeId: 6,
      },
      // 14 Below

      {
        accepted: addOnsFromUrl?.includes(54),
        tariff: [
          {
            id: 97444,
          },
        ],
        // Extra1Charges -> Tint
        chargesTypeId: 54,
        rate: 150,
        rateTypeId: 6,
      },
      // 15 Below
      {
        accepted: addOnsFromUrl?.includes(55),
        tariff: [],
        // Extra2Charges -> Mobile Holder
        chargesTypeId: 55,
        rate: getUpdatedPrice(
          { addOnsName: "Mobile Holder" },
          numberOfDays,
          TariffVehicleNameParam
        ),
        rateTypeId: 6,
      },
      // 16 Below
      {
        accepted: addOnsFromUrl?.includes(58),
        tariff: [],
        // Extra3Charges -> Sunshades
        chargesTypeId: 58,
        rate: getUpdatedPrice(
          { addOnsName: "Sunshades" },
          numberOfDays,
          TariffVehicleNameParam
        ),
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
      flightDateTime: driverFlightDateTime?.toISOString(),
      flightNo: airlineTicketNum,
      locationId: pickupLocationId,
      notes: pickdropCombineLoc,
      tariffGroupId: TariffGroupIdParam,
      isTaxApplicable: false,
      isTaxExempted: false,
      tax: taxValue,
      taxPercent: 5,
      totalCharges: totalGrandPriceWithTax,
    };

    console.log("Updated Booking Data:", bookingData);
    submitBooking(bookingData);
  };

  // Booking API

  const submitBooking = async (data) => {
    console.log("submit booking start");
    setLoadingBooking(true);
    document.body.classList.add("loadings");

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
        // alert("Booking status is: ", bookingStatus);
        console.log("booking done successfully. Time for Payment");

        toast.success("Booking Done Successfully", {
          autoClose: 2000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            lineHeight: "18px",
            fontSize: "14px",
          },
        });

        createInvoice();
      }
    } catch (error) {
      console.error("Error creating/updating booking:", error);
    } finally {
      setLoadingBooking(false);
      document.body.classList.remove("loadings");
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedNationality(selectedOption);
  };

  const handleDrivingLicenseChange = (selectedOption) => {
    setDrivingLicenseIssueBy(selectedOption);
  };

  const handleNextStep = () => {
    const customerDetailsMissingFields = [];
    if (!firstName) {
      customerDetailsMissingFields?.push("First Name");
    }
    if (!contactNum) {
      customerDetailsMissingFields?.push("Contact Number");
    }
    if (!emailAddress) {
      customerDetailsMissingFields?.push("Email Address");
    }

    if (customerDetailsMissingFields?.length > 0) {
      const errorMessage = `${customerDetailsMissingFields?.join(
        ", "
      )} field(s) are missing.`;
      toast.error(errorMessage, {
        autoClose: 3000,
        style: {
          border: "1px solid #c0c0c0",
          fontWeight: "400",
          lineHeight: "18px",
          fontSize: "14px",
        },
      });
      return;
    }

    const customerDocumentsMissingFields = [];
    if (!drivingLicenseNum) {
      customerDocumentsMissingFields?.push("Driving License Number");
    }
    if (!drivingLicenseIssueBy) {
      customerDocumentsMissingFields?.push("Driving License Issued Country");
    }
    if (!drivingLicenseIssueDate) {
      customerDocumentsMissingFields?.push("Driving License Issued Date");
    }
    if (!drivingLicenseExpiryDate) {
      customerDocumentsMissingFields?.push("Driving License Expiry Date");
    }
    if (!drivingLicenseImg) {
      customerDocumentsMissingFields?.push("Driving License Image");
    }

    console.log(
      "2-------customerDetailsMissingFields",
      customerDocumentsMissingFields
    );
    if (customerDocumentsMissingFields?.length > 0) {
      const errorMessage = `${customerDocumentsMissingFields?.join(
        ", "
      )} field(s) are missing.`;
      toast.error(errorMessage, {
        autoClose: 3000,
        style: {
          border: "1px solid #c0c0c0",
          fontWeight: "400",
          lineHeight: "18px",
          fontSize: "14px",
        },
      });
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

    const parsedPhoneNumber = parsePhoneNumberFromString(
      `+${contactNum}`,
      country?.name
    );
    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      toast.error("Please enter a valid phone number.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Creating Customer Data

    const createCustomerData = {
      firstName: firstName,
      lastName: lastName,
      mobileNo: `+${contactNum}`,
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
          issuedBy: drivingLicenseIssueBy?.label,
        },
      ],
    };

    await createCustomer(createCustomerData);
  };

  // Payment APIs
  const createInvoice = async () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const url = `${process.env.REACT_APP_MILELE_API_URL}/invoice/createPaymentInvoice`;
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
          description: TariffVehicleNameParam,
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

    console.log(`before hitting API, body is: `, body);
    try {
      const response = await axios.post(url, body, { headers });
      console.log(`response of payment API is: `, response?.data);

      if (response?.data && response?.data?.status === "success") {
        await toast.info("Generating Payment link", {
          autoClose: 3000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            lineHeight: "18px",
            fontSize: "14px",
          },
        });
        console.log("Invoice Created, Payment URL:", response?.data?.status);
        setPaymentUrl(response?.data?.status);
        const nextStepUrl = `/bookingPage/3&booking-success`;
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
      backgroundColor: isSelected ? "#e87a28" : "white",
      ":hover": {
        backgroundColor: isSelected ? "#e87a28" : "rgb(229, 229, 229)",
      },
    }),
  };
  return (
    <div>
      <Helmet>
        <title>Customer booking details - Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
        <link
          rel="canonical"
          href="https://milelecarrental.com/bookingPage/2"
        />
      </Helmet>
      <div className="vehicle-details-location-main-div pt-3 pb-3">
        <Container fluid className="pt-4">
          <>
            <form
              action="#"
              className="booking-documents-form"
              onSubmit={handleAddOnsDocumentStepForm}
            >
              {loadingCustomer && (
                <div className="reloading-icon-booking-page-container text-center">
                  <span className="loader-text">
                    Customer Verification . . .
                  </span>
                  <div className="lds-dual-ring text-center"></div>
                </div>
              )}
              {loadingBooking && (
                <div className="reloading-icon-booking-page-container text-center">
                  <span className="loader-text">Create Booking . . .</span>
                  <div className="lds-dual-ring text-center"></div>
                </div>
              )}
              <div className="step1-car-location-details-container">
                <div className="step1-location-details p-4">
                  <div className="location-label">
                    <div className="booking-doc-headings styled-label">
                      <BsPersonCircle className="mr-2 heading-icon" />
                      <b>Customer's Details</b>
                    </div>
                  </div>

                  <div className="driver-details-form-container">
                    <div className=" form-group  pr-4">
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
                              {/* <input
                                className="form-control-location mt-2 col-12"
                                type="tel"
                                required
                                placeholder="Contact number"
                                value={contactNum}
                                onChange={(e) => setContactNum(e.target.value)}
                              /> */}
                              <PhoneInput
                                className="form-control-customer-number mt-2 col-12"
                                country={"ae"}
                                name="phoneNumber"
                                value={contactNum}
                                placeholder="00 000 0000"
                                showDropdown={false}
                                disableDropdown={false}
                                countryCodeEditable={true}
                                onChange={(phone, country) => {
                                  setContactNum(phone);
                                  setCountry(country);
                                }}
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
                <br />
                <div className="step1-car-details p-4">
                  <div className="location-label">
                    <div className="booking-doc-headings styled-label">
                      <BsFileEarmarkArrowUp className="mr-2 heading-icon" />
                      <b>Documents Upload</b>
                    </div>
                    <div className="driver-details-form-container">
                      <div className=" form-group  pr-4">
                        <div className="">
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
                                  // value={drivingLicenseImg}
                                  onChange={(e) =>
                                    handleDrivingLicenseImgChange(e)
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
                    <div className="booking-doc-headings styled-label">
                      <BsPersonCircle className="mr-2 heading-icon" />
                      <b>Driver's Details </b>
                    </div>
                  </div>
                  <br />
                  <div className="driver-details-form-container">
                    <div className=" form-group  pr-4">
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
                                className="form-control-nationality col-12 nationality-dropdown"
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
                    <button
                      onClick={handleNextStep}
                      className="map-loc-middle py-3"
                    >
                      <span className="animate-button btn4">Book & Pay</span>
                    </button>
                    <ToastContainer />
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

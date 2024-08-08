/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { BsPersonCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
import { toast } from "react-hot-toast";
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
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getWithExpiry } from "../Utils/localStorageUtils";

const AddOnsDocuments = ({ prevStep, nextStep }) => {
  const storedUserData = useMemo(
    () => getWithExpiry("userLocationData") || {},
    []
  );

  const userLocData = storedUserData?.userData;
  const bookingDocURL = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(bookingDocURL?.search),
    [bookingDocURL?.search]
  );

  const checkBoxValueParam =
    String(userLocData?.showDropoff) || queryParams?.get("checkBoxValue");

  const [errorFields, setErrorFields] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [country, setCountry] = useState({ dialCode: "971", name: "UAE" });
  const [emailAddress, setEmailAddress] = useState("");
  const [selectedNationality, setSelectedNationality] = useState(null);

  // Customer Data
  const [customerDetails, setCustomerDetails] = useState("");
  const auth = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const user_id = auth?.data._id;
  const user_customerSpeedId = auth?.data?.customerIdFromSpeed;
  const user_token = auth?.token;
  const user_nationality = auth?.data?.nationality;
  // const user_token = auth?.token;

  const customerLocationLocalStorage = useMemo(
    () => JSON.parse(localStorage.getItem("userLocationData")),
    []
  );
  const locationData = customerLocationLocalStorage?.value?.userData;
  const pickUpLocData = locationData?.pickupLocation?.label;
  const dropOffLocValue = locationData?.dropoffLocation?.label;
  const dropOffLocData =
    checkBoxValueParam === "false" ? pickUpLocData : dropOffLocValue;

  console.log("PickupLoc loal storage value is: ---:", pickUpLocData);
  console.log("dropOffLocData loal storage value is: ---:", dropOffLocData);

  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    }),
    [user_token]
  );

  const updateLocalStorage = (newUserData) => {
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  // Driving License
  // const [drivingLicenseNum, setDrivingLicenseNum] = useState("");
  // const [drivingLicenseIssueBy, setDrivingLicenseIssueBy] = useState("");
  // const [drivingLicenseIssueDate, setDrivingLicenseIssueDate] = useState("");
  // const [drivingLicenseExpiryDate, setDrivingLicenseExpiryDate] = useState("");
  // const [drivingLicenseImg, setDrivingLicenseImg] = useState("");
  // const [isInternationalLicense, setIsInternationalLicense] = useState("");
  // Other Fields
  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [pickupLocationId, setPickupLocationId] = useState("");
  const [dropoffLocationId, setDropoffLocationId] = useState("");
  const [newCustomerDetail, setNewCustomerDetail] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");

  const TariffGroupIdParam = parseInt(queryParams?.get("tariffGroupId"));
  const TariffVehicleNameParam = queryParams?.get("vehicleName");
  // const vehicleType = TariffVehicleNameParam.split("-")[1]?.trim();

  const addOnsFromUrl = queryParams?.get("addOns").split(",").map(Number);

  const startDateValue =
    userLocData?.dateRange?.startDate || queryParams?.get("startDate");
  const returnDateValue =
    userLocData?.dateRange?.endDate || queryParams?.get("endDate");
  const pickupTimeParam =
    userLocData?.pickUpTime || queryParams?.get("pickupTime");
  const dropoffTimeParam =
    userLocData?.dropOffTime || queryParams?.get("dropoffTime");

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

  const pickupLocParam =
    userLocData?.pickupLocation?.label || queryParams?.get("pickupLoc");
  const dropoffLocParam =
    userLocData?.dropoffLocation?.label || queryParams?.get("dropoffLoc");

  let pickdropCombineLoc;
  if (checkBoxValueParam === "true") {
    pickdropCombineLoc = `pickup: ${pickupLocParam}, dropoff: ${dropoffLocParam}`;
  } else {
    pickdropCombineLoc = `pickup: ${pickupLocParam}, dropoff: ${pickupLocParam}`;
  }

  const today = new Date();
  const invoiceExpiryDate = new Date(today);
  invoiceExpiryDate.setDate(today.getDate() + 5);
  const paymentLinkExpiryDate = invoiceExpiryDate?.toISOString().split("T")[0];

  useEffect(() => {
    const fetchNationalities = async () => {
      let allCountries = [];
      let offset = 0;
      const limit = 1000;
      let hasMore = true;

      try {
        while (hasMore) {
          const response = await axios.get(
            `https://api.first.org/data/v1/countries?limit=${limit}&offset=${offset}`
          );
          const data = response?.data?.data;
          allCountries = [
            ...allCountries,
            ...Object.keys(data).map((key) => ({
              label: data[key]?.country,
              value: key,
            })),
          ];
          offset += limit;
          hasMore = response?.data?.total > offset;
        }
        allCountries.sort((a, b) => a.label.localeCompare(b.label));
        setNationalityOptions(allCountries);
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
          location?.name?.toUpperCase() === pickupLocParam?.toUpperCase()
      );
      const matchedDropoffLocation = fetchedAvailableLocations?.find(
        (location) =>
          location?.name?.toUpperCase() === dropoffLocParam?.toUpperCase()
      );
      console.log("matchedPickupLocation ", matchedPickupLocation);
      console.log("matchedDropoffLocation ", matchedDropoffLocation);

      if (matchedPickupLocation) {
        setPickupLocationId(matchedPickupLocation?.id);
      }
      if (matchedDropoffLocation) {
        setDropoffLocationId(matchedDropoffLocation?.id);
      }
    } catch (error) {
      console.error("Error fetching vehicle rates:", error);
    }
  }, [dropoffLocParam, pickupLocParam]);

  useEffect(() => {
    fetchAvailableLocationsData();
  }, [fetchAvailableLocationsData]);

  // const handleDrivingLicenseImgChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(`handleDrivingLicenseImgChange --- `, file?.name);
  //   getCustomerUploadedImgUrl(file, "Driving License");
  // };

  // Get Customer's Documents URL

  // const getCustomerUploadedImgUrl = async (file, documentType) => {
  //   const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "multipart/form-data",
  //   };

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   const url = `https://app.speedautosystems.com/api/UploadFile`;

  //   toast.dismiss();
  //   toast.promise(
  //     (async () => {
  //       try {
  //         const response = await axios.post(url, formData, { headers });
  //         const fetchedRequiredImgUrl = response?.data?.Result?.url;

  //         console.log(
  //           `fetchedRequiredImgUrl response for ${documentType} is: -- ${JSON.stringify(
  //             fetchedRequiredImgUrl
  //           )}`
  //         );
  //         setDrivingLicenseImg(fetchedRequiredImgUrl);
  //       } catch (error) {
  //         console.error("Error while creating img url of documents", error);
  //         throw error;
  //       }
  //     })(),
  //     {
  //       loading: `Uploading ${documentType} image...`,
  //       success: `Successfully uploaded ${documentType} image!`,
  //       error: `Failed to upload ${documentType} image.`,
  //     },
  //     {
  //       duration: 3000,
  //     }
  //   );
  // };

  // Get Customer Data From Mongo DB backend

  const fetchMongoDBCustomerData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MILELE_API_URL}/customer/profile/${user_id}`,
        // `http://localhost:8000/api/v1/customer/profile/${user_id}`,
        config
      );

      const result = response?.data;

      console.log("response?.data", response?.data);

      setCustomerDetails(response?.data);
      setFirstName(result?.customerData?.fName);
      setLastName(result?.customerData?.lName);
      setContactNum(result?.customerData?.phoneNumber);
      setEmailAddress(result?.customerData?.email);
      setSelectedNationality({
        label: user_nationality,
        value: user_nationality,
      });
    } catch (error) {
      console.error("Error fetching customer data : ", error);
    }
  }, [config, user_id, user_nationality]);

  useEffect(() => {
    if (auth) {
      fetchMongoDBCustomerData();
    }
  }, [auth, fetchMongoDBCustomerData]);

  // Create Own Customer API
  const createOwnDBCustomer = async (idFromSpeed) => {
    const last4Digits = contactNum.slice(-4);
    const password = `${firstName}${last4Digits}`;

    const normalizedContactNum = contactNum.startsWith("+")
      ? contactNum
      : `+${contactNum}`;

    const formData = {
      fName: firstName,
      lName: lastName,
      phoneNumber: normalizedContactNum,
      email: emailAddress,
      password,
      passwordConfirm: password,
      nationality: selectedNationality,
      customerIdFromSpeed: idFromSpeed,
    };

    console.log("formData : ", formData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MILELE_API_URL}/customer/create`,
        // `http://localhost:8000/api/v1/customer/create`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("Customer created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating customer:",
        error.response ? error.response.data : error.message
      );
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
    }
  };
  // Create Speed Customer API
  const createCustomer = async (data) => {
    console.log("creating customer", data);

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
    toast.dismiss();
    toast.promise(
      (async () => {
        try {
          const response = await axios.post(url, payload, { headers });
          console.log(
            "===created customer response--------:",
            response?.data?.result
          );

          if (
            response?.data &&
            response?.data?.success === true &&
            response?.data?.result
          ) {
            console.log(
              "create customer success if method console - - - - - -- done",
              response?.data?.result
            );

            if (!auth && !auth?.data) {
              try {
                await createOwnDBCustomer(response?.data?.result);
              } catch (createDBError) {
                console.error(
                  "Error creating customer in own DB:",
                  createDBError
                );
                throw new Error(
                  createDBError.response
                    ? createDBError.response.data.message
                    : createDBError.message
                );
              }
            }

            getCustomerDetails(response?.data?.result);
            return response?.data?.result;
          } else {
            const errorMessage =
              response?.data?.error?.message ||
              "An error occurred while creating the customer.";
            console.error("Unexpected response structure:", response?.data);
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error("Error creating/updating customer:", error);
          throw new Error(
            error.response ? error.response.data.message : error.message
          );
        }
      })(),
      {
        loading: "Creating...",
        success: "Customer created successfully!",
        error: (error) => `Failed: ${error.message || error}`,
      },
      {
        duration: 2000,
      }
    );
  };

  // get Customer Detail API

  const getCustomerDetails = async (customerID) => {
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

    console.log(
      "requested id in Speed get customer is: ",
      requestNewCustomerId
    );

    try {
      const response = await axios.post(url, requestNewCustomerId, { headers });

      setNewCustomerDetail();

      if (response?.data?.success) {
        console.log("get customer response--------:", response?.data?.result);

        createBooking(
          response?.data?.result?.id,
          response?.data?.result?.firstName,
          response?.data?.result?.lastName,
          response?.data?.result?.mobileNo,
          response?.data?.result?.email
        );

        return response?.data?.result;
      } else {
        console.log("User ID is incorrect");
        throw new Error("User ID is incorrect");
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch customer details"
      );
    }
  };

  const createBooking = async (
    newId,
    customerFName,
    customerLName,
    customerMobileNo,
    customerEmail
  ) => {
    const getUpdatedPrice = (addOn, numberOfDays, carCategory) => {
      switch (addOn?.addOnsName) {
        case "CDW (Collision Damage Waiver)":
          if (numberOfDays > 0 && numberOfDays < 7) {
            return carCategory === "HatchBack" ? 20 : 30;
          } else if (numberOfDays >= 7 && numberOfDays <= 21) {
            return carCategory === "HatchBack" ? 15 : 20;
          } else if (numberOfDays > 21) {
            return carCategory === "HatchBack" ? 10 : 15;
          }
          break;
        case "Baby Seat":
          if (numberOfDays > 0 && numberOfDays < 7) return 20;
          if (numberOfDays >= 7 && numberOfDays <= 21)
            return Math.round((120 / 7) * numberOfDays);
          if (numberOfDays > 21) return Math.round((400 / 30) * numberOfDays);
          break;
        case "Mobile Holder":
          if (numberOfDays > 0 && numberOfDays < 7) return 5;
          if (numberOfDays >= 7 && numberOfDays <= 21)
            return Math.round((10 / 7) * numberOfDays);
          if (numberOfDays > 21) return Math.round((20 / 30) * numberOfDays);
          break;
        case "Sunshades":
          if (numberOfDays > 0 && numberOfDays < 7) return 10;
          if (numberOfDays >= 7 && numberOfDays <= 21)
            return Math.round((30 / 7) * numberOfDays);
          if (numberOfDays > 21) return Math.round((50 / 30) * numberOfDays);
          break;
        case "PAI (Personal Accident Insurance)":
          if (numberOfDays >= 1 && numberOfDays < 7) {
            console.log(`PAI === ; ${numberOfDays}`);
            return 15;
          }
          if (numberOfDays >= 7 && numberOfDays <= 21) {
            return 10;
          }
          if (numberOfDays > 21) {
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
      closingLocationId:
        checkBoxValueParam === "true" ? dropoffLocationId : pickupLocationId,
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

    toast.dismiss();
    toast.promise(
      (async () => {
        try {
          console.log("Before exact booking, payload data is: ", payload);
          const response = await axios.post(url, payload, { headers });
          console.log("Finallll Booking response--------:", response?.data);
          console.log(
            "After Booking checking customer detail response--------:",
            newCustomerDetail
          );

          const responseResult = response?.data?.success;

          if (responseResult === true) {
            console.log("booking done successfully. Time for Payment");

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "purchase",
              carTypeName: TariffVehicleNameParam,
              numberOfDays: numberOfDays,
              deliveryCharge: deliveryChargesParam,
              grandTotalPrice: totalGrandPriceParam,
            });

            createInvoice();
            return response?.data;
          } else {
            throw new Error("Booking failed.");
          }
        } catch (error) {
          console.error("Error creating/updating booking:", error);
          throw error;
        }
      })(),
      {
        loading: "Submit Booking...",
        success: "Booking submitted successfully!",
        error: (error) =>
          `Failed to submit booking: ${error?.message || error}`,
      },
      {
        duration: 2000,
      }
    );
  };

  // const handleDrivingLicenseChange = (selectedOption) => {
  //   setDrivingLicenseIssueBy(selectedOption);
  // };

  const handleNationalityChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setSelectedNationality(selectedOption);
  };

  const handleAddOnsDocumentStepForm = async (e) => {
    e.preventDefault();

    const newErrorFields = {};
    const customerDetailsMissingFields = [];
    if (!firstName) {
      newErrorFields.firstName = true;
      customerDetailsMissingFields?.push("First Name");
    }
    if (!contactNum) {
      newErrorFields.contactNum = true;
      customerDetailsMissingFields?.push("Contact Number");
    }
    if (!emailAddress) {
      newErrorFields.emailAddress = true;
      customerDetailsMissingFields?.push("Email Address");
    }

    if (!selectedNationality) {
      newErrorFields.selectedNationality = true;
      customerDetailsMissingFields?.push("Nationality");
    }
    setErrorFields(newErrorFields);

    if (customerDetailsMissingFields?.length > 0) {
      const errorMessageMultiple = `${customerDetailsMissingFields.join(
        ", "
      )} fields are missing.`;
      const errorMessageSingle = `${customerDetailsMissingFields.join(
        ", "
      )} field is missing.`;

      const errorMessage =
        customerDetailsMissingFields?.length === 1
          ? errorMessageSingle
          : errorMessageMultiple;

      toast.dismiss();
      toast(errorMessage, {
        duration: 2000,
      });
      return;
    }

    // if (!user_customerSpeedId) {
    //   const newErrorFields = {};
    //   const customerDocumentsMissingFields = [];
    //   if (!drivingLicenseNum) {
    //     newErrorFields.drivingLicenseNum = true;
    //     customerDocumentsMissingFields?.push("Driving License Number");
    //   }
    //   if (!drivingLicenseIssueBy) {
    //     newErrorFields.drivingLicenseIssueBy = true;
    //     customerDocumentsMissingFields?.push("Driving License Issued Country");
    //   }
    //   if (!drivingLicenseIssueDate) {
    //     newErrorFields.drivingLicenseIssueDate = true;
    //     customerDocumentsMissingFields?.push("Driving License Issued Date");
    //   }
    //   if (!drivingLicenseExpiryDate) {
    //     newErrorFields.drivingLicenseExpiryDate = true;
    //     customerDocumentsMissingFields?.push("Driving License Expiry Date");
    //   }
    //   if (!isInternationalLicense) {
    //     newErrorFields.isInternationalLicense = true;
    //     customerDocumentsMissingFields?.push(
    //       "Driving License International or not"
    //     );
    //   }

    //   setErrorFields(newErrorFields);

    //   if (customerDocumentsMissingFields?.length > 0) {
    //     const errorMessageMultiple = `${customerDocumentsMissingFields.join(
    //       ", "
    //     )} fields are missing.`;
    //     const errorMessageSingle = `${customerDocumentsMissingFields.join(
    //       ", "
    //     )} field is missing.`;

    //     const errorMessage =
    //       customerDocumentsMissingFields?.length === 1
    //         ? errorMessageSingle
    //         : errorMessageMultiple;

    //     toast.dismiss();
    //     toast(errorMessage, {
    //       duration: 2000,
    //     });
    //     return;
    //   }
    // }

    if (!user_customerSpeedId) {
      const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      if (!isEmailValid(emailAddress)) {
        toast.dismiss();
        toast("Please enter a valid email address.", {
          duration: 2500,
        });
        return;
      }

      const normalizedContactNum = contactNum.startsWith("+")
        ? contactNum
        : `+${contactNum}`;

      const parsedPhoneNumber = parsePhoneNumberFromString(
        normalizedContactNum,
        country?.name
      );

      if (!parsedPhoneNumber || !parsedPhoneNumber?.isValid()) {
        console.log(" phone numbe - ", contactNum);
        toast.dismiss();
        toast("Please enter a valid phone number.", {
          duration: 2500,
        });
        return;
      }

      // Creating Customer Data in Speed
      const createCustomerData = {
        firstName: firstName,
        lastName: lastName,
        mobileNo: normalizedContactNum,
        email: emailAddress,
        nationality: selectedNationality?.label || user_nationality,
        identityDocuments: [
          {
            documentNo: "0",
            // expiryDate: drivingLicenseExpiryDate,
            identityDocumentType: 4,
            // isInternational: isInternationalLicense,
            // issueDate: drivingLicenseIssueDate,
            // gallaryImages: [
            //   {
            //     url: drivingLicenseImg,
            //   },
            // ],
            // images: [
            //   {
            //     url: drivingLicenseImg,
            //   },
            // ],
            issuedBy: "United Arab Emirates (the)",
          },
        ],
      };

      const customerId = await createCustomer(createCustomerData);
      console.log("Create customer id : ", customerId);
      if (customerId) {
        console.log("in if of create customer");
        getCustomerDetails(customerId);
      }
    } else {
      console.log("in Else of create customer");
      getCustomerDetails(user_customerSpeedId);
    }
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
    toast.dismiss();
    toast.promise(
      (async () => {
        try {
          const response = await axios.post(url, body, { headers });
          console.log(`response of payment API is: `, response?.data);

          if (response?.data && response?.data?.status === "success") {
            console.log(
              "Invoice Created, Payment URL:",
              response?.data?.status
            );
            setPaymentUrl(response?.data?.status);
            const nextStepUrl = `/bookingPage/3&booking-success`;
            window.location.href = nextStepUrl;
          } else {
            throw new Error("Failed to generate payment link.");
          }
        } catch (error) {
          console.error("Failed to create invoice:", error);
          throw error;
        }
      })(),
      {
        loading: "Generating Payment link...",
        success: "Payment link generated successfully!",
        error: "Failed to generate payment link.",
      },
      {
        duration: 2000,
      }
    );
  };

  const selectStylesError = {
    control: (provided, { hasValue }) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid white",
      boxShadow: "none",
      lineHeight: "32px",
      // marginLeft: "-13px",
      // marginRight: "-13px",
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

  const selectStylesVisibleOnly = {
    control: (provided, { hasValue }) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid rgb(184, 184, 184)",
      boxShadow: "none",
      lineHeight: "32px",
      borderRadius: "6px",
      ":hover": {
        border: "1px solid rgb(184, 184, 184)",
      },
      marginLeft: "-13px",
      marginRight: "-13px",
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

  const selectStyles = {
    control: (provided, { hasValue }) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid rgb(184, 184, 184)",
      boxShadow: "none",
      lineHeight: "32px",
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
    <HelmetProvider>
      <Helmet>
        <title>Customer booking details | Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
        <link
          rel="canonical"
          href="https://www.milelecarrental.com/bookingPage/2"
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
              <h1 className="text-center d-none">Booking Data Form</h1>
              <div className="step1-car-location-details-container">
                <div className="step1-location-details p-4">
                  <div className="location-label">
                    <div className="booking-doc-headings styled-label">
                      <BsPersonCircle className="mr-2 heading-icon" />
                      <h2 className="booking-page-h1">
                        {" "}
                        <b>Customer's Details</b>
                      </h2>
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
                                  <b>
                                    <span
                                      className={` ${
                                        errorFields?.firstName
                                          ? "select-error-label"
                                          : ""
                                      }`}
                                    >
                                      First Name *
                                    </span>
                                  </b>
                                </label>
                              </div>
                              <input
                                className={`form-control-location mt-2 col-12 ${
                                  errorFields?.firstName ? "border-red" : ""
                                }`}
                                type="text"
                                placeholder="First name"
                                readOnly={auth && user_token}
                                value={firstName}
                                onChange={(e) => {
                                  if (!(auth && user_token)) {
                                    setFirstName(e.target.value);
                                    if (errorFields?.firstName) {
                                      setErrorFields((prev) => ({
                                        ...prev,
                                        firstName: false,
                                      }));
                                    }
                                  }
                                }}
                                disabled={auth && user_token}
                              />
                            </Form.Group>
                          </Col>

                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>
                                    <span
                                      className={` ${
                                        errorFields?.lastName
                                          ? "select-error-label"
                                          : ""
                                      }`}
                                    >
                                      Last Name
                                    </span>
                                  </b>
                                </label>
                              </div>
                              <input
                                className={`form-control-location mt-2 col-12 ${
                                  errorFields?.lastName ? "border-red" : ""
                                }`}
                                type="text"
                                placeholder="Last name"
                                readOnly={auth && user_token}
                                value={lastName}
                                onChange={
                                  !(auth && user_token)
                                    ? (e) => setLastName(e.target.value)
                                    : undefined
                                }
                                disabled={auth && user_token}
                              />
                            </Form.Group>
                          </Col>

                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>
                                    <span
                                      className={` ${
                                        errorFields?.contactNum
                                          ? "select-error-label"
                                          : ""
                                      }`}
                                    >
                                      Contact No. *
                                    </span>
                                  </b>
                                </label>
                              </div>
                              <PhoneInput
                                className={`form-control-customer-number  mt-2 col-12 ${
                                  errorFields?.contactNum
                                    ? "select-error border-red"
                                    : ""
                                }`}
                                country={"ae"}
                                name="phoneNumber"
                                placeholder="00 000 0000"
                                showDropdown={false}
                                disableDropdown={true}
                                countryCodeEditable={false}
                                inputProps={{
                                  readOnly: auth && user_token,
                                  style: {
                                    backgroundColor: "#e9ecef",
                                  },
                                }}
                                value={contactNum}
                                onChange={(phone, country) => {
                                  if (!(auth && user_token)) {
                                    setContactNum(phone);
                                    setCountry(country);
                                    if (errorFields?.contactNum) {
                                      setErrorFields((prev) => ({
                                        ...prev,
                                        contactNum: false,
                                      }));
                                    }
                                  }
                                }}
                                disabled={auth && user_token}
                              />
                            </Form.Group>
                          </Col>

                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>
                                    <span
                                      className={` ${
                                        errorFields?.emailAddress
                                          ? "select-error-label"
                                          : ""
                                      }`}
                                    >
                                      Email *
                                    </span>
                                  </b>
                                </label>
                              </div>
                              <input
                                className={`form-control-location mt-2 col-12 ${
                                  errorFields?.emailAddress ? "border-red" : ""
                                }`}
                                type="email"
                                placeholder="Email address"
                                readOnly={auth && user_token}
                                value={emailAddress}
                                onChange={(e) => {
                                  if (!(auth && user_token)) {
                                    setEmailAddress(e.target.value);
                                    if (errorFields?.emailAddress) {
                                      setErrorFields((prev) => ({
                                        ...prev,
                                        emailAddress: false,
                                      }));
                                    }
                                  }
                                }}
                                disabled={auth && user_token}
                              />
                            </Form.Group>
                          </Col>

                          <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
                            <Form.Group controlId="formKeyword">
                              <div className="location-label">
                                <label className="styled-label">
                                  <b>
                                    <span
                                      className={` ${
                                        errorFields?.selectedNationality
                                          ? "select-error-label"
                                          : ""
                                      }`}
                                    >
                                      Nationality *
                                    </span>
                                  </b>
                                </label>
                              </div>
                              <Select
                                options={nationalityOptions}
                                className={`form-control-nationality col-12 nationality-dropdown ${
                                  errorFields?.selectedNationality
                                    ? "select-error border-red"
                                    : ""
                                }`}
                                value={selectedNationality}
                                onChange={(value) => {
                                  handleNationalityChange(value);
                                  if (errorFields?.selectedNationality) {
                                    setErrorFields((prev) => ({
                                      ...prev,
                                      selectedNationality: false,
                                    }));
                                  }
                                }}
                                styles={
                                  auth && user_token
                                    ? selectStylesVisibleOnly
                                    : errorFields?.selectedNationality
                                    ? selectStylesError
                                    : selectStyles
                                }
                                isDisabled={auth && user_token}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
                <br />

                {/* {(user_customerSpeedId === null || !auth) && (
                  <>
                    <br />

                    <div className="step1-car-details p-4">
                      <div className="location-label">
                        <div className="booking-doc-headings styled-label">
                          <BsFileEarmarkArrowUp className="mr-2 heading-icon" />
                          <h2 className="booking-page-h1">
                            {" "}
                            <b>Documents Upload</b>
                          </h2>
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
                                        <b>
                                          <span
                                            className={` ${
                                              errorFields?.drivingLicenseNum
                                                ? "select-error-label"
                                                : ""
                                            }`}
                                          >
                                            Driving License No. *
                                          </span>
                                        </b>
                                      </label>
                                    </div>
                                    <input
                                      className={`form-control-location mt-2 col-12 ${
                                        errorFields?.drivingLicenseNum
                                          ? "border-red"
                                          : ""
                                      }`}
                                      type="text"
                                      placeholder="Driving license no."
                                      value={drivingLicenseNum}
                                      onChange={(e) => {
                                        setDrivingLicenseNum(e.target.value);
                                        if (errorFields?.drivingLicenseNum) {
                                          setErrorFields((prev) => ({
                                            ...prev,
                                            drivingLicenseNum: false,
                                          }));
                                        }
                                      }}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col xxl={4} lg={4} md={6} sm={8} xs={12}>
                                  <Form.Group controlId="formKeyword">
                                    <div className="location-label">
                                      <label className="styled-label mb-3">
                                        <b>
                                          <span
                                            className={` ${
                                              errorFields?.drivingLicenseIssueBy
                                                ? "select-error-label"
                                                : ""
                                            }`}
                                          >
                                            Driving License Issued By *
                                          </span>
                                        </b>
                                      </label>
                                    </div>
                                    <Select
                                      options={nationalityOptions}
                                      className={`form-control-nationality col-12 nationality-dropdown ${
                                        errorFields?.drivingLicenseIssueBy
                                          ? "select-error border-red"
                                          : ""
                                      }`}
                                      value={drivingLicenseIssueBy}
                                      onChange={(value) => {
                                        handleDrivingLicenseChange(value);
                                        if (
                                          errorFields?.drivingLicenseIssueBy
                                        ) {
                                          setErrorFields((prev) => ({
                                            ...prev,
                                            drivingLicenseIssueBy: false,
                                          }));
                                        }
                                      }}
                                      styles={
                                        errorFields?.drivingLicenseIssueBy
                                          ? selectStylesError
                                          : selectStyles
                                      }
                                    />
                                  </Form.Group>
                                </Col>

                                <Col xxl={4} lg={4} md={6} sm={8} xs={12}>
                                  <Form.Group controlId="formKeyword">
                                    <div className="location-label">
                                      <label className="styled-label">
                                        <b>
                                          <span
                                            className={` ${
                                              errorFields?.drivingLicenseIssueDate
                                                ? "select-error-label"
                                                : ""
                                            }`}
                                          >
                                            Driving License Issue Date *
                                          </span>
                                        </b>
                                      </label>
                                    </div>

                                    <DateTimePicker
                                      className={`form-control-age mt-2 col-12 ${
                                        errorFields?.drivingLicenseIssueDate
                                          ? "select-error border-red"
                                          : ""
                                      }`}
                                      value={drivingLicenseIssueDate}
                                      onChange={(date) => {
                                        setDrivingLicenseIssueDate(date);
                                        if (
                                          errorFields?.drivingLicenseIssueDate
                                        ) {
                                          setErrorFields((prev) => ({
                                            ...prev,
                                            drivingLicenseIssueDate: false,
                                          }));
                                        }
                                      }}
                                      maxDate={
                                        new Date(
                                          new Date().setHours(0, 0, 0, 0)
                                        )
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                                <Col xxl={4} lg={4} md={6} sm={8} xs={12}>
                                  <Form.Group controlId="formKeyword">
                                    <div className="location-label">
                                      <label className="styled-label">
                                        <b>
                                          <span
                                            className={` ${
                                              errorFields?.drivingLicenseExpiryDate
                                                ? "select-error-label"
                                                : ""
                                            }`}
                                          >
                                            Driving License Expiry Date *
                                          </span>
                                        </b>
                                      </label>
                                    </div>
                                    <DateTimePicker
                                      className={`form-control-age mt-2 col-12 ${
                                        errorFields?.drivingLicenseExpiryDate
                                          ? "border-red"
                                          : ""
                                      }`}
                                      value={drivingLicenseExpiryDate}
                                      onChange={(date) => {
                                        setDrivingLicenseExpiryDate(date);
                                        if (
                                          errorFields?.drivingLicenseExpiryDate
                                        ) {
                                          setErrorFields((prev) => ({
                                            ...prev,
                                            drivingLicenseExpiryDate: false,
                                          }));
                                        }
                                      }}
                                      minDate={new Date(new Date())}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col xxl={4} lg={4} md={6} sm={8} xs={12}>
                                  <Form.Group controlId="formKeyword">
                                    <div className="location-label">
                                      <label className="styled-label">
                                        <b>
                                          <span
                                            className={` ${
                                              errorFields?.pickupLocation
                                                ? "select-error-label"
                                                : ""
                                            }`}
                                          >
                                            Driving License Photo
                                          </span>
                                        </b>
                                      </label>
                                    </div>
                                    <input
                                      className="form-control-fname p-2 col-12 mt-2"
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
                                        <b>
                                          <span
                                            className={` ${
                                              errorFields?.isInternationalLicense
                                                ? "select-error-label"
                                                : ""
                                            }`}
                                          >
                                            Is Driving License International? *
                                          </span>
                                        </b>
                                      </label>
                                    </div>
                                    <div className="mt-2 d-flex">
                                      <Form.Check
                                        className="mb-1 col-4"
                                        id="internationalLicenseTrue"
                                        type="radio"
                                        label="Yes"
                                        name="internationalLicense"
                                        value="true"
                                        checked={
                                          isInternationalLicense === "true"
                                        }
                                        onChange={() => {
                                          setIsInternationalLicense("true");
                                          if (
                                            errorFields?.isInternationalLicense
                                          ) {
                                            setErrorFields((prev) => ({
                                              ...prev,
                                              isInternationalLicense: false,
                                            }));
                                          }
                                        }}
                                      />
                                      <Form.Check
                                        className="mb-1 col-4"
                                        id="internationalLicenseFalse"
                                        type="radio"
                                        label="No"
                                        name="internationalLicense"
                                        value="false"
                                        checked={
                                          isInternationalLicense === "false"
                                        }
                                        onChange={() => {
                                          setIsInternationalLicense("false");
                                          if (
                                            errorFields?.isInternationalLicense
                                          ) {
                                            setErrorFields((prev) => ({
                                              ...prev,
                                              isInternationalLicense: false,
                                            }));
                                          }
                                        }}
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
                  </>
                )} */}

                <div className="booking-button-main-div-step1 d-flex justify-content-center">
                  <Col
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                    className="d-flex justify-content-center"
                  >
                    <button
                      className="map-loc-middle "
                      id="book-pay-final-button"
                      aria-label="Booking & Payment"
                    >
                      <span className="animate-button btn4">Book & Pay</span>
                    </button>
                  </Col>
                </div>
              </div>
            </form>
          </>
        </Container>
      </div>
    </HelmetProvider>
  );
};

export default AddOnsDocuments;

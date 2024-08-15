/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./customerDashboard.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import { HelmetProvider, Helmet } from "react-helmet-async";
import HomePageTopBar from "./../Pages/navbar/homePageTopBar";
import MainNavbar from "./../Pages/navbar/mainNavbar";
import FooterCombination from "./../PrivateComponents/footerCombination";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { FaUserEdit } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import "./myProfile.css";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import { PiPhoneCallFill } from "react-icons/pi";

const CustomerProfilePage = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState({ dialCode: "971", name: "UAE" });
  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState("");
  const [isViewProfileOnly, setIsViewProfileOnly] = useState(true);
  const [customerDetails, setCustomerDetails] = useState({});
  // const [customerProfileImg, setCustomerProfileImg] = useState();

  // Driving License
  const [drivingLicenseNum, setDrivingLicenseNum] = useState("");
  const [drivingLicenseIssueBy, setDrivingLicenseIssueBy] = useState("");
  const [drivingLicenseIssueDate, setDrivingLicenseIssueDate] = useState("");
  const [drivingLicenseExpiryDate, setDrivingLicenseExpiryDate] = useState("");
  const [drivingLicenseImg, setDrivingLicenseImg] = useState("");
  const [isInternationalLicense, setIsInternationalLicense] = useState("");

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const auth = JSON.parse(localStorage?.getItem("user"));
  const authToken = auth?.token;
  const customerSpeedID = auth?.data?.customerIdFromSpeed;
  // const customerProfilePhoto = auth?.data?.customerProfileImg;
  // const customerSpeedID = null;
  const user_nationality = auth?.data?.nationality;

  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    [authToken]
  );

  const navigate = useNavigate();

  const handleEditProfileButton = () => {
    setIsViewProfileOnly(false);
  };

  const handleCancelProfileButton = () => {
    setIsViewProfileOnly(true);
  };

  const handleNationalityChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setSelectedNationality(selectedOption);
  };

  const handleDrivingLicenseChange = (selectedOption) => {
    setDrivingLicenseIssueBy(selectedOption);
  };

  const handleDrivingLicenseImgChange = (e) => {
    const file = e.target.files[0];
    console.log(`handleDrivingLicenseImgChange --- `, file?.name);
    getCustomerUploadedImgUrl(file, "Driving License");
  };

  // const handleUploadCustomerProfileImg = (e) => {
  //   console.log("File is : ", customerProfileImg);

  //   const formData = new FormData();
  //   formData.append("customerProfileImg", customerProfileImg);

  //   axios
  //     .post("http://localhost:8000/upload", formData)
  //     .then((res) => console.log("Response file is: ", res))
  //     .catch((err) => console.log("Error in file react js is : ", err));
  // };

  // Get Customer's Documents URL
  const getCustomerUploadedImgUrl = async (file, documentType) => {
    const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("file", file);

    const url = `https://app.speedautosystems.com/api/UploadFile`;

    toast.dismiss();
    toast.promise(
      (async () => {
        try {
          const response = await axios.post(url, formData, { headers });
          const fetchedRequiredImgUrl = response?.data?.Result?.url;

          console.log(
            `fetchedRequiredImgUrl response for ${documentType} is: -- ${JSON.stringify(
              fetchedRequiredImgUrl
            )}`
          );

          setDrivingLicenseImg(fetchedRequiredImgUrl);
          return fetchedRequiredImgUrl;
        } catch (error) {
          console.error("Error while creating img url of documents", error);
          throw error;
        }
      })(),
      {
        loading: `Uploading ${documentType}...`,
        success: `${documentType} uploaded successfully!`,
        error: (error) =>
          `Failed to upload ${documentType}: ${error.message || error}`,
      },
      {
        duration: 3000,
      }
    );
  };

  // Get Customer Profile from Speed
  const fetchSpeedCustomerProfileDetails = useMemo(
    () => async (customerSpeedID) => {
      try {
        const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const url =
          "https://app.speedautosystems.com/api/services/app/person/GetPersonForEdit";
        const requestNewCustomerId = {
          id: customerSpeedID,
        };

        const response = await axios.post(url, requestNewCustomerId, {
          headers,
        });

        setCustomerDetails(response?.data?.result);
        if (response?.data?.result) {
          console.log("get customer response--------:", response?.data?.result);
          const nationality = response?.data?.result?.nationality;
          const issuedBy =
            response?.data?.result?.identityDocuments?.[0]?.issuedBy;
          setSelectedNationality({ label: nationality, value: nationality });
          setDrivingLicenseIssueBy({ label: issuedBy, value: issuedBy });
        } else {
          console.log("User ID is incorrect");
        }
      } catch (error) {
        console.error("Error creating/updating customer:", error);
      }
    },
    []
  );

  // Get Customer Profile from Own DB
  const fetchOwnCustomerProfileDetails = useMemo(
    () => async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_MILELE_API_URL}/customer/profile/${id}`,
          config
        );

        const customerProfileData = response?.data?.customerData;
        console.log("MongoDB Data is: ", customerProfileData);
        setCustomerDetails(customerProfileData);
      } catch (error) {
        console.error("Error fetching customer profile details:", error);
      }
    },
    [config, id]
  );

  useEffect(() => {
    const fetchProfileDetails = async () => {
      if (customerSpeedID) {
        await fetchSpeedCustomerProfileDetails(customerSpeedID);
      } else {
        await fetchOwnCustomerProfileDetails();
      }
    };

    fetchProfileDetails();
  }, [
    customerSpeedID,
    fetchOwnCustomerProfileDetails,
    fetchSpeedCustomerProfileDetails,
  ]);

  // get List of all Nationalities API
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

  useEffect(() => {
    fetchNationalities();
  }, []);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const valuesComparing = useCallback(() => {
    if (customerDetails) {
      setFName(
        (customerSpeedID
          ? customerDetails?.firstName
          : customerDetails?.fName) || ""
      );
      setLName(
        (customerSpeedID
          ? customerDetails?.lastName
          : customerDetails?.lName) || ""
      );
      setEmail(customerDetails?.email || "");
      setPhoneNumber(
        customerSpeedID
          ? customerDetails?.mobileNo
          : customerDetails?.phoneNumber || ""
      );
      setSelectedNationality(
        customerSpeedID
          ? {
              label: customerDetails?.nationality,
              value: customerDetails?.nationality,
            }
          : {
              label: user_nationality,
              value: user_nationality,
            }
      );

      if (customerDetails?.identityDocuments && customerSpeedID) {
        const doc = customerDetails?.identityDocuments?.[0];
        setDrivingLicenseNum(doc?.documentNo || "");
        setDrivingLicenseIssueBy({
          label: doc?.issuedBy || "",
          value: doc?.issuedBy || "",
        });
        setDrivingLicenseIssueDate(new Date(doc?.issueDate) || "");
        setDrivingLicenseExpiryDate(new Date(doc?.expiryDate) || "");
        setDrivingLicenseImg(doc?.images?.[0]?.url || " ");
        setIsInternationalLicense(doc?.isInternational ? "true" : "false");
      }
    }
  }, [customerDetails, customerSpeedID, user_nationality]);

  useEffect(() => {
    valuesComparing();
  }, [valuesComparing]);

  // Update Customer Profile of Own Backend DB
  const updateCustomerProfileOwnDB = async () => {
    const normalizedContactNum = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;

    const formData = {
      fName,
      lName,
      email,
      phoneNumber: normalizedContactNum,
      nationality: selectedNationality,
    };
    console.log("form data is: ", formData);
    setLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_MILELE_API_URL}/customer/updateprofile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("Update customer in DB: ", response?.data);
      if (response?.data?.status === "success") {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user?.data) {
          user.data.fName = fName;
          user.data.lName = lName;
          user.data.nationality = selectedNationality?.label;
          localStorage.setItem("user", JSON.stringify(user));
        }

        setIsViewProfileOnly(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        console.log("Profile Updated in DB Successfully!");
        setLoading(false);

        return "Profile Updated in DB Successfully!";
      } else {
        console.error("Unexpected response structure:", response?.data);
        setLoading(false);
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      console.error("Error (DB): ", error);
      setLoading(false);
      throw new Error(
        error?.response?.data?.message ||
          "Network Error or Some fields are missing"
      );
    }
  };

  // Update Customer Profile in Speed System

  const updateSpeedCustomerProfileDetails = async () => {
    const normalizedContactNum = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;

    const createCustomerData = {
      firstName: fName,
      lastName: lName,
      mobileNo: normalizedContactNum,
      email: email,
      id: customerSpeedID,
      nationality: selectedNationality?.label,
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
    console.log(
      "Before Update custome in Speed, data is: ",
      createCustomerData
    );

    setLoading(true);

    const token = process.env.REACT_APP_SPEED_API_BEARER_TOKEN;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const url =
      "https://app.speedautosystems.com/api/services/app/person/CreateOrUpdatePerson";
    const payload = {
      person: createCustomerData,
    };

    toast.dismiss();
    toast
      .promise(
        (async () => {
          try {
            const response = await axios.post(url, payload, { headers });
            console.log("updated customer data:", response?.data?.result);

            if (
              response?.data &&
              response?.data?.success &&
              response?.data?.result
            ) {
              console.log(
                "Update customer success if method console - - - - - -- done",
                response?.data?.result
              );

              return response?.data?.result;
            } else {
              const errorMessage =
                response?.data?.error?.message ||
                "An error occurred during the update.";
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
          loading: "Updating profile...",
          success: "Profile Updated Successfully!",
          error: (error) =>
            `Failed to update customer profile: ${error.message || error}`,
        },
        {
          duration: 3000,
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCustomerProfileSaveButton = (e) => {
    e.preventDefault();

    const customerDetailsMissingFields = [];
    if (!fName) {
      customerDetailsMissingFields?.push("First Name");
    }
    if (!lName) {
      customerDetailsMissingFields?.push("Last Name");
    }
    if (!email) {
      customerDetailsMissingFields?.push("Email Address");
    }
    if (!phoneNumber) {
      customerDetailsMissingFields?.push("Phone Number");
    }
    if (!selectedNationality) {
      customerDetailsMissingFields?.push("Nationality ");
    }

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
      toast(errorMessage, {});
      return;
    }

    if (customerSpeedID) {
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

      console.log(
        "2--customerDetailsMissingFields",
        customerDocumentsMissingFields
      );
      if (customerDocumentsMissingFields?.length > 0) {
        const errorMessageMultiple = `${customerDocumentsMissingFields.join(
          ", "
        )} fields are missing.`;
        const errorMessageSingle = `${customerDocumentsMissingFields.join(
          ", "
        )} field is missing.`;

        const errorMessage =
          customerDocumentsMissingFields?.length === 1
            ? errorMessageSingle
            : errorMessageMultiple;

        toast.dismiss();
        toast(errorMessage, {
          duration: 5000,
        });
        return;
      }
    }

    if (!isEmailValid(email)) {
      toast.dismiss();
      toast.error("Please enter a valid email address.", {
        duration: 1500,
      });
      return;
    }

    const normalizedContactNum = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;

    const parsedPhoneNumber = parsePhoneNumberFromString(
      normalizedContactNum,
      country?.name
    );

    if (!parsedPhoneNumber || !parsedPhoneNumber?.isValid()) {
      console.log("Phne Number: ", phoneNumber);

      toast.dismiss();
      toast.error("Please enter a valid phone number.", {
        duration: 2500,
      });
      return;
    }

    const updateProfiles = async () => {
      try {
        const speedCustomerUpdatedDataRes =
          await updateSpeedCustomerProfileDetails();
        console.log(
          " speedCustomerUpdatedDataRes ",
          speedCustomerUpdatedDataRes
        );
        await updateCustomerProfileOwnDB();
      } catch (error) {
        console.error("Error updating profiles:", error);
      }
    };

    updateProfiles();
  };

  const selectStylesViewOnly = {
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
    <>
      <HelmetProvider>
        <Helmet>
          <title>My Profile | Car Rental without Deposit</title>
          <meta
            name="description"
            content="Discover the best car rental service in Dubai with zero deposit and flexible payment options. Choose from a wide range of vehicles at Milele Car Rental. Rent now and enjoy special offers!"
          />
          <meta name="keywords" content="keywords" />
          <link rel="canonical" href="https://www.milelecarrental.com/" />
        </Helmet>

        <HomePageTopBar />
        <div className="navbar-div-container">
          <MainNavbar />
        </div>

        <Container>
          <br />
          <div className="customer-profile-container">
            {" "}
            <div className="customer-profile-icon-container d-flex align-items-center">
              <div className="customer-profile-icon">
                {isViewProfileOnly ? <FaUser /> : <FaUserEdit />}
              </div>
              <div className="customer-profile-icon-data">
                {/* {isViewProfileOnly ? (
                  <>
                    <h4>
                      <strong>
                        {customerSpeedID
                          ? customerDetails?.firstName
                          : customerDetails?.fName}
                      </strong>  <strong>
                        {customerSpeedID
                          ? customerDetails?.lastName
                          : customerDetails?.lName}
                      </strong>
                    </h4>
                    <span>
                      Speed:{" "}
                      {customerSpeedID
                        ? customerDetails?.mobileNo
                        : customerDetails?.phoneNumber}
                    </span>
                  </>
                ) : (
                  <>
                    <button
                      className="upload-customer-button"
                      onClick={() => handleImageClick(blogData?.id)}
                    >
                      Upload Photo
                    </button>
                  </>
                )} */}

                <>
                  <h4>
                    <strong>
                      {customerSpeedID
                        ? customerDetails?.firstName
                        : customerDetails?.fName}
                    </strong>{" "}
                    <strong>
                      {customerSpeedID
                        ? customerDetails?.lastName
                        : customerDetails?.lName}
                    </strong>
                  </h4>
                  <span>
                    {" "}
                    <strong>
                      <PiPhoneCallFill /> :{" "}
                    </strong>
                    {customerSpeedID
                      ? customerDetails?.mobileNo
                      : customerDetails?.phoneNumber}
                  </span>
                </>
              </div>
            </div>
            {/* {isViewProfileOnly ? (
              <div className="d-flex flex-column align-items-end">
                <img
                  src={
                    !customerSpeedID
                      ? customerDetails?.customerProfileImg
                          ?.url
                      : " No image Found"
                  }
                  alt="Loading..."
                  className="driving-license-img"
                  title={"customer Profile Img"}
                />
              </div>
            ) : (
              <>
                <input
                  autoComplete="off"
                  id="customerProfileImg"
                  name="customerProfileImg"
                  className="form-control-fname p-2 col-12 mt-2"
                  type="file"
                  placeholder="customer Profile Img"
                  // value={customerProfileImg}
                  onChange={(e) => handleUploadCustomerProfileImg(e)}
                  disabled={isViewProfileOnly}
                />
              </>
            )} */}
            <div className="customer-profile-form">
              <h3 className="personal-detail-heading">
                <strong>Personal Details</strong>
              </h3>
              <>
                <form
                  action="#"
                  className="customer-details-profile-form"
                  // onSubmit={handleContactUsSubmitButton}
                >
                  <div className="form-group customer-personal-detail-div row">
                    <Form.Group className="col-lg-6 col-md-6 col-sm-6 pt-4">
                      <label
                        className="customer-profile-details-label"
                        htmlFor="fname"
                      >
                        <h6>
                          {" "}
                          First Name
                          <span className="required-field-star">*</span>
                        </h6>
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="First Name"
                        className="form-control form-control-customer-profile-details"
                        id="fname"
                        name="fname"
                        required
                        value={fName}
                        // value={
                        //   customerSpeedID
                        //     ? customerDetails?.firstName
                        //     : customerDetails?.fName
                        // }
                        onChange={(e) => {
                          setFName(e.target.value);
                        }}
                        readOnly={isViewProfileOnly}
                      />
                    </Form.Group>

                    <Form.Group className="col-lg-6 col-md-6 col-sm-6 pt-4">
                      <label
                        className="customer-profile-details-label"
                        htmlFor="lname"
                      >
                        <h6>
                          {" "}
                          Last Name
                          <span className="required-field-star">*</span>
                        </h6>
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="Last Name"
                        className="form-control form-control-customer-profile-details"
                        id="lname"
                        name="lname"
                        required
                        value={lName}
                        // value={
                        //   customerSpeedID
                        //     ? customerDetails?.lastName
                        //     : customerDetails?.lName
                        // }
                        onChange={(e) => {
                          setLName(e.target.value);
                        }}
                        readOnly={isViewProfileOnly}
                      />
                    </Form.Group>

                    <Form.Group className="col-lg-6 col-md-6 col-sm-6 pt-4">
                      <label
                        className="customer-profile-details-label"
                        htmlFor="email"
                      >
                        <h6>
                          {" "}
                          Email
                          <span className="required-field-star">*</span>
                        </h6>
                      </label>

                      <input
                        className="form-control form-control-customer-profile-details"
                        id="email1"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        required
                        value={email}
                        // value={
                        //   customerSpeedID
                        //     ? customerDetails?.email
                        //     : customerDetails?.email
                        // }
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        disabled
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group className=" col-lg-6 col-md-6 col-sm-6 col-xs-12 pt-4">
                      <label className="customer-profile-details-label">
                        <b>Nationality</b>{" "}
                        <span className="required-field-star">*</span>
                      </label>

                      <div className="custom-dropdown-container">
                        <Select
                          options={nationalityOptions}
                          className="form-control-nationality col-12 nationality-dropdown"
                          // value={
                          //   customerSpeedID
                          //     ? selectedNationality
                          //     : {
                          //         label: user_nationality,
                          //         value: user_nationality,
                          //       }
                          // }
                          value={selectedNationality}
                          onChange={handleNationalityChange}
                          styles={
                            isViewProfileOnly
                              ? selectStylesViewOnly
                              : selectStyles
                          }
                          isDisabled={isViewProfileOnly}
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pt-4">
                      <label
                        className="customer-profile-details-label"
                        htmlFor="phoneNumber "
                      >
                        <h6>
                          {" "}
                          Phone Number
                          <span className="required-field-star">*</span>
                        </h6>
                      </label>

                      <PhoneInput
                        className="form-control form-control-customer-profile-details-phone-input form-control-consultation-number col-12"
                        country={"ae"}
                        name="phoneNumber"
                        value={phoneNumber}
                        // value={
                        //   customerSpeedID
                        //     ? customerDetails?.mobileNo
                        //     : customerDetails?.phoneNumber
                        // }
                        placeholder="00 000 0000"
                        showDropdown={false}
                        disableDropdown={false}
                        countryCodeEditable={true}
                        inputProps={{
                          readOnly: isViewProfileOnly,
                          style: {
                            backgroundColor: "#e9ecef",
                          },
                        }}
                        onChange={
                          !isViewProfileOnly
                            ? (phone, country) => {
                                setPhoneNumber(`+${phone}`);
                                setCountry(country);
                              }
                            : undefined
                        }
                      />
                    </Form.Group>
                  </div>

                  {drivingLicenseNum !== "0" && (
                    <>
                      <br />
                      <br />

                      <h3 className="personal-detail-heading">
                        <strong>Driving License Details</strong>
                      </h3>
                      <div className="form-group customer-personal-detail-div ">
                        <Row>
                          <Col
                            xxl={6}
                            lg={6}
                            md={6}
                            sm={6}
                            xs={12}
                            className="pt-4"
                          >
                            <Form.Group controlId="formKeyword">
                              <label
                                className="customer-profile-details-label"
                                htmlFor="drivingLicenseNum"
                              >
                                <h6>
                                  {" "}
                                  Driving License Number
                                  <span className="required-field-star">*</span>
                                </h6>
                              </label>
                              <input
                                autoComplete="off"
                                id="drivingLicenseNum"
                                name="drivingLicenseNum"
                                className="form-control-location mt-2 col-12"
                                required
                                type="text"
                                placeholder="Driving license no."
                                // value={
                                //   customerSpeedID
                                //     ? customerDetails?.identityDocuments?.[0]
                                //         ?.documentNo
                                //     : ""
                                // }
                                value={drivingLicenseNum}
                                onChange={(e) =>
                                  setDrivingLicenseNum(e.target.value)
                                }
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                          <Col
                            xxl={6}
                            lg={6}
                            md={6}
                            sm={6}
                            xs={12}
                            className="pt-4"
                          >
                            <Form.Group controlId="formKeyword">
                              <label
                                className="customer-profile-details-label"
                                htmlFor="drivingLicenseIssueBy"
                              >
                                <h6>
                                  {" "}
                                  Issued By
                                  <span className="required-field-star">*</span>
                                </h6>
                              </label>
                              <Select
                                autoComplete="off"
                                id="drivingLicenseIssueBy"
                                name="drivingLicenseIssueBy"
                                options={nationalityOptions}
                                required
                                className="form-control-nationality col-12"
                                value={drivingLicenseIssueBy}
                                onChange={handleDrivingLicenseChange}
                                styles={
                                  isViewProfileOnly
                                    ? selectStylesViewOnly
                                    : selectStyles
                                }
                                isDisabled
                              />
                            </Form.Group>
                          </Col>

                          <Col
                            xxl={6}
                            lg={6}
                            md={6}
                            sm={6}
                            xs={12}
                            className="pt-4"
                          >
                            <Form.Group controlId="formKeyword">
                              <label
                                className="customer-profile-details-label"
                                htmlFor="drivingLicenseIssueDate"
                              >
                                <h6>
                                  {" "}
                                  Issue Date
                                  <span className="required-field-star">*</span>
                                </h6>
                              </label>

                              <DateTimePicker
                                autoComplete="off"
                                id="drivingLicenseIssueDate"
                                name="drivingLicenseIssueDate"
                                className="form-control-age mt-2 col-12"
                                // value={
                                //   customerSpeedID
                                //     ? customerDetails?.identityDocuments?.[0]
                                //         ?.issueDate
                                //     : " "
                                // }
                                value={drivingLicenseIssueDate}
                                onChange={setDrivingLicenseIssueDate}
                                maxDate={
                                  new Date(new Date().setHours(0, 0, 0, 0))
                                }
                                disabled
                              />
                            </Form.Group>
                          </Col>
                          <Col
                            xxl={6}
                            lg={6}
                            md={6}
                            sm={6}
                            xs={12}
                            className="pt-4"
                          >
                            <Form.Group controlId="formKeyword">
                              <label
                                className="customer-profile-details-label"
                                htmlFor="drivingLicenseExpiryDate"
                              >
                                <h6>
                                  {" "}
                                  Expiry Date
                                  <span className="required-field-star">*</span>
                                </h6>
                              </label>
                              <DateTimePicker
                                autoComplete="off"
                                id="drivingLicenseExpiryDate"
                                name="drivingLicenseExpiryDate"
                                className="form-control-age mt-2 col-12"
                                // value={
                                //   customerSpeedID
                                //     ? customerDetails?.identityDocuments?.[0]
                                //         ?.expiryDate
                                //     : " "
                                // }
                                value={drivingLicenseExpiryDate}
                                onChange={setDrivingLicenseExpiryDate}
                                minDate={
                                  !customerSpeedID && new Date(new Date())
                                }
                                disabled
                              />
                            </Form.Group>
                          </Col>
                          <Col
                            xxl={6}
                            lg={6}
                            md={6}
                            sm={6}
                            xs={12}
                            className="pt-4"
                          >
                            <Form.Group controlId="formKeyword">
                              <label
                                className="customer-profile-details-label"
                                htmlFor="drivingLicenseImg"
                              >
                                <h6>
                                  {" "}
                                  Driving License Photo
                                  <span className="required-field-star">*</span>
                                </h6>
                              </label>

                              {isViewProfileOnly ? (
                                <div className="d-flex flex-column align-items-end">
                                  <img
                                    src={
                                      customerSpeedID
                                        ? customerDetails
                                            ?.identityDocuments?.[0]
                                            ?.images?.[0]?.url
                                        : " No image Found"
                                    }
                                    alt="Loading..."
                                    className="driving-license-img"
                                    title={"Driving License"}
                                  />
                                </div>
                              ) : (
                                <>
                                  <input
                                    autoComplete="off"
                                    id="drivingLicenseImg"
                                    name="drivingLicenseImg"
                                    className="form-control-fname p-2 col-12 mt-2"
                                    type="file"
                                    placeholder="driving license"
                                    // value={drivingLicenseImg}
                                    onChange={(e) =>
                                      handleDrivingLicenseImgChange(e)
                                    }
                                    disabled
                                  />
                                </>
                              )}
                            </Form.Group>
                          </Col>
                          <Col
                            xxl={6}
                            lg={6}
                            md={6}
                            sm={6}
                            xs={12}
                            className="pt-4"
                          >
                            <Form.Group controlId="formKeyword">
                              <label
                                className="customer-profile-details-label"
                                htmlFor="internationalLicense"
                              >
                                <h6>
                                  {" "}
                                  Is Driving License International?
                                  <span className="required-field-star">*</span>
                                </h6>
                              </label>
                              <div className="mt-2 d-flex justify-content-center">
                                <Form.Check
                                  autoComplete="off"
                                  id="internationalLicenseTrue"
                                  name="internationalLicense"
                                  className="mb-1 col-4"
                                  type="radio"
                                  label="Yes"
                                  value="true"
                                  checked={isInternationalLicense === "true"}
                                  // checked={
                                  //   customerSpeedID
                                  //     ? customerDetails?.identityDocuments?.[0]
                                  //         ?.isInternational === true
                                  //     : false
                                  // }
                                  onChange={() =>
                                    setIsInternationalLicense("true")
                                  }
                                  disabled
                                />
                                <Form.Check
                                  autoComplete="off"
                                  className="mb-1 col-4"
                                  id="internationalLicenseFalse"
                                  type="radio"
                                  label="No"
                                  name="internationalLicense"
                                  value="false"
                                  checked={isInternationalLicense === "false"}
                                  // checked={
                                  //   customerSpeedID
                                  //     ? customerDetails?.identityDocuments?.[0]
                                  //         ?.isInternational === false
                                  //     : true
                                  // }
                                  onChange={() =>
                                    setIsInternationalLicense("false")
                                  }
                                  disabled
                                />
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    </>
                  )}

                  <div className="form-group-3 col-lg-12 pb-4">
                    <div className="col-lg-12 col-md-6 d-flex justify-content-end">
                      {isViewProfileOnly ? (
                        <>
                          <button
                            className="edit-customer-profile-button"
                            onClick={() => handleEditProfileButton()}
                            disabled={loading}
                          >
                            <strong> Edit Profile</strong>
                          </button>
                        </>
                      ) : (
                        <>
                          <Row className="d-flex">
                            <Col>
                              <button
                                className="cancel-customer-profile-button"
                                onClick={() => handleCancelProfileButton()}
                                disabled={loading}
                              >
                                <strong>Cancel</strong>
                              </button>
                            </Col>
                            <Col>
                              <button
                                className="save-customer-profile-button"
                                onClick={handleCustomerProfileSaveButton}
                                disabled={loading}
                              >
                                <strong>
                                  {" "}
                                  {loading ? "Saving..." : "Save"}
                                </strong>
                              </button>
                            </Col>
                          </Row>
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </>
            </div>
          </div>
        </Container>
        <FooterCombination />
      </HelmetProvider>
    </>
  );
};

export default CustomerProfilePage;

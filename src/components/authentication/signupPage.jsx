/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./authentication.css";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SuccessGifWebP from "../images/auth-gif-after-edited.gif";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const SignupPage = ({ onCloseModal, setGif }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState(null);
  const [errorFields, setErrorFields] = useState({});

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState({ dialCode: "971", name: "UAE" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }

    if (location.pathname) {
      localStorage.setItem("lastUrl", `${location.pathname}${location.search}`);
    }
  }, [navigate, location.pathname, location.search]);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignupFormSubmit = async (e) => {
    e.preventDefault();
    const newErrorFields = {};
    const signupFormMissingFields = [];

    if (!fName) {
      newErrorFields.fName = true;
      signupFormMissingFields.push("First Name ");
    }
    if (!email) {
      newErrorFields.email = true;
      signupFormMissingFields.push("Email ");
    }
    if (!phoneNumber) {
      newErrorFields.phoneNumber = true;
      signupFormMissingFields.push("Phone Number");
    }
    if (!selectedNationality) {
      newErrorFields.selectedNationality = true;
      signupFormMissingFields.push("Nationality ");
    }
    if (!password) {
      newErrorFields.password = true;
      signupFormMissingFields.push("Password");
    }
    if (!passwordConfirm) {
      newErrorFields.passwordConfirm = true;
      signupFormMissingFields.push("Password Confirm ");
    }

    setErrorFields(newErrorFields);

    console.log("signupFormMissingFields : ", signupFormMissingFields);
    if (signupFormMissingFields?.length > 0) {
      const errorMessageMultiple = `${signupFormMissingFields.join(
        ", "
      )} fields are missing.`;
      const errorMessageSingle = `${signupFormMissingFields.join(
        ", "
      )} field is missing.`;

      const errorMessage =
        signupFormMissingFields?.length === 1
          ? errorMessageSingle
          : errorMessageMultiple;

      toast.dismiss();
      toast(errorMessage, {
        duration: 3000,
      });
      return;
    }

    if (!isEmailValid(email)) {
      toast.dismiss();
      toast("Please enter a valid email address.", {
        duration: 2500,
      });
      return;
    }

    if (password !== passwordConfirm) {
      toast.dismiss();
      toast("Passwords do not match!", {
        duration: 2500,
      });
      return;
    }

    const normalizedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;

    const parsedPhoneNumber = parsePhoneNumberFromString(
      normalizedPhoneNumber,
      country?.name
    );

    if (!parsedPhoneNumber || !parsedPhoneNumber?.isValid()) {
      toast.dismiss();
      toast("Please enter a valid phone number.", {
        duration: 2500,
      });
      return;
    }

    if (signupFormMissingFields.length <= 0) {
      let trimmedEmail = email.trim();

      const formData = {
        fName,
        lName,
        phoneNumber: normalizedPhoneNumber,
        nationality: selectedNationality,
        email: trimmedEmail,
        password,
        passwordConfirm,
      };
      console.log("form data is: ", formData);
      setLoading(true);
      toast.dismiss();

      toast
        .promise(
          axios.post(
            `${process.env.REACT_APP_MILELE_API_URL}/customer/create`,
            // `http://localhost:8000/api/v1/customer/create`,
            formData,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          ),
          {
            loading: "Creating your account...",
            success: (response) => {
              if (response?.data?.status === "success") {
                setGif(SuccessGifWebP);
                setTimeout(() => {
                  const lastUrl = localStorage.getItem("lastUrl") || "/";
                  navigate(lastUrl);
                  onCloseModal();
                }, 3200);
                return "Account created successfully!";
              } else {
                throw new Error("Some fields are missing");
              }
            },
            error: (error) => {
              console.log("Error : ", error);
              const errorMessage =
                error?.response?.data?.message || "Some fields are missing";
              return `${errorMessage}`;
            },
          },
          {
            duration: 2000,
          }
        )
        .catch((err) => {
          console.error("Error while creating account : ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_MILELE_API_URL}/freeConsultationForm/countries`
          // `http://localhost:8000/api/v1/freeConsultationForm/countries`
        );
        const data = response?.data?.data;

        const options = data
          .map((country) => ({
            label: country.label,
            value: country.value,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setNationalityOptions(options);
      } catch (error) {
        console.error("Failed to fetch nationalities:", error);
      }
    };

    fetchNationalities();
  }, []);

  const handleNationalityChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setSelectedNationality(selectedOption);
  };
  const selectStylesError = {
    control: (provided, { hasValue }) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid white",
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
          <title>Signup | Milele Car Rental Application </title>
          <meta
            name="description"
            content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
          />
          <meta name="keywords" content="keywords" />
        </Helmet>

        <div className="container mt-3">
          <form
            action="#"
            className="signup-form"
            onSubmit={handleSignupFormSubmit}
          >
            <div className="form-group row">
              <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label className="signup-form-label">
                  <b>
                    <span
                      className={` ${
                        errorFields?.fName ? "select-error-label" : ""
                      }`}
                    >
                      First Name*
                    </span>
                  </b>
                </label>

                <div className=" custom-dropdown-container">
                  <input
                    className={`form-control-signup col-12 ${
                      errorFields?.fName ? "border-red" : ""
                    }`}
                    name="fName"
                    type="text"
                    autoComplete="fName"
                    placeholder="First Name"
                    value={fName}
                    onChange={(e) => {
                      setFName(e.target.value);
                      if (errorFields?.fName) {
                        setErrorFields((prev) => ({
                          ...prev,
                          fName: false,
                        }));
                      }
                    }}
                  />
                </div>
              </div>
              <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <br className="br-for-small-screen" />

                <label className="signup-form-label">
                  <b>Last Name</b>
                </label>

                <div className=" custom-dropdown-container">
                  <input
                    className="form-control-signup col-12"
                    name="lName"
                    type="text"
                    autoComplete="lName"
                    placeholder="Last Name"
                    value={lName}
                    onChange={(e) => {
                      setLName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label className="signup-form-label">
                  <b>
                    <span
                      className={` ${
                        errorFields?.email ? "select-error-label" : ""
                      }`}
                    >
                      Email*
                    </span>
                  </b>
                </label>

                <div className=" custom-dropdown-container">
                  <input
                    className={`form-control-signup col-12 ${
                      errorFields?.email ? "border-red" : ""
                    }`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorFields?.email) {
                        setErrorFields((prev) => ({
                          ...prev,
                          email: false,
                        }));
                      }
                    }}
                  />
                </div>
              </div>

              <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <br className="br-for-small-screen" />
                <label className="signup-form-label">
                  <b>
                    <span
                      className={` ${
                        errorFields?.selectedNationality
                          ? "select-error-label"
                          : ""
                      }`}
                    >
                      Nationality*
                    </span>
                  </b>
                </label>

                <div className=" custom-dropdown-container">
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
                      errorFields?.selectedNationality
                        ? selectStylesError
                        : selectStyles
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="signup-form-label">
                <b>
                  <span
                    className={` ${
                      errorFields?.phoneNumber ? "select-error-label" : ""
                    }`}
                  >
                    Contact No. *
                  </span>
                </b>
              </label>

              <div className=" custom-dropdown-container">
                <PhoneInput
                  className={`form-control form-control-contact-us-phone-input form-control-phone-number col-12 ${
                    errorFields?.phoneNumber ? "select-error border-red" : ""
                  }`}
                  country={"ae"}
                  name="phoneNumber"
                  value={phoneNumber}
                  placeholder="00 000 0000"
                  showDropdown={false}
                  disableDropdown={false}
                  countryCodeEditable={true}
                  onChange={(phone, country) => {
                    setPhoneNumber(phone);
                    setCountry(country);
                    if (errorFields?.phoneNumber) {
                      setErrorFields((prev) => ({
                        ...prev,
                        phoneNumber: false,
                      }));
                    }
                  }}
                />
              </div>
            </div>
            <br />

            <div className="signup-form-input-container">
              <label className="signup-form-label">
                <b>
                  <span
                    className={` ${
                      errorFields?.password ? "select-error-label" : ""
                    }`}
                  >
                    Password*
                  </span>
                </b>
              </label>

              <div className=" custom-dropdown-container">
                <input
                  className={`form-control-signup col-12 ${
                    errorFields?.password ? "border-red" : ""
                  }`}
                  name="password"
                  type="password"
                  autoComplete="currentPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorFields?.password) {
                      setErrorFields((prev) => ({
                        ...prev,
                        password: false,
                      }));
                    }
                  }}
                />
              </div>
            </div>
            <br />
            <div className="signup-form-input-container">
              <label className="signup-form-label">
                <b>
                  <span
                    className={` ${
                      errorFields?.passwordConfirm ? "select-error-label" : ""
                    }`}
                  >
                    Confirm Password*
                  </span>
                </b>
              </label>

              <div className=" custom-dropdown-container">
                <input
                  className={`form-control-signup col-12 ${
                    errorFields?.passwordConfirm ? "border-red" : ""
                  }`}
                  name="confirm-password"
                  type="password"
                  autoComplete="confirmPassword"
                  placeholder="Confirm Password"
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                    if (errorFields?.passwordConfirm) {
                      setErrorFields((prev) => ({
                        ...prev,
                        passwordConfirm: false,
                      }));
                    }
                  }}
                />
              </div>
            </div>
            <br />

            <Row className="align-items-center">
              <Col className="text-right">
                <button
                  className="signup-button"
                  aria-label="Create Account"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </Col>
            </Row>
          </form>
        </div>
      </HelmetProvider>
    </>
  );
};

export default SignupPage;

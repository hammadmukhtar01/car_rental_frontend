/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./authentication.css";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const SignupPage = ({ onCloseModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState(null);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [nationality, setsetNationality] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState({ dialCode: "971", name: "UAE" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    // Password match validation
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    const parsedPhoneNumber = parsePhoneNumberFromString(
      `+${phoneNumber}`,
      country?.name
    );
    if (!parsedPhoneNumber || !parsedPhoneNumber?.isValid()) {
      toast.error("Please enter a valid phone number.", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    setLoading(true);
    document.body.classList.add("loadings");

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const formData = {
      fName,
      lName,
      phoneNumber,
      nationality: selectedNationality?.label,
      email,
      password,
      passwordConfirm,
    };
    try {
      console.log("Data is: ", formData);
      const response = await axios.post(
        `http://localhost:8000/api/v1/customer/create`,
        // `${process.env.REACT_APP_MILELE_API_URL}/customer/create`,
        formData,
        { headers }
      );

      if (response?.data?.status === "success") {
        toast.success("Account Created Successfully!", {
          autoClose: 2000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            fontSize: "14px",
          },
          onClose: () => {
            const lastUrl = localStorage.getItem("lastUrl") || "/";
            console.log("lastUrl : ", lastUrl);
            navigate(lastUrl);
            onCloseModal();
          },
        });
      } else {
        toast.warning("Some fields are missing", {
          autoClose: 2000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            fontSize: "14px",
          },
        });
      }
    } catch (error) {
      toast.error(
        `${error?.response?.data?.message}` || "Some fields are missing",
        {
          autoClose: 2000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            lineHeight: "18px",
            fontSize: "14px",
          },
        }
      );
    } finally {
      setLoading(false);
      document.body.classList.remove("loadings");
    }
  };

  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await axios.get(
          "https://api.first.org/data/v1/countries"
        );
        const data = response?.data?.data;
        const options = Object.keys(data)
          .map((key) => ({
            label: data[key]?.country,
            value: key,
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
    setSelectedNationality(selectedOption);
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
    <>
      <HelmetProvider>
        <Helmet>
          <title>Signup | Milele Car Rental Application </title>
          <meta
            name="description"
            content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
          />
          <meta name="keywords" content="keywords" />
          {/* <link rel="canonical" href="https://milelecarrental.com/signup" /> */}
        </Helmet>

        {loading && (
          <div className="reloading-icon-free-consultation-form-container text-center">
            <span className="loader-text">Creating account . . .</span>
            <div className="lds-dual-ring text-center"></div>
          </div>
        )}

        <div className="container mt-3">
          <form action="#" className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group row">
              <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label className="signup-form-label">
                  <b>First Name</b>
                </label>

                <div className=" custom-dropdown-container">
                  <input
                    className="form-control-signup col-12"
                    name="fName"
                    type="text"
                    autoComplete="fName"
                    required
                    placeholder="First Name"
                    value={fName}
                    onChange={(e) => {
                      setFName(e.target.value);
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
                    name={`${lName}`}
                    type="text"
                    autoComplete="lname"
                    required
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
                  <b>Email</b>
                </label>

                <div className=" custom-dropdown-container">
                  <input
                    className="form-control-signup col-12"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <br className="br-for-small-screen" />
                <label className="signup-form-label">
                  <b>Nationality</b>
                </label>

                <div className=" custom-dropdown-container">
                  <Select
                    options={nationalityOptions}
                    className="form-control-nationality col-12 nationality-dropdown"
                    value={selectedNationality}
                    onChange={handleNationalityChange}
                    styles={selectStyles}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="signup-form-label">
                <b>Phone Number</b>
              </label>

              <div className=" custom-dropdown-container">
                <PhoneInput
                  className="form-control form-control-contact-us-phone-input form-control-consultation-number col-12"
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
                  }}
                />
              </div>
            </div>
            <br />

            <div className="signup-form-input-container">
              <label className="signup-form-label">
                <b>Password</b>
              </label>

              <div className=" custom-dropdown-container">
                <input
                  className="form-control-signup col-12"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <br />
            <div className="signup-form-input-container">
              <label className="signup-form-label">
                <b>Confirm Password</b>
              </label>

              <div className=" custom-dropdown-container">
                <input
                  className="form-control-signup col-12"
                  name="confirm-password"
                  type="password"
                  autoComplete="confirm-password"
                  required
                  placeholder="Confirm Password"
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                />
              </div>
            </div>
            <br />

            <Row className="align-items-center">
              <Col className="text-right">
                <button className="signup-button">Create Account</button>
              </Col>
            </Row>
            <ToastContainer />
          </form>
        </div>
      </HelmetProvider>
    </>
  );
};

export default SignupPage;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./authentication.css";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SignupPage = ({onCloseModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
    nationality: "",
  });

  // useEffect(() => {
  //   const auth = localStorage.getItem("user");
  //   if (auth) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }

    if (location.pathname) {
      localStorage.setItem("lastUrl", `${location.pathname}${location.search}`);
    }
  }, [navigate, location.pathname, location.search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    const inputGroup = e.target.closest(".inputgroup");
    if (inputGroup) {
      inputGroup.classList.add("input-filled");
    }
  };

  const handleBlur = (e) => {
    const inputGroup = e.target.closest(".inputgroup");
    if (inputGroup) {
      if (e.target.value === "") {
        inputGroup.classList.remove("input-filled");
      }
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    document.body.classList.add("loadings");

    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
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
      toast.error(`${error?.response?.data?.message}`, {
        autoClose: 2000,
        style: {
          border: "1px solid #c0c0c0",
          fontWeight: "400",
          lineHeight: "18px",
          fontSize: "14px",
        },
      });
    } finally {
      setLoading(false);
      document.body.classList.remove("loadings");
    }
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
        <section className="ftco-section">
          <div className="container">
            <div className="login-row justify-content-center">
              <div className="col-lg-12 signup-wrap">
                <div className="">
                  <p className="text-center have-account-text">SignUp Page</p>
                  <form
                    action="#"
                    className="signup-form"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group row">
                      <div className="inputgroup col-lg-6 col-md-6 col-sm-6">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="firstName"
                          name="fName"
                          required
                          value={formData?.fName}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="firstName">first name</label>
                      </div>

                      <div className="inputgroup col-lg-6 col-md-6 col-sm-6">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="lastName"
                          name="lName"
                          required
                          value={formData?.lName}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="lastName">last name</label>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="inputgroup col-lg-6 col-md-6 col-sm-12">
                        <input
                          className="form-control"
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="off"
                          required
                          value={formData?.email}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="email">email</label>
                      </div>

                      <div className="inputgroup col-lg-6 col-md-6 col-sm-12">
                        <input
                          className="form-control"
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          autoComplete="off"
                          required
                          value={formData?.phoneNumber}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="phoneNumber">phone number</label>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="inputgroup col-lg-6 col-md-6 col-sm-6">
                        <input
                          className="form-control"
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="off"
                          required
                          value={formData?.password}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="password">password</label>
                      </div>

                      <div className="inputgroup col-lg-6 col-md-6 col-sm-6">
                        <input
                          className="form-control"
                          id="passwordConfirm"
                          name="passwordConfirm"
                          type="password"
                          autoComplete="off"
                          required
                          value={formData?.passwordConfirm}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="confirmPassword">
                          confirm password
                        </label>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="inputgroup col-lg-6 col-md-6 col-sm-6">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="nationality"
                          name="nationality"
                          required
                          value={formData?.nationality}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="nationality">nationality</label>
                      </div>
                    </div>

                    <div className="form-group-2">
                      <div className="col-lg-12">
                        <p className="mt-2 text-center">
                          Already have an account?{" "}
                          <a href="/login" className="click-here ms-1">
                            Log In
                          </a>
                        </p>
                      </div>
                    </div>
                    <br />
                    <div className="form-group-3 col-lg-12">
                      <p></p>
                      <br />
                      <br />
                      <button className="middle" id="signup-button">
                        <span className="animate-button btn4">
                          Create Account
                        </span>
                      </button>
                      <ToastContainer />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </HelmetProvider>
    </>
  );
};

export default SignupPage;

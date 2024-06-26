import React, { useEffect, useState } from "react";
import "./authentication.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCombination from "../PrivateComponents/headerCombination";
import FooterCombination from "../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

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
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MILELE_API_URL}/customer/create`,
        formData,
        { headers }
      );
      console.log("sign up response is: --- ", response?.data);

      if (response?.data?.status === "success") {
        toast.success("Account Created Successfully!", {
          autoClose: 2000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            fontSize: "14px",
          },
          onClose: () => {
            navigate("/");
          },
        });
      } else {
        toast.warning("Some fields are missing", {
          autoClose: 3000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            fontSize: "14px",
          },
        });
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`, {
        autoClose: 3000,
        style: {
          border: "1px solid #c0c0c0",
          fontWeight: "400",
          lineHeight: "18px",
          fontSize: "14px",
        },
      });
    }
  };

  return (
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
      <HeaderCombination />
      <section className="ftco-section">
        <div className="container">
          <div className="login-row justify-content-center">
            <div className="col-lg-7 signup-wrap pb-5">
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
                        id="username"
                        name="name"
                        required
                        value={formData?.name}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="name">name</label>
                    </div>

                    <div className="inputgroup col-lg-6 col-md-6 col-sm-6">
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
                      <label htmlFor="confirmPassword">confirm password</label>
                    </div>
                  </div>

                  <div className="form-group row">
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
      <FooterCombination />
    </HelmetProvider>
  );
};

export default SignupPage;

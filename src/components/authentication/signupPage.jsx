/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./authentication.css";
import MainNavbar from "../Pages/navbar/mainNavbar";
import { useReload } from "../PrivateComponents/utils";
import ReloadingComponent from "../PrivateComponents/reloadingComponent";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      navigate("/home");
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

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/customer/create",
        formData
      );
      console.log("sign up response is: --- ", response.data);

      if (response.data.status === "success") {
        toast.success("Account Created Successfully!", {
          autoClose: 2000,
          style: { border: "1px solid #c0c0c0", fontWeight: "400", fontSize: "14px" },
          onClose: () => {
            navigate("/home");
          },
        });
      } else {
        toast.warning("Some fields are missing", {
          autoClose: 3000,
          style: { border: "1px solid #c0c0c0", fontWeight: "400", fontSize: "14px" },
        });
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        autoClose: 3000,
        style: { border: "1px solid #c0c0c0", fontWeight: "400", lineHeight: "18px", fontSize: "14px" },
      });
    }
  };

  const { loading } = useReload();

  if (loading) {
    return (
      <>
        <ReloadingComponent />
      </>
    );
  }

  return (
    <>
      <div className="navbar-bg-img-container">
        <div className="booking-page-banner-navbar">
          {" "}
          <MainNavbar />
        </div>
      </div>
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
                    {/* <label
                      htmlFor="username"
                      className={`col-lg-5 col-md-5 col-form-label signup-page-labels`}
                    >
                      Full Name
                    </label> */}
                    <div className="inputgroup col-lg-6 col-md-6 col-sm-6">
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        id="username"
                        name="name"
                        required
                        value={formData.name}
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
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="email">email</label>
                    </div>
                  </div>

                  {/* <div className="form-group row">
                    <label
                      htmlFor="email"
                      className={`col-lg-5 col-md-5 col-form-label signup-page-labels`}
                    >
                      Email
                    </label>
                    <div className="inputgroup col-lg-6 col-md-6">
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="email">email</label>
                    </div>
                  </div> */}

                  {/* <div className="form-group row">
                    <label
                      htmlFor="password"
                      className={`col-lg-5 col-md-5 col-form-label signup-page-labels`}
                    >
                      Password
                    </label>
                    <div className="inputgroup col-lg-6 col-md-6">
                      <input
                        className="form-control"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="off"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="password">password</label>
                    </div>
                  </div> */}

                  <div className="form-group row">
                    {/* <label
                      htmlFor="confirmPassword"
                      className={`col-lg-5 col-md-5 col-form-label signup-page-labels`}
                    >
                      Confirm Password
                    </label> */}
                    <div className="inputgroup col-lg-6 col-md-6 col-sm-6">
                      <input
                        className="form-control"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="off"
                        required
                        value={formData.password}
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
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="confirmPassword">confirm password</label>
                    </div>
                  </div>

                  <div className="form-group row">
                    {/* <label
                      htmlFor="phoneNumber"
                      className={`col-lg-5 col-md-5 col-form-label signup-page-labels`}
                    >
                      Phone Number
                    </label> */}
                    <div className="inputgroup col-lg-6 col-md-6 col-sm-12">
                      <input
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        autoComplete="off"
                        required
                        value={formData.phoneNumber}
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
                          Click here
                        </a>
                      </p>
                    </div>
                  </div>
                  <br />
                  <div className="form-group-3 col-lg-12">
                      <p></p>
                      <button
                        type="submit"
                        className="createAccount-form-control animated-button submit px-3"
                        // onClick={(e) => handleSignUp(e)}
                      >
                        <span className="button-text-span p-2">
                          <span className="transition"></span>
                          <span className="gradient"></span>
                          <span className="label">Create Account </span>
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
    </>
  );
};

export default SignupPage;

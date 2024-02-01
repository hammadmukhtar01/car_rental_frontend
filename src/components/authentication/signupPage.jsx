/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./authentication.css";
import MainNavbar from "../Pages/navbar/mainNavbar";
import { useReload } from "../PrivateComponents/utils";
import ReloadingComponent from "../PrivateComponents/reloadingComponent";
import { useNavigate } from "react-router";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/customer/create",
        formData
      );
      console.log(response.data);
      // Redirect to a success page or perform any other action upon successful signup
      alert("Success Msssg");
      navigate("/home");
    } catch (error) {
      console.error("Signup failed:", error.response.data);

      // Extract error message from the response
      const errorInResponse = error.response.data;
      const regex = /<pre>Error: (.+?)<br>/;
      const match = errorInResponse.match(regex);

      const errorMessage = match ? match[1] : 'Signup failed. Please try again.';

      // Display the error message in an alert
      console.log("error is ---------- : ", errorMessage);
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
            <div className="col-lg-6 signup-wrap ">
              <div className="">
                <p className="text-center have-account-text">SignUp Page</p>
                <form
                  action="#"
                  className="signup-form"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group row">
                    <label
                      htmlFor="phoneNum"
                      className="col-lg-5 col-form-label"
                    >
                      Full Name
                    </label>
                    <div className="col-lg-7">
                      <input
                        className="form-control"
                        id="username"
                        autoComplete="username"
                        type="text"
                        name="name"
                        required
                        placeholder="username"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="city" className="col-lg-5 col-form-label">
                      Email
                    </label>
                    <div className="col-lg-7">
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="phoneNum"
                      className="col-lg-5 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-lg-7">
                      <input
                        className="form-control"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <span
                        toggle="#password-field"
                        className="fa fa-fw  field-icon toggle-password"
                      ></span>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="city" className="col-lg-5 col-form-label">
                      Confirm password
                    </label>
                    <div className="col-lg-7">
                      <input
                        className="form-control"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type="password"
                        autoComplete="confirm-password"
                        required
                        placeholder="Confirm Password"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                      />
                      <span
                        toggle="#password-field"
                        className="fa fa-fw  field-icon toggle-password"
                      ></span>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="phoneNumber"
                      className="col-lg-5 col-form-label"
                    >
                      Phone Number
                    </label>
                    <div className="col-lg-7">
                      <input
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        autoComplete="Phone-Number"
                        required
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
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
                    <div className="col-lg-6">
                      <p></p>
                      <button
                        type="submit"
                        className="createAccount-form-control animated-button submit px-3"
                        // onClick={(e) => handleSignUp(e)}
                      >
                        <span className="button-text-span">
                          <span className="transition"></span>
                          <span className="gradient"></span>
                          <span className="label">Create Account </span>
                        </span>
                      </button>
                    </div>
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

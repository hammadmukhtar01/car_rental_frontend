import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./authentication.css";
import LoginSignupImg from "../images/loginSignImg-test.jpg";
import LoginSignupImgWebP from "../images/loginSignImg-test.webp";
import "react-toastify/dist/ReactToastify.css";
import "../Pages/OtherPages/toastStyle.css";
import SignupPage from "./signupPage";
import LoginPage from "./loginPage";

const LoginSignupPage = ({ onCloseModal }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleSignupClick = () => {
    setShowLoginForm(false);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Login | Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
        {/* <link rel="canonical" href="https://milelecarrental.com/login" /> */}
      </Helmet>
      {/* {loading && (
        <div className="reloading-icon-free-consultation-form-container text-center">
          <span className="loader-text">Logging In . . .</span>
          <div className="lds-dual-ring text-center"></div>
        </div>
      )} */}
      <div className="login-signup-main-container">
        <Row>
          <Col xl={7} lg={7} md={12} sm={12}>
            <div className="login-sign-form-container">
              <Row className="form-toggle-buttons">
                <Col
                  xl={6}
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  className={
                    showLoginForm
                      ? "auth-selected-button"
                      : "auth-unselected-login-button"
                  }
                  onClick={handleLoginClick}
                >
                  <span>LOGIN</span>
                </Col>
                <Col
                  xl={6}
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  className={
                    !showLoginForm
                      ? "auth-selected-button"
                      : "auth-unselected-signup-button"
                  }
                  onClick={handleSignupClick}
                >
                  <span>SIGN UP</span>
                </Col>
              </Row>

              {showLoginForm ? (
                <div className="login-form-container">
                  <h4 className="text-center">
                    <b>Log In</b>
                  </h4>
                  <div className="login-form-data">
                    <LoginPage onCloseModal={onCloseModal} />
                  </div>
                </div>
              ) : (
                <div className="signup-form-container ">
                  <h4 className="text-center">
                    <b>Sign Up</b>
                  </h4>

                  <div className="signup-form-data">
                    <SignupPage onCloseModal={onCloseModal} />{" "}
                  </div>
                </div>
              )}
            </div>
          </Col>

          <Col
            xl={5}
            lg={5}
            md={12}
            sm={12}
            className="p-0 login-signup-img-container bg-black"
          >
            <picture>
              <source srcSet={LoginSignupImgWebP} type="image/webp" />
              <source srcSet={LoginSignupImg} type="image/png" />
              <img
                src={LoginSignupImg}
                alt="Login Signup"
                className="img-fluid"
              />
            </picture>
          </Col>
        </Row>
      </div>
    </HelmetProvider>
  );
};

export default LoginSignupPage;

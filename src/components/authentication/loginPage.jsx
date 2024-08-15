/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Col, Form, Modal, Row } from "react-bootstrap";
import "./authentication.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SuccessGifWebP from "../images/auth-gif-after-edited.gif";

const LoginPage = ({ onCloseModal, setGif, onForgotPasswordClick }) => {
  const [emailPhoneNum, setEmailPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      const lastUrl = localStorage.getItem("lastUrl") || "/";
      navigate(lastUrl);
    }

    if (location.pathname) {
      localStorage.setItem("lastUrl", `${location.pathname}${location.search}`);
    }
  }, [navigate, location.pathname, location.search]);

  const handleLogin = async (e) => {
    e.preventDefault();

    let data = { emailPhoneNum, password };
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    toast.dismiss();
    toast
      .promise(
        axios.post(
          `${process.env.REACT_APP_MILELE_API_URL}/customer/login`,
          // `http://localhost:8000/api/v1/customer/login`,
          data,
          { headers }
        ),
        {
          loading: "Logging in...",
          success: (result) => {
            let resultedData = result?.data;
            console.log("Result in login page is: ", resultedData);

            if (resultedData.status === "success" && resultedData?.token) {
              localStorage.setItem("user", JSON.stringify(resultedData));
              setGif(SuccessGifWebP);
              setTimeout(() => {
                const lastUrl = localStorage.getItem("lastUrl");
                navigate(lastUrl);
                onCloseModal();
                window.location.reload();
              }, 3200);
              return "Logged In Successfully!";
            } else {
              throw new Error("Email/Password missing...");
            }
          },
          error: (error) => {
            return `${error?.response?.data?.message}`;
          },
        },
        {
          duration: 3000,
        }
      )
      .catch((err) => {
        console.error("Error while login: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
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
      </Helmet>

      <section>
        <div className="container">
          <form action="#" className="login-form" onSubmit={handleLogin}>
            <div className="login-form-input-container">
              <label className="login-form-label">
                <b>Email/Phone No.</b>
              </label>

              <div className=" custom-dropdown-container">
                <input
                  className="form-control-login col-12"
                  id="emailPhoneNum"
                  name="emailPhoneNum"
                  type="string"
                  autoComplete="emailPhoneNum"
                  placeholder="Email / Phone No."
                  required
                  value={emailPhoneNum}
                  onChange={(e) => {
                    setEmailPhoneNum(e.target.value);
                  }}
                />
              </div>
            </div>
            <br />
            <div className="login-form-input-container">
              <label className="login-form-label">
                <b>Password</b>
              </label>

              <div className=" custom-dropdown-container">
                <input
                  className="form-control-login col-12"
                  name="password"
                  type="password"
                  autoComplete="currentPassword"
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
            <div className="login-button-div">
              <Row className="align-items-center">
                <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                  <div
                    className="forgot-password text-left"
                    onClick={onForgotPasswordClick}
                  >
                    {" "}
                    Forgot Password ?
                  </div>
                </Col>

                <Col
                  xl={6}
                  lg={6}
                  md={6}
                  sm={6}
                  xs={12}
                  className="text-right login-button-col"
                >
                  <button
                    className="login-button"
                    aria-label="Log In"
                    disabled={loading}
                  >
                    {loading ? "Logging In..." : "Login"}
                  </button>
                </Col>
              </Row>
            </div>
          </form>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default LoginPage;

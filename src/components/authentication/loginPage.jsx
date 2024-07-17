/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Col, Form, Modal, Row } from "react-bootstrap";
import "./authentication.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SuccessGifWebP from "../images/auth-gif-after-edited.gif";
import "../Pages/OtherPages/toastStyle.css";

const LoginPage = ({ onCloseModal, setGif, onForgotPasswordClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

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

    console.warn("Data: ", email, password);
    let data = { email, password };
    setLoading(true);
    document.body.classList.add("loadings");
    try {
      let result = await axios.post(
        `${process.env.REACT_APP_MILELE_API_URL}/customer/login`,
        // `http://localhost:8000/api/v1/customer/login`,
        data,

        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      let resultedData = result?.data;
      console.log("Result in login page is: ", resultedData);

      if (resultedData.status === "success" && resultedData?.token) {
        localStorage.setItem("user", JSON.stringify(resultedData));
        setGif(SuccessGifWebP);

        toast.success("Logged In Successfully!", {
          autoClose: 3000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            fontSize: "14px",
          },
          onClose: () => {
            const lastUrl = localStorage.getItem("lastUrl") || "/";
            navigate(lastUrl);
            onCloseModal();
          },
        });
      } else {
        toast.warning("Email/Password missing...", {
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
          fontSize: "14px",
        },
      });
    } finally {
      setLoading(false);
      document.body.classList.remove("loadings");
    }
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

      <ToastContainer />

      {loading && (
        <div className="reloading-icon-free-consultation-form-container text-center">
          <span className="loader-text">Logging In . . .</span>
          <div className="lds-dual-ring text-center"></div>
        </div>
      )}

      <section>
        <div className="container">
          <form action="#" className="login-form" onSubmit={handleLogin}>
            <div className="login-form-input-container">
              <label className="login-form-label">
                <b>Email</b>
              </label>

              <div className=" custom-dropdown-container">
                <input
                  className="form-control-login  col-12"
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  <button className="login-button" aria-label="Log In">
                    Login
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

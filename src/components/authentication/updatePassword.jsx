/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "./authentication.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCombination from "../PrivateComponents/headerCombination";
import FooterCombination from "../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../Pages/OtherPages/toastStyle.css";

const UpdatePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const auth = JSON.parse(localStorage?.getItem("user"));
  const authToken = auth?.token;
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

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

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("New & Confirm Passwords do not match.", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    setLoading(true);
    document.body.classList.add("loadings");

    let data = { currentPassword, password, passwordConfirm };

    try {
      console.log("config : ", config);
      let result = await axios.patch(
        `${process.env.REACT_APP_MILELE_API_URL}/customer/updatepassword`,
        // `http://localhost:8000/api/v1/customer/updatepassword`,
        data,
        config
      );

      let resultedData = result?.data;
      console.log("Result in updatepassword page is: ", resultedData);

      if (resultedData.status === "success" && resultedData?.token) {
        localStorage.setItem("user", JSON.stringify(resultedData));

        toast.success("Password Updated Successfully!", {
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
        toast.warning("Invalid Password...", {
          autoClose: 2000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            fontSize: "14px",
          },
        });
      }
    } catch (error) {
      toast.error(`${error}`, {
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
      <HeaderCombination />

      <Helmet>
        <title>Update Password | Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
        {/* <link rel="canonical" href="https://milelecarrental.com/updatePassword" /> */}
      </Helmet>
      {loading && (
        <div className="reloading-icon-free-consultation-form-container text-center">
          <span className="loader-text">Updating Password . . .</span>
          <div className="lds-dual-ring text-center"></div>
        </div>
      )}
      <ToastContainer />

      <section className="mb-5 mt-5">
        <div className="container">
          <form
            action="#"
            className="update-password-form"
            onSubmit={handleUpdatePassword}
          >
            <div className="d-flex justify-content-center">
              <Row className="update-password-form-container col-lg-8 ">
                <div className=" mb-3">
                  <h2 className=" update-password-text">
                    <b>Update Password</b>
                  </h2>
                </div>
                <Row className="update-password-form-input-container">
                  <label className="update-password-form-label">
                    <b>Current Password</b>
                  </label>

                  <div className=" custom-dropdown-container">
                    <input
                      className="form-control-update-password col-12"
                      name="currentPassword"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={(e) => {
                        setCurrentPassword(e.target.value);
                      }}
                    />
                  </div>
                </Row>
                <br />
                <Row className="update-password-form-input-container pt-4">
                  <label className="update-password-form-label">
                    <b>New Password</b>
                  </label>

                  <div className=" custom-dropdown-container">
                    <input
                      className="form-control-update-password col-12"
                      name="newPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="New password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </Row>
                <br />
                <Row className="update-password-form-input-container pt-4">
                  <label className="update-password-form-label">
                    <b>Confirm Password</b>
                  </label>

                  <div className=" custom-dropdown-container">
                    <input
                      className="form-control-update-password col-12"
                      name="confirmPassword"
                      type="password"
                      autoComplete="confirm-password"
                      required
                      placeholder="Confirm password"
                      value={passwordConfirm}
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                      }}
                    />
                  </div>
                </Row>
                <br />
                <div className="update-password-button-div pt-5">
                  <Row className="align-items-center">
                    <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                      <a href="/" className="forgot-password-heading">
                        <div className="forgot-password text-left">
                          {" "}
                          Go Back Home?
                        </div>
                      </a>
                    </Col>

                    <Col
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className="text-right update-password-button-col"
                    >
                      <button
                        className="update-password-button"
                        aria-label="Update Pasword"
                      >
                        Save
                      </button>
                    </Col>
                  </Row>
                </div>
              </Row>
            </div>
          </form>
        </div>
      </section>
      <FooterCombination />
    </HelmetProvider>
  );
};

export default UpdatePasswordPage;

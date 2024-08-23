/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "./authentication.css";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import HeaderCombination from "../PrivateComponents/headerCombination";
import FooterCombination from "../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";

const UpdatePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorFields, setErrorFields] = useState({});

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

    const newErrorFields = {};

    if (!currentPassword) {
      newErrorFields.currentPassword = true;
    }
    if (!password) {
      newErrorFields.password = true;
    }
    if (!passwordConfirm) {
      newErrorFields.passwordConfirm = true;
    }

    setErrorFields(newErrorFields);

    if (!currentPassword || !password || !passwordConfirm) {
      toast.dismiss();
      toast("Please fill in all required fields.", {
        duration: 2500,
      });
      return;
    }

    if (password !== passwordConfirm) {
      toast.dismiss();
      toast("New & Confirm Passwords do not match.", {
        duration: 2500,
      });
      return;
    }

    const data = { currentPassword, password, passwordConfirm };

    toast.dismiss();

    toast
      .promise(
        axios.patch(
          `${process.env.REACT_APP_MILELE_API_URL}/customer/updatepassword`,
          data,
          config
        ),
        {
          loading: "Updating your password...",
          success: (response) => {
            const resultedData = response?.data;
            if (resultedData?.status === "success" && resultedData?.token) {
              localStorage.setItem("user", JSON.stringify(resultedData));
              setTimeout(() => {
                navigate("/");
              }, 2000);
              return "Password Updated Successfully!";
            } else {
              throw new Error("Invalid Password...");
            }
          },
          error: (error) => {
            console.log("Error : ", error);
            const errorMessage =
              error?.response?.data?.message || "Invalid Password...";
            return `${errorMessage}`;
          },
        },
        {
          duration: 2000,
        }
      )
      .catch((err) => {
        console.error("Error while updating password: ", err);
      });
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
      </Helmet>

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
                    <b>
                      <span
                        className={` ${
                          errorFields?.currentPassword
                            ? "select-error-label"
                            : ""
                        }`}
                      >
                        Current Password*
                      </span>
                    </b>
                  </label>

                  <div className=" custom-dropdown-container">
                    <input
                      className={`form-control-update-password col-12 ${
                        errorFields?.currentPassword ? "border-red" : ""
                      }`}
                      name="currentPassword"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={(e) => {
                        setCurrentPassword(e.target.value);
                        if (errorFields?.currentPassword) {
                          setErrorFields((prev) => ({
                            ...prev,
                            currentPassword: false,
                          }));
                        }
                      }}
                    />
                  </div>
                </Row>
                <br />
                <Row className="update-password-form-input-container pt-4">
                  <label className="update-password-form-label">
                    <b>
                      <span
                        className={` ${
                          errorFields?.password ? "select-error-label" : ""
                        }`}
                      >
                        New Password*
                      </span>
                    </b>
                  </label>

                  <div className=" custom-dropdown-container">
                    <input
                      className={`form-control-update-password col-12 ${
                        errorFields?.password ? "border-red" : ""
                      }`}
                      name="newPassword"
                      type="password"
                      autoComplete="new-password"
                      placeholder="New password"
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
                </Row>
                <br />
                <Row className="update-password-form-input-container pt-4">
                  <label className="update-password-form-label">
                    <b>
                      <span
                        className={` ${
                          errorFields?.passwordConfirm
                            ? "select-error-label"
                            : ""
                        }`}
                      >
                        Confirm Password*
                      </span>
                    </b>
                  </label>

                  <div className=" custom-dropdown-container">
                    <input
                      className={`form-control-update-password col-12 ${
                        errorFields?.passwordConfirm ? "border-red" : ""
                      }`}
                      name="confirmPassword"
                      type="password"
                      autoComplete="confirm-password"
                      placeholder="Confirm password"
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

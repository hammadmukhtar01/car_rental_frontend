/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import HeaderCombination from "../PrivateComponents/headerCombination";
import FooterCombination from "../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorFields, setErrorFields] = useState({});
  const navigate = useNavigate();

  const handleForgotPasswordClick = async (e) => {
    e.preventDefault();

    const newErrorFields = {};
    if (!password) {
      newErrorFields.password = true;
    }
    if (!passwordConfirm) {
      newErrorFields.passwordConfirm = true;
    }

    setErrorFields(newErrorFields);

    if (!password || !passwordConfirm) {
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

    const data = { username, password, passwordConfirm };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    toast.dismiss();
    toast
      .promise(
        axios.patch(
          `${process.env.REACT_APP_MILELE_API_URL}/customer/resetpassword/${token}`,
          data,
          { headers }
        ),
        {
          loading: "Updating your password...",
          success: (result) => {
            console.log("Reset Password: ", result);
            if (result?.status === 201) {
              localStorage?.removeItem("user");
              return "Password Updated successfully.";
            } else {
              throw new Error("Failed to update password.");
            }
          },
          error: (error) => {
            const errorMessage =
              error?.response?.data?.message || "Failed to update password.";
            return `${errorMessage}`;
          },
        },
        {
          duration: 2000,
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Error while updating password: ", err);
      });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Reset password | Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
      </Helmet>
      <HeaderCombination />
      <section className="ftco-section">
        <div className="container pt-2">
          <div className="forgot-row justify-content-center">
            <div className="col-lg-8 ">
              <div className="forgot-wrap ">
                <h4 className="text-center mb-5">
                  <b className="resetpassword-heading">Reset Password</b>
                </h4>
                <form
                  action="#"
                  className="reset-password-form"
                  onSubmit={handleForgotPasswordClick}
                >
                  <Form.Group controlId="formUsername" className="d-none">
                    <div className="form-group row">
                      <div className="login-form-label col-lg-4 col-md-4">
                        <label htmlFor="username" className="styled-label">
                          <b>Username</b>
                        </label>
                      </div>
                      <div className="col-lg-7 col-md-7 custom-dropdown-container">
                        <input
                          className="form-control-login mt-2 col-12"
                          id="username"
                          name="username"
                          type="text"
                          autoComplete="username"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <div className="form-group row">
                      <div className="login-form-label col-lg-4 col-md-4">
                        <label htmlFor="password" className="styled-label">
                          <b>
                            <span
                              className={` ${
                                errorFields?.password
                                  ? "select-error-label"
                                  : ""
                              }`}
                            >
                              Password*
                            </span>
                          </b>
                        </label>
                      </div>
                      <div className="col-lg-7 col-md-7 custom-dropdown-container">
                        <input
                          className={`form-control-login mt-2 col-12 ${
                            errorFields.password ? "border-red" : ""
                          }`}
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (errorFields.password) {
                              setErrorFields((prev) => ({
                                ...prev,
                                password: false,
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group controlId="formPasswordConfirm">
                    <div className="form-group row">
                      <div className="login-form-label col-lg-4 col-md-4">
                        <label
                          htmlFor="passwordConfirm"
                          className="styled-label"
                        >
                          <b>
                            <span
                              className={` ${
                                errorFields?.passwordConfirm
                                  ? "select-error-label"
                                  : ""
                              }`}
                            >
                              Current Password*
                            </span>
                          </b>
                        </label>
                      </div>
                      <div className="col-lg-7 col-md-7 custom-dropdown-container">
                        <input
                          className={`form-control-login mt-2 col-12 ${
                            errorFields.passwordConfirm ? "border-red" : ""
                          }`}
                          id="passwordConfirm"
                          name="passwordConfirm"
                          type="password"
                          autoComplete="new-password"
                          placeholder="Confirm Password"
                          value={passwordConfirm}
                          onChange={(e) => {
                            setPasswordConfirm(e.target.value);
                            if (errorFields.passwordConfirm) {
                              setErrorFields((prev) => ({
                                ...prev,
                                passwordConfirm: false,
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                  </Form.Group>

                  <div className="form-group-3 col-lg-12 mt-5 justify-content-center">
                    <button
                      className="resetPassword-button"
                      aria-label="Reset Password"
                    >
                      Save
                    </button>
                  </div>
                </form>

                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterCombination />
    </HelmetProvider>
  );
};

export default ResetPasswordPage;

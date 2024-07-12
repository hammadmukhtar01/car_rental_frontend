import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCombination from "../PrivateComponents/headerCombination";
import FooterCombination from "../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../Pages/OtherPages/toastStyle.css";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [username, setUsername] = useState(""); // Hidden username field for accessibility
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleForgotPasswordClick = async (e) => {
    e.preventDefault();

    let data = { username, password, passwordConfirm };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      let result = await axios.patch(
        `${process.env.REACT_APP_MILELE_API_URL}/customer/resetpassword/${token}`,
        data,
        { headers }
      );

      console.log("Result in reset password page is: ", result);

      if (result?.status === 201) {
        toast.success("Password Updated successfully.", {
          autoClose: 2000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            fontSize: "14px",
          },
          onClose: () => {
            localStorage?.removeItem("user");
            setTimeout(() => {
              window.location.reload();
            }, 100);

            navigate("/");
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
    }
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
                          <b>Password</b>
                        </label>
                      </div>
                      <div className="col-lg-7 col-md-7 custom-dropdown-container">
                        <input
                          className="form-control-login mt-2 col-12"
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          required
                          placeholder="Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
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
                          <b>Confirm Password</b>
                        </label>
                      </div>
                      <div className="col-lg-7 col-md-7 custom-dropdown-container">
                        <input
                          className="form-control-login mt-2 col-12"
                          id="passwordConfirm"
                          name="passwordConfirm"
                          type="password"
                          autoComplete="new-password"
                          required
                          placeholder="Confirm Password"
                          value={passwordConfirm}
                          onChange={(e) => {
                            setPasswordConfirm(e.target.value);
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
                    <ToastContainer />
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

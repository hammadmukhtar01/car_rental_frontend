import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCombination from "../PrivateComponents/headerCombination";
import FooterCombination from "../PrivateComponents/footerCombination";
import { Helmet } from "react-helmet";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  console.log("Reset passs token ", token);

  const handleForgotPasswordClick = async (e) => {
    e.preventDefault();

    let data = { password, passwordConfirm };
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
            navigate("/home");
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
    <>
      <Helmet>
        <title>Reset password - Milele Car Rental </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
        <link rel="canonical" href="https://milelecarrental.com/resetpassword/:token" />

      </Helmet>
      <HeaderCombination />
      <section className="ftco-section">
        <div className="container pt-2">
          <div className="forgot-row justify-content-center">
            <div className="col-lg-6 ">
              <div className="forgot-wrap ">
                <p className=" have-account-text text-center mb-4 mt-2">
                  Reset Password
                </p>
                <form
                  action="#"
                  className="reset-password-form"
                  onSubmit={handleForgotPasswordClick}
                >
                  <Form.Group controlId="formKeyword">
                    <div className="form-group row">
                      <div className="login-form-label col-lg-4 col-md-4">
                        <label className="styled-label">
                          <b>Password</b>
                        </label>
                      </div>
                      <div className="col-lg-7 col-md-7 custom-dropdown-container">
                        <input
                          className="form-control-login mt-2 col-12"
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
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

                  <Form.Group controlId="formKeyword">
                    <div className="form-group row">
                      <div className="login-form-label col-lg-4 col-md-4">
                        <label className="styled-label">
                          <b>Confirm Password</b>
                        </label>
                      </div>
                      <div className="col-lg-7 col-md-7 custom-dropdown-container">
                        <input
                          className="form-control-login mt-2 col-12"
                          id="passwordConfirm"
                          name="passwordConfirm"
                          type="password"
                          autoComplete="confirm-password"
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

                  <div className="form-group-3 col-lg-12">
                    <p></p>
                    <br />
                    <br />
                    <button className="middle">
                      <span className="animate-button btn4">Submit</span>
                    </button>
                    <ToastContainer />
                  </div>
                  <br />
                  <div className="form-group-0">
                    <div className="col-lg-12">
                      <div>
                        <a href="/login" style={{ color: "#fff" }}>
                          <div className="forgot-password">
                            {" "}
                            Remember Password? Login here.
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </form>

                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterCombination />
    </>
  );
};

export default ResetPasswordPage;

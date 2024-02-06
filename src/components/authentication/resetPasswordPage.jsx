import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MainNavbar from "../Pages/navbar/mainNavbar";
import ReloadingComponent from "../PrivateComponents/reloadingComponent";
import { useReload } from "../PrivateComponents/utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  console.log("Reset passs token ", token);

  const handleForgotPasswordClick = async (e) => {
    e.preventDefault();

    // console.warn("Data: ", user, password);
    let data = { password, passwordConfirm };

    try {
      let result = await axios.patch(
        `http://localhost:8000/api/v1/customer/resetpassword/${token}`,
        data
      );

      console.log("Result in reset password page is: ", result);

      if (result.status === 201) {
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
      toast.error(`${error.response.data.message}`, {
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
        <div className="container pt-2">
          <div className="forgot-row justify-content-center">
            <div className="col-lg-6 ">
              <div className="forgot-wrap ">
                <p className=" have-account-text"> Reset Password...</p>

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
                    <div className="col-lg-6">
                      <p></p>
                      <button
                        type="submit"
                        className="forgot-form-control animated-button submit"
                        // onClick={handleForgotPasswordClick}
                      >
                        <span className="button-text-span">
                          <span className="transition"></span>
                          <span className="gradient"></span>
                          <span className="label">Submit</span>
                        </span>
                      </button>
                      <ToastContainer />
                    </div>
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
    </>
  );
};

export default ResetPasswordPage;

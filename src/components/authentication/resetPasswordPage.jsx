import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainNavbar from "../Pages/navbar/mainNavbar";

const ResetPasswordPage = () => {
  const { token } = useParams(); 
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleForgotPasswordClick = async () => {
    // console.warn("Data: ", user, password);
    let data = { password, passwordConfirm };

    let result = await axios.patch(
      `http://localhost:8000/api/v1/resetpassword/${token}`,
      {
        ...data,
      }
    );

    if (result.status === 201) {
      alert("Password Updated successfully.");
      navigate(`/login`);
    }
  };

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
                  <div className="form-group row">
                    <label htmlFor="city" className="col-lg-5 col-form-label">
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
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
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
                        value={passwordConfirm}
                        onChange={(e) => {
                          setPasswordConfirm(e.target.value);
                        }}
                      />
                      <span
                        toggle="#password-field"
                        className="fa fa-fw  field-icon toggle-password"
                      ></span>
                    </div>
                  </div>

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
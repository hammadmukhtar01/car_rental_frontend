import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../Pages/navbar/mainNavbar";
import { Form } from "react-bootstrap";
import { useReload } from "../PrivateComponents/utils";
import ReloadingComponent from "../PrivateComponents/reloadingComponent";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPasswordClick = async (e) => {
    e.preventDefault();

    try {
      let result = await axios.post(
        "http://localhost:8000/api/v1/customer/forgotpassword",
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Result in Forgot Pass page is: ", result.data);
      alert("Success Message");

      if (result.status === 200 && result.data.status === "success") {
        navigate(`/login`);
      } else {
        alert("Email not found. Try again with a correct email.");
      }
    } catch (error) {
      console.log("Forgot password failed:", error.response.data.message);
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
                <p className=" have-account-text"> Forgot Password...</p>

                <form
                  action="#"
                  className="signin-form"
                  onSubmit={handleForgotPasswordClick}
                >
                  <Form.Group controlId="formKeyword">
                    <div className="form-group row">
                      <div className="login-form-label col-lg-4 col-md-4">
                        <label className="styled-label">
                          <b>Email </b>
                        </label>
                      </div>
                      <div className="col-lg-7 col-md-7 custom-dropdown-container">
                        <input
                          className="form-control-login mt-2 col-12"
                          id="email_PhoneNum"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          placeholder="Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
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

export default ForgotPasswordPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterCombination from "../PrivateComponents/footerCombination";
import HeaderCombination from "../PrivateComponents/headerCombination";
import { Helmet } from "react-helmet";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPasswordClick = async (e) => {
    e.preventDefault();

    try {
      let result = await axios.post(
        `${process.env.REACT_APP_MILELE_API_URL}/customer/forgotpassword`,
        { email: email },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Result in Forgot Pass page is: ", result?.data);

      if (result?.status === 200 && result?.data?.status === "success") {
        toast.success("Check your email for password reset link.", {
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
      } else {
        toast.warning("Email not found. Try again with a correct email.", {
          autoClose: 3000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            fontSize: "14px",
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
        <title>Forgot Password - Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
        <link rel="canonical" href="https://milelecarrental.com/ForgotPasswordPage" />

      </Helmet>
      <HeaderCombination />
      <section className="ftco-section">
        <div className="container pt-2">
          <div className="forgot-row justify-content-center">
            <div className="col-lg-6 ">
              <div className="forgot-wrap ">
                <p className=" have-account-text text-center mb-4 mt-2">
                  Forgot Password
                </p>
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
                    <div className="col-lg-6 d-flex justify-content-center">
                      <p></p>
                      <br />
                      <br />
                      <button className="middle">
                        <span className="animate-button btn4">Submit</span>
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
      <FooterCombination />
    </>
  );
};

export default ForgotPasswordPage;

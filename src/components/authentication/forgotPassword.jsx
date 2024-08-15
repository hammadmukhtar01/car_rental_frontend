/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Helmet, HelmetProvider } from "react-helmet-async";

const ForgotPasswordPage = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorFields, setErrorFields] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorFields({ email: true });
      toast.dismiss();
      toast("Email is required.", {
        duration: 2000,
      });
      return;
    }

    let data = { email };
    setLoading(true);
    toast.dismiss();
    toast
      .promise(
        axios.post(
          `${process.env.REACT_APP_MILELE_API_URL}/customer/forgotpassword`,
          data,
          config
        ),
        {
          loading: "Sending reset link...",
          success: (result) => {
            let resultedData = result?.data;
            if (resultedData.status === "success") {
              const success_message = resultedData?.message;
              return success_message;
            } else {
              throw new Error("Email is missing...");
            }
          },
          error: (error) => {
            console.log("Forgot Password (error) : ", error);
            const errorMessage =
              error?.response?.data?.message || "Something went wrong.";
            return errorMessage;
          },
        },
        {
          duration: 3000,
        }
      )
      .then(() => {
        onClose();
      })

      .catch((err) => {
        console.error("Error while forgot password: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Forgot Password | Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
      </Helmet>

      <div className="forgotpassword-form-container">
        <h4 className="text-center">
          <b className="forgotPassword-heading">Forgot Password</b>
        </h4>
        <div className="forgotPassword-form-data mt-4">
          <section>
            <div className="container">
              <form
                action="#"
                className="forgotPassword-form"
                onSubmit={handleForgotPassword}
              >
                <div className="forgotPassword-form-input-container d-flex justify-content-evenly">
                  <label className="forgotPassword-form-label">
                    <b>
                      {" "}
                      <span
                        className={` ${
                          errorFields?.emailAddress ? "select-error-label" : ""
                        }`}
                      >
                        Email *
                      </span>
                    </b>
                  </label>

                  <div className=" custom-dropdown-container col-lg-6 col-md-6 col-sm-12 col-12">
                    <input
                      className="form-control-forgotPassword col-12"
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
                <div className="forgotPassword-button-div">
                  <Row className="align-items-center">
                    <Col
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      className="text-right forgotPassword-button-col d-flex justify-content-center"
                    >
                      <button
                        className="forgotPassword-button"
                        aria-label="Forgot Password"
                        disabled={loading}
                      >
                        {loading ? "Submit..." : "Send"}
                      </button>
                    </Col>
                  </Row>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default ForgotPasswordPage;

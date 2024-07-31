import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Helmet, HelmetProvider } from "react-helmet-async";

const ForgotPasswordPage = ({ onClose }) => {
  const [email, setEmail] = useState("");
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

    let data = { email };

    try {
      let result = await axios.post(
        `${process.env.REACT_APP_MILELE_API_URL}/customer/forgotpassword`,
        // `http://localhost:8000/api/v1/customer/forgotpassword`,
        data,
        config
      );

      let resultedData = result?.data;
      console.log("Result in Forgot password page is: ", resultedData);

      if (resultedData.status === "success") {
        const success_message = resultedData?.message;
        alert(success_message);
        onClose();

        toast(success_message, {
          duration: 5000,
         
          onClose: () => {
            onClose();
          },
        });

        console.log(
          "Result in success success success is: ",
          resultedData?.message
        );
      } else {
        toast("Email is missing...", {
          duration: 2000,
         
        });
      }
    } catch (error) {
      alert(`${error?.response?.data?.message}`);
      toast(`${error?.response?.data?.message}`, {
        duration: 2000,
        
      });
    }
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
                    <b>Email</b>
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
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      className="text-right forgotPassword-button-col"
                    >
                      <button
                        className="forgotPassword-button"
                        aria-label="Forgot Password"
                      >
                        Send
                      </button>
                    </Col>
                  </Row>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
      <Toaster />
    </HelmetProvider>
  );
};

export default ForgotPasswordPage;

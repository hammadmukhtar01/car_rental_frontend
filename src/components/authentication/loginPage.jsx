/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./authentication.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCombination from "../PrivateComponents/headerCombination";
import FooterCombination from "../PrivateComponents/footerCombination";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../Pages/OtherPages/toastStyle.css";

const LoginPage = ({ onCloseModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }

    if (location.pathname) {
      localStorage.setItem("lastUrl", `${location.pathname}${location.search}`);
    }
  }, [navigate, location.pathname, location.search]);

  const handleLogin = async (e) => {
    setLoading(true);
    document.body.classList.add("loadings");

    e.preventDefault();

    console.warn("Data: ", email, password);
    let data = { email, password };

    try {
      let result = await axios.post(
        // `${process.env.REACT_APP_MILELE_API_URL}/customer/login`,
        `http://localhost:8000/api/v1/customer/login`,
        data,

        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      let resultedData = result?.data;
      console.log("Result in login page is: ", resultedData);

      if (resultedData.status === "success" && resultedData?.token) {
        localStorage.setItem("user", JSON.stringify(resultedData));
        toast.success("Logged In Successfully!", {
          autoClose: 1000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            fontSize: "14px",
          },
          onClose: () => {
            const lastUrl = localStorage.getItem("lastUrl") || "/";
            console.log("lastUrl : ", lastUrl);
            navigate(lastUrl);
            onCloseModal();
          },
        });
      } else {
        toast.warning("Email/Password missing...", {
          autoClose: 2000,
          style: {
            border: "1px solid #c0c0c0",
            fontWeight: "400",
            fontSize: "14px",
          },
        });
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`, {
        autoClose: 2000,
        style: {
          border: "1px solid #c0c0c0",
          fontWeight: "400",
          fontSize: "14px",
        },
      });
    } finally {
      setLoading(false);
      document.body.classList.remove("loadings");
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Login | Milele Car Rental Application </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
        {/* <link rel="canonical" href="https://milelecarrental.com/login" /> */}
      </Helmet>
      {loading && (
        <div className="reloading-icon-free-consultation-form-container text-center">
          <span className="loader-text">Logging In . . .</span>
          <div className="lds-dual-ring text-center"></div>
        </div>
      )}

      <section className="ftco-section">
        <div className="container">
          <div className="login-row justify-content-center">
            <div className="col-lg-12 ">
              <div className="login-wrap ">
                <p className=" have-account-text text-center mb-4">
                  User Login
                </p>
                <form action="#" className="signin-form" onSubmit={handleLogin}>
                  <Form.Group controlId="formKeyword">
                    <div className="form-group row">
                      <div className="login-form-label col-lg-4 col-md-4">
                        <label className="styled-label">
                          <b>Email</b>
                        </label>
                      </div>
                      <div className="col-lg-7 col-md-7 custom-dropdown-container">
                        <input
                          className="form-control-login mt-2 col-12"
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
                  </Form.Group>

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

                  <div className="form-group-3 col-lg-12">
                    <p></p>
                    <br />
                    <br />
                    <button className="middle" id="login-button">
                      <span className="animate-button btn4">Log In</span>
                    </button>

                    <ToastContainer />
                  </div>
                  <div className="form-group-0 pt-4">
                    <div className="col-lg-12">
                      <a href="/signup">
                        <div className="forgot-password text-right">
                          {" "}
                          Already have an account?
                        </div>
                      </a>
                    </div>
                    <div className="col-lg-12">
                      <a
                        href="/forgotpassword"
                        className="forgot-password-heading"
                      >
                        <div className="forgot-password text-centerx">
                          {" "}
                          Forgot Password ?
                        </div>
                      </a>
                    </div>
                  </div>
                </form>

                <br />

                {/* <div className="container">
                  <p className="text-center">
                    <b>&mdash; Or Sign In With &mdash;</b>
                  </p>
                  <br />
                  <div className="form-group-3 social-media-icons">
                    <button className="custom-button">
                      {" "}
                      <span className="fab fa-google"></span> G-Mail
                    </button>
                    <button className="custom-button">
                      {" "}
                      <span className="fab fa-facebook-f "></span> facebook
                    </button>
                  </div>
                  <GoogleLogin
                    clientId="YOUR_GOOGLE_CLIENT_ID"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                  <FacebookLogin
                    appId="YOUR_FACEBOOK_APP_ID"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    render={(renderProps) => (
                      <button
                        className="custom-button"
                        onClick={renderProps.onClick}
                      >
                        Login with Facebook
                      </button>
                    )}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default LoginPage;

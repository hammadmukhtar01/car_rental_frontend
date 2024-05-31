import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./authentication.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCombination from "../PrivateComponents/headerCombination";
import FooterCombination from "../PrivateComponents/footerCombination";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  const tenancyName = "MileleCarRental";
  const [UsernameOrEmailAddress, setUsernameOrEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.warn("Data: ", UsernameOrEmailAddress, password);
    let data = { tenancyName, UsernameOrEmailAddress, password };

    try {
      let result = await axios.post(
        "https://app.speedautosystems.com/api/Account",
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

      if (resultedData.success === true) {
        localStorage.setItem("user", JSON.stringify(result));
        toast.success("Logged In Successfully!", {
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
        toast.warning("Email/Password missing...", {
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
          fontSize: "14px",
        },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Milele Car Rental </title>
        <meta
          name="description"
          content="Affordable and convenient car rental services. Choose from a wide range of vehicles to suit your needs. Book online now for special offers."
        />
        <meta name="keywords" content="keywords" />
        <link rel="canonical" href="https://milelecarrental.com/login" />

      </Helmet>
      <HeaderCombination />
      <section className="ftco-section">
        <div className="container pt-4">
          <div className="login-row justify-content-center">
            <div className="col-lg-6 ">
              <div className="login-wrap ">
                <p className=" have-account-text text-center mb-4 mt-2">
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
                          id="UsernameOrEmailAddress"
                          name="UsernameOrEmailAddress"
                          type="text"
                          autoComplete="UsernameOrEmailAddress"
                          placeholder="Username/EmailAddress"
                          required
                          value={UsernameOrEmailAddress}
                          onChange={(e) => {
                            setUsernameOrEmailAddress(e.target.value);
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
                    <button className="middle">
                      <span className="animate-button btn4">Log In</span>
                    </button>

                    <ToastContainer />
                  </div>
                  <div className="form-group-0 pt-4">
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
      <FooterCombination />
    </>
  );
};

export default LoginPage;

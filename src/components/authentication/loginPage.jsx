/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./authentication.css";
import MainNavbar from "../Pages/navbar/mainNavbar";
import { useReload } from "../PrivateComponents/utils";
import ReloadingComponent from "../PrivateComponents/reloadingComponent";
import axios from "axios";

const LoginPage = () => {
  const [emailPhoneNum, setEmailPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.warn("Data: ", emailPhoneNum, password);
    let data = { emailPhoneNum, password };

    try {
      let result = await axios.post(
        "http://localhost:8000/api/v1/customer/login",
        data,

        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      let resultedData = result.data;
      console.log("Result in login page is: ", resultedData);
      alert("Success Message");

      if (resultedData.status === "success") {
        // const userId = result.data.data.user._id;
        // console.warn("User Id: " + userId);
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/home");
      } else {
        alert("Email/Password missing...");
      }
    } catch (error) {
      console.log("Login Failed Error is --- :", error.response.data.message);
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
                          <b>Email / Number</b>
                        </label>
                      </div>
                      <div className="col-lg-7 col-md-7 custom-dropdown-container">
                        <input
                          className="form-control-login mt-2 col-12"
                          id="email_PhoneNum"
                          name="email_PhoneNum"
                          type="text"
                          autoComplete="email_PhoneNum"
                          placeholder="Email/Phone Number"
                          required
                          value={emailPhoneNum}
                          onChange={(e) => {
                            setEmailPhoneNum(e.target.value);
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
                    <div className="col-lg-6">
                      <p></p>
                      <button
                        type="submit"
                        className="login-form-control animated-button submit"
                        // onClick={(e) => handleLogin(e)}
                      >
                        <span className="button-text-span">
                          <span className="transition"></span>
                          <span className="gradient"></span>
                          <span className="label">Log In</span>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="form-group-0 pt-4">
                    <div className="col-lg-12">
                      <a href="/forgotpassword" style={{ color: "#fff" }}>
                        <div className="forgot-password">
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
    </>
  );
};

export default LoginPage;

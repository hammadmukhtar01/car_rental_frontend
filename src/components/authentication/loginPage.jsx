/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./authentication.css";
import MainNavbar from "../Pages/navbar/mainNavbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
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
    console.warn("Data: ", email, password);
    let data = { email, password };

    let result = await fetch("http://localhost:8000/api/v1/customer/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(data),
    });

    result = await result.json();
    console.warn("Result", result);

    if (result.status === "success") {
      // const userId = result.data.data.user._id;
      // console.warn("User Id: " + userId);
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/vehicles");
    } else if (result.message === "Account or password is not correct") {
      alert("Email or Password is missing.");
    } else {
      alert("Please enter a correct data");
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
        <div className="container pt-4">
          <div className="login-row justify-content-center">
            <div className="col-lg-6 ">
              <div className="login-wrap ">
                <p className=" have-account-text">Log In </p>
                <p className="text-center have-account-text">
                  Already have an account?
                </p>
                <form action="#" className="signin-form">
                  <div className="form-group row">
                    <label htmlFor="city" className="col-lg-5 col-form-label">
                      Email
                    </label>
                    <div className="col-lg-6">
                      <input
                        className="form-control"
                        id="email"
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

                  <div className="form-group row">
                    <label
                      htmlFor="phoneNum"
                      className="col-lg-5 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-lg-6">
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
                        className="login-form-control btn btn-primary submit"
                        onClick={(e) => handleLogin(e)}
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="form-group-0">
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

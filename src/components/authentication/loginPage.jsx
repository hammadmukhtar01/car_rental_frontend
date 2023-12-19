/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import FacebookIcon from "../images/fbIcon.png";
import MailIcon from "../images/googleIcon.png";
import "./authentication.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = "useNavigate()";

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async () => {
    // console.warn("Data: ", user, password);
    let data = { email, password };

    let result = await fetch("http://localhost:8000/api/v1/login", {
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
      navigate("/home");
    } else if (result.message === "Account or password is not entered") {
      alert("Email or Password is missing.");
    } else {
      alert("Please enter a correct data");
    }
  };
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="login-row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Have an account?</h3>
                <form action="#" className="signin-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="password-field"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <span
                      toggle="#password-field"
                      className="fa fa-fw fa-eye field-icon toggle-password"
                    ></span>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary login-button submit px-3"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-50 text-md-right ">
                      <a href="#" style={{ color: "#fff" }}>
                        <div className="forgot-password">
                          {" "}
                          Forgot Password ?
                        </div>
                      </a>
                    </div>
                  </div>
                </form>
                <p className="w-100 text-center">
                  &mdash; Or Sign In With &mdash;
                </p>
                <br />

                <div class="container">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="social text-center">
                        <div class="">
                          <a href="#" class="rounded gmail-login">
                            <span class="fab fa-google"></span>{" "}
                            G-Mail
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="social text-center">
                          <a href="#" class="rounded facebook-login">
                            <span class="fab fa-facebook-f "></span> Twitter
                          </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;

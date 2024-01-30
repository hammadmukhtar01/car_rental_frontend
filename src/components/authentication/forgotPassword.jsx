import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../Pages/navbar/mainNavbar";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPasswordClick = async () => {
    // console.warn("Data: ", user, password);
    let data = { email };

    let result = await fetch("http://localhost:8000/api/v1/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(data),
    });

    result = await result.json();
    console.warn("Result=====", result);
    if (result.status === "success") {
      alert(result.message);
      navigate(`/login`);
    } else {
      alert("Email not found. Try Again with correct email.");
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
                <p className=" have-account-text"> Forgot Password...</p>

                <form action="#" className="signin-form">
                  <div className="form-group row">
                    <label htmlFor="city" className="col-lg-5 col-form-label">
                      Email
                    </label>
                    <div className="col-lg-7">
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

                  <div className="form-group-3 col-lg-12">
                    <div className="col-lg-6">
                      <p></p>
                      <button
                        type="submit"
                        className="forgot-form-control btn btn-primary submit"
                        onClick={handleForgotPasswordClick}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <br />
                  <div className="form-group-0">
                    <div className="col-lg-12">
                      <a href="/login" style={{ color: "#fff" }}>
                        <div className="forgot-password">
                          {" "}
                          Remember Password? Login here.
                        </div>
                      </a>
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

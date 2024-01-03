/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./authentication.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cityName, setCityName] = useState("");
  const navigate = "useNavigate()";

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSignUp = async () => {
    // console.warn("Data: ", user, password);
    let data = { name, email, password, passwordConfirm, phoneNumber, cityName };

    let result = await fetch("http://localhost:8000/api/v1/customer/create", {
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
            <div className="col-lg-6 signup-wrap ">
              <div className="">
                <p className="text-center have-account-text">SignUp Page</p>
                <form action="#" className="signup-form">
                  <div className="form-group row">
                    <label
                      htmlFor="phoneNum"
                      className="col-lg-5 col-form-label"
                    >
                      Full Name
                    </label>
                    <div className="col-lg-6">
                      <input
                        className="form-control"
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        placeholder="username"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </div>

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

                  <div className="form-group row">
                    <label htmlFor="city" className="col-lg-5 col-form-label">
                      Confirm password
                    </label>
                    <div className="col-lg-6">
                      <input
                        className="form-control"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type="password"
                        autoComplete="confirm-password"
                        required
                        placeholder="Confirm Password"
                        value={passwordConfirm}
                        onChange={(e) => {
                          setPasswordConfirm(e.target.value);
                        }}
                      />
                      <span
                        toggle="#password-field"
                        className="fa fa-fw  field-icon toggle-password"
                      ></span>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="phoneNum"
                      className="col-lg-5 col-form-label"
                    >
                      Phone Number
                    </label>
                    <div className="col-lg-6">
                      <input
                        className="form-control"
                        id="phoneNum"
                        name="phoneNum"
                        type="tel"
                        autoComplete="Phone-Number"
                        required
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="city" className="col-lg-5 col-form-label">
                      City
                    </label>
                    <div className="col-lg-6">
                      <input
                        className="form-control"
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="city"
                        required
                        placeholder="City"
                        value={cityName}
                        onChange={(e) => {
                          setCityName(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group-2">
                    <div className="col-lg-12">
                      <p className="mt-2 text-center">
                        Already have an account?{" "}
                        <a href="/login" className="click-here ms-1">
                          Click here
                        </a>
                      </p>
                    </div>
                  </div>
                  <br />
                  <div className="form-group-3 col-lg-12">
                    <div className="col-lg-6">
                      <p></p>
                      <button
                        type="submit"
                        className="createAccount-form-control btn btn-primary submit px-3"
                        onClick={(e) => handleSignUp(e)}
                      >
                        Create Account{" "}
                       
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default SignupPage;

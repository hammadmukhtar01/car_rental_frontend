import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import MainNavbar from "../navbar/mainNavbar";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "./../../PrivateComponents/reloadingComponent";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactusPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phoneNumber: "",
    comment: "",
  });

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    const inputGroup = e.target.closest(".inputgroup");
    if (inputGroup) {
      inputGroup.classList.add("input-filled");
    }
  };

  const handleBlur = (e) => {
    const inputGroup = e.target.closest(".inputgroup");
    if (inputGroup) {
      if (e.target.value === "") {
        inputGroup.classList.remove("input-filled");
      }
    }
  };

  const handleContactUsSubmitButton = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/contactUsForm/create`,
        formData
      );
      console.log("Contact Us response is: --- ", response.data.message);
      // alert("Success Msssg");
      if (response.data.status === "success") {
        // navigate("/home");

        toast.success("Thank You for Contacting Us.", {
          autoClose: 3000,
          style: { border: "1px solid #c0c0c0", fontSize: "14px" },
        });
      } else {
        alert("Email/Password missing...");
      }
    } catch (error) {
      console.log("Signup failed:", error.response.data.message);
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
      <div id="main" className="">
        <div className="navbar-bg-img-container">
          <div className="booking-page-banner-navbar">
            {" "}
            {/* <MainNavbar /> */}
          </div>
        </div>
        <div className="contactUs-container container">
          <div
            data-elementor-type="wp-page"
            data-elementor-id="3104"
            className="elementor elementor-3104 pt-xl-4"
          >
            <div className="styled-label text-center pt-3 pb-5">
              <span>
                <b className="fs-3">Contact Us</b>
              </span>
              <hr className="aboutUs-heading-underline col-2 text-center" />
            </div>
            <section className="contact-us-section-1">
              <div className="row">
                <div className="pl-1 col-lg-4 col-md-4">
                  <div className="contact-us-detail-container">
                    <ul className="elementor-contact-tabs-list">
                      <li className="">
                        <span className="tab-item p-2">
                          <span className="renting-text">
                            <b>Renting</b>{" "}
                          </span>
                        </span>
                      </li>
                    </ul>
                    <div className="contact-us-map p-3">
                      <div className="tab-unit d-flex ">
                        <div className="icon">
                          <i className="stmicon- stm-icon-pin"></i>
                        </div>
                        <div className="text ml-3">
                          <h4 className="title heading-font">Address</h4>
                          <div className="content heading-font">
                            <p className="contact-us-address-text">
                              Showroom 93 <br />
                              Al Aweer Auto Market, Ras Al Khor <br /> United
                              Arab Emirates{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="tab-unit d-flex ">
                        <div className="icon">
                          <i className="stmicon- stm-icon-phone"></i>
                        </div>
                        <div className="text ml-3">
                          <h4 className="title heading-font">Sales Phone</h4>
                          <div className="content heading-font">
                            <p className="contact-us-address-text">
                              (+971) 544519432
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="tab-unit d-flex ">
                        <div className="icon">
                          <i className="stmicon- stm-icon-time"></i>
                        </div>
                        <div className="text ml-3">
                          <h4 className="title heading-font">Sales Hours</h4>
                          <div className="content heading-font">
                            <p className="contact-us-address-text">
                              Monday - Saturday:
                              <br /> 09:00 - 22:00 Hours
                              <br />
                              Sunday: Closed
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8 col-md-8 pt-1 contact-us-map-container">
                  <div className="contact-us-map-div p-2">
                    <iframe
                      className="map-iframe-class"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.852700403415!2d55.36611197620153!3d25.174451077725763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f675b5b792571%3A0x8dd25798a287aa87!2sMilele%20Showroom%2093!5e0!3m2!1sen!2sae!4v1695724496789!5m2!1sen!2sae"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="#"
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>

            <section className="contact-us-section-2 pt-5 pb-4">
              <div className="contact-us-form-container col-lg-10">
                <div className="styled-label mt-2">
                  <div className="heading-icon-container-div d-flex justify-content-center">
                    <span>
                      <b className="fs-3">Contact Us Form</b>
                    </span>
                  </div>
                  <hr className="home-page-heading-underline " />
                </div>

                <form
                  action="#"
                  className="signup-form"
                  onSubmit={handleContactUsSubmitButton}
                >
                  <div className="form-group row">
                    <div className="inputgroup col-lg-6 col-md-6 col-sm-6">
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        id="fname"
                        name="fname"
                        required
                        value={formData.fname}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="lname">First Name</label>
                    </div>

                    <div className="inputgroup col-lg-6 col-md-6 col-sm-6">
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        id="lname"
                        name="lname"
                        required
                        value={formData.lname}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="lname">Last Name</label>
                    </div>

                    <div className="inputgroup col-lg-6 col-md-6 col-sm-6">
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="email">Email</label>
                    </div>

                    <div className="inputgroup col-lg-6 col-md-6 col-sm-6">
                      <input
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        autoComplete="off"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="phoneNumber">Phone Number</label>
                    </div>

                    <div className=" mt-4 col-lg-6 col-md-6 col-sm-12">
                      <textarea
                        className="col-md-12 form-control-contact-us"
                        cols="60"
                        rows="5"
                        id="comment"
                        name="comment"
                        type="checkbox"
                        autoComplete="off"
                        placeholder="comment"
                        required
                        value={formData.comment}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>

                    <label>
                      <div className="mt-2">
                        <Form.Check
                          className="diff-dropoff-loc-lable"
                          type="checkbox"
                          label=" Subscribe and Get latest updates and offers by Email"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="form-group-3 col-lg-12 pb-4">
                    <div className="col-lg-6 col-md-6 d-flex justify-content-center">
                      <p></p>
                      <button
                        type="submit"
                        className="contactUs-form-control animated-button submit px-3"
                        // onClick={(e) => handleSignUp(e)}
                      >
                        <span className="button-text-span">
                          <span className="transition"></span>
                          <span className="gradient"></span>
                          <span className="label">Submit</span>
                        </span>
                      </button>
                      <ToastContainer />
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactusPage;

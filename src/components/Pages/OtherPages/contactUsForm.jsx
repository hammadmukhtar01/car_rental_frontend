/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phoneNumber: "",
    comment: "",
  });
  const [country, setCountry] = useState("ae");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(`Phone numbe ris : ${formData?.phoneNumber}`);

    if (!emailRegex.test(formData?.email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    const parsedPhoneNumber = parsePhoneNumberFromString(
      `+${formData?.phoneNumber}`,
      country?.name
    );
    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      toast.error("Please enter a valid phone number.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    return true;
  };

  const handleContactUsSubmitButton = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      console.log("Invalid Input.");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    setLoading(true);
    document.body.classList.add("loadings");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MILELE_API_URL}/contactUsForm/create`,
        formData,
        { headers }
      );
      console.log("Contact Us response is: --- ", response?.data);

      if (response?.data?.status === "success") {
        toast.success("Thank You for Contacting Us.", {
          autoClose: 3000,
          style: { border: "1px solid #c0c0c0", fontSize: "14px" },
        });
        setFormData({
          fname: "",
          lname: "",
          email: "",
          phoneNumber: "+971",
          comment: "",
        });

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "contactUsPageLeadForm",
        });
      } else {
        toast.error("Failed to send your message. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log("Error:", error?.response);

      if (
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.error
      ) {
        const errors = error?.response?.data?.error?.errors;
        console.log("Error:", error?.response?.data?.error);

        if (errors?.email) {
          toast.error(errors?.email?.message, {
            position: "top-right",
            autoClose: 3000,
          });
        }
        if (errors?.phoneNumber) {
          toast.error(errors?.phoneNumber?.message, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        toast.error(`Submission failed: ${error?.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setLoading(false);
      document.body.classList.remove("loadings");
    }
  };

  return (
    <div>
      <>
        <form
          action="#"
          className="contactUs-form"
          onSubmit={handleContactUsSubmitButton}
        >
          {loading && (
            <div className="reloading-icon-free-consultation-form-container text-center">
              <span className="loader-text">Submitting your Request . . .</span>
              <div className="lds-dual-ring text-center"></div>
            </div>
          )}

          <div className="form-group row">
            <div className="col-lg-6 col-md-6 col-sm-6 pt-4">
              <label className="contact-us-label" htmlFor="lname">
                <h6>
                  {" "}
                  First Name<span className="required-field-star">*</span>
                </h6>
              </label>
              <input
                type="text"
                autoComplete="off"
                className="form-control form-control-contact-us"
                id="fname"
                name="fname"
                required
                value={formData?.fname}
                onChange={handleChange}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 pt-4">
              <label className="contact-us-label" htmlFor="lname">
                <h6>
                  {" "}
                  Last Name<span className="required-field-star">*</span>
                </h6>
              </label>
              <input
                type="text"
                autoComplete="off"
                className="form-control form-control-contact-us"
                id="lname"
                name="lname"
                required
                value={formData?.lname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="second-row-contact-us-form col-lg-6 col-md-6 col-sm-6">
              <div className="row ">
                <div>
                  <label className="contact-us-label" htmlFor="email">
                    <h6>
                      {" "}
                      Email<span className="required-field-star">*</span>
                    </h6>
                  </label>

                  <input
                    className="form-control form-control-contact-us"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    required
                    value={formData?.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="pt-4">
                  <label className="contact-us-label" htmlFor="phoneNumber ">
                    <h6>
                      {" "}
                      Phone Number<span className="required-field-star">*</span>
                    </h6>
                  </label>

                  <PhoneInput
                    className="form-control form-control-contact-us-phone-input form-control-consultation-number col-12"
                    country={"ae"}
                    name="phoneNumber"
                    value={formData?.phoneNumber}
                    placeholder="00 000 0000"
                    showDropdown={false}
                    disableDropdown={false}
                    countryCodeEditable={true}
                    onChange={(phone, country) => {
                      setFormData({
                        ...formData,
                        phoneNumber: phone,
                      });
                      setCountry(country);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className=" col-lg-6 col-md-6 col-sm-6 pt-4">
              <label className="contact-us-label" htmlFor="comment">
                <h6>
                  {" "}
                  Additional Comments{" "}
                  <span className="required-field-star">*</span>
                </h6>
              </label>

              <textarea
                className="form-control form-control-contact-us"
                cols="auto"
                rows="6"
                id="comment"
                name="comment"
                type="checkbox"
                autoComplete="off"
                placeholder="Comment"
                required
                value={formData?.comment}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group-3 col-lg-12 pb-4">
            <div className="col-lg-12 col-md-6 d-flex justify-content-end" id="contact-us-submit-div">
              <button className="middle" id="contact-us-submit-button">
                <span className="animate-button btn4" id="contact-us-submit-span">Submit</span>
              </button>
              <ToastContainer />
            </div>
          </div>
        </form>
      </>
    </div>
  );
};

export default ContactUsForm;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phoneNumber: "",
    comment: "",
  });
  const [country, setCountry] = useState("ae");
  const [loading, setLoading] = useState(false);
  const [errorFields, setErrorFields] = useState({});

  const validateInput = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newErrorFields = {};

    if (!emailRegex.test(formData.email)) {
      newErrorFields.email = true;
      isValid = false;
    }

    const normalizedPhoneNumber = formData.phoneNumber.startsWith("+")
      ? formData.phoneNumber
      : `+${formData.phoneNumber}`;
    const parsedPhoneNumber = parsePhoneNumberFromString(
      normalizedPhoneNumber,
      country.name
    );

    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      newErrorFields.phoneNumber = true;
      isValid = false;
    }

    setErrorFields(newErrorFields);
    return isValid;
  };
  const handleContactUsSubmitButton = async (e) => {
    e.preventDefault();

    const newErrorFields = {};
    const contactusFormMissingFields = [];

    if (!formData?.fName) {
      newErrorFields.fName = true;
      contactusFormMissingFields.push("First Name ");
    }
    if (!formData?.lName) {
      newErrorFields.lName = true;
      contactusFormMissingFields.push("Last Name");
    }

    if (!formData?.email) {
      newErrorFields.email = true;
      contactusFormMissingFields.push("Email ");
    }
    if (!formData?.phoneNumber) {
      newErrorFields.phoneNumber = true;
      contactusFormMissingFields.push("Phone Number");
    }
    if (!formData?.comment) {
      newErrorFields.comment = true;
      contactusFormMissingFields.push("Comment");
    }

    setErrorFields(newErrorFields);

    console.log(
      "Contact Us Form Missing Fields are : ",
      contactusFormMissingFields
    );
    if (contactusFormMissingFields?.length > 0) {
      const errorMessageMultiple = `${contactusFormMissingFields.join(
        ", "
      )} fields are missing.`;
      const errorMessageSingle = `${contactusFormMissingFields.join(
        ", "
      )} field is missing.`;

      const errorMessage =
        contactusFormMissingFields?.length === 1
          ? errorMessageSingle
          : errorMessageMultiple;

      toast.dismiss();
      toast(errorMessage, {
        duration: 3000,
      });
      return;
    }

    if (!validateInput()) {
      toast.dismiss();
      toast("Invalid data entered.", {
        duration: 3000,
      });
      return;
    }

    setLoading(true);

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    toast
      .promise(
        axios.post(
          `${process.env.REACT_APP_MILELE_API_URL}/contactUsForm/create`,
          formData,
          { headers }
        ),
        {
          loading: "Submitting your Request...",
          success: (response) => {
            setFormData({
              fName: "",
              lName: "",
              email: "",
              phoneNumber: "+971",
              comment: "",
            });
            return "Thank You for Contacting Us. We will get back to you soon";
          },
          error: (error) => {
            if (error.response?.data?.error?.errors) {
              const firstError = Object.values(
                error.response.data.error.errors
              )[0].message;
              return Promise.reject(firstError);
            }
            return Promise.reject(
              "Failed to send your message. Please try again."
            );
          },
        }
      )
      .then(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "contactUsPageLeadForm",
        });
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <>
        <form
          action="#"
          className="contactUs-form"
          onSubmit={handleContactUsSubmitButton}
        >
          <div className="form-group row">
            <div className="col-lg-6 col-md-6 col-sm-6 pt-4">
              <label className="contact-us-label" htmlFor="fname">
                <h6
                  className={` ${
                    errorFields?.fName ? "select-error-label" : ""
                  }`}
                >
                  {" "}
                  First Name<span className="required-field-star">*</span>
                </h6>
              </label>
              <input
                type="text"
                autoComplete="off"
                className={`form-control form-control-contact-us ${
                  errorFields?.fName ? "border-red" : ""
                }`}
                id="fname"
                name="fname"
                value={formData?.fName}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    fName: e.target.value,
                  }));
                  if (errorFields?.fName) {
                    setErrorFields((prev) => ({
                      ...prev,
                      fName: false,
                    }));
                  }
                }}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 pt-4">
              <label className="contact-us-label" htmlFor="lname">
                <h6
                  className={` ${
                    errorFields?.lName ? "select-error-label" : ""
                  }`}
                >
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
                value={formData?.lName}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    lName: e.target.value,
                  }));
                  if (errorFields?.lName) {
                    setErrorFields((prev) => ({
                      ...prev,
                      lName: false,
                    }));
                  }
                }}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="second-row-contact-us-form col-lg-6 col-md-6 col-sm-6">
              <div className="row ">
                <div>
                  <label className="contact-us-label" htmlFor="email">
                    <h6
                      className={` ${
                        errorFields?.email ? "select-error-label" : ""
                      }`}
                    >
                      {" "}
                      Email<span className="required-field-star">*</span>
                    </h6>
                  </label>

                  <input
                    className="form-control form-control-contact-us"
                    id="email1"
                    name="email"
                    type="email"
                    autoComplete="off"
                    value={formData?.email}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                      if (errorFields?.email) {
                        setErrorFields((prev) => ({
                          ...prev,
                          email: false,
                        }));
                      }
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="pt-4">
                  <label className="contact-us-label" htmlFor="phoneNumber ">
                    <h6
                      className={` ${
                        errorFields?.phoneNumber ? "select-error-label" : ""
                      }`}
                    >
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

                      if (errorFields?.phoneNumber) {
                        setErrorFields((prev) => ({
                          ...prev,
                          phoneNumber: false,
                        }));
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className=" col-lg-6 col-md-6 col-sm-6 pt-4">
              <label className="contact-us-label" htmlFor="comment">
                <h6
                  className={` ${
                    errorFields?.comment ? "select-error-label" : ""
                  }`}
                >
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
                value={formData?.comment}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }));
                  if (errorFields?.comment) {
                    setErrorFields((prev) => ({
                      ...prev,
                      comment: false,
                    }));
                  }
                }}
              />
            </div>
          </div>
          <div className="form-group-3 col-lg-12 pb-4">
            <div className="col-lg-12 col-md-6 d-flex justify-content-end">
              <button
                className="middle"
                aria-label="Contact Us Form Submission"
                disabled={loading}
              >
                <span className="animate-button btn4" id="contact-us-submit">
                  {loading ? "Submitting..." : "Submit"}
                </span>
              </button>
            </div>
          </div>
        </form>
      </>
    </div>
  );
};

export default ContactUsForm;

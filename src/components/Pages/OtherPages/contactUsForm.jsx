/* eslint-disable no-unused-vars*/
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "./../../PrivateComponents/reloadingComponent";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phoneNumber: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9,}$/;
    console.log(`Phone numbe ris : ${formData?.phoneNumber}`);

    if (!emailRegex.test(formData?.email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    if (!phoneRegex.test(formData?.phoneNumber)) {
      console.log(`Phone numbe ris : ${formData?.phoneNumber}`);
      toast.error("Please enter a valid phone number.", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    return true;
  };

  const handleContactUsSubmitButton = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      console.log("Invalid Input.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/contactUsForm/create`,
        formData
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
      } else {
        toast.error("Failed to send your message. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log("Error:", error?.response);

      if (error?.response && error?.response?.data && error?.response?.data?.error) {
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
                // onFocus={handleFocus}
                // onBlur={handleBlur}
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
                // onFocus={handleFocus}
                // onBlur={handleBlur}
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
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
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
                      const formattedPhone = phone.replace(/\D/g, "");

                      if (
                        formattedPhone.length <=
                        country.dialCode.length + 9
                      ) {
                        setFormData({
                          ...formData,
                          phoneNumber: formattedPhone,
                        });
                      } else {
                        console.log("Invalid phone number");
                      }
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
                // onFocus={handleFocus}
                // onBlur={handleBlur}
              />
            </div>

            {/* <label>
              <div className="mt-2">
                <Form.Check
                  className="diff-dropoff-loc-lable"
                  type="checkbox"
                  label=" Subscribe and Get latest updates and offers by Email"
                />
              </div>
            </label>*/}
          </div>
          <div className="form-group-3 col-lg-12 pb-4">
            <div className="col-lg-12 col-md-6 d-flex justify-content-end">
              <button className="middle">
                <span className="animate-button btn4">Submit</span>
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

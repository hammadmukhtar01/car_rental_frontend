/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "./../../PrivateComponents/reloadingComponent";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  return (
    <div>
      <>
        <div className="styled-label mt-2">
          <div className="heading-icon-container-div d-flex justify-content-center">
            <span>
              <b className="fs-3">Contact Us Form</b>
            </span>
          </div>
          <hr className="middle-hr-tag text-center " />
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

            <div className=" mt-4">
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
                // onClick={(e) => handleContactUsForm(e)}
              >
                <span className="button-text-span p-4">
                  <span className="transition"></span>
                  <span className="gradient"></span>
                  <span className="label">Submit</span>
                </span>
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

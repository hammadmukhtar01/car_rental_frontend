/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "./../../PrivateComponents/reloadingComponent";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const LeaseNowFormDetails = ({
  estCarPrice,
  durationVal,
  downPaymentVal,
  resetLeasingDetails,
}) => {
  const navigate = useNavigate();

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
      console.log(`Phone number is : ${formData?.phoneNumber}`);
      toast.error("Please enter a valid phone number.", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    return true;
  };

  const handleLeaseNowDetailsForm = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      console.log("Invalid Input.");
      return;
    }
    const finalFormData = {
      ...formData,
      estCarPrice,
      durationVal,
      downPaymentVal,
    };
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/leaseNowData/create`,
        finalFormData
      );
      console.log("lease Now details response is: --- ", response?.data);
      console.log(
        "response?.data?.status  response is: --- ",
        response?.data?.status
      );

      if (response?.data?.status === "success") {
        toast.success(
          "Thank You for Contacting Us for leasing. We will get back to you soon!",
          {
            autoClose: 2000,
            style: { border: "1px solid #c0c0c0", fontSize: "14px" },
            onClose: () => {
              // Reset all form and related states
              setFormData({
                fname: "",
                lname: "",
                email: "",
                phoneNumber: "+971",
                comment: "",
              });
              // Reset other states as needed
              resetLeasingDetails();
              navigate("/leaseToOwn");
            },
          }
        );
      } else {
        toast.error("Failed to send your message. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log("Error catch 1 : ", error?.response);

      console.log(
        `error?.response  is ${error?.response}\nerror?.response?.data :;;: ${error?.response?.data}\nerror?.response?.data?.error :: ${error?.response?.data?.error}`
      );

      if (
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.error
      ) {
        const errors = error?.response?.error?.errors;
        console.log("Error console 2:", error?.response?.data?.error);

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
          className="lease-now-details-form"
          onSubmit={handleLeaseNowDetailsForm}
        >
          <div className="form-group row">
            <div className="col-lg-6 col-md-6 col-sm-6 pt-4">
              <label className="lto-userDetails-label" htmlFor="lname">
                <h6>
                  {" "}
                  First Name<span className="required-field-star">*</span>
                </h6>
              </label>
              <input
                type="text"
                autoComplete="off"
                className="form-control form-control-lto-userDetails"
                id="fname"
                name="fname"
                required
                value={formData?.fname}
                onChange={handleChange}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 pt-4">
              <label className="lto-userDetails-label" htmlFor="lname">
                <h6>
                  {" "}
                  Last Name<span className="required-field-star">*</span>
                </h6>
              </label>
              <input
                type="text"
                autoComplete="off"
                className="form-control form-control-lto-userDetails"
                id="lname"
                name="lname"
                required
                value={formData?.lname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="second-row-lto-userDetails-form col-lg-6 col-md-6 col-sm-6">
              <div className="row ">
                <div>
                  <label className="lto-userDetails-label" htmlFor="email">
                    <h6>
                      {" "}
                      Email<span className="required-field-star">*</span>
                    </h6>
                  </label>

                  <input
                    className="form-control form-control-lto-userDetails"
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
                  <label
                    className="lto-userDetails-label"
                    htmlFor="phoneNumber "
                  >
                    <h6>
                      {" "}
                      Phone Number<span className="required-field-star">*</span>
                    </h6>
                  </label>

                  <PhoneInput
                    className="form-control form-control-lto-userDetails-phone-input form-control-consultation-number col-12"
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
                        formattedPhone?.length <=
                        country?.dialCode?.length + 9
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
              <label className="lto-userDetails-label" htmlFor="comment">
                <h6>
                  {" "}
                  Additional Comments{" "}
                  <span className="required-field-star">*</span>
                </h6>
              </label>

              <textarea
                className="form-control form-control-lto-userDetails"
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

export default LeaseNowFormDetails;

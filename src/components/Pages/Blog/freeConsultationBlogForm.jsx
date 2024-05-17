/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../homePage/homepage.css";

const FreeConsultationForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("ae");
  const [loading, setLoading] = useState(false);

  const handleFreeConsultationForm = async (e) => {
    e.preventDefault();
    console.log(`1---- Free cons fomr number : ${phoneNumber}`);

    const phoneRegex = /^[0-9]{9,}$/;

    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Please enter a valid phone number.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("phoneNumber", phoneNumber);

    console.log("Form Data is: ", formData);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    setLoading(true);
    document.body.classList.add("loadings");

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/freeConsultationForm/create`,
        { customerName, phoneNumber }
      );
      console.log(
        "freeConsultationForm response is: --- ",
        response?.data?.message
      );

      if (response?.data?.status === "success") {
        toast.success(
          "Thank you for seeking our consultation. We will get back to you soon at the provided number.",
          {
            autoClose: 1500,
            style: { border: "1px solid #c0c0c0", fontSize: "14px" },
          }
        );
        setCustomerName("");
        setPhoneNumber("+971");
      } else {
        toast.error("Failed to contact. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log("Error:", error?.response?.data || error);

      if (
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.error
      ) {
        const errors = error?.response?.data?.error?.errors;
        console.log("Error:", error?.response?.data);

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
    <div id="main">
      <>
        <div className="free-consultation-main-container">
          <div className="free-consultation-main-div">
            <Container>
              {loading && (
                <>
                  {/* <div className="reloading-icon-free-consultation-form-container text-center">
                    <div className="lds-dual-ring text-center"></div>
                  </div> */}
                </>
              )}

              <form
                action="#"
                className="free-consultation-form"
                onSubmit={handleFreeConsultationForm}
              >
                <div className="free-consultation-text">
                  <h3 className="free-consultation-heading">
                    GET FREE CONSULTATION FROM OUR SALESMEN RIGHT NOW
                  </h3>
                  <div className="free-consultation-buttons-div">
                    <Row className="d-flex justify-content-center align-items-center">
                      <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                        <input
                          className="form-control-consultation mt-2 col-12"
                          id="customer_name"
                          name="customerName"
                          type="text"
                          autoComplete="customerName"
                          required
                          placeholder="Your Name"
                          value={customerName}
                          onChange={(e) => {
                            setCustomerName(e.target.value);
                          }}
                        />
                      </Col>

                      <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                        <PhoneInput
                          className="form-control-consultation-number mt-2 col-12"
                          country={"ae"}
                          name="phoneNumber"
                          value={phoneNumber}
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
                              setPhoneNumber(formattedPhone);
                              setCountry(country);

                            } else {
                              console.log("Invalid phone number");
                            }
                          }}
                        />
                      </Col>

                      <Col
                        xl={4}
                        lg={4}
                        md={6}
                        sm={12}
                        xs={12}
                        className="text-center free-consultation-button-col"
                      >
                        <button
                          type="submit"
                          className="free-consultation-contactUs-button submit col-lg-12"
                        >
                          <h4 className="button-text">Contact Us</h4>
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
                <ToastContainer />
              </form>
            </Container>
          </div>
        </div>
      </>
    </div>
  );
};

export default FreeConsultationForm;

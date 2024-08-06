import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../homePage/homepage.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const FreeConsultationForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState({ dialCode: "971", name: "UAE" });

  const handleFreeConsultationForm = async (e) => {
    e.preventDefault();

    const normalizedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;

    const parsedPhoneNumber = parsePhoneNumberFromString(
      normalizedPhoneNumber,
      country?.name
    );
    if (!parsedPhoneNumber || !parsedPhoneNumber?.isValid()) {
      toast.dismiss();
      toast("Please enter a valid phone number.", {
        duration: 2000,
        style: {
          border: "1.3px solid white",
          boxShadow: "1px 1px 15px 1px black",
          color: "white",
          backgroundColor: "#e87a28f2",
          fontSize: "16px",
          maxWidth: "600px",
        },
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

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    toast.dismiss();
    toast
      .promise(
        axios.post(
          `${process.env.REACT_APP_MILELE_API_URL}/freeConsultationForm/create`,
          // `http://localhost:8000/api/v1/freeConsultationForm/create`,

          { customerName, phoneNumber },
          { headers }
        ),
        {
          loading: "Submitting your request...",
          success:
            "Thank you for seeking our consultation. We will get back to you soon.",
          error: (err) => {
            console.log("Error:", err?.response?.data || err);
            const errorMessage = err?.response?.data?.message;
            return `Submission failed: ${errorMessage}`;
          },
        },
        {
          duration: 2000,
          style: {
            border: "1.3px solid white",
            boxShadow: "1px 1px 15px 1px black",
            color: "white",
            backgroundColor: "#e87a28f2",
            fontSize: "16px",
            maxWidth: "600px",
          },
        }
      )
      .then(() => {
        setCustomerName("");
        setPhoneNumber("+971");

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "homePageLeadForm",
        });
      })
      .catch((err) => {
        console.error("Error during form submission:", err);
      });
  };

  return (
    <div id="main">
      <div className="free-consultation-main-container">
        <div className="free-consultation-main-div">
          <Container>
            <form action="#2" className="free-consultation-form">
              <div className="free-consultation-text">
                <h2 className="free-consultation-heading">
                  GET FREE CONSULTATION FROM OUR SALESMEN RIGHT NOW
                </h2>
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
                          setPhoneNumber(phone);
                          setCountry(country);
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
                        id="free-consultation-form-button"
                        aria-label="Get Free Consutation"
                        className="free-consultation-contactUs-button submit col-lg-12"
                        onClick={handleFreeConsultationForm}
                      >
                        <span
                          className="button-text"
                          id="free-consultation-form-heading"
                        >
                          <b>CONTACT US</b>
                        </span>
                      </button>
                    </Col>
                  </Row>
                </div>
              </div>
            </form>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default FreeConsultationForm;

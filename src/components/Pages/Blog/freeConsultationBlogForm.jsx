import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../homePage/homepage.css";

const FreeConsultationForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerNum, setCustomerNum] = useState("");
  const handleFreeConsultationForm = () => {
    console.log("test");
  };
  // const { loading } = useReload();

  // if (loading) {
  //   return (
  //     <>
  //       <ReloadingComponent />
  //     </>
  //   );
  // }

  return (
    <div id="main" className="pb-2 ">
      <>
        <div className="free-consultation-main-container">
          <div className="free-consultation-main-div">
            <Container>
              <form
                action="#"
                className="signin-form"
                onSubmit={handleFreeConsultationForm}
              >
                <div className="free-consultation-text">
                  <h5 className="free-consultation-heading">
                    GET FREE CONSULTATION FROM OUR SALESMEN RIGHT NOW
                  </h5>
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
                          value={customerNum}
                          placeholder="00 000 0000"
                          showDropdown={false}
                          disableDropdown={true}
                          countryCodeEditable={false}
                          onChange={(phone) => {
                            if (phone.length <= 12) {
                              const formattedPhone = phone.replace(/\D/g, "");
                              if (
                                formattedPhone.startsWith("971") &&
                                formattedPhone.length === 12
                              ) {
                                setCustomerNum(formattedPhone);
                              } else {
                                console.log("Invalid UAE phone number");
                              }
                            }
                          }}
                        />
                      </Col>

                      <Col xl={4} lg={4} md={6} sm={12} xs={12} className="text-center">
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
              </form>
            </Container>
          </div>
        </div>
      </>
    </div>
  );
};

export default FreeConsultationForm;

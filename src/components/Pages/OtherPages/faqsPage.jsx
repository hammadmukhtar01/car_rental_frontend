import React, { useState, useRef, useEffect } from "react";
import "./otherPages.css";
import { FiPlus } from "react-icons/fi";
import MainNavbar from "../navbar/mainNavbar";

const FaqsPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const [active, setActive] = useState(false);

  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  const faqData = [
    {
      faqQuestion: "What is Salik?",
      faqAnswer:
        "Salik is an electronic toll system in the UAE, it uses RFID technology and is built to automatically deduct a fee when a vehicle crosses a toll gate. Toll gate crossing (Salik) is charged at [actual price + 25% administration fee] + VAT.",
    },
    {
      faqQuestion: "What is Darb toll gate system?",
      faqAnswer:
        "Darb is an integrated toll system in the Abu Dhabi, it is built to automatically deduct a fee when a vehicle crosses a darb toll gate. Darb Toll gate crossing is charged at [actual price + 25% administration fee] + VAT.",
    },

    {
      faqQuestion: "What is authorisation?",
      faqAnswer:
        "At the time of rental, a pre-authorisation hold is secured on the credit card provided (debit cards are not allowed), to cover the estimated rental charges and any additional charges that may be incurred. A Pre-Authorisation is a blocked amount on the card limit, which may appear as a debit and will not be available for your use. The Pre-Authorisation amount is reduced from the total credit limit on your credit card but is not released to us. The pre-authorisation is released in the normal course as pre-defined by your respective banks. Additional pre-authorisations (holds) are be obtained if the vehicle is not returned on the date/time noted on the rental agreement or if the original terms of the rental change, which result in additional charges. A request for releasing a block on a credit card is forwarded by us as applicable but may take up to 21 working days to process in your account unless it is automatically released as per the set time period by your bank.",
    },

    {
      faqQuestion:
        " Who can rent from Milele and what is the minimum period of rental?",
      faqAnswer:
        " Hirers should be at least 21 years of age and should hold a valid UAE driving license (at least for 6 months) for UAE Residence holders. For Tourist Permits, we require an International Driver’s License. The minimum rental period is 24 hours from the time of renting.",
    },
    {
      faqQuestion: "Is parking available and are there any procedures? ",
      faqAnswer:
        "Parking in UAE is readily available. Parking along the roadside is paid depending on the zone you are parked in. You can get parking tickets via parking meters that are installed all over the UAE. You can also park your car by SMS-ing to the designated numbers based on your location ‘[Number plate] [Area code] [number of parking hours]’ to ‘7275’. ",
    },
    {
      faqQuestion: "How does the deposit refund process work? ",
      faqAnswer:
        "Debit card deposit is processed after 40 calendar days from date of vehicle return, there is a 2% service fee + VAT charged by the bank ",
    },
    {
      faqQuestion: " Can I be charged even after I return the vehicle?",
      faqAnswer:
        " Yes, any salik tolls and traffic fines updated pertaining to the car hire can be charged on the credit card even after the vehicle returns.",
    },
    {
      faqQuestion: " What about traffic violations?",
      faqAnswer:
        "Most roads in the U.A.E. are radar controlled and it is in your interest to adhere to the speed limits which are clearly highlighted on road signs. All traffic violations will be charged to the renter alongwith a service fee and VAT. ",
    },
    {
      faqQuestion: " What do we do in the case of a breakdown or accidents?",
      faqAnswer:
        " In any unforeseen circumstances, should your vehicle be involved in an accident please note that the vehicle should not be moved from the point of the accident or damage, except in the case where the damage is minor and the vehicle is causing an obstruction to the traffic. Kindly call the police (Dial 999) and remain with the vehicle in order to obtain a police report to be submitted to Milele Car Rental to claim insurance.",
    },
    {
      faqQuestion: "Can I tow with a Milele Car?",
      faqAnswer:
        " No. Towing is a violation of the rental agreement and is not permitted under any circumstances.",
    },
    {
      faqQuestion:
        "What kind of a driver's license is required to drive in the UAE and does it have to be an international license?",
      faqAnswer:
        "For UAE Resident Visa Holders: A valid UAE Driving License. For Visitors (on visit/transit visa) from GCC Countries: A valid GCC country driving license. For visitors from all other countries other than GCC countries (on visit/transit) : a valid international driving license. Non GCC Nationals with GCC Driving License also need to provide a valid residence visa of the country from where the license was issued.",
    },
    {
      faqQuestion: "Can I take the seats out of a Milele Van?",
      faqAnswer: "Sorry, all seats must remain in the van.",
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div id="main" className="pb-5">
        <div className="navbar-bg-img-container">
          <div className="booking-page-banner-navbar">
            {" "}
            <MainNavbar />
          </div>
        </div>
        <div className="container mt-4">
          <div
            data-elementor-type="wp-page"
            data-elementor-id="986"
            className="elementor elementor-986"
          >
            <section
              className="elementor-section elementor-top-section elementor-element-5b4a3ec elementor-section-boxed elementor-section-height-default elementor-section-height-default"
              data-id="5b4a3ec"
              data-element_type="section"
            >
              <div className="elementor-container elementor-column-gap-default">
                <div
                  className="elementor-column elementor-col-66 elementor-top-column elementor-element elementor-element-bb23649"
                  data-id="bb23649"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-9fa864b elementor-widget elementor-widget-accordion"
                      data-id="9fa864b"
                      data-element_type="widget"
                      data-widget_type="accordion.default"
                    >
                      <div className="elementor-widget-container">
                        <div className="elementor-accordion">
                          <div className="elementor-widget-container">
                            <center>
                              <h3>
                                <strong>FREQUENTLY ASKED QUESTIONS</strong>
                              </h3>
                            </center>
                            <div
                              className="elementor-element elementor-element-5224060 elementor-widget elementor-widget-stm-colored-separator"
                              data-id="5224060"
                              data-element_type="widget"
                              data-widget_type="stm-colored-separator.default"
                            >
                              <div className="elementor-widget-container">
                                <div
                                  className="colored-separator"
                                  style={{ textAlign: "center" }}
                                >
                                  <div className="first-long stm-base-background-color"></div>
                                  <div className="last-short stm-base-background-color"></div>
                                </div>
                              </div>
                            </div>
                            <br />
                          </div>
                          <br />
                          {faqData.map((item, index) => (
                            <div
                              className={`elementor-accordion-item ${
                                activeIndex === index ? "active" : ""
                              }`}
                              key={index}
                            >
                              <div
                                className="elementor-tab-title"
                                role="button"
                                aria-expanded={activeIndex === index}
                                onClick={() => handleToggle(index)}
                              >
                                <span className="elementor-accordion-icon">
                                  {activeIndex === index ? (
                                    <>
                                      <span
                                        className="elementor-accordion-icon-opened"
                                        data-id="1"
                                        id="elementor-accordion-icon-opened-1"
                                      >
                                        <i className="far fa-minus-square"></i>
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span
                                        className="elementor-accordion-icon-closed"
                                        data-id="1"
                                        id="elementor-accordion-icon-closed-1"
                                      >
                                        <i className="far fa-plus-square"></i>
                                      </span>
                                    </>
                                  )}
                                </span>{" "}
                                <span className="elementor-accordion-title">
                                  {item.faqQuestion}
                                </span>
                              </div>
                              {activeIndex === index && (
                                <div className="elementor-clearfix">
                                  <p className="faq-collapse-content">
                                    <span style={{ color: "#262829" }}>
                                      {item.faqAnswer}
                                    </span>
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}

                          <div>
                            <button
                              className={`question-section ${active}`}
                              onClick={toggleAccordion}
                            >
                              <div>
                                <div className="question-align">
                                  <h4 className="question-style">
                                    Why do you like web developemnt
                                  </h4>
                                  <FiPlus
                                    className={
                                      active
                                        ? `question-icon rotate`
                                        : `question-icon`
                                    }
                                  />
                                </div>
                                <div
                                  ref={contentRef}
                                  className={
                                    active ? `answer answer-divider` : `answer`
                                  }
                                >
                                  <p>Because I love coding</p>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-14e2c90"
                  data-id="14e2c90"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-a8c9272 elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-heading"
                      data-id="a8c9272"
                      data-element_type="widget"
                      data-widget_type="heading.default"
                    >
                      <div className="elementor-widget-container">
                        <h4 className="elementor-heading-title elementor-size-default">
                          MEDIA LIBRARY
                        </h4>
                      </div>
                    </div>

                    <div
                      className="elementor-element elementor-element-cb13be4 elementor-widget elementor-widget-motors-single-listing-contact-info"
                      data-id="cb13be4"
                      data-element_type="widget"
                      data-widget_type="motors-single-listing-contact-info.default"
                    >
                      <div className="elementor-widget-container">
                        <div className="contact-info-wrap">
                          <div className="title_wrap">
                            <i
                              aria-hidden="true"
                              className="fas fa-address-book"
                            ></i>
                            <h5 className="title">Contact Information</h5>
                          </div>
                          <div className="info-list-wrap">
                            <div className="info-item">
                              <i className="stm-icon-phone"></i>
                              <div className="info-data">
                                <span className="item-title">Phone:</span>
                                <span className="item-value">
                                  +971 544519432
                                </span>
                              </div>
                            </div>
                            <div className="info-item">
                              <i className="stmicon- stm-icon-mail"></i>
                              <div className="info-data">
                                <span className="item-title">E-mail:</span>
                                <span className="item-value">
                                  <a href="cdn-cgi/l/email-protection.html#224b4c444d624f4b4e474e4741435050474c56434e0c414d4f">
                                    {" "}
                                    <span
                                      className="__cf_email__ fw-300 text-black"
                                      data-cfemail="caa3a4aca58aa7a3a6afa6afa9abb8b8afa4beaba6e4a9a5a7"
                                    >
                                      info@milelecarrental.com
                                    </span>
                                  </a>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqsPage;

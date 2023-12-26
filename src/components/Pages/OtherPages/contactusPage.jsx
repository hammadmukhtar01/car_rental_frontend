import React from "react";

const ContactusPage = () => {
  const handleContactUsSubmitButton = () => {
    alert("Thank You for Contacting Us. We will contact You soon.");
  };
  return (
    <>
      <div id="main" className="">
        <div className="contactUs-container">
          <div
            data-elementor-type="wp-page"
            data-elementor-id="3104"
            className="elementor elementor-3104"
          >
            <section
              className="elementor-section elementor-top-section elementor-element elementor-element-fd15043 elementor-section-full_width elementor-section-height-min-height elementor-section-stretched elementor-section-height-default elementor-section-items-middle"
              data-id="fd15043"
              data-element_type="section"
              data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
            >
              <div className="elementor-container elementor-column-gap-default">
                <div
                  className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-5cab879"
                  data-id="5cab879"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <section
                      className="elementor-section elementor-inner-section elementor-element elementor-element-0bb7e84 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                      data-id="0bb7e84"
                      data-element_type="section"
                      data-settings='{"background_background":"classic"}'
                    >
                      <div className="elementor-container elementor-column-gap-default">
                        <div
                          className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-1f1eb0f"
                          data-id="1f1eb0f"
                          data-element_type="column"
                          data-settings='{"background_background":"classic"}'
                        >
                          <div className="elementor-widget-wrap elementor-element-populated">
                            <div
                              className="elementor-element elementor-element-ae22989 elementor-absolute elementor-widget__width-initial elementor-widget elementor-widget-stm-contact-form-seven"
                              data-id="ae22989"
                              data-element_type="widget"
                              data-settings='{"_position":"absolute"}'
                              data-widget_type="stm-contact-form-seven.default"
                            >
                              <div className="elementor-widget-container">
                                <div
                                  className="stm-elementor-contact-form-seven "
                                  id="single_contact_form_73186"
                                >
                                  <div className="icon-title">
                                    <h2 className="contactUs-heading-font title">
                                      CONTACT US
                                    </h2>
                                  </div>
                                  <div
                                    className="wpcf7 js"
                                    id="wpcf7-f717-p3100-o1"
                                    lang="en-US"
                                    dir="ltr"
                                  >
                                    <form
                                      action="https://milelecarrental.com/contacts"
                                      method="post"
                                      className="wpcf7-form init "
                                      id="form-contact"
                                      aria-label="Contact form"
                                      noValidate="novalidate"
                                      data-status="init"
                                    >
                                      <input
                                        type="hidden"
                                        name="_token"
                                        // value="UW5wWno4TpWXbMngkXXxDc9mrhvTqZzd3q8ESoFk"
                                        autoComplete="off"
                                      />{" "}
                                      <div className="row">
                                        <div className="col-md-7 col-sm-7">
                                          <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                              <div className="form-group">
                                                <div className="contact-us-label">
                                                  First Name*
                                                </div>
                                                <span
                                                  className="wpcf7-form-control-wrap"
                                                  data-name="first-name"
                                                >
                                                  <input
                                                    size="40"
                                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required "
                                                    aria-required="true"
                                                    placeholder="Enter your first name"
                                                    type="text"
                                                    name="first_name"
                                                  />
                                                </span>
                                              </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                              <div className="form-group">
                                                <div className="contact-us-label">
                                                  Last Name*
                                                </div>
                                                <span
                                                  className="wpcf7-form-control-wrap"
                                                  data-name="last-name"
                                                >
                                                  <input
                                                    size="40"
                                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required  "
                                                    aria-required="true"
                                                    aria-invalid="false"
                                                    placeholder="Enter your last name"
                                                    type="text"
                                                    name="last_name"
                                                  />
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                              <div className="form-group">
                                                <div className="contact-us-label">
                                                  Email*
                                                </div>
                                                <span
                                                  className="wpcf7-form-control-wrap"
                                                  data-name="email"
                                                >
                                                  <input
                                                    size="40"
                                                    className="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required
                                                                   wpcf7-validates-as-email"
                                                    aria-required="true"
                                                    aria-invalid="false"
                                                    placeholder="email@domain.com"
                                                    type="email"
                                                    name="email"
                                                  />
                                                </span>
                                              </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                              <div className="form-group">
                                                <div className="contact-us-label">
                                                  Phone
                                                </div>
                                                <span
                                                  className="wpcf7-form-control-wrap"
                                                  data-name="phone"
                                                >
                                                  <input
                                                    size="40"
                                                    className="wpcf7-form-control wpcf7-text wpcf7-tel wpcf7-validates-as-tel "
                                                    aria-invalid="false"
                                                    placeholder="Phone number"
                                                    type="tel"
                                                    name="phone"
                                                  />
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-md-12 stm-contact-us-checkbox">
                                              <span
                                                className="wpcf7-form-control-wrap"
                                                data-name="subscribe"
                                              >
                                                <span className="wpcf7-form-control wpcf7-checkbox">
                                                  <span className="wpcf7-list-item first last">
                                                    <label>
                                                      <div className="checker">
                                                        <span>
                                                          <input
                                                            type="checkbox"
                                                            name="is_subscribed"
                                                          />
                                                        </span>
                                                      </div>
                                                      <span className="wpcf7-list-item-label">
                                                        Subscribe and Get latest
                                                        updates and offers by
                                                        Email
                                                      </span>
                                                    </label>
                                                  </span>
                                                </span>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-5 col-sm-5">
                                          <div className="form-group">
                                            <div className="form-group">
                                              <div className="contact-us-label">
                                                Comment
                                              </div>
                                              <span
                                                className="wpcf7-form-control-wrap"
                                                data-name="message"
                                              >
                                                <textarea
                                                  cols="40"
                                                  rows="5"
                                                  className="wpcf7-form-control wpcf7-textarea "
                                                  aria-invalid="false"
                                                  placeholder="Enter your message..."
                                                  name="comment"
                                                ></textarea>
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-8 contact-us-submit">
                                            <button
                                              className="btn btn-primary"
                                              onClick={() =>
                                                handleContactUsSubmitButton()
                                              }
                                            >
                                              Submit{" "}
                                              <span className="fas fa-arrow-right ps-2"></span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="wpcf7-response-output"
                                        aria-hidden="true"
                                      ></div>
                                    </form>
                                    <div
                                      className="alert alert-success"
                                      id="contact-form-output"
                                      hidden
                                      role="alert"
                                    ></div>
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
            </section>
            <section
              className="elementor-section elementor-top-section elementor-element elementor-element-51b8b43 elementor-section-full_width elementor-section-height-default elementor-section-height-default"
              data-id="51b8b43"
              data-element_type="section"
            >
              <div className="elementor-container elementor-column-gap-default">
                <div
                  className="pl-5 elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-11ee9bf"
                  data-id="11ee9bf"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-4d970ae elementor-widget elementor-widget-motors-contact-tabs"
                      data-id="4d970ae"
                      data-element_type="widget"
                      data-settings='{"_animation":"none"}'
                      data-widget_type="motors-contact-tabs.default"
                    >
                      <div className="elementor-widget-container">
                        <div className="stm-elementor-contact-tabs">
                          <div className="elementor-contact-tabs">
                            <div className="elementor-contact-tabs-container">
                              <ul className="elementor-contact-tabs-list">
                                <li
                                  className="elementor-contact-tab active"
                                  data-tab="552852"
                                >
                                  <span className="tab-item">
                                    <span className="elementor-contact-title-text">
                                      Renting{" "}
                                    </span>
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="contact-tabs-containers-wrap">
                              <div className="elementor-contact-panels-container contact-panel-552852 active">
                                <div className="tab-unit d-flex ">
                                  <div className="icon">
                                    <i className="stmicon- stm-icon-pin"></i>
                                  </div>
                                  <div className="text ml-5">
                                    <h4 className="title heading-font">
                                      Address
                                    </h4>
                                    <div className="content heading-font">
                                      <p>
                                        Showroom 93 <br />
                                        Al Aweer Auto Market, Ras Al Khor <br />{" "}
                                        United Arab Emirates{" "}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="tab-unit d-flex ">
                                  <div className="icon">
                                    <i className="stmicon- stm-icon-phone"></i>
                                  </div>
                                  <div className="text ml-5">
                                    <h4 className="title heading-font">
                                      Sales Phone
                                    </h4>
                                    <div className="content heading-font">
                                      <p>(+971) 544519432</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="tab-unit d-flex ">
                                  <div className="icon">
                                    <i className="stmicon- stm-icon-time"></i>
                                  </div>
                                  <div className="text ml-5">
                                    <h4 className="title heading-font">
                                      Sales Hours
                                    </h4>
                                    <div className="content heading-font">
                                      <p>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="elementor-column elementor-col-66 elementor-top-column elementor-element elementor-element-c583530"
                  data-id="c583530"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-c970e75 elementor-widget elementor-widget-stm-google-map"
                      data-id="c970e75"
                      data-element_type="widget"
                      data-widget_type="stm-google-map.default"
                    >
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.852700403415!2d55.36611197620153!3d25.174451077725763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f675b5b792571%3A0x8dd25798a287aa87!2sMilele%20Showroom%2093!5e0!3m2!1sen!2sae!4v1695724496789!5m2!1sen!2sae"
                        width="600"
                        height="450"
                        style={{ border: "0" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="#"
                      ></iframe>
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

export default ContactusPage;

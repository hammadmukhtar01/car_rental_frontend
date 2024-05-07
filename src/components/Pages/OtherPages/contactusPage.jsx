/* eslint-disable no-unused-vars */
import React from "react";
import MainNavbar from "../navbar/mainNavbar";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "./../../PrivateComponents/reloadingComponent";
import "react-toastify/dist/ReactToastify.css";
import ContactUsForm from "./contactUsForm";

const ContactusPage = () => {
  // const { loading } = useReload();

  // if (loading) {
  //   return (
  //     <>
  //       <ReloadingComponent />
  //     </>
  //   );
  // }

  return (
    <>
      <div id="main" className="">
        {/* <div className="navbar-bg-img-container">
          <div className="booking-page-banner-navbar">
            {" "}
            <MainNavbar />
          </div>
        </div> */}
        <div className="contactUs-container container">
          <div
            data-elementor-type="wp-page"
            data-elementor-id="3104"
            className="elementor elementor-3104 pt-xl-4"
          >
            <div className="styled-label text-center pt-3 pb-5">
              <span className="contactUs-form-heading">
                <b className="fs-3">Contact Us</b>
              </span>
            </div>
            <section className="contact-us-section-1">
              <div className="row">
                <div className="pl-1 col-lg-4 col-md-4">
                  <div className="contact-us-detail-container">
                    <ul className="elementor-contact-tabs-list">
                      <li className="">
                        <span className="tab-item p-2">
                          <span className="renting-text">
                            <b>Renting</b>{" "}
                          </span>
                        </span>
                      </li>
                    </ul>
                    <div className="contact-us-map p-3">
                      <div className="tab-unit d-flex ">
                        <div className="icon">
                          <i className="stmicon- stm-icon-pin"></i>
                        </div>
                        <div className="text ml-3">
                          <h4 className="title heading-font">Address</h4>
                          <div className="content heading-font">
                            <p className="contact-us-address-text">
                              Showroom 93 <br />
                              Al Aweer Auto Market, Ras Al Khor <br /> United
                              Arab Emirates{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="tab-unit d-flex ">
                        <div className="icon">
                          <i className="stmicon- stm-icon-phone"></i>
                        </div>
                        <div className="text ml-3">
                          <h4 className="title heading-font">Sales Phone</h4>
                          <div className="content heading-font">
                            <p className="contact-us-address-text">
                              (+971) 544519432
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="tab-unit d-flex ">
                        <div className="icon">
                          <i className="stmicon- stm-icon-time"></i>
                        </div>
                        <div className="text ml-3">
                          <h4 className="title heading-font">Sales Hours</h4>
                          <div className="content heading-font">
                            <p className="contact-us-address-text">
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

                <div className="col-lg-8 col-md-8 pt-1 contact-us-map-container">
                  <div className="contact-us-map-div p-2">
                    <iframe
                      className="map-iframe-class"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.852700403415!2d55.36611197620153!3d25.174451077725763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f675b5b792571%3A0x8dd25798a287aa87!2sMilele%20Showroom%2093!5e0!3m2!1sen!2sae!4v1695724496789!5m2!1sen!2sae"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="#"
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>
            <section className="contact-us-section-2 pt-5 pb-4">
              <div className="contact-us-form-container col-lg-8">
                <ContactUsForm />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactusPage;

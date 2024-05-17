/* eslint-disable no-unused-vars */
import React from "react";
import { useReload } from "../../PrivateComponents/utils";
import ReloadingComponent from "./../../PrivateComponents/reloadingComponent";
import "react-toastify/dist/ReactToastify.css";
import ContactUsForm from "./contactUsForm";
import { BiSolidPhone } from "react-icons/bi";
import { BsGeoAltFill } from "react-icons/bs";
import { BsFillClockFill } from "react-icons/bs";
import HeaderCombination from "../../PrivateComponents/headerCombination";
import FooterCombination from "../../PrivateComponents/footerCombination";

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
      <HeaderCombination />
      <div id="main" className="">
        <div className="contactUs-container container">
          <div
            data-elementor-type="wp-page"
            data-elementor-id="3104"
            className="elementor elementor-3104 pt-xl-4"
          >
            <div className="styled-label text-center pt-3 pb-2">
              <span className="contactUs-form-heading">
                <b className="fs-3">Contact Us</b>
              </span>
            </div>
            <section className="contact-us-section-2 pt-5 pb-4">
              <div className="contact-us-form-container">
                <ContactUsForm />
              </div>
            </section>
            <section className="contact-us-section-1">
              <div className="row">
                <div className="pl-1 col-lg-4 col-md-4">
                  <div className="contact-us-detail-container">
                    <div className="contact-us-map p-3">
                      <div className="tab-unit d-flex align-items-baseline">
                        <div className="icon">
                          <BsGeoAltFill className="contact-us-page-icons" />
                        </div>
                        <div className="text ml-3">
                          <h4 className="title heading-font">Address</h4>
                          <div className="content">
                            <p className="contact-us-address-text">
                              Showroom 11 <br />
                              Al Aweer Auto Market, Ras Al Khor <br /> United
                              Arab Emirates{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="tab-unit d-flex align-items-baseline">
                        <div className="icon">
                          <BiSolidPhone className="contact-us-page-icons" />
                        </div>
                        <div className="text ml-3">
                          <h4 className="title heading-font">Phone Number</h4>
                          <div className="content">
                            <p className="contact-us-address-text">
                              +971 56 329 8330
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="tab-unit d-flex align-items-baseline">
                        <div className="icon">
                          <BsFillClockFill className="contact-us-page-icons" />
                        </div>

                        <div className="text ml-3">
                          <h4 className="title heading-font">Sales Hours</h4>
                          <div className="content">
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
                      src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=milele showroom 11&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="#"
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>
            <br />
            <br />
          </div>
        </div>
      </div>
      <FooterCombination />
    </>
  );
};

export default ContactusPage;

import React from "react";

const Navbar = () => {
  return (
    <div>
      <div id="header">
        <div className="header-main " style={{ padding: "2px" }}>
          <div className="container">
            <div className="clearfix">
              <div className="logo-main ">
                <img
                  src="images/car_rental_logo.png"
                  className="logo-image"
                  style={{ width: "250px" }}
                  title="Home"
                  alt="Logo"
                />
                <div className="mobile-contacts-trigger visible-sm visible-xs">
                  <i className="stm-icon-phone-o"></i>
                  <i className="stm-icon-close-times"></i>
                </div>
                <div className="mobile-menu-trigger visible-sm visible-xs ">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="mobile-menu-holder">
                <ul className="header-menu clearfix">
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3083">
                    <a href="home.html">Home</a>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3089">
                    <a href="vehicles.html"> Vehicles</a>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3083">
                    <a href="about-us.html">About Us</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3207">
                    <a href="faq.html">FAQ</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3213">
                    <a href="contact-us.html">Contact Us</a>
                  </li>
                </ul>
              </div>
              <div className="top-info-wrap">
                <div className="header-top-info">
                  <div className="clearfix">
                    <div className="pull-right">
                      <div className="header-main-socs">
                        <ul className="clearfix">
                          <li>
                            <a href="tel:971544519432">
                              <i className="fa fa-phone"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://api.whatsapp.com/send?phone=971544519432"
                              target="_blank" rel="noreferrer"
                            >
                              <i className="fab fa-whatsapp"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.facebook.com/milelecarrental/"
                              target="_blank" rel="noreferrer"
                            >
                              <i className="fab fa-facebook"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.instagram.com/milelecarrentals/"
                              target="_blank" rel="noreferrer"
                            >
                              <i className="fab fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="pull-right ml-lg-5 mb-md-2 mb-2">
                      <a href="enquires/create.html">
                        <button
                          type="button"
                          className="btn btn-sm "
                          style={{backgroundColor: "#cc6119", boxShadow: "none", marginLeft: "20px"}}
                        >
                          SEND ENQUIRY
                        </button>
                      </a>
                    </div>
                    <div className="pull-right text-right">
                      <div className="header-secondary-phone header-secondary-phone-single">
                        <div className="phone">
                          <i className="stm-icon-phone " style={{color: "#cc761a"}}></i>
                          <span className="phone-number heading-font">
                            <a href="tel:971544519432"> +971 544519432 </a>
                          </span>
                        </div>
                        <div className="phone">
                        <i className="stm-icon-mail " style={{color: "#cc761a"}}></i>
                          <span className="phone-number heading-font mt-1">
                            <a href="cdn-cgi/l/email-protection.html#224b4c444d624f4b4e474e4741435050474c56434e0c414d4f">
                              {" "}
                              <span
                                className="__cf_email__"
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
        <div id="header-nav-holder" className="hidden-sm hidden-xs">
          <div className="header-nav header-nav-transparent header-nav-fixed">
            <div className="container">
              <div className="main-menu">
                <ul className="header-menu clearfix float-right" id="navbar-home">
                  <li
                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3083"
                    id="home"
                  >
                    <a href="home.html">Home</a>
                  </li>
                  <li
                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3089"
                    id="vehicle"
                  >
                    <a href="vehicles.html"> Vehicles</a>
                  </li>
                  <li
                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3083"
                    id="about-us"
                  >
                    <a href="about-us.html">About Us</a>
                  </li>
                  <li
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3207"
                    id="faq"
                  >
                    <a href="faq.html">FAQ</a>
                  </li>
                  <li
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3213"
                    id="contact-us"
                  >
                    <a href="contact-us.html">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

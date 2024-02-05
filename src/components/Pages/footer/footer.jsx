import React from "react";
import "./footer.css";
import { Form } from "react-bootstrap";
import { FaFacebook, FaPinterest, FaTiktok } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import {
  FaSnapchat,
  FaLinkedin,
  FaYoutube,
  FaRegBell,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const footerSubscriptionButton = () => {
    alert("Thank You for subscription...");
  };

  const socialMediaApps = [
    {
      hrefLink: "https://www.facebook.com/milelecarrental/",
      socialMediaIcons: FaFacebook,
    },

    {
      hrefLink: "https://twitter.com/milelecarrental",
      socialMediaIcons: FaTwitter,
    },

    {
      hrefLink: "https://www.pinterest.com/MileleCarRental/",
      socialMediaIcons: FaPinterest,
    },

    {
      hrefLink: "https://www.instagram.com/milelecarrentals/",
      socialMediaIcons: GrInstagram,
    },

    {
      hrefLink: "https://www.youtube.com/channel/UCGZsbfATcMxEBbz1PWAKt0A",
      socialMediaIcons: FaYoutube,
    },

    {
      hrefLink: "https://www.snapchat.com/add/milelecarrental",
      socialMediaIcons: FaSnapchat,
    },

    {
      hrefLink: "https://www.linkedin.com/company/99998565/admin/feed/posts/",
      socialMediaIcons: FaLinkedin,
    },

    {
      hrefLink: "https://www.tiktok.com/@milelecarrental",
      socialMediaIcons: FaTiktok,
    },
  ];
  return (
    <div>
      <footer id="footer">
        <div className="footer-main-container pt-4">
          <div id="footer-main">
            <div className="container">
              <div className="row">
                <aside
                  id="text-3"
                  className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
                >
                  <div className="widget-wrapper">
                    <div className="widget-title">
                      <h6>Sales Hours</h6>
                    </div>
                    <div className="textwidget">
                      <span className="footer-text-gray">
                        Monday - Saturday:
                      </span>{" "}
                      <span className="footer-sales-hr-time">
                        09:00 - 22:00 Hours
                      </span>
                      <br />
                      <span className="footer-text-gray">Sunday:</span>{" "}
                      <span className="footer-sales-hr-time">Closed</span>
                    </div>
                  </div>
                  <hr className="text-white" />
                </aside>
                <aside
                  id="text-4"
                  className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
                >
                  <div className="widget-wrapper">
                    <div className="widget-title">
                      <h6>Service Hours</h6>
                    </div>
                    <div className="textwidget">
                      <span className="footer-text-gray">
                        Monday - Saturday:
                      </span>{" "}
                      <span className="footer-service-hr-time">
                        09:00 - 22:00 Hours
                      </span>
                      <br />
                      <span className="footer-text-gray">Sunday:</span>{" "}
                      <span className="footer-service-hr-time">Closed</span>
                    </div>
                  </div>
                  <hr className="text-white" />
                </aside>
                <aside
                  id="text-5"
                  className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
                >
                  <div className="widget-wrapper">
                    <div className="widget-title">
                      <h6>Location</h6>
                    </div>
                    <div className="footer-location-text-main">
                      <span className="footer-location-text"></span> Showroom 93
                      ,<span className="footer-location-text"></span> Al Aweer
                      Market ,<br />
                      <span className="footer-location-text"></span> Ras Al Khor
                      ,<span className="footer-location-text"></span> United
                      Arab Emirates
                    </div>
                  </div>
                  <hr className="text-white" />
                </aside>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-4 widget-title">
                  <aside
                    id="mc4wp_form_widget-2"
                    className="widget widget_mc4wp_form_widget"
                  >
                    <h6>Subscribe</h6>
                    <div className="">
                      <form
                        // method="post"
                        action="http://localhost:3000/home"
                        onSubmit={footerSubscriptionButton}
                      >
                        <input
                          type="hidden"
                          name="_token"
                          value="UW5wWno4TpWXbMngkXXxDc9mrhvTqZzd3q8ESoFk"
                          autoComplete="off"
                        />{" "}
                        <Form.Group controlId="formKeyword">
                          <div className="custom-dropdown-container">
                            <input
                              className="form-control-subscription mt-2 col-lg-10 col-md-9 col-sm-9 col-9"
                              type="email"
                              name="email"
                              placeholder="Enter your email..."
                              required
                            />
                            <button
                              type="submit"
                              className="subscription-button"
                            >
                              <FaRegBell className="fs-5" />
                            </button>
                          </div>
                        </Form.Group>
                      </form>
                      <div className="footer-subscription-text mt-3">
                        <span>Get latest deals & offers.</span>
                      </div>
                    </div>
                  </aside>
                </div>

                <div className="col-lg-8 col-md-8">
                  <aside className="widget widget_socials pt-2">
                    <div className="social-media-icons-main-container">
                      <div className="widget-title">
                        <h6>Social Network</h6>
                      </div>
                      <div className="social-media-icons-container pt-1">
                        {socialMediaApps.map((socialMediaIcons, index) => (
                          <div
                            key={index}
                            className="single-social-media-icons"
                          >
                            <a
                              href={`${socialMediaIcons.hrefLink}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <socialMediaIcons.socialMediaIcons className="social-media-icon-tag" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
              <hr className="text-white" />
            </div>
          </div>

          <div id="footer-copyright">
            <div className="container footer-copyright pt-3 pb-5">
              <div className="row">
                <div className="col-md-8 col-sm-8">
                  <div className="clearfix">
                    <div className="copyright-text">
                      {" "}
                      Copyright{" "}
                      <a href="/" target="_blank">
                        2023 Milele car Rental
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="global-alerts"></div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;



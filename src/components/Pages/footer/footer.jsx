import React from "react";
import "./footer.css";
import { Form } from "react-bootstrap";
import { FaRegBell } from "react-icons/fa";
// import TikTokIcon from '../../images/tiktok.svg';

const Footer = () => {
  const footerSubscriptionButton = () => {
    alert("Thank You for subscription...");
  };

  const socialMediaApps = [
    {
      appName: "facebook",
      hrefLink: "https://www.facebook.com/milelecarrental/",
    },

    {
      appName: "twitter",
      hrefLink: "https://twitter.com/milelecarrental",
    },
    {
      appName: "instagram",
      hrefLink: "https://www.instagram.com/milelecarrentals/",
    },

    {
      appName: "pinterest",
      hrefLink: "https://www.pinterest.com/MileleCarRental/",
    },

    {
      appName: "youtube",
      hrefLink: "https://www.youtube.com/channel/UCGZsbfATcMxEBbz1PWAKt0A",
    },

    {
      appName: "linkedin",
      hrefLink: "https://www.linkedin.com/company/99998565/admin/feed/posts/",
    },

    {
      appName: "tiktok",
      hrefLink: "https://www.tiktok.com/@milelecarrental",
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
                            className="single-social-media-icons-div"
                          >
                            <a
                              href={`${socialMediaIcons.hrefLink}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <li
                                className={`icon ${socialMediaIcons.appName}`}
                              >
                                <span className="tooltip">
                                  {socialMediaIcons.appName}
                                </span>
                                <span>
                                 
                                  {socialMediaIcons.appName !== "tiktok" ? (
                                    <i
                                      className={`fa fa-${socialMediaIcons.appName}`}
                                    ></i>
                                  ) : (
                                    <div className="">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-tiktok"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                      </svg>
                                    </div>
                                  )}
                                </span>
                              </li>
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

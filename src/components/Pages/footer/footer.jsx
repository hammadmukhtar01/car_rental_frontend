import React from "react";
import "./footer.css";

const Footer = () => {
  const footerSubscriptionButton = () => {
    alert("Thank You for subscription...");
  };
  return (
    <div>
      <footer id="footer">
        <div id="footer-main">
          <div className="footer_widgets_wrapper ">
            <div className="container">
              <div className="widgets cols_3 clearfix">
                <aside id="text-3" className="widget widget_text">
                  <div className="widget-wrapper">
                    <div className="widget-title">
                      <h6>Sales Hours</h6>
                    </div>
                    <div className="textwidget">
                      <span className="date">Monday - Saturday:</span> 09:00 -
                      22:00 Hours
                      <br />
                      <span className="date">Sunday:</span> Closed
                    </div>
                  </div>
                </aside>
                <aside id="text-4" className="widget widget_text">
                  <div className="widget-wrapper">
                    <div className="widget-title">
                      <h6>Service Hours</h6>
                    </div>
                    <div className="textwidget">
                      <span className="date">Monday - Saturday:</span> 09:00 -
                      22:00 Hours
                      <br />
                      <span className="date">Sunday:</span> Closed
                    </div>
                  </div>
                </aside>
                <aside id="text-5" className="widget widget_text">
                  <div className="widget-wrapper">
                    <div className="widget-title">
                      <h6>Location</h6>
                    </div>
                    <div className="textwidget">
                      <span className="date"></span> Showroom 93 ,
                      <span className="date"></span> Al Aweer Market ,<br />
                      <span className="date"></span> Ras Al Khor ,
                      <span className="date"></span> United Arab Emirates
                    </div>
                  </div>
                </aside>
                <aside
                  id="mc4wp_form_widget-2"
                  className="widget widget_mc4wp_form_widget"
                >
                  <div className="widget-wrapper">
                    <div className="widget-title">
                      <h6>Subscribe</h6>
                      <div className="mc4wp-form-fields">
                        <div className="stm-mc-unit">
                          <form
                            // method="post"
                            action="http://localhost:3000/home"
                          >
                            <input
                              type="hidden"
                              name="_token"
                              value="UW5wWno4TpWXbMngkXXxDc9mrhvTqZzd3q8ESoFk"
                              autoComplete="off"
                            />{" "}
                            <input
                              type="email"
                              name="email"
                              placeholder="Enter your email..."
                              required
                            />
                            <input
                              type="submit"
                              value="Sign up"
                              onClick={footerSubscriptionButton}
                            />
                          </form>
                        </div>
                        <div className="stm-mc-label">
                          Get latest updates and offers.
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>

                <aside id="socials-2" className="widget widget_socials">
                  <div className="widget-wrapper">
                    <div className="widget-title">
                      <h6>Social Network</h6>
                    </div>
                    <div className="socials_widget_wrapper">
                      <ul className="widget_socials list-unstyled clearfix">
                        <li>
                          <a
                            href="https://www.facebook.com/milelecarrental/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://twitter.com/milelecarrental"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.pinterest.com/MileleCarRental/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-pinterest"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/milelecarrentals/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.youtube.com/channel/UCGZsbfATcMxEBbz1PWAKt0A"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-youtube"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.snapchat.com/add/milelecarrental"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-snapchat"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.linkedin.com/company/99998565/admin/feed/posts/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-linkedin"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.tiktok.com/@milelecarrental"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-tiktok"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>

        <div id="footer-copyright" style={{ backgroundColor: "#232628" }}>
          <div className="container footer-copyright">
            <div className="row">
              <div className="col-md-8 col-sm-8">
                <div className="clearfix">
                  <div className="copyright-text heading-font">
                    {" "}
                    Copyright{" "}
                    <a href="home.html" target="_blank">
                      2023
                    </a>
                    <a href="home.html" target="_blank">
                      Milele car Rental
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="clearfix">
                  <div className="pull-right xs-pull-left">
                    <div className="pull-right">
                      <div className="copyright-socials">
                        <ul className="clearfix">
                          <li>
                            <a
                              href="https://www.facebook.com/milelecarrental/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fab fa-facebook"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://twitter.com/milelecarrental"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.instagram.com/milelecarrentals/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fab fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="global-alerts"></div>
      </footer>
    </div>
  );
};

export default Footer;
